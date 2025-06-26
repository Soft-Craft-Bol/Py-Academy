package com.pyAcademy.pyAcademy.features.simulations.interfaces;

import com.pyAcademy.pyAcademy.features.simulations.domain.CodeExecutionRequest;
import com.pyAcademy.pyAcademy.features.simulations.domain.CodeExecutionResponse;
import com.pyAcademy.pyAcademy.features.simulations.application.CodeExecutionService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/execute")
public class CodeExecutionController {

    @Autowired
    private CodeExecutionService codeExecutionService;

    @PostMapping
    public ResponseEntity<CodeExecutionResponse> executeCode(@RequestBody CodeExecutionRequest request) {
        try {
            CodeExecutionResponse response = codeExecutionService.executeCode(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            CodeExecutionResponse errorResponse = new CodeExecutionResponse();
            errorResponse.setSuccess(false);
            errorResponse.setError("Error interno del servidor: " + e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }
}
