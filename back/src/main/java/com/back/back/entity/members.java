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
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
public class Members {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="Id")
    private Long uniqueid;

    @Column(name = "memId")
    private String id;

    @Column(name="memPw", nullable = false)
    private String password;

    @Column(name="memName", nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name="memAddr1")
    private String zipcode; // 우편번호
    @Column(name="memAddr2")
    private String address; // 지역
    @Column(name="memAddr3")
    private String detailAddress; // 상세주소

    @Column(nullable = false)
    private boolean adminCk; // 관리자 여부

    private LocalDateTime regDate; // 회원 가입일

    private int point; // 회원 포인트

    @Column(name="memBirth")
    private LocalDate birth;  // 생일

    @Column(nullable = false)
    private boolean mailCk;  // 이메일 수신 동의

    @Column(name="memPhone")
    private String phoneNumber; //전화번호

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Orders> orders;


  
    

}
