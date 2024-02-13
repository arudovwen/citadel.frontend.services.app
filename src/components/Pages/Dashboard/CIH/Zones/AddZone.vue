<template>
  <div>
    <Modal
      :activeModal="state.zone.addmodal"
      @close="closeModal"
      title="Create Zone"
      centered
    >
      <form @submit.prevent="addZone" class="space-y-4">
        <Textinput
          label="Name"
          type="text"
          placeholder="Zone Name"
          name="zoneName"
          v-model.trim="zoneName"
          :error="zoneNameError"
        />
        <FormGroup label="Assign coordinator" :error="membersError">
          <VueSelect
            class="min-w-[200px] w-full md:w-auto"
            v-model="members"
            :options="membersOptions"
            placeholder="Select a coordinator"
            name="members"
          />
        </FormGroup>
        <div class="assagin space-y-4">
          <Textarea
            label="Description"
            placeholder="Zone description"
            v-model="description"
            :error="descriptionError"
          />
        </div>

        <div class="text-right mt-4">
          <Button
            :isLoading="loading"
            :disabled="loading"
            text="Add zone"
            btnClass="btn-dark"
          ></Button>
        </div>
      </form>
    </Modal>
  </div>
</template>
<script setup>
import FormGroup from "@/components/FormGroup";
import VueSelect from "@/components/Select/VueSelect";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Textarea from "@/components/Textarea";
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import { useStore } from "vuex";
import * as yup from "yup";
import { useToast } from "vue-toastification";

import { computed, watch, inject } from "vue";

const query = inject("query");
const { state, dispatch } = useStore();
const success = computed(() => state.zone.addZoneSuccess);
const loading = computed(() => state.zone.addZoneLoading);
const toast = useToast();
const schema = yup.object({
  zoneName: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  members: yup.object().nullable(),
});

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
});

const { value: zoneName, errorMessage: zoneNameError } = useField("zoneName");
const { value: description, errorMessage: descriptionError } =
  useField("description");
const { value: members, errorMessage: membersError } = useField("members");
const addZone = handleSubmit((values) => {
  dispatch("addZone", { ...values, userId: members.value });
});

const closeModal = () => {
  dispatch("closeModal");
};

const membersOptions = computed(() =>
  state?.member?.data.map((i) => {
    return {
      label: i.firstName + " " + i.surName,
      value: i.userId,
    };
  })
);
watch(success, () => {
  if (success.value) {
    toast.success("Successfully Created");
    dispatch("getZonesTotal", query);
    resetForm();
    closeModal();
  }

  // getAllZones();
});
</script>
<style lang=""></style>
