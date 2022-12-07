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
						<div id="e_choice_id" @click="member_findid">아이디 찾기</div>
						<div id="e_choice_pass">비밀번호 찾기</div>
					</div>
					
					<!-- 내용 -->
					<div class="e_hd_content">
						<!-- 설명 -->
						<div class="e_h_content">
							비밀번호를 찾으려면<br>
							아래 칸에 아이디와 이메일을 입력하세요.
						</div>
						<!-- 입력 -->
						<div class="e_h_input" id="e_h_input_code">
							<div class="input_id">
								<input type="text" id="e_input_id" ref="e_input_id"
									placeholder="아이디를 입력해 주세요." @focus="this.placeholder=''"
									@blur="this.placeholder='아이디를 입력해 주세요.'">
							</div>
							
							<div class="input_text">
								<input type="email" id="e_input_email" ref="e_input_email"
									placeholder="이메일을 입력해 주세요." @focus="this.placeholder=''"
									@blur="this.placeholder='이메일을 입력해 주세요.'">
							</div>
							<div class="input_sub" id="input_sub_input">
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
  name: "findpass",
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
		location.href='/member/findid'
	},
    e_input_sub_click:function (e){
        e.preventDefault();
        this.$axios.post('/member/findpass', null,{ params: {
            email : this.$refs.e_input_email.value,
            id : this.$refs.e_input_id.value
        }})
        .then((res)=>{
            if(res.data!=null){
				if (sessionStorage.getItem("code_findid") != null){
					sessionStorage.removeItem("code_findid");
					sessionStorage.removeItem("member_findid");
				}
				sessionStorage.setItem("code_findid", res.data.code_findid);
				sessionStorage.setItem("member_findid", JSON.stringify(res.data.member_findid));
                alert('고객님의 이메일로 인증코드를 보내드렸습니다.\n인증을 완료해주세요.');
                location.href='/member/findpass-code';
            } else {
                alert('아이디 혹은 이메일이 틀립니다.\n다시 입력해주세요.');
            }
        })
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/member/findpass.scss";
</style>
