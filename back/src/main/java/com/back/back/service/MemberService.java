package com.back.back.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public Optional<Members> getMemberById(Long memId) {
        return membersRepository.findById(memId);
    }

    // 회원 이메일로 검색
    public Optional<Members> getMemberByEmail(String memEmail) {
        return membersRepository.findByMemberMail(memEmail);
    }

    // 전화번호로 조회
    public Optional<Members> getMemberByPhone(String phone) {
        return membersRepository.findByMemPhone(phone);  // 여기를 수정
    }

    // 모든 회원 조회
    public List<Members> getAllMembers() {
        return membersRepository.findAll();
    }

    // 회원 삭제
    public void deleteMember(Long memId) {
        membersRepository.deleteById(memId);
    }
}
