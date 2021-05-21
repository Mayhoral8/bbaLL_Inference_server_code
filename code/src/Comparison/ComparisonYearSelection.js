import React, { useEffect, useState,} from "react";
import Select from "react-select";
import { fbFirestore } from "../App/config";
import { StyledDropdown } from "./comparison-style";

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
      selectedValue = selectedOption.value;
    }
  };
  
  return (
    <StyledDropdown color={colorSchem}>
      <Select
        ref={ref => setRef(ref)}
        classNamePrefix={"select"}
        isSearchable={false}
        closeMenuOnSelect={true}
        options={years}
        onChange={handleChange}
        placeholder={prompt}
      />
    </StyledDropdown>
  );
};

export default ComparisonYearSelection;
