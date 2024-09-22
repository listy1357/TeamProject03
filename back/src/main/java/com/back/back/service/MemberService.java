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

    // 회원 생성
    public Members createMember(Members member) {
        return membersRepository.save(member);
    }

    // // 회원 저장 또는 업데이트
    // public Members saveMember(Members member) {
    //     return membersRepository.save(member);
    // }
    // 회원 수정
    public Members updateMember(Long memId, Members updatedMember) {
        // 먼저 해당 ID의 회원이 존재하는지 확인
        Optional<Members> existingMemberOpt = membersRepository.findById(memId);
        if (existingMemberOpt.isPresent()) {
            Members existingMember = existingMemberOpt.get();
            // 기존 회원 정보를 업데이트
            existingMember.setName(updatedMember.getName());
            existingMember.setBirth(updatedMember.getBirth());
            existingMember.setPassword(updatedMember.getPassword());
            // 필요한 다른 필드들도 업데이트
            return membersRepository.save(existingMember); // 업데이트된 정보 저장
        } else {
            throw new RuntimeException("회원이 존재하지 않습니다."); // 적절한 예외 처리 필요
        }
    }

    // 회원 ID로 검색
    public Optional<Members> getMemberById(String id) {
        return membersRepository.findById(id);
    }

    // 회원 이메일로 검색
    public Optional<Members> getMemberByEmail(String memEmail) {
        return membersRepository.findByEmail(memEmail);
    }

    // 전화번호로 조회
    public Optional<Members> getMemberByPhoneNumber(String memPhone) {
        return membersRepository.findByPhoneNumber(memPhone);  // 여기를 수정
    }

    // 모든 회원 조회
    public List<Members> getAllMembers() {
        return membersRepository.findAll();
    }

    // 회원 삭제
    public void deleteMember(Long memId) {
        membersRepository.deleteById(memId); // ID로 회원 삭제
    }
}
