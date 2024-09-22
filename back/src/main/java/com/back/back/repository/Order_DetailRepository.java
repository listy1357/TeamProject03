package com.back.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import com.back.back.entity.Order_Detail;
import com.back.back.entity.Orders;


public interface Order_DetailRepository extends JpaRepository<Order_Detail, Long> {
    List<Order_Detail> findByOrder(Orders order); // Orders 객체로 주문 상세 검색
}