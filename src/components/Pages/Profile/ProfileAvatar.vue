<template>
  <div class="flex-none">
    <div
      class="md:h-[186px] md:w-[186px] h-[140px] w-[140px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4 ring-slate-100 relative"
    >
      <span
        class="inline-block h-1full w-full overflow-hidden rounded-full bg-gray-100"
      >
        <svg
          class="h-full w-full text-gray-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </span>
      <router-link
        to="/app/profile-setting"
        class="absolute right-2 h-8 w-8 bg-slate-50 text-slate-600 rounded-full shadow-sm flex flex-col items-center justify-center md:top-[140px] top-[100px]"
        ><Icon icon="heroicons:pencil-square" />
      </router-link>
    </div>
    <input
      class="hidden"
      type="file"
      @change="onFileSelected"
      accept=".jpeg, .jpg, .png"
    />
  </div>
</template>

<script setup>
import Icon from "@/components/Icon";
import { ref } from "vue";
import { useStore } from "vuex";

const { dispatch } = useStore();
const selectedFile = ref(null);
const onFileSelected = (e) => {
  selectedFile.value = e.target.files[0];
  console.log(selectedFile.value);

  //   let reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = (e) => {
  //     let res = e.target.result;

  //     console.log(res);

  //     selectedFile.value = file;
  //     console.log(selectedFile.value);
  dispatch("uploadFile", selectedFile.value);
  //   };
};

// const onUpload = async () => {
//   dispatch("uploadFile", selectedFile.value);
// };
</script>

<style lang="scss" scoped></style>
