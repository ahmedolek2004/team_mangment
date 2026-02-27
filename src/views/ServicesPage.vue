<template>
  <div class="min-h-screen bg-gray-50 py-20 px-4" dir="rtl">
    <div class="max-w-7xl mx-auto text-center">
      <h2 class="text-blue-600 font-bold tracking-widest uppercase text-sm mb-3">قدرات الفريق التقني</h2>
      <h1 class="text-4xl font-extrabold text-gray-900 mb-12">خدماتنا الهندسية والبرمجية</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="service in teamServices" :key="service.id"
             class="bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 group flex flex-col items-center">

          <div class="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
            <component :is="service.icon" class="w-8 h-8" />
          </div>

          <h3 class="text-2xl font-bold mb-4 text-gray-800">{{ service.title }}</h3>

          <p class="text-gray-500 leading-relaxed mb-6 text-sm">
            {{ service.description }}
          </p>

          <div class="flex flex-wrap justify-center gap-2 mt-auto">
            <span v-for="tech in service.technologies" :key="tech"
                  class="px-3 py-1 bg-gray-100 text-blue-700 text-[10px] font-bold rounded-full group-hover:bg-blue-100 transition-colors">
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { h } from 'vue';

// أيقونات تمثل الخدمات البرمجية والهندسية
const EmbeddedIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'w-8 h-8' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z' })
]);
const AppIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'w-8 h-8' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' })
]);
const DesignIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'w-8 h-8' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z' })
]);

const teamServices = [
  {
    id: 1,
    title: "تطوير الأنظمة المدمجة (Embedded Systems)",
    icon: EmbeddedIcon,
    description: "تصميم وبرمجة الدوائر الإلكترونية والتحكم في العتاد الصلب باستخدام المتحكمات الدقيقة لمعالجة البيانات والتحكم الفوري[cite: 13, 178].",
    technologies: ["ESP32", "Arduino", "Sensors Integration", "Microcontrollers"]
  },
  {
    id: 2,
    title: "حلول إنترنت الأشياء (IoT Solutions)",
    icon: AppIcon,
    description: "بناء أنظمة متصلة سحابياً تتيح المراقبة عن بُعد، تحليل البيانات اللحظي، وإرسال التنبيهات الذكية للمستخدمين[cite: 22, 173].",
    technologies: ["Cloud Connectivity", "Real-time Monitoring", "Data Analysis", "BLE/WiFi"]
  },
  {
    id: 3,
    title: "التصميم الهندسي والنمذجة",
    icon: DesignIcon,
    description: "إعداد المخططات الكهربائية الشاملة وتصميم النماذج الأولية مع مراعاة معايير السلامة والعزل الكهربائي[cite: 27, 71, 137].",
    technologies: ["Electrical Schematics", "Circuit Design", "Safety Protocols", "Prototyping"]
  }
];
</script>
