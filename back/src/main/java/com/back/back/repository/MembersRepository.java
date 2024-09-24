package com.back.back.repository;

import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.back.back.entity.Members;

@Repository
public interface MembersRepository extends JpaRepository<Members, Long> {

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO members (mem_Id, mem_Email, mem_Pw, mem_Name, mem_Phone, mem_Addr1, mem_Addr2, mem_Addr3, mem_Birth) VALUES (:id, :email, :password, :name, :phoneNumber, :address1, :address2, :address3, :birth)", nativeQuery = true)
    void insertMember(@Param("id") String id,
        @Param("email") String email,
        @Param("password") String password,
        @Param("name") String name,
        @Param("phoneNumber") String phoneNumber,
        @Param("address1") String address1,
        @Param("address2") String address2,
        @Param("address3") String address3,
        @Param("birth") Date birth
        );
}

