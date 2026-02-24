<template>
  <nav class="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm font-sans" dir="rtl">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">

        <div class="flex items-center gap-4 lg:gap-8">
          <router-link to="/" class="flex items-center gap-2 group shrink-0">
            <div class="bg-blue-600 p-1.5 rounded-lg text-white shadow-md group-hover:rotate-6 transition-transform">
              <svg class="w-5 h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 2a3 3 0 0 0-3 3v1H5a3 3 0 0 0-3 3v2.382l1.447.723.005.003.027.013.12.056c.108.05.272.123.486.212.429.177 1.056.416 1.834.655C7.481 13.524 9.63 14 12 14c2.372 0 4.52-.475 6.08-.956.78-.24 1.406-.478 1.835-.655a14.028 14.028 0 0 0 .606-.268l.027-.013.005-.002L22 11.381V9a3 3 0 0 0-3-3h-2V5a3 3 0 0 0-3-3h-4Zm5 4V5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1h6Zm6.447 7.894.553-.276V19a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-5.382l.553.276.002.002.004.002.013.006.041.02.151.07c.13.06.318.144.557.242.478.198 1.163.46 2.01.72C7.019 15.476 9.37 16 12 16c2.628 0 4.98-.525 6.67-1.044a22.95 22.95 0 0 0 2.01-.72 15.994 15.994 0 0 0 .707-.312l.041-.02.013-.006.004-.002.001-.001-.431-.866.432.865ZM12 10a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z"/>
              </svg>
            </div>
            <span class="text-lg lg:text-xl font-bold text-gray-800">Plan B</span>
          </router-link>

          <div class="hidden xl:flex items-center gap-5">
            <router-link to="/" class="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm whitespace-nowrap">الرئيسية</router-link>
            <router-link to="/services" class="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm whitespace-nowrap">خدماتنا</router-link>
            <router-link to="/projects" class="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm whitespace-nowrap">عن المشروع</router-link>
            <router-link to="/about" class="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm whitespace-nowrap">من نحن</router-link>
            <router-link to="/contact" class="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm whitespace-nowrap">تواصل معنا</router-link>
            <router-link to="/tasks" class="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm whitespace-nowrap">المهام</router-link>
            <router-link to="/join" class="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm whitespace-nowrap">الانضمام</router-link>
            <router-link v-if="userRole === 'admin'" to="/dashboard" class="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-bold">لوحة الإدارة</router-link>
          </div>
        </div>

        <div class="flex items-center gap-2 lg:gap-4">
          <div v-if="isLoggedIn" class="hidden sm:flex items-center gap-3 bg-gray-50 p-1.5 pr-4 rounded-full border border-gray-100">
            <div class="flex flex-col text-left text-[10px] leading-tight font-bold">
              <span class="text-gray-800 truncate max-w-[100px]">{{ userEmail }}</span>
              <span class="text-blue-600 uppercase">{{ userRole }}</span>
            </div>
            <button @click="handleLogout" class="bg-white p-2 rounded-full text-red-500 hover:bg-red-50 shadow-sm transition-all">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            </button>
          </div>

          <div v-else class="flex items-center gap-2">
            <router-link to="/login" class="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-bold transition-colors">
              دخول
            </router-link>
            <router-link to="/register" class="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-blue-700 transition-all">
              إنشاء حساب
            </router-link>
          </div>

          <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="xl:hidden p-2 rounded-lg bg-gray-50 text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div v-if="isMobileMenuOpen" class="xl:hidden bg-white border-b border-gray-100 px-4 py-4 space-y-2">
      <router-link v-for="link in links" :key="link.path" :to="link.path" @click="isMobileMenuOpen = false" class="block p-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium">
        {{ link.name }}
      </router-link>

      <div v-if="!isLoggedIn" class="pt-4 border-t border-gray-100 flex flex-col gap-2">
        <router-link to="/login" @click="isMobileMenuOpen = false" class="text-center py-3 text-gray-600 font-bold bg-gray-50 rounded-xl">دخول</router-link>
        <router-link to="/register" @click="isMobileMenuOpen = false" class="text-center py-3 bg-blue-600 text-white font-bold rounded-xl shadow-md">إنشاء حساب</router-link>
      </div>

      <div v-if="isLoggedIn" @click="handleLogout" class="block p-3 text-red-600 font-bold cursor-pointer border-t border-gray-100 mt-2">تسجيل خروج</div>
    </div>
  </nav>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { auth, db } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'vue-router'

const router = useRouter()
const userEmail = ref('')
const userRole = ref('')
const isLoggedIn = ref(false)
const isMobileMenuOpen = ref(false)

const links = [
  { name: 'الرئيسية', path: '/' },
  { name: 'خدماتنا', path: '/services' },
  { name: 'عن المشروع', path: '/projects' },
  { name: 'من نحن', path: '/about' },
  { name: 'تواصل معنا', path: '/contact' },
  { name: 'المهام', path: '/tasks' },
  { name: 'الانضمام', path: '/join' }
]
onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      isLoggedIn.value = true
      userEmail.value = user.email
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid))
        if (userDoc.exists()) userRole.value = userDoc.data().role
      } catch (e) { console.error(e) }
    } else {
      isLoggedIn.value = false
    }
  })
})

const handleLogout = async () => {
  if(confirm("خروج؟")) {
    await signOut(auth)
    router.push('/login')
  }
}
</script>

<style scoped>
/* لا يوجد @apply هنا، لذا لن يظهر أي خطأ في VS Code */
</style>
