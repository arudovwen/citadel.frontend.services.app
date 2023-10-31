export const urls = {
  // Admin
  CREATE_ADMIN: "/Admin/CreateAdmin",
  DISABLE_USER: "/Admin/DisableUser",
  ENABLE_USER: "/Admin/EnableUser",
  ADMIN_GET_ALL_USERS: "/Admin/GetAllUsers",
  GET_USER_ROLES: "/Admin/GetUserRoles",
  GET_CIH_ROLES: "/Admin/GetCIHRoles",

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
  GET_ALL_BIODATA: "/Biodata/GetAllBiodata",
  DELETE_BIODATA: "/Biodata/DeleteBiodata",

  // ChildrenDetail
  CREATE_CHILDREN_DETAIL: "/ChildrenDetail/CreateChildrenDetail",
  UPDATE_CHILDREN_DETAIL: "/ChildrenDetail/UpdateChildrenDetail",
  GET_CHILDREN_DETAIL_BY_ID: "/ChildrenDetail/GetChildrenDetailById",
  GET_ALL_CHILDREN_DETAIL: "/ChildrenDetail/GetAllChildrenDetail",
  DELETE_CHILDREN_DETAIL: "/ChildrenDetail/DeleteChildrenDetail",

  // ChurchAffiliation
  CREATE_CHURCH_AFFILIATION: "/ChurchAffiliation/CreateChurchAffiliation",
  UPDATE_CHURCH_AFFILIATION: "/ChurchAffiliation/UpdateChurchAffiliation",
  GET_CHURCH_AFFILIATION_BY_ID: "/ChurchAffiliation/GetChurchAffiliationById",
  GET_ALL_CHURCH_AFFILIATION: "/ChurchAffiliation/GetAllChurchAffiliation",
  DELETE_CHURCH_AFFILIATION: "/ChurchAffiliation/DeleteChurchAffiliation",

  // Department
  CREATE_DEPARTMENT: "/Department/CreateDepartment",
  UPDATE_DEPARTMENT: "/Department/UpdateDepartment",
  GET_DEPARTMENT_BY_ID: "/Department/GetDepartmentById",
  GET_ALL_DEPARTMENT: "/Department/GetAllDepartment",
  DELETE_DEPARTMENT: "/Department/DeleteDepartment",

  // Employer
  CREATE_EMPLOYER: "/Employer/CreateEmployer",
  UPDATE_EMPLOYER: "/Employer/UpdateEmployer",
  GET_EMPLOYER_BY_ID: "/Employer/GetEmployerById",
  GET_ALL_EMPLOYER: "/Employer/GetAllEmployer",
  DELETE_EMPLOYER: "/Employer/DeleteEmployer",

  // Files
  UPLOAD_FILE: "/Files/Upload",

  // Qualification
  CREATE_QUALIFICATION: "/Qualification/CreateQualification",
  UPDATE_QUALIFICATION: "/Qualification/UpdateQualification",
  GET_QUALIFICATION_BY_ID: "/Qualification/GetQualificationById",
  GET_ALL_QUALIFICATION: "/Qualification/GetAllQualification",
  DELETE_QUALIFICATION: "/Qualification/DeleteQualification",

  // SpouseDetail
  CREATE_SPOUSE_DETAIL: "/SpouseDetail/CreateSpouseDetail",
  UPDATE_SPOUSE_DETAIL: "/SpouseDetail/UpdateSpouseDetail",
  GET_SPOUSE_DETAIL_BY_ID: "/SpouseDetail/GetSpouseDetailById",
  GET_ALL_SPOUSE_DETAIL: "/SpouseDetail/GetAllSpouseDetail",
  DELETE_SPOUSE_DETAIL: "/SpouseDetail/DeleteSpouseDetail",

  // UserManagement
  GET_USER_PROFILE: "/UserManagement/GetUserProfile",
  GET_USER_BY_ID: "/UserManagement/GetUserbyId",
  GET_USER_BY_NAME: "/UserManagement/GetUserbyName",
  GET_USER_BY_EMAIL: "/UserManagement/GetUserbyEmail",
  GET_ALL_USERS: "/UserManagement/GetAllUsers",
  SIGN_UP_USER: "/UserManagement/SignUpUser",
  GET_USER_AVATAR: "/UserManagement/GetUserAvatar",

  REQUEST_OTP: "/auth/requestotp",
};
