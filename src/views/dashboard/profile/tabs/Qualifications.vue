<template>
  <div>
    <!-- <ProfileInputSkeleton v-if="qualificationDataLoading" /> -->

    <!-- <Card bodyClass="p-0"> -->
    <div class="py-6">
      <!-- {{ values }} -->
      <form @submit="onSubmit" novalidate>
        <div class="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- <Textinput
              label="highestQualification"
              type="text"
              placeholder="Type your highest qualification"
              name="highestQualification"
              v-model="highestQualification"
              :error="highestQualificationError"
              classInput="h-[40px]"
            /> -->

          <Select
            label="Highest Qualification"
            :options="highestQualificationMenu"
            v-model.value="highestQualification"
            :modelValue="highestQualification"
            :error="highestQualificationError"
            classInput="!h-[40px]"
          />

          <Textinput
            label="Professional Qualification"
            type="text"
            placeholder="Type your professional qualification"
            name="professionalQualification"
            v-model="professionalQualification"
            :error="professionalQualificationError"
            classInput="h-[40px]"
          />
        </div>
        <div class="ltr:text-right rtl:text-left">
          <Button text="Add Qualification" btnClass="btn btn-primary " />
        </div>
      </form>

      <span class="hidden" v-if="qualificationDataLoading">Loading...</span>

      <Card v-if="qualificationsDetails.length > 0" bodyClass="p-0 mt-4">
        <header class="px-4 pt-4 pb-3 mb-3">
          <h5 class="card-title mb-0 !text-[18px]">List of Qualifications</h5>
        </header>
        <vue-good-table
          :columns="qualificationDetailsTable"
          :rows="qualificationsDetails"
          styleClass="vgt-table !pb-0"
          :sort-options="{
            enabled: false,
          }"
        >
          <template v-slot:table-row="props">
            <span v-if="props.column.field == 'action'">
              <div class="flex space-x-3 rtl:space-x-reverse justify-center">
                <button
                  type="button"
                  class="action-btn btn-primary inline-flex items-center justify-center h-8 w-8 text-lg border rounded text-white"
                  @click="
                    () => $store.dispatch('openQualificationDetail', props.row)
                  "
                >
                  <Icon icon="heroicons:pencil-square" />
                </button>

                <button
                  type="button"
                  class="inline-flex items-center justify-center h-8 w-8 bg-danger-500 text-lg border rounded border-danger-500 text-white"
                  @click="openDelete(props.row, $refs.modal.openModal)"
                >
                  <Icon icon="heroicons-outline:trash" />
                </button>
              </div>
            </span>
          </template>
        </vue-good-table>
      </Card>
    </div>
    <!-- </Card> -->

    <Modal
      title="Delete Qualification"
      label="Small modal"
      labelClass="btn-outline-danger"
      ref="modal"
      sizeClass="max-w-md"
      themeClass="bg-danger-500"
    >
      <div class="text-base text-slate-600 dark:text-slate-300 mb-6">
        Are you sure you want to delete this qualification?
      </div>

      <template v-slot:footer>
        <div class="flex gap-x-5">
          <Button
            text="Cancel"
            btnClass="btn-outline-secondary btn-sm"
            @click="$refs.modal.closeModal()"
          />
          <Button
            text="Delete"
            btnClass="btn-danger btn-sm"
            @click="deleteQualification($refs.modal.closeModal)"
          />
        </div>
      </template>
    </Modal>
    <EditQualifications />
  </div>
</template>
<script setup>
// import Test from "./test.vue";
import {
  highestQualificationMenu,
  qualificationDetailsTable,
} from "@/constant/data";
import { useForm, useField } from "vee-validate";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal/Modal";
import Select from "@/components/Select";
import Card from "@/components/Card";
import Textinput from "@/components/Textinput";
import { useToast } from "vue-toastification";
import { inject, onMounted, computed, watch, ref } from "vue";
import { useStore } from "vuex";
// import ProfileInputSkeleton from "@/components/Pages/Profile/ProfileInputSkeleton.vue";
import * as yup from "yup";
import EditQualifications from "@/components/Pages/Profile/Qualifications/EditQualifications.vue";
onMounted(() => {
  getQualificationData();
});
const id = inject("id");
const store = useStore();

const getQualificationData = () => {
  store.dispatch("getQualificationsById", id.value);
};
const deleteSuccess = computed(
  () => store.state.profile.deleteQualificationSuccess
);

const selectedQualification = ref(null);

const qualificationData = computed(() => store.state.profile.qualificationData);
const qualificationsDetails = ref([]);
const success = computed(
  () => store.state.profile.updateQualificationDataSuccess
);

const qualificationDataLoading = computed(
  () => store.state.profile.getQualificationDataloading
);

const toast = useToast();

const schema = yup.object({
  highestQualification: yup.string().required("This field is required"),
  professionalQualification: yup.string(),
});

const formValues = {
  highestQualification: "",
  professionalQualification: "",
};

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: formValues.value,
});

const { value: highestQualification, errorMessage: highestQualificationError } =
  useField("highestQualification");

const {
  value: professionalQualification,
  errorMessage: professionalQualificationError,
} = useField("professionalQualification");

const prepareDetails = (values) => {
  const createObj = {
    userId: id.value,
    highestQualification: values.highestQualification,
    professionalQualification: values.professionalQualification,
  };
  return createObj;
};

const openDelete = (data, openFn) => {
  selectedQualification.value = data;

  openFn();
};

const deleteQualification = (closeFn) => {
  store.dispatch("deleteQualificationById", selectedQualification.value.id);
  closeFn();
};

const onSubmit = handleSubmit((values) => {
  store.dispatch("createQualification", prepareDetails(values));
});

watch(qualificationData, () => {
  qualificationsDetails.value = qualificationData.value;
});

watch(success, () => {
  if (success.value) {
    if (!store.state.profile.editModal) {
      toast.success("Successfully created");
    }
  }
  // setValues(formValues);
  resetForm();
  getQualificationData();
});

watch(deleteSuccess, () => {
  if (deleteSuccess.value) {
    toast.success("Successfully Deleted");
  }

  getQualificationData();
});
</script>

<style lang="scss">
.vgt-wrap .vgt-responsive {
  border-radius: 0px !important;
  padding-bottom: 0px !important;
}
</style>
