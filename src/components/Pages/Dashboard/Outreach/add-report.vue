<template>
  <!-- <button @click="clck">Hyyy</button> -->
  <form @submit.prevent="onSubmit">
    <Card title="">
      <div class="grid gap-5 mb-10">
        <FormGroup label="Date" name="dateOfOutreach" :error="dateError">
          <flat-pickr
            v-model="date"
            class="form-control"
            id="d1"
            placeholder="yyyy, dd M"
          />
        </FormGroup>

        <Textarea
          label="Summary"
          type="text"
          :rows="4"
          v-model="outreachOutcome"
          :error="outreachOutcomeError"
          placeholder="Provide activities report summary"
        />
      </div>

      <div>
        <h3 class="text-base font-bold mb-8">Converts Detail</h3>
        <div class="flex flex-col md:flex-row gap-8 md:items-start mb-7">
          <h3 class="text-base font-medium min-w-[150px]">Adults</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Textinput
              class="min-w-[150px]"
              label="Total"
              v-model="adultTotal"
              :error="adultTotalError"
              placeholder="Enter value"
            />
          </div>
        </div>
        <div class="flex flex-col md:flex-row gap-8 md:items-start mb-7">
          <h3 class="text-base font-medium min-w-[150px]">Youths</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Textinput
              class="min-w-[150px]"
              label="Total"
              v-model="youthTotal"
              :error="youthTotalError"
              placeholder="Enter value"
            />
          </div>
        </div>
        <div class="flex flex-col md:flex-row gap-8 md:items-start mb-7">
          <h3 class="text-base font-medium min-w-[150px]">Teenagers</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Textinput
              class="min-w-[150px]"
              label="Total"
              v-model="teenagerTotal"
              :error="teenagerTotalError"
              placeholder="Enter value"
            />
          </div>
        </div>
        <div class="flex flex-col md:flex-row gap-8 md:items-start mb-7">
          <h3 class="text-base font-medium min-w-[150px]">children</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Textinput
              class="min-w-[150px]"
              label="Total"
              v-model="childrenTotal"
              :error="childrenTotalError"
              placeholder="Enter value"
            />
          </div>
        </div>
        <div class="flex flex-col md:flex-row gap-8 md:items-start mb-7">
          <h3 class="text-base font-medium min-w-[150px]">Males</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Textinput
              class="min-w-[150px]"
              label="Total"
              v-model="maleTotal"
              :error="maleTotalError"
              placeholder="Enter value"
            />
          </div>
        </div>
        <div class="flex flex-col md:flex-row gap-8 md:items-start mb-7">
          <h3 class="text-base font-medium min-w-[150px]">Females</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Textinput
              class="min-w-[150px]"
              label="Total"
              v-model="femaleTotal"
              :error="femaleTotalError"
              placeholder="Enter value"
            />
          </div>
        </div>
      </div>

      <div class="text-right space-x-3 mt-8">
        <Button
          :isLoading="reqStatus?.loading"
          type="submit"
          text="Submit"
          btnClass="btn-dark"
        />
      </div>
    </Card>
  </form>
</template>

<script setup>
import { reactive, computed, inject } from "vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import Button from "@/components/Button";
import Card from "@/components/Card";
import FormGroup from "@/components/FormGroup";
import Textinput from "@/components/Textinput";
import Textarea from "@/components/Textarea";
import { useStore } from "vuex";
import { watch } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast();

const { state, dispatch } = useStore();
const reqStatus = inject("createOutreachReportStatus");

watch(reqStatus, () => console.log(reqStatus));
const formData = reactive({
  date: "",
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

// eslint-disable-next-line no-undef
const props = defineProps(["data"]);

const formDataSchema = yup.object().shape({
  date: yup.string().required("Date is required"),
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
  initialValues: formData,
});

const { value: date, errorMessage: dateError } = useField("date");
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

const userData = computed(() => {
  return state?.auth?.userData;
});

watch(reqStatus, () => {
  if (reqStatus.value.error) {
    toast.error(reqStatus.value.error);
  }
});
watch(reqStatus, () => {
  if (reqStatus.value.error) {
    toast.error(reqStatus.value.error);
  }
});
// const clck = () => dispatch("getOutreachById", { id: props.data.id });

const onSubmit = handleSubmit((values) => {
  const reqData = {
    ...values,
    userId: userData?.value?.id,
    outreachDate: props.data.dateOfOutreach,
    id: props.data.id,
    outreachrequestId: props.data.id,
  };

  (reqData.detailOfConverts[0].adult = parseInt(
    values.detailOfConverts[0].adult
  )),
    (reqData.detailOfConverts[0].youth = parseInt(
      values.detailOfConverts[0].youth
    )),
    (reqData.detailOfConverts[0].teenager = parseInt(
      values.detailOfConverts[0].teenager
    )),
    (reqData.detailOfConverts[0].children = parseInt(
      values.detailOfConverts[0].children
    )),
    (reqData.detailOfConverts[0].male = parseInt(
      values.detailOfConverts[0].male
    )),
    (reqData.detailOfConverts[0].female = parseInt(
      values.detailOfConverts[0].female
    )),
    (reqData.detailOfConverts[0].outreachReportId = props.data.id),
    delete reqData.date;

  dispatch("createOutreachReport", reqData);
  console.log("🚀 ~ file: member-add.vue:163 ~ onSubmit ~ values:", reqData);
});
</script>

<style lang=""></style>
