<script setup>
import { ref, onMounted } from 'vue'
import { db } from '../../firebase'
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'

const students = ref([])
const task = ref({ title: '', subject: 'برمجة', studentId: '', dueDate: '', completed: false })
const loading = ref(false)

onMounted(async () => {
  const snap = await getDocs(collection(db, "users"))
  students.value = snap.docs.map(d => ({ id: d.id, email: d.data().email }))
})

const submitTask = async () => {
  loading.value = true
  try {
    await addDoc(collection(db, "tasks"), { ...task.value, createdAt: serverTimestamp() })
    alert("تمت الإضافة!")
    task.value = { title: '', subject: 'برمجة', studentId: '', dueDate: '', completed: false }
  } finally { loading.value = false }
}
</script>

<template>
  <div class="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-sm border text-right">
    <h2 class="text-xl font-black mb-6">➕ إضافة مهمة جديدة</h2>
    <form @submit.prevent="submitTask" class="space-y-4">
      <input v-model="task.title" placeholder="عنوان المهمة" class="w-full p-4 bg-gray-50 rounded-xl outline-none border" required />
      <select v-model="task.studentId" class="w-full p-4 bg-gray-50 rounded-xl outline-none border" required>
        <option value="" disabled>اختر الطالب</option>
        <option v-for="s in students" :key="s.id" :value="s.id">{{ s.email }}</option>
        <option value="all">كل الطلاب</option>
      </select>
      <input v-model="task.dueDate" type="date" class="w-full p-4 bg-gray-50 rounded-xl outline-none border" required />
      <input v-model="task.description" placeholder="وصف المهمة" class="w-full p-4 bg-gray-50 rounded-xl outline-none border" required />

      <button :disabled="loading" class="w-full py-4 bg-blue-600 text-white rounded-xl font-bold">
        {{ loading ? 'جاري الحفظ...' : 'نشر المهمة 🚀' }}
      </button>
    </form>
  </div>
</template>
