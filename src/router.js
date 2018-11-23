import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import Post from '@/views/Post.vue';
import PostUser from '@/views/PostUser.vue';
import PetDetail from '@/views/PetDetail.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: 'home',
      component: Home,
    },
    {
      path: '/post',
      name: 'post',
      component: Post,
    },
    {
      path: '/postUser',
      name: 'postUser',
      component: PostUser,
    },
    {
      path: '/pet/:id',
      name: 'petDetail',
      component: PetDetail,
    },
  ],
});

router.beforeResolve((to, from, next) => {
  setTimeout(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }, 100);
  next();
});

export default router;
