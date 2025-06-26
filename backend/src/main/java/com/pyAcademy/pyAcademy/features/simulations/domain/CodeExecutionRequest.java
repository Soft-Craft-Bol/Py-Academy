package com.pyAcademy.pyAcademy.features.simulations.domain;

public class CodeExecutionRequest {
    private String code;
    private String inputs;

    public CodeExecutionRequest() {}

    public CodeExecutionRequest(String code, String inputs) {
        this.code = code;
        this.inputs = inputs;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getInputs() {
        return inputs;
    }

    public void setInputs(String inputs) {
        this.inputs = inputs;
    }
}
