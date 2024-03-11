<template>
  <form @submit.prevent="onSubmit">
    <Card title="">
      <div class="grid gap-5 mb-10">
        <FormGroup label="Date" name="dateOfOutreach" :error="outreachDateError">
          <flat-pickr v-model="outreachDate" class="form-control" id="d1" placeholder="yyyy, dd M" />
        </FormGroup>

        <Textarea label="Summary" type="text" :rows="4" v-model="outreachOutcome" :error="outreachOutcomeError"
          placeholder="Provide activities report summary" />
      </div>

      <div>
        <h3 class="text-base font-bold mb-8">Converts Detail</h3>
        <div class="flex flex-col md:flex-row gap-8 md:items-start mb-7">
          <h3 class="text-base font-medium min-w-[150px]">Adults</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Textinput class="min-w-[150px]" label="Total" v-model="adultTotal" :error="adultTotalError"
              placeholder="Enter value" />
          </div>
        </div>
        <div class="flex flex-col md:flex-row gap-8 md:items-start mb-7">
          <h3 class="text-base font-medium min-w-[150px]">Youths</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Textinput class="min-w-[150px]" label="Total" v-model="youthTotal" :error="youthTotalError"
              placeholder="Enter value" />
          </div>
        </div>
        <div class="flex flex-col md:flex-row gap-8 md:items-start mb-7">
          <h3 class="text-base font-medium min-w-[150px]">Teenagers</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Textinput class="min-w-[150px]" label="Total" v-model="teenagerTotal" :error="teenagerTotalError"
              placeholder="Enter value" />
          </div>
        </div>
        <div class="flex flex-col md:flex-row gap-8 md:items-start mb-7">
          <h3 class="text-base font-medium min-w-[150px]">children</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Textinput class="min-w-[150px]" label="Total" v-model="childrenTotal" :error="childrenTotalError"
              placeholder="Enter value" />
          </div>
        </div>
        <div class="flex flex-col md:flex-row gap-8 md:items-start mb-7">
          <h3 class="text-base font-medium min-w-[150px]">Males</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Textinput class="min-w-[150px]" label="Total" v-model="maleTotal" :error="maleTotalError"
              placeholder="Enter value" />
          </div>
        </div>
        <div class="flex flex-col md:flex-row gap-8 md:items-start mb-7">
          <h3 class="text-base font-medium min-w-[150px]">Females</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Textinput class="min-w-[150px]" label="Total" v-model="femaleTotal" :error="femaleTotalError"
              placeholder="Enter value" />
          </div>
        </div>
      </div>

      <div class="text-right space-x-3 mt-8">
        <Button :isLoading="editStatus?.loading" type="submit" text="Submit" btnClass="btn-dark" />
      </div>
    </Card>
  </form>
</template>

<script setup>
import { reactive, computed } from "vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import Button from "@/components/Button";
import Card from "@/components/Card";
import FormGroup from "@/components/FormGroup";
import Textinput from "@/components/Textinput";
import Textarea from "@/components/Textarea";
import { useStore } from "vuex";
import { watch, onMounted } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast();

const { state, dispatch } = useStore();

const formData = reactive({
  outreachDate: "",
  outreachOutcome: "",
  detailOfConverts: [
    {
      adult: null,
      youth: null,
      teenager: null,
      children: null,
      male: null,
      female: null,
    },
  ],
});

const report = computed(() => state?.profile?.outreachReport);

watch(report, () => {
  console.log("v ==", report);
});

// eslint-disable-next-line no-undef
const props = defineProps(["data", "id"]);

const formDataSchema = yup.object().shape({
  outreachDate: yup.string().required("Date is required"),
  outreachOutcome: yup.string().required("Summary is required"),
  detailOfConverts: yup.array().of(
    yup.object().shape({
      adult: yup
        .number()
        .typeError("Total adults must be a number")
        .required("Total adults is required")
        .min(0, "Total adults must be at least 0"),
      teenager: yup
        .number()
        .typeError("Total adults must be a number")
        .required("Total teenagers is required")
        .min(0, "Total teenagers must be at least 0"),
      youth: yup
        .number()
        .typeError("Total youth must be a number")
        .required("Total youth is required")
        .min(0, "Total youth must be at least 0"),
      children: yup
        .number()
        .typeError("Total children must be a number")
        .required("Total children is required")
        .min(0, "Total children must be at least 0"),
      male: yup
        .number()
        .typeError("Total males must be a number")
        .required("Total males is required")
        .min(0, "Total males must be at least 0"),
      female: yup
        .number()
        .typeError("Total females must be a number")
        .required("Total females is required")
        .min(0, "Total females must be at least 0"),
    })
  ),
});

const { handleSubmit } = useForm({
  validationSchema: formDataSchema,
  initialValues: report.value || formData,
});

const { value: outreachDate, errorMessage: outreachDateError } =
  useField("outreachDate");
const { value: outreachOutcome, errorMessage: outreachOutcomeError } =
  useField("outreachOutcome");

const { value: adultTotal, errorMessage: adultTotalError } = useField(
  "detailOfConverts[0].adult"
);
const { value: youthTotal, errorMessage: youthTotalError } = useField(
  "detailOfConverts[0].youth"
);
const { value: teenagerTotal, errorMessage: teenagerTotalError } = useField(
  "detailOfConverts[0].teenager"
);
const { value: childrenTotal, errorMessage: childrenTotalError } = useField(
  "detailOfConverts[0].children"
);
const { value: maleTotal, errorMessage: maleTotalError } = useField(
  "detailOfConverts[0].male"
);
const { value: femaleTotal, errorMessage: femaleTotalError } = useField(
  "detailOfConverts[0].female"
);

const editStatus = computed(() => ({
  loading: state?.profile?.editOutreachReportLoading,
  success: state?.profile?.editOutreachReportSuccess,
  error: state?.profile?.editOutreachReportreachError,
}));

watch(editStatus, () => {
  if (editStatus.value.error) {
    toast.error(editStatus.value.error);
  }
});

const onSubmit = handleSubmit((values) => {
  const d = 
  {
    outreachOutcome: values.outreachOutcome,
    outreachDate: values.outreachDate,
    outreachRequestId: props.data.id,
    detailOfConverts: {
      ...values.detailOfConverts[0],
      adult: parseInt(values.detailOfConverts[0]?.adult),
      youth: parseInt(values.detailOfConverts[0]?.youth),
      teenager: parseInt(values.detailOfConverts[0]?.teenager),
      children: parseInt(values.detailOfConverts[0]?.children),
      male: parseInt(values.detailOfConverts[0]?.male),
      female: parseInt(values.detailOfConverts[0]?.female),
      id: report.value.detailOfConverts[0].id,
      outreachDate: values.outreachDate,
    },
  };

  dispatch("editOutreachReport", d);
  // console.log("🚀 ~ file: member-add.vue:163 ~ onSubmit ~ values:", reqData);
});
</script>

<style lang=""></style>
