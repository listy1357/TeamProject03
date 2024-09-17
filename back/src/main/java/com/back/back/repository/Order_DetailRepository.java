package com.back.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import com.back.back.entity.Order_Detail;

public interface Order_DetailRepository extends JpaRepository<Order_Detail, Long> {
    List<Order_Detail> findByOrderId(Long orderId); // 주문 ID로 주문 상세 검색
    // 추가적인 메소드가 필요하다면 여기에 정의할 수 있습니다.
}
