package com.pyAcademy.pyAcademy.features.education.application.usecase;

import com.pyAcademy.pyAcademy.features.course.domain.models.CourseEnrollmentsEntity;
import com.pyAcademy.pyAcademy.features.education.infrastructure.adapters.jpa.CourseEnrollmentRepository;
import com.pyAcademy.pyAcademy.features.education.infrastructure.dto.response.EnrolledCourseResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetStudentEnrolledCoursesUseCase {

    private final CourseEnrollmentRepository courseEnrollmentRepository;

    public GetStudentEnrolledCoursesUseCase(CourseEnrollmentRepository courseEnrollmentRepository) {
        this.courseEnrollmentRepository = courseEnrollmentRepository;
    }

    public List<EnrolledCourseResponse> execute(Long studentId) {
        List<CourseEnrollmentsEntity> enrollments = courseEnrollmentRepository.findByStudentId(studentId);
        return enrollments.stream()
                .map(enrollment -> {
                    var course = enrollment.getCourse();
                    return new EnrolledCourseResponse(
                            course.getId(),
                            course.getName(),
                            course.getDescription(),
                            course.getDurationInHours(),
                            course.getLevel(),
                            course.getPrice(),
                            course.getStartDate(),
                            course.getEndDate(),
                            course.getImageUrl()
                    );   }
                )
                .collect(Collectors.toList());
    }
}
