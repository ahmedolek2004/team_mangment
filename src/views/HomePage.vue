<template>
  <div class="min-h-screen bg-white">
    <section class="bg-blue-600 py-20 px-4 text-center text-white">
      <h1 class="text-4xl md:text-5xl font-extrabold mb-4 animate-fade-in">فريق Plan B</h1>
      <p class="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
        نحن مجموعة من المبدعين نسعى لتطوير الحلول التقنية المبتكرة وترك بصمة في مجتمعنا الجامعي.
      </p>
    </section>

    <section class="py-16 px-4 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 text-right">
      <div class="bg-gray-50 p-8 rounded-2xl shadow-sm border-r-4 border-blue-500">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">رؤيتنا</h2>
        <p class="text-gray-600">أن نكون الفريق الرائد في تحويل الأفكار الطلابية إلى مشاريع واقعية تخدم سوق العمل والبيئة الأكاديمية.</p>
      </div>
      <div class="bg-gray-50 p-8 rounded-2xl shadow-sm border-r-4 border-blue-500">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">رسالتنا</h2>
        <p class="text-gray-600">تمكين الطلاب من خلال توفير بيئة تقنية تعاونية تدعم التعلم المستمر والتطوير البرمجي الاحترافي.</p>
      </div>
    </section>
    <section class="py-16 px-4 max-w-6xl mx-auto">
  <div class="flex flex-col md:flex-row items-center gap-12">
    <div class="md:w-1/2">
      <div class="relative">
        <div class="absolute -top-4 -right-4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
             alt="Team Collaboration"
             class="relative rounded-2xl shadow-2xl border-4 border-white">
      </div>
    </div>

    <div class="md:w-1/2 text-right">
      <h2 class="text-3xl font-bold text-gray-800 mb-6 relative inline-block">
        من نحن؟
        <span class="block h-1 bg-blue-600 w-1/2 mt-2"></span>
      </h2>
      <p class="text-gray-600 text-lg leading-relaxed mb-6">
        فريق <span class="text-blue-600 font-bold">Plan B</span> ليس مجرد تجمع طلابي، بل هو حاضنة تقنية ولدت من رحم التحديات الجامعية. نحن مجموعة من الطلاب الشغوفين بالبرمجة والتصميم، قررنا ألا ننتظر الفرص، بل نصنعها بأنفسنا.
      </p>
      <ul class="space-y-4">
        <li class="flex items-center gap-3 justify-end">
          <span>نهجنا يعتمد على التعلم بالممارسة (Learning by Doing)</span>
          <div class="bg-blue-100 p-1 rounded-full"><svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></div>
        </li>
        <li class="flex items-center gap-3 justify-end">
          <span>نركز على حل المشكلات الحقيقية التي تواجه الطلاب</span>
          <div class="bg-blue-100 p-1 rounded-full"><svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></div>
        </li>
        <li class="flex items-center gap-3 justify-end">
          <span>نؤمن بأن العمل الجماعي هو المفتاح لأي نجاح تقني</span>
          <div class="bg-blue-100 p-1 rounded-full"><svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></div>
        </li>
      </ul>
    </div>
  </div>
</section>

    <section class="py-16 bg-gray-50 px-4">
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-3xl font-bold text-gray-800 mb-12">أعضاء الفريق</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          <div v-for="member in teamMembers" :key="member.name" class="bg-white p-6 rounded-xl shadow-md hover:-translate-y-2 transition duration-300">
            <div class="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span class="text-2xl font-bold text-blue-600">{{ member.name[0] }}</span>
            </div>
            <h3 class="text-xl font-bold text-gray-800">{{ member.name }}</h3>
            <p class="text-blue-500 font-medium mb-3">{{ member.role }}</p>
            <p class="text-sm text-gray-500">{{ member.bio }}</p>
          </div>

        </div>
      </div>
    </section>

    <section class="py-20 text-center">
      <h2 class="text-3xl font-bold mb-6">هل تود أن تكون جزءاً من نجاحنا؟</h2>
      <router-link to="/join" class="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-blue-700 transition">
        سجل الآن في الفريق
      </router-link>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const teamMembers = ref([
  {
    name: 'أحمد عبدالحليم احمد',
    role: 'قائد الفريق & Full-Stack Developer',
    bio: 'مهتم ببناء الأنظمة السحابية وإدارة الفرق البرمجية.'
  },
  {
    name: 'أبراهيم اسامه محمد',
    role: 'software Engineer',
    bio: 'تصمم تجارب مستخدم سهلة وجذابة لكل مشاريعنا.'
  },
  {
    name: ' أحمد أبراهيم أحمد ',
    role: 'hardware Engineer',
    bio: 'خبير في التعامل مع الأنظمة المادية وهيكلة الأنظمة المعقدة.'
  }
])
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1s ease-in;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
