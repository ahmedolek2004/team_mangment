<template>
  <div v-if="loading" class="h-screen flex flex-col items-center justify-center bg-gray-50 font-sans" dir="rtl">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
    <p class="text-gray-600 font-bold">جاري التحقق من الصلاحيات...</p>
  </div>

  <div v-else-if="isAdmin" class="flex h-screen bg-gray-100 font-sans" dir="rtl">

    <aside class="w-64 bg-white border-l border-gray-200 flex flex-col shadow-lg shrink-0">
      <div class="p-6 flex items-center gap-3 border-b border-gray-50">
        <div class="bg-blue-600 p-2 rounded-lg text-white shadow-md">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M10 2a3 3 0 0 0-3 3v1H5a3 3 0 0 0-3 3v2.382l1.447.723.005.003.027.013.12.056c.108.05.272.123.486.212.429.177 1.056.416 1.834.655C7.481 13.524 9.63 14 12 14c2.372 0 4.52-.475 6.08-.956.78-.24 1.406-.478 1.835-.655a14.028 14.028 0 0 0 .606-.268l.027-.013.005-.002L22 11.381V9a3 3 0 0 0-3-3h-2V5a3 3 0 0 0-3-3h-4Zm5 4V5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1h6Zm6.447 7.894.553-.276V19a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-5.382l.553.276.002.002.004.002.013.006.041.02.151.07c.13.06.318.144.557.242.478.198 1.163.46 2.01.72C7.019 15.476 9.37 16 12 16c2.628 0 4.98-.525 6.67-1.044a22.95 22.95 0 0 0 2.01-.72 15.994 15.994 0 0 0 .707-.312l.041-.02.013-.006.004-.002.001-.001-.431-.866.432.865ZM12 10a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z" />
          </svg>
        </div>
        <span class="text-xl font-bold text-gray-800">Plan B Admin</span>
      </div>

      <nav class="flex-1 p-4 space-y-2 mt-4">
        <button @click="activeTab = 'stats'" :class="navItemClass(activeTab === 'stats')">
          <span class="ml-2 text-lg">📊</span> الإحصائيات
        </button>

        <button @click="activeTab = 'users'" :class="navItemClass(activeTab === 'users')">
          <span class="ml-2 text-lg">👥</span> إدارة المستخدمين
        </button>

        <button @click="activeTab = 'applications'" :class="navItemClass(activeTab === 'applications')">
          <span class="ml-2 text-lg">📩</span> طلبات الانضمام
          <span v-if="applications.length > 0"
            class="mr-auto bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">
            {{ applications.length }}
          </span>
        </button>

        <button @click="activeTab = 'add-task'" :class="navItemClass(activeTab === 'add-task')">
          <span class="ml-2 text-lg">➕</span> إضافة مهمة
        </button>
      </nav>

      <div class="p-4 border-t border-gray-100 bg-gray-50">
        <div class="flex items-center gap-3 mb-4 text-right text-xs">
          <div
            class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200 shadow-sm">
            {{ userEmail ? userEmail.charAt(0).toUpperCase() : '?' }}
          </div>
          <div class="flex flex-col overflow-hidden text-right">
            <p class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">مدير النظام</p>
            <p class="font-bold text-gray-700 truncate w-32" :title="userEmail">{{ userEmail }}</p>
          </div>
        </div>
        <button @click="handleLogout"
          class="w-full py-2 bg-red-50 text-red-600 rounded-lg text-sm font-bold hover:bg-red-100 transition border border-red-100 shadow-sm">
          تسجيل خروج
        </button>
      </div>
    </aside>

    <main class="flex-1 p-8 overflow-y-auto">

      <div v-if="activeTab === 'stats'" class="animate-fade-in">
        <header class="mb-8 text-right">
          <h1 class="text-2xl font-bold text-gray-800">الإحصائيات العامة</h1>
        </header>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-right font-bold">
          <div class="bg-white p-6 rounded-2xl shadow-sm border-r-4 border-r-blue-600">
            <h3 class="text-gray-500 mb-2 text-sm">إجمالي المسجلين</h3>
            <p class="text-4xl text-gray-800">{{ users.length }}</p>
          </div>
          <div class="bg-white p-6 rounded-2xl shadow-sm border-r-4 border-r-yellow-500">
            <h3 class="text-gray-500 mb-2 text-sm">في انتظار الموافقة</h3>
            <p class="text-4xl text-gray-800">{{ pendingUsersCount }}</p>
          </div>
          <div class="bg-white p-6 rounded-2xl shadow-sm border-r-4 border-r-green-500">
            <h3 class="text-gray-500 mb-2 text-sm">طلبات الانضمام الجديدة</h3>
            <p class="text-4xl text-gray-800">{{ applications.length }}</p>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'users'" class="animate-fade-in text-right">
        <header class="mb-8">
          <h1 class="text-2xl font-bold text-gray-800">إدارة المستخدمين</h1>
        </header>
        <div class="bg-white rounded-2xl shadow-md overflow-hidden">
          <table class="w-full text-right text-sm">
            <thead class="bg-gray-50 text-gray-700">
              <tr>
                <th class="p-4">المستخدم</th>
                <th class="p-4 text-center">الحالة</th>
                <th class="p-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id" class="border-t border-gray-50 hover:bg-gray-50">
                <td class="p-4 font-bold">{{ user.email }}</td>
                <td class="p-4 text-center">
                  <span :class="user.isApproved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'"
                    class="px-3 py-1 rounded-full text-[10px] font-bold">
                    {{ user.isApproved ? 'مفعل' : 'معلق' }}
                  </span>
                </td>
                <td class="p-4 text-center flex justify-center gap-2">
                  <button v-if="!user.isApproved" @click="approveUser(user.id)"
                    class="bg-green-600 text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-green-700 transition">تفعيل</button>
                  <button @click="deleteUser(user.id)"
                    class="text-red-600 text-xs font-bold px-3 py-1 hover:bg-red-50 rounded-lg">حذف</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="activeTab === 'applications'" class="animate-fade-in text-right">
        <header class="mb-8">
          <h1 class="text-2xl font-bold text-gray-800">طلبات الانضمام</h1>
          <p class="text-gray-500 text-sm">الطلاب المهتمين بالانضمام للمشروع</p>
        </header>
        <div class="bg-white rounded-2xl shadow-md overflow-hidden">
          <table class="w-full text-right text-sm">
            <thead class="bg-gray-50 text-gray-700 font-bold">
              <tr>
                <th class="p-4">اسم الطالب</th>
                <th class="p-4 text-center">الرقم الجامعي</th>
                <th class="p-4">المهارات</th>
                <th class="p-4 text-center">التاريخ</th>
                <th class="p-4 text-center">إجراء</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="app in applications" :key="app.id" class="border-t border-gray-50 hover:bg-gray-50 transition">
                <td class="p-4 font-bold text-blue-600">{{ app.studentName }}</td>
                <td class="p-4 text-center">{{ app.universityId }}</td>
                <td class="p-4">
                  <span class="text-[10px] bg-blue-50 text-blue-700 px-2 py-1 rounded-md">{{ app.skills || 'لا يوجد'
                  }}</span>
                </td>
                <td class="p-4 text-center text-gray-400">
                  {{ app.createdAt?.toDate() ? app.createdAt.toDate().toLocaleDateString('ar-EG') : '...' }}
                </td>
                <td class="p-4 text-center">
                  <button @click="deleteApplication(app.id)" class="text-red-500 hover:text-red-700">
                    <svg class="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="applications.length === 0" class="p-12 text-center text-gray-400 font-bold">لا توجد طلبات جديدة
            حالياً</div>
        </div>
      </div>

      <div v-if="activeTab === 'add-task'" class="animate-fade-in text-right">
        <div class="max-w-4xl mx-auto bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100">
          <h2 class="text-2xl font-black text-gray-800 mb-6">📝 إضافة مهمة جديدة</h2>
          <form @submit.prevent="addTask" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input v-model="newTask.title" placeholder="اسم المهمة"
                class="bg-gray-50 p-4 rounded-xl outline-none border-none focus:ring-2 focus:ring-blue-500" required />
              <select v-model="newTask.subject" class="bg-gray-50 p-4 rounded-xl outline-none" required>
                <option v-for="s in ['برمجة', 'رياضيات', 'تصميم']" :key="s" :value="s">{{ s }}</option>
              </select>
              <select v-model="newTask.studentId" class="bg-gray-50 p-4 rounded-xl outline-none" required>
                <option value="" disabled>اختر الطالب</option>
                <option v-for="u in studentList" :key="u.id" :value="u.id">{{ u.email }}</option>
                <option value="all">كل الطلاب</option>
              </select>
              <input v-model="newTask.dueDate" type="date" class="bg-gray-50 p-4 rounded-xl outline-none" required />
            </div>
            <button type="submit" :disabled="taskLoading"
              class="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition active:scale-95 disabled:bg-gray-300">
              {{ taskLoading ? 'جاري الحفظ...' : 'اعتماد ونشر المهمة 🚀' }}
            </button>
          </form>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { auth, db } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { collection, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc, getDoc, addDoc, serverTimestamp } from 'firebase/firestore'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeTab = ref('stats')
const userEmail = ref('')
const users = ref([])
const applications = ref([]) // مصفوفة طلبات الانضمام
const isAdmin = ref(false)
const loading = ref(true)
const taskLoading = ref(false)

const newTask = ref({ title: '', subject: 'برمجة', studentId: '', dueDate: '', completed: false })

// دالة واحدة للـ onMounted تنظم كل شيء
onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid))
        if (userDoc.exists() && userDoc.data().role === 'admin') {
          isAdmin.value = true
          userEmail.value = user.email
          fetchUsersData()
          fetchApplications() // جلب الطلبات
          loading.value = false
        } else {
          await signOut(auth)
          router.push('/login')
        }
      } catch (err) {
        console.error(err)
        router.push('/login')
      }
    } else {
      router.push('/login')
    }
  })
})

const fetchUsersData = () => {
  const q = query(collection(db, "users"), orderBy("createdAt", "desc"))
  onSnapshot(q, (snapshot) => {
    users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
}

const fetchApplications = () => {
  const q = query(collection(db, "applications"), orderBy("createdAt", "desc"))
  onSnapshot(q, (snapshot) => {
    applications.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
}

const studentList = computed(() => users.value.filter(u => u.role === 'student' || !u.role))
const pendingUsersCount = computed(() => users.value.filter(u => !u.isApproved).length)

const addTask = async () => {
  taskLoading.value = true
  try {
    await addDoc(collection(db, "tasks"), { ...newTask.value, createdAt: serverTimestamp() })
    alert("✅ تم نشر المهمة بنجاح!")
    newTask.value = { title: '', subject: 'برمجة', studentId: '', dueDate: '', completed: false }
  } catch (error) { alert("❌ حدث خطأ أثناء الحفظ") }
  finally { taskLoading.value = false }
}

const approveUser = async (id) => await updateDoc(doc(db, "users", id), { isApproved: true })
const deleteUser = async (id) => { if (confirm("هل أنت متأكد من حذف المستخدم؟")) await deleteDoc(doc(db, "users", id)) }
const deleteApplication = async (id) => { if (confirm("حذف طلب الانضمام؟")) await deleteDoc(doc(db, "applications", id)) }
const handleLogout = async () => { await signOut(auth); router.push('/login') }

const navItemClass = (isActive) => {
  const base = "w-full flex items-center px-4 py-3 rounded-xl transition-all duration-300 text-sm font-bold "
  return isActive ? base + "bg-blue-600 text-white shadow-md translate-x-1" : base + "text-gray-500 hover:bg-gray-100"
}
</script>

<style scoped>
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
</style>
