import Vue from 'vue';
import Router from 'vue-router';
import Search from '@/views/Search.vue';
import Post from '@/views/Post.vue';
import PostUser from '@/views/PostUser.vue';
import User from '@/views/User.vue';
import PasswordRecovery from '@/views/PasswordRecovery.vue';
import PetDetail from '@/views/PetDetail.vue';
import MainPage from '@/views/MainPage.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: 'mainPage',
      component: MainPage,
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
    },
    {
      path: '/post/:id?',
      name: 'post',
      component: Post,
    },
    {
      path: '/edit',
      name: 'edit',
      component: PostUser,
    },
    {
      path: '/user',
      name: 'User',
      component: User,
    },
    {
      path: '/pet/:id',
      name: 'petDetail',
      component: PetDetail,
    },
    {
      path: '/forgotPassword/:id',
      name: 'forgotPassword',
      component: PasswordRecovery,
    },
  ],
  scrollBehavior() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 });
      }, 300);
    });
  },
});

export default router;
