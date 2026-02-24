<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4">
    <div class="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div class="bg-blue-600 p-6 text-white text-center">
        <h1 class="text-2xl font-bold">Plan Bنموذج الانضمام لفريق </h1>
        <p class="opacity-90">سجل بياناتك للانضمام للمشروع</p>
      </div>

      <form @submit.prevent="handleSubmit" class="p-8 space-y-6">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">الاسم بالكامل</label>
          <input v-model="form.name" type="text" required class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition">
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">الرقم الجامعي</label>
          <input v-model="form.studentId" type="text" required class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
        </div>



        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">المهارات (Frontend, Python, etc.)</label>
          <textarea v-model="form.skills" rows="3" class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
        </div>

        <button type="submit" :disabled="loading" class="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400">
          {{ loading ? 'جاري الإرسال...' : 'إرسال الطلب' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { db } from '../firebase' // تأكد من المسار الصحيح لملف firebase.js
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const form = ref({
  name: '',
  studentId: '',
  skills: ''
})

const loading = ref(false)

const handleSubmit = async () => {
  // التأكد من إدخال البيانات الأساسية
  if (!form.value.name || !form.value.studentId) {
    alert("برجاء إدخال الاسم والرقم الجامعي")
    return
  }

  loading.value = true

  try {
    // إرسال البيانات لمجموعة (Collection) اسمها 'applications'
    await addDoc(collection(db, "applications"), {
      studentName: form.value.name,
      universityId: form.value.studentId,
      skills: form.value.skills,
      status: 'pending', // حالة أولية للطلب
      createdAt: serverTimestamp() // وقت التقديم الفعلي
    })

    alert("🎉 تم إرسال طلبك بنجاح يا بطل!")

    // تصفير الفورم بعد النجاح
    form.value = {
      name: '',
      studentId: '',
      skills: ''
    }
  } catch (error) {
    console.error("Firebase Error: ", error)
    alert("حدث خطأ أثناء الإرسال، تأكد من إعدادات Firestore Rules")
  } finally {
    loading.value = false
  }
}
</script>
