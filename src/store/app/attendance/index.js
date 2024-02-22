import { v4 as uuidv4 } from "uuid";
import { useToast } from "vue-toastification";
import { DataService } from "@/config/dataService/dataService";
import { urls } from "@/helpers/apI_urls";
// import { cleanObject } from "@/util/cleanObject";
const toast = useToast();
export default {
  state: {
    addmodal: false,
    isLoading: null,
    addLoading: false,
    addSuccess: false,
    addError: null,

    getCIHStatsLoading: false,
    getCIHStatsSuccess: false,
    getCIHStatsError: null,
    // for edit
    editModal: false,
    editName: "",
    editassignto: null,
    editStartDate: null,
    editEndDate: null,
    editcta: null,
    editId: null,
    editdesc: null,

    attendances: [
      {
        id: uuidv4(),
        assignto: [
          {
            image: require("@/assets/images/avatar/av-1.svg"),
            title: "Mahedi Amin",
          },
          {
            image: require("@/assets/images/avatar/av-2.svg"),
            title: "Sovo Haldar",
          },
          {
            image: require("@/assets/images/avatar/av-2.svg"),
            title: "Rakibul Islam",
          },
        ],
        name: "Welfare",
        des: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
        startDate: "2022-10-03",
        endDate: "2022-10-06",
        progress: 75,
        category: [
          {
            value: "team",
            label: "team",
          },
          {
            value: "low",
            label: "low",
          },
        ],
      },
      {
        id: uuidv4(),
        assignto: [
          {
            image: require("@/assets/images/avatar/av-1.svg"),
            title: "Mahedi Amin",
          },
          {
            image: require("@/assets/images/avatar/av-2.svg"),
            title: "Sovo Haldar",
          },
          {
            image: require("@/assets/images/avatar/av-2.svg"),
            title: "Rakibul Islam",
          },
        ],
        name: "Sanitation ",
        des: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
        startDate: "2022-10-03",
        endDate: "2022-10-10",
        progress: 50,

        category: [
          {
            value: "team",
            label: "team",
          },
          {
            value: "low",
            label: "low",
          },
        ],
      },
    ],
    CIHStats: null,
  },
  getters: {
    attendances: (state) => state.attendances,
  },
  mutations: {
    addBegin(state) {
      state.addLoading = true;
      state.addSuccess = false;
      state.addError = null;
    },

    addSuccess(state) {
      state.addLoading = false;
      state.addSuccess = true;
    },

    addError(state, err) {
      state.addLoading = false;
      state.addSuccess = false;
      state.addError = err;
    },

    getCIHStatsBegin(state) {
      state.getCIHStatsLoading = true;
      state.getCIHStatsSuccess = false;
      state.getCIHStatsError = null;
    },

    getCIHStatsSuccess(state, data) {
      state.getCIHStatsLoading = false;
      state.getCIHStatsSuccess = true;
      state.CIHStats = data?.data;
    },

    getCIHStatsError(state, err) {
      state.getCIHStatsLoading = false;
      state.getCIHStatsSuccess = false;
      state.getCIHStatsError = err;
    },

    //

    // addAttendance(state, data) {
    //   state.isLoading = true;

    //   setTimeout(() => {
    //     state.attendances.unshift(data);
    //     state.isLoading = false;
    //     toast.success -
    //       500("Attendance added", {
    //         timeout: 2000,
    //       });
    //   }, 1500);
    //   state.addmodal = false;
    // },
    // removeAttendance
    removeAttendance(state, data) {
      state.attendances = state.attendances.filter(
        (item) => item.id !== data.id
      );
      toast.error("Attendance Removed", {
        timeout: 2000,
      });
    },
    // updateAttendance
    updateAttendance(state, data) {
      state.attendances.findIndex((item) => {
        if (item.id === data.id) {
          // store data
          state.editId = data.id;
          state.editName = data.name;
          state.editassignto = data.assignto;
          state.editStartDate = data.startDate;
          state.editEndDate = data.endDate;
          state.editcta = data.category;
          state.editdesc = data.des;
          state.editModal = !state.editModal;
          // set data to data
          item.name = data.name;
          item.des = data.des;
          item.startDate = data.startDate;
          item.endDate = data.endDate;
          item.assignto = data.assignto;
          item.progress = data.progress;
          item.category = data.category;
        }
      });
    },
    // openAttendance
    openAttendance(state) {
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
    async createAttendance({ commit }, data) {
      try {
        commit("addBegin");
        const response = await DataService.post(
          urls.CREATE_AFFINITY_GROUP,
          data
        );

        if (response.status === 200) {
          commit("addSuccess");
        }
      } catch (err) {
        commit("addError", err);
      }
    },
    async getCIHStats({ commit }, centerId) {
      try {
        commit("getCIHStatsBegin");
        const response = await DataService.get(
          `${urls.GET_CIH_STATS}?CenterId=${centerId}`
        );

        if (response.status === 200) {
          commit("getCIHStatsSuccess", response.data);
        }
      } catch (err) {
        commit("getCIHStatsError", err);
      }
    },
    addAttendance({ commit }, data) {
      commit("addAttendance", data);
    },
    // removeAttendance
    removeAttendance({ commit }, data) {
      commit("removeAttendance", data);
    },
    // updateAttendance
    updateAttendance({ commit }, data) {
      commit("updateAttendance", data);
    },
    // eopen attendance
    openAttendance({ commit }) {
      commit("openAttendance");
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
