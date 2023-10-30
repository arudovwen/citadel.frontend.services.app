import { DataService } from "@/config/dataService/dataService";
import { urls } from "@/helpers/apI_urls";
export default {
  state: {
    //personal Info
    biodata: null,
    creatingProfile: false,
    profileCreated: false,
    createProfileError: null,
    getBiodataloading: false,
    getBiodatasuccess: false,
    getBiodataerror: null,
  },
  getters: {
    creatingProfile(state) {
      return state.creatingProfile;
    },
    profileCreated(state) {
      return state.profileCreated;
    },
    createProfileError(state) {
      return state.createProfileError;
    },
  },
  mutations: {
    creatingProfile(state) {
      state.creatingProfile = true;
      state.profileCreated = false;
      state.createProfileError = false;
    },
    profileCreated(state) {
      state.creatingProfile = false;
      state.profileCreated = true;
      state.createProfileError = false;
    },
    createProfileError(state, err) {
      state.creatingProfile = false;
      state.profileCreated = false;
      state.createProfileError = err;
    },
    getBiodataBegin(state) {
      state.getBiodataloading = true;
      state.getBiodatasuccess = false;
      state.getBiodataerror = null;
    },

    getBiodataSuccess(state, data) {
      state.getBiodataloading = false;
      state.getBiodatasuccess = true;
      state.biodata = data;
    },

    getBiodataErr(state, err) {
      state.getBiodataloading = false;
      state.getBiodataerror = err;
      state.getBiodatasuccess = false;
    },
  },
  actions: {
    async createProfile({ commit }, data) {
      try {
        commit("creatingProfile");
        const response = await DataService.post(urls.CREATE_BIODATA, data);
        if (response.status === 200) {
          commit("profileCreated");
          console.log("SuccessResponse:" + response);
        }
      } catch (err) {
        commit("createProfileError", err);
      }
    },
    async getBiodataById({ commit }, id) {
      try {
        commit("getBiodataBegin");
        const response = await DataService.get(
          `${urls.GET_BIODATA_BY_ID}?Id=${id}`
        );
        if (response.status === 200) {
          commit("getBiodataSuccess", response.data.data);
        }
      } catch (err) {
        commit("getBiodataErr", err);
      }
    },
  },
};
