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
      @close="toggleCreateModal"
      title="Send Notification"
      centered
    >
      <form @submit.prevent="onSubmit" class="space-y-4">
        <div class="grid grid-cols-1 gap-5">
          <FormGroup
            label="Notification type"
            name="d1"
            :error="notifyTypeError"
          >
            <Select
              label=""
              :options="filters"
              placeholder="Choose type"
              classInput="bg-white !h-9 min-w-[150px]  !min-h-[36px]"
              v-model="notifyType"
            />
          </FormGroup>
          <FormGroup label="Recipients" name="d1" :error="recipientsError">
            <VueSelect
              label=""
              :options="options"
              placeholder="Choose recipients"
              classInput="bg-white !h-9 min-w-[150px]  !min-h-[36px]"
              v-model="recipients"
              multiple
            />
          </FormGroup>

          <Textinput
            label="Title"
            type="text"
            placeholder="Title"
            name="title"
            v-model.trim="title"
            :error="titleError"
          />
          <div class="assagin space-y-4">
            <Textarea
              label="Message"
              placeholder=""
              v-model="message"
              :error="messageError"
            />
          </div>
          <Checkbox v-model="isScheduled" label="Schedule for later" />
          <FormGroup v-if="isScheduled" label="Schedule Date" name="d1">
            <flat-pickr
              v-model="date"
              class="form-control"
              id="d1"
              placeholder="yyyy, dd M"
              :error="dateError"
            />
          </FormGroup>
          <FormGroup label="Add attachment" name="d1">
            <Fileinput @change="onFileSelected" multiple name="multipule" />
          </FormGroup>
          <!-- <span>files: {{ files }}</span> -->
          <div class="text-right">
            <Button
              :isLoading="loading"
              :disabled="loading"
              text="Send"
              btnClass="btn-dark"
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
import { computed, ref, defineEmits, defineProps } from "vue";
import Select from "@/components/Select";
import VueSelect from "@/components/Select/VueSelect";

defineProps({
  options: {
    default: [],
  },
});
const emits = defineEmits(["close", "refresh"]);
const { state } = useStore();
const isCreateOpen = ref(false);
const files = ref(null);
const isScheduled = ref(false);
const loading = computed(() => state.notification.getNotificationLoading);

const onFileSelected = async (e) => {
  files.value = e.target.files;
};
const schema = yup.object({
  title: yup.string().required("Title is required"),
  message: yup.string().required("Message is required"),
  date: yup.string(),
  notifyType: yup.string().required("Select a notification type"),
  recipients: yup.array().required("Select recipients"),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
});
const filters = [
  {
    label: "SMS",
    value: "sms",
  },

  {
    label: "Email",
    value: "email",
  },
];
const { value: title, errorMessage: titleError } = useField("title");
const { value: message, errorMessage: messageError } = useField("message");
const { value: date, errorMessage: dateError } = useField("date");
const { value: recipients, errorMessage: recipientsError } =
  useField("recipients");
const { value: notifyType, errorMessage: notifyTypeError } =
  useField("notifyType");

const onSubmit = handleSubmit((values) => {
  console.log({ ...values, files: files.value });
  toggleCreateModal();
  emits("refresh");
});
const toggleCreateModal = () => {
  isCreateOpen.value = !isCreateOpen.value;
};
const openNotification = () => {
  toggleCreateModal();
  console.log("Create notification");
};
</script>
<style lang=""></style>
