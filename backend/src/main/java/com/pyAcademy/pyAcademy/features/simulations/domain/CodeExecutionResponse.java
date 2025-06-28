package com.pyAcademy.pyAcademy.features.simulations.domain;

public class CodeExecutionResponse {
    private boolean success;
    private String output;
    private String error;
    private int exitCode;
    private ExecutionMetrics metrics;

    public CodeExecutionResponse() {}

    public CodeExecutionResponse(boolean success, String output, String error, int exitCode) {
        this.success = success;
        this.output = output;
        this.error = error;
        this.exitCode = exitCode;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getOutput() {
        return output;
    }

    public void setOutput(String output) {
        this.output = output;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public int getExitCode() {
        return exitCode;
    }

    public void setExitCode(int exitCode) {
        this.exitCode = exitCode;
    }

    public ExecutionMetrics getMetrics() {
        return metrics;
    }

    public void setMetrics(ExecutionMetrics metrics) {
        this.metrics = metrics;
    }

    // Clase interna para métricas
    public static class ExecutionMetrics {
        private long executionTimeMs;
        private String memoryUsage;
        private String cpuUsage;
        private long containerSizeBytes;
        private int linesOfCode;

        public ExecutionMetrics() {}

        public ExecutionMetrics(long executionTimeMs, String memoryUsage, String cpuUsage, 
                              long containerSizeBytes, int linesOfCode) {
            this.executionTimeMs = executionTimeMs;
            this.memoryUsage = memoryUsage;
            this.cpuUsage = cpuUsage;
            this.containerSizeBytes = containerSizeBytes;
            this.linesOfCode = linesOfCode;
        }

        // Getters y Setters
        public long getExecutionTimeMs() {
            return executionTimeMs;
        }

        public void setExecutionTimeMs(long executionTimeMs) {
            this.executionTimeMs = executionTimeMs;
        }

        public String getMemoryUsage() {
            return memoryUsage;
        }

        public void setMemoryUsage(String memoryUsage) {
            this.memoryUsage = memoryUsage;
        }

        public String getCpuUsage() {
            return cpuUsage;
        }

        public void setCpuUsage(String cpuUsage) {
            this.cpuUsage = cpuUsage;
        }

        public long getContainerSizeBytes() {
            return containerSizeBytes;
        }

        public void setContainerSizeBytes(long containerSizeBytes) {
            this.containerSizeBytes = containerSizeBytes;
        }

        public int getLinesOfCode() {
            return linesOfCode;
        }

        public void setLinesOfCode(int linesOfCode) {
            this.linesOfCode = linesOfCode;
        }
    }
}