<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
    <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
      <h2 class="text-center text-3xl font-bold text-gray-900">إنشاء طلب انضمام</h2>

      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="space-y-4">
          <input v-model="email" type="email" required placeholder="البريد الإلكتروني" class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
          <input v-model="password" type="password" required placeholder="كلمة المرور" class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500">
        </div>
        <button type="submit" :disabled="loading" class="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-400">
          {{ loading ? 'جاري إرسال الطلب...' : 'تسجيل حساب جديد' }}
        </button>
      </form>

      <div class="text-center mt-4">
        <router-link to="/login" class="text-blue-600 hover:underline">لديك حساب بالفعل؟ سجل دخولك</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const loading = ref(false)
const router = useRouter()

const handleRegister = async () => {
  loading.value = true
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user

    // تخزين الحالة "غير مقبول"
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      isApproved: false,
      role: 'member',
      createdAt: new Date()
    })

    await signOut(auth) // نطرده فوراً عشان ميدخلش الـ Dashboard
    alert("تم التسجيل! انتظر موافقة الإدارة لتتمكن من الدخول.")
    router.push('/login')
  } catch (error) {
    alert("خطأ: " + error.message)
  } finally { loading.value = false }
}
</script>
