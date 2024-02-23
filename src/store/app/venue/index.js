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
    modal: false,
    addVenueLoading: false,
    addVenueSuccess: false,
    addVenueError: null,
    requestVenueLoading: false,
    requestVenueSuccess: false,
    requestVenueError: null,

    //edit
    editModal: false,
    updateVenueLoading: false,
    updateVenueSuccess: false,
    updateVenueError: null,
    //read
    getVenuesLoading: false,
    getVenuesSuccess: false,
    getVenuesError: null,
    getVenueRequestsLoading: false,
    getVenueRequestsSuccess: false,
    getVenueRequestsError: null,
    getVenueByIdLoading: false,
    getVenueByIdSuccess: false,
    getVenueByIdError: null,
    //delete
    deleteVenueLoading: false,
    deleteVenueSuccess: false,
    deleteVenueError: null,
    venue: null,

    venues: [],
    venueRequests: [],
    total: 0,
    totalRequestCount: 0,
  },
  getters: {},
  mutations: {
    requestVenueBegin(state) {
      state.requestVenueLoading = true;
      state.requestVenueSuccess = false;
      state.requestVenueError = null;
    },

    requestVenueSuccess(state) {
      state.requestVenueLoading = false;
      state.requestVenueSuccess = true;
    },

    requestVenueError(state, err) {
      state.requestVenueLoading = false;
      state.requestVenueSuccess = false;
      state.requestVenueError = err;
    },
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
    getVenueRequestsBegin(state) {
      state.getVenueRequestsLoading = true;
      state.getVenueRequestsSuccess = false;
      state.getVenueRequestsError = null;
    },
    getVenueRequestsSuccess(state, { data, totalCount }) {
      state.getVenueRequestsLoading = false;
      state.getVenueRequestsSuccess = true;
      state.getVenueRequestsError = null;
      state.venueRequests = data;
      state.totalRequestCount = totalCount;
    },
    getVenueRequestsError(state, err) {
      state.getVenueRequestsLoading = false;
      state.getVenueRequestsSuccess = false;
      state.getVenueRequestsError = err;
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

    getVenueByIdBegin(state) {
      state.getVenueByIdLoading = true;
      state.getVenueByIdSuccess = false;
      state.getVenueByIdError = null;
    },
    getVenueByIdSuccess(state, data) {
      state.getVenueByIdLoading = false;
      state.getVenueByIdSuccess = true;
      state.getVenueByIdError = null;
      state.venue = { ...state.venue, ...data };
    },
    getVenueByIdError(state, err) {
      state.getVenueByIdLoading = false;
      state.getVenueByIdSuccess = false;
      state.getVenueByIdError = err;
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
    openVenueModal(state, data) {
      state.venue = data;
      state.modal = true;
    },
    // closeVenueModal
    closeVenueModal(state) {
      state.modal = false;
    },
    // closeVenueEditModal
    closeVenueEditModal(state) {
      state.editModal = false;
    },
  },
  actions: {
    async getVenueRequests({ commit }, data) {
      try {
        commit("getVenueRequestsBegin");
        const response = await DataService.get(
          `${urls.GET_ALL_VENUE_REQUESTS}?${new URLSearchParams(
            cleanObject(data)
          )}`
        );

        if (response.status === 200) {
          commit("getVenueRequestsSuccess", response.data);
        }
      } catch (err) {
        commit("getVenueRequestsError", err);
      }
    },
    async requestVenue({ commit }, data) {
      try {
        commit("requestVenueBegin");
        const response = await DataService.put(
          `${urls.REQUEST_FOR_VENUE}?${new URLSearchParams(cleanObject(data))}`,
          data
        );
        if (response.status === 200) {
          commit("requestVenueSuccess");
        }
      } catch (err) {
        commit("requestVenueError", err);
      }
    },
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

    async getVenueById({ commit }, id) {
      try {
        commit("getVenueByIdBegin");
        const response = await DataService.get(
          `${urls.GET_VENUE_BY_ID}?id=${id}`
        );

        if (response.status === 200) {
          commit("getVenueByIdSuccess", response.data.data);
        }
      } catch (err) {
        commit("getVenueByIdError", err);
      }
    },

    async updateVenue({ commit }, data) {
      try {
        commit("updateVenueBegin");
        const response = await DataService.put(urls.UPDATE_VENUE, data);

        if (response.status === 200) {
          console.log(
            "Succesful update venue: " + JSON.stringify(response.data.data)
          );
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

    //open edit modal
    openVenueEditModal({ commit }, data) {
      commit("openVenueEditModal", data);
    },
    // eopen Venue
    openVenueModal({ commit }, data = null) {
      commit("openVenueModal", data);
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
