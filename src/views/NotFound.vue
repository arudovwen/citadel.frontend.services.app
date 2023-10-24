<template>
  <section class="min-h-screen flex flex-col py-10 px-2 bg-[#E7EBEE] gap-y-2">
    <div class="flex-1 flex flex-col gap-y-3 bg-white rounded-lg">
      <div class="p-10 text-center flex items-center justify-center">
        <div>
          <!-- <img
            src="@/assets/img/nofound.svg"
            class="w-[180px] h-auto mx-auto mb-7"
          /> -->

          <h1 class="text-4xl md:text-8xl font-bold mb-2">404 ERROR!</h1>
          <h2 class="text-xl font-bold text-gray-600 mb-8">PAGE NOT FOUND</h2>
          <router-link to="/">
            <button
              class="text-white btn-dark px-12 py-4 rounded-full uppercase"
            >
              go back
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>
