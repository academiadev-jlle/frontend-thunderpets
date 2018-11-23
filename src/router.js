import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import Post from '@/views/Post.vue';
import PostUser from '@/views/PostUser.vue';
import User from '@/views/User.vue';

Vue.use(Router);

export default new Router({
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
      path: '/user',
      name: 'User',
      component: User,
    },
  ],
});
