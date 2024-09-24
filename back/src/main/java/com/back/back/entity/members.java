package com.back.back.entity;


import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
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

    @Column(name = "mem_Id")
    private String id;

    @Column(name="mem_Pw", nullable = false)
    private String password;

    @Column(name="mem_Name", nullable = false)
    private String name;

    @Column(name="mem_Email", nullable = false, unique = true)
    private String email;

    @Column(name="mem_Addr1")
    private String zipcode; // 우편번호
    @Column(name="mem_Addr2")
    private String address; // 지역
    @Column(name="mem_Addr3")
    private String detailAddress; // 상세주소

    @Column(nullable = false, columnDefinition = "boolean default false")
    private boolean adminCk = false; // 관리자 여부

    @Column(name = "reg_date", updatable = false)
    private LocalDateTime regDate; // 회원 가입일
    @PrePersist
    protected void onCreate() {
        regDate = LocalDateTime.now(); // 현재 시간 설정
    }

    @Column(nullable = false, columnDefinition = "int default 0")
    private int point = 0; // 회원 포인트

    @Column(name="mem_Birth")
    private Date birth;  // 생일

    @Column(nullable = false, columnDefinition = "boolean default false")
    private boolean mailCk = false;  // 이메일 수신 동의

    @Column(name="mem_Phone")
    private String phoneNumber; //전화번호

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Orders> orders;


  
    

}
