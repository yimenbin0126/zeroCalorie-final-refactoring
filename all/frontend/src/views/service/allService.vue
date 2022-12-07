<template>
  <div id="bodystyle">
    <Header />
    <section>
		<div id="j_wrap">
			<div id="j_box">
				
				<div class="e_div">
					<!-- 카데고리 -->
					<nav class="e_nav">
						<!-- 문의 전체보기 -->
						<div class="e_nav_all" @click="service_allservice">
							<span>문의 전체보기</span>
							<img src="@/assets/img/service/category_click.png">
						</div>
						<!-- 자주하는 질문 -->
						<div class="e_nav_question" @click="service_question_member">자주하는 질문</div>
						<!-- 공개 건의함 -->
						<div class="e_nav_onebyone" @click="service_question_public">공개 건의함</div>
					</nav>
	
					<!-- 오른쪽 카데고리 -->
					<div class="e_content">
						<div class="e_ct_header">고객센터 &gt; 문의 전체보기</div>
						<div class="e_ct_top">
							<h4>문의 유형</h4>
							<p>
							문의 유형을 선택하거나,<br>
							왼쪽의 카데고리를 클릭하면<br>
							해당 페이지로 이동이 가능합니다.
							</p>
						</div>
	
						<div class="e_ct_middle">
							<div class="e_question">
								<div class="e_que_title" @click="service_question_member">
									<div>자주하는 질문</div>
								</div>
								<p class="e_que_content">
									자주하는 질문은<br>
									관리자가 관리할 수 있는 게시판입니다.<br>
									관리자로 로그인 하면, 게시물을 작성할 수 있습니다.
								</p>
							</div>
							<div class="e_onebyone">
								<div class="e_one_title" @click="service_question_public">공개 건의함</div>
								<p class="e_one_content">
									공개건의함은<br>
									관리자, 회원 등<br>
									모든 회원이 로그인 한 상태라면<br>
									건의 관련 글을 쓰고 댓글을 남길수 있는 소통 공간입니다.
								</p>
							</div>
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
	name: "allService",
	components: {
		Header,
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
	}
};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/service/allService.scss";
</style>
