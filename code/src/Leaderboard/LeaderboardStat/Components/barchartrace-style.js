import styled from "styled-components";

export const UserInputContainer = styled.div`
  display: flex;
  align-items: center;

  .slider {
    -webkit-appearance: none;
    width: 100%;
    height: 15px;
    border-radius: 5px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #4caf50;
    cursor: pointer;
  }

  .slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #4caf50;
    cursor: pointer;
  }

  .slider-text {
    margin: 0.5rem;
  }
`;

export const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Roboto Condensed;
  width: 100%;
`;

export const ButtonStyle = styled.div`
  display: flex;
  justify-content: center;

  .PauseButton {
    background-color: white;
    color: black;
    border: 2px solid #4caf50;
    color: #4caf50;
    padding: 16px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    transition-duration: 0.4s;
    cursor: pointer;
    margin-right: 1rem;
  }

  .PauseButton:hover {
    background-color: #4caf50;
    color: white;
  }
`;