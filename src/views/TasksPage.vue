<template>
  <div class="min-h-screen bg-gray-50 py-10 px-4 font-sans" dir="rtl">
    <div class="max-w-6xl mx-auto">
      <header class="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 class="text-3xl font-black text-gray-900">لوحة المهام الدراسية 📝</h1>
          <p class="text-gray-500 mt-2">تابع تقدمك وأنجز مهامك الأكاديمية أولاً بأول.</p>
        </div>

        <div class="flex gap-4">
          <div class="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 text-center">
            <p class="text-xs text-gray-400 font-bold mb-1">المتبقي</p>
            <p class="text-xl font-black text-blue-600">{{ pendingTasks.length }}</p>
          </div>
          <div class="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 text-center">
            <p class="text-xs text-gray-400 font-bold mb-1">المكتمل</p>
            <p class="text-xl font-black text-green-500">{{ completedTasks.length }}</p>
          </div>
        </div>
      </header>

      <div class="grid grid-cols-1 gap-4">
        <div v-for="task in tasks" :key="task.id"
          class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 hover:shadow-md transition-shadow">

          <div class="flex items-center gap-5 w-full">
            <button @click="toggleTaskStatus(task)"
              :class="task.completed ? 'bg-green-500 text-white' : 'bg-gray-100 text-transparent border-2 border-gray-200'"
              class="w-8 h-8 rounded-full flex items-center justify-center transition-all shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
            </button>

            <div class="overflow-hidden">
              <h3 :class="{'line-through text-gray-400': task.completed}" class="text-lg font-bold text-gray-800 truncate transition-all">
                {{ task.title }}
              </h3>
              <div class="flex items-center gap-3 mt-1">
                <span class="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-600">{{ task.subject }}</span>
                <span class="text-xs text-gray-400">📅 موعد التسليم: {{ task.dueDate }}</span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <span :class="priorityClass(task.priority)" class="px-4 py-1.5 rounded-xl text-xs font-black shadow-sm">
              {{ task.priority }}
            </span>
            <button v-if="userRole === 'admin'" @click="deleteTask(task.id)" class="text-red-400 hover:text-red-600 p-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>
            </button>
          </div>
        </div>

        <div v-if="tasks.length === 0" class="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
          <p class="text-gray-400 font-bold">رائع! لا توجد مهام معلقة حالياً ☕</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { db, auth } from '../firebase'
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc, orderBy } from 'firebase/firestore'

const tasks = ref([])
const userRole = ref('student') // سنعرفه من Firestore

onMounted(() => {
  // جلب المهام من Firestore
  const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"))
  onSnapshot(q, (snapshot) => {
    tasks.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
})

const pendingTasks = computed(() => tasks.value.filter(t => !t.completed))
const completedTasks = computed(() => tasks.value.filter(t => t.completed))

const toggleTaskStatus = async (task) => {
  try {
    await updateDoc(doc(db, "tasks", task.id), {
      completed: !task.completed
    })
  } catch (e) { console.error("Update failed", e) }
}

const deleteTask = async (id) => {
  if(confirm("هل تريد حذف هذه المهمة؟")) {
    await deleteDoc(doc(db, "tasks", id))
  }
}

const priorityClass = (p) => {
  if (p === 'عالية') return 'bg-red-100 text-red-600'
  if (p === 'متوسطة') return 'bg-yellow-100 text-yellow-600'
  return 'bg-green-100 text-green-600'
}
</script>
