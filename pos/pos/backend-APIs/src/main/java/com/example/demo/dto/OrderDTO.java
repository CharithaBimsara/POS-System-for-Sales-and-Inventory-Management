package com.example.demo.dto;

//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//import java.math.BigDecimal;
//import java.util.Collection;
//import java.util.List;
//
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//import java.math.BigDecimal;
//import java.time.LocalDateTime;
//import java.util.List;
//
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
//public class OrderDTO {
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public Long getCustomerId() {
//        return customerId;
//    }
//
//    public void setCustomerId(Long customerId) {
//        this.customerId = customerId;
//    }
//
//    public Long getUserId() {
//        return userId;
//    }
//
//    public void setUserId(Long userId) {
//        this.userId = userId;
//    }
//
//    public void setTotalAmount(BigDecimal totalAmount) {
//        this.totalAmount = totalAmount;
//    }
//
//    public void setStatus(String status) {
//        this.status = status;
//    }
//
//    public void setPaymentMethod(String paymentMethod) {
//        this.paymentMethod = paymentMethod;
//    }
//
//    public void setCreatedAt(LocalDateTime createdAt) {
//        this.createdAt = createdAt;
//    }
//
//    public void setOrderItems(List<OrderItemDTO> orderItems) {
//        this.orderItems = orderItems;
//    }
//
//    private Long id;
//    private Long customerId;
//    private Long userId;
//    private BigDecimal totalAmount;
//    private String status;
//    private String paymentMethod;
//    private LocalDateTime createdAt;
//    private List<OrderItemDTO> orderItems;
//
//    public BigDecimal getTotalAmount() {
//        return this.totalAmount;
//    }
//    public String getStatus() {
//        return this.status;
//    }
//
//    public String getPaymentMethod() {
//        return paymentMethod;
//    }
//    public LocalDateTime getCreatedAt() {
//        return createdAt;
//    }
//
//    public List<OrderItemDTO> getOrderItems() {
//        return this.orderItems;
//    }
//}


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
    private Long id;
    private Long customerId;
    private Long userId;
    private BigDecimal totalAmount;
    private String status;
    private String paymentMethod;
    private LocalDateTime createdAt;
    private List<OrderItemDTO> orderItems; // Ensure this is initialized


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<OrderItemDTO> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItemDTO> orderItems) {
        this.orderItems = orderItems;
    }
}