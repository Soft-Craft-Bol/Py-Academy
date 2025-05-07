package com.pyAcademy.pyAcademy.saludo.application;

import com.pyAcademy.pyAcademy.saludo.domain.Saludo;
import com.pyAcademy.pyAcademy.saludo.domain.puertos.SaludoPort;
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