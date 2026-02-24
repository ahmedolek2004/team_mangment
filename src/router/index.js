import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: () => import('../views/HomePage.vue') },
    { path: '/join', component: () => import('../views/JoinForm.vue') },
    { path: '/login', component: () => import('../auth/AuthLogin.vue') },
    { path: '/register', component: () => import('../auth/AuthRegister.vue') },
    { path: '/services', component: () => import('../views/ServicesPage.vue') },
    { path: '/about', component: () => import('../views/AboutPage.vue') },
    { path: '/contact', component: () => import('../views/ContactPage.vue') },
    {
      path: '/projects',
      component: () => import('../views/ProjectsPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/tasks',
      component: () => import('../views/TasksPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/addtasks',
      component: () => import('../views/AddTaskPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboard',
      component: () => import('../views/DashboardPage.vue'),
      meta: { requiresAuth: true }
    },
  ],
})

export default router
