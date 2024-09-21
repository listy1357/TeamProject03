package com.back.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import com.back.back.entity.Members;
import com.back.back.service.MemberService;

@RestController
@RequestMapping("/api/members")
public class MemberController {

    @Autowired
    private MemberService memberService;

    // 회원 등록 (POST /api/members)
    @PostMapping
    public Members createMember(@RequestBody Members member) {
        return memberService.createMember(member);
    }
    // 회원 수정 (PUT /api/members/{id})
    @PutMapping("/{id}")
    public Members updateMember(@PathVariable Long id, @RequestBody Members updatedMember) {
        return memberService.updateMember(id, updatedMember);
    }

    // 회원 고유ID로 검색
    @GetMapping("/{id}")
    public ResponseEntity<Members> getMemberById(@PathVariable Long id) {
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
    public ResponseEntity<Members> getMemberByPhone(@RequestParam String phone) {
        Optional<Members> member = memberService.getMemberByPhone(phone);
        return member.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 모든 회원 조회 (GET /api/members)
    @GetMapping
    public List<Members> getAllMembers() {
        return memberService.getAllMembers();
    }

    // 회원 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable Long id) {
        memberService.deleteMember(id);
        return ResponseEntity.noContent().build();
    }
}
