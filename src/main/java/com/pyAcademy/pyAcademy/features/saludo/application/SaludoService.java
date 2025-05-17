package com.pyAcademy.pyAcademy.features.saludo.application;

import com.pyAcademy.pyAcademy.features.saludo.domain.Saludo;
import com.pyAcademy.pyAcademy.features.saludo.domain.puertos.SaludoPort;
import org.springframework.stereotype.Service;

@Service
public class SaludoService {

    private final SaludoPort saludoPort;

    public SaludoService(SaludoPort saludoPort) {
        this.saludoPort = saludoPort;
    }

    public Saludo saludarUsuario(String nombre) {
        return saludoPort.obtenerSaludo(nombre);
    }
}