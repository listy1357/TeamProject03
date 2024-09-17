package com.back.back.entity;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Products {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    @Column(nullable = false)
    private String productName;

    private String productImageUrl; // 이미지 URL

    @Column(nullable = false)
    private int productPrice; // 제품 가격

    private int productStock; // 재고 수량


    private String productCategory; // 카테고리와 다대일 관계
}
