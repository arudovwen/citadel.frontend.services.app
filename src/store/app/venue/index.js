import { useToast } from "vue-toastification";
import { DataService } from "@/config/dataService/dataService";
import { urls } from "@/helpers/apI_urls";
import { cleanObject } from "@/util/cleanObject";

const toast = useToast();
export default {
  state: {
    addmodal: false,
    total: 0,
    loading: false,
    isLoading: null,
    fetchsuccess: false,
    deletesuccess: false,
    getsuccess: false,
    addsuccess: false,
    updatesuccess: false,
    // for edit
    editModal: false,
    editName: "",
    editassignto: null,
    editStartDate: null,
    editEndDate: null,
    editcta: null,
    editId: null,
    editdesc: null,
    venue: null,
    venues: [],
  },
  getters: {
    venues: (state) => state.venues,
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
      state.venues = data;
      state.total = totalCount;
    },
    fetchErr(state, err) {
      state.loading = false;
      state.error = err;
      state.success = false;
    },
    updateBegin(state) {
      state.loading = true;
      state.error = null;
      state.updatesuccess = false;
    },
    updateSuccess(state) {
      state.loading = false;
      state.updatesuccess = true;
    },
    updateErr(state, err) {
      state.loading = false;
      state.error = err;
      state.updatesuccess = false;
    },
    deleteBegin(state) {
      state.loading = true;
      state.error = null;
      state.deletesuccess = false;
    },
    deleteSuccess(state) {
      state.loading = false;
      state.deletesuccess = true;
    },
    deleteErr(state, err) {
      state.loading = false;
      state.error = err;
      state.deletesuccess = false;
    },
    addBegin(state) {
      state.loading = true;
      state.error = null;
      state.addsuccess = false;
    },
    addSuccess(state) {
      state.loading = false;
      state.addsuccess = true;
    },
    addErr(state, err) {
      state.loading = false;
      state.error = err;
      state.addsuccess = false;
    },
    //
    addVenue(state, data) {
      state.isLoading = true;

      setTimeout(() => {
        state.venues.unshift(data);
        state.isLoading = false;
        toast.success -
          500("Venue added", {
            timeout: 2000,
          });
      }, 1500);
      state.addmodal = false;
    },
    // removeVenue
    removeVenue(state, data) {
      state.venues = state.venues.filter((item) => item.id !== data.id);
      toast.error("Venue Removed", {
        timeout: 2000,
      });
    },
    // updateVenue
    updateVenue(state, data) {
      state.venue = data;
      state.editModal = true;
    },
    // openVenue
    openVenue(state) {
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
    async getVenues({ commit }, data) {
      try {
        commit("fetchBegin");
        const response = await DataService.get(
          `${urls.GET_ALL_VENUE}?${new URLSearchParams(cleanObject(data))}`
        );
        if (response.status === 200) {
          commit("fetchSuccess", response.data);
        }
      } catch (err) {
        commit("fetchErr", err);
      }
    },
    async getVenuesTotal({ commit }, data) {
      try {
        commit("fetchBegin");
        const response = await DataService.get(
          `${urls.GET_ALL_VENUE_TOTAL}?${new URLSearchParams(
            cleanObject(data)
          )}`
        );
        if (response.status === 200) {
          commit("fetchSuccess", response.data);
        }
      } catch (err) {
        commit("fetchErr", err);
      }
    },

    async getVenueById({ commit }, id) {
      try {
        commit("getBegin");
        const response = await DataService.get(
          `${urls.GET_VENUE_BY_ID}?id=${id}`
        );
        if (response.status === 200) {
          commit("getSuccess", response.data.data);
        }
      } catch (err) {
        commit("getErr", err);
      }
    },
    async addVenue({ commit }, data) {
      try {
        commit("addBegin");
        const response = await DataService.post(urls.CREATE_VENUE, data);
        if (response.status === 200) {
          commit("addSuccess");
        }
      } catch (err) {
        commit("addErr", err);
      }
    },
    // removeVenue
    async removeVenue({ commit }, id) {
      try {
        commit("deleteBegin");
        const response = await DataService.delete(
          `${urls.DELETE_VENUE}?id=${id}`
        );
        if (response.status === 200) {
          commit("deleteSuccess");
        }
      } catch (err) {
        commit("deleteErr", err);
      }
    },
    async editVenue({ commit }, data) {
      try {
        commit("updateBegin");
        const response = await DataService.put(`${urls.UPDATE_VENUE}`, data);
        if (response.status === 200) {
          commit("updateSuccess");
        }
      } catch (err) {
        commit("updateErr", err);
      }
    },
    // updateVenue
    updateVenue({ commit }, data) {
      commit("updateVenue", data);
    },
    // eopen venue
    openVenue({ commit }) {
      commit("openVenue");
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
