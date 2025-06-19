package com.pyAcademy.pyAcademy.features.learning.infrastructure.adapter.output;

import com.pyAcademy.pyAcademy.features.learning.application.ports.output.FileStoragePort;
import com.pyAcademy.pyAcademy.features.learning.infrastructure.exception.FileStorageException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Component
public class LocalFileStorageAdapter implements FileStoragePort {

    @Value("${file.storage.directory:./uploads}")
    private String storageDirectory;

    @Override
    public String storeFile(byte[] fileContent, String fileName) {
        try {
            Path storagePath = Paths.get(storageDirectory);
            if (!Files.exists(storagePath)) {
                Files.createDirectories(storagePath);
            }

            Path filePath = storagePath.resolve(fileName);
            Files.write(filePath, fileContent);

            return filePath.toString();
        } catch (IOException e) {
            throw new FileStorageException("Failed to store file " + fileName, e);
        }
    }

    @Override
    public byte[] retrieveFile(String filePath) {
        try {
            return Files.readAllBytes(Paths.get(filePath));
        } catch (IOException e) {
            throw new FileStorageException("Failed to retrieve file " + filePath, e);
        }
    }

    @Override
    public void deleteFile(String filePath) {
        try {
            Files.deleteIfExists(Paths.get(filePath));
        } catch (IOException e) {
            throw new FileStorageException("Failed to delete file " + filePath, e);
        }
    }
}