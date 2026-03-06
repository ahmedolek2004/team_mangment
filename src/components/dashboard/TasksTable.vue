<script setup>
import { ref, onMounted } from 'vue'
import { db } from '../../firebase'
import { collection, onSnapshot, query, orderBy, doc, deleteDoc, updateDoc, arrayUnion, Timestamp } from 'firebase/firestore'

const tasks = ref([])
const newComments = ref({}) // متغير للتعليقات الجديدة لكل مهمة

onMounted(() => {
  const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"))
  onSnapshot(q, (snap) => {
    tasks.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
  })
})

const deleteTask = async (id) => { if (confirm("حذف المهمة؟")) await deleteDoc(doc(db, "tasks", id)) }

const updateStatus = async (taskId, newStatus) => {
  try {
    const isCompleted = newStatus === 'completed'
    await updateDoc(doc(db, "tasks", taskId), {
      status: newStatus,
      completed: isCompleted
    })
  } catch (error) {
    console.error('Error updating status:', error)
    alert('حدث خطأ في تحديث الحالة: ' + error.message)
  }
}

const addComment = async (taskId) => {
  const commentText = newComments.value[taskId]
  if (!commentText || !commentText.trim()) return
  try {
    await updateDoc(doc(db, "tasks", taskId), {
      comments: arrayUnion({
        text: commentText,
        author: 'Admin', // أو user.uid إذا كان متاحاً
        timestamp: Timestamp.now()
      })
    })
    newComments.value[taskId] = ''
  } catch (error) {
    console.error('Error adding comment:', error)
    alert('حدث خطأ في إضافة التعليق: ' + error.message)
  }
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
</script>

<template>
  <div class="bg-white rounded-3xl shadow-sm border overflow-hidden text-right text-sm">
    <table class="w-full">
      <thead class="bg-gray-50 font-bold text-gray-600">
        <tr>
          <th class="p-4 text-right">المهمة</th>
          <th class="p-4 text-center">الحالة</th>
          <th class="p-4 text-center">التعليقات</th>
          <th class="p-4 text-center">حذف</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="t in tasks" :key="t.id" class="border-t">
          <td class="p-4">
            <p class="font-bold">{{ t.title }}</p>
            <span class="text-[10px] text-blue-500">{{ t.description }}</span>
            <p class="text-[10px] text-gray-400 mt-1">📅 {{ t.dueDate }}</p>
          </td>

          <td class="p-4 text-center">
            <div class="flex flex-col gap-1">
              <span :class="getStatusInfo(t.status).class" class="px-2 py-1 rounded-full text-[10px] font-black">
                {{ getStatusInfo(t.status).label }}
              </span>
              <div class="flex gap-1 justify-center">
                <button v-if="t.status === 'pending'" @click="updateStatus(t.id, 'working')"
                  class="text-xs bg-blue-500 text-white px-2 py-1 rounded">بدء</button>
                <button v-if="t.status === 'working'" @click="updateStatus(t.id, 'review')"
                  class="text-xs bg-purple-500 text-white px-2 py-1 rounded">تسليم</button>
                <button v-if="t.status === 'review'" @click="updateStatus(t.id, 'completed')"
                  class="text-xs bg-green-500 text-white px-2 py-1 rounded">اعتماد</button>
              </div>
            </div>
          </td>

          <td class="p-4">
            <div v-if="t.comments && t.comments.length > 0" class="mb-2">
              <div v-for="(comment, index) in t.comments" :key="index" class="bg-gray-50 p-1 rounded text-xs mb-1">
                <p>{{ comment.text }}</p>
                <small class="text-gray-500">{{ comment.author }} - {{ comment.timestamp ? new
                  Date(comment.timestamp.toDate()).toLocaleString() : 'غير محدد' }}</small>
              </div>
            </div>
            <div class="flex gap-1">
              <input v-model="newComments[t.id]" @keyup.enter="addComment(t.id)" placeholder="تعليق..."
                class="text-xs p-1 border rounded flex-1" />
              <button @click="addComment(t.id)" class="text-xs bg-blue-500 text-white px-2 py-1 rounded">إرسال</button>
            </div>
          </td>

          <td class="p-4 text-center">
            <button @click="deleteTask(t.id)" class="text-red-400">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
