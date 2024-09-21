package com.back.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

import com.back.back.entity.Members;

public interface MembersRepository extends JpaRepository<Members, Long> {
    Optional<Members> findByMemberId(String memId); // 회원 아이디로 검색
    Optional<Members> findByMemberMail(String memMail); // 이메일로 검색
    Optional<Members> findByMemPhone(String phone);  // 전화번호로 검색

}

