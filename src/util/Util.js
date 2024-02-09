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

// Example usage:
