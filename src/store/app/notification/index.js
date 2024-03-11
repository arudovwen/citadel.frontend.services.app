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
    addNotificationLoading: false,
    addNotificationSuccess: false,
    addNotificationError: null,

    //edit
    editModal: false,
    updateNotificationLoading: false,
    updateNotificationSuccess: false,
    updateNotificationError: null,
    //read
    getNotificationLoading: false,
    getNotificationSuccess: false,
    getNotificationError: null,

    getNotificationByIdLoading: false,
    getNotificationByIdSuccess: false,
    getNotificationByIdError: null,
    //delete
    deleteNotificationLoading: false,
    deleteNotificationSuccess: false,
    deleteNotificationError: null,
    notification: null,

    notifications: [],
    total: 0,
  },
  getters: {},
  mutations: {
    addNotificationBegin(state) {
      state.addNotificationLoading = true;
      state.addNotificationSuccess = false;
      state.addNotificationError = null;
    },

    addNotificationSuccess(state) {
      state.addNotificationLoading = false;
      state.addNotificationSuccess = true;
      state.addNotificationError = null;
    },

    addNotificationError(state, err) {
      state.addNotificationLoading = false;
      state.addNotificationSuccess = false;
      state.addNotificationError = err;
    },

    getNotificationsBegin(state) {
      state.getNotificationsLoading = true;
      state.getNotificationsSuccess = false;
      state.getNotificationsError = null;
    },
    getNotificationsSuccess(state, { data, totalCount }) {
      state.getNotificationsLoading = false;
      state.getNotificationsSuccess = true;
      state.getNotificationsError = null;
      state.notifications = data;
      state.total = totalCount;
    },
    getNotificationsError(state, err) {
      state.getNotificationsLoading = false;
      state.getNotificationsSuccess = false;
      state.getNotificationsError = err;
    },

    getNotificationByIdBegin(state) {
      state.getNotificationByIdLoading = true;
      state.getNotificationByIdSuccess = false;
      state.getNotificationByIdError = null;
    },
    getNotificationByIdSuccess(state, { data }) {
      state.getNotificationByIdLoading = false;
      state.getNotificationByIdSuccess = true;
      state.getNotificationByIdError = null;
      state.notification = data;
    },
    getNotificationByIdError(state, err) {
      state.getNotificationByIdLoading = false;
      state.getNotificationByIdSuccess = false;
      state.getNotificationByIdError = err;
    },

    updateNotificationBegin(state) {
      state.updateNotificationLoading = true;
      state.updateNotificationSuccess = false;
      state.updateNotificationError = null;
    },
    updateNotificationSuccess(state) {
      state.updateNotificationLoading = false;
      state.updateNotificationSuccess = true;
      state.updateNotificationError = null;
    },
    updateNotificationError(state, err) {
      state.updateNotificationLoading = false;
      state.updateNotificationSuccess = false;
      state.updateNotificationError = err;
    },
    deleteNotificationBegin(state) {
      state.deleteNotificationLoading = true;
      state.deleteNotificationSuccess = false;
      state.deleteNotificationError = null;
    },
    deleteNotificationSuccess(state) {
      state.deleteNotificationLoading = false;
      state.deleteNotificationSuccess = true;
      state.deleteNotificationError = null;
    },
    deleteNotificationError(state, err) {
      state.deleteNotificationLoading = false;
      state.deleteNotificationSuccess = false;
      state.deleteNotificationError = err;
    },

    //open edit Notification
    openNotificationEditModal(state, data) {
      state.editModal = true;
      state.notification = data;
    },

    // toggleAddNotification
    toggleAddNotification(state) {
      state.addModal = !state.addModal;
    },
    // closeAddNotificationModal
    closeAddNotificationModal(state) {
      state.addModal = false;
    },
    // closeNotificationEditModal
    closeNotificationEditModal(state) {
      state.editModal = false;
    },
  },
  actions: {
    async addNotification({ commit }, data) {
      try {
        commit("addNotificationBegin");
        const response = await DataService.post(urls.NOTIFICATIONS, data);

        if (response.status === 200) {
          commit("addNotificationSuccess");
        }
      } catch (err) {
        commit("addNotificationError", err);
      }
    },
    async getNotifications({ commit }, data) {
      try {
        commit("getNotificationsBegin");
        const response = await DataService.get(
          `${urls.NOTIFICATIONS}?${new URLSearchParams(cleanObject(data))}`
        );

        if (response.status === 200) {
          commit("getNotificationsSuccess", response.data);
        }
      } catch (err) {
        commit("getNotificationsError", err);
      }
    },

    async getNotificationById({ commit }, id) {
      try {
        commit("getNotificationByIdBegin");
        const response = await DataService.get(
          `${urls.GET_ACCESSORY_BY_ID}?id=${id}`
        );

        if (response.status === 200) {
          commit("getNotificationByIdSuccess", response.data);
        }
      } catch (err) {
        commit("getNotificationByIdError", err);
      }
    },

    async updateNotification({ commit }, data) {
      try {
        commit("updateNotificationBegin");
        const response = await DataService.put(urls.UPDATE_ACCESSORY, data);

        if (response.status === 200) {
          commit("updateNotificationSuccess", response.data.data);
        }
      } catch (err) {
        commit("updateNotificationError", err);
      }
    },

    async deleteNotification({ commit }, id) {
      try {
        commit("deleteNotificationBegin");
        const response = await DataService.delete(
          `${urls.DELETE_ACCESSORY}?id=${id}`
        );

        if (response.status === 200) {
          commit("deleteNotificationSuccess", response.data.data);
        }
      } catch (err) {
        commit("deleteNotificationError", err);
      }
    },
    // removeNotification
    removeNotification({ commit }, data) {
      commit("removeNotification", data);
    },
    // updateNotification

    //open edit modal
    openNotificationEditModal({ commit }, data) {
      commit("openNotificationEditModal", data);
    },
    // eopen Notification
    toggleAddNotification({ commit }) {
      commit("toggleAddNotification");
    },

    closeAddNotificationModal({ commit }) {
      commit("closeAddNotificationModal");
    },
    // closeNotificationEditModal
    closeNotificationEditModal({ commit }) {
      commit("closeNotificationEditModal");
    },
  },
};
