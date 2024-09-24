package com.back.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

import com.back.back.entity.Products;

public interface ProductsRepository extends JpaRepository<Products, Long> {
    List<Products> findByProductCategory(String category); // 카테고리로 상품 검색
    List<Products> findByProductName(String name); // 상품 이름으로 검색
    
}
