package com.back.back.entity;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private members member; // 회원과 다대일 관계

    @Column(nullable = false)
    private LocalDateTime orderDate; // 주문 날짜

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<order_detail> orderDetails; // 주문 상세와 일대다 관계
}

