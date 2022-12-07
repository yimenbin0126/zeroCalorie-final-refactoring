package com.zeroCarolie.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.zeroCarolie.dto.e_MemberDTO;
import com.zeroCarolie.mapper.MemberMapper;

@Repository
public class e_MemberDAOimpl implements e_MemberDAO {

	@Autowired
	private MemberMapper memberMapper;
	
	// 회원가입 (멤버 추가 메서드)
	public void addMember(e_MemberDTO dto) throws Exception {
		System.out.println("e_MemberDAOimpl - addMember - 회원가입");
		memberMapper.addMember(dto);
	}

	// 로그인 체크 (아이디, 비밀번호)
	public int loginMember(e_MemberDTO dto) throws Exception {
		System.out.println("e_MemberDAOimpl - loginMember - 로그인 체크");
		return memberMapper.loginMember(dto);
	}

	// 회원정보 불러오기 (아이디. 로그인용)
	public e_MemberDTO id_loadMember(e_MemberDTO dto) throws Exception {
		System.out.println("e_MemberDAOimpl - id_loadMember - 회원정보 불러오기");
		return memberMapper.id_loadMember(dto);
	}

	// 회원정보 불러오기 (member_no 이용)
	public e_MemberDTO member_no_loadMember(e_MemberDTO dto) throws Exception {
		System.out.println("e_MemberDAOimpl - member_no_loadMember - 회원정보 불러오기");
		return memberMapper.member_no_loadMember(dto);
	}

	// 아이디 중복 체크
	public int idCheck(e_MemberDTO dto) throws Exception {
		System.out.println("e_MemberDAOimpl - idCheck - 아이디 중복 체크");
		return memberMapper.idCheck(dto);
	}

	// 닉네임 중복 체크
	public int nickCheck(e_MemberDTO dto) throws Exception {
		System.out.println("e_MemberDAOimpl - nickCheck - 닉네임 중복 체크");
		return memberMapper.nickCheck(dto);
	}
	
	// 회원정보 변경
	public int id_updateMember(e_MemberDTO dto) throws Exception {
		System.out.println("e_MemberDAOimpl - id_updateMember - 회원정보 변경");
		return memberMapper.id_updateMember(dto);
	}
	
	// 회원정보 변경 - 비밀번호
	public int pw_updateMember(e_MemberDTO dto) throws Exception {
		System.out.println("e_MemberDAOimpl - pw_updateMember - 회원정보 변경");
		return memberMapper.pw_updateMember(dto);
	}
	
	// 아이디 찾기 - 이메일
	public e_MemberDTO findid_email(e_MemberDTO dto) throws Exception {
		System.out.println("e_MemberDAOimpl - findid_email - 아이디 찾기 - 이메일");
		return memberMapper.findid_email(dto);
	}
	
	// 아이디 찾기 - 이메일, 아이디
	public e_MemberDTO findid_email_id(e_MemberDTO dto) throws Exception {
		System.out.println("e_MemberDAOimpl - findid_email_id - 아이디 찾기 - 이메일, 아이디");
		return memberMapper.findid_email_id(dto);
	}
}