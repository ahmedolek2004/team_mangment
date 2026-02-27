<script setup>
import { ref, onMounted } from 'vue'
import { db } from '../../firebase'
import { collection, onSnapshot, query, orderBy, doc, deleteDoc } from 'firebase/firestore'

const apps = ref([])

onMounted(() => {
  const q = query(collection(db, "applications"), orderBy("createdAt", "desc"))
  onSnapshot(q, (snap) => {
    apps.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
  })
})

const deleteApp = async (id) => { if(confirm("حذف الطلب؟")) await deleteDoc(doc(db, "applications", id)) }
</script>

<template>
  <div class="bg-white rounded-3xl shadow-sm border overflow-hidden text-right">
    <table class="w-full text-sm text-right">
      <thead class="bg-blue-600 text-white font-bold">
        <tr>
          <th class="p-4">اسم الطالب</th>
          <th class="p-4">الجامعة</th>
          <th class="p-4">المهارات</th>
          <th class="p-4">الهاتف</th>
          <th class="p-4 text-center">حذف</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="app in apps" :key="app.id" class="border-t hover:bg-gray-50">
          <td class="p-4 font-bold text-blue-700">{{ app.studentName }}</td>
          <td class="p-4">{{ app.universityId }}</td>
          <td class="p-4 text-xs text-gray-500">{{ app.skills }}</td>
          <td class="p-4 text-xs text-gray-500">{{ app.phoneNumber }}</td>
          <td class="p-4 text-center">
            <button @click="deleteApp(app.id)" class="text-red-400">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
