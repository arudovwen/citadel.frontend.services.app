import { DataService } from "@/config/dataService/dataService";
import { urls } from "@/helpers/apI_urls";
import { cleanObject } from "@/util/cleanObject";

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

    total: 0,
    events: [],
    loading: false,
    addsuccess: false,
    error: null,
    updateloading: false,
    updatesuccess: false,
    deleteloading: false,
    deletesuccess: false,
  },

  mutations: {
    fetchBegin(state) {
      state.loading = true;
      state.error = null;
      state.fetchsuccess = false;
    },
    fetchSuccess(state, { data, totalCount }) {
      state.loading = false;
      state.success = true;
      state.events = data;
      state.total = totalCount;
    },
    fetchErr(state, err) {
      state.loading = false;
      state.error = err;
      state.success = false;
    },
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
    updateBegin(state) {
      state.updateloading = true;
      state.error = null;
      state.updatesuccess = false;
    },
    updateSuccess(state) {
      state.updateloading = false;
      state.updatesuccess = true;
      state.error = null;
    },
    updateErr(state, err) {
      state.updateloading = false;
      state.error = err;
      state.updatesuccess = false;
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
          `${urls.GET_EVENTS}?${new URLSearchParams(cleanObject(data))}`
        );
        if (response.status === 200) {
          commit("fetchSuccess", response.data.data);
        }
      } catch (err) {
        commit("fetchErr", err);
      }
    },
    async getAllEvents({ commit }, data) {
      try {
        commit("fetchBegin");
        const response = await DataService.get(
          `${urls.GET_ALL_EVENTS}?${new URLSearchParams(cleanObject(data))}`
        );
        if (response.status === 200) {
          commit("fetchSuccess", response.data.data);
        }
      } catch (err) {
        commit("fetchErr", err);
      }
    },

    async addEvent({ commit }, data) {
      try {
        commit("addBegin");
        const response = await DataService.put(
          `${urls.REQUEST_EVENT}?${new URLSearchParams({
            requestType: data.requestType,
          })}`,
          data
        );
        if (response.status === 200) {
          commit("addSuccess");
        }
      } catch (err) {
        commit("addErr", err);
      }
    },
    async updateEventStatus({ commit }, data) {
      try {
        commit("updateBegin");
        const response = await DataService.put(
          `${urls.CHANGE_EVENT_STATUS}?${new URLSearchParams(data)}`,
          data
        );
        if (response.status === 200) {
          commit("updateSuccess");
        }
      } catch (err) {
        commit("updateErr", err);
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
