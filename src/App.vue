<template>
  <div class="min-h-screen font-sans" dir="rtl">
    <Navbar v-if="showNavbar" />

    <router-view />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/NavbarPage.vue' // تأكد من المسار الصحيح للـ Component

const route = useRoute()

// الـ Navbar يظهر فقط في الصفحات العامة (الرئيسية، عن المشروع، الخ)
// ويختفي في الداش بورد وصفحات الـ Auth
const showNavbar = computed(() => {
  const excludedPaths = ['dashboard', 'login', 'register']
  return !excludedPaths.some(path => route.path.includes(path))
})
</script>

<style>
/* خط عام للمشروع يخلي شكله احترافي */
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap');

body {
  font-family: 'Cairo', sans-serif;
  margin: 0;
  padding: 0;
}
</style>
