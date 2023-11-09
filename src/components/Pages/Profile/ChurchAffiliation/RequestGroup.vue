<template>
  <Modal
    :activeModal="state.profile.isReqAffinityGroupOpen"
    @close="toggleReqAffinityGroup(false)"
    title="Request Affinity Group"
    centered
  >
    <form @submit.prevent="onSubmit" class="space-y-4">
      <!-- {{ props.affiliation }} -->

      <div class="grid grid-cols-1 gap-4">
        <div>
          <CustomVueSelect
            label="Affinity Group"
            classInput="!h-[40px]"
            v-model.value="affinityGroupObj"
            :modelValue="affinityGroupObj"
            :error="affinityGroupError"
            :options="affinityGroupOptions"
            placeholder="Select affinity group"
            name="Affinity Group"
          />
        </div>
        <!-- <div>
              <Textinput
                label="Reason"
                type="text"
                placeholder="Type your reason"
                name="reason"
                v-model.value="reason"
                :error="reasonError"
                classInput="h-[40px]"
              />
            </div> -->

        <Textarea
          label="Reason"
          placeholder="Reason"
          v-model.value="reason"
          :error="reasonError"
        />

        <button type="submit" class="btn btn-primary block w-full text-center">
          Submit
        </button>
      </div>
    </form>
  </Modal>
</template>
<script setup>
import Textarea from "@/components/Textarea";
// import Textinput from "@/components/Textinput";
import CustomVueSelect from "@/components/Select/CustomVueSelect.vue";
import Modal from "@/components/Modal";
import { useStore } from "vuex";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { onMounted, ref, watch, computed, inject } from "vue";
import { useToast } from "vue-toastification";
// import { defineProps } from "vue";

// const props = defineProps({
//   affiliation: {
//     type: Object,
//     default: null,
//   },
// });
onMounted(() => {
  getAffinityGroups();
});
const { state, dispatch } = useStore();
const affinityGroupObj = ref({
  label: "",
  affinityGroupId: "",
});

const toast = useToast();
const userId = inject("id");
const reqSuccess = computed(() => state.profile.requestToChangeGroupSuccess);
const reqError = computed(() => state.profile.requestToChangeGroupError);

const affinityGroupOptions = computed(() =>
  state?.affinityGroup?.affinityGroups.map((i) => {
    return {
      label: i.affinityGroupName,
      affinityGroupId: i.id,
    };
  })
);
const schema = yup.object({
  affinityGroup: yup.string(),

  reason: yup.string(),
});

const formValues = {
  userId: userId.value,
  affinityGroup: "",
  reason: "",
};

const { handleSubmit, setValues, values, resetForm } = useForm({
  validationSchema: schema,
  initialValues: formValues,
});

const { errorMessage: affinityGroupError } = useField("affinityGroup");

const { value: reason, errorMessage: reasonError } = useField("reason");

const onSubmit = handleSubmit((values) => {
  console.log(values);

  dispatch("requestToChangeGroup", values);
});

const getAffinityGroups = () => {
  dispatch("getAffinityGroups", { pageNumber: 1, pageSize: 10000 });
};
const toggleReqAffinityGroup = (boolean) => {
  dispatch("toggleReqAffinityGroup", boolean);
};

watch(affinityGroupObj, (newValue) => {
  setValues({
    ...values,
    affinityGroup: newValue?.label,
  });
});

watch(reqSuccess, () => {
  if (reqSuccess.value) {
    toast.success("Request successful");
    toggleReqAffinityGroup(false);
    resetForm();
    affinityGroupObj.value = {
      label: "",
      affinityGroupId: "",
    };
  }
});

watch(reqError, () => {
  if (reqError.value) {
    // toast.error("Request failed");
    toggleReqAffinityGroup(false);
    return;
  }
});
</script>
<style lang=""></style>
