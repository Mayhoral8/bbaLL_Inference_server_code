import style from "styled-components";

export const Wrapper = style.div`
  border: 1px solid #552A9F;
  border-radius: 10px;
  margin: 30px 0px;
  width: auto;
  background: linear-gradient(to top, white 85%, #FB4A59 15%);
  font-family: Poppins;
  font-style: normal;

  .title {
    font-weight: 500;
    font-size: 18px;
    color: white;
    padding-left: 15px;
  }

  .info{
    padding-top: 10px;
    color: #552A9F;
    font-size: 14px;
    font-weight: 600;
  }

  .date{
    padding-left: 12px;
  }
`;

export const GameDetail = style.div`
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  padding-top: 5px;
  .name{
    padding-top: 25px;
    font-weight: 800;
    font-size: 18px;
    text-align: center;
    color: black;
  }
`;

export const ButtonDiv = style.div`
  padding: 10px 0;
  display: flex;
  justify-content: center;
  .buttonStyle{
    color: white;
    background-color: #65AE24;
    border-radius: 5px;
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    padding: 10px 20px;
  }
`;
