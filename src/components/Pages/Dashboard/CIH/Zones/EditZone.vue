<template>
  <div>
    <Modal
      :activeModal="state.zone.editModal"
      @close="closeModal"
      title="Edit Zone"
      centered
    >
      <form @submit.prevent="updateZone" class="space-y-4">
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

        <div class="text-right">
          <Button
            :isLoading="loading"
            :disabled="loading"
            text="Update zone"
            btnClass="btn-dark"
          ></Button>
        </div>
      </form>
    </Modal>
  </div>
</template>
<script setup>
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Textarea from "@/components/Textarea";
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import { useStore } from "vuex";
import * as yup from "yup";
import { computed, watch, inject } from "vue";
import { useToast } from "vue-toastification";
import FormGroup from "@/components/FormGroup";
import VueSelect from "@/components/Select/VueSelect";

const { state, dispatch } = useStore();
const zone = computed(() => state.zone.zone);
const success = computed(() => state.zone.updateZoneSuccess);
const loading = computed(() => state.zone.updateZoneLoading);
const toast = useToast();
const query = inject("query");
const schema = yup.object({
  zoneName: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  members: yup.object().typeError("Invalid value").nullable(),
});
const { handleSubmit, setValues, resetForm } = useForm({
  validationSchema: schema,
  initialValues: zone.value,
});
const { value: zoneName, errorMessage: zoneNameError } = useField("zoneName");
const { value: description, errorMessage: descriptionError } =
  useField("description");
const { value: members, errorMessage: membersError } = useField("members");
// const { value: category, errorMessage: errorCategory } = useField("category");

const updateZone = handleSubmit((values) => {
  dispatch("updateZone", { ...values, userId: members.value.value });
});

const closeModal = () => {
  dispatch("closeEditModal");
};

watch(zone, () => {
  setValues({
    ...zone.value,

    members: {
      label: zone.value.coordinator,
      value: zone.value.userId,
    },
  });
});

const membersOptions = computed(() =>
  state?.member?.allUsers?.map((i) => {
    return {
      label: i.firstName + " " + i.lastName,
      value: i.userId,
    };
  })
);
watch(success, () => {
  if (success.value) {
    toast.success("Successfully Updated");
    dispatch("getZonesTotal", query);
    resetForm();
    closeModal();
  } else {
    closeModal();
  }

  // getAllZones();
});
</script>
<style lang="scss">
.vs__dropdown-menu {
  max-height: 114px !important;
}
</style>
