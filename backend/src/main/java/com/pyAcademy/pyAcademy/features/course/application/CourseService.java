package com.pyAcademy.pyAcademy.features.course.application;

import com.pyAcademy.pyAcademy.features.course.application.dto.CourseDetailsDTO;
import com.pyAcademy.pyAcademy.features.course.application.dto.CourseWithTeacherDetailsDTO;
import com.pyAcademy.pyAcademy.features.course.application.dto.TeacherDetailsDTO;
import com.pyAcademy.pyAcademy.features.course.domain.CourseRepository;
import com.pyAcademy.pyAcademy.features.course.domain.models.CourseEntity;
import com.pyAcademy.pyAcademy.features.course.domain.models.CourseTeacherEntity;
import com.pyAcademy.pyAcademy.features.education.domain.models.TeacherEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final CourseTeacherService courseTeacherService;
    private final CourseCloudinaryService courseCloudinaryService;

    @Autowired
    private CourseService(
            CourseRepository courseRepository,
            CourseTeacherService courseTeacherService, CourseCloudinaryService courseCloudinaryService
    ){
        this.courseRepository = courseRepository;
        this.courseTeacherService = courseTeacherService;
        this.courseCloudinaryService = courseCloudinaryService;
    }

    public CourseEntity createCourse(CourseEntity course, Long teacherId, MultipartFile imageFile) throws IOException {
        String imageUrl = courseCloudinaryService.uploadCourseImage(imageFile);
        course.setImageUrl(imageUrl);
        Optional<TeacherEntity> teacherOptional = courseTeacherService.getTeacherById(teacherId);
        if (teacherOptional.isEmpty()) {
            throw new RuntimeException("El maestro con ID " + teacherId + " no existe");
        }
        CourseEntity savedCourse = courseRepository.save(course);

        CourseTeacherEntity courseTeacher = new CourseTeacherEntity();
        courseTeacher.setCourse(savedCourse);
        courseTeacher.setTeacher(teacherOptional.get());
        courseTeacher.setAssignedDate(new Timestamp(System.currentTimeMillis()));
        courseTeacher.setRole("Instructor");
        courseTeacherService.saveCourseTeacher(courseTeacher);
        return savedCourse;
    }

    public CourseEntity updateCourse(Long id, CourseEntity course, MultipartFile imageFile) throws IOException {
        Optional<CourseEntity> existingCourse = courseRepository.findById(id);
        if (existingCourse.isPresent()) {
            // Si se proporciona una nueva imagen, subirla y actualizar la URL
            if (imageFile != null && !imageFile.isEmpty()) {
                // Eliminar la imagen anterior si existe
                if (existingCourse.get().getImageUrl() != null) {
                    courseCloudinaryService.deleteCourseImage(existingCourse.get().getImageUrl());
                }
                String newImageUrl = courseCloudinaryService.uploadCourseImage(imageFile);
                course.setImageUrl(newImageUrl);
            } else {
                // Mantener la imagen existente si no se proporciona una nueva
                course.setImageUrl(existingCourse.get().getImageUrl());
            }

            course.setId(id);
            return courseRepository.save(course);
        }
        throw new RuntimeException("Curso no encontrado");
    }

    public void deleteCourse(Long id) {
        if (courseRepository.existsById(id)) {
            courseRepository.deleteById(id);
        } else {
            throw new RuntimeException("Curso no encontrado");
        }
    }

    public Map<String, Object> getAllCourses(int page, int size) {
        Map<String, Object> response = new HashMap<>();
        try {
            // Obtener la página de cursos
            Pageable pageable = PageRequest.of(page, size);
            Page<CourseEntity> coursePage = courseRepository.findAll(pageable);

            List<CourseWithTeacherDetailsDTO> coursesWithTeachers = coursePage.getContent().stream().map(course -> {
                Optional<CourseTeacherEntity> courseTeacher = courseTeacherService.getCourseTeacherRepository()
                        .stream()
                        .filter(ct -> ct.getCourse().getId().equals(course.getId()))
                        .findFirst();

                CourseDetailsDTO courseDetails = new CourseDetailsDTO(
                        course.getName(),
                        course.getDescription(),
                        course.getDurationInHours(),
                        course.getLevel(),
                        course.getPrice(),
                        course.getStartDate(),
                        course.getEndDate(),
                        course.getMaxStudents(),
                        course.isActive(),
                        course.getImageUrl(),
                        course.getId()

                );

                TeacherDetailsDTO teacherDetails = courseTeacher.map(ct -> new TeacherDetailsDTO(
                        ct.getTeacher().getFirstName(),
                        ct.getTeacher().getLastName(),
                        ct.getTeacher().getEmail(),
                        ct.getTeacher().getTelefono(),
                        ct.getTeacher().getPhoto()
                )).orElse(null);

                return new CourseWithTeacherDetailsDTO(courseDetails, teacherDetails);
            }).toList();

            // Agregar metadatos de paginación a la respuesta
            response.put("cursosConProfesor", coursesWithTeachers);
            response.put("currentPage", coursePage.getNumber());
            response.put("totalItems", coursePage.getTotalElements());
            response.put("totalPages", coursePage.getTotalPages());
            response.put("hasNext", coursePage.hasNext());

        } catch (Exception e) {
            throw new RuntimeException("Error al obtener los cursos", e);
        }
        return response;
    }

}