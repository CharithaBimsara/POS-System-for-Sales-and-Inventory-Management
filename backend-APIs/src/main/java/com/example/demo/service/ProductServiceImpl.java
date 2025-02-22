package com.example.demo.service;

import com.example.demo.dto.ProductDTO;
import com.example.demo.dto.ProductPosDTO;
import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public ProductDTO createProduct(ProductDTO productDTO) {
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setStockQuantity(productDTO.getStockQuantity());
        product.setBarcode(productDTO.getBarcode());
        product.setCreatedAt(productDTO.getCreatedAt());
        Product savedProduct = productRepository.save(product);
        return new ProductDTO(savedProduct.getId(), savedProduct.getCategory().getId(), product.getCategory().getName(), savedProduct.getName(), savedProduct.getDescription(), savedProduct.getPrice(), savedProduct.getStockQuantity(), savedProduct.getBarcode(), savedProduct.getCreatedAt());
    }

    @Override
    public ProductPosDTO getProductById(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
        return new ProductPosDTO(product.getId(), product.getName(), product.getPrice(), product.getStockQuantity(), product.getCategory().getName());
    }

    @Override
    public List<ProductPosDTO> getAllProducts() {
        return productRepository.findAll().stream()
                .map(product -> new ProductPosDTO(product.getId(), product.getName(), product.getPrice(), product.getStockQuantity(), product.getCategory().getName()))
                .collect(Collectors.toList());
    }

    @Override
    public ProductDTO updateProduct(Long id, ProductDTO productDTO) {
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setStockQuantity(productDTO.getStockQuantity());
        product.setBarcode(productDTO.getBarcode());
        Product updatedProduct = productRepository.save(product);
        return new ProductDTO(updatedProduct.getId(), updatedProduct.getCategory().getId(), product.getCategory().getName(), updatedProduct.getName(), updatedProduct.getDescription(), updatedProduct.getPrice(), updatedProduct.getStockQuantity(), updatedProduct.getBarcode(), updatedProduct.getCreatedAt());
    }

    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public boolean checkStock(Long productId, Integer quantity) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));
        return product.getStockQuantity() >= quantity;
    }

    @Override
    public void deductStock(Long productId, Integer quantity) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));
        product.setStockQuantity(product.getStockQuantity() - quantity);
        productRepository.save(product);
    }
}
