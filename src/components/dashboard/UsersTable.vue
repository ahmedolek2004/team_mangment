<script setup>
import { ref, onMounted } from 'vue'
import { db } from '../../firebase'
import { collection, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore'

const users = ref([])

onMounted(() => {
  const q = query(collection(db, "users"), orderBy("createdAt", "desc"))
  onSnapshot(q, (snap) => {
    users.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
  })
})

const approveUser = async (id) => await updateDoc(doc(db, "users", id), { isApproved: true })
const deleteUser = async (id) => { if(confirm("حذف المستخدم؟")) await deleteDoc(doc(db, "users", id)) }
</script>

<template>
  <div class="bg-white rounded-3xl shadow-sm border overflow-hidden text-right">
    <table class="w-full text-sm text-right">
      <thead class="bg-gray-50 font-bold">
        <tr>
          <th class="p-4">البريد الإلكتروني</th>
          <th class="p-4 text-center">الحالة</th>
          <th class="p-4 text-center">إجراء</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" class="border-t hover:bg-gray-50">
          <td class="p-4 font-bold">{{ user.email }}</td>
          <td class="p-4 text-center">
            <span :class="user.isApproved ? 'text-green-600 bg-green-50' : 'text-yellow-600 bg-yellow-50'" class="px-3 py-1 rounded-full text-xs font-bold">
              {{ user.isApproved ? 'مفعل' : 'معلق' }}
            </span>
          </td>
          <td class="p-4 text-center">
            <button v-if="!user.isApproved" @click="approveUser(user.id)" class="text-blue-600 ml-4 font-bold">تفعيل</button>
            <button @click="deleteUser(user.id)" class="text-red-500 font-bold">حذف</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
