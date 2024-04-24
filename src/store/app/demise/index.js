import { DataService } from "@/config/dataService/dataService";
import { urls } from "@/helpers/apI_urls";
import { cleanObject } from "@/util/cleanObject";

export default {
  state: {
    getDemiseUsersSuccess: false,
    getDemiseUsersLoading: false,
    getDemiseUsersError: null,
    allDemiseUsers: [],
  },
  getters: {
    members: (state) => state.members,
  },
  mutations: {
    getDemiseUsersBegin(state) {
      state.getDemiseUsersLoading = true;
      state.getDemiseUsersError = null;
      state.getUsersSuccess = false;
      // state.data = [];
    },
    getDemiseUsersSuccess(state, { data }) {
      state.getDemiseUsersLoading = false;
      state.getDemiseUsersSuccess = true;
      state.allDemiseUsers = data;
    },
    getDemiseUsersError(state, err) {
      state.getDemiseUsersLoading = false;
      state.getDemiseUsersError = err;
      state.getDemiseUsersSuccess = false;
    },
  },
  actions: {
    async getAllDemiseUsers({ commit }, data) {
      try {
        commit("getDemiseUsersBegin");
        const response = await DataService.get(
          `${urls.GET_ALL_DEMISE_USERS}?${new URLSearchParams(
            cleanObject(data)
          )}`
        );
        if (response.status === 200) {
          commit("getDemiseUsersSuccess", response.data);
        }
      } catch (err) {
        commit("getDemiseUsersError", err);
      }
    },
  },
};
