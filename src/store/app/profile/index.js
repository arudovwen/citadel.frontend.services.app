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
    childrensData: null,
    getChildrensDataloading: false,
    getChildrensDatasuccess: false,
    getChildrensDataerror: null,
    spouseData: null,
    getSpouseDataloading: false,
    getSpouseDatasuccess: false,
    getSpouseDataerror: null,
    employerData: null,
    getEmployerDataloading: false,
    getEmployerDatasuccess: false,
    getEmployerDataerror: null,
    qualificationData: null,
    getQualificationDataloading: false,
    getQualificationDatasuccess: false,
    getQualificationDataerror: null,
    churchAffiliationsData: null,
    getChurchAffiliationsDataloading: false,
    getChurchAffiliationsDatasuccess: false,
    getChurchAffiliationsDataerror: null,
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

    getChildrensDataBegin(state) {
      state.getChildrensDataloading = true;
      state.getChildrensDatasuccess = false;
      state.getChildrensDataerror = null;
    },

    getChildrensDataSuccess(state, data) {
      state.getChildrensDataloading = false;
      state.getChildrensDatasuccess = true;
      state.childrensData = data;
    },

    getChildrensDataErr(state, err) {
      state.getChildrensDataloading = false;
      state.getChildrensDataerror = err;
      state.getChildrensDatasuccess = false;
    },

    getSpouseDataBegin(state) {
      state.getSpouseDataloading = true;
      state.getSpouseDatasuccess = false;
      state.getSpouseDataerror = null;
    },

    getSpouseDataSuccess(state, data) {
      state.getSpouseDataloading = false;
      state.getSpouseDatasuccess = true;
      state.spouseData = data;
    },

    getSpouseDataErr(state, err) {
      state.getSpouseDataloading = false;
      state.getSpouseDataerror = err;
      state.getSpouseDatasuccess = false;
    },
    getEmployerDataBegin(state) {
      state.getEmployerDataloading = true;
      state.getEmployerDatasuccess = false;
      state.getEmployerDataerror = null;
    },

    getEmployerDataSuccess(state, data) {
      state.getEmployerDataloading = false;
      state.getEmployerDatasuccess = true;
      state.employerData = data;
    },

    getEmployerDataErr(state, err) {
      state.getEmployerDataloading = false;
      state.getEmployerDataerror = err;
      state.getEmployerDatasuccess = false;
    },
    getQualificationDataBegin(state) {
      state.getQualificationDataloading = true;
      state.getQualificationDatasuccess = false;
      state.getQualificationDataerror = null;
    },

    getQualificationDataSuccess(state, data) {
      state.getQualificationDataloading = false;
      state.getQualificationDatasuccess = true;
      state.qualificationData = data;
    },

    getQualificationDataErr(state, err) {
      state.getQualificationDataloading = false;
      state.getQualificationDataerror = err;
      state.getQualificationDatasuccess = false;
    },

    getChurchAffiliationsDataBegin(state) {
      state.getChurchAffiliationsDataloading = true;
      state.getChurchAffiliationsDatasuccess = false;
      state.getChurchAffiliationsDataerror = null;
    },

    getChurchAffiliationsDataSuccess(state, data) {
      state.getChurchAffiliationsDataloading = false;
      state.getChurchAffiliationsDatasuccess = true;
      state.churchAffiliationsData = data;
    },

    getChurchAffiliationsDataErr(state, err) {
      state.getChurchAffiliationsDataloading = false;
      state.getChurchAffiliationsDataerror = err;
      state.getChurchAffiliationsDatasuccess = false;
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
          `${urls.GET_BIODATA_BY_ID}?id=${id}`
        );
        if (response.status === 200) {
          commit("getBiodataSuccess", response.data.data);
        }
      } catch (err) {
        commit("getBiodataErr", err);
      }
    },

    async getChildrenDetailById({ commit }, id) {
      try {
        commit("getChildrensDataBegin");
        const response = await DataService.get(
          `${urls.GET_CHILDREN_DETAIL_BY_ID}?id=${id}`
        );
        if (response.status === 200) {
          commit("getChildrensDataSuccess", response.data.data);
        }
      } catch (err) {
        commit("getChildrensDataErr", err);
      }
    },

    async getSpouseDetailById({ commit }, id) {
      try {
        commit("getSpouseDataBegin");
        const response = await DataService.get(
          `${urls.GET_SPOUSE_DETAIL_BY_ID}?id=${id}`
        );
        if (response.status === 200) {
          commit("getSpouseDataSuccess", response.data.data);
        }
      } catch (err) {
        commit("getSpouseDataErr", err);
      }
    },
    async getEmployerDetailById({ commit }, id) {
      try {
        commit("getEmployerDataBegin");
        const response = await DataService.get(
          `${urls.GET_EMPLOYER_BY_ID}?id=${id}`
        );
        if (response.status === 200) {
          commit("getEmployerDataSuccess", response.data.data);
        }
      } catch (err) {
        commit("getEmployerDataErr", err);
      }
    },

    async getChurchAffiliationsById({ commit }, id) {
      try {
        commit("getChurchAffiliationsDataBegin");
        const response = await DataService.get(
          `${urls.GET_CHURCH_AFFILIATION_BY_ID}?id=${id}`
        );
        if (response.status === 200) {
          commit("getChurchAffiliationsDataSuccess", response.data.data);
        }
      } catch (err) {
        commit("getChurchAffiliationsDataErr", err);
      }
    },

    async getQualificationsById({ commit }, id) {
      try {
        commit("getQualificationDataBegin");
        const response = await DataService.get(
          `${urls.GET_QUALIFICATION_BY_ID}?id=${id}`
        );
        if (response.status === 200) {
          commit("getQualificationDataSuccess", response.data.data);
        }
      } catch (err) {
        commit("getQualificationDataErr", err);
      }
    },
  },
};
