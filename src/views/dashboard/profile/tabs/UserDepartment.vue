<template>
  <div className="">
    <!-- {{ loggedInUserRoles.includes("HOD") }} -->
    <div>
      <!-- !loggedInUserRoles.includes('inspectorate') &&
          !loggedInUserRoles.includes('hod') && -->
      <!-- :disabled="isInspectorate ? false : true" -->
      <!-- <CustomVueSelect
        :request="
          requestFnObj('Request to join department', 'toggleReqDepartment')
        "
        :canRequest="isUserProfile"
        label="Department"
        classInput="!h-[40px]"
        v-model.value="departmentObj"
        :modelValue="departmentObj"
        :error="departmentError"
        :options="departmentOptions"
        placeholder="Select department"
        name="Department"
      /> -->

      <div :class="`inline-block input-label `">
        <span
          class="ml-auto text-blue-400"
          @click="$store.dispatch('toggleReqDepartment', true)"
          >Request to join department</span
        >
      </div>

      <div class="">
        <div
          v-if="departmentsLoading"
          class="w-full grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <div v-for="i in 4" :key="i">
            <div class="rounded-md border p-4 animate-pulse">
              <div class="bg-gray-200 h-4 mb-8"></div>
              <div class="bg-gray-200 h-4"></div>
            </div>
          </div>
        </div>
        <div
          class="w-full flex justify-center items-center p-12"
          v-else-if="!departmentsLoading && userDepartments.length == 0"
        >
          Nothing to see yet
        </div>
        <UserDepartmentsCard v-else :departments="UserDepartmentsCardList" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { UserDepartmentsCardList } from "@/constant/data.js";
import { onMounted, inject, computed } from "vue";
import { useStore } from "vuex";
// import CustomVueSelect from "@/components/Select/CustomVueSelect.vue";
// import RequestDepartment from "@/components/Pages/Profile/ChurchAffiliation/RequestDepartment.vue";
import UserDepartmentsCard from "@/components/Pages/Profile/UserDepartmentsCard.vue";
onMounted(async () => {
  try {
    await getDepartments();
  } catch (err) {
    console.log(err);
  }
  getAllUserDepartment();
});

const { dispatch, state } = useStore();
// const loggedInUserRoles = inject("loggedInUserRoles");
// const isInspectorate = inject("isInspectorate");
// const isUserProfile = inject("isUserProfile");
// const isHOD = inject("isHOD");
const id = inject("id");
const departmentsLoading = computed(
  () => state.profile.getAllUserDepartmentLoading
);
const userDepartments = computed(() => state.profile.userDepartments);

// const departmentObj = ref({
//   label: "",
//   departmentId: "",
// });

const getDepartments = () => {
  dispatch("getDepartments", { pageNumber: 1, pageSize: 25000 });
};
const getAllUserDepartment = () => {
  dispatch("getAllUserDepartment", id);
};

// const requestFnObj = (name, toggle) => {
//   return {
//     name: name,
//     toggle: toggle,
//   };
// };
// const departmentOptions = computed(() =>
//   state?.department?.departments.map((i) => {
//     return {
//       label: i.departmentName,
//       departmentId: i.id,
//     };
//   })
// );
</script>

<style lang="scss" scoped></style>
