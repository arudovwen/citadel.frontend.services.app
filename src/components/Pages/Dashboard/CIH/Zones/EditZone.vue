<template>
  <div>
    <Modal
      :activeModal="store.state.zone.editModal"
      @close="closeModal"
      title="Edit Zone"
      centered
    >
      <form @submit.prevent="addZone" class="space-y-4">
        <Textinput
          label="Name"
          type="text"
          placeholder="Zone Name"
          name="name"
          v-model.trim="name"
          :error="nameError"
        />
        <div class="assagin space-y-4">
          <Textarea
            label="Description"
            placeholder="Zone description"
            v-model="desc"
            :error="descoError"
          />
        </div>

        <div class="text-right">
          <Button text="Update zone" btnClass="btn-dark"></Button>
        </div>
      </form>
    </Modal>
  </div>
</template>
<script setup>
import Button from "@/components/Button";
// import FormGroup from "@/components/FormGroup";
import Modal from "@/components/Modal";
// import VueSelect from "@/components/Select/VueSelect";
import Textarea from "@/components/Textarea";
import Textinput from "@/components/Textinput";
import { v4 as uuidv4 } from "uuid";
import { useField, useForm } from "vee-validate";
// import vSelect from "vue-select";
import { useStore } from "vuex";
import * as yup from "yup";
// import { assignOption } from "@/constant/data";
let store = useStore();

const schema = yup.object({
  name: yup.string().required("Title is required"),
  desc: yup.string().required("Description is required"),
});
const { handleSubmit } = useForm({
  validationSchema: schema,
});
const { value: name, errorMessage: nameError } = useField("name");
const { value: desc, errorMessage: descoError } = useField("desc");

// const { value: category, errorMessage: errorCategory } = useField("category");

const addZone = handleSubmit(() => {
  store.dispatch("addZone", {
    id: uuidv4(),
    name: "",
    desc: "",
  });
});

const closeModal = () => {
  store.dispatch("closeEditModal");
};
</script>
<style lang=""></style>
