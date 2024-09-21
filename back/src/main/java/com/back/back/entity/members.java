package com.back.back.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;


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
    private String memEmail;

    private String memAddr1; // 우편번호
    private String memAddr2; // 지역
    private String memAddr3; // 상세주소

    @Column(nullable = false)
    private boolean adminCk; // 관리자 여부

    private LocalDateTime regDate; // 회원 가입일

    private int point; // 회원 포인트

<<<<<<< HEAD
    private LocalDate membirth;  // 생일

    @Column(nullable = false)
    private boolean mailCk;  // 이메일 수신 동의

=======
>>>>>>> origin/main
    private String memPhone; //전화번호

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Orders> orders;
}
