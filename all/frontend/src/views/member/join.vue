<template>
  <div id="bodystyle">
    <Header />
      <section>
      <!-- 프로필 파일 올릴때  -->
      <form name="e_mainform" enctype="multipart/form-data" id="e_mainform">
        <div id="j_wrap">
          <div id="j_box">

            <!-- 뒤로가기(메인으로 이동) -->
            <div class="e_back">
              <input type="button" id="e_back_btn"
                @click="member_login" value="&lt; 로그인으로 이동">
            </div>

            <!-- 로고 -->
            <div class="e_logo">회원가입</div>

            <!-- 필수항목 입력 요망 메시지 -->
            <div class="must_message">
              <span class="must_input">*</span>은 필수 입력 사항입니다.
            </div>
            <!-- 아이디 -->
            <div class="e_id">
              <h4 id="e_h4_id">아이디<span class="must_input">*</span></h4>
              <div id="e_id_confirm" class="e_errorindex"
              ref="e_id_confirm">*영문 소문자와 숫자를 혼합해
                5~9자리로 만들어주세요.</div>
              <input type="text" name="id" id="e_input_id" ref="e_input_id"
                @keyup="e_idCheck_keyup"
                placeholder="아이디를 입력해 주세요." @focus="this.placeholder=''"
                @blur="this.placeholder='아이디를 입력해 주세요.'">

              <!-- 아이디 중복체크 -->
              <div class="e_idcheck_div">
                <button type="button" id="e_idCheck"
                @click="e_idCheck_click">중복 확인</button>
                <!-- 중복체크 완료시 -->
                <div id="e_id_check" ref="e_id_check" class="e_checkindex">*사용 가능한 아이디 입니다.
                </div>
              </div>
            </div>

            <!-- 비밀번호 -->
            <div class="e_password">
              <h4 id="e_h4_pass">비밀번호<span class="must_input">*</span></h4>
              <div id="e_pass_confirm" class="e_errorindex" ref="e_pass_confirm">*특수문자(!@#*),
                영문 대문자, 영문 소문자, 숫자 최소 한개 이상을 넣어 혼합해 5~9자리로 만들어주세요.</div>
              <input type="password" name="pw" id="e_input_pass" ref="e_input_pass"
                placeholder="비밀번호를 입력해 주세요." @focus="this.placeholder=''"
                @keyup="e_input_pass_keyup"
                @blur="this.placeholder='비밀번호를 입력해 주세요.'">
            </div>

            <!-- 비밀번호 확인 -->
            <div class="e_password_more">
              <h4 id="e_h4_pass_more">비밀번호 확인<span class="must_input">*</span></h4>
              <div id="e_pass_more_confirm" class="e_errorindex" ref="e_pass_more_confirm">*비밀번호가 맞지
                않습니다.</div>
              <input type="password" id="e_input_pass_more" ref="e_input_pass_more"
                placeholder="비밀번호를 다시 입력해 주세요." @focus="this.placeholder=''"
                @keyup="e_input_pass_more_keyup"
                @blur="this.placeholder='비밀번호를 다시 입력해 주세요.'">
            </div>

            <!-- 이름 -->
            <div class="e_name">
              <h4 id="e_h4_name">이름</h4>
              <div id="e_name_confirm" class="e_errorindex"
              ref="e_name_confirm">*이름을 입력해주세요.</div>
              <input type="text" name="name" id="e_input_name" ref="e_input_name"
                placeholder="ex) 홍길동 (미입력시 자동 등록)" @focus="this.placeholder=''"
                @keyup="e_input_name_keyup"
                @blur="this.placeholder='ex) 홍길동 (미입력시 자동 등록)'">
            </div>

            <!-- 닉네임 -->
            <div class="e_nickname">
              <h4 id="e_h4_nickname">닉네임<span class="must_input">*</span></h4>
              <div id="e_nickname_confirm" class="e_errorindex" ref="e_nickname_confirm">*2자~5자 이하의
                한글로 만들어주세요.</div>
              <input type="text" name="nickname" id="e_input_nickname" ref="e_input_nickname"
                placeholder="닉네임을 입력해 주세요." @focus="this.placeholder=''"
                @keyup="e_input_nickname_keyup"
                @blur="this.placeholder='닉네임을 입력해 주세요.'">
              
              <!-- 닉네임 중복체크 -->
              <div class="e_nickcheck_div">
                <button type="button" id="e_nickCheck"
                @click="e_nickCheck_click">중복 확인</button>
                <!-- 중복체크 완료시 -->
                <div id="e_nick_check" class="e_checkindex" ref="e_nick_check">*사용 가능한 닉네임 입니다.
                </div>
              </div>
            </div>

            <!-- 생년월일 -->
            <div class="e_birth">
              <h4 id="e_h4_birth">생년월일</h4>
              <div id="e_birth_confirm" class="e_errorindex" ref="e_birth_confirm">*생년월일을
                입력해주세요.</div>
              <input type="text" name="birth" id="e_input_birth" ref="e_input_birth"
                placeholder="ex) 2000-01-01 (미입력시 자동 등록)" @focus="this.placeholder=''"
                @keyup="e_input_birth_keyup"
                @blur="this.placeholder='ex) 2000-01-01 (미입력시 자동 등록)'">
            </div>

            <!-- 성별 -->
            <div class="e_gender">
              <h4 id="e_h4_gender">성별</h4>
              <div id="e_gender_confirm" class="e_errorindex" ref="e_gender_confirm">*성별을 선택해주세요.</div>
              <select name="gender" id="e_sel_gender" ref="e_sel_gender"
              @click="e_sel_gender_click">
                <option value="e_none">선택</option>
                <option value="F">여자</option>
                <option value="M">남자</option>
              </select>
            </div>

            <!-- 이메일 -->
            <div class="e_email">
              <h4>이메일<span class="must_input">*</span></h4>
              <div id="e_email_confirm" class="e_errorindex" ref="e_email_confirm">*이메일 형식이 맞지
                않습니다.</div>
              <input type="email" name="email" id="e_input_email" ref="e_input_email"
                placeholder="ex) abc1234@gmail.com" @focus="this.placeholder=''"
                @keyup="e_input_email_keyup"
                @blur="this.placeholder='ex) abc1234@gmail.com'">
            </div>

            <!-- 전화번호 -->
            <div class="e_tel">
              <h4>전화번호<span class="must_input">*</span></h4>
              <div id="e_tel_confirm" class="e_errorindex" ref="e_tel_confirm">*전화번호 형식이 맞지
                않습니다.</div>
              <input type="text" name="tel" id="e_input_tel" ref="e_input_tel"
                placeholder="ex) 010-1234-5678" @focus="this.placeholder=''"
                @keyup="e_input_tel_keyup"
                @blur="this.placeholder='ex) 010-1234-5678'">
            </div>

            <!-- 키 -->
            <div class="e_height">
              <h4 id="e_h4_height">본인의 키<span class="must_input">*</span></h4>
              <div id="e_height_confirm" class="e_errorindex" ref="e_height_confirm">*본인의 키를 제대로
                입력해주세요.</div>
              <input type="text" name="height" id="e_input_height" ref="e_input_height"
                placeholder="본인의 키를 입력해 주세요." @focus="this.placeholder=''"
                @keyup="e_input_height_keyup"
                @blur="this.placeholder='본인의 키를 입력해 주세요.'"> <span>cm</span>
            </div>

            <!-- 임시 (지금은 사용안함) -->
            <!-- 프로필 사진 -->
            <div class="e_pro_img">
              <h4 id="e_h4_pro_img">프로필 사진</h4>
              <div id="e_pro_img_confirm" class="e_errorindex"
              ref="e_pro_img_confirm">*jpg/jpeg/png 파일을 첨부해주세요.</div>
              <!-- 파일 업로드 -->
              <label class="e_input_pro_img_btn" for="e_input_pro_img">
                프로필 사진 업로드 </label>
              <input type="file" name="pro_img" id="e_input_pro_img" ref="e_input_pro_img"
              @change="e_input_pro_img_change" accept=".jpg, .jpeg, .png">
              <!-- 파일 유효성 검사, 삭제하기 -->
              <button type="button" id="e_delete_file" ref="e_delete_file"
              @click="e_delete_file_click">삭제</button>
              <!-- 이미지 미리보기, 파일이름 -->
              <div class="e_pro_img_view">
                <img ref="e_pro_img_view_img">
              </div>
              <div class="e_pro_img_name" ref="e_pro_img_name">
              </div>
            </div>

            <!-- 회원가입 버튼 -->
            <div class="e_sub">
              <input type="submit" id="e_sub_btn" value="회원가입" @click="e_sub_btn_click">
            </div>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import Header from "@/components/common/Header.vue";
export default {
  name: "join",
  components: {
    Header,
  },
  created(){
    if(sessionStorage.getItem('user') != null){
      location.href="/";
    }
  },
  methods: {
    member_login: function(){
      location.href='/member/login'
    },
    // 아이디 중복 확인
    e_idCheck_click:function (){
      if(this.$refs.e_id_check.style.display =="none"
        && this.$refs.e_input_id.value.length !=0
        && this.$refs.e_id_confirm.style.display == "none"){
        this.$axios.post('/member/join', null, {params: {
          e_Check_click : "e_join_idcheck",
		      e_input : this.$refs.e_input_id.value
        }})
        .then((res)=>{
          if (res.data == "0") {
            this.$refs.e_id_check.style.display ="block";
          } else {
            alert('이미 존재하는 아이디 입니다.');
          }
        })
      } else {
        alert("아이디를 제대로 입력해주세요.");
      }
    },
    // 아이디 중복 확인 후 건드렸을 때
    e_idCheck_keyup:function (){
      this.$refs.e_id_check.style.display ="none";
      // 아이디 유효성 검사
      if ((/^[a-z0-9]{5,9}$/).test(this.$refs.e_input_id.value) == true 
      && (/[a-z]*[0-9]/).test(this.$refs.e_input_id.value) == true
      && (/[a-z]+/).test(this.$refs.e_input_id.value) == true 
      && (/[0-9]+/).test(this.$refs.e_input_id.value) == true) {
        this.$refs.e_id_confirm.style.display = "none";
      } else {
        this.$refs.e_id_confirm.style.display = "block";
      }      
    },
    // 비밀번호 유효성 검사
    e_input_pass_keyup:function (){
      if ((/^[a-zA-Z0-9!@#*]{5,9}$/).test(this.$refs.e_input_pass.value) == true 
      && (/[a-z]*[A-Z]*[0-9]*[@!#*]/).test(this.$refs.e_input_pass.value) == true
      && (/[a-z]+/).test(this.$refs.e_input_pass.value) == true 
      && (/[A-Z]+/).test(this.$refs.e_input_pass.value) == true
      && (/[0-9]+/).test(this.$refs.e_input_pass.value) == true 
      && (/[@!#*]+/).test(this.$refs.e_input_pass.value) == true) {
        this.$refs.e_pass_confirm.style.display = "none";
      } else {
        this.$refs.e_pass_confirm.style.display = "block";
      }
      if (this.$refs.e_input_pass_more.value == this.$refs.e_input_pass.value) {
        this.$refs.e_pass_more_confirm.style.display = "none";
      } else {
        this.$refs.e_pass_more_confirm.style.display = "block";
      }
    },
    // 비밀번호 확인 유효성 검사
    e_input_pass_more_keyup:function (){
      if (this.$refs.e_input_pass_more.value == this.$refs.e_input_pass.value) {
        this.$refs.e_pass_more_confirm.style.display = "none";
      } else {
        this.$refs.e_pass_more_confirm.style.display = "block";
      }
    },
    // 이름 유효성 검사
    e_input_name_keyup:function (){
      if ((/^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,3}$/).test(this.$refs.e_input_name.value) == true) {
        this.$refs.e_name_confirm.style.display = "none";
      } else {
        this.$refs.e_name_confirm.style.display = "block";
      }
    },
    // 닉네임 유효성 검사
    e_input_nickname_keyup:function (){
      // 중복 확인 후 건드렸을 때
      this.$refs.e_nick_check.style.display = "none";
      // 그 외
      if ((/^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,5}$/).test(this.$refs.e_input_nickname.value) == true) {
        this.$refs.e_nickname_confirm.style.display = "none";
      } else {
        this.$refs.e_nickname_confirm.style.display = "block";
      }
    },
    // 닉네임 중복확인 버튼 - 클릭
    e_nickCheck_click:function (){
      if(this.$refs.e_nick_check.style.display =="none"
		  && this.$refs.e_input_nickname.value.length != 0
      && this.$refs.e_nickname_confirm.style.display == "none"){
        this.$axios.post('/member/join', null, {
          params: {
          e_Check_click: "e_join_nickcheck",
          e_input: this.$refs.e_input_nickname.value
          }})
          .then((res)=>{
          if (res.data == "0") {
            this.$refs.e_nick_check.style.display ="block";
          } else {
            alert('이미 존재하는 닉네임 입니다.');
          }
        })
		  } else {
        alert("닉네임을 제대로 입력해주세요.");
      }
    },
    // 생년월일 유효성 검사
    e_input_birth_keyup:function (){
      if ((/^[0-9]*$/).test(this.$refs.e_input_birth.value.substring(0,4)) == true 
      && (/^[0-9]*$/).test(this.$refs.e_input_birth.value.substring(5,7)) == true
      && (/^[0-9]*$/).test(this.$refs.e_input_birth.value.substring(8)) == true 
      && this.$refs.e_input_birth.value.length == 10
      && this.$refs.e_input_birth.value[4] == '-' && this.$refs.e_input_birth.value[7] == '-') {
        this.$refs.e_birth_confirm.style.display = "none";
      } else {
        this.$refs.e_birth_confirm.style.display = "block";
      }
    },
    // 성별 유효성 검사
    e_sel_gender_click:function (){
      if (this.$refs.e_sel_gender.value == 'e_none') {
        this.$refs.e_gender_confirm.style.display = "block";
      } else {
        this.$refs.e_gender_confirm.style.display = "none";
      }
    },
    // 이메일 유효성 검사
    e_input_email_keyup:function (){
      // eslint-disable-next-line
      if ((/^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/).test(this.$refs.e_input_email.value) === false) {
        this.$refs.e_email_confirm.style.display = "block";
      } else {
        this.$refs.e_email_confirm.style.display = "none";
      }
    },
    // 전화번호 유효성 검사
    e_input_tel_keyup:function (){
      if ((/^01([0|1|6|7|8|9])$/).test(this.$refs.e_input_tel.value.substring(0,3)) == true 
      && this.$refs.e_input_tel.value.length == 13
      && (/^[0-9]*$/).test(this.$refs.e_input_tel.value.substring(4,8)) == true 
      && (/^[0-9]*$/).test(this.$refs.e_input_tel.value.substring(9)) == true
      && this.$refs.e_input_tel.value[3] == '-' && this.$refs.e_input_tel.value[8] == '-') {
        this.$refs.e_tel_confirm.style.display = "none";
      } else {
        this.$refs.e_tel_confirm.style.display = "block";
      }
    },
    // 키 유효성 검사
    e_input_height_keyup:function (){
      if ((/^[0-9]{3,3}$/).test( this.$refs.e_input_height.value) == true
      &&  this.$refs.e_input_height.value > 100 &&  this.$refs.e_input_height.value < 200) {
        this.$refs.e_height_confirm.style.display = "none";
      } else {
        this.$refs.e_height_confirm.style.display = "block";
      }
    },
    // 이미지 미리보기
    e_input_pro_img_change:function (){
      this.$refs.e_pro_img_confirm.style.display = "block";
      var e_pro_img_view_img = this.$refs.e_pro_img_view_img;
      var e_pro_img_confirm = this.$refs.e_pro_img_confirm;
      var e_pro_img_name = this.$refs.e_pro_img_name;
      var e_input_pro_img = this.$refs.e_input_pro_img;
      if (this.$refs.e_input_pro_img.files && this.$refs.e_input_pro_img.files[0]) {
        // 파일 객체를 읽어줌
		    var reader = new FileReader();
		    reader.onload = function(e) {
          e_pro_img_name.innerHTML = "파일명 : "+e_input_pro_img.files[0].name;
          e_pro_img_view_img.src = e.target.result;
          e_pro_img_confirm.style.display = "none";
          e_pro_img_view_img.style.paddingTop="30px";
          e_pro_img_view_img.style.width="200px";
          e_pro_img_view_img.style.height="200px";
	    	};
	    	reader.readAsDataURL(this.$refs.e_input_pro_img.files[0]);
		  } else {
        e_pro_img_view_img.style.width="0px";
        e_pro_img_view_img.style.height="0px";
        e_pro_img_view_img.style.paddingTop="0px";
        e_pro_img_name.innerHTML = "";
        e_pro_img_view_img.src = "";
        e_pro_img_confirm.style.display = "block";
		  }	
    },
    // 이미지 삭제
    e_delete_file_click:function (){
      var e_input_pro_img = this.$refs.e_input_pro_img;
      var e_pro_img_view_img = this.$refs.e_pro_img_view_img;
      var e_pro_img_confirm = this.$refs.e_pro_img_confirm;
      var e_pro_img_name = this.$refs.e_pro_img_name;
      e_input_pro_img.value = "";
      // eslint-disable-next-line 
      if (e_input_pro_img.files && e_input_pro_img.files[0]) {
      } else {
        e_pro_img_view_img.style.width="0px";
        e_pro_img_view_img.style.height="0px";
        e_pro_img_name.innerHTML = "";
        e_pro_img_view_img.src = "";
        e_pro_img_confirm.style.display = "block";
      }
    },
    // 가입 버튼
    e_sub_btn_click (e){
      e.preventDefault();
      if (this.$refs.e_id_confirm.style.display == "block"
        || this.$refs.e_input_id.value.length == 0
        || this.$refs.e_id_check.style.display == "none") {
          alert("아이디를 제대로 입력해주세요.");
          this.$refs.e_input_id.focus();
      } else {
          this.p_check();
      }
    },
    // 비밀번호 체크
    p_check (){
      if (this.$refs.e_pass_confirm.style.display == "block"
          || this.$refs.e_input_pass.value.length == 0) {
          alert('비밀번호를 제대로 입력해주세요.');
          this.$refs.e_input_pass.focus();
      } else {
        this.p_more_check();
      }
    },
    // 비밀번호 확인 체크
    p_more_check (){
      if (this.$refs.e_pass_more_confirm.style.display == "block"
          || this.$refs.e_input_pass_more.value.length == 0) {
          alert('입력한 비밀번호가 맞지 않습니다.');
          this.$refs.e_input_pass_more.focus();
      } else {
        this.nick_check();
      }
    },
    // 닉네임 체크
    nick_check (){
      if (this.$refs.e_nickname_confirm.style.display == "block"
          || this.$refs.e_input_nickname.value.length == 0
          || this.$refs.e_nick_check.style.display == "none") {
              alert('닉네임을 입력해주세요.');
              this.$refs.e_input_nickname.focus();
      } else {
        this.e_check();
      }
    },
    // 이메일 체크
    e_check(){
      if (this.$refs.e_email_confirm.style.display == "block"
      // eslint-disable-next-line
          || (/^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/).test(this.$refs.e_input_email.value) === false) {
              alert('이메일을 제대로 입력해주세요.');
              this.$refs.e_input_email.focus();
      } else {
        this.t_check();
      }
    },
    // 전화번호 체크
    t_check(){
      if (this.$refs.e_tel_confirm.style.display == "block"
          || (/^01([0|1|6|7|8|9])-?([0-9]{4})-?([0-9]{4})$/).test(this.$refs.e_input_tel.value) === false) {
              alert('전화번호를 제대로 입력해주세요.');
              this.$refs.e_input_tel.focus();
      } else {
        this.height();
      }
    },
    // 키 체크
    height(){
      if (this.$refs.e_height_confirm.style.display == "block"
          || this.$refs.e_input_height.value.length == 0) {
          alert('키를 입력해주세요.');
          this.$refs.e_input_height.focus();
      } 
      else {
        this.join();
      }
    },
    // 가입 승인
    join (){
      // 생년월일 제대로 기입 안되있을시 기본값 저장
      if ((/^[0-9]*$/).test(this.$refs.e_input_birth.value.substring(0,4)) == false 
      || (/^[0-9]*$/).test(this.$refs.e_input_birth.value.substring(5,7)) == false
      || (/^[0-9]*$/).test(this.$refs.e_input_birth.value.substring(8)) == false 
      || this.$refs.e_input_birth.value.length != 10
      || this.$refs.e_input_birth.value[4] != '-' || this.$refs.e_input_birth.value[7] != '-') {
        this.$refs.e_input_birth.value = "2000-01-01";
      } 
      // 폼 변수 저장
      var e_mainform = document.querySelector('#e_mainform');
      var formData = new FormData(e_mainform);
      // 폼 데이터 보내기
      this.$axios.post('/member/joinComplet', formData, {
        headers: {
          cache: false,
          dataType:'text',
          contentType: false,
          processData: false
        }
      })
      .then((res)=>{
        if(res.data=="통과"){
          alert('회원가입이 완료되었습니다. \n잠시후, 로그인 페이지로 돌아갑니다.');
          location.href='/member/login';
        } else {
          alert(res.data);
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/member/join.scss";
</style>
