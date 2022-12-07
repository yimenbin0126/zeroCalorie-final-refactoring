<template>
  <div id="bodystyle">
    <Header />
    <section>
		<div id="j_wrap">
			<div id="j_box">
				<!-- 로고 -->
				<div class="e_logo">아이디/비밀번호 찾기</div>
				
				<!-- 내용 -->
				<div class="e_hd_content">
					<!-- 설명 -->
					<div class="e_h_content">
						<p>
						앞으로 쓰실 고객님의<br>
						새로운 비밀번호를 입력해주세요.<br>
						</p>
						<p style="color:gray;">
						(*특수문자(!@#*),
							영문 대문자, 영문 소문자,<br>숫자 최소 한개 이상을 넣어 혼합해 5~9자리로 만들어주세요.
						</p>
					</div>
					<!-- 비밀번호 지정 -->
					<div class="e_h_input">
						<div class="e_input_code">
							<input type="password" id="e_input_code" ref="e_input_code"
								placeholder="새로운 비밀번호를 입력해 주세요." @focus="this.placeholder=''"
								@blur="this.placeholder='새로운 비밀번호를 입력해 주세요.'">
						</div>
						
						<div class="e_input_code_re">
							<input type="password" id="e_input_code_re" ref="e_input_code_re"
								placeholder="새로운 비밀번호를 다시 입력해 주세요." @focus="this.placeholder=''"
								@blur="this.placeholder='새로운 비밀번호를 다시 입력해 주세요.'">
						</div>
						<div class="input_sub" id="input_sub_new">
							<input type="submit" id="e_input_email" value="비밀번호 변경"
							@click="e_input_email_click">
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
  name: "findpass_new",
  components: {
	Header,
  },
  created(){
    if(sessionStorage.getItem('user') != null
		&& sessionStorage.getItem('member_findid') == null
		&& sessionStorage.getItem('code_findid') != null){
			location.href="/";
		}
	},
  methods: {
	e_input_email_click:function (){
		this.$axios.post('/member/findpass-new', null, {params: {
			pass : this.$refs.e_input_code.value,
		    pass_re : this.$refs.e_input_code_re.value
        }})
        .then((res)=>{
			if(res.data=="O"){
				sessionStorage.removeItem("member_findid");
				alert('비밀번호가 변경되었습니다.');
				location.href='/member/findpass';
			} else if (res.data=="X1") {
				alert('기존 비밀번호와 똑같은 비밀번호입니다.\n다시 입력해주세요.');
			} else if (res.data=="X2") {
				alert('비밀번호가 올바르지 않습니다.\n다시 입력해주세요.');
			} else if (res.data=="X3") {
				alert('비밀번호 재입력이 올바르지 않습니다.\n다시 입력해주세요.');
			}
        })
	}
  }
};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/member/findpass-new.scss";
</style>
