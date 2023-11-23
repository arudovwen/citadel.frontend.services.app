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
    updateeventloading: false,
    updateventsuccess: false,
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
    updateEventBegin(state) {
      state.updateeventloading = true;
      state.error = null;
      state.updateeventsuccess = false;
    },
    updateEventSuccess(state) {
      state.updateeventloading = false;
      state.updateeventsuccess = true;
      state.error = null;
    },
    updateEventErr(state, err) {
      state.updateeventloading = false;
      state.error = err;
      state.updateeventsuccess = false;
    },
    deleteBegin(state) {
      state.deleteloading = true;
      state.error = null;
      state.deletesuccess = false;
    },
    deleteSuccess(state) {
      state.deleteloading = false;
      state.deletesuccess = true;
      state.error = null;
    },
    deleteErr(state, err) {
      state.deleteloading = false;
      state.error = err;
      state.deletesuccess = false;
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

    async updateEvent({ commit }, data) {
      try {
        commit("updateEventBegin");
        const response = await DataService.put(
          `${urls.UPDATE_EVENT}?${new URLSearchParams(data)}`,
          data
        );
        if (response.status === 200) {
          commit("updateEventSuccess");
        }
      } catch (err) {
        commit("updateEventErr", err);
      }
    },

    // removeEvent
    async removeEvent({ commit }, data) {
      try {
        commit("deleteBegin");
        const response = await DataService.delete(
          `${urls.DELETE_EVENT}?${new URLSearchParams(data)}`,
          data
        );
        if (response.status === 200) {
          commit("deleteSuccess");
        }
      } catch (err) {
        commit("deleteErr", err);
      }
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
