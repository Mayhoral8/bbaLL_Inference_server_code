import React, { Fragment } from "react";
import { CareerTableDiv } from "../indiv-style";
import * as CONSTANTS from "../individualConstants";

const CareerTable = ({ stats, years, filterBy }) => {
  const dataGrid = years.map((year, i) => {
    if (year === filterBy) {
      return (
        <CareerTableDiv key={i}>
          {stats[i].map((stat, j) => (
            <div className='single-data-container' key={j}>
              <div className='single-data'>{stat}</div>
              <div className='table-label'>{CONSTANTS.careerTableStatNames[j]}</div>
            </div>
          ))}
          <div className='single-data-container'></div>
          <div className='single-data-container'></div>
        </CareerTableDiv>
      )
    }
  });
  return <>{dataGrid}</>
};

export default CareerTable;
