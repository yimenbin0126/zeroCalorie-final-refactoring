import { createRouter, createWebHistory } from "vue-router";

import Main from '@/views/main/main.vue';
import Login from '@/views/member/login.vue';
import Join from '@/views/member/join.vue';
import Findid from '@/views/member/findid.vue';
import Findpass from '@/views/member/findpass.vue';
import Findpass_code from '@/views/member/findpass_code.vue';
import Findpass_new from '@/views/member/findpass_new.vue';

import AllService from '@/views/service/allService.vue';
import Question_detail from '@/views/service/question_detail.vue';
import Question_fix from '@/views/service/question_fix.vue';
import Question_guide from '@/views/service/question_guide.vue';
import Question_member from '@/views/service/question_member.vue';
import Question_public from '@/views/service/question_public.vue';
import Question_public_detail from '@/views/service/question_public_detail.vue';
import Question_public_fix from '@/views/service/question_public_fix.vue';
import Question_public_myboard from '@/views/service/question_public_myboard.vue';
import Question_public_myboard_search from '@/views/service/question_public_myboard_search.vue';
import Question_public_reply from '@/views/service/question_public_reply.vue';
import Question_public_search from '@/views/service/question_public_search.vue';
import Question_public_write from '@/views/service/question_public_write.vue';
import Question_write from '@/views/service/question_write.vue';

const routes = [
    {
      path: '/',
      name: "main",
      component: Main
    },
    {
      path: '/member/login',
      name: "login",
      component: Login
    },
    {
      path: '/member/join',
      name: "join",
      component: Join
    },
    {
      path: '/member/findid',
      name: "findid",
      component: Findid
    },
    {
      path: '/member/findpass',
      name: "findpass",
      component: Findpass
    },
    {
      path: '/member/findpass-code',
      name: "findpass_code",
      component: Findpass_code
    },
    {
      path: '/member/findpass-new',
      name: "findpass_new",
      component: Findpass_new
    },
    {
      path: '/service/allService',
      name: "allService",
      component: AllService
    },
    {
      path: '/service/question-detail',
      name: "question_detail",
      component: Question_detail,
      props: (route)=>({
        bno: route.query.bno
      })
    },
    {
      path: '/service/question-fix',
      name: "question_fix",
      component: Question_fix
    },
    {
      path: '/service/question-guide',
      name: "question_guide",
      component: Question_guide
    },
    {
      path: '/service/question-member',
      name: "question_member",
      component: Question_member
    },
    {
      path: '/service/question-public',
      name: "question_public",
      component: Question_public
    },
    {
      path: '/service/question-public-detail',
      name: "question_public_detail",
      component: Question_public_detail
    },
    {
      path: '/service/question-public-fix',
      name: "question_public_fix",
      component: Question_public_fix
    },
    {
      path: '/service/question-public-myboard',
      name: "question_public_myboard",
      component: Question_public_myboard
    },
    {
      path: '/service/question-public-myboard-search',
      name: "question_public_myboard_search",
      component: Question_public_myboard_search
    },
    {
      path: '/service/question-public-reply',
      name: "question_public_reply",
      component: Question_public_reply
    },
    {
      path: '/service/question-public-search',
      name: "question_public_search",
      component: Question_public_search
    },
    {
      path: '/service/question-public-write',
      name: "question_public_write",
      component: Question_public_write
    },
    {
      path: '/service/question-write',
      name: "question_write",
      component: Question_write
    }
  ]

  const router = new createRouter({
    history: createWebHistory(),
    routes,
  })
  
  export default router;
