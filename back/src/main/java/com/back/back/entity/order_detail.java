package com.back.back.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
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
