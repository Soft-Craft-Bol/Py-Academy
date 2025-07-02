package com.pyAcademy.pyAcademy.features.education.infrastructure.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDetailsResponse {
    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private Long telefono;
    private String photo;
    private String userType;
}
