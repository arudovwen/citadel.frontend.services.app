export const extractProperty = (arr, property) => {
  let arrayOfProperty = arr.map((item) => {
    return item[property];
  });
  return arrayOfProperty;
};
