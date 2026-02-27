import { createRouter, createWebHistory } from 'vue-router'
import { auth, db } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

// دالة مساعدة للتأكد من حالة تسجيل الدخول والصلاحيات
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      auth,
      (user) => {
        removeListener()
        resolve(user)
      },
      reject,
    )
  })
}

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
    { path: '/profile', component: () => import('../views/ProfilePage.vue'), meta: { requiresAuth: true } },
    {
      path: '/projects',
      component: () => import('../views/ProjectsPage.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/tasks',
      component: () => import('../views/TasksPage.vue'),
      meta: { requiresAuth: true },
    },

    // لوحة الإدارة مع حماية الصلاحيات
    {
      path: '/admin',
      component: () => import('../views/AdminDashboard.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }, // حماية مزدوجة
      children: [
        { path: '', redirect: '/admin/stats' }, // تأكد من المسار الكامل في الـ redirect
        { path: 'stats', component: () => import('../components/dashboard/StatsView.vue') },
        { path: 'users', component: () => import('../components/dashboard/UsersTable.vue') },
        {
          path: 'applications',
          component: () => import('../components/dashboard/ApplicationsTable.vue'),
        },
        { path: 'add-task', component: () => import('../components/dashboard/AddTaskForm.vue') },
        { path: 'tasks', component: () => import('../components/dashboard/TasksTable.vue') },
      ],
    },
  ],
})

// --- الـ Navigation Guard (هذا هو الجزء المفقود) ---
router.beforeEach(async (to, from, next) => {
  const user = await getCurrentUser()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin)

  if (requiresAuth && !user) {
    // لو الصفحة محتاجة تسجيل دخول وأنت مش مسجل، روح للـ login
    next('/login')
  } else if (requiresAdmin) {
    // لو الصفحة محتاجة أدمن، نتحقق من الـ role في Firestore
    if (user) {
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      if (userDoc.exists() && userDoc.data().role === 'admin') {
        next() // أدمن فعلاً، ادخل
      } else {
        alert('عذراً، هذه المنطقة للمديرين فقط.')
        next('/') // مش أدمن، ارجع للرئيسية
      }
    } else {
      next('/login')
    }
  } else {
    next() // صفحة عادية، كمل طريقك
  }
})

export default router
