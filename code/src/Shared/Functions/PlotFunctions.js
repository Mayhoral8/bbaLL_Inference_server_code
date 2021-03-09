//This function return a name with a <br> in between for plots
export const cleanName = (name) => {
  let newName = "";
  if (name.split(" ").length === 3) {
    newName = (
      name.split(" ")[0] +
      "\n" +
      name.split(" ")[1] +
      " " +
      name.split(" ")[2]
    ).replace(/\,/g, ".");
  } else {
    newName = (name.split(" ")[0] + "\n" + name.split(" ")[1]).replace(
      /\,/g,
      "."
    );
  }
  return newName;
};