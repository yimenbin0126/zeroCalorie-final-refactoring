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
							자주하는 질문
						</div>
						<!-- 공개 건의함 -->
						<div class="e_nav_onebyone" @click="service_question_public">
							<div class="e_que_div">공개 건의함</div>
							<div><img src="@/assets/img/service/category_click.png"></div>
						</div>
					</nav>

					<!-- 오른쪽 내용 -->
					<div class="e_right">
						<!-- 상단 -->
						<div class="e_header">
							<div class="e_hd_top">고객센터 &gt; 공개 건의함 &gt; 글수정</div>
							<div class="e_hd_top_title">글수정</div>
						</div>

						<!-- 카데고리별 -->
						<form name="e_fix_form">
							<div class="e_content">
								<!-- 글쓰기 제목 -->
								<div class="e_con_title">
									<div class="e_ti_title">제목</div>
									<div class="e_ti_detail">
										<input type="text" name="title" ref="e_ti_detail_input"
											id="e_ti_detail_input" :value="s_dto.title">
									</div>
								</div>

								<!-- 글쓰기 내용 -->
								<div class="e_con_content">
									<div class="e_cont_title">내용</div>
									<div class="e_cont_detail">
										<textarea name="description" ref="e_cont_detail_input"
											id="e_cont_detail_input"></textarea>
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
										<div v-for="(flist,i) in filelist" :key="i"
										id="prev_file{{flist.file_order}}" class="fileList" ref="fileList">
								           <p class="filename">{{flist.filename}}</p>
								           <a class="filedelete" @click="prev_deleteFile(flist.file_order);">❌</a>
								        </div>
									</div>
								</div>
							</div>

							<!-- 글쓰기 버튼 -->
							<div class="e_button">
								<div class="e_btn_fix">
									<!-- 게시판 데이터 보내기 -->
									<input type="hidden" name="bno" id="e_bno" ref="e_bno"
										:value="s_dto.bno">
									<input type="submit" value="수정 완료" id="e_btn_fix_btn"
										@click="e_btn_fix_btn_click">
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
// 파일이 늘때마다 고유 번호가 저장됨 (삭제해도 지워지지 않음)
let fileNo = 0;
// 전체 파일 목록을 담을 배열 (삭제해도 지워지지 않음)
let filesArr = new Array();
// 삭제한 파일들의 고유 번호 담기
let filesArr_del = new Array();
import Header from "@/components/common/Header.vue";
export default {
	name: "question_public_fix",
	data : function() {
		return {
			filelist : null,
			s_dto :  null,
			user : JSON.parse(sessionStorage.getItem('user')),
		}
	},
	components: {
		Header,
	},
	created(){
		if(sessionStorage.getItem('user') != null){
			location.href="/service/question-public";
		}
	},
	mounted() {
		this.$axios.get('/service/question-public-fix')
			.then((res)=>{
				this.filelist = res.data.filelist;
				this.s_dto = res.data.s_dto;
				this.s_dto.description.replace("<br>","\r\n");
				this.$axios.e_cont_detail_input.innerText = this.s_dto.description;
			})
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
			// 기존 추가된 첨부파일 갯수
			var allFileCount = document.querySelectorAll('.fileList').length;
			// 첨부 가능한 파일 추가 갯수
			var possibleFileCount = maxFileCount - allFileCount;
			// 첨부파일 최대 갯수 한도 초과
			if (possibleFileCount == 0) {
				alert("첨부파일은 최대 " + maxFileCount + "개 까지만 첨부가 가능합니다.");
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
				this.$refs.file_group.append(html);
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
		prev_deleteFile(num){
			document.querySelector("#prev_file" + num).remove();
   		 	filesArr_del.push(num);
		},
		e_btn_fix_btn_click:function (e){
			e.preventDefault();
			// 폼 데이터에 값 담기
			let formData = new FormData();
			// 삭제한 파일 있으면 담기
			if (filesArr_del.length >= 1) {
				for (let i = 0; i < filesArr_del.length; i++) {
					formData.append('file_del_num', filesArr_del[i]);
				}
			} else {
				// null 방지 파일 값 전달
				formData.append('file_del_num', "");
			}
			// 파일을 폼데이터에 담기
			for (let i = 0; i < filesArr.length; i++) {
				// 삭제되지 않은 파일만 폼데이터에 담기
				if (!filesArr[i].is_delete) {
					formData.append('file'+i, filesArr[i]);
				}
			}
			formData.append('title', this.$refs.e_ti_detail_input.value);
			formData.append('description', this.$refs.e_cont_detail_input.value);
			formData.append('bno', this.$refs.e_bno.value);
			this.$axios.post('/service/question-public-fix', formData, {
				headers: {
					processData: false,
					contentType: false,
					dataType:'text',
				}
			})
			.then((res)=>{
				alert('글이 수정되었습니다.');
				location.href= res.data;
			})
		}
	}
};
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/service/question_public_fix.scss";
</style>
