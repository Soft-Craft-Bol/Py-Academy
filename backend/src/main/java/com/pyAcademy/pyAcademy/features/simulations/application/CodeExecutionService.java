package com.pyAcademy.pyAcademy.features.simulations.application;

import com.pyAcademy.pyAcademy.features.simulations.domain.CodeExecutionRequest;
import com.pyAcademy.pyAcademy.features.simulations.domain.CodeExecutionResponse;
import org.springframework.stereotype.Service;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.concurrent.TimeUnit;

@Service
public class CodeExecutionService {

    private static final int TIMEOUT_SECONDS = 30;
    private static final String DOCKER_IMAGE = "python-sandbox";

    public CodeExecutionResponse executeCode(CodeExecutionRequest request) {
        CodeExecutionResponse response = new CodeExecutionResponse();
        String tempDir = null;
        long startTime = System.currentTimeMillis();

        try {
            // Crear directorio temporal
            tempDir = createTempDirectory();
            
            // Escribir código Python a archivo
            String pythonFile = writePythonCode(tempDir, request.getCode());
            
            // Escribir inputs si los hay
            String inputFile = null;
            boolean hasInputs = request.getInputs() != null && !request.getInputs().trim().isEmpty();
            if (hasInputs) {
                inputFile = writeInputsToFile(tempDir, request.getInputs());
            }

            // Generar nombre único para el contenedor
            String containerName = "python-exec-" + System.currentTimeMillis();

            // Ejecutar Docker container con nombre para poder obtener stats
            ProcessBuilder processBuilder = buildDockerCommand(tempDir, pythonFile, inputFile, hasInputs, containerName);
            Process process = processBuilder.start();

            // Capturar output y error
            String output = readStream(process.getInputStream());
            String error = readStream(process.getErrorStream());

            // Esperar terminación con timeout
            boolean finished = process.waitFor(TIMEOUT_SECONDS, TimeUnit.SECONDS);
            long endTime = System.currentTimeMillis();
            
            if (!finished) {
                process.destroyForcibly();
                // Forzar eliminación del contenedor si existe
                cleanupContainer(containerName);
                response.setSuccess(false);
                response.setError("Timeout: El código tardó más de " + TIMEOUT_SECONDS + " segundos en ejecutar");
                return response;
            }

            int exitCode = process.exitValue();
            
            response.setSuccess(exitCode == 0);
            response.setOutput(output);
            response.setError(error);
            response.setExitCode(exitCode);

            // Calcular métricas
            CodeExecutionResponse.ExecutionMetrics metrics = calculateMetrics(
                request.getCode(), startTime, endTime, containerName);
            response.setMetrics(metrics);

        } catch (Exception e) {
            response.setSuccess(false);
            response.setError("Error ejecutando código: " + e.getMessage());
        } finally {
            // Limpiar archivos temporales
            if (tempDir != null) {
                cleanupTempDirectory(tempDir);
            }
        }

        return response;
    }

    private String createTempDirectory() throws IOException {
        Path tempPath = Files.createTempDirectory("python_execution_");
        return tempPath.toString();
    }

    private String writePythonCode(String tempDir, String code) throws IOException {
        String fileName = "user_code.py";
        Path filePath = Paths.get(tempDir, fileName);
        Files.write(filePath, code.getBytes());
        return fileName;
    }

    private String writeInputsToFile(String tempDir, String inputs) throws IOException {
        String fileName = "inputs.txt";
        Path filePath = Paths.get(tempDir, fileName);
        Files.write(filePath, inputs.getBytes());
        return fileName;
    }

    private ProcessBuilder buildDockerCommand(String tempDir, String pythonFile, String inputFile, boolean hasInputs, String containerName) {
        ProcessBuilder processBuilder;
        
        if (hasInputs && inputFile != null) {
            processBuilder = new ProcessBuilder(
                "docker", "run", "--rm",
                "--name", containerName,
                "--memory=128m",
                "--cpu-quota=50000",
                "--network=none",
                "--user=1000:1000",
                "-v", tempDir + ":/app",
                "-w", "/app",
                DOCKER_IMAGE,
                "sh", "-c", "python " + pythonFile + " < " + inputFile
            );
        } else {
            processBuilder = new ProcessBuilder(
                "docker", "run", "--rm",
                "--name", containerName,
                "--memory=128m",
                "--cpu-quota=50000",
                "--network=none",
                "--user=1000:1000",
                "-v", tempDir + ":/app",
                "-w", "/app",
                DOCKER_IMAGE,
                "python", pythonFile
            );
        }
        
        return processBuilder;
    }

    private CodeExecutionResponse.ExecutionMetrics calculateMetrics(String code, long startTime, long endTime, String containerName) {
        CodeExecutionResponse.ExecutionMetrics metrics = new CodeExecutionResponse.ExecutionMetrics();
        
        // Tiempo de ejecución
        long executionTime = endTime - startTime;
        metrics.setExecutionTimeMs(executionTime);
        
        // Contar líneas de código (sin líneas vacías ni comentarios)
        int linesOfCode = countLinesOfCode(code);
        metrics.setLinesOfCode(linesOfCode);
        
        // Intentar obtener estadísticas del contenedor
        try {
            // Obtener estadísticas de Docker (puede no estar disponible ya que usamos --rm)
            String[] dockerStats = getDockerStats(containerName);
            if (dockerStats != null) {
                metrics.setMemoryUsage(dockerStats[0]);
                metrics.setCpuUsage(dockerStats[1]);
            } else {
                // Valores por defecto basados en los límites establecidos
                metrics.setMemoryUsage("< 128MB");
                metrics.setCpuUsage("< 50%");
            }
        } catch (Exception e) {
            // Valores por defecto si no se pueden obtener las métricas
            metrics.setMemoryUsage("< 128MB");
            metrics.setCpuUsage("< 50%");
        }
        
        // Estimar tamaño del contenedor (aproximado)
        metrics.setContainerSizeBytes(code.getBytes().length);
        
        return metrics;
    }

    private int countLinesOfCode(String code) {
        if (code == null || code.trim().isEmpty()) {
            return 0;
        }
        
        return (int) code.lines()
            .map(String::trim)
            .filter(line -> !line.isEmpty() && !line.startsWith("#"))
            .count();
    }

    private String[] getDockerStats(String containerName) {
        try {
            ProcessBuilder pb = new ProcessBuilder(
                "docker", "stats", "--no-stream", "--format", 
                "{{.MemUsage}}\t{{.CPUPerc}}", containerName
            );
            Process process = pb.start();
            
            if (process.waitFor(2, TimeUnit.SECONDS)) {
                String output = readStream(process.getInputStream()).trim();
                if (!output.isEmpty()) {
                    String[] parts = output.split("\t");
                    if (parts.length >= 2) {
                        return new String[]{parts[0], parts[1]};
                    }
                }
            }
        } catch (Exception e) {
            // Ignorar errores, devolver null para usar valores por defecto
        }
        return null;
    }

    private void cleanupContainer(String containerName) {
        try {
            new ProcessBuilder("docker", "rm", "-f", containerName).start();
        } catch (Exception e) {
            // Ignorar errores de cleanup
        }
    }

    private String readStream(InputStream inputStream) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
        StringBuilder output = new StringBuilder();
        String line;
        
        while ((line = reader.readLine()) != null) {
            output.append(line).append("\n");
        }
        
        return output.toString();
    }

    private void cleanupTempDirectory(String tempDir) {
        try {
            Path path = Paths.get(tempDir);
            Files.walk(path)
                .sorted((a, b) -> b.compareTo(a)) // Borrar archivos antes que directorios
                .forEach(p -> {
                    try {
                        Files.delete(p);
                    } catch (IOException e) {
                        // Log error but continue cleanup
                    }
                });
        } catch (IOException e) {
            // Log error
        }
    }
}