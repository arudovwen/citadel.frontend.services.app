<template>
  <form @submit.prevent="onSubmit">
    <Card title="">
      <div class="grid gap-5">
        <!-- <div class="">
          <FormGroup label="Requester Name" name="type" :error="nameError">
            <VueSelect
              class="min-w-[200px] w-full md:w-auto"
              v-model="name"
              :options="membersOptions"
              placeholder="Select requester"
              name="name"
            />
          </FormGroup>
        </div> -->
        <FormGroup label="Event type" name="type" :error="eventTypeError">
          <Select
            placeholder="Select type"
            v-model="eventType"
            :options="eventsOption"
          />
        </FormGroup>

        <FormGroup label="Event Date" name="date" :error="dateError">
          <flat-pickr
            v-model="dateOfRequestedEvent"
            class="form-control"
            id="d1"
            :config="config"
            placeholder="Select date of event"
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
// import VueSelect from "@/components/Select/VueSelect";
import { computed, watch, defineProps, onMounted } from "vue";
import { useField, useForm } from "vee-validate";
import * as Yup from "yup";
import Button from "@/components/Button";
import Card from "@/components/Card";
import FormGroup from "@/components/FormGroup";
// import Textinput from "@/components/Textinput";
import Select from "@/components/Select";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
import moment from "moment";

const props = defineProps(["detail"]);
const toast = useToast();
// eslint-disable-next-line no-unused-vars
const { state, dispatch } = useStore();
const success = computed(() => state.event.updateeventsuccess);
const loading = computed(() => state.event.updateeventloading);
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

const formDataSchema = Yup.object().shape({
  dateOfRequestedEvent: Yup.date()
    .typeError("Please enter a valid date")
    .required("Date is required"),
  eventType: Yup.string().required("Type is required"),
  // name: Yup.object().typeError("Invalid value").required("Name is required"),
});

const { handleSubmit, setValues } = useForm({
  validationSchema: formDataSchema,
  initialValues: {
    ...props.detail,

    dateOfRequestedEvent: props.detail.eventDate,
  },
});

// const { value: name, errorMessage: nameError } = useField("name");

const { value: dateOfRequestedEvent, errorMessage: dateError } = useField(
  "dateOfRequestedEvent"
);

const { value: eventType, errorMessage: eventTypeError } =
  useField("eventType");
const config = { enableTime: true };
onMounted(() => {
  setValues({
    ...props.detail,
    eventType: props.detail.eventType,
    dateOfRequestedEvent: props.detail.eventDate,
  });
});
const onSubmit = handleSubmit((values) => {
  console.log("🚀 ~ file: editevent.vue:123 ~ onSubmit ~ values:", values);
  dispatch("updateEvent", {
    ...values,
    // requestType: values.eventType,
    dateOfRequestedEvent: moment(values.dateOfRequestedEvent).format(
      "YYYY-MM-DDTHH:mm:ss"
    ),
  });
});
watch(success, () => {
  success.value && toast.success("Event updated");
});
</script>
<style lang=""></style>
