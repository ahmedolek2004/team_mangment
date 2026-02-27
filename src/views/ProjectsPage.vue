<template>
  <div class="min-h-screen bg-white py-20 px-4" dir="rtl">
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-between items-end mb-12">
        <div>
          <h2 class="text-blue-600 font-bold text-sm mb-2 uppercase">مشاريع التخرج المقترحة</h2>
          <h1 class="text-4xl font-extrabold text-gray-900">أحدث الابتكارات التقنية</h1>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="project in projects" :key="project.id"
             class="relative group overflow-hidden rounded-3xl bg-gray-100 h-96 shadow-lg hover:shadow-2xl transition-all duration-300">

          <div class="absolute inset-0 bg-blue-900/10 group-hover:bg-blue-900/5 transition-colors"></div>

          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10 flex flex-col justify-end p-8 text-white text-right">
            <span class="text-blue-400 font-bold text-xs mb-2">{{ project.category }}</span>
            <h3 class="text-2xl font-bold mb-3">{{ project.title }}</h3>
            <p class="text-sm text-gray-300 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-relaxed">
              {{ project.description }}
            </p>

            <div class="flex gap-4 mt-2">
              <div v-for="stat in project.stats" :key="stat.label" class="text-center">
                <span class="block text-lg font-bold text-blue-400">{{ stat.value }}</span>
                <span class="text-[10px] text-gray-400 uppercase tracking-wider">{{ stat.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const projects = [
  {
    id: 1,
    title: "نظام إدارة استهلاك الطاقة",
    category: "طاقة كهربائية / IoT",
    description: "نظام متكامل لمراقبة وإدارة استهلاك الطاقة في المنازل لتحسين الكفاءة وتقليل الفواتير عبر تحليل البيانات وفصل الأحمال تلقائياً[cite: 5, 6, 7].",
    stats: [
      { label: "توفير متوقع", value: "20%" }, //
      { label: "كفاءة طاقة", value: "10%+" } // [cite: 63]
    ]
  },
  {
    id: 2,
    title: "إنارة الشوارع التلقائية",
    category: "مدن ذكية / استدامة",
    description: "نظام ذكي يتحكم في تشغيل وإطفاء الأعمدة وفقاً لشدة الإضاءة والحركة، مما يساهم في توفير الطاقة بنسبة كبيرة[cite: 103, 104, 108].",
    stats: [
      { label: "توفير طاقة", value: "70%" }, //
      { label: "تكنولوجيا", value: "LED" } // [cite: 112]
    ]
  },
  {
    id: 3,
    title: "إدارة الهواتف الذكية",
    category: "أنظمة تعليمية / BLE",
    description: "نظام ذكي لإدارة استخدام الهواتف داخل القاعات التعليمية عبر تقنيات Beacon BLE لتعزيز تركيز الطلاب وتقليل المشتتات[cite: 173, 175, 176].",
    stats: [
      { label: "المكون الرئيسي", value: "ESP32" }, // [cite: 178]
      { label: "التقنية", value: "Beacon" } // [cite: 176]
    ]
  }
];
</script>
