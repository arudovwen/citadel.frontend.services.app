// // import { v4 as uuidv4 } from "uuid";
// import { useToast } from "vue-toastification";
import { DataService } from "@/config/dataService/dataService";
import { urls } from "@/helpers/apI_urls";
import { cleanObject } from "@/util/cleanObject";
// const toast = useToast();
export default {
  state: {
    isLoading: null,
    //create
    addModal: false,
    addVenueLoading: false,
    addVenueSuccess: false,
    addVenueError: null,

    //edit
    editModal: false,
    updateVenueLoading: false,
    updateVenueSuccess: false,
    updateVenueError: null,
    //read
    getVenueLoading: false,
    getVenueSuccess: false,
    getVenueError: null,
    //delete
    deleteVenueLoading: false,
    deleteVenueSuccess: false,
    deleteVenueError: null,
    venue: null,

    venues: [],
    total: 0,
  },
  getters: {},
  mutations: {
    addVenueBegin(state) {
      state.addVenueLoading = true;
      state.addVenueSuccess = false;
      state.addVenueError = null;
    },

    addVenueSuccess(state) {
      state.addVenueLoading = false;
      state.addVenueSuccess = true;
    },

    addVenueError(state, err) {
      state.addVenueLoading = false;
      state.addVenueSuccess = false;
      state.addVenueError = err;
    },

    getVenuesBegin(state) {
      state.getVenuesLoading = true;
      state.getVenuesSuccess = false;
      state.getVenuesError = null;
    },
    getVenuesSuccess(state, { data, totalCount }) {
      state.getVenuesLoading = false;
      state.getVenuesSuccess = true;
      state.getVenuesError = null;
      state.venues = data;
      state.total = totalCount;
    },
    getVenuesError(state, err) {
      state.getVenuesLoading = false;
      state.getVenuesSuccess = false;
      state.getVenuesError = err;
    },

    updateVenueBegin(state) {
      state.updateVenueLoading = true;
      state.updateVenueSuccess = false;
      state.updateVenueError = null;
    },
    updateVenueSuccess(state) {
      state.updateVenueLoading = false;
      state.updateVenueSuccess = true;
      state.updateVenueError = null;
    },
    updateVenueError(state, err) {
      state.updateVenueLoading = false;
      state.updateVenueSuccess = false;
      state.updateVenueError = err;
    },
    deleteVenueBegin(state) {
      state.deleteVenueLoading = true;
      state.deleteVenueSuccess = false;
      state.deleteVenueError = null;
    },
    deleteVenueSuccess(state) {
      state.deleteVenueLoading = false;
      state.deleteVenueSuccess = true;
      state.deleteVenueError = null;
    },
    deleteVenueError(state, err) {
      state.deleteVenueLoading = false;
      state.deleteVenueSuccess = false;
      state.deleteVenueError = err;
    },

    //open edit Venue
    openVenueEditModal(state, data) {
      state.editModal = true;
      state.venue = data;
    },

    // openVenueModal
    openVenueModal(state) {
      state.addModal = true;
    },
    // closeVenueModal
    closeVenueModal(state) {
      state.addModal = false;
    },
    // closeVenueEditModal
    closeVenueEditModal(state) {
      state.editModal = false;
    },
  },
  actions: {
    async addVenue({ commit }, data) {
      try {
        commit("addVenueBegin");
        const response = await DataService.post(urls.CREATE_VENUE, data);

        if (response.status === 200) {
          commit("addVenueSuccess");
        }
      } catch (err) {
        commit("addVenueError", err);
      }
    },
    async getVenues({ commit }, data) {
      try {
        commit("getVenuesBegin");
        const response = await DataService.get(
          `${urls.GET_ALL_VENUES}?${new URLSearchParams(cleanObject(data))}`
        );

        if (response.status === 200) {
          commit("getVenuesSuccess", response.data);
        }
      } catch (err) {
        commit("getVenuesError", err);
      }
    },

    async updateVenue({ commit }, data) {
      try {
        commit("updateVenueBegin");
        const response = await DataService.put(urls.UPDATE_VENUE, data);

        if (response.status === 200) {
          commit("updateVenueSuccess", response.data.data);
        }
      } catch (err) {
        commit("updateVenueError", err);
      }
    },

    async deleteVenue({ commit }, id) {
      try {
        commit("deleteVenueBegin");
        const response = await DataService.delete(
          `${urls.DELETE_VENUE}?id=${id}`
        );

        if (response.status === 200) {
          commit("deleteVenueSuccess", response.data.data);
        }
      } catch (err) {
        commit("deleteVenueError", err);
      }
    },
    // removeVenue
    removeVenue({ commit }, data) {
      commit("removeVenue", data);
    },
    // updateVenue

    //open edit modal
    openVenueEditModal({ commit }, data) {
      commit("openVenueEditModal", data);
    },
    // eopen Venue
    openVenueModal({ commit }) {
      commit("openVenueModal");
    },

    closeVenueModal({ commit }) {
      commit("closeVenueModal");
    },
    // closeVenueEditModal
    closeVenueEditModal({ commit }) {
      commit("closeVenueEditModal");
    },
  },
};
