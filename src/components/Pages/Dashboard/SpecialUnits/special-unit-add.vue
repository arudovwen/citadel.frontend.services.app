<template>
  <form @submit.prevent="onSubmit">
    <Card noborder className="border-none shadow-none" bodyClass="p-2" title="">
      <div class="grid grid-cols-1 gap-5">
        <Textinput
          label="Name"
          type="text"
          placeholder="Unit Name"
          name="unitName"
          v-model.trim="unitName"
          :error="unitNameError"
        />
        <div class="assagin space-y-4">
          <Textarea
            label="Description"
            placeholder="Ministry description"
            v-model="description"
            :error="descriptionError"
          />
        </div>

        <div class="text-right">
          <Button
            :isLoading="loading"
            :disabled="loading"
            text="Add special unit"
            btnClass="btn-dark"
          ></Button>
        </div>
      </div>
    </Card>
  </form>
</template>
<script setup>
import Button from "@/components/Button";
import Card from "@/components/Card";
import Textarea from "@/components/Textarea";
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import { useStore } from "vuex";
import * as yup from "yup";
import { useToast } from "vue-toastification";

import { computed, watch } from "vue";

const { state } = useStore();
const success = computed(() => state.zone.addZoneSuccess);
const loading = computed(() => state.zone.addZoneLoading);
const toast = useToast();
const schema = yup.object({
  unitName: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
});

const { value: unitName, errorMessage: unitNameError } = useField("unitName");
const { value: description, errorMessage: descriptionError } =
  useField("description");

const onSubmit = handleSubmit((values) => {
  console.log(values);
  // dispatch("addZone", values);
});

const closeModal = () => {
  // dispatch("closeModal");
};

watch(success, () => {
  if (success.value) {
    toast.success("Successfully Created");
  }

  closeModal();

  // getAllZones();
});
</script>
<style lang=""></style>
