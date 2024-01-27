// import { v4 as uuidv4 } from "uuid";
// import { useToast } from "vue-toastification";
import { DataService } from "@/config/dataService/dataService";
import { urls } from "@/helpers/apI_urls";
// import { cleanObject } from "@/util/cleanObject";
// const toast = useToast();
export default {
  state: {
    roleModal: false,
    addRoleLoading: false,
    addRoleSuccess: false,
    addRoleError: null,
    getRoleLoading: false,
    getRoleSuccess: false,
    getRoleError: null,
    editRoleLoading: false,
    editRoleSuccess: false,
    editRoleError: null,
    role: null,
    roles: [],
    total: 0,
  },
  getters: {
    roles: (state) => state.roles,
  },
  mutations: {
    getRoleBegin(state) {
      state.getRoleLoading = true;
      state.getRoleSuccess = false;
      state.getRoleError = null;
    },

    getRoleSuccess(state, data) {
      state.getRoleLoading = false;
      state.getRoleSuccess = true;
      state.roles = data;
    },

    getRoleError(state, err) {
      state.getRoleLoading = false;
      state.getRoleSuccess = false;
      state.getRoleError = err;
    },
    addRoleBegin(state) {
      state.addRoleLoading = true;
      state.addRoleSuccess = false;
      state.addRoleError = null;
    },

    addRoleSuccess(state) {
      state.addRoleLoading = false;
      state.addRoleSuccess = true;
    },

    addRoleError(state, err) {
      state.addRoleLoading = false;
      state.addRoleSuccess = false;
      state.addRoleError = err;
    },

    editRoleBegin(state) {
      state.editRoleLoading = true;
      state.editRoleSuccess = false;
      state.editRoleError = null;
    },

    editRoleSuccess(state) {
      state.editRoleLoading = false;
      state.editRoleSuccess = true;
    },

    editRoleError(state, err) {
      state.editRoleLoading = false;
      state.editRoleSuccess = false;
      state.editRoleError = err;
    },

    openRoleModal(state, data) {
      state.roleModal = true;
      state.role = data;
    },

    closeRoleModal(state) {
      state.roleModal = false;
    },
  },
  actions: {
    async addRole({ commit }, data) {
      try {
        commit("addZoneBegin");
        const response = await DataService.post(urls.CREATE_ZONE, data);

        if (response.status === 200) {
          commit("addZoneSuccess");
        }
      } catch (err) {
        commit("addZoneError", err);
      }
    },
    async getRolesList({ commit }) {
      try {
        commit("getRoleBegin");
        const response = await DataService.get(`${urls.GET_USER_ROLES}`);

        if (response.status === 200) {
          commit("getRoleSuccess", response.data);
        }
      } catch (err) {
        commit("getRoleError", err);
      }
    },

    async updateRole({ commit }, data) {
      try {
        commit("updateZoneBegin");
        const response = await DataService.put(urls.UPDATE_ZONE, data);

        if (response.status === 200) {
          commit("updateZoneSuccess", response.data.data);
        }
      } catch (err) {
        commit("updateZoneError", err);
      }
    },

    async deleteRole({ commit }, id) {
      try {
        commit("deleteZoneBegin");
        const response = await DataService.delete(
          `${urls.DELETE_ZONE}?id=${id}`
        );

        if (response.status === 200) {
          commit("deleteZoneSuccess", response.data.data);
        }
      } catch (err) {
        commit("deleteZoneError", err);
      }
    },

    //open edit modal
    openRoleModal({ commit }, data) {
      commit("openRoleModal", data);
    },
    // eopen zone
    openZone({ commit }) {
      commit("openZone");
    },

    closeRoleModal({ commit }) {
      commit("closeRoleModal");
    },
  },
};
