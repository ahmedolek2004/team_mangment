<template>
  <div class="min-h-screen bg-white py-20 px-4" dir="rtl">
    <div class="max-w-5xl mx-auto bg-blue-600 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
      <div class="md:w-1/3 p-12 text-white flex flex-col justify-between">
        <div>
          <h2 class="text-3xl font-bold mb-6">تواصل معنا</h2>
          <p class="text-blue-100 mb-8">نحن هنا للرد على استفساراتك على مدار الساعة.</p>
        </div>
        <div class="space-y-4">
          <p class="flex items-center gap-3"><span>📍</span> الإسكندرية، مصر</p>
          <p class="flex items-center gap-3"><span>📧</span> ahmedolek2004@gmail.com</p>
        </div>
      </div>
      <div class="md:w-2/3 bg-white p-12">
        <form class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">الاسم</label>
              <input type="text" class="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-blue-600 outline-none" placeholder="اسمحك الكريم">
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">الإيميل</label>
              <input type="email" class="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-blue-600 outline-none" placeholder="example@mail.com">
            </div>
          </div>
          <div class="text-right">
            <label class="block text-sm font-bold text-gray-700 mb-2">رسالتك</label>
            <textarea rows="4" class="w-full bg-gray-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-blue-600 outline-none" placeholder="كيف يمكننا مساعدتك؟"></textarea>
          </div>
          <button class="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700 transition-all">إرسال الرسالة</button>
        </form>
      </div>
    </div>
  </div>
</template>
