//Turns year 2015 to 2015-16
export const FormatYearAddEnding = (year) => {
  if (typeof year === "number") {
    year = year.toString();
  } else if (typeof year === "undefined") {
    console.error("YearFormat.js => FormatYearAddEnding => year is undefined");
  }
  if (year === "1999") {
    return "1999-00";
  } else if (parseInt(year.substr(2, 2)) + 1 < 10) {
    return year + "-0" + (parseInt(year.substr(2, 2)) + 1);
  }
  return year + "-" + (parseInt(year.substr(2, 2)) + 1);
};
//Turns 2015-16 to 2015-2016
export const FormatYearLengthen = (year) => {
  if (typeof year === "number") {
    year = year.toString();
  } else if (typeof year === "undefined") {
    console.error("YearFormat.js => FormatYearLengthen => year is undefined");
  }
  if (year === "1999-00") {
    return "1999-2000";
  }
  return year.substring(0, 5) + "20" + year.substring(5);
};

export const FormatYearShorten = (year) => {
  return year.trim().slice(0, 4);
};
