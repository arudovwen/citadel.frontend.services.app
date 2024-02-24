import { DataService } from "@/config/dataService/dataService";
import { urls } from "@/helpers/apI_urls";
// import { cleanObject } from "@/util/cleanObject";

export default {
  state: {
    churchAffiliationsData: null,
    getChurchAffiliationsDataloading: false,
    getChurchAffiliationsDataSuccess: false,
    getChurchAffiliationsDataError: null,
  },
  getters: {},
  mutations: {
    getChurchAffiliationsDataBegin(state) {
      state.getChurchAffiliationsDataloading = true;
      state.getChurchAffiliationsDataSuccess = false;
      state.getChurchAffiliationsDataError = null;
    },

    getChurchAffiliationsDataSuccess(state, data) {
      state.getChurchAffiliationsDataloading = false;
      state.getChurchAffiliationsDataSuccess = true;
      // alert("authProfile:" + JSON.stringify(data));
      const affiliation = {
        ...data,
        affinityGroup: data?.affinityGroup?.filter(
          (item) => item.toLowerCase() !== "none"
        ),
      };
      state.churchAffiliationsData = affiliation;
      localStorage.setItem("affiliationsData", affiliation);
    },

    getChurchAffiliationsDataError(state, err) {
      state.getChurchAffiliationsDataloading = false;
      state.getChurchAffiliationsDataError = err;
      state.getChurchAffiliationsDataSuccess = false;
    },
  },
  actions: {
    //ChurchAffiliation

    async getChurchAffiliationsByAuthUserId({ commit }, id) {
      try {
        commit("getChurchAffiliationsDataBegin");
        const response = await DataService.get(
          `${urls.GET_CHURCH_AFFILIATION_BY_USERID}?id=${id}`
        );
        if (response.status === 200) {
          const churchAffiliationsData = response.data.data;
          // localStorage.setItem(
          //   "churchAffiliationsData",
          //   churchAffiliationsData
          // );

          commit("getChurchAffiliationsDataSuccess", churchAffiliationsData);
        }
      } catch (err) {
        commit("getChurchAffiliationsDataError", err);
      }
    },
  },
};
