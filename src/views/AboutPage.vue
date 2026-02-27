<template>
  <div class="py-24 bg-gray-50 overflow-hidden" dir="rtl">
    <div class="max-w-7xl mx-auto px-6 lg:flex items-center gap-20">

      <div class="lg:w-1/2 mb-12 lg:mb-0 relative">
        <div class="relative group">
          <div
            class="absolute -top-10 -right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse">
          </div>
          <div
            class="absolute -bottom-10 -left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse delay-700">
          </div>

          <div
            class="relative bg-white p-4 rounded-[2.5rem] shadow-2xl transition-transform duration-500 group-hover:rotate-0 rotate-3 border border-gray-100">
            <div
              class="aspect-[4/3] bg-gradient-to-br from-blue-600 to-indigo-900 rounded-2xl overflow-hidden flex items-center justify-center">
              <div class="text-white text-center p-8">
                <svg class="w-16 h-16 mx-auto mb-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p class="font-bold text-xl leading-relaxed">من قلب برج العرب.. نصنع المستقبل بأيدينا</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:w-1/2 text-right">
        <h2 class="text-blue-600 font-extrabold tracking-tighter mb-4 flex items-center gap-2">
          <span class="w-8 h-[2px] bg-blue-600"></span>
          من نحن؟
        </h2>
        <h1 class="text-4xl lg:text-5xl font-black text-gray-900 mb-8 leading-[1.2]">
          مبدعو <span class="text-blue-600 text-shadow-sm">برج العرب</span> للتقنيات الحديثة
        </h1>
        <p class="text-gray-600 text-lg mb-10 leading-relaxed font-medium">
          نحن فريق من الطلاب المبدعين، انطلقنا بشغف من مدينة برج العرب لنحول الأفكار المعقدة إلى واقع ملموس. خبرتنا تمتد
          من برمجة الأنظمة الذكية وحتى التصميم الهندسي المتقدم.
        </p>

        <div class="space-y-4 mb-10">
          <h3 class="text-gray-800 font-bold mb-4">أبرز محطاتنا الإبداعية:</h3>
          <div class="flex flex-wrap gap-3">
            <span v-for="tag in ['Smart Parking', '3D Printing', 'Car Fire System', 'Smart Lighting', 'IoT Solutions']"
              :key="tag"
              class="bg-white border border-blue-100 px-4 py-2 rounded-full text-sm font-bold text-blue-700 shadow-sm hover:bg-blue-600 hover:text-white transition-all cursor-default">
              {{ tag }}
            </span>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-gray-100 pt-10">
          <div class="relative">
            <h4 class="text-4xl font-black text-gray-900 tracking-tight">10+</h4>
            <p class="text-blue-600 text-sm font-bold mt-1">مشاريع تقنية</p>
          </div>
          <div class="relative">
            <h4 class="text-4xl font-black text-gray-900 tracking-tight">100%</h4>
            <p class="text-blue-600 text-sm font-bold mt-1">شغف وتطوير</p>
          </div>
          <div class="relative hidden md:block">
            <h4 class="text-4xl font-black text-gray-900 tracking-tight">Borg</h4>
            <p class="text-blue-600 text-sm font-bold mt-1">مقر الإبداع</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.animate-blob {
  animation: blob 7s infinite;
}

@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }

  33% {
    transform: translate(30px, -50px) scale(1.1);
  }

  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }

  100% {
    transform: translate(0px, 0px) scale(1);
  }
}
</style>
