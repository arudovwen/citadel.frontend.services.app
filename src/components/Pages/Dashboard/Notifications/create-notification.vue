<template>
  <div>
    <div>
      <Button
        icon="heroicons-outline:plus"
        text="Send Notification"
        btnClass="btn-primary btn-sm dark:bg-slate-800  h-min text-sm font-normal"
        iconClass="text-lg"
        @click="openNotification"
        :isLoading="false"
      />
    </div>

    <Modal
      :activeModal="isCreateOpen"
      @close="() => {}"
      title="Send Notification"
      centered
      :canCancel="false"
    >
      <form @submit.prevent="onSubmit" class="space-y-4">
        <div class="grid grid-cols-1 gap-y-6">
          <Textinput
            label="Title"
            type="text"
            placeholder="Title"
            name="title"
            v-model.trim="title"
            :error="titleError"
            class="flex-1"
          />
          <!-- </div> -->
          <FormGroup label="Recipients" name="d1" :error="userIdError">
            <VueSelect
              label=""
              :options="options"
              placeholder="Choose recipients"
              classInput="bg-white !h-10 min-w-[150px]  !min-h-[36px]"
              v-model="userId"
              multiple
              :reduce="(option) => option.value"
            />
            <div class="mt-1 max-w-max">
              <Checkbox v-model="isSelectAll" label="Select all recipients" />
            </div>
          </FormGroup>

          <div class="assagin space-y-4">
            <Textarea
              label="Message"
              placeholder=""
              v-model="message"
              :error="messageError"
            />
          </div>
          <FormGroup label="Add attachment" name="d1">
            <Fileinput @change="onFileSelected" name="file" />
          </FormGroup>
          <FormGroup label="" name="isScheduled" :error="isScheduledError">
            <Checkbox v-model="isScheduled" label="Schedule for later" />
          </FormGroup>
          <FormGroup
            v-if="isScheduled"
            :error="scheduledDateError"
            label="Schedule Date"
            name="d1"
          >
            <flat-pickr
              v-model="scheduledDate"
              :config="config"
              class="form-control"
              id="d1"
              placeholder="yyyy, dd M"
            />
          </FormGroup>

          <!-- <span>files: {{ files }}</span> -->
          <div class="text-right flex gap-x-5 justify-end">
            <Button
              text="Cancel"
              btnClass="btn-outline-secondary btn-sm"
              @click="toggleCreateModal"
              type="button"
            />
            <Button
              :isLoading="addloading"
              :disabled="addloading"
              text="Send"
              btnClass="btn-dark btn-sm"
              type="submit"
            ></Button>
          </div>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import Checkbox from "@/components/Checkbox";
import Button from "@/components/Button";
import Fileinput from "@/components/Fileinput";
import Modal from "@/components/Modal";
import FormGroup from "@/components/FormGroup";
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import Textarea from "@/components/Textarea";
import Textinput from "@/components/Textinput";
import { useStore } from "vuex";
import { computed, ref, defineEmits, defineProps, watch } from "vue";
// import Select from "@/components/Select";
import VueSelect from "@/components/Select/VueSelect";

const props = defineProps({
  options: {
    default: [],
  },
});
const emits = defineEmits(["close", "refresh"]);
// eslint-disable-next-line no-unused-vars
const { state, dispatch } = useStore();
const isCreateOpen = ref(false);
const file = ref(null);
const success = computed(() => state.notification.addNotificationSuccess);
const addloading = computed(() => state.notification.addNotificationLoading);

const onFileSelected = async (e) => {
  file.value = e.target.files[0];
};
const schema = yup.object({
  title: yup.string().required("Title is required"),
  message: yup.string().required("Message is required"),
  scheduledDate: yup
    .date()
    .typeError("Scheduled date is required")
    .when("isScheduled", {
      is: true,
      then: (schema) => schema.required("Scheduled date is required"),
      otherwise: (schema) => schema.nullable(),
    }),
  userId: yup
    .array()
    .typeError("Select recipients")
    .required("Select recipients"),
  isScheduled: yup.boolean(),
});

const initValues = {
  title: "",
  message: "",
  scheduledDate: null,
  userId: "",
  notityType: 10,
  isScheduled: false,
};
const { handleSubmit, setFieldValue } = useForm({
  validationSchema: schema,
  initialValues: initValues,
});
// const filters = [
//   {
//     label: "SMS",
//     value: "sms",
//   },

//   {
//     label: "Email",
//     value: "email",
//   },
// ];
const { value: title, errorMessage: titleError } = useField("title");
const { value: message, errorMessage: messageError } = useField("message");
const { value: scheduledDate, errorMessage: scheduledDateError } =
  useField("scheduledDate");
const { value: isScheduled, errorMessage: isScheduledError } =
  useField("isScheduled");
const { value: userId, errorMessage: userIdError } = useField("userId");

const onSubmit = handleSubmit((values) => {
  const formData = new FormData();
  formData.append("title", values.title);
  formData.append("message", values.message);
  formData.append("userId", JSON.stringify(values.userId)); // Convert array to string
  formData.append("isScheduled", values.isScheduled ? "true" : "false");
  if (values.isScheduled) {
    formData.append("scheduledDate", values.scheduledDate); // Convert date to ISO string
    formData.append("status", "2"); // Set status to 2 if scheduled
  } else {
    formData.append("status", "1"); // Set status to 1 if not scheduled
  }
  formData.append("file", file.value);

  dispatch("sendNotification", formData);
});

const toggleCreateModal = () => {
  isCreateOpen.value = !isCreateOpen.value;
};
const openNotification = () => {
  toggleCreateModal();
};
const isSelectAll = ref(false);
watch(isSelectAll, () => {
  if (isSelectAll.value) {
    setFieldValue(
      "userId",
      props.options.map((i) => i.value)
    );
  } else {
    setFieldValue("userId", []);
  }
});
watch(success, () => {
  if (success.value) {
    toggleCreateModal();
    emits("refresh");
  }
});
const config = ref({ enableTime: true, minDate: "today" });
</script>
<style lang=""></style>
