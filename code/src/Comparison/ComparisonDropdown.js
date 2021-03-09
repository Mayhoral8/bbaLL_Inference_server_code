import React, { useState } from "react";
import Select from "react-select";
import { StyledDropdown } from "./comparison-style";

const ComparisonDropdown = ({ isTeam, options, onChange, prompt, length, setRef }) => {
  const [filteredOptions, setFilteredOptions] = useState([]);

  const optionTeamOrPlayer = isTeam ? "team" : "player";

  const handleInputChange = (query, { action }) => {
    if (action === "set-value") {
      return;
    }

    setFilteredOptions(
      query
        ? options[query.charAt(0).toUpperCase()].filter(
            (el) => el.type === optionTeamOrPlayer
          )
        : []
    );
  };

  const handleChange = (selectedOption) => {
    if(selectedOption){
      onChange(selectedOption.value);
    }
  };
  return (
    <StyledDropdown length={length}>
      <Select
        ref={ref=> setRef(ref)}
        classNamePrefix={"select"}
        closeMenuOnSelect={true}
        blurInputOnSelect={true}
        options={filteredOptions}
        onInputChange={handleInputChange}
        onChange={handleChange}
        placeholder={prompt}
      />
      
    </StyledDropdown>
  );
};

export default ComparisonDropdown;
