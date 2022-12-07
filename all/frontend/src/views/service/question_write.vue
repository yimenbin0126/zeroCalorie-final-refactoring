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
						<div class="e_header">
							<div class="e_hd_top">고객센터 &gt; 자주하는 질문 &gt; 글쓰기[관리자]</div>
							<div class="e_hd_top_title">글쓰기[관리자]</div>
						</div>

						<!-- 카데고리별 -->
						<form name="e_write_form">
							<!-- 유형 선택 -->
							<div class="e_content_choice">
								<input type="hidden" name="e_choice_val" ref="e_choice_val" id="e_choice_val">
								<div class="e_select_title">글쓰기 유형 선택</div>
								<select id="e_con_choice" @click="e_con_choice_click">
									<option value="question_member" id="question_member_c" selected>회원 정보 관리</option>
									<option value="question_guide" id="question_guide_c">사이트 이용 가이드</option>
								</select>
							</div>
						
							<div class="e_content">
								<!-- 글쓰기 제목 -->
								<div class="e_con_title">
									<div class="e_ti_title">제목</div>
									<div class="e_ti_detail">
										<input type="text" name="title" ref="e_ti_detail_input"
											id="e_ti_detail_input" placeholder="제목을 입력해 주세요.">
									</div>
								</div>

								<!-- 글쓰기 내용 -->
								<div class="e_con_content">
									<div class="e_cont_title">내용</div>
									<div class="e_cont_detail">
										<textarea placeholder="내용을 입력해 주세요." ref="e_cont_detail_input"
										name="description" id="e_cont_detail_input"></textarea>
									</div>
								</div>
								
								<!-- 첨부파일 -->
								<div class="e_con_file">
									<div class="e_file_title">첨부파일</div>
									<div class="e_file_detail">
										<!-- 파일 업로드 -->
										<label class="e_file_btn" for="e_file_detail_input">
											파일 업로드
										</label>
										<input type="file" name="file"
											@change="e_file_detail_input_change" ref="e_file_detail_input"
											id="e_file_detail_input" style="display:none" multiple>
									</div>
								</div>
								<!-- 파일 업로드 -->
								<div class="e_con_file_upload">
									<div class="e_file_title"></div>
									<div class="file_group">
									</div>
								</div>
							</div>

							<!-- 글쓰기 버튼 -->
							<div class="e_button">
								<div class="e_btn_write">
									<input type="submit" value="글쓰기" id="e_btn_write_btn"
									@click="e_btn_write_btn_click">
								</div>
							</div>
						</form>
						
					</div>
				</div>

			</div>
		</div>
	</section>
  </div>
</template>

<script>
import Header from "@/components/common/Header.vue";
// 파일이 늘때마다 고유 번호가 저장됨 (삭제해도 지워지지 않음)
let fileNo = 0;
// 전체 파일 목록을 담을 배열 (삭제해도 지워지지 않음)
let filesArr = new Array();
export default {
  name: "question_write",
  components: {
	Header,
  },
  created(){
    if(sessionStorage.getItem('user') == null){
      location.href="/service/question-member";
    }
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
	e_file_detail_input_change:function (){
		// 첨부파일 최대 개수
		var maxFileCount = 5;
		var allFileCount = document.querySelectorAll('.fileList').length;
		var possibleFileCount = maxFileCount - allFileCount;
		if (possibleFileCount == 0) {
			alert("첨부파일은 최대 " + maxFileCount + "개 까지만 첨부가 가능합니다.");
		}

		if(allFileCount>0){
			var maxSize = 15 * 1024 * 1024;
			var fileSize = this.$refs.e_file_detail_input.files[allFileCount-1].size
			if(fileSize > maxSize){
				alert("첨부파일은 15MB 이내로 등록 가능합니다.");
				return false;
			}
		}
		// 현재 선택된 파일 갯수, 첨부 가능한 파일 갯수 중 최솟값 (추가 가능한 갯수까지 한정으로 추가) 
		for (const file of this.$refs.e_file_detail_input.files) {
			file.is_delete = false;
			filesArr.push(file);
			// 파일 내용 읽기
			var reader = new FileReader();
			// onload = 읽기 동작이 성공적으로 완료되었을 때
			reader.onload = function () {
				// 개별 파일을 저장
				reader.readAsDataURL(file);
			};
			// 목록 추가
			let html = '';
			html += '<div id="file' + fileNo + '" class="fileList" ref="fileList">';
			html += '   <p class="filename">' + file.name + '</p>';
			html += '   <a class="filedelete" onclick="deleteFile(' + fileNo + ');">❌</a>';
			html += '</div>';
			// jquery 로 추가하면 자동으로 dom 으로 변환되어 추가됨
			this.$axios.file_group.append(html);
			fileNo++;
		}
		// 추가한 뒤 초기화
		document.querySelector("input[type=file]").value = "";
	},
	deleteFile(num){
		// 이미 삭제된 파일 해당 인덱스에 .is_delete = true 라는 키와 값을 추가해 구분
		document.querySelector("#file" + num).remove();
		filesArr[num].is_delete = true;
	},
	e_btn_write_btn_click:function (e){
		e.preventDefault();
		// 폼 데이터에 값 담기
	    let formData = new FormData();
		// 파일을 폼데이터에 담기
	    for (let i = 0; i < filesArr.length; i++) {
	        // 삭제되지 않은 파일만 폼데이터에 담기
	        if (!filesArr[i].is_delete) {
	            formData.append('file'+i, filesArr[i]);
	        }
	    }
	    // 빈값 체크
		if(!this.$refs.e_ti_detail_input.value){
			this.$refs.e_ti_detail_input.value = " ";
		} 
		if(!this.$refs.e_cont_detail_input.value){
			this.$refs.e_cont_detail_input.value = " ";
		} 
		var choice_val = '';
		if (document.getElementById('question_member_c').selected){
			choice_val = 'question_member';
		} else if (document.getElementById('question_guide_c').selected) {
			choice_val = 'question_guide';
		}
		formData.append('title', this.$refs.e_ti_detail_input.value);
		formData.append('description', this.$refs.e_cont_detail_input.value);
		formData.append('sv_type', choice_val);
		this.$axios.post('/service/question-write', formData, {
			headers: {
				processData: false,
				contentType: false,
				dataType:'text',
			}
		})
		.then((res)=>{
			// 데이터 null 값 없이 잘 전달됨
			if(res.data=="title_null"){
				alert('제목을 입력해 주세요.');
			} else if(res.data=="title_full") {
				alert('제목은 최대 50자 이하로 입력해주세요.');
			} else if(res.data=="description_null") {
				alert('내용을 입력해 주세요.');
			} else if(res.data=="description_full") {
				alert('내용은 최대 1000자 이하로 입력해주세요.');
			} else {
				alert('글이 작성되었습니다.');
				location.href="/service/question-member";
			}
		})
	}
  }
};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/service/question_write.scss";
</style>
