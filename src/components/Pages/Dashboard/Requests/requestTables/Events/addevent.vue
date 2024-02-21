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
            placeholder="Select date of event"
            :config="config"
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
import { reactive, computed, watch } from "vue";
import { useField, useForm } from "vee-validate";
import * as Yup from "yup";
import Button from "@/components/Button";
import Card from "@/components/Card";
import FormGroup from "@/components/FormGroup";
// import Textinput from "@/components/Textinput";
import Select from "@/components/Select";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
// eslint-disable-next-line no-unused-vars
import moment from "moment";

const toast = useToast();
// eslint-disable-next-line no-unused-vars
const { state, dispatch } = useStore();
const success = computed(() => state.event.addsuccess);
const loading = computed(() => state.event.loading);
const eventsOption = [
  {
    value: "Baby Christening",
    label: "Baby Christening",
  },
  {
    value: "Baby Dedication",
    label: "Baby Dedication",
  },
  {
    value: "House Warming",
    label: "House Warming",
  },
  {
    value: "Special Thanksgiving",
    label: "Special Thanksgiving",
  },
  {
    value: "Burial Ceremony",
    label: "Burial Ceremony",
  },
];
// const membersOptions = computed(() =>
//   state?.member?.data?.map((i) => {
//     return {
//       label: `${i.firstName} ${i.surName}`,
//       value: i.userId,
//     };
//   })
// );
const formData = reactive({
  dateOfRequestedEvent: "",
  requestType: "",
  name: state.auth.userData.id,
});

const formDataSchema = Yup.object().shape({
  dateOfRequestedEvent: Yup.date()
    .typeError("Please enter a valid date")
    .required("Date is required"),
  requestType: Yup.string().required("Type is required"),
  // name: Yup.object().typeError("Invalid value").required("Name is required"),
});

const { handleSubmit } = useForm({
  validationSchema: formDataSchema,
  initialValues: formData,
});
const config = { enableTime: true };
// const { value: name, errorMessage: nameError } = useField("name");

const { value: dateOfRequestedEvent, errorMessage: dateError } = useField(
  "dateOfRequestedEvent"
);

const { value: requestType, errorMessage: requestTypeError } =
  useField("requestType");

const onSubmit = handleSubmit((values) => {
  dispatch("addEvent", {
    requestType: values.requestType,
    eventType: values.requestType,
    dateOfRequestedEvent: moment(values.dateOfRequestedEvent).format(
      "YYYY-MM-DDTHH:mm:ss"
    ),
    userId: state.auth.userData.id,
  });
});

watch(success, () => {
  success.value && toast.success("Request sent");
});
</script>
<style lang=""></style>
