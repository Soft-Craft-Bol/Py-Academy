package com.pyAcademy.pyAcademy.features.saludo.interfaces;

import com.pyAcademy.pyAcademy.features.saludo.application.SaludoService;
import com.pyAcademy.pyAcademy.features.saludo.domain.Saludo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/saludo")
public class SaludoController {

    private final SaludoService saludoService;

    public SaludoController(SaludoService saludoService) {
        this.saludoService = saludoService;
    }

    @GetMapping
    public Saludo saludar(@RequestParam(defaultValue = "Usuario") String nombre) {
        return saludoService.saludarUsuario(nombre);
    }
}