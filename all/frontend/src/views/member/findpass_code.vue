<template>
  <div id="bodystyle">
    <Header />
    <section>
		<div id="j_wrap">
			<div id="j_box">
				<!-- 로고 -->
				<div class="e_logo">아이디/비밀번호 찾기</div>
				<input type="hidden" id="code" :value="code">
				<input type="hidden" id="member_no" value="{{m_dto.member_no}}">
				<!-- 내용 -->
				<div class="e_hd_content">
					<!-- 인증 -->
					<div class="e_h_content">
						이메일로 전송한<br>
						인증번호를 정확하게 입력해주세요.
					</div>
					<!-- 인증코드 입력 -->
					<div class="e_h_input" id="e_h_input_new">
						<input type="hidden" id="e_h_input_code_val" value="">
						<div class="input_code">
							<input type="text" id="e_input_code" ref="e_input_code"
								placeholder="인증번호를 입력해 주세요." @focus="this.placeholder=''"
								@blur="this.placeholder='인증번호를 입력해 주세요.'">
						</div>
						<div class="input_sub" id="input_sub_code">
							<input type="submit" id="e_input_sub" value="인증하기"
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
	name: "findpass_code",
	components: {
		Header,
	},  
	created(){
    if(sessionStorage.getItem('user') != null
	|| sessionStorage.getItem('code_findid') == null){
		location.href="/";
		}
	},
 	 methods: {
	data : function() {
		return {
			code : sessionStorage.getItem('code_findid'),
			m_dto : JSON.parse(sessionStorage.getItem('member_findid')),
		}
	},
	e_input_sub_click:function (){
		this.$axios.post('/member/findpass-code', null, {params: {
          e_Check_click : "e_join_idcheck",
		  code : this.$refs.e_input_code.value
        }})
        .then((res)=>{
			if(res.data=="O"){
				sessionStorage.removeItem("code_findid");
				alert('인증이 완료되었습니다.');
				location.href='/member/findpass-new';
			} else {
				alert('인증코드가 틀립니다.\n다시 입력해주세요.');
			}
        })
	}
  }
};
</script>
 
<style lang="scss" scoped>
	@import "@/assets/scss/member/findpass-code.scss";
</style>
