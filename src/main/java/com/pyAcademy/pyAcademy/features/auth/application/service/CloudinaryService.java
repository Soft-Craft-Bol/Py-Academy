package com.pyAcademy.pyAcademy.features.auth.application.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    @Value("${cloudinary.upload_folder}")
    private String uploadFolder;

    @Autowired
    public CloudinaryService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public String uploadFile(MultipartFile file) throws IOException {
        File uploadedFile = convertMultiPartToFile(file);
        Map<String, Object> options = new HashMap<>();
        options.put("folder", uploadFolder);

        Map<?, ?> uploadResult = cloudinary.uploader().upload(uploadedFile, options);
        uploadedFile.delete();

        return (String) uploadResult.get("secure_url");
    }

    public String deleteFile(String imageUrl) throws IOException {
        String publicId = extractPublicIdFromUrl(imageUrl);
        Map<?, ?> result = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        return (String) result.get("result");
    }

    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convFile = new File(file.getOriginalFilename());
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }

    private String extractPublicIdFromUrl(String imageUrl) {
        return imageUrl.substring(imageUrl.lastIndexOf("/") + 1, imageUrl.lastIndexOf("."));
    }
}