import React from 'react'
import styled from 'styled-components'

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

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-around;
  outline: none;
  margin: 0 auto 0.5rem;

  span {
    margin: 0 0.5rem;
    font-size: 0.9rem;
  }

  .toggle-label {
    cursor: pointer;
    width: 40px;
    height: 21px;
    background: grey;
    display: block;
    border-radius: 40px;
    position: relative;

    &:after{
      content: '';
      position: absolute;
      top: 2px;
      left: 2px;
      width: 17px;
      height: 17px;
      background: var(--white);
      border-radius: 40px;
      transition: 0.3s;
      transform: ${({ toggled }) => toggled === true ? 'translateX(19px)' : 'translateX(0)'};
    }
  }

  input {
    height: 0;
    width: 0;
    visibility: hidden;
  }
`

export default Toggler;