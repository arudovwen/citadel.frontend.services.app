<template>
  <div>
    <form @submit.prevent="onSubmit" class="space-y-4 max-w-[700px]">
      <div class="grid grid-cols-1 gap-4">
        <Textinput
          label="Name"
          type="text"
          placeholder="Type name of venue"
          name="name"
          v-model="venueName"
          :error="venueNameError"
          classInput="h-[40px]"
        />
        <Textinput
          label="Location"
          type="text"
          placeholder="Type your location"
          name="location"
          v-model="location"
          :error="locationError"
          classInput="h-[40px]"
        />
        <Textinput
          label="Capacity"
          type="number"
          placeholder="Type your capacity"
          name="capacity"
          v-model="capacity"
          :error="capacityError"
          classInput="h-[40px]"
        />
        <!-- <div class="hidden">
          <div class="gap-4 flex items-end justify-between">
            <div class="flex-1">
              <Textinput
                label="Accessories/Equipment"
                type="text"
                placeholder="Type your accessories"
                name="email"
                v-model="accessories"
                :error="accessoriesError"
                classInput="h-[40px] w-full"
              />
            </div>

            <div
              @click="pushAccessory(accessories)"
              class="rounded px-4 btn-dark btn-sm h-[40px] flex items-center justify-center gap-2"
            >
              <Icon icon="heroicons-outline:plus" />
            </div>
          </div>

          <div class="mt-4">
            <ol>
              <li
                class="text-sm mb-2"
                v-for="(item, idx) in listOfAccessories"
                :key="item"
              >
                <div class="flex items-center justify-between gap-4">
                  <span> {{ item }}</span>
                  <div
                    @click="removeAccessory(idx)"
                    class="inline-flex items-center justify-center h-10 w-10 bg-danger-500 text-lg border rounded border-danger-500 text-white"
                  >
                    <Icon icon="heroicons-outline:trash" />
                  </div>
                </div>
              </li>
            </ol>
          </div>
        </div> -->

        <Textarea
          label="Description"
          type="text"
          placeholder="Type your description"
          name="description"
          v-model="description"
          :error="descriptionError"
          classInput="h-[40px]"
        />

        <div class="flex gap-4 items-center">
          <SwitchGroup as="div" class="flex items-center gap-4">
            <SwitchLabel as="span" class="text-sm">
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

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
        <!-- <div class="hidden sm:block"></div> -->
        <Button
          :isLoading="loading"
          :disabled="loading"
          type="submit"
          btnClass=" btn-dark "
        >
          Save Changes
        </Button>
      </div>
    </form>
  </div>
</template>

<script setup>
// import Icon from "@/components/Icon";
import Button from "@/components/Button";
import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";
import Textinput from "@/components/Textinput";
import Textarea from "@/components/Textarea";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { inject, ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";

const { state, dispatch } = useStore();
const toast = useToast();
const isOnline = ref(false);
const success = computed(() => state.venue.addVenueSuccess);
const loading = computed(() => state.venue.addVenueLoading);
const userId = inject("userId");
const query = inject("query");
// Define a validation schema
const schema = yup.object({
  venueName: yup.string().required("Name is required"),
  location: yup.string().required("Location is required"),
  capacity: yup.number(),
  description: yup.string(),
  // accessories: yup.string(),
});

// const listOfAccessories = ref([]);
// const pushAccessory = (accessory) => {
//   if (accessory.length > 0) {
//     listOfAccessories.value.push(accessory);
//   }
// };

// const removeAccessory = (idx) => {
//   console.log(idx);
//   listOfAccessories.value.splice(idx, 1);
// };

const formValues = {
  venueName: "",
  location: "",
  capacity: 0,
  description: "",
  // accessories: "dashcode@gmail.com",
};

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});
// No need to define rules for fields

const { value: venueName, errorMessage: venueNameError } =
  useField("venueName");
const { value: location, errorMessage: locationError } = useField("location");
const { value: capacity, errorMessage: capacityError } = useField("capacity");
// const { value: accessories, errorMessage: accessoriesError } =
//   useField("accessories");
const { value: description, errorMessage: descriptionError } =
  useField("description");

const onSubmit = handleSubmit((values) => {
  const data = {
    userId: userId.value,
    isOnline: isOnline.value,
    ...values,
  };
  dispatch("addVenue", data);
});

const closeModal = () => {
  dispatch("closeVenueModal");
  resetForm();
  isOnline.value = false;
};

watch(success, () => {
  if (success.value) {
    toast.success("Successfully Created");
    dispatch("getVenues", query);
  }

  closeModal();
});
</script>

<style lang="scss" scoped></style>
