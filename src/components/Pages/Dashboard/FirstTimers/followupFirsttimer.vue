<template>
  <form @submit.prevent="onSubmit">
    <Card title="">
      <div class="grid gap-5">
        <FormGroup
          label="First timer report"
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
import { reactive, computed, defineProps, onMounted } from "vue";
import { useField, useForm } from "vee-validate";
import * as Yup from "yup";
import moment from "moment";
import Button from "@/components/Button";
import Card from "@/components/Card";
import FormGroup from "@/components/FormGroup";
import { useStore } from "vuex";
onMounted(() => {
  console.log("Detail: " + JSON.stringify(props.detail));
});
const { state, dispatch } = useStore();
const props = defineProps(["detail"]);
const userId = computed(() => state?.auth?.userData?.id);
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

const submitLoading = computed(() => state.report.addFollowupLoading);
const formData = reactive({
  summary: "",
});
const formDataSchema = Yup.object().shape({
  summary: Yup.string().required("Summary is required"),
});

const { handleSubmit } = useForm({
  validationSchema: formDataSchema,
  initialValues: formData,
});

const { value: summary, errorMessage: summaryError } = useField("summary");

const onSubmit = handleSubmit((values) => {
  // console.log("🚀 ~ file: member-add.vue:163 ~ onSubmit ~ values:", values);
  const today = new Date();
  const data = {
    userId: userId.value,
    biodataId: props?.detail?.id,
    fullName: props?.detail?.fullName,
    reportDate: today,
    report: values.summary,
  };

  // console.log(data);

  dispatch("addFollowupReport", data);
});
</script>
<style></style>
