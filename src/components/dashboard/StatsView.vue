<script setup>
import { ref, onMounted } from 'vue'
import { db } from '../../firebase'
import { collection, onSnapshot } from 'firebase/firestore'

const usersCount = ref(0)
const pendingCount = ref(0)
const appsCount = ref(0)
const tasksCount = ref(0)

onMounted(() => {
  // جلب عدد المستخدمين
  onSnapshot(collection(db, "users"), (snap) => {
    usersCount.value = snap.size
    pendingCount.value = snap.docs.filter(d => !d.data().isApproved).length
  })
  // جلب عدد طلبات الانضمام
  onSnapshot(collection(db, "applications"), (snap) => {
    appsCount.value = snap.size
  })
  // جلب عدد المهام
  onSnapshot(collection(db, "tasks"), (snap) => {
    tasksCount.value = snap.size
  })
})
</script>

<template>
  <div class="animate-fade-in text-right" dir="rtl">
    <h1 class="text-2xl font-bold text-gray-800 mb-8">الإحصائيات العامة</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white p-6 rounded-2xl shadow-sm border-r-4 border-blue-600">
        <p class="text-gray-500 text-sm font-bold">إجمالي المسجلين</p>
        <p class="text-4xl font-black mt-2">{{ usersCount }}</p>
      </div>
      <div class="bg-white p-6 rounded-2xl shadow-sm border-r-4 border-yellow-500">
        <p class="text-gray-500 text-sm font-bold">في انتظار الموافقة</p>
        <p class="text-4xl font-black mt-2">{{ pendingCount }}</p>
      </div>
      <div class="bg-white p-6 rounded-2xl shadow-sm border-r-4 border-green-500">
        <p class="text-gray-500 text-sm font-bold">طلبات الانضمام</p>
        <p class="text-4xl font-black mt-2">{{ appsCount }}</p>
      </div>
      <div class="bg-white p-6 rounded-2xl shadow-sm border-r-4 border-purple-600">
        <p class="text-gray-500 text-sm font-bold">المهام الموكلة</p>
        <p class="text-4xl font-black mt-2">{{ tasksCount }}</p>
      </div>
    </div>
  </div>
</template>
