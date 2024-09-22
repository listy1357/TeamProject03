package com.back.back.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.back.back.dto.MemberDto;
import com.back.back.entity.Members;
import com.back.back.repository.MembersRepository;

@Service
public class MemberService {

    @Autowired
    private MembersRepository membersRepository;

    // 회원 생성
    public void createMember(MemberDto memberDto) {
        try {
            // 회원가입 처리 로직
            membersRepository.insertMember(
            memberDto.getId(),
            memberDto.getEmail(),
            memberDto.getPassword(),
            memberDto.getName(),
            memberDto.getPhoneNumber(),
            memberDto.getZipcode(),
            memberDto.getAddress(),
            memberDto.getDetailAddress(),
            memberDto.getBirth()
        );
        } catch (Exception e) {
            // 예외 로그 출력
            System.out.println("회원가입 처리 중 오류 발생: " + e.getMessage());
            throw e; // 예외를 다시 던지기
        }
        
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


    // 모든 회원 조회
    public List<Members> getAllMembers() {
        return membersRepository.findAll();
    }

    // 회원 삭제
    public void deleteMember(Long memId) {
        membersRepository.deleteById(memId); // ID로 회원 삭제
    }
}
