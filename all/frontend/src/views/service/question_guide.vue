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
						<div class="e_hd_top">고객센터 &gt; 자주하는 질문</div>
						<div class="e_header">
							<div class="e_hd_top_que">자주하는 질문</div>
							<div class="e_hd_top_con">
								<span> 자주하는 질문은 <br>관리자가 관리할 수 있는 게시판입니다.
								<br>관리자로 로그인 하면, 게시물을 작성할 수 있습니다.
								</span>
							</div>

							<!-- 카데고리 선택 -->
							<div class="e_hd_choice">
								<form name="e_hd_choice_form" ref="e_hd_choice_form">
									<input type="hidden" name="e_hd_choice_LR" id="e_hd_choice_LR" value="L">
								</form>
								<div id="e_choice_mem" @click="service_question_member">회원 정보 관리</div>
								<div id="e_choice_guide">사이트 이용 가이드</div>
							</div>
						</div>

						<!-- 게시물 불러오기 - 사이트 이용 가이드 -->
						<div class="e_content">
							<!-- 게시물 번호 보내기 - 상세보기 -->
							<form name="e_bno_val_form" id="e_bno_val_form" ref="e_bno_val_form">
								<input type="hidden" name="bno" id="e_bno_val" ref="e_bno_val">
							</form>
							<!-- 게시물 목록 시작 -->
							<div v-if="(s_dto_list.length != 0)" class="e_con_mem">
								<ul>
									<li>번호</li>
									<li>제목</li>
									<li>글쓴이</li>
									<li>작성시간</li>
									<li>조회수</li>
									<li>좋아요</li>
								</ul>
								<ul class="e_boardlist"
								v-for="(s_dto,i) in s_dto_list" :key="i">
									<li :value="s_dto.bno">{{s_dto.bno}}</li>
									<li @click="blist_title_click(s_dto.bno)"
									class="blist_title">{{s_dto.title}}</li>
									<li>{{s_dto.nickname}}</li>
									<li>{{s_dto.create_time}}</li>
									<li>{{s_dto.view_no}}</li>
									<li>{{s_dto.like_check}}</li>
								</ul>
							</div>

							<div v-else-if="(s_dto_list.length == 0)" class="e_con_mem">
								<ul>
									<li>번호</li>
									<li>제목</li>
									<li>글쓴이</li>
									<li>작성시간</li>
									<li>조회수</li>
									<li>좋아요</li>
								</ul>
								<ul class="e_boardlist">
									<li style="width:100%; text-align:center; font-weight:bold; font-size: 13px;
									margin-top:10px; margin-bottom:10px;">존재하는 게시물 없음</li>
								</ul>
							</div>
							<!-- 게시물 목록 끝 -->
						</div>
						
						<div class="e_btn_list">
							<!-- 글쓰기 버튼 보이기 (로그인) -->
							<div v-if="user != null && user.id == 'admin'">
								<input type="button"  value="글쓰기" class="e_hd_top_write"
								@click="service_question_write">
							</div>
						</div>
						
						<!-- 페이징 시작 -->
						<div class="e_paging">
							<div v-show="s_page.page_prev != null && s_page.page_prev == true"
							@click="service_question_guide_search(s_page.page_StartBno-5, s_searchdto.search_time,s_searchdto.search_type,s_searchdto.search_content)"
							class="e_paging_btnleft" id="e_paging_btnleft_yes">&lt;</div>
							
							<div v-show="s_page.page_prev != null && s_page.page_prev == false"
							@click="s_page_prev_false"
							class="e_paging_btnleft" id="e_paging_btnleft_no">&lt;</div>
							
							<div class="e_paging_num" ref="e_paging_num"
							v-for="page in page_list" :key="page">
								<template v-if="(page == s_page.page_NowBno)">
									<a id="page_NowBno">{{page}}</a>
								</template>
								<template v-else>
									<a @click='page_bno_click(page)' 
									class="page_Bno">{{page}}</a>
								</template>
							</div>
					
							<div v-show="s_page.page_next != null && s_page.page_next == true"
							@click="service_question_guide_search(s_page.page_EndBno+1,s_searchdto.search_time,s_searchdto.search_type,s_searchdto.search_content)"
							class="e_paging_btnright" id="e_paging_btnright_yes">&gt;</div>
							
							<div v-show="s_page.page_next != null && s_page.page_next == false"
							@click="s_page_next_false"
							class="e_paging_btnright" id="e_paging_btnright_no">&gt;</div>
						</div>
						<!-- 페이징 끝 -->
						
						<!-- 검색 시작 -->
						<div class="e_search">
							<!-- 기간 -->
							<div class="e_search_time">
								<select name="e_search_time_sel" id="e_search_time_sel" ref="e_search_time_sel">
									<option value="all" id="all">전체 기간</option>
									<option value="one_day" id="one_day">1일</option>
									<option value="one_week" id="one_week">1주일</option>
									<option value="one_month" id="one_month">1개월</option>
								</select>
							</div>
							<!-- 타입 -->
							<div class="e_search_type">
								<select name="e_search_type_sel" id="e_search_type_sel" ref="e_search_type_sel">
									<option value="title_content" id="title_content">제목 + 내용</option>
									<option value="title" id="title">제목</option>
									<option value="writer" id="writer">글 작성자</option>
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
  name: "question_guide",
  data : function() {
		return {
			s_page : null,
			s_dto_list : null,
			s_searchdto :  null,
			search_content_ : null,
			user : JSON.parse(sessionStorage.getItem('user')),
			page_list : [],
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
			this.$axios.get('/service/question-guide')
			.then((res)=>{
				this.s_page = JSON.parse(JSON.stringify(res.data.s_page));
				this.s_dto_list = JSON.parse(JSON.stringify(res.data.s_dto_list));
				this.s_searchdto = JSON.parse(JSON.stringify(res.data.s_searchdto));
				for(var i=this.s_page.page_StartBno; i<=this.s_page.page_EndBno; i++){
					this.page_list.push(i);
				}
				var search_time = this.s_searchdto.search_time;
				var search_type = this.s_searchdto.search_type;
				document.getElementById(search_time).selected = true;
				document.getElementById(search_type).selected = true;
			})
		},
		goback(){
			this.s_page = null;
			this.s_dto_list = null;
			this.s_searchdto = null;
			this.page_list = [];
		},
		page_bno_click(page){
			this.$axios.get('/service/question-guide',{
				params : {
					"page_NowBno":page,
					"search_time":this.s_searchdto.search_time,
					"search_type":this.s_searchdto.search_type,
					"search_content":this.s_searchdto.search_content
				}
			})
			.then((res)=>{
				this.goback();
				this.s_page = JSON.parse(JSON.stringify(res.data.s_page));
				this.s_dto_list = JSON.parse(JSON.stringify(res.data.s_dto_list));
				this.s_searchdto = JSON.parse(JSON.stringify(res.data.s_searchdto));
				for(var i=this.s_page.page_StartBno; i<=this.s_page.page_EndBno; i++){
					this.page_list.push(i);
				}
				var search_time = this.s_searchdto.search_time;
				var search_type = this.s_searchdto.search_type;
				document.getElementById(search_time).selected = true;
				document.getElementById(search_type).selected = true;
				var search_content = this.s_searchdto.search_content;
				document.querySelector('#s_content_input').value = search_content;
			})
		},
		s_page_prev_false: function(){
			alert('첫 페이지 입니다.');
		},
		s_page_next_false: function(){
			alert('마지막 페이지 입니다.');
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
		service_question_write: function(){
			location.href='/service/question-write'
		},
		service_question_guide_s_page(page_StartBno){
			var url = '/service/question-guide?page_NowBno='+page_StartBno;
			location.href=url;
		},
		service_question_guide_search(page_StartBno,search_time,search_type,search_content_){
			this.$axios.get('/service/question-guide',{
				params : {
					"page_NowBno":page_StartBno,
					"search_time":search_time,
					"search_type":search_type,
					"search_content":search_content_
				}
			})
			.then((res)=>{
				this.goback();
				this.s_page = JSON.parse(JSON.stringify(res.data.s_page));
				this.s_dto_list = JSON.parse(JSON.stringify(res.data.s_dto_list));
				this.s_searchdto = JSON.parse(JSON.stringify(res.data.s_searchdto));
				for(var i=this.s_page.page_StartBno; i<=this.s_page.page_EndBno; i++){
					this.page_list.push(i);
				}
				var search_time = this.s_searchdto.search_time;
				var search_type = this.s_searchdto.search_type;
				document.getElementById(search_time).selected = true;
				document.getElementById(search_type).selected = true;
				var search_content = this.s_searchdto.search_content;
				document.querySelector('#s_content_input').value = search_content;
			})
		},
		// 글 상세 페이지
		blist_title_click:function (val){
			var url = '/service/question-detail?bno='+val;
			console.log(url);
			location.href=url;
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

			this.$axios.get('/service/question-guide',{
				params : {
					"search_time":e_search_time,
					"search_type":e_search_type,
					"search_content":e_search_content
				}
			})
			.then((res)=>{
				this.goback();
				this.s_page = JSON.parse(JSON.stringify(res.data.s_page));
				this.s_dto_list = JSON.parse(JSON.stringify(res.data.s_dto_list));
				this.s_searchdto = JSON.parse(JSON.stringify(res.data.s_searchdto));
				for(var i=this.s_page.page_StartBno; i<=this.s_page.page_EndBno; i++){
					this.page_list.push(i);
				}
				var search_time = this.s_searchdto.search_time;
				var search_type = this.s_searchdto.search_type;
				document.getElementById(search_time).selected = true;
				document.getElementById(search_type).selected = true;
				var search_content = this.s_searchdto.search_content;
				document.querySelector('#s_content_input').value = search_content;
			})
		}
  }
};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/service/question_guide.scss";
</style>
