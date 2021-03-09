// New Orleans Pelicans => {firstName: New Orleans, lastName: Pelicans}

export const breakTeamName = name => {
  let firstName = "";
  let lastName = "";
  if (name.split(" ").length === 3) {
    firstName = (
      name.split(" ")[0] +
      name.split(" ")[1]
    ).replace(/\,/g, ".");
    lastName = name.split(" ")[2].replace(/\,/g, ".");
  } else {
    firstName = name.split(" ")[0];
    lastName = name.split(" ")[1].replace(/\,/g, ".");
  }
  return { firstName, lastName };
};
