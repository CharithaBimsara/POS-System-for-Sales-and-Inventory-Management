package com.example.demo.dto;

import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
//@AllArgsConstructor
public class UserValidationResponse {
    private boolean isValid;
    private String role;

    public UserValidationResponse(boolean isValid, String role) {
        this.isValid = isValid;
        this.role = role;
    }

    public boolean isValid() {
        return isValid;
    }

    public void setValid(boolean valid) {
        isValid = valid;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
