<template>
  <form @submit.prevent="onSubmit">
    <Card title="">
      <div class="grid gap-5">
        <FormGroup label="Inspection Date" name="date" :error="dateError">
          <flat-pickr
            v-model="date"
            class="form-control"
            id="d1"
            placeholder="yyyy, dd M"
          />
        </FormGroup>

        <CustomVueSelect
          :disabled="centersLoading"
          :menuLoading="centersLoading"
          label="Center Address"
          class="min-w-[200px] w-full md:w-auto"
          v-model.value="center"
          :modelValue="center"
          :error="centerError"
          :options="centerOptions"
          placeholder="Select center"
          name="CIH Address"
        />

        <FormGroup
          label="Provide a summary"
          name="summary"
          :error="summaryError"
        >
          <ckeditor
            :editor="editor"
            v-model="summary"
            :config="editorConfig"
          ></ckeditor>
        </FormGroup>
      </div>

      <div class="text-right space-x-3 mt-8">
        <Button
          :disabled="submitLoading"
          :isLoading="submitLoading"
          type="submit"
          text="Submit"
          btnClass="btn-dark"
        />
      </div>
    </Card>
  </form>
</template>
<script setup>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { reactive, computed, inject, onMounted } from "vue";
import { useField, useForm } from "vee-validate";
import { useRoute } from "vue-router";
import * as Yup from "yup";
import Button from "@/components/Button";
import Card from "@/components/Card";
import FormGroup from "@/components/FormGroup";
import CustomVueSelect from "@/components/Select/CustomVueSelect.vue";
import { useStore } from "vuex";
onMounted(() => {
  // dispatch('getReportBegin')
});
const editor = ClassicEditor;
const editorConfig = {
  toolbar: {
    items: [
      "undo",
      "redo",
      "|",
      "heading",
      "|",
      "bold",
      "italic",
      "|",
      "link",

      "insertTable",

      "|",
      "bulletedList",
      "numberedList",
      "outdent",
      "indent",
    ],
  },
};
const { state, dispatch } = useStore();
const detail = inject("detail");
const userName = computed(() => state.auth.userData.fullName);
const route = useRoute();
dispatch("getAllCenters", {
  zoneId: route?.params?.zoneId ? route?.params?.zoneId : detail?.value?.zoneId,
});
const centerOptions = computed(() =>
  state?.center?.centers.map((i) => {
    return {
      label: i.centerName,
      centerId: i.id,
    };
  })
);
const centersLoading = computed(() => state.center.getcentersloading);
const submitLoading = computed(() => state.report.addAllInspectionLoading);
const formData = reactive({
  date: "",
  type: "",
  center: "",
  zone: "",
  state_of_flock: "",
  summary: "",
  name: "",
});
const formDataSchema = Yup.object().shape({
  date: Yup.date()
    .typeError("Please enter a valid date")
    .required("Date is required"),
  center: Yup.object()
    .typeError("Invalid value")
    .required("Center is required"),
  summary: Yup.string().required("Summary is required"),
});

const { handleSubmit } = useForm({
  validationSchema: formDataSchema,
  initialValues: formData,
});

const { value: summary, errorMessage: summaryError } = useField("summary");
const { value: date, errorMessage: dateError } = useField("date");
const { value: center, errorMessage: centerError } = useField("center");

const onSubmit = handleSubmit((values) => {
  console.log("🚀 ~ file: member-add.vue:163 ~ onSubmit ~ values:", values);

  const data = {
    dateOfInspection: values.date,
    inspectionOfficer: userName.value,
    zoneId: detail?.value?.zoneId,
    centerId: values.center.centerId,
    centerName: values.center.label,
    reportDetails: values.summary,
  };
  // console.log(JSON.stringify(data));
  dispatch("addInspectionReport", data);
});
</script>
<style></style>
