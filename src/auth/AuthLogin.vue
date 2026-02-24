<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4">
    <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
      <h2 class="text-center text-3xl font-bold text-gray-900">تسجيل الدخول</h2>

      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="space-y-4">
          <input v-model="email" type="email" required placeholder="البريد الإلكتروني"
            class="w-full px-4 py-3 border rounded-lg">
          <input v-model="password" type="password" required placeholder="كلمة المرور"
            class="w-full px-4 py-3 border rounded-lg">
        </div>
        <button type="submit" :disabled="loading"
          class="w-full py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 disabled:bg-gray-400">
          {{ loading ? 'جاري التحقق...' : 'دخول' }}
        </button>
      </form>

      <div class="text-center mt-4">
        <router-link to="/register" class="text-blue-600 hover:underline">ليس لديك حساب؟ قدم طلب انضمام</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { auth, db } from '../firebase'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const loading = ref(false)
const router = useRouter()

const handleLogin = async () => {
  loading.value = true
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user

    // فحص هل الأدمن قبله؟
    const userDoc = await getDoc(doc(db, "users", user.uid))

    if (userDoc.exists() && userDoc.data().isApproved === true) {
      router.push('/')
    } else {
      await signOut(auth) // اطرده لو لسه مقبولش
      alert("عذراً، حسابك لا يزال قيد المراجعة.")
    }
  } catch (error) {
    alert("بيانات الدخول غير صحيحة")
  } finally { loading.value = false }
}
</script>
