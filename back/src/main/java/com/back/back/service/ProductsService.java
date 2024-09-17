package com.back.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import com.back.back.entity.Products;
import com.back.back.repository.ProductsRepository;

@Service
public class ProductsService {

    @Autowired
    private ProductsRepository productsRepository;

    // 상품 저장 또는 업데이트
    public Products saveProduct(Products product) {
        return productsRepository.save(product);
    }

    // 상품 ID로 검색
    public Optional<Products> getProductById(Long id) {
        return productsRepository.findById(id);
    }

    // 카테고리로 상품 검색
    public List<Products> getProductsByCategory(String category) {
        return productsRepository.findByCategory(category);
    }

    // 이름으로 상품 검색
    public List<Products> getProductsByName(String name) {
        return productsRepository.findByNameContaining(name);
    }

    // 가격이 특정 값보다 큰 상품 검색
    public List<Products> getProductsWithPriceGreaterThan(int price) {
        return productsRepository.findProductsWithPriceGreaterThan(price);
    }

    // 모든 상품 조회
    public List<Products> getAllProducts() {
        return productsRepository.findAll();
    }

    // 상품 삭제
    public void deleteProduct(Long id) {
        productsRepository.deleteById(id);
    }
}
