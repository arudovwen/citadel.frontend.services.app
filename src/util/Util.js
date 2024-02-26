// import exportFromJSON from "export-from-json";

export const extractProperty = (arr, property) => {
  let arrayOfProperty = arr.map((item) => {
    return item[property];
  });
  return arrayOfProperty;
};

export const getUserAssignedRoles = (permissions, roles) => {
  const userRoles = [];

  permissions.forEach((permission) => {
    const role = roles.find((role) => role.id === permission.roleId);
    if (role) {
      userRoles.push(role.name);
    }
  });

  return userRoles;
};

// export const excelParser = () => {
//   function exportDataFromJSON(data, newFileName, fileExportType) {
//     if (!data) return;
//     try {
//       const fileName = newFileName || "exported-data";
//       const exportType = exportFromJSON.types[fileExportType || "xls"];
//       exportFromJSON({ data, fileName, exportType });
//     } catch (e) {
//       throw new Error("Parsing failed!");
//     }
//   }

//   return {
//     exportDataFromJSON,
//   };
// };

// Example usage:
