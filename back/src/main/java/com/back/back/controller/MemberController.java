package com.back.back.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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

    // 회원 등록 (POST /api/members)
    @PostMapping("/join")
    public ResponseEntity<Members> createMember(@RequestBody Members member) {
        Members savedMember = memberService.createMember(member);
        System.out.println(member.getName());
        // 성공적으로 처리되면 응답
        return ResponseEntity.ok(savedMember);
    }
    // 회원 수정 (PUT /api/members/{id})
    @PutMapping("/{memId}")
    public Members updateMember(@PathVariable Long Id, @RequestBody Members updatedMember) {
        return memberService.updateMember(Id, updatedMember);
    }

    // 회원 ID로 검색
    @GetMapping("/{memId}")
    public ResponseEntity<Members> getMemberById(@PathVariable String id) {
        Optional<Members> member = memberService.getMemberById(id);
        return member.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    // 이메일로 회원 검색
    @GetMapping("/email")
    public ResponseEntity<Members> getMemberByEmail(@RequestParam String email) {
        Optional<Members> member = memberService.getMemberByEmail(email);
        return member.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 폰번호로 회원 검색
    @GetMapping("/Phone")
    public ResponseEntity<Members> getMemberByPhoneNumber(@RequestParam String phoneNumber) {
        Optional<Members> member = memberService.getMemberByPhoneNumber(phoneNumber);
        return member.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
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
