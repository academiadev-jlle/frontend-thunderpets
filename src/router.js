import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import Search from '@/views/Search.vue';
import Post from '@/views/Post.vue';
import PostUser from '@/views/PostUser.vue';
import User from '@/views/User.vue';
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
      path: '/pets',
      name: 'home',
      component: Home,
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
