package com.example.orgbrain.DTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeRequest {

    private String name;
    private String email;
    private String phoneNumber;
    private String role;
    private String techStack;
    private int experience;
    private boolean available;
}


