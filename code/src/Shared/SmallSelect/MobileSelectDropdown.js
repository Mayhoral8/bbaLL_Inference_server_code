import React, { useRef } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { DropdownDiv, DropButton, DropList } from "./smallselect-style";

const MobileSelectDropdown = ({
  children,
  text,
  isDropped,
  single,
  setIsDropped,
}) => {
  const wrapperRef = useRef(null);
  setIsDropped && useOnClickOutside(wrapperRef, () => setIsDropped(false));

  return (
    <DropdownDiv single={single} ref={wrapperRef}>
      <DropButton onClick={() => setIsDropped(!isDropped)}>
        {text === "Plus Minus" ? "+/-" : text}
        <i className="fas fa-caret-down fa-inverse"></i>
      </DropButton>
      <DropList dropped={isDropped}>{children}</DropList>
    </DropdownDiv>
  );
};

export default MobileSelectDropdown;
