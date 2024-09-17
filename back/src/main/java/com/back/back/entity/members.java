package com.back.back.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.core.OrderComparator;

@Entity
@Data
@NoArgsConstructor
public class Members {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memId;

    @Column(nullable = false)
    private String memPw;

    @Column(nullable = false)
    private String memName;

    @Column(nullable = false, unique = true)
    private String memMail;

    private String memAddr1; // 우편번호
    private String memAddr2; // 지역
    private String memAddr3; // 상세주소

    @Column(nullable = false)
    private boolean adminCk; // 관리자 여부

    private LocalDateTime regDate; // 회원 가입일

    private int point; // 회원 포인트

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Orders> orders;
}
