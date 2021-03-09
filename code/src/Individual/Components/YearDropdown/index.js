import React, { Fragment } from "react";
import { FormatYearAddEnding } from "Shared/Functions/YearFormat";
import { DropdownListItem, DropdownList } from "./yeardropdown-style";

const YearDropdown = ({
  yearDropped,
  years,
  activeYear,
  handleYearDropdown,
  setYearDropped,
}) => {
  const handleYearChange = (e) => {
    handleYearDropdown(e.target.value);
    setYearDropped(false);
  };
  if (!yearDropped) {
    return <Fragment />;
  }
  return (
    <DropdownList className="card-title">
      {years
        .filter((year) => year !== FormatYearAddEnding(activeYear))
        .map((item) => {
          return (
            <DropdownListItem
              key={item}
              value={item}
              onClick={handleYearChange}
            >
              {item}
            </DropdownListItem>
          );
        })}
    </DropdownList>
  );
};
export default YearDropdown;
