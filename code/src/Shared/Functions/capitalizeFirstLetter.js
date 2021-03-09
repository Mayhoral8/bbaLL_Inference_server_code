export const capitalizeFirstLetter = (path) => {
  if (path.includes("-")) {
    return capitalizeFirstLetterFunction(path, "-");
  } else if (path.includes("_")) {
    return capitalizeFirstLetterFunction(path, "_");
  }
  return capitalizeFirstLetterFunction(path, " ");
};

const capitalizeFirstLetterFunction = (path, splitBy) => {
  return path
    .toLowerCase()
    .split(splitBy)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(splitBy);
};
