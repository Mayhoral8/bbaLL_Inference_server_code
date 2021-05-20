import React from 'react'
import styled from 'styled-components'
import { breakpoints } from '../constants/breakpoints'
import thunder from '../assets/images/Thunder.png'
import circle from '../assets/images/Circle.png'

const CustomizeVersus = () => {
  return (
    <Wrapper>
      <ComparisonVS>VS</ComparisonVS>
    </Wrapper>
  )
}

const ComparisonVS = styled.div`
  margin:${({ center }) => center ? '0 12rem' : '0 4.5rem'};
  padding: 1rem;
  position: relative;
  height: auto;


  background-image: url(${circle});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% auto;

  @media (max-width: ${breakpoints.phone}) {
    font-size: 0.7rem;
    margin: 0 1rem;
    padding: 0.7rem;
  }
`

const Wrapper = styled.div`
  height: 100%;
  background-image: url(${thunder});
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default CustomizeVersus
