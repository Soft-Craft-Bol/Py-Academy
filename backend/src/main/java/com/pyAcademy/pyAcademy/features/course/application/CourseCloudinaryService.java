package com.pyAcademy.pyAcademy.features.course.application;

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
public class CourseCloudinaryService {

    private final Cloudinary cloudinary;

    @Value("${cloudinary.courses_upload_folder}")
    private String coursesUploadFolder;

    @Autowired
    public CourseCloudinaryService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public String uploadCourseImage(MultipartFile file) throws IOException {
        File uploadedFile = convertMultiPartToFile(file);
        Map<String, Object> options = new HashMap<>();
        options.put("folder", coursesUploadFolder);

        Map<?, ?> uploadResult = cloudinary.uploader().upload(uploadedFile, options);
        uploadedFile.delete();

        return (String) uploadResult.get("secure_url");
    }

    public String deleteCourseImage(String imageUrl) throws IOException {
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