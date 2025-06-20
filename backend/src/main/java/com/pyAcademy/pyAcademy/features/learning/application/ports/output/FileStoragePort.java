package com.pyAcademy.pyAcademy.features.learning.application.ports.output;

public interface FileStoragePort {
    String storeFile(byte[] fileContent, String fileName);
    byte[] retrieveFile(String filePath);
    void deleteFile(String filePath);
}