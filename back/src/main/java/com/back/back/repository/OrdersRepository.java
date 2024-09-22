package com.back.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.back.back.entity.Orders;

import java.util.List;

public interface OrdersRepository extends JpaRepository<Orders, Long> {
    List<Orders> findByOrderId(Long id); // 회원 ID로 주문 검색
    // 추가적인 메소드가 필요하다면 여기에 정의할 수 있습니다.
}
