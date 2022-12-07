<template>
   <div id="j_hi">
		<ul id="j_list">
            <li class="j_menu" @click="main">메인 페이지</li>
            <li class="j_menu" @click="allservice">고객센터</li>
        </ul>
        
        <div v-if="user != null" id="e_nav">
        	<div id="e_welcome">
        		{{user.nickname}}님 환영합니다.
        	</div>
        	<form name="e_nav_btn">
	        	<input type ="hidden" name="e_logout" value="Y">                   
        	</form>
            <input type ='button' class = "e_btn e_btn" @click="logout" value="로그아웃">
        </div>

        <div v-else-if="user == null" id="j_nav">
            <input type ='button' class = "j_btn" @click="login" value="로그인">
            <input type ='button' class = "j_btn" @click="join" value="회원가입">
        </div>
    </div>
</template>

<script>
// 세션
export default {
    data () {
        return {
            user : JSON.parse(sessionStorage.getItem('user')),
        }
    },
    methods: {
        main: function(){
            location.href='/'
        },
        allservice: function(){
            location.href='/service/allService'
        },
        logout: function(){
            sessionStorage.removeItem('user');
            this.$axios.post('/member/logout')
            .then((res)=>{
                if(res.data == "OK"){
                    alert('로그아웃 되었습니다.');
                    location.href='/'
                }
            });
        },
        login: function(){
            location.href='/member/login'
        },
        join: function(){
            location.href='/member/join'
        }
    },
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/common/header.scss";
</style>
