import { DataService } from "@/config/dataService/dataService";
import { urls } from "@/helpers/apI_urls";
import { cleanObject } from "@/util/cleanObject";

import { useToast } from "vue-toastification";
const toast = useToast();
export default {
  state: {
    addmodal: false,
    isLoading: null,
    // for edit
    editModal: false,
    editName: "",
    editassignto: null,
    editStartDate: null,
    editEndDate: null,
    editcta: null,
    editId: null,
    editdesc: null,

    events: [],
    loading: false,
    addsuccess: false,
    error: null,
  },

  mutations: {
    addBegin(state) {
      state.loading = true;
      state.error = null;
      state.addsuccess = false;
    },
    addSuccess(state) {
      state.loading = false;
      state.addsuccess = true;
      state.error = null;
    },
    addErr(state, err) {
      state.loading = false;
      state.error = err;
      state.addsuccess = false;
    },
    addEvent(state, data) {
      state.isLoading = true;

      setTimeout(() => {
        state.events.unshift(data);
        state.isLoading = false;
        toast.success -
          500("Event added", {
            timeout: 2000,
          });
      }, 1500);
      state.addmodal = false;
    },
    // removeEvent
    removeEvent(state, data) {
      state.events = state.events.filter((item) => item.id !== data.id);
      toast.error("Event Removed", {
        timeout: 2000,
      });
    },
    // updateEvent
    updateEvent(state, data) {
      state.events.findIndex((item) => {
        if (item.id === data.id) {
          // store data
          state.editId = data.id;
          state.editName = data.name;
          state.editassignto = data.assignto;
          state.editStartDate = data.startDate;
          state.editEndDate = data.endDate;
          state.editcta = data.category;
          state.editdesc = data.des;
          state.editModal = !state.editModal;
          // set data to data
          item.name = data.name;
          item.des = data.des;
          item.startDate = data.startDate;
          item.endDate = data.endDate;
          item.assignto = data.assignto;
          item.progress = data.progress;
          item.category = data.category;
        }
      });
    },
    // openEvent
    openEvent(state) {
      state.addmodal = true;
    },
    // closeModal
    closeModal(state) {
      state.addmodal = false;
    },
    // closeEditModal
    closeEditModal(state) {
      state.editModal = false;
    },
  },
  actions: {
    async getEvents({ commit }, data) {
      try {
        commit("fetchBegin");
        const response = await DataService.get(
          `${urls.GET_REQUEST_EVENT}?${new URLSearchParams(cleanObject(data))}`
        );
        if (response.status === 200) {
          commit("fetchSuccess", response.data);
        }
      } catch (err) {
        commit("fetchErr", err);
      }
    },
    async addEvent({ commit }, data) {
      try {
        commit("addBegin");
        const response = await DataService.put(
          `${urls.REQUEST_EVENT}?${new URLSearchParams(data)}`
        );
        if (response.status === 200) {
          commit("addSuccess");
        }
      } catch (err) {
        commit("addErr", err);
      }
    },

    // removeEvent
    removeEvent({ commit }, data) {
      commit("removeEvent", data);
    },
    // updateEvent
    updateEvent({ commit }, data) {
      commit("updateEvent", data);
    },
    // eopen event
    openEvent({ commit }) {
      commit("openEvent");
    },

    closeModal({ commit }) {
      commit("closeModal");
    },
    // closeEditModal
    closeEditModal({ commit }) {
      commit("closeEditModal");
    },
  },
};
