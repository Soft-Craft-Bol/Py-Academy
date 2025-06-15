package com.pyAcademy.pyAcademy.features.course.domain.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "course_video_tutorials")
public class CourseVideoTutorialEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private CourseEntity course;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String videoUrl; // URL del video en Cloudinary

    @Column(nullable = false)
    private String thumbnailUrl; // URL de la miniatura en Cloudinary

    @Column(nullable = false)
    private Integer durationInSeconds; // Duración del video en segundos

    @Column(nullable = false)
    private boolean isActive;

    public CourseVideoTutorialEntity() {
    }

    public CourseVideoTutorialEntity(String title, String description, String videoUrl, String thumbnailUrl, Integer durationInSeconds, boolean isActive, CourseEntity course) {
        this.title = title;
        this.description = description;
        this.videoUrl = videoUrl;
        this.thumbnailUrl = thumbnailUrl;
        this.durationInSeconds = durationInSeconds;
        this.isActive = isActive;
        this.course = course;
    }
}