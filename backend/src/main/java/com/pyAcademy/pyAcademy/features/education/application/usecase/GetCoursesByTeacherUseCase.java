package com.pyAcademy.pyAcademy.features.education.application.usecase;

import com.pyAcademy.pyAcademy.features.course.domain.CourseRepository;
import com.pyAcademy.pyAcademy.features.course.domain.CourseTeacherRepository;
import com.pyAcademy.pyAcademy.features.course.domain.models.CourseTeacherEntity;
import com.pyAcademy.pyAcademy.features.education.infrastructure.dto.response.CreatedCourseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GetCoursesByTeacherUseCase {

    private final CourseTeacherRepository courseTeacherRepository;

    public List<CreatedCourseResponse> execute(Long teacherId) {
        return courseTeacherRepository.findByTeacherId(teacherId)
                .stream()
                .map(CourseTeacherEntity::getCourse)
                .map(course -> new CreatedCourseResponse(
                        course.getId(),
                        course.getName(),
                        course.getDescription(),
                        course.getDurationInHours(),
                        course.getLevel(),
                        course.getPrice(),
                        course.getStartDate(),
                        course.getEndDate(),
                        course.isActive()
                ))
                .collect(Collectors.toList());
    }
}
