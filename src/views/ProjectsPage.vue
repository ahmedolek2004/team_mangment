<template>
  <div class="min-h-screen bg-white py-20 px-4" dir="rtl">
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-between items-end mb-12">
        <div>
          <h2 class="text-blue-600 font-bold text-sm mb-2 uppercase">إنجازاتنا</h2>
          <h1 class="text-4xl font-extrabold text-gray-900">أحدث المشاريع</h1>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="i in 6" :key="i" class="relative group overflow-hidden rounded-3xl bg-gray-200 h-80">
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 text-white text-right">
            <h3 class="text-xl font-bold">اسم المشروع {{ i }}</h3>
            <p class="text-sm text-gray-300">تصميم وتطوير الأنظمة</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
