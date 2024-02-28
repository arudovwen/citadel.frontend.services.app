<template>
  <Card>
    <form @submit.prevent="onSubmit" class="space-y-4 max-w-[700px]">
      <div class="grid grid-cols-1 gap-4">
        <Textinput
          label="Title"
          type="text"
          placeholder="Type your title"
          name="title"
          v-model="title"
          :error="titleError"
          classInput="h-[40px]"
        />
        <FormGroup label="dateOfMeeting" name="ddateOfMeeting">
          <flat-pickr
            v-model="dateOfMeeting"
            class="form-control"
            id="d1"
            placeholder="yyyy, dd M"
            :error="dateOfMeetingError"
            :config="{ minDate: 'today' }"
          />
        </FormGroup>

        <FormGroup label="Time Of Meeting" name="timeOfMeeting">
          <flat-pickr
            class="form-control"
            id="Time of Meeting"
            placeholder="Time of Meeting"
            v-model="timeOfMeeting"
            :error="timeOfMeetingError"
            :config="{ enableTime: true, noCalendar: true, dateFormat: 'H:i' }"
          />
        </FormGroup>

        <CustomVueSelect
          :id="venue"
          label="Venue"
          v-model="venue"
          name="venue"
          :modelValue="venue"
          :error="venueError"
          :options="venueMenu"
          @update:modelValue="defaultSelectedValue = $event"
        />

        <CustomVueSelect
          :id="attendee"
          label="Attendee"
          v-model="attendee"
          name="attendee"
          :modelValue="attendee"
          :error="attendeeError"
          :options="attendeeMenu"
          @update:modelValue="defaultSelectedValue = $event"
        />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
        <!-- <div class="hidden sm:block"></div> -->
        <button type="submit" class="btn btn-primary block w-full text-center">
          Save
        </button>
      </div>
    </form>
  </Card>
</template>

<script setup>
// import Icon from "@/components/Icon";

import Card from "@/components/Card";
import Textinput from "@/components/Textinput";
// import DateRangePicker from "@/components/forms/DatePicker";
// import VueTailwindDatePicker from "vue-tailwind-datepicker";

// import Textarea from "@/components/Textarea";
import CustomVueSelect from "@/components/Select/CustomVueSelect.vue";
import FormGroup from "@/components/FormGroup";
import { useField, useForm } from "vee-validate";
import { venueMenu, attendeeMenu } from "@/constant/data";

import * as yup from "yup";
// import { ref } from "vue";
// Define a validation schema

const schema = yup.object({
  dateOfMeeting: yup.string(),
  timeOfMeeting: yup.string(),
  title: yup.string().required("Title is required"),
  venue: yup
    .object()
    .shape({
      value: yup.string(),
      label: yup.string(),
    })
    .nullable(),
  attendee: yup
    .object()
    .shape({
      value: yup.string(),
      label: yup.string(),
    })
    .nullable(),
});

const formValues = {
  dateOfMeeting: "",
  timeOfMeeting: "",
  title: "",
  venue: {
    value: "",
    label: "",
  },
  attendee: {
    value: "",
    label: "",
  },
};

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});
// No need to define rules for fields

const { value: title, errorMessage: titleError } = useField("title");
const { value: dateOfMeeting, errorMessage: dateOfMeetingError } =
  useField("dateOfMeeting");
const { value: timeOfMeeting, errorMessage: timeOfMeetingError } =
  useField("timeOfMeeting");
const { value: venue, errorMessage: venueError } = useField("venue");
const { value: attendee, errorMessage: attendeeError } = useField("attendee");

const onSubmit = handleSubmit((values) => {
  console.log("MeetingDetails: " + JSON.stringify(values));
});
</script>

<style lang="scss" scoped></style>
