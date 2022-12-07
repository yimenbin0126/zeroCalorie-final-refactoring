<template>
	<div id="bodystyle">
    	<Header />
		<section>
			<div id="j_wrap">
				<div id="j_box">
					<!-- 로고 -->
					<div class="e_logo">아이디/비밀번호 찾기</div>
	
					<!-- 카데고리 선택 -->
					<div class="e_hd_choice">
						<div id="e_choice_id">아이디 찾기</div>
						<div id="e_choice_pass" @click="member_findid">비밀번호 찾기</div>
					</div>
					
					<!-- 내용 -->
					<div class="e_hd_content">
						<!-- 설명 -->
						<div class="e_h_content">
							아이디를 찾으려면<br>
							아래 칸에 이메일을 입력하세요.
						</div>
						<!-- 이메일 주소 -->
						<div class="e_h_input">
							<div class="input_text">
								<input type="email" id="e_input_email" ref="e_input_email"
									placeholder="이메일을 입력해 주세요." @focus="this.placeholder=''"
									@blur="this.placeholder='이메일을 입력해 주세요.'">
							</div>
							<div class="input_sub">
								<input type="submit" id="e_input_sub" value="전송하기"
				  				@click="e_input_sub_click">
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
  name: "findid",
  components: {
	Header,
  },
  created(){
    if(sessionStorage.getItem('user') != null){
      location.href="/";
    }
  },
  methods: {
	member_findid: function(){
		location.href='/member/findpass';
	},
    e_input_sub_click:function (e){
      e.preventDefault();
      this.$axios.post('/member/findid', null, {params:{
        email : this.$refs.e_input_email.value
      }})
      .then((res)=>{
        if (res.data == "X") {
          alert('이메일이 존재하지 않습니다.');
        } else {
          alert('이메일로 고객님의 아이디를 전해드렸습니다.\n본인의 이메일을 확인해주세요.');
        } 
      })
    }
  }
};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/member/findid.scss";
</style>
