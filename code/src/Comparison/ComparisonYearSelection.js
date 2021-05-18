import React, { useEffect, useState,} from "react";
import Select from "react-select";
import { fbFirestore } from "../App/config";
import { StyledDropdownRed, StyledDropdownBule } from "./comparison-style";

const ComparisonYearSelection = ({ isTeam, name, onChange, setRef, prompt, colorSchem}) => {
  const [years, setYears] = useState([]);

  useEffect(() => {
    if (name) {
      getYearsFromFirestore(name);
    }
  }, [name]);

  const getYearsFromFirestore = (name) => {
    fbFirestore
      .collection(isTeam ? "team_statistics" : "player_statistics")
      .doc(name.replace(/_/g, " "))
      .collection("years")
      .get()
      .then((snapshot) => {
        setYears(
          snapshot.docs
            .map((doc) => ({ value: doc.id, label: doc.id }))
            .reverse()
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (selectedOption) => {
    if (selectedOption) {
      onChange(selectedOption.value);
    }
  };
  if (colorSchem == "blue") {
    return (
      <StyledDropdownBule>
        <Select
          ref={ref => setRef(ref)}
          classNamePrefix={"select"}
          isSearchable={false}
          closeMenuOnSelect={true}
          options={years}
          onChange={handleChange}
          placeholder={prompt}
        />
      </StyledDropdownBule>
    );
  } else {
    return (
      <StyledDropdownRed>
        <Select
          ref={ref => setRef(ref)}
          classNamePrefix={"select"}
          isSearchable={false}
          closeMenuOnSelect={true}
          options={years}
          onChange={handleChange}
          placeholder={prompt}
        />
      </StyledDropdownRed>
    );
  }
};

export default ComparisonYearSelection;
