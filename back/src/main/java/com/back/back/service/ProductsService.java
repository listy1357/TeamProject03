package com.back.back.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.back.back.entity.ProductImage;
import com.back.back.entity.Products;
import com.back.back.repository.ProductImageRepository;
import com.back.back.repository.ProductsRepository;

import jakarta.transaction.Transactional;

@Service
public class ProductsService {

    @Autowired
    private ProductsRepository productsRepository;

    @Autowired
    private ProductImageRepository productImageRepository;

    // 상품 저장 또는 업데이트
    @Transactional
    public Products saveProduct(Products product, List<String> imageUrls) {
        Products savedProduct = productsRepository.save(product);
        for (String imageUrl : imageUrls) {
            ProductImage productImage = new ProductImage(imageUrl, savedProduct);
            productImageRepository.save(productImage);
        }
        return savedProduct;
    }

    // 상품 ID로 검색
    public Optional<Products> getProductById(Long productId) {
        return productsRepository.findById(productId);
    }

    // 카테고리로 상품 검색
    public List<Products> getProductsByCategory(String productCategory) {
        return productsRepository.findByCategory(productCategory);
    }

    // 이름으로 상품 검색
    public List<Products> getProductsByName(String productName) {
        return productsRepository.findByNameContaining(productName);
    }

    // 가격이 특정 값보다 큰 상품 검색
    public List<Products> getProductsWithPriceGreaterThan(int productPrice) {
        return productsRepository.findProductsWithPriceGreaterThan(productPrice);
    }

    // 모든 상품 조회
    public List<Products> getAllProducts() {
        return productsRepository.findAll();
    }

    // 상품 삭제
    public void deleteProduct(Long productId) {
        productsRepository.deleteById(productId);
    }
}
