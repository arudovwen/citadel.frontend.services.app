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
    </div>

    <div class="text-right space-x-3 mt-12">
      <Button
        @click="props.toggleView"
        type="submit"
        text="Submit"
        btnClass="btn-dark"
      />
    </div>
  </form>
</template>
<script setup>
import FormGroup from "@/components/FormGroup";
import VueSelect from "@/components/Select/VueSelect";
import { onMounted, reactive, computed, defineProps } from "vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import Button from "@/components/Button";
import { useStore } from "vuex";
// import Textinput from "@/components/Textinput";
const props = defineProps(["toggleView"]);
onMounted(() => {
  getVenues();
});
const { state, dispatch } = useStore();
const query = reactive({
  pageNumber: 1,
  pageSize: 25,
  searchParameter: "",
  sortOrder: "",
});
const formData = reactive({
  surname: "",
  firstname: "",
  middlename: "",
  venue: "",
  phoneNumber: "",
  emailAddress: "",
});
const formDataSchema = yup.object().shape({
  venue: yup.object().required("Please select a venue"),
});

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

// const { value: emailAddress, errorMessage: emailAddressError } =
//   useField("emailAddress");

// const { value: surname, errorMessage: surnameError } = useField("surname");
// const { value: firstname, errorMessage: firstnameError } =
//   useField("firstname");
// const { value: middlename, errorMessage: middlenameError } =
//   useField("middlename");
const { value: venue, errorMessage: venueError } = useField("venue");
// const { value: gender, errorMessage: genderError } = useField("gender");

// const { value: phoneNumber, errorMessage: phoneNumberError } =
//   useField("phoneNumber");

const onSubmit = handleSubmit((values) => {
  console.log("🚀 ~ file: member-add.vue:163 ~ onSubmit ~ values:", values);
});
</script>
<style lang=""></style>
