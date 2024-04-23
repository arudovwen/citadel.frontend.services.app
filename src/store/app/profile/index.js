import { DataService } from "@/config/dataService/dataService";
import { urls } from "@/helpers/apI_urls";
import { cleanObject } from "@/util/cleanObject";

export default {
  state: {
    //personal Info

    //post methods
    total: 0,
    biodata: null,
    allbiodata: [],
    allOutreach: [],
    outreachReport: null,
    outreach: null,
    creatingProfile: false,
    profileCreated: false,
    createProfileError: null,
    isReqDepartmentOpen: false,
    isReqZoneOpen: false,
    isReqAffinityGroupOpen: false,
    createChildrenDataloading: false,
    createChildrenDataSuccess: false,
    createChildrenDataerror: null,

    allCihRoles: [],
    getAllCihRolesLoading: false,
    getAllCihRolesSuccess: false,
    getAllCihRolesError: false,

    uploadFileLoading: false,
    uploadFileSuccess: false,
    uploadFileError: null,

    updateQualificationDataloading: false,
    updateQualificationDataSuccess: false,
    updateQualificationDataError: null,

    updateEmployerDataloading: false,
    updateEmployerDataSuccess: false,
    updateEmployerDataerror: null,

    updateSpouseDataloading: false,
    updateSpouseDataSuccess: false,
    updateSpouseDataerror: null,

    getAllOutreachReportloading: false,
    getAllOutreachReportsuccess: false,
    getAllOutreachReporterror: null,

    updateChildrenDataloading: false,
    updateChildrenDataSuccess: false,
    updateChildrenDataerror: null,

    updateChurchAffiliationDataloading: false,
    updateChurchAffiliationDataSuccess: false,
    updateChurchAffiliationDataerror: null,
    qualificationDetails: null,

    requestToJoinDeptLoading: false,
    requestToJoinDeptSuccess: false,
    requestToJoinDeptError: null,

    requestToChangeZoneLoading: false,
    requestToChangeZoneSuccess: false,
    requestToChangeZoneError: null,

    addOutreachRequestLoading: false,
    addOutreachRequestSuccess: false,
    addOutreachRequestError: null,

    editOutreachRequestLoading: false,
    editOutreachRequestSuccess: false,
    editOutreachRequestError: null,

    createOutreachReportLoading: false,
    createOutreachReportSuccess: false,
    createOutreachReportError: null,

    deleteOutreachReportLoading: false,
    deleteOutreachReportSuccess: false,
    deleteOutreachReportError: null,

    deleteOutreachRequestLoading: false,
    deleteOutreachRequestSuccess: false,
    deleteOutreachRequestError: null,

    editOutreachReportLoading: false,
    editOutreachReportSuccess: false,
    editOutreachReportError: null,

    requestToChangeGroupLoading: false,
    requestToChangeGroupSuccess: false,
    requestToChangeGroupError: null,
    //get
    getAllBiodataloading: false,
    getAllBiodatasuccess: false,
    getAllBiodataerror: false,
    getBiodatasuccess: false,
    getBiodataerror: null,
    childDetails: null,
    childrensData: null,
    getChildrensDataloading: false,
    getChildrensDataSuccess: false,
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
    deleteloading: false,
    deletesuccess: false,
    deleteChildDataloading: false,
    deleteChildDataSuccess: false,
    deleteChildDataError: null,

    deleteQualificationLoading: false,
    deleteQualificationSuccess: false,
    deleteQualificationError: null,
    firstTimerStatsLoading: false,
    firstTimerStatsSuccess: false,
    firstTimerStatsError: null,
    firstTimerStats: null,

    //edit modal
    editModal: false,
    deleteModal: false,

    // approve/rejectOutreach
    approveOrRejectOutreachLoading: false,
    approveOrRejectOutreachSuccess: false,
    approveOrRejectOutreachError: null,
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
    firstTimerStatsBegin(state) {
      state.firstTimerStatsLoading = true;
      state.firstTimerStatsSuccess = false;
      state.firstTimerStatsError = null;
    },

    firstTimerStatsSuccess(state, data) {
      state.firstTimerStatsLoading = false;
      state.firstTimerStatsSuccess = true;
      state.firstTimerStatsError = null;
      state.firstTimerStats = data ? data : [];
    },

    firstTimerStatsFailure(state, err) {
      state.firstTimerStatsLoading = false;
      state.firstTimerStatsSuccess = false;
      state.firstTimerStatsError = err;
    },

    approveOrRejectOutreachBegin(state) {
      state.approveOrRejectOutreachLoading = true;
      state.approveOrRejectOutreachSuccess = false;
      state.approveOrRejectOutreachError = null;
    },

    approveOrRejectOutreachSuccess(state) {
      state.approveOrRejectOutreachLoading = false;
      state.approveOrRejectOutreachSuccess = true;
      state.approveOrRejectOutreachError = null;
    },

    approveOrRejectOutreachFailure(state, err) {
      state.approveOrRejectOutreachLoading = false;
      state.approveOrRejectOutreachSuccess = false;
      state.approveOrRejectOutreachError = err;
    },

    uploadFileBegin(state) {
      state.uploadFileLoading = true;
      state.uploadFileSuccess = false;
      state.uploadFileError = null;
    },
    uploadFileSuccess(state) {
      state.uploadFileLoading = false;
      state.uploadFileSuccess = true;
      state.uploadFileError = null;
    },
    uploadFileError(state, err) {
      state.uploadFileLoading = false;
      state.uploadFileSuccess = false;
      state.uploadFileError = err;
    },

    deleteQualificationBegin(state) {
      state.deleteQualificationLoading = true;
      state.deleteQualificationError = null;
      state.deleteQualificationSuccess = false;
    },
    deleteQualificationSuccess(state) {
      state.deleteQualificationLoading = false;
      state.deleteQualificationSuccess = true;
    },
    deleteQualificationError(state, err) {
      state.deleteQualificationLoading = false;
      state.deleteQualificationError = err;
      state.deleteQualificationSuccess = false;
    },
    deleteBegin(state) {
      state.deleteloading = true;
      state.error = null;
      state.deletesuccess = false;
    },
    deleteSuccess(state) {
      state.deleteloading = false;
      state.deletesuccess = true;
    },
    deleteErr(state, err) {
      state.deleteloading = false;
      state.error = err;
      state.deletesuccess = false;
    },
    //post
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

    requestToJoinDeptBegin(state) {
      state.requestToJoinDeptLoading = true;
      state.requestToJoinDeptSuccess = false;
      state.requestToJoinDeptError = null;
    },

    requestToJoinDeptSuccess(state) {
      state.requestToJoinDeptLoading = false;
      state.requestToJoinDeptSuccess = true;
      state.requestToJoinDeptError = null;
    },
    requestToJoinDeptError(state, err) {
      state.requestToJoinDeptLoading = false;
      state.requestToJoinDeptSuccess = false;
      state.requestToJoinDeptError = err;
    },
    requestToChangeZoneBegin(state) {
      state.requestToChangeZoneLoading = true;
      state.requestToChangeZoneSuccess = false;
      state.requestToChangeZoneError = null;
    },

    requestToChangeZoneSuccess(state) {
      state.requestToChangeZoneLoading = false;
      state.requestToChangeZoneSuccess = true;
      state.requestToChangeZoneError = null;
    },
    requestToChangeZoneError(state, err) {
      state.requestToChangeZoneLoading = false;
      state.requestToChangeZoneSuccess = false;
      state.requestToChangeZoneError = err;
    },

    requestToChangeGroupBegin(state) {
      state.requestToChangeGroupLoading = true;
      state.requestToChangeGroupSuccess = false;
      state.requestToChangeGroupError = null;
    },

    requestToChangeGroupSuccess(state) {
      state.requestToChangeGroupLoading = false;
      state.requestToChangeGroupSuccess = true;
      state.requestToChangeGroupError = null;
    },
    requestToChangeGroupError(state, err) {
      state.requestToChangeGroupLoading = false;
      state.requestToChangeGroupSuccess = false;
      state.requestToChangeGroupError = err;
    },

    updateQualificationDataBegin(state) {
      state.updateQualificationDataloading = true;
      state.updateQualificationDataSuccess = false;
      state.updateQualificationDataError = null;
    },

    updateQualificationDataSuccess(state) {
      state.updateQualificationDataloading = false;
      state.updateQualificationDataSuccess = true;
      state.updateQualificationDataError = null;
    },

    updateQualificationDataError(state, err) {
      state.updateQualificationDataloading = false;
      state.updateQualificationDataError = err;
      state.updateQualificationDataSuccess = false;
    },
    updateEmployerDataBegin(state) {
      state.updateEmployerDataloading = true;
      state.updateEmployerDataSuccess = false;
      state.updateEmployerDataerror = null;
    },

    updateEmployerDataSuccess(state) {
      state.updateEmployerDataloading = false;
      state.updateEmployerDataSuccess = true;
    },

    updateEmployerDataErr(state, err) {
      state.updateEmployerDataloading = false;
      state.updateEmployerDataerror = err;
      state.updateEmployerDataSuccess = false;
    },

    updateSpouseDataBegin(state) {
      state.updateSpouseDataloading = true;
      state.updateSpouseDataSuccess = false;
      state.updateSpouseDataerror = null;
    },

    updateSpouseDataSuccess(state) {
      state.updateSpouseDataloading = false;
      state.updateSpouseDataSuccess = true;
    },

    updateSpouseDataErr(state, err) {
      state.updateSpouseDataloading = false;
      state.updateSpouseDataerror = err;
      state.updateSpouseDataSuccess = false;
    },

    createChildrenDataBegin(state) {
      state.createChildrenDataloading = true;
      state.createChildrenDataSuccess = false;
      state.createChildrenDataerror = null;
    },

    createChildrenDataSuccess(state) {
      state.createChildrenDataloading = false;
      state.createChildrenDataSuccess = true;
      state.createChildrenDataerror = null;
    },

    createChildrenDataErr(state, err) {
      state.createChildrenDataloading = false;
      state.createChildrenDataerror = err;
      state.createChildrenDataSuccess = false;
    },

    updateChildrenDataBegin(state) {
      state.updateChildrenDataloading = true;
      state.updateChildrenDataSuccess = false;
      state.updateChildrenDataerror = null;
    },

    updateChildrenDataSuccess(state) {
      state.updateChildrenDataloading = false;
      state.updateChildrenDataSuccess = true;
    },

    updateChildrenDataErr(state, err) {
      state.updateChildrenDataloading = false;
      state.updateChildrenDataerror = err;
      state.updateChildrenDataSuccess = false;
    },

    updateChurchAffiliationDataBegin(state) {
      state.updateChurchAffiliationDataloading = true;
      state.updateChurchAffiliationDataSuccess = false;
      state.updateChurchAffiliationDataerror = null;
    },

    updateChurchAffiliationDataSuccess(state) {
      state.updateChurchAffiliationDataloading = false;
      state.updateChurchAffiliationDataSuccess = true;
    },

    updateChurchAffiliationDataErr(state, err) {
      state.updateChurchAffiliationDataloading = false;
      state.updateChurchAffiliationDataerror = err;
      state.updateChurchAffiliationDataSuccess = false;
    },

    //get
    getAllCihRolesBegin(state) {
      state.getAllCihRolesLoading = true;
      state.getAllCihRolesSuccess = false;
      state.getAllCihRolesError = null;
    },

    getAllCihRolesSuccess(state, data) {
      state.getAllCihRolesLoading = false;
      state.getAllCihRolesSuccess = true;
      state.allCihRoles = data;
      state.getAllCihRolesError = null;
    },

    getAllCihRolesErr(state, err) {
      state.getAllCihRolesLoading = false;
      state.getAllCihRolesError = err;
      state.getAllCihRolesSuccess = false;
    },

    getAllBiodataBegin(state) {
      state.getAllBiodataloading = true;
      state.getAllBiodatasuccess = false;
      state.getAllBiodataerror = null;
    },

    getAllBiodataSuccess(state, { data, totalCount }) {
      state.getAllBiodataloading = false;
      state.getAllBiodatasuccess = true;
      state.allbiodata = data;
      state.total = totalCount;
    },

    getAllBiodataErr(state, err) {
      state.getAllBiodataloading = false;
      state.getAllBiodataerror = err;
      state.getAllBiodatasuccess = false;
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

    // Outreach
    getAllOutreachBegin(state) {
      state.getAllOutreachloading = true;
      state.getAllOutreachsuccess = false;
      state.getAllOutreacherror = null;
    },

    getAllOutreachSuccess(state, { data, totalCount }) {
      state.getAllOutreachloading = false;
      state.getAllOutreachsuccess = true;
      state.allOutreach = data;
      state.total = totalCount;
    },

    getAllOutreachErr(state, err) {
      state.getAllOutreachloading = false;
      state.getAllOutreacherror = err;
      state.getAllOutreachsuccess = false;
    },

    getOutreachByIdBegin(state) {
      state.getOutreachByIdloading = true;
      state.getOutreachByIdsuccess = false;
      state.getOutreachByIderror = null;
    },

    getOutreachByIdSuccess(state, { data }) {
      state.getOutreachByIdloading = false;
      state.getOutreachByIdsuccess = true;
      state.outreachReport = data;
    },

    getOutreachByIdErr(state, err) {
      state.getOutreachByIdloading = false;
      state.getOutreachByIderror = err;
      state.getOutreachByIdsuccess = false;
      state.outreachReport = null;
    },

    getAllOutreachReportBegin(state) {
      state.getAllOutreachReportloading = true;
      state.getAllOutreachReportsuccess = false;
      state.getAllOutreachReporterror = null;
    },

    getAllOutreachReportSuccess(state, { data, totalCount }) {
      state.getAllOutreachReportloading = false;
      state.getAllOutreachReportsuccess = true;
      state.allOutreachReport = data;
      state.total = totalCount;
    },

    getAllOutreachReportErr(state, err) {
      state.getAllOutreachReportloading = false;
      state.getAllOutreachReporterror = err;
      state.getAllOutreachReportsuccess = false;
    },

    getAllAuditLogBegin(state) {
      state.getAllAuditLogloading = true;
      state.getAllAuditLogsuccess = false;
      state.getAllAuditLogerror = null;
    },

    getAllAuditLogSuccess(state, { data, totalCount }) {
      state.getAllAuditLogloading = false;
      state.getAllAuditLogsuccess = true;
      state.allAuditLog = data;
      state.total = totalCount;
    },

    getAllAuditLogErr(state, err) {
      state.getAllAuditLogloading = false;
      state.getAllAuditLogerror = err;
      state.getAllAuditLogsuccess = false;
    },

    // getAllOutreachSuccess(state, { data, totalCount }) {
    //   state.getAllOutreachloading = false;
    //   state.getAllOutreachsuccess = true;
    //   state.allOutreach = data;
    //   state.total = totalCount;
    // },

    // getAllOutreachErr(state, err) {
    //   state.getAllOutreachloading = false;
    //   state.getAllOutreacherror = err;
    //   state.getAllOutreachsuccess = false;
    // },
    getOutreachBegin(state) {
      state.getOutreachloading = true;
      state.getOutreachsuccess = false;
      state.getOutreacherror = null;
    },

    getOutreachSuccess(state, data) {
      state.getOutreachloading = false;
      state.getOutreachsuccess = true;
      state.Outreach = data;
    },

    getOutreachErr(state, err) {
      state.getOutreachloading = false;
      state.getOutreacherror = err;
      state.getOutreachsuccess = false;
    },

    // addOutreachRequestRequest
    addOutreachRequestBegin(state) {
      state.addOutreachRequestLoading = true;
      state.addOutreachRequestSuccess = false;
      state.addOutreachRequestError = null;
    },

    AddOutreachRequestSuccess(state) {
      state.addOutreachRequestLoading = false;
      state.addOutreachRequestSuccess = true;
    },

    addOutreachRequestErr(state, err) {
      state.addOutreachRequestLoading = false;
      state.addOutreachRequestError = err;
      state.addOutreachRequestSuccess = false;
    },

    editOutreachRequestBegin(state) {
      state.editOutreachRequestLoading = true;
      state.editOutreachRequestSuccess = false;
      state.editOutreachRequestError = null;
    },

    editOutreachRequestSuccess(state) {
      state.editOutreachRequestLoading = false;
      state.editOutreachRequestSuccess = true;
    },

    editOutreachRequestErr(state, err) {
      state.editOutreachRequestLoading = false;
      state.editOutreachRequestError = err;
      state.editOutreachRequestSuccess = false;
    },

    // createOutreachReport
    createOutreachReportBegin(state) {
      state.createOutreachReportLoading = true;
      state.createOutreachReportSuccess = false;
      state.createOutreachReportError = null;
    },

    createOutreachReportSuccess(state) {
      state.createOutreachReportLoading = false;
      state.createOutreachReportSuccess = true;
    },

    createOutreachReportFailure(state, err) {
      state.createOutreachReportLoading = false;
      state.createOutreachReportError = err;
      state.createOutreachReportSuccess = false;
    },

    deleteOutreachReportBegin(state) {
      state.deleteOutreachReportLoading = true;
      state.deleteOutreachReportSuccess = false;
      state.deleteOutreachReportError = null;
    },

    deleteOutreachReportSuccess(state) {
      state.deleteOutreachReportLoading = false;
      state.deleteOutreachReportSuccess = true;
    },

    deleteOutreachReportFailure(state, err) {
      state.deleteOutreachReportLoading = false;
      state.deleteOutreachReportError = err;
      state.deleteOutreachReportSuccess = false;
    },

    deleteOutreachRequestBegin(state) {
      state.deleteOutreachRequestLoading = true;
      state.deleteOutreachRequestSuccess = false;
      state.deleteOutreachRequestError = null;
    },

    deleteOutreachRequestSuccess(state) {
      state.deleteOutreachRequestLoading = false;
      state.deleteOutreachRequestSuccess = true;
    },

    deleteOutreachRequestFailure(state, err) {
      state.deleteOutreachRequestLoading = false;
      state.deleteOutreachRequestError = err;
      state.deleteOutreachRequestSuccess = false;
    },

    editOutreachReportBegin(state) {
      state.editOutreachReportLoading = true;
      state.editOutreachReportSuccess = false;
      state.editOutreachReportError = null;
    },

    editOutreachReportSuccess(state) {
      state.editOutreachReportLoading = false;
      state.editOutreachReportSuccess = true;
    },

    editOutreachReportFailure(state, err) {
      state.editOutreachReportLoading = false;
      state.editOutreachReportError = err;
      state.editOutreachReportSuccess = false;
    },

    getChildrensDataBegin(state) {
      state.getChildrensDataloading = true;
      state.getChildrensDataSuccess = false;
      state.getChildrensDataerror = null;
    },

    getChildrensDataSuccess(state, data) {
      state.getChildrensDataloading = false;
      state.getChildrensDataSuccess = true;
      state.childrensData = data;
    },

    getChildrensDataErr(state, err) {
      state.getChildrensDataloading = false;
      state.getChildrensDataerror = err;
      state.getChildrensDataSuccess = false;
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
      // const errMsg = err?.response?.data?.message;

      // if (errMsg == "Employer not found!") {
      //   console.log("Error: " + JSON.stringify(err.response.data.message));
      //   state.getEmployerDataloading = false;
      //   state.getEmployerDatasuccess = false;
      //   state.getEmployerDataerror = null;
      //   return;
      // } else {
      state.getEmployerDataloading = false;
      state.getEmployerDatasuccess = false;
      state.getEmployerDataerror = err;
      // }
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
      state.churchAffiliationsData = {
        ...data,
        affinityGroup: data?.affinityGroup?.filter(
          (item) => item.toLowerCase() !== "none"
        ),
      };
    },

    getChurchAffiliationsDataErr(state, err) {
      state.getChurchAffiliationsDataloading = false;
      state.getChurchAffiliationsDataerror = err;
      state.getChurchAffiliationsDatasuccess = false;
    },

    deleteChildBegin(state) {
      state.deleteChildDataloading = true;
      state.deleteChildDataSuccess = false;
      state.deleteChildDataError = null;
    },
    deleteChildDataSuccess(state) {
      state.deleteChildDataloading = false;
      state.deleteChildDataSuccess = true;
    },

    deleteChildDataError(state, err) {
      state.deleteChildDataloading = false;
      state.deleteChildDataSuccess = false;
      state.deleteChildDataError = err;
    },

    //edit modal
    openChildDetail(state, data) {
      state.editModal = true;
      state.childDetails = data;
      // console.log(data);
    },

    openQualificationDetail(state, data) {
      state.editModal = true;
      state.qualificationDetails = data;
    },
    closeEditModal(state) {
      state.editModal = false;
      // state.childDetails = null;
    },

    //delete modal
    closeDeleteModal(state) {
      state.editModal = false;
    },
    openDeleteModal(state) {
      state.deleteModal = true;
    },
    toggleReqDepartment(state, boolean) {
      state.isReqDepartmentOpen = boolean;
    },
    toggleReqZone(state, boolean) {
      state.isReqZoneOpen = boolean;
    },
    toggleReqAffinityGroup(state, boolean) {
      state.isReqAffinityGroupOpen = boolean;
    },
  },
  actions: {
    async getAllCihRoles({ commit }) {
      try {
        commit("getAllCihRolesBegin");
        const response = await DataService.get(`${urls.GET_CIH_ROLES}`);
        if (response.status === 200) {
          // console.log("CIHRoles: " + JSON.stringify(response.data));
          commit("getAllCihRolesSuccess", response.data);
        }
      } catch (err) {
        commit("getAllCihRolesErr", err);
      }
    },
    async uploadFile({ commit }, data) {
      try {
        commit("uploadFileBegin");
        const response = await DataService.post(
          `${urls.UPLOAD_FILE}?UserId=${data.UserId}&FileType=${data.FileType}`,
          data.file,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Set the content type
            },
          }
        );
        if (response.status === 200) {
          commit("uploadFileSuccess");
        }
      } catch (err) {
        commit("uploadFileError", err);
      }
    },
    async requestToJoinDept({ commit }, data) {
      try {
        commit("requestToJoinDeptBegin");
        const response = await DataService.put(
          `${urls.REQUEST_BY_MEMBER_TO_JOIN_DEPT}?userId=${data.userId}&department=${data.department}&Reason=${data.reason}`,
          "string"
        );
        if (response.status === 200) {
          commit("requestToJoinDeptSuccess");
        }
      } catch (err) {
        commit("requestToJoinDeptError", err);
      }
    },

    async requestToChangeDept({ commit }, data) {
      try {
        commit("requestToJoinDeptBegin");
        const response = await DataService.put(
          `${urls.REQUEST_BY_MEMBER_TO_CHANGE_DEPT}?userId=${data.userId}&newDepartment=${data.department}&Reason=${data.reason}`,
          "string"
        );
        if (response.status === 200) {
          commit("requestToJoinDeptSuccess");
        }
      } catch (err) {
        commit("requestToJoinDeptError", err);
      }
    },

    async requestToChangeGroup({ commit }, data) {
      try {
        commit("requestToChangeGroupBegin");
        const response = await DataService.put(
          `${urls.REQUEST_BY_MEMBER_TO_CHANGE_GROUP}?userId=${data.userId}&newAffinityGroup=${data.affinityGroup}&Reason=${data.reason}`,
          "string"
        );
        if (response.status === 200) {
          commit("requestToChangeGroupSuccess");
        }
      } catch (err) {
        commit("requestToChangeGroupError", err);
      }
    },

    async requestToJoinGroup({ commit }, data) {
      try {
        commit("requestToChangeGroupBegin");
        const response = await DataService.put(
          `${urls.REQUEST_BY_MEMBER_TO_JOIN_GROUP}?userId=${data.userId}&affinityGroup=${data.affinityGroup}&Reason=${data.reason}`,
          "string"
        );
        if (response.status === 200) {
          commit("requestToChangeGroupSuccess");
        }
      } catch (err) {
        commit("requestToChangeGroupError", err);
      }
    },

    async requestToChangeZone(
      { commit },
      { userId, cihZone, cihAddress, reason }
    ) {
      try {
        commit("requestToChangeZoneBegin");
        const response = await DataService.put(
          `${urls.REQUEST_BY_MEMBER_TO_CHANGE_ZONE}?userId=${userId}&newCihZone=${cihZone}&newCenter=${cihAddress}&Reason=${reason}`,
          ""
        );
        if (response.status === 200) {
          commit("requestToChangeZoneSuccess");
        }
      } catch (err) {
        commit("requestToChangeZoneError", err);
      }
    },

    async createProfile({ commit }, data) {
      try {
        commit("creatingProfile");
        const response = await DataService.post(urls.CREATE_BIODATA, data);
        if (response.status === 200) {
          commit("profileCreated");
        }
      } catch (err) {
        commit("createProfileError", err);
      }
    },

    async updateProfile({ commit }, data) {
      try {
        commit("creatingProfile");
        const response = await DataService.put(urls.UPDATE_BIODATA, data);
        if (response.status === 200) {
          commit("profileCreated");
          // console.log("SuccessResponse:" + response);
        }
      } catch (err) {
        commit("createProfileError", err);
      }
    },
    async createQualification({ commit }, data) {
      try {
        commit("updateQualificationDataBegin");
        const response = await DataService.post(
          urls.CREATE_QUALIFICATION,
          data
        );

        if (response.status === 200) {
          commit("updateQualificationDataSuccess");
        }
      } catch (err) {
        commit("updateQualificationDataError", err);
      }
    },
    async updateQualification({ commit }, data) {
      try {
        commit("updateQualificationDataBegin");
        const response = await DataService.put(urls.UPDATE_QUALIFICATION, data);

        if (response.status === 200) {
          commit("updateQualificationDataSuccess");
        }
      } catch (err) {
        commit("updateQualificationDataError", err);
      }
    },
    async deleteQualificationById({ commit }, id) {
      try {
        commit("deleteQualificationBegin");
        const response = await DataService.delete(
          `${urls.DELETE_QUALIFICATION}?id=${id}`
        );
        if (response.status === 200) {
          commit("deleteQualificationSuccess");
        }
      } catch (err) {
        commit("deleteQualificationError", err);
      }
    },

    async createChurchAffiliation({ commit }, data) {
      try {
        commit("updateChurchAffiliationDataBegin");
        const response = await DataService.post(
          urls.CREATE_CHURCH_AFFILIATION,
          data
        );

        if (response.status === 200) {
          commit("updateChurchAffiliationDataSuccess");
        }
      } catch (err) {
        commit("updateChurchAffiliationDataerror", err);
      }
    },
    async updateChurchAffiliation({ commit }, data) {
      try {
        commit("updateChurchAffiliationDataBegin");
        const response = await DataService.put(
          urls.UPDATE_CHURCH_AFFILIATION,
          data
        );

        if (response.status === 200) {
          commit("updateChurchAffiliationDataSuccess");
        }
      } catch (err) {
        commit("updateChurchAffiliationDataerror", err);
      }
    },

    //get
    async getAllBiodata({ commit }, data) {
      try {
        commit("getAllBiodataBegin");
        const response = await DataService.get(
          `${urls.GET_ALL_BIODATA}?${new URLSearchParams(cleanObject(data))}`
        );
        if (response.status === 200) {
          commit("getAllBiodataSuccess", response.data);
        }
      } catch (err) {
        commit("getBiodataErr", err);
      }
    },

    //get
    async getAllOutreach({ commit }, data) {
      console.log("Getting all outreach");
      try {
        commit("getAllOutreachBegin");
        const response = await DataService.get(
          `${urls.GET_ALL_OUTREACH_REQUESTS}?${new URLSearchParams(
            cleanObject(data)
          )}`,
          data
        );
        if (response.status === 200) {
          commit("getAllOutreachSuccess", response.data);
        }
      } catch (err) {
        commit("getOutreachErr", err);
      }
    },
    async getOutreachById({ commit }, data) {
      console.log("Getting outreach");
      try {
        commit("getOutreachByIdBegin");
        const response = await DataService.get(
          `${urls.GET_OUTREACH_BY_ID}?${new URLSearchParams(
            cleanObject(data)
          )}`,
          data
        );
        if (response.status === 200) {
          commit("getOutreachByIdSuccess", response.data);
        }
      } catch (err) {
        commit("getOutreachByIdErr", err);
      }
    },

    async getAllOutreachReport({ commit }, data) {
      console.log("Getting all outreach");
      try {
        commit("getAllOutreachReportBegin");
        const response = await DataService.get(
          `${urls.GET_ALL_OUTREACH_REPORTS}?${new URLSearchParams(
            cleanObject(data)
          )}`,
          data
        );
        if (response.status === 200) {
          commit("getAllOutreachReportSuccess", response.data);
        }
      } catch (err) {
        commit("getOutreachErr", err);
      }
    },

    async addOutreachRequest({ commit }, data) {
      commit("addOutreachRequestBegin");
      await DataService.post(
        `${urls.ADD_OUTREACH_REQUEST}?${new URLSearchParams(cleanObject(data))}`
        // data
      )
        .then(() => {
          console;
          commit("AddOutreachRequestSuccess");
        })
        .catch((err) => {
          commit("addOutreachRequestErr", err);
        });
    },

    async editOutreachRequest({ commit }, data) {
      commit("editOutreachRequestBegin");
      await DataService.put(`${urls.EDIT_OUTREACH_REQUEST}`, data)
        .then(() => {
          commit("editOutreachRequestSuccess");
        })
        .catch((err) => {
          commit("editOutreachRequestErr", err);
        });
    },

    async createOutreachReport({ commit }, data) {
      commit("createOutreachReportBegin");
      await DataService.post(`${urls.ADD_OUTREACH_REPORT}`, data)
        .then(() => {
          console;
          commit("createOutreachReportSuccess");
        })
        .catch((err) => {
          commit("createOutreachReportFailure", err);
        });
    },

    async deleteOutreachReport({ commit }, data) {
      commit("deleteOutreachReportBegin");
      await DataService.delete(
        `${urls.DELETE_OUTREACH_REPORT}?${new URLSearchParams(
          cleanObject(data)
        )}`
      )
        .then(() => {
          console;
          commit("deleteOutreachReportSuccess");
        })
        .catch((err) => {
          commit("deleteOutreachReportFailure", err);
        });
    },

    async deleteOutreachRequest({ commit }, data) {
      commit("deleteOutreachRequestBegin");
      await DataService.delete(
        `${urls.DELETE_OUTREACH_REQUEST}?${new URLSearchParams(
          cleanObject(data)
        )}`
      )
        .then(() => {
          console;
          commit("deleteOutreachRequestSuccess");
        })
        .catch((err) => {
          commit("deleteOutreachRequestFailure", err);
        });
    },

    async editOutreachReport({ commit }, data) {
      commit("editOutreachReportBegin");
      await DataService.put(`${urls.UPDATE_OUTREACH_REPORT}`, data)
        .then(async () => {
          commit("editOutreachReportSuccess");
        })
        .catch((err) => {
          JSON.stringify(err);
          // commit("editOutreachReportFailure", err);
        });
      await DataService.put(
        `${urls.UPDATE_DETAIL_OF_CONVERTS}`,
        data?.detailOfConverts
      )
        .then(() => {
          commit("editOutreachReportSuccess");
        })
        .catch((err) => {
          commit("editOutreachReportFailure", err);
        });
    },

    async approveOrRejectOutreach({ commit }, data) {
      commit("approveOrRejectOutreachBegin");
      try {
        const response = await DataService.put(
          `${urls.APPROVE_OR_REJECT_OUTREACH}?${new URLSearchParams(
            cleanObject(data)
          )}`
        );
        if (response.status === 200) {
          commit("approveOrRejectOutreachSuccess", response.data);
        }
      } catch (err) {
        commit("approveOrRejectOutreachFailure", err);
      }
    },

    async getAllAuditLog({ commit }, data) {
      try {
        commit("getAllAuditLogBegin");
        const response = await DataService.get(
          `${urls.GET_ALL_AUDIT_LOG}?${new URLSearchParams(cleanObject(data))}`,
          data
        );
        if (response.status === 200) {
          commit("getAllAuditLogSuccess", response.data);
        }
      } catch (err) {
        commit("getAllAuditLogError", err);
      }
    },

    async getBiodataByUserId({ commit }, id) {
      try {
        commit("getBiodataBegin");
        const response = await DataService.get(
          `${urls.GET_BIODATA_BY_USERID}?id=${id}`
        );
        if (response.status === 200) {
          commit("getBiodataSuccess", response.data.data);
        }
      } catch (err) {
        console.log("getBiodataErr", JSON.stringify(err));
        commit("getBiodataErr", err);
      }
    },

    //children

    async getChildrenDetailByUserId({ commit }, id) {
      try {
        commit("getChildrensDataBegin");
        const response = await DataService.get(
          `${urls.GET_CHILDREN_DETAIL_BY_USERID}?id=${id}`
        );
        if (response.status === 200) {
          commit("getChildrensDataSuccess", response.data.data);
        }
      } catch (err) {
        commit("getChildrensDataErr", err);
      }
    },

    async createChildren({ commit }, data) {
      try {
        commit("createChildrenDataBegin");
        const response = await DataService.post(
          urls.CREATE_CHILDREN_DETAIL,
          data
        );

        if (response.status === 200) {
          commit("createChildrenDataSuccess");
        }
      } catch (err) {
        commit("createChildrenDataerror", err);
      }
    },
    async updateChildren({ commit }, data) {
      try {
        commit("updateChildrenDataBegin");
        const response = await DataService.put(
          urls.UPDATE_CHILDREN_DETAIL,
          data
        );

        if (response.status === 200) {
          commit("updateChildrenDataSuccess");
        }
      } catch (err) {
        commit("updateChildrenDataerror", err);
      }
    },

    async deleteChildById({ commit }, id) {
      try {
        commit("deleteChildBegin");
        const response = await DataService.delete(
          `${urls.DELETE_CHILDREN_DETAIL}?id=${id}`
        );
        if (response.status === 200) {
          commit("deleteChildDataSuccess");
        }
      } catch (err) {
        commit("deleteChildDataError", err);
      }
    },

    //spouse

    async getSpouseDetailById({ commit }, id) {
      try {
        commit("getSpouseDataBegin");
        const response = await DataService.get(
          `${urls.GET_SPOUSE_DETAIL_BY_USERID}?id=${id}`
        );
        if (response.status === 200) {
          commit("getSpouseDataSuccess", response.data.data);
        }
      } catch (err) {
        commit("getSpouseDataErr", err);
      }
    },
    async createSpouse({ commit }, data) {
      try {
        commit("updateSpouseDataBegin");
        const response = await DataService.post(
          urls.CREATE_SPOUSE_DETAIL,
          data
        );

        if (response.status === 200) {
          commit("updateSpouseDataSuccess");
        }
      } catch (err) {
        commit("updateSpouseDataerror", err);
      }
    },

    async updateSpouse({ commit }, data) {
      try {
        commit("updateSpouseDataBegin");
        const response = await DataService.put(urls.UPDATE_SPOUSE_DETAIL, data);

        if (response.status === 200) {
          commit("updateSpouseDataSuccess");
        }
      } catch (err) {
        commit("updateSpouseDataerror", err);
      }
    },

    //Employer
    async getEmployerDetailById({ commit }, id) {
      try {
        commit("getEmployerDataBegin");
        const response = await DataService.get(
          `${urls.GET_EMPLOYER_BY_USERID}?id=${id}`
        );
        if (response.status === 200) {
          commit("getEmployerDataSuccess", response.data.data);
        }
      } catch (err) {
        commit("getEmployerDataErr", err);
      }
    },

    async createEmployer({ commit }, data) {
      try {
        commit("updateEmployerDataBegin");
        const response = await DataService.post(urls.CREATE_EMPLOYER, data);

        if (response.status === 200) {
          commit("updateEmployerDataSuccess");
        }
      } catch (err) {
        commit("updateEmployerDataErr", err);
      }
    },

    async updateEmployer({ commit }, data) {
      try {
        commit("updateEmployerDataBegin");
        const response = await DataService.put(urls.UPDATE_EMPLOYER, data);

        if (response.status === 200) {
          commit("updateEmployerDataSuccess");
        }
      } catch (err) {
        commit("updateEmployerDataErr", err);
      }
    },

    //ChurchAffiliation
    async getChurchAffiliationsById({ commit }, id) {
      try {
        commit("getChurchAffiliationsDataBegin");
        const response = await DataService.get(
          `${urls.GET_CHURCH_AFFILIATION_BY_USERID}?id=${id}`
        );

        if (response?.status === 200) {
          commit("getChurchAffiliationsDataSuccess", response.data.data);
        } else {
          commit("getChurchAffiliationsDataSuccess", null);
        }
      } catch (err) {
        commit("getChurchAffiliationsDataErr", err);
      }
    },

    async getFirstTimerStats({ commit }) {
      try {
        commit("firstTimerStatsBegin");
        const response = await DataService.get(`${urls.FIRSTTIMER_STATS}`);

        if (response?.status === 200) {
          commit("firstTimerStatsSuccess", response.data.data);
        } else {
          commit("firstTimerStatsSuccess", null);
        }
      } catch (err) {
        commit("firstTimerStatsFailure", err);
      }
    },

    async getQualificationsById({ commit }, id) {
      try {
        commit("getQualificationDataBegin");
        const response = await DataService.get(
          `${urls.GET_QUALIFICATION_BY_USERID}?id=${id}`
        );
        if (response.status === 200) {
          commit("getQualificationDataSuccess", response.data.data);
        }
      } catch (err) {
        commit("getQualificationDataErr", err);
      }
    },
    async deleteBiodata({ commit }, id) {
      try {
        commit("deleteBegin");
        const response = await DataService.delete(
          `${urls.DELETE_BIODATA}?id=${id}`
        );
        if (response.status === 200) {
          commit("deleteSuccess");
        }
      } catch (err) {
        commit("deleteErr", err);
      }
    },
    openChildDetail({ commit }, data) {
      commit("openChildDetail", data);
    },

    openQualificationDetail({ commit }, data) {
      commit("openQualificationDetail", data);
    },

    closeEditModal({ commit }) {
      commit("closeEditModal");
    },

    openDeleteModal({ commit }) {
      commit("openDeleteModal");
    },

    closeDeleteModal({ commit }) {
      commit("closeDeleteModal");
    },

    toggleReqDepartment({ commit }, boolean) {
      commit("toggleReqDepartment", boolean);
    },
    toggleReqZone({ commit }, boolean) {
      commit("toggleReqZone", boolean);
    },
    toggleReqAffinityGroup({ commit }, boolean) {
      commit("toggleReqAffinityGroup", boolean);
    },
    // toggleReqDepartment({ commit }, boolean) {
    //   commit("toggleReqDepartment", boolean);
    // },
  },
};
