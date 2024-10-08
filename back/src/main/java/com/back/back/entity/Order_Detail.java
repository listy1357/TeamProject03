package com.back.back.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
@NoArgsConstructor
@Getter
@Setter
public class Order_Detail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderDetailid;

    @ManyToOne
    @JoinColumn(name = "orderId")
    private Orders order; // 주문과 다대일 관계

    @ManyToOne
    @JoinColumn(name = "productId")
    private Products product; // 제품과 다대일 관계

    @Column(nullable = false)
    private int quantity; // 구매 수량

    @Column(nullable = false)
    private int price; // 제품 가격 (주문 시점의 가격)
}
