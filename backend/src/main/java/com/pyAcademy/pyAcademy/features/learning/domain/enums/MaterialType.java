package com.pyAcademy.pyAcademy.features.learning.domain.enums;

public enum MaterialType {
    VIDEO("Video", ".mp4"),
    ARTICLE("Article", ".html"),
    QUIZ("Quiz", ".quiz"),
    DOCUMENT("Document", ".docx"),
    PDF("PDF", ".pdf"),
    PRESENTATION("Presentation", ".pptx"),
    LINK("Link", ".url");

    private final String label;
    private final String extension;

    MaterialType(String label, String extension) {
        this.label = label;
        this.extension = extension;
    }

    public String getLabel() {
        return label;
    }

    public String getExtension() {
        return extension;
    }
}
