<template>
  <form @submit.prevent="onSubmit">
    <div class="flex gap-2 flex-col">
      <!-- <span>CenterTiUpdate: {{ centerToUpdate }}</span>
      <span>values: {{ values }}</span> -->
    </div>
    <Card>
      <div class="flex flex-col gap-y-6">
        <Textinput
          label="Name"
          type="text"
          v-model="centerName"
          :error="centerNameError"
          placeholder="Enter a name"
        />
        <VueSelect
          label="Zone"
          class="min-w-[200px] w-full md:w-auto"
          v-model.value="zone"
          :options="zoneOptions"
          placeholder="Select zone"
          name="zone"
          :error="zoneIdError"
        />
        <div class="assagin space-y-4">
          <Textarea
            label="Description"
            placeholder="Zone description"
            v-model="description"
            :error="descriptionError"
          />
        </div>
      </div>

      <div class="text-right space-x-3 mt-8">
        <Button
          :isLoading="loading"
          :disabled="loading"
          type="submit"
          text="Update record"
          btnClass="btn-dark w-full"
        />
      </div>
    </Card>
  </form>
</template>
<script setup>
import { watch, computed, inject } from "vue";
import { useField, useForm } from "vee-validate";
import VueSelect from "@/components/Select/VueSelect";
import * as yup from "yup";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Textinput from "@/components/Textinput";
import { useStore } from "vuex";
import Textarea from "@/components/Textarea";
import { useToast } from "vue-toastification";

const { state, dispatch } = useStore();
const toast = useToast();
const closeModal = inject("closeModal");
const zoneOptions = inject("zoneOptions");
const initialQueryValue = inject("initialValue");
const success = computed(() => state.center.updateCenterSuccess);
const loading = computed(() => state.center.updateCenterLoading);
const centerToUpdate = computed(() => state.center.centerToUpdate);

const schema = yup.object().shape({
  centerName: yup.string().required("Name is required"),
  zoneId: yup.string().required("Select a zone"),
  description: yup.string().required("Please provide a short description"),
});

// eslint-disable-next-line no-unused-vars
const { handleSubmit, values, setValues } = useForm({
  validationSchema: schema,
  initialValues: {
    ...centerToUpdate.value,
    zone: zoneOptions.value.find(
      (i) => i.zoneId === centerToUpdate.value.zoneId
    ),
  },
});

const { value: centerName, errorMessage: centerNameError } =
  useField("centerName");
const { value: zone, errorMessage: zoneIdError } = useField("zone");

const { value: description, errorMessage: descriptionError } =
  useField("description");

const onSubmit = handleSubmit((values) => {
  dispatch("updateCenter", {
    id: values.id,
    userId: "string",
    zoneId: values.zone.zoneId,
    centerName: values.centerName,
    description: values.description,
  });
});

// watch(centerToUpdate, () => {
//   setValues({
//     ...centerToUpdate.value,
//     zoneId: centerToUpdate.value.zoneId,
//   });
// });

watch(success, () => {
  if (success.value) {
    toast.success("Successfully updated");
    dispatch("getAllCenters", initialQueryValue);
    closeModal();
  }
});
</script>
<style lang=""></style>
