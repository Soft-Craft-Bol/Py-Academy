package com.pyAcademy.pyAcademy.features.learning.infrastructure.exception;

public class UnitNotFoundException extends RuntimeException {
    public UnitNotFoundException(Long message) {
        super(String.valueOf(message));
    }
}
