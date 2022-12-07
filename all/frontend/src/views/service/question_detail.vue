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
							<div class="e_que_div">자주하는 질문</div>
							<div><img src="@/assets/img/service/category_click.png"></div>
						</div>
						<!-- 공개 건의함 -->
						<div class="e_nav_onebyone" @click="service_question_public">공개 건의함</div>
					</nav>

					<!-- 오른쪽 내용 -->
					<div class="e_right">
						<!-- 상단 -->
						<!-- 회원 정보 관리 -->
						<div v-show="s_dto.sv_type == 'question_member'"
						class="e_hd_top">고객센터 &gt; 자주하는 질문 &gt; 회원 정보 관리</div>
						<div v-show="s_dto.sv_type == 'question_member'"
						class="e_header">
							<div class="e_hd_top_que">회원 정보 관리</div>
						</div>
						
						<!-- 사이트 이용 가이드 -->
						<div v-show="s_dto.sv_type == 'question_guide'"
						class="e_hd_top">고객센터 &gt; 자주하는 질문 &gt; 사이트 이용 가이드</div>
						<div v-show="s_dto.sv_type == 'question_guide'"
						class="e_header">
							<div class="e_hd_top_que">사이트 이용 가이드</div>
						</div>
						<!-- 내용 -->
						<div class="e_hd_top_con">
							<div class="e_con_title">{{s_dto.title}}</div>
							<div class="e_con_explain">
								<div class="e_explain_member">
									<span>{{s_dto.nickname}}</span> <span> | 조회 : {{s_dto.view_no}}</span>
								</div>
								<div class="e_explain_date">{{s_dto.create_time}}</div>
							</div>
							<div class="e_con_content">
								<p v-html="s_dto.description">
								</p>
								<div class="e_blank"></div>
								<div class="e_content_like">
									<input type="hidden" name="e_bno" ref="e_bno_value" id="e_bno_value" :value="s_dto.bno">
								
									<!-- 좋아요 눌러져 있음 -->
									<input v-if="heart_click == 'Y'"
									type="hidden" id="heart_click" value="Y">
									<p v-if="heart_click == 'Y'" @click="e_like_heart_n_click"
									id="e_like_heart_n" ref="e_like_heart_n" class="e_like_heart" style="display:none;">♡</p>
									<p v-if="heart_click == 'Y'" @click="e_like_heart_y_click"
									id="e_like_heart_y" ref="e_like_heart_y" class="e_like_heart">♥</p>
								
									<!-- 좋아요 눌러져 있지 않음 -->
									<input type="hidden" v-if="heart_click == 'N'"
									id="heart_click" value="N">
									<p v-if="heart_click == 'N'" @click="e_like_heart_n_click"
									id="e_like_heart_n" ref="e_like_heart_n" class="e_like_heart">♡</p>
									<p v-if="heart_click == 'N'" @click="e_like_heart_y_click"
									id="e_like_heart_y" ref="e_like_heart_y" class="e_like_heart" style="display:none;">♥</p>
								
									<!-- 로그인 되어있으나 아이디가 같을 때 (누를 수 없게 함) -->
									<template v-if="user != null">
									</template>
									<p v-if="(user != null && user.member_no==s_dto.member_no)"
									class="e_like_heart" @click="e_like_heart_user_equal_click">♡</p>

									<!-- 로그인 안 되어있음 (누를 수 없게 함) -->
									<p v-if="user == null"
									class="e_like_heart" @click="e_like_heart_user_null_click">♡</p>

									<p class="e_like_num" ref="e_like_num">{{s_dto.like_check}}</p>
								</div>
							</div>
							<!-- 첨부 파일 -->
							<div class="e_content_file">
								<div class="c_file_title">첨부 파일</div>
								
								<div v-if="filelist.length != 0" 
								class="c_file_content">
									<a v-for="(flist,i) in filelist" :key="i"
									href="/service/file/download?file_order={{flist.file_order}}">{{flist.filename}}</a>
								</div>

								<div v-if="filelist.length == 0" 
								class="c_file_content">* 첨부된 파일 없음</div>
							</div>
						</div>

						<div class="e_button">
							<!-- 게시물 수정, 삭제 버튼 -->
							<div v-if="user != null && user.id == 'admin'"
							id="e_hidden_fix">
								<form name="e_btn_fix_form" id="e_btn_fix_form">
									<!-- 게시판 데이터 보내기 -->
									<input type="submit" @click="e_btn_fix_click(s_dto.bno)"
									id="e_btn_fix" class="e_btn_css" value="글 수정">
								</form>
							</div>
							<div v-if="user != null && user.id == 'admin'"
							id="e_hidden_del">
								<form name="e_btn_delete_form" id="e_btn_delete_form">
									<input type="submit" @click="e_btn_delete_click(s_dto.bno)"
									id="e_btn_delete" class="e_btn_css" value="글 삭제">
								</form>
							</div>
							<!-- 뒤로 가기 -->
							<div class="e_btn_css" @click="service_question_member">뒤로 가기</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
  </div>
</template>

<script>
var url = location.search;
url = url.replace('?bno=','');
import Header from "@/components/common/Header.vue";
export default {
  name: "question_detail",
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
  	created() {
		this.getaxios();
	},
  	methods: {
		getaxios(){
			this.$axios.get('/service/question-detail', {
				params: {
					"bno":url
				}
			})
			.then((res)=>{
				if(res.data.heart_click!=null){
					this.heart_click = JSON.parse(JSON.stringify(res.data.heart_click));
				}
				if(res.data.filelist!=null){
					this.filelist = JSON.parse(JSON.stringify(res.data.filelist));
				}
				if(res.data.s_dto!=null){
					this.s_dto = JSON.parse(JSON.stringify(res.data.s_dto));
				}
			})
		},
		e_like_heart_user_null_click: function(){
			alert('로그인 후 이용 가능합니다.');
		},
		e_like_heart_user_equal_click: function(){
			alert('본인의 게시물엔 좋아요를 누를 수 없습니다.');
		},
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
			this.$axios.post('/service/question-detail', null, {params:{
				e_heart_check : "Y",
				e_bno : this.$refs.e_bno_value.value,
			}})
			.then((res)=>{
				if (res.data=="O"){
					// 하트 칠하기
					this.$refs.e_like_heart_n.style.display = "none";
					this.$refs.e_like_heart_y.style.display = "block";
					// 숫자 증가
					var heart_num = this.$refs.e_like_num.innerText;
					this.$refs.e_like_num.innerText = parseInt(heart_num) + 1;
				} else {
					alert('하트는 한번만 누를 수 있습니다.');
				}
			})
		},
		e_like_heart_y_click:function (){
			this.$axios.post('/service/question-detail', null, {params:{
				e_heart_check : "N",
				e_bno : this.$refs.e_bno_value.value,
			}})
			.then((res)=>{
				if (res.data=="O"){
					// 하트 칠하기
					this.$refs.e_like_heart_n.style.display = "block";
					this.$refs.e_like_heart_y.style.display = "none";
					// 숫자 감소
					var heart_num = this.$refs.e_like_num.innerText;
					this.$refs.e_like_num.innerText = parseInt(heart_num) - 1;
				} else {
					alert('하트는 한번만 누를 수 있습니다.');
				}
			})
		},
		e_btn_delete_click:function (bno){
			var con_del = confirm('정말 글을 삭제하시겠습니까?');
			if (con_del == true) {
				// 폼 데이터 보내기
				this.$axios.post('/service/question-detail-button', null, {
					params: {
						"e_btn":"delete",
						"e_bno":bno
					}
				})
				.then(()=>{
					if(location.search==''){
						location.href="/service/question-member";
					}
				})
			} 
		},
		e_btn_fix_click:function (bno){
			var con_fix = confirm('정말 글을 수정하시겠습니까?');
			if (con_fix == true) {
				// 폼 데이터 보내기
				var url = "/service/question-fix?bno="+bno;
				location.href=url;
			} 
	}
  }
};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/service/question_detail.scss";
</style>
