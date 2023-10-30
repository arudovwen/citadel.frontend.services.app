import { DataService } from "@/config/dataService/dataService";
import { urls } from "@/helpers/apI_urls";
export default {
  state: {
    //personal Info
    creatingProfile: false,
    profileCreated: false,
    createProfileError: null,
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
  },
};
