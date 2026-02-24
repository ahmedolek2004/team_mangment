<template>
  <div class="min-h-screen bg-gray-50 py-20 px-4" dir="rtl">
    <div class="max-w-7xl mx-auto text-center">
      <h2 class="text-blue-600 font-bold tracking-widest uppercase text-sm mb-3">ماذا نقدم؟</h2>
      <h1 class="text-4xl font-extrabold text-gray-900 mb-12">خدماتنا المتميزة</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="i in 3" :key="i" class="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
          <div class="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <h3 class="text-xl font-bold mb-4">خدمة احترافية {{ i }}</h3>
          <p class="text-gray-500 leading-relaxed">نقدم حلولاً مبتكرة لتسريع وتيرة عمل فريقك وضمان أفضل النتائج بأقل مجهود.</p>
        </div>
      </div>
    </div>
  </div>
</template>
