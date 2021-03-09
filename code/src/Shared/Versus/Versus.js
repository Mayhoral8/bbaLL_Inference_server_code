import React from 'react'
import styled from 'styled-components'
import { breakpoints } from '../../constants/breakpoints'

const Versus = () => {
  return (
    <StyledVersus>VS</StyledVersus>
  )
}

const StyledVersus = styled.div`
  margin:${({ center }) => center ? '0 12rem' : '0 4.5rem'};
  border: 1px solid silver;
  border-radius: 50%;
  padding: 1rem;
  position: relative;
  height: fit-content;
  @media (max-width: ${breakpoints.phone}) {
    font-size: 0.7rem;
    margin: 0 1rem;
    padding: 0.7rem;
  }
  &:before, &:after {
    content: '';
    width: 3rem;
    height: 1px;
    background: silver;
    position: absolute;
    top: 50%;
    @media (max-width: ${breakpoints.phone}) {
      width: 1rem;
    }
  }
  &:before {
    left: -50%;
    transform: translateX(-47%);
    @media (max-width: ${breakpoints.phone}) {
      left: -26%;
    }
  }
  &:after {
    right: -50%;
    transform: translateX(47%);
    @media (max-width: ${breakpoints.phone}) {
      right: -26%;
    }
  }
`
export default Versus
