import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/authors',
      name: 'authors',
      component: () => import('../views/Authors.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('../views/SignUp.vue')
    },
    {
      path: '/create-post',
      name: 'create-post',
      component: () => import('../views/CreatePost.vue')
    },
    {
      path: '/categories/adventure',
      name: 'adventure',
      component: () => import('../views/AdventurePosts.vue')
    },
    {
      path: '/categories/business',
      name: 'business',
      component: () => import('../views/BusinessPosts.vue')
    },
    {
      path: '/:id/view-author',
      name: 'view-author',
      component: () => import('../views/ViewAuthor.vue')
    },
  ]
})

export default router
