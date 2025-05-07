package com.pyAcademy.pyAcademy.saludo.domain.puertos;

import com.pyAcademy.pyAcademy.saludo.domain.Saludo;

public interface SaludoPort {
    Saludo obtenerSaludo(String nombre);
}