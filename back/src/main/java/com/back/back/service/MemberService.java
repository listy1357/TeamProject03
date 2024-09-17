package com.back.back.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

import com.back.back.entity.Members;
import com.back.back.repository.MembersRepository;

@Service
public class MemberService {

    @Autowired
    private MembersRepository membersRepository;

    // 회원 저장 또는 업데이트
    public Members saveMember(Members member) {
        return membersRepository.save(member);
    }

    // 회원 ID로 검색
    public Optional<Members> getMemberById(Long id) {
        return membersRepository.findById(id);
    }

    // 회원 아이디로 검색
    public Optional<Members> getMemberByMemberId(String memberId) {
        return membersRepository.findByMemberId(memberId);
    }

    // 회원 이메일로 검색
    public Optional<Members> getMemberByEmail(String email) {
        return membersRepository.findByMemberMail(email);
    }

    // 모든 회원 조회
    public List<Members> getAllMembers() {
        return membersRepository.findAll();
    }

    // 회원 삭제
    public void deleteMember(Long id) {
        membersRepository.deleteById(id);
    }
}
