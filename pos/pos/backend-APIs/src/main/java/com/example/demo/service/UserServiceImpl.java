package com.example.demo.service;

import com.example.demo.dto.UserDTO;
import com.example.demo.dto.UserValidationResponse;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setPassword(userDTO.getPassword());
        user.setRole(userDTO.getRole());
        user.setCreatedAt(userDTO.getCreatedAt());
        User savedUser = userRepository.save(user);
        return new UserDTO(savedUser.getId(), savedUser.getUsername(), savedUser.getPassword(), savedUser.getRole(), savedUser.getCreatedAt());
    }

    @Override
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        return new UserDTO(user.getId(), user.getUsername(), user.getPassword(), user.getRole(), user.getCreatedAt());
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> new UserDTO(user.getId(), user.getUsername(), user.getPassword(), user.getRole(), user.getCreatedAt()))
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO updateUser(Long id, UserDTO userDTO) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setUsername(userDTO.getUsername());
        user.setPassword(userDTO.getPassword());
        user.setRole(userDTO.getRole());
        User updatedUser = userRepository.save(user);
        return new UserDTO(updatedUser.getId(), updatedUser.getUsername(), updatedUser.getPassword(), updatedUser.getRole(), updatedUser.getCreatedAt());
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserValidationResponse validateUser(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user != null && user.getPassword().equals(password)) {
            return new UserValidationResponse(true, user.getRole()); // Use the correct constructor
        } else {
            return new UserValidationResponse(false, "null"); // Use the correct constructor
        }
    }

}