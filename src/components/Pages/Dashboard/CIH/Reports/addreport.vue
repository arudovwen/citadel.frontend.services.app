<template>
  <form @submit.prevent="onSubmit">
    <Card title="">
      <!-- {{ affiliation }}
      ss -->
      <div class="grid gap-5">
        <!-- <span>{{ zone }}</span> -->
        <VueSelect
          disabled
          label="Zone"
          class="min-w-[200px] w-full md:w-auto"
          v-model.value="zone"
          :options="zoneOptions"
          placeholder="Select zone"
          name="zone"
          :error="''"
        />

        <div>
          <CustomVueSelect
            :disabled="true"
            :menuLoading="centersLoading"
            label="Center Address"
            class="min-w-[200px] w-full md:w-auto"
            v-model.value="centerObj"
            :modelValue="centerObj"
            :error="''"
            :options="centerOptions"
            placeholder="Select center"
            name="CIH Address"
          />
        </div>
        <div class="">
          <Textinput
            label="Activity Name"
            v-model="activityName"
            :error="activityNameError"
            placeholder="Provide name for activity"
          />
        </div>
        <div class="">
          <Textinput
            label="Activity Venue"
            v-model="activityVenue"
            :error="activityVenueError"
            placeholder="Provide a venue for activity"
          />
        </div>
        <div class="">
          <Textinput
            label="Activity Type"
            v-model="activityType"
            :error="activityTypeError"
            placeholder="Provide a type for activity"
          />
        </div>
        <FormGroup label="Activity Date" name="date" :error="activityDateError">
          <flat-pickr
            v-model="activityDate"
            class="form-control"
            id="d1"
            placeholder="yyyy, dd M"
          />
        </FormGroup>
        <div class="">
          <Textinput
            label="State of flocks"
            v-model="stateOfTheFlock"
            :error="stateOfTheFlockError"
            placeholder=""
          />
        </div>
        <div class="mb-8">
          <h3 class="text-base font-bold mb-5 mt-6">Attendance Detail</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="">
              <Textinput
                label="Total adults"
                v-model="adult"
                :error="adultError"
                placeholder="Enter value"
                type="number"
              />
            </div>

            <div class="">
              <Textinput
                label="Total Youths"
                v-model="youth"
                :error="youthError"
                placeholder="Enter value"
                type="number"
              />
            </div>

            <div class="">
              <Textinput
                label="Total teenagers"
                v-model="teenager"
                :error="teenagerError"
                placeholder="Enter value"
                type="number"
              />
            </div>

            <div class="">
              <Textinput
                label="Total children"
                v-model="children"
                :error="childrenError"
                placeholder="Enter value"
                type="number"
              />
            </div>
            <div class="">
              <Textinput
                label="Total males"
                v-model="male"
                :error="maleError"
                placeholder="Enter value"
                type="number"
              />
            </div>
            <div class="">
              <Textinput
                label="Total females"
                v-model="female"
                :error="femaleError"
                placeholder="Enter value"
                type="number"
              />
            </div>
          </div>
        </div>
        <FormGroup
          label="Provide a summaryOfEvent"
          name="summaryOfEvent"
          :error="summaryOfEventError"
        >
          <ckeditor
            :editor="editor"
            v-model="summaryOfEvent"
            :config="editorConfig"
            class="h-[400px]"
          ></ckeditor>
        </FormGroup>
      </div>

      <div class="text-right space-x-3 mt-8">
        <Button
          type="submit"
          text="Submit"
          btnClass="btn-dark"
          :isLoading="loading"
          :disabled="loading"
        />
      </div>
    </Card>
  </form>
</template>
<script setup>
import CustomVueSelect from "@/components/Select/CustomVueSelect.vue";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { reactive, computed, ref, inject, watch, onMounted } from "vue";
import { useField, useForm } from "vee-validate";
import * as Yup from "yup";
import Button from "@/components/Button";
import Card from "@/components/Card";
import FormGroup from "@/components/FormGroup";
import Textinput from "@/components/Textinput";
import { useStore } from "vuex";
import VueSelect from "@/components/Select/VueSelect";

// import moment from "moment";

// const config = { enableTime: true };
onMounted(() => {
  dispatch("getCenter", { id: affiliation?.value?.centerId });
});
const { state, dispatch } = useStore();
const loading = computed(() => state.report.loading);
const centerData = computed(() => state.center.center);
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
const zoneOptions = inject("zoneOptions");
const affiliation = inject("detail");
const zone = ref({
  label: affiliation?.value?.cihZone,
  zoneId: affiliation?.value?.zoneId,
});
const centersLoading = computed(() => state.center.getcentersloading);

const centerOptions = computed(() =>
  state?.center?.centers.map((i) => {
    return {
      label: i.centerName,
      centerId: i.id,
    };
  })
);
const centerObj = ref({
  label: affiliation?.value?.cihAddress,
  centerId: affiliation?.value?.centerId,
});
const formData = reactive({
  activityName: "",
  activityVenue: "",
  summaryOfEvent: "",
  stateOfTheFlock: "",
  activityType: "",
  activityDate: "",

  // zoneName: "string",
  // centerName: "string",
  // zoneId: 0,
  // centerId: 0,
  // center: "",
  // zone: "",

  attendance: {
    adult: null,
    youth: null,
    teenager: null,
    children: null,
    male: null,
    female: null,
  },
});
const formDataSchema = Yup.object().shape({
  activityDate: Yup.date()
    .typeError("Please enter a valid date")
    .required("Date is required"),
  // activityType: Yup.string().required("Type is required"),
  stateOfTheFlock: Yup.string().required("State of Flock is required"),
  summaryOfEvent: Yup.string().required("Summary Of Event is required"),
  activityName: Yup.string().required("Actvity Name is required"),
  attendance: Yup.object().shape({
    adult: Yup.number()
      .typeError("Invalid value")
      .required("Value is required")
      .nullable(),
    youth: Yup.number()
      .typeError("Invalid value")
      .required("Value is required")
      .nullable(),
    teenager: Yup.number()
      .typeError("Invalid value")
      .required("Value is required")
      .nullable(),
    children: Yup.number()
      .typeError("Invalid value")
      .required("Value is required")
      .nullable(),
    male: Yup.number()
      .typeError("Invalid value")
      .required("Value is required")
      .nullable(),
    female: Yup.number()
      .typeError("Invalid value")
      .required("Value is required")
      .nullable(),
  }),
});

const { handleSubmit, setValues, values } = useForm({
  validationSchema: formDataSchema,
  initialValues: formData,
});

const { value: activityName, errorMessage: activityNameError } =
  useField("activityName");

const { value: activityVenue, errorMessage: activityVenueError } =
  useField("activityVenue");

const { value: activityType, errorMessage: activityTypeError } =
  useField("activityType");

const { value: stateOfTheFlock, errorMessage: stateOfTheFlockError } =
  useField("stateOfTheFlock");

const { value: adult, errorMessage: adultError } = useField("attendance.adult");
const { value: youth, errorMessage: youthError } = useField("attendance.youth");
const { value: teenager, errorMessage: teenagerError } = useField(
  "attendance.teenager"
);
const { value: children, errorMessage: childrenError } = useField(
  "attendance.children"
);
const { value: male, errorMessage: maleError } = useField("attendance.male");
const { value: female, errorMessage: femaleError } =
  useField("attendance.female");

const { value: summaryOfEvent, errorMessage: summaryOfEventError } =
  useField("summaryOfEvent");

const { value: activityDate, errorMessage: activityDateError } =
  useField("activityDate");

const onSubmit = handleSubmit((values) => {
  const sum = Object.keys(values.attendance)
    .filter((key) => key !== "male" && key !== "female")
    .reduce((acc, key) => acc + parseInt(values.attendance[key], 10), 0);

  const data = {
    ...values,
    // activityDate: moment(values.activityDate).format("YYYY-MM-DD HH:mm:ss.SSS"),
    cihAttendances: [values.attendance],
    totalAttendee: sum,
    zoneName: zone.value.label,
    centerName: centerObj.value.label,
    zoneId: zone.value.zoneId,
    centerId: centerObj.value.centerId,
  };
  dispatch("addActivityReport", data);
});

// watch(zone, () => {
//   dispatch("getAllCenters", { zoneId: zone.value.zoneId });
// });

watch(centerData, () => {
  console.log(centerData);
  values.activityVenue = centerData?.value?.description;
});
</script>
<style lang=""></style>
