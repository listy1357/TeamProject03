package com.back.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.back.back.entity.ProductImage;

public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
    // 필요 시, 이미지 관련 쿼리를 추가
}
