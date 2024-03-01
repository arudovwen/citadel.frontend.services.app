<template>
  <form @submit.prevent="onSubmit">
    <Card title="">
      <div class="grid gap-5">
        <div class="">
          <FormGroup label="Requester Name" name="type" :error="nameError">
            <VueSelect
              class="min-w-[200px] w-full md:w-auto"
              v-model="name"
              :options="membersOptions"
              placeholder="Select requester"
              name="name"
            />
          </FormGroup>
        </div>
        <FormGroup label="Event type" name="type" :error="requestTypeError">
          <Select
            placeholder="Select type"
            v-model="requestType"
            :options="eventsOption"
          />
        </FormGroup>

        <FormGroup label="Event Date" name="date" :error="dateError">
          <flat-pickr
            v-model="dateOfRequestedEvent"
            class="form-control"
            id="d1"
            placeholder="yyyy, dd M"
            :config="{ minDate: 'today' }"
          />
        </FormGroup>
      </div>

      <div class="text-right space-x-3 mt-8">
        <Button
          :isLoading="loading"
          :disabled="loading"
          type="submit"
          text="Submit"
          btnClass="btn-dark"
        />
      </div>
    </Card>
  </form>
</template>
<script setup>
import VueSelect from "@/components/Select/VueSelect";
import { reactive, computed, watch, defineProps } from "vue";
import { useField, useForm, setValues } from "vee-validate";
import * as Yup from "yup";
import Button from "@/components/Button";
import Card from "@/components/Card";
import FormGroup from "@/components/FormGroup";
// import Textinput from "@/components/Textinput";
import Select from "@/components/Select";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";

const toast = useToast();
// eslint-disable-next-line no-unused-vars
const { state, dispatch } = useStore();
const props = defineProps(["detail"]);
const success = computed(() => state.event.addsuccess);
const loading = computed(() => state.event.loading);
const eventsOption = [
  {
    value: "babyChristening",
    label: "Baby Christening",
  },
  {
    value: "babyDedication",
    label: "Baby Dedication",
  },
  {
    value: "houseWarming",
    label: "House Warming",
  },
  {
    value: "specialThanksgiving",
    label: "Special Thanksgiving",
  },
  {
    value: "burialCeremony",
    label: "Burial Ceremony",
  },
];
const membersOptions = computed(() =>
  state?.member?.data?.map((i) => {
    return {
      label: `${i.firstName} ${i.surName}`,
      value: i.userId,
    };
  })
);
const formData = reactive({
  dateOfRequestedEvent: "",
  requestType: "",

  name: "",
});

const formDataSchema = Yup.object().shape({
  dateOfRequestedEvent: Yup.date()
    .typeError("Please enter a valid date")
    .required("Date is required"),
  requestType: Yup.string().required("Type is required"),
  name: Yup.object().typeError("Invalid value").required("Name is required"),
});

const { handleSubmit } = useForm({
  validationSchema: formDataSchema,
  initialValues: formData,
});

const { value: name, errorMessage: nameError } = useField("name");

const { value: dateOfRequestedEvent, errorMessage: dateError } = useField(
  "dateOfRequestedEvent"
);

const { value: requestType, errorMessage: requestTypeError } =
  useField("requestType");

const onSubmit = handleSubmit((values) => {
  dispatch("addEvent", {
    requestType: values.requestType,
    dateOfRequestedEvent: values.dateOfRequestedEvent,
    userId: values.name.value,
  });
});
watch(props.detail, () => {
  console.log(
    "🚀 ~ file: editevent.vue:132 ~ watch ~ props.detail:",
    props.detail
  );
  setValues(props.detail);
});

watch(success, () => {
  toast.success("Request sent");
});
</script>
<style lang=""></style>
