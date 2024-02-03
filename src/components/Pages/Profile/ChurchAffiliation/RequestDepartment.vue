<template>
  <Modal
    :activeModal="state.profile.isReqDepartmentOpen"
    @close="toggleReqDepartment(false)"
    title="Request Department"
    centered
  >
    <form @submit.prevent="onSubmit" class="space-y-4">
      <!-- {{ props.affiliation }} -->
      <div class="py-6 flex flex-col" v-if="props.affiliation == null">
        <span class="text-lg"
          >Only members with church affiliations can request to join department.
          Contact your admin for assistance.</span
        >
      </div>
      <div v-else class="grid grid-cols-1 gap-4">
        <!-- {{ hasDepartment }} -->
        <div>
          <CustomVueSelect
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
        <!-- <div>
          <Textinput
            label="Reason"
            type="text"
            placeholder="Type your reason"
            name="reason"
            v-model.value="reason"
            :error="reasonError"
            classInput="h-[40px]"
          />
        </div> -->

        <Textarea
          label="Reason"
          placeholder="Reason"
          v-model.value="reason"
          :error="reasonError"
        />

        <button type="submit" class="btn btn-primary block w-full text-center">
          Submit
        </button>
      </div>
    </form>
  </Modal>
</template>
<script setup>
import Textarea from "@/components/Textarea";
// import Textinput from "@/components/Textinput";
import CustomVueSelect from "@/components/Select/CustomVueSelect.vue";
import Modal from "@/components/Modal";
import { useStore } from "vuex";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { onMounted, ref, watch, computed, inject } from "vue";
import { useToast } from "vue-toastification";
import { defineProps } from "vue";

const props = defineProps({
  affiliation: {
    type: Object,
    default: null,
  },
});
onMounted(() => {
  getDepartments();
});
const { state, dispatch } = useStore();
const departmentObj = ref({
  label: "",
  departmentId: "",
});

const toast = useToast();
const userId = inject("id");
const reqSuccess = computed(() => state.profile.requestToJoinDeptSuccess);
const reqError = computed(() => state.profile.requestToJoinDeptError);
// const hasDepartment = computed(() => {
//   return state.profile.churchAffiliationsData?.department ? true : false;
// });
const departmentOptions = computed(() =>
  state?.department?.departments.map((i) => {
    return {
      label: i.departmentName,
      departmentId: i.id,
    };
  })
);
const schema = yup.object({
  department: yup.string().required(),
  reason: yup.string().required(),
});

const formValues = {
  userId: userId.value,
  department: "",
  reason: "",
};

const { handleSubmit, setValues, values, resetForm } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});

const { errorMessage: departmentError } = useField("department");

const { value: reason, errorMessage: reasonError } = useField("reason");

const onSubmit = handleSubmit((values) => {
  //   console.log(values);

  dispatch("requestToJoinDept", values);
});

const getDepartments = () => {
  dispatch("getDepartments", { pageNumber: 1, pageSize: 25000 });
};
const toggleReqDepartment = (boolean) => {
  dispatch("toggleReqDepartment", boolean);
};

watch(departmentObj, (newValue) => {
  setValues({
    ...values,
    department: newValue?.label,
  });
});

watch(reqSuccess, () => {
  if (reqSuccess.value) {
    toast.success("Request successful");
    toggleReqDepartment(false);
    resetForm();
    departmentObj.value = {
      label: "",
      departmentId: "",
    };
  }
});

watch(reqError, () => {
  if (reqError.value) {
    // toast.error("Request failed");
    toggleReqDepartment(false);
    return;
  }
});
</script>
<style lang=""></style>
