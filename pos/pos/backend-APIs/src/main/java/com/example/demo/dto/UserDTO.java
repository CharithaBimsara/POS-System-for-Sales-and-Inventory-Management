package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;
    private String username;
    private String password;
    private String role;
    private LocalDateTime createdAt;

    public UserDTO(Long id, String username, String password, String role, LocalDateTime createdAt) {
    this.id =id;
    this.username =username;
    this.password =password;
    this.role = role;
    this.createdAt =createdAt;
    }

    public String getUsername() {
        return this.username;
    }

    public String getPassword() {
        return this.password;
    }

    public String getRole() {
        return this.role;
    }

    public LocalDateTime getCreatedAt() {
        return this.createdAt;
    }
}