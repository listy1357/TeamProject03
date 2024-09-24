package com.back.back.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.back.back.dto.LogInDto;
import com.back.back.dto.MemberDto;
import com.back.back.entity.Members;
import com.back.back.service.MemberService;

import lombok.RequiredArgsConstructor;
@CrossOrigin(origins = "http://localhost:3000") // React 앱의 주소
@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    @Autowired
    private MemberService memberService;

    @PostMapping("/join")
    public ResponseEntity<Members> createMember(@RequestBody MemberDto memberDto) {
        memberService.createMember(memberDto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LogInDto logInDto) {
        Members member = memberService.login(logInDto);

        if (member != null) {
            return ResponseEntity.ok(member); // 로그인 성공
        } else {
            return ResponseEntity.status(401).body("로그인 실패: 아이디 또는 비밀번호가 잘못되었습니다."); // 로그인 실패
        }
    }
    



    // 회원 수정 (PUT /api/members/{id})
    @PutMapping("/{memId}")
    public Members updateMember(@PathVariable Long Id, @RequestBody Members updatedMember) {
        return memberService.updateMember(Id, updatedMember);
    }


    // 모든 회원 조회 (GET /api/members)
    @GetMapping
    public List<Members> getAllMembers() {
        return memberService.getAllMembers();
    }

    // 회원 삭제
    @DeleteMapping("/{Id}")
    public ResponseEntity<Void> deleteMember(@PathVariable Long Id) {
        memberService.deleteMember(Id);
        return ResponseEntity.noContent().build();
    }
}
