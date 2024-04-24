import store from "../store";
// store.state.auth.userData.id
export const dashboardPermission = [
  "CAN_VIEW_ADMIN_DASHBOARD",
  "CAN_VIEW_INSPECTORATE_DASHBOARD",
];
export const menuItems = [
  {
    isHeadr: true,
    title: "menu",
  },
  {
    title: "Profile",
    icon: "heroicons-outline:user-group",
    link: "/profile/" + store?.state?.auth?.userData?.id,
    roles: ["member"],
    subroles: [],
  },
  {
    title: "Overview",
    icon: "heroicons-outline:home",
    link: "/overview",
    roles: ["CAN_VIEW_ADMIN_DASHBOARD", "CAN_VIEW_INSPECTORATE_DASHBOARD"],
    subroles: ["cihpastor", "cihcoordinator"],
  },

  {
    title: "Members",
    icon: "heroicons-outline:user-group",
    link: "/members-management",
    roles: "CAN_VIEW_MEMBERS",
    subroles: [],
  },
  {
    title: "First Timers",
    icon: "heroicons-outline:user-add",
    link: "/first-timers",
    roles: "CAN_VIEW_FIRSTTIMERS",
    subroles: [],
  },

  {
    title: "Affinity Groups",
    icon: "ic:sharp-join-inner",
    link: "/affinity-groups",
    roles: "CAN_VIEW_AFFINITYGROUPS",
    subroles: [],
  },
  {
    title: "Departments",
    icon: "mingcute:department-line",
    link: "/departments",
    roles: "CAN_VIEW_DEPARTMENT",
    subroles: [],
  },

  {
    title: "Outreach",
    icon: "bx:donate-heart",
    link: "/outreach",
    roles: "CAN_VIEW_OUTREACH",
    subroles: [],
  },
  // {
  //   title: "Attendance",
  //   icon: "heroicons-outline:clipboard-check",
  //   link: "/attendance",
  //   roles: "CAN_VIEW_ATTENDANCE",
  //   subroles: [],
  // },
  // { title: "Goals", icon: "bx:football", link: "/goals" },
  // {
  //   title: "Meetings",
  //   icon: "bx:merge",
  //   link: "/meetings",
  //   roles: "CAN_VIEW_MEETINGS",
  //   subroles: [],
  // },
  // {
  //   title: "Issue Management",
  //   icon: "heroicons-outline:user",
  //   link: "issue-management",
  // },

  // {
  //   title: "Appointments",
  //   icon: "bx:calendar-plus",
  //   link: "/appointments",
  //   roles: "CAN_VIEW_APPOITMENT",
  //   subroles: [],
  // },
  {
    title: "Accessories",
    icon: "heroicons-outline:table-cells",
    link: "/accessories",
    roles: "CAN_VIEW_VENUES",
    subroles: [],
  },
  {
    title: "Venues",
    icon: "bx:buildings",
    link: "/venue-management",
    roles: "CAN_VIEW_VENUES",
    subroles: [],
  },

  {
    title: "CIH management",
    icon: "mdi:home-group",
    roles: "CAN_VIEW_CIH_MANAGEMENT",
    subroles: ["cihpastor", "cihcoordinator"],
    isOpen: true,
    child: [
      {
        childtitle: "Zones",
        for: "",
        childlink: "/cih/zones",
      },
      {
        childtitle: "Centers",
        for: "",
        childlink: "/cih/centers",
      },
      {
        childtitle: "Center",
        for: "",
        childlink: "/cih/center",
      },
      {
        childtitle: "Reports",
        for: "ordinary",
        childlink: "/cih/reports/centers",
      },
      {
        childtitle: "Reports",
        for: "admin",
        childlink: "/cih/reports/zones",
      },
      {
        childtitle: "Follow Up Reports",
        for: "admin",
        childlink: "/cih/reports/followup",
      },
      // {
      //   childtitle: "Events",
      //   childlink: "/cih/events",
      // },
    ],
    zoneRoute: {
      childtitle: "Zones",
      for: "",
      childlink: "/cih/zones",
    },
    centerRoute: {
      childtitle: "Center",
      for: "",
      childlink: "/cih/center",
    },
    centersRoute: {
      childtitle: "Centers",
      for: "",
      childlink: "/cih/centers",
    },
    zoneReportRoutes: {
      childtitle: "Reports",
      for: "admin",
      childlink: "/cih/reports/zones",
    },
    centerReportRoutes: {
      childtitle: "Center Reports",
      for: "ordinary",
      childlink: "/cih/reports/centers",
    },
    inspectorateRoutes: [
      {
        childtitle: "Zones",
        for: "",
        childlink: "/cih/zones",
      },

      {
        childtitle: "Centers",
        for: "",
        childlink: "/cih/centers",
      },

      {
        childtitle: "Reports",
        for: "admin",
        childlink: "/cih/reports/zones",
      },
      {
        childtitle: "Center Reports",
        for: "ordinary",
        childlink: "/cih/reports/centers",
      },
    ],
    coordinatorRoutes: [
      {
        childtitle: "Zones",
        for: "",
        childlink: "/cih/zones",
      },

      {
        childtitle: " Reports",
        for: "admin",
        childlink: "/cih/reports/zones",
      },
    ],
    cihPastorRoutes: [
      {
        childtitle: "Center",
        for: "",
        childlink: "/cih/center",
      },

      {
        childtitle: " Reports",
        for: "admin",
        childlink: "/cih/reports/zones",
      },
    ],
  },
  // {
  //   title: "Ministries",
  //   icon: "heroicons-outline:building-library",
  //   link: "/ministries",
  //   roles: ["administrator"],
  //   subroles: [],
  // },
  // {
  //   title: "Roles",
  //   icon: "heroicons-outline:user-circle",
  //   link: "/roles-management",
  //   roles: ["administrator"],
  //   subroles: [],
  // },
  // {
  //   title: "Units",
  //   icon: "heroicons-outline:rectangle-group",
  //   link: "/units",
  //   roles: "CAN_VIEW_UNITS",
  //   subroles: [],
  // },

  // {
  //   title: "Special Units",
  //   icon: "heroicons-outline:squares-2x2",
  //   link: "/special-unit",
  //   roles: "CAN_VIEW_UNITS",
  //   subroles: [],
  // },
  // {
  //   title: "Mountain Of Influence",
  //   icon: "heroicons-outline:globe-europe-africa",
  //   link: "/mountain-of-influence",
  //   roles: ["administrator"],
  //   subroles: [],
  // },

  {
    title: "Requests",
    icon: "fluent-mdl2:message-friend-request",
    link: "/requests",
    roles: "",
    subroles: [],
  },
  {
    title: "Demise",
    icon: "bx:buildings",
    link: "/demise",
    roles: "CAN_UPDATE_DEMISE_MEMBERS",
    subroles: [],
  },
  {
    title: "Users management",
    icon: "la:users-cog",
    link: "/users-management",
    roles: "CAN_VIEW_USER_MANAGEMENT",
    subroles: [],
  },
  {
    title: "Notifications",
    icon: "heroicons-outline:speakerphone",
    link: "/notifications",
    roles: "CAN_VIEW_NOTIFICATIONS",
  },
  {
    title: "Audit Logs",
    icon: "icon-park-outline:log",
    link: "/audit-logs",
    roles: "CAN_VIEW_AUDIT_REPORT",
    subroles: [],
  },
  // {
  //   title: "Chat Management",
  //   icon: "heroicons-outline:user",
  //   link: "chat-management",
  // },
  // {
  //   title: "Ancillary Services",
  //   icon: "heroicons-outline:user",
  //   link: "ancillary-services",
  // },
];

// menuseetins

export const ProfileMenu = [
  {
    label: "Profile",
    icon: "heroicons-outline:user",
    link: "#",
    roles: "",
  },
  // {
  //   label: "Chat",
  //   icon: "heroicons-outline:chat",
  //   link: "chat",
  // },
  // {
  //   label: "Email",
  //   icon: "heroicons-outline:mail",
  //   link: "email",
  // },
  // {
  //   label: "Todo",
  //   icon: "heroicons-outline:chip",
  //   link: "todo",
  // },
  // {
  //   label: "Settings",
  //   icon: "heroicons-outline:cog",
  //   link: "#",
  //   roles: "",
  // },
  // {
  //   label: "Price",
  //   icon: "heroicons-outline:credit-card",
  //   link: "pricing",
  // },
  // {
  //   label: "Faq",
  //   icon: "heroicons-outline:information-circle",
  //   link: "faq",
  // },
  {
    label: "Logout",
    icon: "heroicons-outline:login",
    link: "/",
  },
];
export const notifications = [];
export const eventsOptions = [
  {
    value: "babyChristening",
    label: "Baby Christening",
  },
  {
    value: "babyDedication",
    label: "Baby Dedication",
  },
  {
    value: "houseWarming",
    label: "House Warming",
  },
  {
    value: "specialThanksgiving",
    label: "Special Thanksgiving",
  },
  {
    value: "burialCeremony",
    label: "Burial Ceremony",
  },
];
export const ministries = [
  {
    id: 11,
    name: "Global Ministry",
    description: "Dcn Min",
  },
  {
    id: 11,
    name: "Global Group PFCC",
    description: "Dcn Min 2",
  },
];
export const message = [
  {
    title: "Wade Warren",
    desc: "Hi! How are you doing?.....",
    active: true,
    hasnotifaction: true,
    notification_count: 1,
    image: "user.png",
    link: "#",
  },
  {
    title: "Savannah Nguyen",
    desc: "Hi! How are you doing?.....",
    active: false,
    hasnotifaction: false,
    image: "user2.png",
    link: "#",
  },
  {
    title: "Ralph Edwards",
    desc: "Hi! How are you doing?.....",
    active: false,
    hasnotifaction: true,
    notification_count: 8,
    image: "user3.png",
    link: "#",
  },
  {
    title: "Cody Fisher",
    desc: "Hi! How are you doing?.....",
    active: true,
    hasnotifaction: false,
    image: "user4.png",
    link: "#",
  },
  {
    title: "Savannah Nguyen",
    desc: "Hi! How are you doing?.....",
    active: false,
    hasnotifaction: false,
    image: "user2.png",
    link: "#",
  },
  {
    title: "Ralph Edwards",
    desc: "Hi! How are you doing?.....",
    active: false,
    hasnotifaction: true,
    notification_count: 8,
    image: "user3.png",
    link: "#",
  },
  {
    title: "Cody Fisher",
    desc: "Hi! How are you doing?.....",
    active: true,
    hasnotifaction: false,
    image: "user4.png",
    link: "#",
  },
];

export const topMenu = [
  {
    isHeadr: true,
    title: "DASHBOARD",
  },
  {
    title: "Dashboard",
    icon: "heroicons-outline:home",
    link: "home",
  },
];

export const alertType = [
  {
    type: "dark",
  },
  {
    type: "primary",
  },

  {
    type: "secondary",
  },
  {
    type: "success",
  },
  {
    type: "info",
  },
  {
    type: "danger",
  },
  {
    type: "warning",
  },
];

export const alertType2 = [
  {
    type: "dark-light",
  },
  {
    type: "primary-light",
  },

  {
    type: "secondary-light",
  },
  {
    type: "success-light",
  },
  {
    type: "info-light",
  },
  {
    type: "danger-light",
  },
  {
    type: "warning-light",
  },
];

export const alertType3 = [
  {
    type: "dark",
    icon: "fluent:target-20-regular",
  },
  {
    type: "primary",
    icon: "fluent:target-20-regular",
  },

  {
    type: "secondary",
    icon: "heroicons-outline:support",
  },
  {
    type: "success",
    icon: "akar-icons:double-check",
  },
  {
    type: "t-info",
    icon: "heroicons-outline:information-circle",
  },
  {
    type: "danger",
    icon: "heroicons-outline:exclamation",
  },
  {
    type: "warning",
    icon: "heroicons-outline:ban",
  },
];
export const alertType4 = [
  {
    type: "dark-light",
    icon: "fluent:target-20-regular",
  },
  {
    type: "primary-light",
    icon: "fluent:target-20-regular",
  },

  {
    type: "secondary-light",
    icon: "heroicons-outline:support",
  },
  {
    type: "success-light",
    icon: "akar-icons:double-check",
  },
  {
    type: "info-light",
    icon: "heroicons-outline:information-circle",
  },
  {
    type: "danger-light",
    icon: "heroicons-outline:exclamation",
  },
  {
    type: "warning-light",
    icon: "heroicons-outline:ban",
  },
];
export const alertType5 = [
  {
    type: "dark-outline",
  },
  {
    type: "primary-outline",
  },

  {
    type: "secondary-outline",
  },
  {
    type: "success-outline",
  },
  {
    type: "info-outline",
  },
  {
    type: "danger-outline",
  },
  {
    type: "warning-outline",
  },
];
export const alertType6 = [
  {
    type: "dark-outline",
    icon: "fluent:target-20-regular",
  },
  {
    type: "primary-outline",
    icon: "fluent:target-20-regular",
  },

  {
    type: "secondary-outline",
    icon: "heroicons-outline:support",
  },
  {
    type: "success-outline",
    icon: "akar-icons:double-check",
  },
  {
    type: "info-outline",
    icon: "heroicons-outline:information-circle",
  },
  {
    type: "danger-outline",
    icon: "heroicons-outline:exclamation",
  },
  {
    type: "warning-outline",
    icon: "heroicons-outline:ban",
  },
];

export const trackingParcel = [
  {
    title: "Naming Ceremony",
    desc: "This parcel is paid for by the customer. Please contact the customer for any further information.",
    date: "Sep 20, 2021 ",
    time: "12:32 AM",
    status: "approved",
  },
  {
    title: "Baby Christening",
    date: "Sep 20, 2021 ",
    desc: "This parcel is paid for by the customer. Please contact the customer for any further information.",
    time: "12:32 AM",
    status: "approved",
  },
  {
    title: "Baby Christening",
    date: "Sep 20, 2021 ",
    desc: "This parcel is paid for by the customer. Please contact the customer for any further information.",
    time: "12:32 AM",
    status: "approved",
  },
  {
    title: "Project start date",
    date: "Sep 20, 2021 ",
    desc: "This parcel is paid for by the customer. Please contact the customer for any further information.",
    time: "12:32 AM",
  },
  {
    title: "Project start date",
    date: "Sep 20, 2021 ",
    desc: "This parcel is paid for by the customer. Please contact the customer for any further information.",
    time: "12:32 AM",
  },
  {
    title: "Project start date",
    date: "Sep 20, 2021 ",
    desc: "This parcel is paid for by the customer. Please contact the customer for any further information.",
    time: "12:32 AM",
  },
  {
    title: "Project start date",
    date: "Sep 20, 2021 ",
    desc: "This parcel is paid for by the customer. Please contact the customer for any further information.",
    time: "12:32 AM",
  },
];

export const TodoList = [
  {
    id: 1,
    image: require("@/assets/images/users/user-1.jpg"),
    title: "Amet minim mollit non deserunt ullam.",
    isDone: false,
  },
  {
    id: 2,
    image: require("@/assets/images/users/user-2.jpg"),
    title: "Amet minim mollit non deserunt ullam.",
    isDone: false,
  },
  {
    id: 3,
    image: require("@/assets/images/users/user-3.jpg"),
    title: "Amet minim mollit non deserunt ullam.",
    isDone: false,
  },
  {
    id: 4,
    image: require("@/assets/images/users/user-4.jpg"),
    title: "Amet minim mollit non deserunt ullam.",
    isDone: false,
  },
  {
    id: 5,
    image: require("@/assets/images/users/user-5.jpg"),
    title: "Amet minim mollit non deserunt ullam.",
    isDone: false,
  },
  {
    id: 6,
    image: require("@/assets/images/users/user-6.jpg"),
    title: "Amet minim mollit non deserunt ullam.",
    isDone: false,
  },
];

//  todo fillter
export const fillters = [
  {
    value: "all",
    name: "My Task",
    icon: "uil:image-v",
  },
  {
    value: "fav",
    name: "Starred",
    icon: "heroicons:star",
  },
  {
    value: "done",
    name: "Completed",
    icon: "heroicons:document-check",
  },
  {
    value: "trash",
    name: "Trash",
    icon: "heroicons:trash",
  },
  {
    name: "Team",
    icon: "heroicons:users",
    value: "team",
  },
  {
    name: "low",
    icon: "heroicons:flag",
    value: "low",
  },
  {
    name: "medium",
    icon: "heroicons:flag",
    value: "medium",
  },
  {
    name: "high",
    icon: "heroicons:flag",
    value: "high",
  },
  {
    name: "update",
    icon: "heroicons:refresh",
    value: "update",
  },
];

export const editCatagory = [
  {
    value: "team",
    label: "team",
  },
  {
    value: "low",
    label: "low",
  },
  {
    value: "medium",
    label: "medium",
  },
  {
    value: "high",
    label: "high",
  },
];

export const projectCatagory = [
  {
    value: "team",
    label: "team",
  },
  {
    value: "low",
    label: "low",
  },
  {
    value: "medium",
    label: "medium",
  },
  {
    value: "high",
    label: "high",
  },
];
export const assignOption = [
  {
    title: "Mahedi Amin",
    image: require("@/assets/images/avatar/av-1.svg"),
  },
  {
    title: "Sovo Haldar",
    image: require("@/assets/images/avatar/av-2.svg"),
  },
  {
    title: "Rakibul Islam",
    image: require("@/assets/images/avatar/av-3.svg"),
  },
  {
    title: "Moni Haldar",
    image: require("@/assets/images/avatar/av-4.svg"),
  },
  {
    title: "Pritom Miha",
    image: require("@/assets/images/avatar/av-5.svg"),
  },
  {
    title: "Simanta Kika",
    image: require("@/assets/images/avatar/av-6.svg"),
  },
];

export const titleMenu = [
  {
    value: "Mr",
    label: "Mr",
  },
  {
    value: "Mrs",
    label: "Mrs",
  },
  {
    value: "Miss",
    label: "Miss",
  },
  {
    value: "Master",
    label: "Master",
  },
];

export const LGAMenu = [
  {
    value: "Ideato South",
    label: "Ideato South",
  },
  {
    value: "Ideato North",
    label: "Ideato North",
  },
];

export const stateMenu = [
  {
    value: "Lagos",
    label: "Lagos",
  },
  {
    value: "Imo",
    label: "Imo",
  },
];
export const countryMenu = [
  {
    value: "Nigeria",
    label: "Nigeria",
  },
  {
    value: "Egypt",
    label: "Egypt",
  },
];

export const genderMenu = [
  {
    value: "Male",
    label: "Male",
    titles: ["Mr", "Master"],
  },
  {
    value: "Female",
    label: "Female",
    titles: ["Mrs", "Miss"],
  },
];

export const demiseMenu = [
  {
    value: true,
    label: "Active",
  },
  {
    value: false,
    label: "Archived",
  },
];

export const employmentStatusMenu = [
  {
    value: "Employed",
    label: "Employed",
  },
  {
    value: "Unemployed",
    label: "Unemployed",
  },
];

export const nationalityMenu = [
  {
    value: "Nigeria",
    label: "Nigeria",
  },
  {
    value: "Ghana",
    label: "Ghana",
  },
];

export const stateOfOriginMenu = [
  {
    value: "Imo ",
    label: "Imo ",
  },
  {
    value: "Lagos",
    label: "Lagos",
  },
];

export const maritalStatusMenu = [
  {
    value: "Married",
    label: "Married",
  },
  {
    value: "Single",
    label: "Single",
  },
  {
    value: "Divorced",
    label: "Divorced",
  },
  {
    value: "Divorced/Married",
    label: "Divorced/Married",
  },
  {
    value: "Separated",
    label: "Separated",
  },
  {
    value: "Widower",
    label: "Widower",
  },
  {
    value: "Widower/Remarried",
    label: "Widower/Remarried",
  },
  {
    value: "Single Parent",
    label: "Single Parent",
  },
  {
    value: "Widow",
    label: "Widow",
  },
  {
    value: "Widow/Remarried",
    label: "Widow/Remarried",
  },
];

export const industryMenu = [
  {
    value: "Technology",
    label: "Technology",
  },
];

export const levelOfATSMenu = [
  {
    value: "1",
    label: "1",
  },
  {
    value: "2",
    label: "2",
  },
];
export const isCharterMemberMenu = [
  {
    value: true,
    label: "True",
  },
  {
    value: false,
    label: "False",
  },
];
export const CIHZoneMenu = [
  {
    value: "Chevron",
    label: "Chevron",
  },
  {
    value: "Akoka",
    label: "Akoka",
  },
];
export const affinityGroupMenu = [
  {
    value: "Choir",
    label: "Choir",
  },
  {
    value: "Single",
    label: "Single",
  },
];
export const departmentMenu = [
  {
    value: "Logistics",
    label: "Logistics",
  },
];

export const CIHAddressMenu = [
  {
    value: "Lekki",
    label: "Lekki",
  },
  {
    value: "Jakande",
    label: "Jakande",
  },
];

export const childrenDetailstable = [
  {
    label: "First Name",
    field: "firstName",
  },
  {
    label: "Last Name",
    field: "surName",
  },

  {
    label: "Gender",
    field: "gender",
  },

  {
    label: "DOB",
    field: "dateOfBirth",
  },
  {
    label: "Action",
    field: "action",
  },
];

export const userDepartmentsTable = [
  {
    label: "Department Name",
    field: "departmentName",
  },
  {
    label: "",
    field: "isPrimaryDepartment",
  },
];

export const qualificationDetailsTable = [
  {
    label: "Highest Qualification",
    field: "highestQualification",
  },
  {
    label: "Professional Qualification",
    field: "professionalQualification",
  },

  {
    label: "Action",
    field: "action",
  },
];

export const venueMenu = [
  {
    value: "Lekki",
    label: "Lekki",
  },
  {
    value: "Jakande",
    label: "Jakande",
  },
];

export const attendeeMenu = [
  {
    value: "Tayo Adegoke",
    label: "Tayo Adegoke",
  },
  {
    value: "Femi Falana",
    label: "Femi Falana",
  },
];

export const highestQualificationMenu = [
  {
    value: "OND",
    label: "OND",
  },
  {
    value: "HND",
    label: "HND",
  },
  {
    value: "B.Sc",
    label: "B.Sc",
  },
];

export const roleFilters = [
  {
    label: "Default",
    value: "",
  },
  {
    label: "First name",
    value: "firstName",
  },
  {
    label: "Surname",
    value: "surName",
  },
  {
    label: "Dob",
    value: "dob",
  },
  {
    label: "Gender",
    value: "gender",
  },
  {
    label: "Marital status",
    value: "maritalStatus",
  },
  {
    label: "Employment",
    value: "employmentStatus",
  },
  {
    label: "State",
    value: "state",
  },
];

export const ageRangeMenu = [
  {
    label: "0-10",
    value: "0-10",
  },
  {
    label: "0-20",
    value: "0-20",
  },
  {
    label: "0-30",
    value: "0-30",
  },
  {
    label: "0-40",
    value: "0-40",
  },
  {
    label: "0-50",
    value: "0-50",
  },
  {
    label: "0-60",
    value: "0-60",
  },
  {
    label: "0-70",
    value: "0-70",
  },

  {
    label: "0-80",
    value: "0-80",
  },
  {
    label: "0-90",
    value: "0-90",
  },
  {
    label: "0-100",
    value: "0-100",
  },
];

export const UserDepartmentsCardList = [
  {
    departmentName: "Hebi",
    description: "Find killer Bee",
    isDefault: true,
  },
  {
    departmentName: "Akatsuki",
    description: "Find Biju",
    isDefault: false,
  },
];
