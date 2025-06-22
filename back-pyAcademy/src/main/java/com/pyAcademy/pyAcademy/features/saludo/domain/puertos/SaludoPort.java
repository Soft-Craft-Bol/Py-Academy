package com.pyAcademy.pyAcademy.features.saludo.domain.puertos;

import com.pyAcademy.pyAcademy.features.saludo.domain.Saludo;

public interface SaludoPort {
    Saludo obtenerSaludo(String nombre);
}