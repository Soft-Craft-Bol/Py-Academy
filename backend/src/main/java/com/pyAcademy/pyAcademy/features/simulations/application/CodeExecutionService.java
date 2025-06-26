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

            // Ejecutar Docker container
            ProcessBuilder processBuilder = buildDockerCommand(tempDir, pythonFile, inputFile, hasInputs);
            Process process = processBuilder.start();

            // Capturar output y error
            String output = readStream(process.getInputStream());
            String error = readStream(process.getErrorStream());

            // Esperar terminación con timeout
            boolean finished = process.waitFor(TIMEOUT_SECONDS, TimeUnit.SECONDS);
            
            if (!finished) {
                process.destroyForcibly();
                response.setSuccess(false);
                response.setError("Timeout: El código tardó más de " + TIMEOUT_SECONDS + " segundos en ejecutar");
                return response;
            }

            int exitCode = process.exitValue();
            
            response.setSuccess(exitCode == 0);
            response.setOutput(output);
            response.setError(error);
            response.setExitCode(exitCode);

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

    private ProcessBuilder buildDockerCommand(String tempDir, String pythonFile, String inputFile, boolean withInput) {
        ProcessBuilder processBuilder;
        
        if (withInput && inputFile != null) {
            processBuilder = new ProcessBuilder(
                "docker", "run", "--rm",
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
                    }
                });
        } catch (IOException e) {
        }
    }
}
