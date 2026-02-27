<template>
  <div class="flex h-screen bg-gray-100 font-sans text-right" dir="rtl">

    <div v-if="isSidebarOpen" @click="isSidebarOpen = false"
      class="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"></div>

    <aside :class="[
      isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0',
      'fixed lg:static inset-y-0 right-0 z-50 w-72 bg-white border-l shadow-xl flex flex-col transition-transform duration-300 ease-in-out'
    ]">
      <div class="p-8 border-b flex justify-between items-center bg-white sticky top-0">
        <div class="flex items-center gap-3">
          <div class="bg-blue-600 p-2 rounded-xl shadow-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 class="text-xl font-black text-gray-800 tracking-tight">Plan B Admin</h2>
        </div>
        <button @click="isSidebarOpen = false" class="lg:hidden text-gray-400 hover:text-red-500 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M6 18L18 6M6 6l12 12" stroke-width="2" />
          </svg>
        </button>
      </div>

      <nav class="flex-1 p-4 space-y-2 mt-4 overflow-y-auto custom-scrollbar">
        <router-link v-for="item in menuItems" :key="item.path" :to="item.path" @click="closeOnMobile"
          class="nav-item group" active-class="active-item">
          <span class="text-xl ml-3 group-hover:scale-110 transition-transform">{{ item.icon }}</span>
          <span class="font-bold">{{ item.name }}</span>
        </router-link>
      </nav>

      <div class="p-4 border-t bg-gray-50/50">
        <div class="flex items-center gap-3 p-3 mb-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">A
          </div>
          <div class="flex flex-col text-[10px] leading-tight overflow-hidden">
            <span class="text-gray-900 font-bold truncate">مدير النظام</span>
            <span class="text-blue-500 font-medium">admin@admin.com</span>
          </div>
        </div>
        <button @click="handleLogout" class="logout-btn">
          تسجيل خروج
        </button>
      </div>
    </aside>

    <div class="flex-1 flex flex-col min-w-0">
      <header class="bg-white border-b p-4 flex items-center justify-between lg:hidden shadow-sm sticky top-0 z-30">
        <button @click="isSidebarOpen = true"
          class="p-2 text-gray-600 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16m-7 6h7" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
        <h2 class="text-lg font-black text-blue-600">لوحة التحكم</h2>
        <div class="w-10"></div>
      </header>

      <main class="flex-1 p-4 md:p-8 lg:p-10 overflow-y-auto bg-gray-100/30">
        <div class="max-w-6xl mx-auto animate-fade-in">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const isSidebarOpen = ref(false)

const menuItems = [
  { name: 'الإحصائيات', path: '/admin/stats', icon: '📊' },
  { name: 'إدارة المستخدمين', path: '/admin/users', icon: '👥' },
  { name: 'طلبات الانضمام', path: '/admin/applications', icon: '📩' },
  { name: 'إدارة المهام', path: '/admin/tasks', icon: '📋' },
  { name: 'إضافة مهمة جديدة', path: '/admin/add-task', icon: '➕' },
]

const closeOnMobile = () => {
  if (window.innerWidth < 1024) isSidebarOpen.value = false
}

const handleLogout = async () => {
  if (confirm("هل أنت متأكد من تسجيل الخروج؟")) {
    await signOut(auth)
    router.push('/login')
  }
}
</script>

<style scoped>
.nav-item {
  display: flex;
  align-items: center;
  padding: 0.875rem 1.25rem;
  border-radius: 1.25rem;
  color: #64748b;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-item:hover {
  background-color: #f8fafc;
  color: #2563eb;
}

.active-item {
  background-color: #2563eb !important;
  color: white !important;
  box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.25);
}

.logout-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #fef2f2;
  color: #dc2626;
  border-radius: 1rem;
  font-weight: 800;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.logout-btn:hover {
  background-color: #fee2e2;
  transform: translateY(-1px);
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
</style>
