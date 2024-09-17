package com.back.back.entity;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderid;

    @ManyToOne
    @JoinColumn(name = "memId")
    private Members member; // 회원과 다대일 관계

    @Column(nullable = false)
    private LocalDateTime orderDate; // 주문 날짜

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<Order_Detail> orderDetails; // 주문 상세와 일대다 관계
}

