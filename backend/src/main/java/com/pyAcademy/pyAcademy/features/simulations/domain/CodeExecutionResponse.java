package com.pyAcademy.pyAcademy.features.simulations.domain;

public class CodeExecutionResponse {
    private boolean success;
    private String output;
    private String error;
    private int exitCode;

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
}
