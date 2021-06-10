import React from 'react'
import {Button} from "./Overview-styles"

const Toggler = ({ setToggled, toggled, leftText, rightText }) => {
  return (
    <Button onClick={() => setToggled(!toggled)} toggled={toggled}>
      <span>{rightText}</span>
      <input type='checkbox' />
      <div className='toggle-label'></div>
      <span>{leftText}</span>
    </Button>
  );
}

export default Toggler;