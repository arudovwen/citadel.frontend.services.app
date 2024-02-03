<template>
  <div className="grid grid-cols-2 gap-4">
    <div>
      <CustomVueSelect
        :request="
          requestFnObj('Request to join department', 'toggleReqDepartment')
        "
        :canRequest="!isInspectorate && !isHOD && isUserProfile"
        :disabled="isInspectorate ? false : true"
        label="Department"
        classInput="!h-[40px]"
        v-model.value="departmentObj"
        :modelValue="departmentObj"
        :error="departmentError"
        :options="departmentOptions"
        placeholder="Select department"
        name="Department"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, inject, ref } from "vue";
import { useStore } from "vuex";
import CustomVueSelect from "@/components/Select/CustomVueSelect.vue";
// import RequestDepartment from "@/components/Pages/Profile/ChurchAffiliation/RequestDepartment.vue";

onMounted(async () => {
  try {
    await getDepartments();
  } catch (err) {
    console.log(err);
  }
});

const { dispatch, state } = useStore();
const isInspectorate = inject("isInspectorate");
const isUserProfile = inject("isUserProfile");
const isHOD = inject("isHOD");
// const id = inject("id");

const departmentObj = ref({
  label: "",
  departmentId: "",
});

const getDepartments = () => {
  dispatch("getDepartments", { pageNumber: 1, pageSize: 25000 });
};

const requestFnObj = (name, toggle) => {
  return {
    name: name,
    toggle: toggle,
  };
};
const departmentOptions = computed(() =>
  state?.department?.departments.map((i) => {
    return {
      label: i.departmentName,
      departmentId: i.id,
    };
  })
);
</script>

<style lang="scss" scoped></style>
