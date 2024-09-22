package com.back.back.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.back.back.entity.Members;

public interface MembersRepository extends JpaRepository<Members, Long> {
    Optional<Members> findById(String id); // 회원 아이디로 검색
    Optional<Members> findByEmail(String memMail); // 이메일로 검색
    Optional<Members> findByPhoneNumber(String phone);  // 전화번호로 검색

}

