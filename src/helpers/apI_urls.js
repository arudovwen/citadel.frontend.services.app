export const urls = {
  //Accessories
  CREATE_ACCESSORY: "/Accessory/CreateAccessory",
  UPDATE_ACCESSORY: "/Accessory/UpdateAccessory",
  GET_ACCESSORY_BY_ID: "/Accessory/GetAccessoryById",
  GET_ACCESSORY_BY_USER_ID: "/Accessory/GetAccessoryByUserId",
  GET_ALL_ACCESSORIES: "/Accessory/GetAllAccessory",
  DELETE_ACCESSORY: "/Accessory/DeleteAccessory",

  // Admin
  CREATE_ADMIN: "/Admin/CreateAdmin",
  DISABLE_USER: "/Admin/DisableUser",
  ENABLE_USER: "/Admin/EnableUser",
  ADMIN_GET_ALL_USERS: "/Admin/GetAllUsers",
  GET_USER_ROLES: "/Admin/GetUserRoles",
  GET_ADMIN_ROLES: "/Admin/GetPlatformAdminRoles",
  GET_CIH_ROLES: "/Admin/GetCIHRoles",
  CONVERT_FIRST_TO_MEMBER: "/Admin/ConvertFirstTimersToMembers",
  BULK_CONVERT_FIRST_TO_MEMBER: "/Admin/BulkConvertFirstTimersToMembers",
  UPDATE_ROLE: "/Admin/ChangeUserRole",
  CREATE_ROLE_WITH_PERMISSIONS: "/Auth/CreateRoleWithPermissions",
  UPDATE_ROLE_WITH_PERMISSIONS: "/Auth/UpdateRoleWithPermissions",
  GET_PLATFORM_ROLES: "/Auth/GetPlatformRoles",
  GET_PLATFORM_ROLE_PERMISSIONS: "/Auth/GetPlatformRolePermissions",
  REMOVE_ROLE_FROM_PLATFORM: "/Auth/RemoveUserRoleFromPlatform",
  REMOVE_PERMISSION_FROM_USER: "/Auth/RemovePermissionsFromUser",
  ASSIGN_PERMISSIONS_TO_USERS: "/Auth/AssignPermissionsToUser",
  ASSIGN_CIHROLE_TO_USER: "/ChurchAffiliation/AssignCIHRoleByInspectorate",
  GET_PLATFORM_PERMISSIONS: "/Auth/GetPlatformPermissions",
  GET_AUTH_USER_ROLES: "/Auth/GetUserRoles",
  //Affinity Groups
  CREATE_AFFINITY_GROUP: "/AffinityGroup/CreateAffinityGroup",
  UPDATE_AFFINITY_GROUP: "/AffinityGroup/UpdateAffinityGroup",
  DELETE_AFFINITY_GROUP: "/AffinityGroup/DeleteAffinityGroup",
  GET_ALL_AFFINITY_GROUPS: "/AffinityGroup/GetAllAffinityGroups",
  GET_AFFINITY_GROUP_BY_ID: "/AffinityGroup/GetAffinityGroupById",
  GET_AFFINITY_GROUP_BY_USERID: "/AffinityGroup/GetAffinityGroupByUserId",

  //Attendance
  CREATE_CIH_ATTENDANCE: "/CreateCIHAttendance",
  UPDATE_CIH_ATTENDANCE: "/UpdateCIHAttendance",
  GET_CIH_ATTENDANCE_BY_ID: "/GetCIHAttendanceById",
  GET_METRIC_OF_MEMBERS_BY_ATTENDANCE_ID:
    "/GetMetricOfMembersByCIHAttendanceId",
  GET_CIH_STATS: "/GetCIHStats",
  GET_ZONE_STATS: "/GetZoneCIHStats",
  GET_CIH_DASHBOARD_STATS: "/GetCIHDasboardStats",

  // Auth
  LOGIN: "/Auth/Login",
  CHANGE_PASSWORD_INITIATE: "/Auth/ChangePasswordInitiate",
  CHANGE_PASSWORD_COMPLETE: "/Auth/ChangePasswordComplete",
  CHANGE_PASSWORD: "/Auth/ChangePasswordCompleteInside",
  VALIDATE_EMAIL_INITIATE: "/Auth/ValidateEmailInitiate",
  VALIDATE_EMAIL_COMPLETE: "/Auth/ValidateEmailComplete",
  LOGIN_CHECK: "/Auth/GetUserLoginMethod",

  // Biodata
  CREATE_BIODATA: "/Biodata/CreateBiodata",
  UPDATE_BIODATA: "/Biodata/UpdateBiodata",
  GET_BIODATA_BY_ID: "/Biodata/GetBiodataById",
  GET_BIODATA_BY_USERID: "/Biodata/GetBiodataByUserId",
  GET_ALL_BIODATA: "/Biodata/GetAllBiodata",
  DELETE_BIODATA: "/Biodata/DeleteBiodata",

  // Outreach
  GET_ALL_OUTREACH_REQUESTS: "GetAllOutreachRequests",
  ADD_OUTREACH_REQUEST: "/RequestForOutreach",
  EDIT_OUTREACH_REQUEST: "/UpdateOutreachRequest",
  UPDATE_OUTREACH_REQUEST: "/UpdateOutreachRequest",
  UPDATE_OUTREACH_REPORT: "/UpdateOutreachReports",
  APPROVE_OR_REJECT_OUTREACH: "/ApproveOrRejectOutreachRequest",
  ADD_OUTREACH_REPORT: "/CreateOutreachReport",
  DELETE_OUTREACH_REPORT: "/DeleteOutreachReport",
  DELETE_OUTREACH_REQUEST: "/DeleteOutreachRequest",
  GET_ALL_OUTREACH_REPORTS: "/GetAllOutreachReports",
  GET_OUTREACH_BY_ID: "/GetOutreachReportByRequestId",
  UPDATE_DETAIL_OF_CONVERTS: "/UpdateDetailOfConverts",

  // Audit Logs
  GET_ALL_AUDIT_LOG: "/AuditTrail/GetAllAudit",

  //Centers
  CREATE_CENTER: "/Center/CreateCenter",
  UPDATE_CENTER: "/Center/UpdateCenter",
  DELETE_CENTER: "/Center/DeleteCenter",
  GET_ALL_CENTERS: "/Center/GetAllCenter",
  GET_ALL_CENTERS_TOTAL: "/Center/GetCentersByTotal",
  GET_CENTER_BY_ID: "/Center/GetCenterById",

  // ChildrenDetail
  CREATE_CHILDREN_DETAIL: "/ChildrenDetail/CreateChildrenDetail",
  UPDATE_CHILDREN_DETAIL: "/ChildrenDetail/UpdateChildrenDetail",
  GET_CHILDREN_DETAIL_BY_ID: "/ChildrenDetail/GetChildrenDetailById",
  GET_CHILDREN_DETAIL_BY_USERID: "/ChildrenDetail/GetChildrenDetailByUserId",
  GET_ALL_CHILDREN_DETAIL: "/ChildrenDetail/GetAllChildrenDetail",
  DELETE_CHILDREN_DETAIL: "/ChildrenDetail/DeleteChildrenDetail",

  // ChurchAffiliation
  CREATE_CHURCH_AFFILIATION: "/ChurchAffiliation/CreateChurchAffiliation",
  UPDATE_CHURCH_AFFILIATION: "/ChurchAffiliation/UpdateChurchAffiliation",
  GET_CHURCH_AFFILIATION_BY_ID: "/ChurchAffiliation/GetChurchAffiliationById",
  GET_CHURCH_AFFILIATION_BY_USERID:
    "/ChurchAffiliation/GetChurchAffiliationByUserId",
  GET_ALL_CHURCH_AFFILIATION: "/ChurchAffiliation/GetAllChurchAffiliation",
  DELETE_CHURCH_AFFILIATION: "/ChurchAffiliation/DeleteChurchAffiliation",
  GET_CHURCH_AFFILIATION_BY_MEMBER: "/ChurchAffiliation/GetMemberQuery",
  DELIST_MEMBER_FROM_DEPT: "/ChurchAffiliation/DelistMemberFromDepartment",
  REQUEST_BY_MEMBER_TO_CHANGE_ZONE: "/ChurchAffiliation/RequestChangeOfCIHZone",

  REQUEST_BY_MEMBER_TO_JOIN_DEPT:
    "/ChurchAffiliation/RequestByMemberToJoinDepartment",
  REQUEST_BY_MEMBER_TO_CHANGE_DEPT:
    "/ChurchAffiliation/RequestChangeOfDepartment",
  REQUEST_BY_MEMBER_TO_JOIN_GROUP:
    "/ChurchAffiliation/RequestByMemberToJoinAffinityGroup",
  REQUEST_BY_MEMBER_TO_CHANGE_GROUP:
    "/ChurchAffiliation/RequestChangeOfAffinityGroup",
  GET_HOD_REQUESTS: "/ChurchAffiliation/GetHodRequests",
  GET_INSPECTORATE_REQUESTS: "/ChurchAffiliation/GetInspectorateRequests",
  GET_USER_REQUESTS: "/ChurchAffiliation/GetUserRequestLog",
  APPROVE_CHANGE_OF_ZONE: "/ChurchAffiliation/ApproveChangeOfCIHZone",
  APPROVE_CHANGE_OF_DEPARTMENT: "/ChurchAffiliation/ApproveChangeOfDepartment",
  GET_APPROVED_DEPARTMENT_MEMBERS:
    "/ChurchAffiliation/GetApprovedDepartmentRequest",
  GET_REJECTED_DEPARTMENT_REQUESTS:
    "/ChurchAffiliation/GetRejectedDepartmentRequest",
  GET_DELISTED_DEPARTMENT_REQUESTS: "/ChurchAffiliation/GetDelistedMembers",
  GET_PENDING_DEPARTMENT_REQUESTS:
    "/ChurchAffiliation/GetPendingDepartmentRequest",
  SET_PRIMARY_DEPARTMENT: "/Department/SetPrimaryDepartment",

  // Department
  CREATE_DEPARTMENT: "/Department/CreateDepartment",
  UPDATE_DEPARTMENT: "/Department/UpdateDepartment",
  GET_DEPARTMENT_BY_ID: "/Department/GetDepartmentById",
  GET_ALL_DEPARTMENT: "/Department/GetAllDepartment",
  GET_ALL_DEPARTMENT_TOTAL: "/Department/GetAllDepartmentByTotal",
  DELETE_DEPARTMENT: "/Department/DeleteDepartment",
  GET_DEPARTMENT_MEMBERS: "Department/getdepartmentmembers",
  GET_LOGGEDIN_USER_DEPARTMENT: "/Department/GetDepartmentByUserId",

  // Employer
  CREATE_EMPLOYER: "/Employer/CreateEmployer",
  UPDATE_EMPLOYER: "/Employer/UpdateEmployer",
  GET_EMPLOYER_BY_ID: "/Employer/GetEmployerById",
  GET_EMPLOYER_BY_USERID: "/Employer/GetEmployerByUserId",
  GET_ALL_EMPLOYER: "/Employer/GetAllEmployer",
  DELETE_EMPLOYER: "/Employer/DeleteEmployer",

  // Files
  UPLOAD_FILE: "/Files/uploadfile",

  //Follow up first timer
  CREATE_FOLLOW_UP_REPORT: "/CreateFollowupFirsttimerReport",
  UPDATE_FOLLOW_UP_REPORT: "/UpdateFollowupFirsttimerReport",
  GET_FOLLOW_UP_REPORT_BY_ID: "/GetFollowupFirsttimerReportById",
  GET_ALL_FOLLOW_UP_REPORT: "/GetAllFollowupFirsttimerReport",
  DELETE_FOLLOW_UP_REPORT: "/DeleteFollowupFirsttimerReport",

  //Ministries
  CREATE_MINISTRY: "/Ministry/CreateMinistry",
  UPDATE_MINISTRY: "/Ministry/UpdateMinistry",
  GET_MINISTRY_BY_ID: "/Ministry/GetMinistryById",
  GET_MINISTRY_BY_USER_ID: "/Ministry/GetMinistryByUserId",
  GET_ALL_MINISTRIES: "/Ministry/GetAllMinistry",
  DELETE_MINISTRY: "/Ministry/DeleteMinistry",

  //Modules
  GET_PLATFORM_MODULES: "/Auth/GetPlatformModules",

  //MOI
  CREATE_MOI: "/MountainOfInfluence/CreateMountainOfInfluence",
  UPDATE_MOI: "/MountainOfInfluence/UpdateMountainOfInfluence",
  GET_MOI_BY_ID: "/MountainOfInfluence/GetMountainOfInfluenceById",
  GET_MOI_BY_USER_ID: "/MountainOfInfluence/GetMountainOfInfluenceByUserId",
  GET_ALL_MOIS: "/MountainOfInfluence/GetAllMountainOfInfluence",
  DELETE_MOI: "/MountainOfInfluence/DeleteMountainOfInfluence",

  // Qualification
  CREATE_QUALIFICATION: "/Qualification/CreateQualification",
  UPDATE_QUALIFICATION: "/Qualification/UpdateQualification",
  GET_QUALIFICATION_BY_ID: "/Qualification/GetQualificationById",
  GET_QUALIFICATION_BY_USERID: "/Qualification/GetQualificationByUserId",
  GET_ALL_QUALIFICATION: "/Qualification/GetAllQualification",
  DELETE_QUALIFICATION: "/Qualification/DeleteQualification",

  // SpouseDetail
  CREATE_SPOUSE_DETAIL: "/SpouseDetail/CreateSpouseDetail",
  UPDATE_SPOUSE_DETAIL: "/SpouseDetail/UpdateSpouseDetail",
  GET_SPOUSE_DETAIL_BY_ID: "/SpouseDetail/GetSpouseDetailById",
  GET_SPOUSE_DETAIL_BY_USERID: "/SpouseDetail/GetSpouseDetailByUserId",
  GET_ALL_SPOUSE_DETAIL: "/SpouseDetail/GetAllSpouseDetail",
  DELETE_SPOUSE_DETAIL: "/SpouseDetail/DeleteSpouseDetail",

  //Unit
  CREATE_UNIT: "/Unit/CreateUnit",
  UPDATE_UNIT: "/Unit/UpdateUnit",
  GET_UNIT_BY_ID: "/Unit/GetUnitById",
  GET_UNIT_BY_USER_ID: "/Unit/GetUnitByUserId",
  GET_ALL_UNITS: "/Unit/GetAllUnit",
  DELETE_UNIT: "/Unit/DeleteUnit",

  // UserManagement
  GET_USER_PROFILE: "/UserManagement/GetUserProfile",
  GET_USER_BY_ID: "/UserManagement/GetUserbyId",
  GET_USER_BY_NAME: "/UserManagement/GetUserbyName",
  GET_USER_BY_EMAIL: "/UserManagement/GetUserbyEmail",
  GET_ALL_USERS: "/UserManagement/GetAllUsers",
  SIGN_UP_USER: "/UserManagement/SignUpUser",
  GET_USER_AVATAR: "/UserManagement/GetUserAvatar",

  //Venues
  CREATE_VENUE: "/Venue/CreateVenue",
  UPDATE_VENUE: "/Venue/UpdateVenue",
  GET_VENUE_BY_ID: "/Venue/GetVenueById",
  GET_VENUE_BY_USER_ID: "/Venue/GetVenueByUserId",
  GET_ALL_VENUES: "/Venue/GetAllVenue",
  DELETE_VENUE: "/Venue/DeleteVenue",
  REQUEST_FOR_VENUE: "/Venue/RequestForVenue",
  GET_ALL_VENUE_REQUESTS: "/Venue/GetAllVenueRequests",
  APPROVE_OR_REJECT_VENUE: "/Venue/ApproveOrRejectVenueRequest",
  REQUEST_OTP: "/auth/requestotp",

  //Zones
  CREATE_ZONE: "/CIHZone/CreateCIHZone",
  UPDATE_ZONE: "/CIHZone/UpdateCIHZone",
  DELETE_ZONE: "/CIHZone/DeleteCIHZone",
  GET_ALL_ZONES: "/CIHZone/GetAllCIHZone",
  GET_ALL_ZONES_TOTAL: "/CIHZone/GetZonesByTotal",
  GET_ZONE_BY_ID: "/CIHZone/GetCIHZoneById",

  //Events
  REQUEST_EVENT: "/Events/RequestForEvent",
  GET_EVENTS: "/Events/GetUserEvents",
  GET_ALL_EVENTS: "/Events/GetAllEvents",
  CHANGE_EVENT_STATUS: "/Events/ApproveOrRejectEvent",
  DELETE_EVENT: "/Events/DeleteEventRequest",
  UPDATE_EVENT: "/Events/UpdateRequestForEvent",

  // Cihactivity
  CREATE_ACTIVITY_REPORT: "/CreateCIHActivity",
  UPDATE_ACTIVITY_REPORT: "/UpdateCIHActivity",
  GET_ACTIVITY_REPORTS: "/GetAllCIHActivity",
  GET_ACTIVITY_REPORT: "/GetCIHActivityById",
  DELETE_ACTIVITY_REPORT: "/DeleteCIHActivity",

  //cihinspection
  CREATE_INSPECTION_REPORT: "/CreateCIHInspection",
  UPDATE_INSPECTION_REPORT: "/UpdateCIHInspection",
  GET_INSPECTION_REPORTS: "/GetAllCIHInspection",
  GET_INSPECTION_REPORT: "/GetCIHInspectionById",
  DELETE_INSPECTION_REPORT: "/DeleteCIHInspection",

  NOTIFICATIONS: "/Notification",
};

// open delete modal
//set id of item to delete
