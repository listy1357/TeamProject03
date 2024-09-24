package com.back.back.dto;

import java.util.Date;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberDto {
    @Column(name = "mem_Id")
    private String id;
    @Column(name="mem_Email", nullable = false, unique = true)
    private String email;
    @Column(name="mem_Pw", nullable = false)
    private String password;
    @Column(name="mem_Name", nullable = false)
    private String name;
    @Column(name="mem_Phone")
    private String phoneNumber;
    @Column(name="mem_Addr1")
    private String zipcode;
    @Column(name="mem_Addr2")
    private String address;
    @Column(name="mem_Addr3")
    private String detailAddress;
    @Column(name="mem_Birth")
    private Date birth;
}