<script setup>
import { ref, onMounted } from 'vue'
import { db } from '../../firebase'
import { collection, onSnapshot, query, orderBy, doc, deleteDoc, updateDoc } from 'firebase/firestore'

const tasks = ref([])

onMounted(() => {
  const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"))
  onSnapshot(q, (snap) => {
    tasks.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
  })
})

const deleteTask = async (id) => { if(confirm("حذف المهمة؟")) await deleteDoc(doc(db, "tasks", id)) }
const toggleStatus = async (task) => await updateDoc(doc(db, "tasks", task.id), { completed: !task.completed })
</script>

<template>
  <div class="bg-white rounded-3xl shadow-sm border overflow-hidden text-right text-sm">
    <table class="w-full">
      <thead class="bg-gray-50 font-bold text-gray-600">
        <tr>
          <th class="p-4 text-right">المهمة</th>
          <th class="p-4 text-center">الحالة</th>
          <th class="p-4 text-center">حذف</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="t in tasks" :key="t.id" class="border-t">
          <td class="p-4">
            <p class="font-bold">{{ t.title }}</p>
            <span class="text-[10px] text-blue-500">{{ t.description }}</span>
          </td>

          <td class="p-4 text-center">
            <button @click="toggleStatus(t)" :class="t.completed ? 'text-green-600' : 'text-orange-600'" class="font-bold">
              {{ t.completed ? 'مكتملة ✅' : 'قيد التنفيذ ⏳' }}
            </button>
          </td>
          <td class="p-4 text-center">
            <button @click="deleteTask(t.id)" class="text-red-400">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
