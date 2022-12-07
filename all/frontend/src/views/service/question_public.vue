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
						<!-- 상단 -->
						<div class="e_hd_top">고객센터 &gt; 공개 건의함</div>
						<div class="e_header">
							<div class="e_hd_top_que">공개 건의함</div>
							<div class="e_hd_top_con">
								<span> 공개건의함은 관리자, 회원 등<br>모든 회원이 로그인 한 상태라면<br>
									건의 관련 글을 쓰고 댓글을 남길수 있는 소통 공간입니다.
								</span>
							</div>
						</div>

						<!-- 게시물 불러오기 - 회원 정보 관리 -->
						<div class="e_content">
							<!-- 게시물 타입 -->
							<div class="e_content_choice">
								<select id="e_con_choice" ref="e_con_choice"
								@click="e_con_choice_click">
									<option value="new" id="new">최신순</option>
									<option value="view" id="view">조회수순</option>
									<option value="like" id="like">좋아요순</option>
								</select>
							</div>
							<!-- 게시물 번호 보내기 - 상세보기 -->
							<form name="e_bno_val_form" id="e_bno_val_form" ref="e_bno_val_form">
								<input type="hidden" name="bno" id="e_bno_val" ref="e_bno_val" value="none">
							</form>
							<!-- 게시물 목록 시작 -->
							<div class="e_con_mem">
								<ul>
									<li>번호</li>
									<li>제목</li>
									<li>글쓴이</li>
									<li>작성시간</li>
									<li>조회수</li>
									<li>좋아요</li>
								</ul>
								
								<!-- 글 유무 -->
								<template v-if="s_dto != null">
									<ul class="e_boardlist" v-for="(s_dto,i) in s_dto_list" :key="i">
										<li :value="s_dto.bno">{{s_dto.bno}}</li>
										<li><div v-if="s_dto.admin_type == 'reply' && s_page.standard == 'new'"
											 style="font-weight:bold;">└[답글] </div>
											<div v-if="s_dto.admin_type == 'reply' && s_page.standard != 'new'"
											@click="service_question_detail_group_origin(s_dto.group_origin)">[{{s_dto.group_origin}} 번의 답글]
											</div><div @click="blist_title_click" class="blist_title">{{s_dto.title}}</div>
											<div class="blist_comment" 
											v-if="comment_List[i] == null" style="color:#1649B0;"> {{comment_List[i]}}</div>
											<div class="blist_comment" 
											v-if="comment_List[i] != null" style="color:#1649B0;"> {{comment_List[i]}}</div>
										</li>
										<li>{{s_dto.nickname}}</li>
										<li>{{s_dto.create_time}}</li>
										<li>{{s_dto.view_no}}</li>
										<li>{{s_dto.like_check}}</li>
									</ul>
								</template>
								
								<template v-if="s_dto == null">
									<ul class="e_boardlist">
										<li style="width:100%; text-align:center;
										font-weight:bold; font-size: 13px;
										margin-top:10px; margin-bottom:10px;">존재하는 게시물 없음</li>
									</ul>
								</template>
								
							</div>
							<!-- 게시물 목록 끝 -->
						</div>
						
						<div class="e_btn_list">
							<!-- 글쓰기 버튼 보이기 (로그인) -->
							<template v-if="user != null">
								<div>
									<form name="myboard_form">
										<input type="button"  value="내가 쓴 글 보기" class="e_hd_top_write_myboard"
										@click="service_question_public_myboard">								
									</form>
								</div>
								<div>
									<input type="button"  value="글쓰기" class="e_hd_top_write"
									@click="service_question_public_write">
								</div>
							</template>
						</div>
						
						<!-- 페이징 시작 -->
						<div class="e_paging">
							<div v-if="s_page.page_prev == true"
							@click="service_question_public_page_prev(s_page.page_StartBno-5, s_page.standard)"
							 class="e_paging_btnleft" id="e_paging_btnleft_yes">&lt;</div>
							
							<div v-if="s_page.page_prev == false"
							@click="alert('첫 페이지 입니다.');"
							 class="e_paging_btnleft" id="e_paging_btnleft_no">&lt;</div>
							
							<div class="e_paging_num">
							</div>
							
							<div v-if="s_page.page_next == true"
							@click="service_question_public_page_next(s_page.page_EndBno+1, s_page.standard)"
							class="e_paging_btnright" id="e_paging_btnright_yes">&gt;</div>
							
							<div v-if="s_page.page_next == false"
							@click="alert('마지막 페이지 입니다.');"
							 class="e_paging_btnright" id="e_paging_btnright_no">&gt;</div>
						</div>
						<!-- 페이징 끝 -->
						
						<!-- 검색 시작 -->
						<div class="e_search">
							<!-- 기간 -->
							<div class="e_search_time">
								<select name="e_search_time_sel" id="e_search_time_sel" ref="e_search_time_sel">
									<option value="all">전체 기간</option>
									<option value="one_day">1일</option>
									<option value="one_week">1주일</option>
									<option value="one_month">1개월</option>
								</select>
							</div>
							<!-- 타입 -->
							<div class="e_search_type">
								<select name="e_search_type_sel" id="e_search_type_sel" ref="e_search_type_sel">
									<option value="title_content">제목 + 내용</option>
									<option value="title">제목</option>
									<option value="writer">글 작성자</option>
								</select>
							</div>
							<!-- 내용 -->
							<div class="e_search_content">
								<!-- 검색 내용 -->
								<div class="s_content">
									<input type="text" id="s_content_input" ref="s_content_input"
									@keydown="s_content_input_keydown"
									placeholder="검색어를 입력하세요." @focus="this.placeholder=''"
									@blur="this.placeholder='검색어를 입력하세요.'">
								</div>
								<!-- 검색 버튼 -->
								<button type="button" id="s_content_btn" ref="s_content_btn"
								@click="s_content_btn_click">
									검색
								</button>
							</div>
						</div>
						<!-- 검색 끝 -->
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
  name: "question_public",
  components: {
    Header,
  },
  data : function() {
    return {
        comment_List : null,
		s_page : null,
		s_dto_list : null,
		user : JSON.parse(sessionStorage.getItem('user')),
    }
  },
  mounted() {
	this.$axios.get('/service/question-public')
      .then((res)=>{
        this.comment_List = res.data.comment_List;
        this.s_page = res.data.s_page;
        this.s_dto_list = res.data.s_dto_list;
		// 페이지 값
		for(var i=1; i<this.s_page.page_EndBno-this.s_page.page_StartBno+1; i++){
			if (i==this.s_page.page_NowBno){
				this.$refs.e_paging_num.innerHTML += '<a id="page_NowBno">'+i+'</a>';
			} else {
				this.$refs.e_paging_num.innerHTML += '<a '+
				'href="'+"/service/question-public?page_NowBno="+i+
				// eslint-disable-next-line
				'&standard='+s_page.standard+'"'
				+'class="page_Bno" id="page_Bno'+i+'">'+i+'</a>';
			}
		}
		var standard = this.s_page.standard;
		document.getElementById(standard).setAttribute('selected','selected');
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
	service_question_detail_group_origin(group_origin){
		var url = "/service/question-public-detail?bno="+group_origin;
		location.href= url;
	},
	service_question_public_myboard: function(){
		location.href='/service/question-public-myboard'
	},
	service_question_public_write: function(){
		location.href='/service/question-public-write'
	},
	service_question_public_page_prev(page_StartBno, standard){
		var url = '/service/question-public?page_NowBno='+page_StartBno+'&standard='+standard;
		location.href= url
	},
	service_question_public_page_next(page_StartBno, standard){
		var url = '/service/question-public?page_NowBno='+page_StartBno+'&standard='+standard;
		location.href= url
	},
	// 글 상세 페이지
	blist_title_click:function (e){
		var val = e.target.parentElement.parentElement.firstElementChild.value;
		this.$refs.e_bno_val.value = val;
		var url = '/service/question-public-detail?bno='+val;
		location.href= url;
	},
	// 검색 결과 - 엔터
	s_content_input_keydown:function (e){
		if(e.keyCode ==13){
        	e.preventDefault();
            this.$refs.s_content_btn.click();
        }
	},
	// 검색 결과 전달
	s_content_btn_click:function (){
		// 검색 기간 등 정보
		let e_search_time = this.$refs.e_search_time_sel.value;
		let e_search_type = this.$refs.e_search_type_sel.value;
		let e_search_content = this.$refs.s_content_input.value;
		let url = "/service/question-public-search";
		url += "?search_time="+e_search_time;
		url += "&search_type="+e_search_type;
		url += "&search_content="+e_search_content;
		location.href= url;
	},
	e_con_choice_click:function (){
		var origin_type = this.s_page.standard;
		var result_type = this.$refs.e_con_choice.options[this.$refs.e_con_choice.selectedIndex].value;
		// 값이 다르면 실행
		if (origin_type != result_type){
			var url = "/service/question-public?";
			url += "standard="+ result_type;
			location.href=url;
		}
	}
  }
};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/service/question_public.scss";
</style>
