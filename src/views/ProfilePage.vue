<script setup>
import { ref, onMounted } from 'vue'
import { auth, db } from '../firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { updatePassword, updateEmail } from 'firebase/auth'

const user = ref({
  displayName: '',
  email: '',
  phoneNumber: '',
  bio: '',
  role: ''
})

const passwordData = ref({
  newPassword: '',
  confirmPassword: ''
})

const loading = ref(false)
const message = ref({ text: '', type: '' })

// دالة لإظهار الرسائل (حل خطأ showStatus is not defined)
const showStatus = (text, type) => {
  message.value = { text, type }
  setTimeout(() => {
    message.value = { text: '', type: '' }
  }, 3000)
}

onMounted(async () => {
  const currentUser = auth.currentUser
  if (currentUser) {
    const userDoc = await getDoc(doc(db, "users", currentUser.uid))
    if (userDoc.exists()) {
      const data = userDoc.data()
      user.value = {
        displayName: data.displayName || '',
        email: currentUser.email || '',
        phoneNumber: data.phoneNumber || '',
        bio: data.bio || '',
        role: data.role || 'طالب'
      }
    }
  }
})

// تحديث الملف الشخصي (الإيميل والبيانات)
const updateProfile = async () => {
  loading.value = true
  const currentUser = auth.currentUser

  try {
    // تحديث الإيميل في Auth إذا تغير
    if (user.value.email !== currentUser.email) {
      await updateEmail(currentUser, user.value.email)
    }

    // تحديث البيانات في Firestore
    await updateDoc(doc(db, "users", currentUser.uid), {
      displayName: user.value.displayName || '',
      email: user.value.email || '',
      phoneNumber: user.value.phoneNumber || '',
      bio: user.value.bio || ''
    })

    showStatus("تم تحديث البيانات بنجاح ✅", "success")
  } catch (e) {
    console.error(e)
    if (e.code === 'auth/requires-recent-login') {
      showStatus("لتغيير الإيميل، يجب إعادة تسجيل الدخول 🔐", "error")
    } else {
      showStatus("حدث خطأ أثناء التحديث ❌", "error")
    }
  } finally {
    loading.value = false
  }
}

// تحديث كلمة المرور (حل خطأ updatePassword unused)
const changePassword = async () => {
  if (!passwordData.value.newPassword || passwordData.value.newPassword !== passwordData.value.confirmPassword) {
    return showStatus("كلمات المرور غير متطابقة", "error")
  }

  loading.value = true
  try {
    await updatePassword(auth.currentUser, passwordData.value.newPassword)
    showStatus("تم تحديث كلمة المرور بنجاح ✅", "success")
    passwordData.value = { newPassword: '', confirmPassword: '' }
  } catch (e) {
    console.error(e)
    if (e.code === 'auth/requires-recent-login') {
      showStatus("يجب إعادة تسجيل الدخول لتغيير كلمة المرور", "error")
    } else {
      showStatus("خطأ في تحديث كلمة المرور", "error")
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-6 pb-10 text-right px-4 md:px-0" dir="rtl">
    <header class="mb-8">
      <h1 class="text-3xl font-black text-gray-800">إعدادات الحساب</h1>
      <p class="text-gray-500 text-sm">تعديل بياناتك وكلمة المرور</p>
    </header>

    <transition name="fade">
      <div v-if="message.text"
           :class="message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
           class="p-4 rounded-2xl font-bold shadow-sm transition-all">
        {{ message.text }}
      </div>
    </transition>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <section class="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
          <form @submit.prevent="updateProfile" class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div class="sm:col-span-2 space-y-2">
              <label class="text-xs font-black text-gray-400 uppercase">الاسم بالكامل</label>
              <input v-model="user.displayName" type="text" class="custom-input">
            </div>
            <div class="space-y-2">
              <label class="text-xs font-black text-gray-400 uppercase">البريد الإلكتروني</label>
              <input v-model="user.email" type="email" class="custom-input">
            </div>
            <div class="space-y-2">
              <label class="text-xs font-black text-gray-400 uppercase">رقم الهاتف</label>
              <input v-model="user.phoneNumber" type="text" class="custom-input">
            </div>
            <div class="sm:col-span-2 space-y-2">
              <label class="text-xs font-black text-gray-400 uppercase">النبذة الشخصية</label>
              <textarea v-model="user.bio" rows="3" class="custom-input resize-none"></textarea>
            </div>
            <button :disabled="loading" class="sm:col-span-2 bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-blue-700 shadow-lg shadow-blue-100 disabled:opacity-50">
              {{ loading ? 'جاري الحفظ...' : 'حفظ التغييرات' }}
            </button>
          </form>
        </section>

        <section class="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 class="text-lg font-bold mb-4">أمان الحساب</h2>
          <form @submit.prevent="changePassword" class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input v-model="passwordData.newPassword" type="password" class="custom-input" placeholder="كلمة المرور الجديدة">
            <input v-model="passwordData.confirmPassword" type="password" class="custom-input" placeholder="تأكيد الكلمة">
            <button :disabled="loading" class="sm:col-span-2 bg-gray-900 text-white py-4 rounded-2xl font-black hover:bg-black">
              تحديث كلمة المرور
            </button>
          </form>
        </section>
      </div>

      <div class="lg:col-span-1">
        <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center sticky top-24">
          <div class="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl text-white font-black">
            {{ user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U' }}
          </div>
          <h3 class="font-black text-gray-800">{{ user.displayName }}</h3>
          <p class="text-blue-600 text-xs font-bold uppercase">{{ user.role }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-input {
  width: 100%;
  padding: 0.875rem 1.25rem;
  background-color: #f8fafc;
  border: 1px solid #f1f5f9;
  border-radius: 1rem;
  outline: none;
  font-weight: 700;
  font-size: 0.875rem;
}
.custom-input:focus {
  border-color: #3b82f6;
  background-color: white;
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
