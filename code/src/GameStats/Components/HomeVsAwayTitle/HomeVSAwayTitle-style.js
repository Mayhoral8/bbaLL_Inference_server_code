import styled from 'styled-components';
export const StyledHomeVsAwayTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .team-title {
    width: 50%;
    display: flex;
  }
  .team-title:first-child {
    justify-content: flex-end;
  }
  .versus {
    margin:${({ center }) => center ? '0 12rem' : '0 4.5rem'};
    border: 1px solid silver;
    border-radius: 50%;
    padding: 1rem;
    position: relative;
  }
  .versus:before, .versus:after {
    content: '';
    width: 3rem;
    height: 1px;
    background: silver;
    position: absolute;
    top: 50%;
  }
  .versus:before {
    left: -50%;
    transform: translateX(-47%);
  }
  .versus:after {
    right: -50%;
    transform: translateX(47%);
  }
`