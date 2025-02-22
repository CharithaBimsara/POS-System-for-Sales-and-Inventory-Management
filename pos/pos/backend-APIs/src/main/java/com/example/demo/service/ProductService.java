package com.example.demo.service;

import com.example.demo.dto.ProductDTO;
import com.example.demo.dto.ProductPosDTO;

import java.util.List;

public interface ProductService {
    ProductDTO createProduct(ProductDTO productDTO);
    ProductPosDTO getProductById(Long id);
    List<ProductPosDTO> getAllProducts();
    ProductDTO updateProduct(Long id, ProductDTO productDTO);
    void deleteProduct(Long id);
    boolean checkStock(Long productId, Integer quantity);
    void deductStock(Long productId, Integer quantity);
}