package com.pyAcademy.pyAcademy.features.saludo.domain;

public class Saludo {
    private final String mensaje;
    private final String version;

    public Saludo(String mensaje, String version) {
        this.mensaje = mensaje;
        this.version = version;
    }

    public String getMensaje() {
        return mensaje;
    }

    public String getVersion() {
        return version;
    }
}