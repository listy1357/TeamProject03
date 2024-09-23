package com.back.back.entity;


import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Data
@NoArgsConstructor
@Getter
@Setter
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orderId")
    private Long orderId;

    @ManyToOne
    @JoinColumn(name = "memId")
    private Members member; // 회원과 다대일 관계

    @Column(nullable = false)
    private LocalDateTime orderDate; // 주문 날짜
    

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL) 
    private List<Order_Detail> orderDetails; // 주문 상세와 일대다 관계
}

