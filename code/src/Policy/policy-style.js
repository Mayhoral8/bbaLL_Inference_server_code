import styled from 'styled-components';

export const TemplateDiv = styled.div`
  text-align: left;
  color: #333;
  line-height: 1.5;
  margin: 2rem auto;
  @media(min-width: 996px) {
  }
  h3 {
    box-shadow: #534a91 0px -2px inset;
    display: inline-block;
    margin: 2rem 0 0;
  }
  h4 {
    margin: 1.5rem 0 0;
  }
  p{
    margin: 0.5rem 0 1rem;
  }
  ul,ol {
    margin-left: 2rem;
  }
  li {
    margin: 0.5rem 0;
  }
  a {
    color: #333;
  }
  .last-update {
    margin: 2rem 0 0;
  }
`