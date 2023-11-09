<template>
  <Modal
    :activeModal="state.profile.isReqZoneOpen"
    @close="toggleReqZone(false)"
    title="Request Zone"
    centered
  >
    <form @submit.prevent="onSubmit" class="space-y-4">
      <!-- {{ props.affiliation }} -->

      <div class="grid grid-cols-1 gap-4">
        <div>
          <CustomVueSelect
            label="CIH Zone"
            classInput="!h-[40px]"
            v-model.value="zoneObj"
            :modelValue="zoneObj"
            :error="cihZoneError"
            :options="zoneOptions"
            placeholder="Select zone"
            name="zone"
          />
        </div>

        <div>
          <CustomVueSelect
            :disabled="centersLoading"
            :menuLoading="centersLoading"
            label="Center Address"
            class="min-w-[200px] w-full md:w-auto"
            v-model.value="centerObj"
            :modelValue="centerObj"
            :error="cihAddressError"
            :options="centerOptions"
            placeholder="Select center"
            name="CIH Address"
          />
        </div>

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
// import { defineProps } from "vue";

// const props = defineProps({
//   affiliation: {
//     type: Object,
//     default: null,
//   },
// });
onMounted(() => {
  getZones();
});
const { state, dispatch } = useStore();
const zoneObj = ref({
  label: "",
  zoneId: "",
});

const centerObj = ref({
  label: "",
  centerId: "",
});

const toast = useToast();
const userId = inject("id");
const reqSuccess = computed(() => state.profile.requestToChangeZoneSuccess);
const reqError = computed(() => state.profile.requestToChangeZoneError);

const zoneOptions = computed(() =>
  state?.zone?.zones.map((i) => {
    return {
      label: i.zoneName,
      zoneId: i.id,
    };
  })
);

const centerOptions = computed(() =>
  state?.center?.centers.map((i) => {
    return {
      label: i.centerName,
      centerId: i.id,
    };
  })
);
const centersLoading = computed(() => state.center.getcentersloading);

const schema = yup.object({
  cihZone: yup.string().required(),
  cihAddress: yup.string(),
  reason: yup.string(),
});

const formValues = {
  userId: userId.value,
  cihZone: "",
  cihAddress: "",
  reason: "",
};

const { handleSubmit, setValues, values, resetForm } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});

const { errorMessage: cihZoneError } = useField("cihZone");
const { errorMessage: cihAddressError } = useField("cihAddress");

const { value: reason, errorMessage: reasonError } = useField("reason");

const onSubmit = handleSubmit((values) => {
  console.log(values);

  dispatch("requestToChangeZone", values);
});

const getZones = () => {
  dispatch("getZones", { pageNumber: 1, pageSize: 10000 });
};
const toggleReqZone = (boolean) => {
  dispatch("toggleReqZone", boolean);
};

watch(zoneObj, (newValue) => {
  setValues({
    ...values,
    cihZone: newValue?.label,
  });
});

watch(centerObj, (newValue) => {
  setValues({
    ...values,
    cihAddress: newValue?.label,
  });
});

watch(reqSuccess, () => {
  if (reqSuccess.value) {
    toast.success("Request successful");
    toggleReqZone(false);
    resetForm();
    zoneObj.value = {
      label: "",
      departmentId: "",
    };
  }
});

watch(reqError, () => {
  if (reqError.value) {
    // toast.error("Request failed");
    toggleReqZone(false);
    return;
  }
});
</script>
<style lang=""></style>
