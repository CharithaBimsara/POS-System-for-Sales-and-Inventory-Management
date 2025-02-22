package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "product")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @ManyToOne
//    @JoinColumn(name = "category_id")
//    private Category category;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private ProductCategory category;


    private String name;
    private String description;
    private BigDecimal price;
    private Integer stockQuantity;
    private String barcode;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description =description;
    }

    public void setPrice(BigDecimal price) {
        this.price =price;
    }

    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity =stockQuantity;
    }

    public void setBarcode(String barcode) {
        this.barcode = barcode;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

//    public Category getCategory() {
//        return this.category;
//    }
    public ProductCategory getCategory() {
    return category;
}


    public String getName() {
        return this.name;
    }

    public String getDescription() {
        return this.description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public Integer getStockQuantity() {
        return this.stockQuantity;
    }

    public String getBarcode() {
        return this.barcode;
    }

    public LocalDateTime getCreatedAt() {
        return this.createdAt;
    }
}
