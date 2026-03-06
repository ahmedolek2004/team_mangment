<script setup>
import { ref, onMounted,  } from 'vue'
import { db, auth } from '../firebase'
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc, orderBy, where } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

const tasks = ref([])
const userRole = ref('student')
const currentUserId = ref(null)

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUserId.value = user.id || user.uid
      // جلب دور المستخدم
      onSnapshot(doc(db, "users", user.uid), (d) => { if(d.exists()) userRole.value = d.data().role })

      // استعلام المهام: يظهر للمستخدم مهامه الخاصة + المهام المرسلة للكل
      let q;
      if (userRole.value === 'admin') {
        q = query(collection(db, "tasks"), orderBy("createdAt", "desc"))
      } else {
        q = query(
          collection(db, "tasks"),
          where("studentId", "in", [user.uid, 'all']), // فلترة المهام لي فقط أو للكل
          orderBy("createdAt", "desc")
        )
      }

      onSnapshot(q, (snapshot) => {
        tasks.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      })
    }
  })
})

// تحديث حالة المهمة (Workflow)
const updateStatus = async (taskId, newStatus) => {
  const isCompleted = newStatus === 'completed'
  await updateDoc(doc(db, "tasks", taskId), {
    status: newStatus,
    completed: isCompleted
  })
}

const getStatusInfo = (status) => {
  const map = {
    'pending': { label: 'انتظار ⏳', class: 'bg-gray-100 text-gray-600' },
    'working': { label: 'قيد العمل 🛠️', class: 'bg-blue-100 text-blue-600' },
    'review': { label: 'تم التسليم/مراجعة 📩', class: 'bg-purple-100 text-purple-600' },
    'completed': { label: 'تم الانتهاء ✅', class: 'bg-green-100 text-green-600' }
  }
  return map[status] || map['pending']
}

const deleteTask = async (id) => { if(confirm("حذف؟")) await deleteDoc(doc(db, "tasks", id)) }
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-10 px-4 font-sans text-right" dir="rtl">
    <div class="max-w-5xl mx-auto">
      <header class="mb-10">
        <h1 class="text-3xl font-black text-gray-900">سير العمل والمهام ⚙️</h1>
        <p class="text-gray-500 mt-2">نظام إدارة المهام والمراحل المتقدم</p>
      </header>

      <div class="grid grid-cols-1 gap-6">
        <div v-for="task in tasks" :key="task.id" class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
          <div class="flex flex-col md:flex-row justify-between gap-4">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-2">
                <span :class="getStatusInfo(task.status).class" class="px-3 py-1 rounded-full text-[10px] font-black uppercase">
                  {{ getStatusInfo(task.status).label }}
                </span>
                <span class="text-xs font-bold px-2 py-1 bg-blue-50 text-blue-600 rounded-lg">💬 {{ task.commMethod }}</span>
              </div>
              <h3 class="text-xl font-black text-gray-800">{{ task.title }}</h3>
              <p class="text-gray-500 text-sm mt-1 leading-relaxed">{{ task.description }}</p>
              <p class="text-[10px] text-gray-400 mt-3 font-bold">📅 تسليم قبل: {{ task.dueDate }}</p>
            </div>

            <div class="flex flex-col gap-2 justify-center min-w-[150px]">
              <button v-if="task.status === 'pending'" @click="updateStatus(task.id, 'working')" class="workflow-btn bg-blue-600 text-white">بدء العمل الآن</button>
              <button v-if="task.status === 'working'" @click="updateStatus(task.id, 'review')" class="workflow-btn bg-purple-600 text-white">تسليم المهمة</button>
              <button v-if="userRole === 'admin' && task.status === 'review'" @click="updateStatus(task.id, 'completed')" class="workflow-btn bg-green-600 text-white">اعتماد وإغلاق</button>

              <button v-if="userRole === 'admin'" @click="deleteTask(task.id)" class="text-red-400 text-xs font-bold mt-2 hover:underline">حذف المهمة 🗑️</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.workflow-btn {
  padding: 0.5rem 1rem;      /* px-4 py-2 */
  border-radius: 0.75rem;    /* rounded-xl */
  font-size: 0.75rem;        /* text-xs */
  font-weight: 900;           /* font-black */
  transition: all 0.2s;      /* transition-all */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */
}

.workflow-btn:active {
  transform: scale(0.95);    /* active:scale-95 */
}
</style>
