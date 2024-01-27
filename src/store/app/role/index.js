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
    getModulesLoading: false,
    getModulesSuccess: false,
    getModulesError: null,
    getPermissionsLoading: false,
    getPermissionsSuccess: false,
    getPermissionsError: null,
    editRoleLoading: false,
    editRoleSuccess: false,
    editRoleError: null,
    role: null,
    roles: [],
    modules: [],
    permissions: [],
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
    getModulesBegin(state) {
      state.getModulesLoading = true;
      state.getModulesSuccess = false;
      state.getModulesError = null;
    },

    getModulesSuccess(state, data) {
      state.getModulesLoading = false;
      state.getModulesSuccess = true;
      state.modules = data?.data;
    },

    getModulesError(state, err) {
      state.getModulesLoading = false;
      state.getModulesSuccess = false;
      state.getModulesError = err;
    },
    getPermissionsBegin(state) {
      state.getPermissionsLoading = true;
      state.getPermissionsSuccess = false;
      state.getPermissionsError = null;
    },

    getPermissionsSuccess(state, data) {
      state.getPermissionsLoading = false;
      state.getPermissionsSuccess = true;
      state.permissions = data?.data;
    },

    getPermissionsError(state, err) {
      state.getPermissionsLoading = false;
      state.getPermissionsSuccess = false;
      state.getPermissionsError = err;
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
        commit("addRoleBegin");
        const response = await DataService.post(
          urls.CREATE_ROLE_WITH_PERMISSIONS,
          data
        );

        if (response.status === 200) {
          commit("addRoleSuccess");
        }
      } catch (err) {
        commit("addRoleError", err);
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

    async getModulesList({ commit }) {
      try {
        commit("getModulesBegin");
        const response = await DataService.get(`${urls.GET_PLATFORM_MODULES}`);

        if (response.status === 200) {
          commit("getModulesSuccess", response.data);
        }
      } catch (err) {
        commit("getModulesError", err);
      }
    },
    async getPermissionsList({ commit }) {
      try {
        commit("getRoleBegin");
        const response = await DataService.get(
          `${urls.GET_PLATFORM_PERMISSIONS}`
        );

        if (response.status === 200) {
          commit("getPermissionsSuccess", response.data);
        }
      } catch (err) {
        commit("getPermissionsError", err);
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
