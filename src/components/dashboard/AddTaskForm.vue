<script setup>
import { ref, onMounted } from 'vue'
import { db } from '../../firebase'
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'

const students = ref([])
const task = ref({
  title: '',
  description: '',
  studentId: '', // ID الطالب أو "all"
  dueDate: '',
  priority: 'عادية',
  commMethod: 'واتساب',
  status: 'pending', // (pending, working, review, completed)
  completed: false
})
const loading = ref(false)

onMounted(async () => {
  const snap = await getDocs(collection(db, "users"))
  students.value = snap.docs.map(d => ({ id: d.id, displayName: d.data().displayName || d.data().email }))
})

const submitTask = async () => {
  loading.value = true
  try {
    await addDoc(collection(db, "tasks"), { ...task.value, createdAt: serverTimestamp() })
    alert("🚀 تم نشر المهمة بنجاح!")
    task.value = { title: '', description: '', studentId: '', dueDate: '', priority: 'عادية', commMethod: 'واتساب', status: 'pending', completed: false }
  } finally { loading.value = false }
}
</script>

<template>
  <div class="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-sm border text-right font-sans" dir="rtl">
    <h2 class="text-xl font-black mb-6 flex items-center gap-2">
      <span class="bg-blue-600 p-1.5 rounded-lg text-white">➕</span> إضافة مهمة جديدة
    </h2>
    <form @submit.prevent="submitTask" class="space-y-4">
      <input v-model="task.title" placeholder="عنوان المهمة" class="custom-input" required />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select v-model="task.studentId" class="custom-input" required>
          <option value="" disabled>اختر الشخص المكلف</option>
          <option value="all">📢 إرسال للجميع</option>
          <option v-for="s in students" :key="s.id" :value="s.id">{{ s.displayName }}</option>
        </select>

        <select v-model="task.commMethod" class="custom-input">
          <option>واتساب</option>
          <option>اجتماع زووم</option>
          <option>اتصال هاتفي</option>
          <option>داخل المكتب</option>
        </select>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input v-model="task.dueDate" type="date" class="custom-input" required />
        <select v-model="task.priority" class="custom-input">
          <option>عادية</option>
          <option>متوسطة</option>
          <option>عالية</option>
        </select>
      </div>

      <textarea v-model="task.description" placeholder="وصف المهمة وطريقة التنفيذ..." class="custom-input h-32 pt-3" required></textarea>

      <button :disabled="loading" class="w-full py-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-95">
        {{ loading ? 'جاري الحفظ...' : 'نشر المهمة للمكلفين 🚀' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
/* استبدل الـ @apply بـ CSS عادي لتجنب التنبيه */
.custom-input {
  width: 100%;
  padding: 1rem;
  background-color: #f9fafb; /* bg-gray-50 */
  border: 1px solid #f3f4f6; /* border-gray-100 */
  border-radius: 0.75rem;     /* rounded-xl */
  outline: none;
  transition: all 0.2s;
  font-size: 0.875rem;        /* text-sm */
  font-weight: 700;           /* font-bold */
}

.custom-input:focus {
  border-color: #60a5fa;     /* focus:border-blue-400 */
  background-color: white;    /* focus:bg-white */
}
</style>
