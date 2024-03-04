<template>
  <form @submit.prevent="onSubmit">
    <Card title="">
      <div class="grid gap-5">
        <div class="">
          <Textinput
            label="Name"
            v-model="outreachName"
            :error="outreachNameError"
            placeholder="Provide outreachName for outreach"
          />
        </div>
        <FormGroup
          label="Date of outreach"
          outreachName="dateOfOutreach"
          :error="dateOfOutreachError"
        >
          <flat-pickr
            v-model="dateOfOutreach"
            class="form-control"
            id="d1"
            placeholder="yyyy, dd M"
          />
        </FormGroup>

        <div class="">
          <Textinput
            label="Location"
            v-model="locationOfOutreach"
            :error="locationOfOutreachError"
            placeholder="Provide locationOfOutreach for outreach"
          />
        </div>

        <Textarea
          label="Description"
          type="text"
          :rows="4"
          v-model="description"
          :error="descriptionError"
          placeholder="Provide a description"
        />
      </div>

      <div class="text-right space-x-3 mt-8">
        <Button
          :isLoading="state.profile.editOutreachRequestLoading"
          type="submit"
          text="Submit"
          btnClass="btn-dark"
        />
      </div>
    </Card>
  </form>
</template>

<script setup>
import { reactive, defineProps } from "vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import Button from "@/components/Button";
import Card from "@/components/Card";
import FormGroup from "@/components/FormGroup";
import Textinput from "@/components/Textinput";
import Textarea from "@/components/Textarea";
import { useStore } from "vuex";
// import moment from "moment";

const { state, dispatch } = useStore();

const formData = reactive({
  dateOfOutreach: "",
  description: "",
  locationOfOutreach: "",
  outreachName: "",
});
const formDataSchema = yup.object().shape({
  outreachName: yup
    .string()
    .typeError("Please enter a valid date")
    .required("Please provie a outreachName"),

  dateOfOutreach: yup
    .date()
    .typeError("Please enter a valid date")
    .required("Date is required"),

  locationOfOutreach: yup.string().required("Location is required"),
  description: yup.string().required("A short description is required"),
});

const props = defineProps(["data"]);

const { handleSubmit } = useForm({
  validationSchema: formDataSchema,
  initialValues:
    {
      ...props.data,
    } || formData,
});

const { value: outreachName, errorMessage: outreachNameError } =
  useField("outreachName");
const { value: locationOfOutreach, errorMessage: locationOfOutreachError } =
  useField("locationOfOutreach");
const { value: description, errorMessage: descriptionError } =
  useField("description");

const { value: dateOfOutreach, errorMessage: dateOfOutreachError } =
  useField("dateOfOutreach");

const onSubmit = handleSubmit((values) => {
  const data = {
    ...values,
  };
  dispatch("editOutreachRequest", data);
});
</script>

<style lang=""></style>
