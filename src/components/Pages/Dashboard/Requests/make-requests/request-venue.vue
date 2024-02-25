<template>
  <form @submit.prevent="onSubmit">
    <div class="flex flex-col gap-y-5">
      <FormGroup label="Venue" :error="venueError">
        <VueSelect
          class="min-w-[200px] w-full md:w-auto"
          v-model="venue"
          :options="venueOptions"
          placeholder="Select a venue"
          name="venue"
        />
      </FormGroup>
      <FormGroup label="Date of usage" name="date" :error="dateOfUsageError">
        <flat-pickr
          v-model="dateOfUsage"
          class="form-control"
          id="d1"
          placeholder="Select date of event"
          :config="config"
        />
      </FormGroup>
      <div class="assagin space-y-4">
        <Textarea
          label="Purpose Of Usage"
          placeholder="purpose of visit"
          v-model="purposeOfUsage"
          :error="purposeOfUsageError"
        />
      </div>
    </div>

    <div class="text-right space-x-3 mt-12">
      <Button
        :isLoading="loading"
        :disabled="loading"
        type="submit"
        text="Submit"
        btnClass="btn-dark"
      />
    </div>
  </form>
</template>
<script setup>
import Textarea from "@/components/Textarea";
import FormGroup from "@/components/FormGroup";
import VueSelect from "@/components/Select/VueSelect";
import { onMounted, reactive, computed, defineProps, watch } from "vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import Button from "@/components/Button";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";

// import Textinput from "@/components/Textinput";
const props = defineProps(["toggleView", "refetch"]);
onMounted(() => {
  getVenues();
});
const toast = useToast();

const { state, dispatch } = useStore();
const loading = computed(() => state.venue.requestVenueLoading);
const userId = computed(() => state.auth.userData.id);
const success = computed(() => state.venue.requestVenueSuccess);
const error = computed(() => state.venue.requestVenueError);
const query = reactive({
  pageNumber: 1,
  pageSize: 25,
  searchParameter: "",
  sortOrder: "",
});
const formData = reactive({
  venue: "",
  purposeOfUsage: "",
  dateOfUsage: "",
});
const formDataSchema = yup.object().shape({
  venue: yup.object().required("Please select a venue"),
  purposeOfUsage: yup.string().required("Purpose of usage is required"),
  dateOfUsage: yup
    .date()
    .typeError("Please enter a valid date")
    .required("Date of usage is required"),
});
const config = { enableTime: false, minDate: "today" };

const venueOptions = computed(() => {
  return state?.venue?.venues
    ?.filter((venue) => venue.isOnline == true)
    .map((venue) => {
      return {
        value: venue.id,
        label: venue.venueName,
      };
    });
});

const getVenues = () => {
  dispatch("getVenues", query);
};

const { handleSubmit } = useForm({
  validationSchema: formDataSchema,
  initialValues: formData,
});

const { value: venue, errorMessage: venueError } = useField("venue");
const { value: purposeOfUsage, errorMessage: purposeOfUsageError } =
  useField("purposeOfUsage");
const { value: dateOfUsage, errorMessage: dateOfUsageError } =
  useField("dateOfUsage");

const onSubmit = handleSubmit((values) => {
  const payload = {
    userId: userId.value,
    ...values,
    venue: values.venue.label,
  };
  console.log("🚀 ~ file: member-add.vue:163 ~ onSubmit ~ values:", payload);
  dispatch("requestVenue", payload);
});

watch(success, () => {
  success.value && toast.success("Request sent");
  props.refetch();
  props.toggleView();
});
watch(error, () => {
  // error.value && toast.success("Request sent");
  if (error.value) {
    props.toggleView();
  }
});
</script>
<style lang=""></style>
