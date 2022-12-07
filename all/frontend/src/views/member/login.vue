<template>
  <div id="bodystyle">
    <Header />
    <section>
        <div id="j_wrap">
          <div id="j_box">
            <!-- 로고 -->
            <div class="e_logo">로그인</div>
      
            <form name="e_loginform">
              <!-- 아이디, 비밀번호 입력창 -->
              <div class="e_id">
                <h4 id="e_h4_id">아이디</h4>
                <input type="text" name="id" id="e_input_id" ref="e_input_id"
                  placeholder="아이디를 입력해 주세요." @focus="this.placeholder=''"
                  @blur="this.placeholder='아이디를 입력해 주세요.'">
              </div>
    
              <div class="e_password">
                <h4 id="e_h4_pass">비밀번호</h4>
                <input type="password" name="pw" id="e_input_pass" ref="e_input_pass"
                  placeholder="비밀번호를 입력해 주세요." @focus="this.placeholder=''"
                  @blur="this.placeholder='비밀번호를 입력해 주세요.'">
              </div>
    
              <!-- 로그인 버튼-->
              <div class="e_login">
                <input type="submit" id="e_login_btn" value="로그인"
                @click="login_sub" @keydown="login_keydown">
              </div>
    
              <!-- 회원가입, 비밀번호 찾기 -->
              <div class="e_other">
                <a class="e_join_member" href="/member/join">회원가입</a> <a
                  class="e_find_pass" href="/member/findid">아이디/비밀번호 찾기</a>
              </div>
            </form>
          </div>
        </div>
      </section>
  </div>
</template>

<script>
import Header from "@/components/common/Header.vue";
export default {
  name: "login",
  components: {
    Header,
  },
  created(){
    if(sessionStorage.getItem('user') != null){
      location.href="/";
    }
  },
  methods: {
    login_sub: function(e){
      e.preventDefault();
      if (this.$refs.e_input_id.value.length == 0) {
         alert("아이디를 입력해주세요.");
        } else {
          if (this.$refs.e_input_pass.value.length == 0) {
            alert("비밀번호를 입력해주세요.");
         } else {
            this.$axios.post('/member/login', null, {
              params: {
              id: this.$refs.e_input_id.value,
              pw: this.$refs.e_input_pass.value,
            }})
            .then(res=>{
              if (res.data == null || res.data == "") {
                  alert('아이디 혹은 비밀번호가 틀렸습니다.');
               } else {
                  sessionStorage.setItem('user', JSON.stringify(res.data));
                  alert('로그인 되었습니다.');
                  location.href = "/";
               }
            })
         }
      }
    },
    login_keydown:function (e){
		  if(e.keyCode ==13){
        	e.preventDefault();
          this.login_sub();
      }
	  },
  }
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/member/login.scss";
</style>
