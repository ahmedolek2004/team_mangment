<template>
  <nav class="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm font-sans" dir="rtl">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">

        <div class="flex items-center gap-4 lg:gap-8">
          <router-link to="/" class="flex items-center gap-2 group shrink-0">
            <div class="bg-blue-600 p-1.5 rounded-lg text-white shadow-md group-hover:rotate-6 transition-transform">
              <svg class="w-5 h-5 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M10 2a3 3 0 0 0-3 3v1H5a3 3 0 0 0-3 3v2.382l1.447.723.005.003.027.013.12.056c.108.05.272.123.486.212.429.177 1.056.416 1.834.655C7.481 13.524 9.63 14 12 14c2.372 0 4.52-.475 6.08-.956.78-.24 1.406-.478 1.835-.655a14.028 14.028 0 0 0 .606-.268l.027-.013.005-.002L22 11.381V9a3 3 0 0 0-3-3h-2V5a3 3 0 0 0-3-3h-4Zm5 4V5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1h6Zm6.447 7.894.553-.276V19a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-5.382l.553.276.002.002.004.002.013.006.041.02.151.07c.13.06.318.144.557.242.478.198 1.163.46 2.01.72C7.019 15.476 9.37 16 12 16c2.628 0 4.98-.525 6.67-1.044a22.95 22.95 0 0 0 2.01-.72 15.994 15.994 0 0 0 .707-.312l.041-.02.013-.006.004-.002.001-.001-.431-.866.432.865ZM12 10a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z" />
              </svg>
            </div>
            <span class="text-lg lg:text-xl font-bold text-gray-800">Plan B</span>
          </router-link>

          <div class="hidden xl:flex items-center gap-5">
            <router-link v-for="link in links" :key="link.path" :to="link.path"
              class="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm whitespace-nowrap">
              {{ link.name }}
            </router-link>
          </div>
        </div>

        <div class="flex items-center gap-2 lg:gap-4">

          <div v-if="isLoggedIn" class="relative">
            <button @click="isDropdownOpen = !isDropdownOpen"
              class="flex items-center gap-3 bg-gray-50 p-1 pr-3 rounded-full border border-gray-100 hover:bg-gray-100 transition-all shadow-sm">
              <div class="hidden sm:flex flex-col text-right text-[10px] leading-tight font-black">
                <span class="text-gray-800 truncate max-w-[120px]">{{ userName || 'مستخدم' }}</span>
                <span class="text-blue-600 uppercase">{{ userRole }}</span>
              </div>
              <div
                class="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white overflow-hidden">
                {{ userName ? userName.charAt(0).toUpperCase() : 'U' }}
              </div>
            </button>

            <transition name="fade-slide">
              <div v-if="isDropdownOpen"
                class="absolute left-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-50 py-2 z-[100]">
                <router-link to="/profile" @click="isDropdownOpen = false" class="dropdown-item">
                  <span class="ml-2">👤</span> الملف الشخصي
                </router-link>
                <router-link v-if="userRole === 'admin'" to="/admin" @click="isDropdownOpen = false"
                  class="dropdown-item text-blue-600">
                  <span class="ml-2">🛡️</span> لوحة الإدارة
                </router-link>
                <hr class="my-2 border-gray-50">
                <button @click="handleLogout" class="dropdown-item text-red-500 w-full text-right">
                  <span class="ml-2">🚪</span> تسجيل خروج
                </button>
              </div>
            </transition>
          </div>

          <div v-else class="flex items-center gap-2">
            <router-link to="/login"
              class="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-bold transition-colors">دخول</router-link>
            <router-link to="/register"
              class="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-blue-700 transition-all">إنشاء
              حساب</router-link>
          </div>

          <button @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="xl:hidden p-2 rounded-lg bg-gray-50 text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div v-if="isMobileMenuOpen"
      class="xl:hidden bg-white border-b border-gray-100 px-4 py-4 space-y-2 animate-fade-in">
      <router-link v-for="link in links" :key="link.path" :to="link.path" @click="isMobileMenuOpen = false"
        class="block p-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium text-right">
        {{ link.name }}
      </router-link>

      <div v-if="isLoggedIn" class="pt-2 space-y-2 border-t border-gray-50">
        <router-link to="/profile" @click="isMobileMenuOpen = false"
          class="block p-3 text-gray-700 bg-gray-50 rounded-xl font-bold text-right">👤 ملفي الشخصي</router-link>
        <router-link v-if="userRole === 'admin'" to="/admin" @click="isMobileMenuOpen = false"
          class="block p-3 text-blue-600 bg-blue-50 rounded-xl font-bold text-right">🛡️ لوحة الإدارة</router-link>
        <button @click="handleLogout" class="w-full text-right p-3 text-red-600 font-bold border-t border-gray-50">تسجيل
          خروج</button>
      </div>

      <div v-else class="pt-4 border-t border-gray-100 flex flex-col gap-2">
        <router-link to="/login" @click="isMobileMenuOpen = false"
          class="text-center py-3 text-gray-600 font-bold bg-gray-50 rounded-xl">دخول</router-link>
        <router-link to="/register" @click="isMobileMenuOpen = false"
          class="text-center py-3 bg-blue-600 text-white font-bold rounded-xl shadow-md">إنشاء حساب</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { auth, db } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { useRouter } from 'vue-router'

const router = useRouter()
const userName = ref('')
const userRole = ref('')
const isLoggedIn = ref(false)
const isMobileMenuOpen = ref(false)
const isDropdownOpen = ref(false)

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
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true
      // متابعة التحديثات لحظياً
      onSnapshot(doc(db, "users", user.uid), (userDoc) => {
        if (userDoc.exists()) {
          const data = userDoc.data()
          userRole.value = data.role || 'طالب'
          userName.value = data.displayName || 'مستخدم'
        }
      })
    } else {
      isLoggedIn.value = false
      userRole.value = ''
      userName.value = ''
    }
  })

  // إغلاق القائمة عند الضغط في أي مكان خارجها
  window.addEventListener('click', (e) => {
    if (!e.target.closest('.relative')) isDropdownOpen.value = false
  })
})

const handleLogout = async () => {
  if (confirm("هل تريد تسجيل الخروج؟")) {
    await signOut(auth)
    isDropdownOpen.value = false
    isMobileMenuOpen.value = false
    router.push('/login')
  }
}
</script>

<style scoped>
.dropdown-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: #4b5563;
  transition: all 0.2s;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f9fafb;
  color: #2563eb;
  padding-right: 1.25rem;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.2s ease-out;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
