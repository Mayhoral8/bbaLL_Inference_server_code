//Navbar Styled Component
import styled from "styled-components";
import { darken } from 'polished';

export const FooterDiv = styled.div`
  background: var(--penblue);
  color: var(--faint-purple);
  padding: 4rem 3rem 0;
  .footer-width {
    max-width: 1450px;
    margin: 0 auto;
  }
  .top-section {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 2rem;
  }
  .contact {
    width: 100%;
    margin: 0 auto 1rem;
    display: flex;
    flex-direction: column;
    align-items: left;
  }
  .footer-subtitle {
    margin-bottom: 1rem;
    text-transform: uppercase;
    font-weight: normal;
    letter-spacing: 1px;
    color: silver;
  }

  @media(max-width: 1024px) {
    .top-section {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media(max-width:769px) {
    padding: 3rem 1rem 0;
    text-align: center;

    .top-section{
      grid-template-columns: 1fr;
      grid-gap: 1rem;
    }
    .contact{
      width: 100%;
    }
  }
`;

export const FooterCenter = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 0;
  font-size: 0.85rem;
  border-top: 1px solid rgba(255,255,255,0.15);
  @media(max-width:768px) {
    flex-direction: column;
  }
`;

export const Emails = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  li:not(:first-child) {
    margin: 0.5rem 0;
  }
  li {
    letter-spacing: 1px;
  }
  span {
    font-size: 0.9rem;
    text-transform: uppercase;
    color: silver
  }
`;

export const IconDiv = styled.div`
  > a {
    margin-right: 1rem;
    font-size: 1.7rem; 
    cursor: pointer;
  }
  > a:not(:first-child){
    margin: 0 1rem; 
  }
`;

export const Icon = styled.a`
  color: var(--white);
  text-decoration: none;
  transition: 0.2s all;
  &:hover {
    color: ${darken(0.3, 'white')};
  }
`;

export const FooterLinksDiv = styled.div`
  display: flex;
  justify-content: center;
  a {
    color: var(--white);
    text-decoration: none;
    font-size: 0.9rem;
    &:first-child {
      margin-right: 1rem;
    }
    &:hover {
      color: ${darken(0.3, 'white')};
    }
  }
`