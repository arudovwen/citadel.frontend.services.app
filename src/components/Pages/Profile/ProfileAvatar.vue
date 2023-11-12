<template>
  <div class="flex-none">
    <div
      @click="browse"
      :class="[
        isUserProfile ? 'cursor-pointer' : '',
        loading ? 'animate-pulse' : '',
      ]"
      class="md:h-[186px] md:w-[186px] h-[140px] w-[140px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4 ring-slate-100 hover:ring-slate-200 relative"
    >
      <span
        class="inline-block h-full w-full overflow-hidden rounded-full bg-gray-100"
      >
        <svg
          v-if="!avatar?.fileBase64"
          class="h-full w-full text-gray-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>

        <img
          v-else
          class="h-full w-full"
          :src="`data:${avatar?.contentType};base64,${avatar?.fileBase64}`"
          alt="avatar"
        />
      </span>
      <span
        v-if="isUserProfile"
        class="absolute right-2 h-8 w-8 bg-slate-50 text-slate-600 rounded-full shadow-sm flex flex-col items-center justify-center md:top-[140px] top-[100px]"
        ><Icon icon="heroicons:pencil-square" />
      </span>
    </div>
    <input
      class="hidden"
      ref="file"
      type="file"
      @change="onFileSelected"
      accept=".jpeg, .jpg, .png"
    />
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";
import Icon from "@/components/Icon";
import { ref, inject } from "vue";
import { useStore } from "vuex";
import { defineProps, computed, watch } from "vue";

defineProps({
  avatar: {
    type: String,
    default: "",
  },
});
const { state, dispatch } = useStore();
const getUserAvatar = inject("getUserAvatar");
const isUserProfile = inject("isUserProfile");
const success = computed(() => state.profile.uploadFileSuccess);
const loading = computed(() => state.profile.uploadFileLoading);
const userId = inject("id");
const file = ref(null);
const toast = useToast();
const browse = () => {
  if (!isUserProfile.value) {
    return;
  } else {
    file.value.click();
  }
};
const onFileSelected = async (e) => {
  const file = e.target.files[0];
  const allowedTypes = [
    "image/svg+xml",
    "image/jpeg",
    "image/jpg",
    "image/png",
  ];
  if (!allowedTypes.includes(file.type)) {
    toast.error(
      `${file.name} is not a valid image file (SVG, JPEG, JPG, PNG allowed)`
    );
  }
  if (file.size > 800 * 1024) {
    // 800KB = 800 * 1024 bytes
    toast.error(`${file.name} exceeds the maximum file size (800KB)`);
    return false; // Prevent the upload
  }

  const formData = new FormData();
  formData.append("file", file);

  const payload = {
    UserId: userId.value,
    FileType: "avatar",
    file: formData,
  };

  // console.log(payload);
  dispatch("uploadFile", payload);
};

watch(success, (newValue) => {
  if (newValue === true) {
    getUserAvatar();
  }
});
</script>

<style lang="scss" scoped></style>
