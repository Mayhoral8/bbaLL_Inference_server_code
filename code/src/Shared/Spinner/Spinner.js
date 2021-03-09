import React from 'react';
import spinner from "../../assets/images/spinner.svg";
import { SpinnerWrapper } from "./spinner-style";

const Spinner = () => {
  return (
    <SpinnerWrapper>
      <img src={spinner} alt="Loading..." />
    </SpinnerWrapper>
  )
}

export default Spinner;