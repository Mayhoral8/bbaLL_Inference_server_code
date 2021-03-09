import React, { useRef, useState } from "react";
import Select from "react-select";
import { SidebarSearchDiv } from "./sidebarsearch-style";
import names from "JSON/name.json";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const SidebarSearch = ({ searchOpen, setSearchOpen }) => {
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [searchText, setSearchText] = useState("");

  const wrapperRef = useRef(null);
  searchOpen && useOnClickOutside(wrapperRef, () => setSearchOpen(false));

  const handleInputChange = (query, { action }) => {
    if (action === "set-value") {
      return;
    }
    setSearchText(query);
    setFilteredOptions(query ? names[query.charAt(0).toUpperCase()] : []);
  };

  const handleChange = (selectedOption) => {
    window.location.assign(`/${selectedOption.type}/${selectedOption.value}`);
  };

  return (
    <SidebarSearchDiv searchOpen={searchOpen} ref={wrapperRef}>
      <Select
        classNamePrefix={"select"}
        closeMenuOnSelect={true}
        blurInputOnSelect={true}
        options={filteredOptions}
        inputValue={searchText}
        onInputChange={handleInputChange}
        onChange={handleChange}
      />
    </SidebarSearchDiv>
  );
};
export default SidebarSearch;
