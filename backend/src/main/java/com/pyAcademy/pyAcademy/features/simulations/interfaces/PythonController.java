package com.pyAcademy.pyAcademy.features.simulations.interfaces;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;

// @RestController
// @RequestMapping("/execute")
public class PythonController {

    @PostMapping
    public ResponseEntity<String> ejecutarPython(@RequestBody Map<String, String> payload) {
        String codigo = payload.get("code");

        try {
            Path scriptTemp = Files.createTempFile("user_script", ".py");
            Files.write(scriptTemp, codigo.getBytes());

            ProcessBuilder pb = new ProcessBuilder("python", scriptTemp.toAbsolutePath().toString());
            pb.redirectErrorStream(true);
            Process proceso = pb.start();

            BufferedReader lector = new BufferedReader(new InputStreamReader(proceso.getInputStream()));
            StringBuilder salida = new StringBuilder();
            String linea;
            while ((linea = lector.readLine()) != null) {
                salida.append(linea).append("\n");
            }

            proceso.waitFor();
            return ResponseEntity.ok(salida.toString());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al ejecutar el código: " + e.getMessage());
        }
    }
}
