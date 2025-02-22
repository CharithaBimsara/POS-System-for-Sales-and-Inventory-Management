package com.example.demo.service;

import com.example.demo.dto.UserDTO;
import com.example.demo.dto.UserValidationResponse;

import java.util.List;

public interface UserService {
    UserDTO createUser(UserDTO userDTO);
    UserDTO getUserById(Long id);

    List<UserDTO> getAllUsers();
    UserDTO updateUser(Long id, UserDTO userDTO);
    void deleteUser(Long id);
    UserValidationResponse validateUser(String username, String password);
}
