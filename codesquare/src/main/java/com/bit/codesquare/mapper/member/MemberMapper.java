package com.bit.codesquare.mapper.member;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.bit.codesquare.dto.board.Board;
import com.bit.codesquare.dto.member.InstructorInfo;
import com.bit.codesquare.dto.member.JoiningAndRecruitmentLog;
import com.bit.codesquare.dto.member.Member;
import com.bit.codesquare.dto.paging.Criteria;
import com.bit.codesquare.dto.room.Reservation;

@Mapper
public interface MemberMapper {

	public Member checkUser(String userId);
	public Member getUser(String userId);

	public int signUp(Member member);
	//public int modifyMyInfo(User user);
	public int changePw(Member member);
	public int changeNick(Member member);
	public int changeEmail(Member member);
	
	public int updateProfile(String userId, String uploadFileName);
	public int idCheck(String userId);
	public int emailCheck(String email);
	public int nickCheck(String nickName);
	
	public String findId(String email);
	public int findPw(String userId, String email);
	
	
	
	public int toInstructor(InstructorInfo instructorInfo);
	public int checkInstructor(String userId);
	
	public int modifyInstructorInfo(InstructorInfo instructorInfo);
	
	
	
	public List <Reservation> getReservedList(String userId, @Param("cri") Criteria cri);
	int countRLPaging(String userId, @Param("cri") Criteria cri);
	
	public List <JoiningAndRecruitmentLog> getAppliedList(String userId, @Param("cri") Criteria cri);
	int countALPaging(String userId, @Param("cri") Criteria cri);
	
	public List <Board> getWantedList(String userId, @Param("cri") Criteria cri);
	int countWLPaging(String userId, @Param("cri") Criteria cri);
	
	public List <JoiningAndRecruitmentLog> getWantedPList(int boardId);
	
	public List <Board> getMyBoardList(String userId, @Param("cri") Criteria cri);
	int countBLPaging(String userId, @Param("cri") Criteria cri);
	
	
	
	public InstructorInfo getInstructorInfo (String userId);
	
	
	
	
	public Member getMyCount(String userId);
	
	public int cancelApply (String applyUserId, int boardId);
	public int acceptMo (String applyUserId, int boardId);
	public int declineMo (String applyUserId, int boardId, String declineContent);
}
