package com.pyAcademy.pyAcademy.features.saludo.infrastructure.adapters;

import com.pyAcademy.pyAcademy.features.saludo.domain.Saludo;
import com.pyAcademy.pyAcademy.features.saludo.domain.puertos.SaludoPort;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class SaludoAdapter implements SaludoPort {

    @Value("${app.version}")
    private String version;

    @Override
    public Saludo obtenerSaludo(String nombre) {
        String mensaje = String.format("¡Bienvenido a la Plataforma Educativa, %s!", nombre);
        return new Saludo(mensaje, version);
    }
}