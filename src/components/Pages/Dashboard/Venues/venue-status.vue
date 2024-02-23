<template>
  <!-- <Card> -->
  <form @submit.prevent="onSubmit" class="space-y-4 max-w-[500px]">
    <div class="grid grid-cols-1 gap-4">
      <div class="flex gap-4 items-center">
        <SwitchGroup as="div" class="flex items-center gap-4">
          <SwitchLabel as="span" class="text-base">
            <span class="input-label">Is Online</span>
          </SwitchLabel>

          <Switch
            v-model="isOnline"
            class="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-0"
          >
            <span class="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              class="pointer-events-none absolute h-full w-full rounded-md bg-white"
            />
            <span
              aria-hidden="true"
              :class="[
                isOnline ? 'bg-indigo-500' : 'bg-gray-200',
                'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out',
              ]"
            />
            <span
              aria-hidden="true"
              :class="[
                isOnline ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 active:ring-0 transition-transform duration-200 ease-in-out outline-none ring-transparent',
              ]"
            />
          </Switch>
        </SwitchGroup>
      </div>
    </div>

    <div class="flex items-center gap-4 pt-6">
      <!-- <div class="hidden sm:block"></div> -->
      <!-- <Button
        text="Cancel"
        btnClass="btn-outline-secondary btn-sm "
        @click="closeModal()"
      /> -->
      <span
        @click="closeModal()"
        class="text-xs border py-[8px] px-8 rounded-md max-w-max"
        >Cancel</span
      >
      <Button
        :isLoading="loading"
        :disabled="loading"
        type="submit"
        btnClass="btn-dark btn-sm"
      >
        Confirm
      </Button>
    </div>
  </form>
  <!-- </Card> -->
</template>

<script setup>
// import Icon from "@/components/Icon";
import Button from "@/components/Button";

import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
import { inject, computed, ref, watch, defineProps } from "vue";
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";
const props = defineProps(["closeVenueModal"]);

const { state, dispatch } = useStore();
const toast = useToast();

const success = computed(() => state.venue.updateVenueSuccess);
const loading = computed(() => state.venue.updateVenueLoading);
const venue = computed(() => state.venue.venue);
const isOnline = ref(venue.value?.isOnline);
const userId = inject("userId");
const query = inject("query");

// Define a validation schema
const schema = yup.object({
  venueName: yup.string().required("Name is required"),
  location: yup.string().required("Location is required"),
  capacity: yup.number(),
  description: yup.string(),
  accessories: yup.array(),
});

const { handleSubmit, setValues } = useForm({
  validationSchema: schema,
  initialValues: venue.value,
});
// No need to define rules for fields

const { value: accessories } = useField("accessories");

const prepareDetails = (data) => {
  const obj = {
    userId: data.userId,
    venueName: data.venueName,
    description: data.description,
    capacity: data.capacity,
    location: data.location,
    isOnline: data.isOnline,
    id: data.id,
    accessories: data.accessories,
  };

  return obj;
};

const onSubmit = handleSubmit((values) => {
  const updatedAccessories = accessories.value.map((i) => {
    return {
      accessoryName: i.accessoryName,
      description: i.description,
      userId: i.userId,
      id: i.id,
      venueId: venue.value.id,
    };
  });
  const data = {
    ...values,
    accessories: updatedAccessories,
    userId: userId.value,
    isOnline: isOnline.value,
  };

  dispatch("updateVenue", prepareDetails(data));
});

const closeModal = () => {
  props.closeVenueModal();

  isOnline.value = false;
};

watch(success, () => {
  if (success.value) {
    toast.success("Successfully Updated");
    dispatch("getVenues", query);
    closeModal();
  }

  // closeModal();
});
watch(venue, () => {
  setValues({
    ...venue.value,
    isOnline: venue.value.isOnline,
  });
  isOnline.value = venue.value.isOnline;
});
</script>

<style lang="scss" scoped></style>
