<template>
	<div id="bodystyle">
    	<Header />
		<section>
			<div id="j_wrap">
				<div id="j_box">

					<div class="e_div">
						<!-- 왼쪽 카데고리 -->
						<nav class="e_nav">
							<!-- 문의 전체보기 -->
							<div class="e_nav_all" @click="service_allservice">
								문의 전체보기
							</div>
							<!-- 자주하는 질문 -->
							<div class="e_nav_question" @click="service_question_member">
								자주하는 질문
							</div>
							<!-- 공개 건의함 -->
							<div class="e_nav_onebyone" @click="service_question_public">
								<div class="e_que_div">공개 건의함</div>
								<div><img src="@/assets/img/service/category_click.png"></div>
							</div>
						</nav>


						<!-- 오른쪽 내용 -->
						<div class="e_right">
							<!-- 회원 정보 관리 -->
							<div class="e_hd_top">고객센터 &gt; 공개 건의함</div>
							<div class="e_header">
								<div class="e_hd_top_que">공개 건의함</div>
							</div>
							<!-- 내용 -->
							<div class="e_hd_top_con">
								<!-- 답글인 경우 -->
								<div v-if="s_dto.admin_type == reply" class="origin_board">
									<a href="/service/question-public-detail?bno={{s_dto.group_origin}}">[원본 게시물로 이동]</a>
								</div>
								
								<div class="e_con_title">{{s_dto.title}}</div>
								<div class="e_con_explain">
									<div class="e_explain_member">
										<span>{{s_dto.nickname}}</span> <span> | 조회 : {{s_dto.view_no}}</span>
									</div>
									<div class="e_explain_date">{{s_dto.create_time}}</div>
								</div>
								<div class="e_con_content">
									<p>
										{{s_dto.description}}
									</p>
									<div class="e_blank"></div>
									<!-- 좋아요 / 싫어요 -->
									<div class="e_content_like_dislike">
										<div class="e_content_like">
											<input type="hidden" name="e_bno" id="e_bno_value" ref="e_bno_value" :value="s_dto.bno">
											<!-- 좋아요 눌러져 있음 -->
											<template v-if="like_click == 'Y' && user != null">
												<input type="hidden" id="heart_click" value="Y">
												<p id="e_like_heart_n" class="e_like_heart" ref="e_like_heart_n" style="display:none;">
													<img src="@/assets/img/service/like_blank.png" 
													@click="e_like_heart_n_click" style="width:35px; height:35px;">
												</p>
												<p id="e_like_heart_y" ref="e_like_heart_y" class="e_like_heart">
													<img src="@/assets/img/service/like_full.png"
													@click="e_like_heart_y_click" style="width:35px; height:35px;">
												</p>
											</template>
										
											<!-- 좋아요 눌러져 있지 않음 -->
											<template v-if="like_click == 'N' && user != null">
												<input type="hidden" id="heart_click" value="N">
												<p id="e_like_heart_n" class="e_like_heart" ref="e_like_heart_n">
													<img src="@/assets/img/service/like_blank.png"
													@click="e_like_heart_n_click" style="width:35px; height:35px;">
												</p>
												<p id="e_like_heart_y" ref="e_like_heart_y" class="e_like_heart" style="display:none;">
													<img src="@/assets/img/service/like_full.png"
													@click="e_like_heart_y_click" style="width:35px; height:35px;">
												</p>
											</template>
										
											<!-- 로그인 안 되어있음 (누를 수 없게 함) -->
											<template v-if="user == null">
												<p class="e_like_heart">
													<img src="@/assets/img/service/like_blank.png" style="width:35px; height:35px;">
												</p>
												<!-- null 값 방지 -->
												<input type="hidden" id="heart_click" value="none">
												<p id="e_like_heart_n" ref="e_like_heart_n" class="e_like_heart" style="display:none;">
													<img src="@/assets/img/service/like_blank.png" style="width:35px; height:35px;">
												</p>
												<p id="e_like_heart_y" ref="e_like_heart_y" class="e_like_heart" style="display:none;">
													<img src="@/assets/img/service/like_full.png" style="width:35px; height:35px;">
												</p>
											</template>
											<p class="e_like_num" ref="e_like_num">{{s_dto.like_check}}</p>
										</div>
										<!-- 싫어요 -->
										<div class="e_content_dislike">
											<!-- 싫어요 눌러져 있음 -->
											<template v-if="dislike_click == 'Y' && user != null">
												<input type="hidden" id="heart_click" value="Y">
												<p id="e_dislike_heart_n" ref="e_dislike_heart_n" class="e_dislike_heart" style="display:none;">
													<img src="@/assets/img/service/dislike_blank.png" 
													@click="e_dislike_heart_n_click" style="width:35px; height:35px;">
												</p>
												<p id="e_dislike_heart_y" ref="e_dislike_heart_y" class="e_dislike_heart">
													<img src="@/assets/img/service/dislike_full.png"
													@click="e_dislike_heart_y_click" style="width:35px; height:35px;">
												</p>
											</template>
											
											<!-- 싫어요 눌러져 있지 않음 -->
											<template v-if="dislike_click == 'N' && user != null">
												<input type="hidden" id="heart_click" value="N">
												<p id="e_dislike_heart_n" ref="e_dislike_heart_n" class="e_dislike_heart">
													<img src="@/assets/img/service/dislike_blank.png" 
													@click="e_dislike_heart_n_click" style="width:35px; height:35px;">
												</p>
												<p id="e_dislike_heart_y" ref="e_dislike_heart_y" class="e_dislike_heart" style="display:none;">
													<img src="@/assets/img/service/dislike_full.png"
													@click="e_dislike_heart_y_click" style="width:35px; height:35px;">
												</p>
											</template>
											
											<!-- 로그인 안 되어있음 (누를 수 없게 함) -->
											<template v-if="user == null">
												<p class="e_like_heart">
													<img src="@/assets/img/service/dislike_blank.png" style="width:35px; height:35px;">
												</p>
												<!-- null 값 방지 -->
												<input type="hidden" id="heart_click" value="none">
												<p id="e_dislike_heart_n" ref="e_dislike_heart_n" class="e_dislike_heart" style="display:none;">
													<img src="@/assets/img/service/dislike_blank.png" style="width:35px; height:35px;">
												</p>
												<p id="e_dislike_heart_y" ref="e_dislike_heart_y" class="e_dislike_heart" style="display:none;">
													<img src="@/assets/img/service/dislike_full.png" style="width:35px; height:35px;">
												</p>
											</template>
											<p class="e_dislike_num" ref="e_dislike_num">{{s_dto.dislike_check}}</p>
										</div>
									</div>
									
								</div>
								<!-- 첨부 파일 -->
								<div class="e_content_file">
									<div class="c_file_title">첨부 파일</div>
									
									<div v-if="filelist.length != 0" 
									class="c_file_content">
										<a v-for="(flist,i) in filelist" :key="i"
										href="/all/service/file/download?file_order={{flist.file_order}}">{{flist.filename}}</a>
									</div>

									<div v-if="filelist.length == 0" 
									class="c_file_content">* 첨부된 파일 없음</div>
								</div>
							</div>
							
							<!-- 댓글 -->
							<div class="e_comment">
								<!-- 데이터 전달용 -->
								<input type="hidden" id="hidden_bno" ref="hidden_bno" :value="s_dto.bno">
								
								<!-- 댓글 개수 -->
								<div class="com_num">
									<span class="basic_span">댓글</span>
									<span v-if="comment_list == null" class="c_n_color">0</span>
									<span v-if="comment_list != null" class="c_n_color">{{comment_list.length}}</span>
									<span class="basic_span">개</span>
								</div>
							
								<!-- 댓글 리스트 -->
								<template v-if="comment_list != null">
									<div class="com_list" v-for="(comment_l,i) in comment_list" :key="i">
										<!-- 댓글 -->
										<!-- 댓글 : 기본 -->
										<div class="c_l_comment" v-if="comment_l.type_code == 'comment_update' || comment_l.type_code == 'comment'">
											<!-- 프로필 이미지 -->
											<div class="com_profile">
												<img src="/service/load-proimg?fileName={{comment_l.pro_img}}">
											</div>
											<!-- 프로필 옆 -->
											<!-- 닉네임, 작성시간 -->
											<div class="com_pro_next">
												<div class="com_nick_time">
													<!-- 닉네임 -->
													<div class="com_nickname">
														<span class="nickname">{{comment_l.nickname}}</span>
														<span class="nickname_writer" v-if="comment_l.member_no == s_dto.member_no">작성자</span>
													</div>
													<!-- 작성 시간 -->
													<div class="com_createtime">
														{{comment_l.create_time}}
														<span v-if="comment_l.type_code == 'comment_update'"
														style="padding-left:3px; font-size:11px; color:gray;">수정됨</span>
													</div>
												</div>
												<!-- 댓글 내용 -->
												<div class="com_content">
													<pre>{{comment_l.comment_code}}</pre>
												</div>
												
												<!-- 버튼 -->
												<div class="com_btn" v-if="user != null && user.member_no == comment_l.member_no">
													<input type="hidden" :value="comment_l.c_code">
													<input type="hidden" :value="comment_l.nickname">
													<input type="hidden" :value="comment_l.comment_code">
													<!-- 답글 -->
													<div class="com_btn_reply">
														<a @click="com_btn_com_btn_reply_click">답글</a>
													</div>
													<!-- 수정 -->
													<div class="com_btn_fix">
														<a @click="com_btn_com_btn_fix_a_click">수정</a>
													</div>
													<!-- 삭제 -->
													<div class="com_btn_del">
														<a @click="com_btn_com_btn_del_a_click">삭제</a>
													</div>
												</div>
												
												<!-- 버튼 -->
												<div class="com_btn" v-if="user != null && user.member_no != comment_l.member_no">
													<input type="hidden" :value="comment_l.c_code">
													<input type="hidden" :value="comment_l.nickname">
													<input type="hidden" :value="comment_l.comment_code">
													<!-- 답글 -->
													<div class="com_btn_reply">
														<a @click="com_btn_com_btn_reply_click">답글</a>
													</div>
												</div>
											</div>
										</div>
										
										<!-- 답글일 경우 -->
										<div class="c_l_reply" v-if="comment_l.type_code == 'reply_update' || comment_l.type_code == 'reply'">
											<!-- 꺽쇠 여백 -->
											<div class="reply_blank">
												↳
											</div>
											<!-- 프로필 이미지 -->
											<div class="com_profile">
												<img src="/service/load-proimg?fileName={{comment_l.pro_img}}">
											</div>
											<!-- 프로필 옆 -->
											<!-- 닉네임, 작성시간 -->
											<div class="reply_pro_next">
												<div class="reply_nick_time">
													<!-- 닉네임 -->
													<div class="com_nickname">
														<span class="nickname">{{comment_l.nickname}}</span>
														<span v-if="comment_l.member_no == s_dto.member_no"
														class="nickname_writer">작성자</span>
													</div>
													<!-- 작성 시간 -->
													<div class="com_createtime">
														{{comment_l.create_time}}
														<span v-if="comment_l.type_code == 'reply_update'"
														style="padding-left:3px; font-size:11px; color:gray;">수정됨</span>
													</div>
												</div>
												<!-- 답글 내용 -->
												<div class="reply_content">
													<div style="padding-bottom: 5px; font-weight:bold; color:gray;">
														{{comment_l.to_nickname}}
													</div>
													<div><pre>{{comment_l.comment_code}}</pre></div>
												</div>
												<!-- 버튼 -->
												<div class="reply_btn" v-if="user != null && user.member_no == comment_l.member_no">
													<input type="hidden" :value="comment_l.origin_code">
													<input type="hidden" :value="comment_l.nickname">
													<input type="hidden" :value="comment_l.comment_code">
													<input type="hidden" :value="comment_l.c_code">
													<!-- 답글 -->
													<div class="reply_btn_reply">
														<a @click="reply_btn_reply_click">답글</a>
													</div>
													<!-- 수정 -->
													<div class="reply_btn_fix">
														<a @click="reply_btn_fix_click">수정</a>
													</div>
													<!-- 삭제 -->
													<div class="reply_btn_del">
														<a @click="reply_btn_del_click">삭제</a>
													</div>
												</div>
												<!-- 버튼 -->
												<div class="reply_btn" v-if="user != null && user.member_no != comment_l.member_no">
													<input type="hidden" :value="comment_l.origin_code">
													<input type="hidden" :value="comment_l.nickname">
													<input type="hidden" :value="comment_l.comment_code">
													<!-- 답글 -->
													<div class="reply_btn_reply">
														<a @click="reply_btn_reply_click">답글</a>
													</div>
												</div>
											</div>
										</div>
									</div>
								</template>

								<!-- 댓글 입력창 -->
								<div class="com_input" v-if="user != null">
									<!-- 댓글 입력창 -->
									<div class="c_i_textarea">
										<textarea wrap="hard" placeholder="댓글을 작성해 주세요." ref="com_input_c_i_textarea_textarea"
											name="description" id="e_cont_detail_input"></textarea>
									</div>
									<!-- 댓글 등록 버튼 -->
									<div class="c_i_btn">
										<button class="c_i_btn_Y"
										@click="com_input_c_i_btn_c_i_btn_Y_click">등록</button>
									</div>
								</div>
								<!-- 댓글 입력창 -->
								<div class="com_input" v-if="user == null">
									<!-- 댓글 입력창 -->
									<div class="c_i_textarea">
										<textarea wrap="hard" placeholder="로그인 후 댓글을 작성해 주세요."
											name="description" id="e_cont_detail_input" disabled></textarea>
									</div>
									<!-- 댓글 등록 버튼 -->
									<div class="c_i_btn">
										<button class="c_i_btn_N">등록</button>
									</div>
								</div>
							</div>
							<!-- 댓글 끝 -->

							<div class="e_button">
								<!-- 답글 쓰기, 게시물 수정, 삭제 버튼 -->
								<div class="e_hidden" id="e_hidden_reply" v-if="user != null && s_dto.admin_type == 'origin'">
									<form name="e_btn_reply_form" ref="e_btn_reply_form">
										<!-- 게시판 데이터 보내기 -->
										<input type="hidden" name="e_btn" value="reply">
										<input type="hidden" name="e_bno" :value="s_dto.bno">
										<input type="submit" @click="e_btn_reply_click"
										id="e_btn_reply" class="e_btn_css" value="답글 쓰기">
									</form>
								</div>
								<template v-if="user != null && s_dto.nickname == user.nickname">
									<div class="e_hidden" id="e_hidden_fix">
										<form name="e_btn_fix_form" ref="e_btn_fix_form">
											<!-- 게시판 데이터 보내기 -->
											<input type="hidden" name="e_btn" value="fix">
											<input type="hidden" name="e_bno" :value="s_dto.bno">
											<input type="submit" @click="e_btn_fix_click"
											id="e_btn_fix" class="e_btn_css" value="글 수정">
										</form>
									</div>
									<div class="e_hidden" id="e_hidden_del">
										<form name="e_btn_delete_form" ref="e_btn_delete_form">
											<input type="hidden" name="e_btn" value="delete">
											<input type="hidden" name="e_bno" :value="s_dto.bno">
											<input type="submit" @click="e_btn_delete_click"
											id="e_btn_delete" class="e_btn_css" value="글 삭제">
										</form>
									</div>
								</template>
								<!-- 뒤로 가기 -->
								<div class="e_btn_css" @click="service_question_public">뒤로 가기</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
  </div>
</template>

<script>
import Header from "@/components/common/Header.vue";
export default {
  name: "question_public_detail",
  data : function() {
    return {
        heart_click : null,
		filelist : null,
		s_dto :  null,
		user : JSON.parse(sessionStorage.getItem('user')),
    }
  },
  components: {
	Header,
  },
  mounted() {
	this.$axios.get('/service/question-public-detail')
      .then((res)=>{
        this.heart_click = res.data.heart_click;
        this.filelist = res.data.filelist;
		this.s_dto = res.data.s_dto;
		this.s_dto.description.replace("\r\n", "<br>");
      })
	},
  methods: {
	service_allservice: function(){
		location.href='/service/allService'
	},
	service_question_member: function(){
		location.href='/service/question-member'
	},
	service_question_public: function(){
		location.href='/service/question-public'
	},
	e_like_heart_n_click:function (){
		this.$axios.post('/service/question-public-detail', {
			e_heart_check: "like_Y",
            e_bno: this.$axios.e_bno_value.value,
        })
        .then((res)=>{
			if (res.data=="O"){
				// 하트 칠하기
				this.$refs.e_like_heart_n.style.display = "none";
				this.$refs.e_like_heart_y.style.display = "block";
				// 숫자 증가
				var heart_num = this.$axios.e_like_num.innerText;
				this.$refs.e_like_num.innerText = parseInt(heart_num) + 1;
			} else {
				alert('좋아요는 한번만 누를 수 있습니다.');
			}
        })
	},
	e_like_heart_y_click:function (){
		this.$axios.post('/service/question-public-detail', null, {
			e_heart_check: "like_N",
            e_bno: this.$refs.e_bno_value.value,
        })
        .then((res)=>{
			if (res.data=="O"){
				// 하트 칠하기
				this.$refs.e_like_heart_n.style.display = "block";
				this.$refs.e_like_heart_y.style.display = "none";
				// 숫자 감소
				var heart_num = this.$refs.e_like_num.innerText;
				this.$refs.e_like_num.innerText = parseInt(heart_num) - 1;
			} else {
				alert('좋아요는 한번만 누를 수 있습니다.');
			}
        })
	},
	e_dislike_heart_n_click:function (){
		this.$axios.post('/service/question-public-detail', {
			e_heart_check: "dislike_Y",
            e_bno: this.$refs.e_bno_value.value,
        })
        .then((res)=>{
			if (res.data=="O"){
				// 하트 칠하기
				this.$refs.e_dislike_heart_n.style.display = "none";
				this.$refs.e_dislike_heart_y.style.display = "block";
				// 숫자 증가
				var heart_num = this.$refs.e_dislike_num.innerText;
				this.$refs.e_dislike_num.innerText = parseInt(heart_num) + 1;
			} else {
				alert('싫어요는 한번만 누를 수 있습니다.');
			}
        })
	},
	e_dislike_heart_y_click:function (){
		this.$axios.post('/service/question-public-detail', {
			e_heart_check: "dislike_N",
            e_bno: this.$axios.e_bno_value.value,
        })
        .then((res)=>{
			if (res.data=="O"){
				// 하트 칠하기
				this.$refs.e_dislike_heart_n.style.display = "block";
				this.$refs.e_dislike_heart_y.style.display = "none";
				// 숫자 증가
				var heart_num = this.$refs.e_dislike_num.innerText;
				this.$refs.e_dislike_num.innerText = parseInt(heart_num) - 1;
			} else {
				alert('싫어요는 한번만 누를 수 있습니다.');
			}
        })
	},
	e_btn_reply_click:function (e){
		// eslint-disable-next-line
		var formData = new FormData(e_btn_reply_form);
		var con_reply = confirm('정말 답글을 작성하시겠습니까?');
		if (con_reply == true) {
			this.$axios.get('/service/question-public-detail-button', formData)
			.then((res)=>{
				location.href=res;
			})
		} else {
			e.preventDefault();
		}
	},
	e_btn_delete_click:function (e){
		// eslint-disable-next-line
		var formData = new FormData(e_btn_delete_form);
		var con_del = confirm('정말 글을 삭제하시겠습니까?');
		if (con_del == true) {
			// 폼 데이터 보내기
			this.$axios.get('/service/question-public-detail-button', formData)
			.then((res)=>{
				alert('글을 삭제했습니다.');
				location.href=res;
			})
		} else {
			e.preventDefault();
		}
	},
	e_btn_fix_click:function (e){
		// eslint-disable-next-line
		var formData = new FormData(e_btn_fix_form);
		var con_fix = confirm('정말 글을 수정하시겠습니까?');
		if (con_fix == true) {
			// 폼 데이터 보내기
			this.$axios.get('/service/question-public-detail-button', formData)
			.then((res)=>{
				location.href=res;
			})
		} else {
			e.preventDefault();
		}
	},
	// 댓글, 답글 작성
	com_input_c_i_btn_c_i_btn_Y_click:function (e){
		e.preventDefault();
		var comment_code = this.$refs.com_input_c_i_textarea_textarea.value;
		if (comment_code.length == 0) {
			comment_code = " ";
		}
		// 폼 데이터 보내기
		this.$axios.get('/service/question-public-comment/insert', {
			"bno": this.$refs.hidden_bno.value,
			"comment_code": comment_code,
		})
		.then((res)=>{
			if (res == "X") {
				alert('댓글 내용을 제대로 입력해주세요.');
			} else {
				location.href = "/service/question-public-detail?bno=" + this.$refs.hidden_bno.value;
			}
		})
	},
	com_btn_com_btn_reply_click:function (e){
		// 댓글의 답글
		if (!document.querySelector('.c_l_comment_new') && !document.querySelector('.c_l_reply_new')
		&& !document.querySelector('.c_l_reply_fix') && !document.querySelector('.c_l_comment_fix')) {
			// 아래에 답글 작성 폼 생김
			var html = '<div class="c_l_comment_new">';
			html += '<div class="reply_new_blank">↳</div>';
			html += '<div class="r_new_content">';
			html += '<textarea wrap="hard" placeholder="내용을 입력해 주세요." id="e_cont_detail_input"></textarea>';
			html += '<div class="c_i_new_btn"><button>등록</button></div>';
			html += '</div></div></div>';
			// eslint-disable-next-line
			e.target.parentElement.parentElement.parentElement.parentElement.insertAdjacentHTML(afterend, html);
			// 답글 취소시
			// eslint-disable-next-line
			e.target.insertAdjacentHTML(afterend, '<a class="com_reply_del_click"><b>답글취소</b></a>');
			e.target.style.display = 'none';
			document.querySelector('.com_reply_del_click').addEventListener('click', function(){
				document.querySelector('.com_reply_del_click').remove();
				document.querySelector('.c_l_comment_new').remove();
				e.target.style.display = 'block';
			});
			// 작성 완료시
			if(document.querySelector('.c_i_new_btn button')){
				document.querySelector('.c_i_new_btn button').addEventListener('click', function (event) {
					var origin_code_re = e.target.parentElement.parentElement.firstElementChild.value;
					var to_nickname_re = e.target.parentElement.parentElement.children[1].value;
					var comment_code_re = document.querySelector('.r_new_content textarea').value;
					var con_del = confirm('정말 답글을 작성하시겠습니까?');
					if (con_del == true) {
						this.$axios.get('/service/question-public-reply/insert', {
							"bno": this.$refs.hidden_bno.value,
							"origin_code": origin_code_re,
							"to_nickname": to_nickname_re,
							"comment_code": comment_code_re,
						})
						.then((res)=>{
							if (res.data == "X") {
								alert('댓글 내용을 제대로 입력해주세요.');
							} else {
								location.href = "/service/question-public-detail?bno=" + this.$refs.hidden_bno.value;
							}
						})
					} else {
						event.preventDefault();
					}
				});
			}
		} else {
			// 답글이 이미 있다
			alert("댓글을 작성해주세요.");
		}
	},
	com_btn_com_btn_fix_a_click:function (e){
		// 댓글 수정
		if (!document.querySelector('.c_l_comment_new') && !document.querySelector('.c_l_reply_new')
		&& !document.querySelector('.c_l_reply_fix') && !document.querySelector('.c_l_comment_fix')) {
			// 수정폼 생성 + 원본 가리기
			var origin_comment = e.target.parentElement.parentElement.children[2].value;
			e.target.parentElement.parentElement.parentElement.parentElement.style.display = "none";
			var html = '<div class="c_l_comment_fix">';
			html += '<div class="c_l_comment_fix_content">';
			html += '<div class="c_fix_textarea">';
			html += '<textarea wrap="hard" placeholder="내용을 입력해 주세요." name="description" id="fix_con_input">' + origin_comment + '</textarea>';
			html += '</div>';
			html += '<div class="fix_con_btn"><button>수정하기</button></div>';
			html += '</div>';
			html += '</div>';
			// eslint-disable-next-line
			e.target.parentElement.parentElement.parentElement.parentElement.insertAdjacentHTML(afterend, html);
			// 수정 취소폼으로 만들기
			// eslint-disable-next-line
			e.target.insertAdjacentHTML(beforeend, '<a class="com_fix_del_click" style="text-decoration:none"><b style="font-size:13px; color: gray;">수정취소</b></a>');
			document.querySelector('.com_fix_del_click').click(function(){
				document.querySelector('.com_fix_del_click').remove();
				document.querySelector('.c_l_comment_fix').remove();
				e.target.parentElement.parentElement.parentElement.parentElement.style.display = "flex";
			});
			// 수정폼 완료시 + 수정폼 삭제 + 원본 보여주기
			if (document.querySelector('.c_l_comment_fix_content .fix_con_btn button')){
				document.querySelector('.c_l_comment_fix_content .fix_con_btn button').addEventListener('click', function (event) {
					var c_code_fix = e.target.parentElement.parentElement.firstElementChild.value;
					var comment_code_fix = document.querySelector('.c_fix_textarea textarea').value;
					var con_fix = confirm('정말 답글을 수정하시겠습니까?');
					if (con_fix == true) {
						this.$axios.get('/service/question-public-comment/fix', {
							"bno": this.$refs.hidden_bno.value,
							"c_code": c_code_fix,
							"comment_code": comment_code_fix,
						})
						.then((res)=>{
							if (res.data == "X") {
								alert('댓글 내용을 제대로 입력해주세요.');
							} else {
								location.href = "/service/question-public-detail?bno=" + this.$refs.hidden_bno.value;
							}
						})
					} else {
						event.preventDefault();
					}
				});
			}
		} else {
			// 답글이 이미 있다
			alert("댓글을 작성해주세요.");
		}
	},
	com_btn_com_btn_del_a_click:function (e){
		// 댓글 삭제
		var c_code_del = e.target.parentElement.parentElement.firstElementChild.value;
		var con_del = confirm('정말 댓글을 삭제하시겠습니까?');
		if (con_del == true) {
			this.$axios.get('/service/question-public-comment/delete', {
				"bno": this.$refs.hidden_bno.value,
				"c_code": c_code_del,
			})
			.then((res)=>{
				if (res.data == "X") {
					alert('댓글 내용을 제대로 입력해주세요.');
				} else {
					// eslint-disable-next-line
					location.href = "/service/question-public-detail?bno=" + hidden_bno;
				}
			})
		} else {
			e.preventDefault();
		}
	},
	reply_btn_reply_click:function (e){
		// 답글의 답글
		if (!document.querySelector('.c_l_comment_new') && !document.querySelector('.c_l_reply_new')
		&& !document.querySelector('.c_l_reply_fix') && !document.querySelector('.c_l_comment_fix')) {
			// 아래에 답글 작성 폼 생김
			var html = '<div class="c_l_reply_new">';
			html += '<div class="reply_new_blank">↳</div>';
			html += '<div class="r_new_content">';
			html += '<textarea wrap="hard" placeholder="내용을 입력해 주세요." id="e_cont_detail_input"></textarea>';
			html += '<div class="c_i_new_btn"><button>등록</button></div>';
			html += '</div></div></div>';
			// eslint-disable-next-line
			e.target.parentElement.parentElement.parentElement.parentElement.insertAdjacentHTML(afterend, html);
			// 답글 취소폼으로 만들기
			// eslint-disable-next-line
			e.target.insertAdjacentHTML(afterend, '<a class="reply_reply_del_click"><b>답글취소</b></a>');
			e.target.style.display = 'none';
			// 답글 취소시
			document.querySelector('.reply_reply_del_click').click(function(){
				document.querySelector('.reply_reply_del_click').remove();
				document.querySelector('.c_l_reply_new').remove();
				e.target.style.display = 'block';
			});
			// 작성 완료시
			document.querySelector('.c_i_new_btn button').addEventListener('click', function (event) {
				var origin_code_reply = e.target.parentElement.parentElement.firstElementChild.value;
				var to_nickname_reply = e.target.parentElement.parentElement.children[1].value;
				var comment_code_reply = document.querySelector('.r_new_content textarea').value;
				var c_reply_del = confirm('정말 답글을 작성하시겠습니까?');
				if (c_reply_del == true) {
					this.$axios.get('/service/question-public-reply/insert', {
						"bno": this.$refs.hidden_bno.value,
						"origin_code": origin_code_reply,
						"to_nickname": to_nickname_reply,
						"comment_code": comment_code_reply,
					})
					.then((res)=>{
						if (res.data == "X") {
							alert('답글 내용을 제대로 입력해주세요.');
						} else {
							location.href = "/service/question-public-detail?bno=" + this.$refs.hidden_bno.value;
						}
					})
				} else {
					event.preventDefault();
				}
			});
		} else if (document.querySelectorAll('.c_l_reply_new').length==1) {
			// 답글이 이미 있다
			alert("댓글을 작성해주세요.");
		}
	},
	reply_btn_fix_click:function (e){
		// 답글 수정
		if (!document.querySelector('.c_l_comment_new') && !document.querySelector('.c_l_reply_new')
		&& !document.querySelector('.c_l_reply_fix') && !document.querySelector('.c_l_comment_fix')) {
			// 수정폼 생성 + 원본 가리기
			var reply_origin_comment = e.target.parentElement.parentElement.children[2].value;
			e.target.parentElement.parentElement.parentElement.parentElement.style.display = "none";
			var html = '<div class="c_l_reply_fix">';
			html += '<div class="r_fix_content">';
			html += '<div class="reply_blank">↳</div>';
			html += '<div class="r_fix_textarea">';
			html += '<textarea wrap="hard" placeholder="내용을 입력해 주세요." name="description" id="fix_reply_input">' + reply_origin_comment + '</textarea>';
			html += '</div>';
			html += '<div class="fix_reply_btn"><button>수정하기</button></div>';
			html += '</div>';
			html += '</div>';
			// eslint-disable-next-line
			e.target.parentElement.parentElement.parentElement.parentElement.insertAdjacentHTML(afterend, html);
			// eslint-disable-next-line
			e.target.insertAdjacentHTML(beforeend, '<a class="reply_fix_del_click" style="text-decoration:none"><b style="font-size:13px; color: gray; margin-left:20px;">수정취소</b></a>');
			document.querySelector('.reply_fix_del_click').click(function(){
			document.querySelector('.reply_fix_del_click').remove();
			document.querySelector('.c_l_reply_fix').remove();
			e.target.parentElement.parentElement.parentElement.parentElement.style.display = "flex";
			});
			// 수정폼 완료시 + 수정폼 삭제 + 원본 보여주기
			if (document.querySelector('.r_fix_content .fix_reply_btn button')){
				document.querySelector('.r_fix_content .fix_reply_btn button').addEventListener('click', function (event) {
				var c_code_fix_reply = e.target.parentElement.parentElement.children[3].value;
				var comment_code_fix_reply = document.querySelector('.r_fix_textarea textarea').value;
				console.log(comment_code_fix_reply);
					var c_reply_fix = confirm('정말 답글을 수정하시겠습니까?');
					if (c_reply_fix == true) {
						this.$axios.get('/service/question-public-reply/fix', {
							"bno": this.$refs.hidden_bno.value,
							"c_code": c_code_fix_reply,
							"comment_code": comment_code_fix_reply,
						})
						.then((res)=>{
							if (res.data == "X") {
								alert('답글 내용을 제대로 입력해주세요.');
							} else {
								location.href = "/service/question-public-detail?bno=" + this.$refs.hidden_bno.value;
							}
						})
					} else {
						event.preventDefault();
					}
				});
			}
		} else {
			// 답글이 이미 있다
			alert("댓글을 작성해주세요.");
		}
	},
	reply_btn_del_click:function (e){
		// 답글 삭제
		var c_code_del_reply = e.target.parentElement.parentElement.children[3].value;
		var c_reply_del = confirm('정말 답글을 삭제하시겠습니까?');
		if (c_reply_del == true) {
			this.$axios.get('/service/question-public-reply/delete', {
				"bno": this.$refs.hidden_bno.value,
				"c_code": c_code_del_reply,
			})
			.then((res)=>{
				if (res.data == "X") {
					alert('답글 내용을 제대로 입력해주세요.');
				} else {
					location.href = "/service/question-public-detail?bno=" + this.$refs.hidden_bno.value;
				}
			})
		} else {
			e.preventDefault();
		}
	}
  }
};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/service/question_public_detail.scss";
</style>
