import React from "react";
import {RandomPlayerContiner} from './comparison-style';
import GetPlayerImage from "../Individual/Components/GetPlayerImage";

function RandomComparison(props) {

    function setPlayer(nameOne, nameTwo) {
      console.log(nameOne + " " + nameTwo);
      props.setTempNameOneProp(nameOne.replace(" ", "_").replace(".", ","));
      props.setTempNameTwoProp(nameTwo.replace(" ", "_").replace(".", ","));
      props.setTempYearOneProp(props.compareYear);
      props.setTempYearTwoProp(props.compareYear);

      props.setNameOneProp(nameOne.replace(" ", "_").replace(".", ","));
      props.setNameTwoProp(nameTwo.replace(" ", "_").replace(".", ","));
      props.setYearOneProp(props.compareYear);
      props.setYearTwoProp(props.compareYear);
    }

    return (
        <RandomPlayerContiner>
            <div className="comparsion" onClick={()=>setPlayer(props.one, props.two)}>
              <div className="continer">
                <div className="img-container">
                  <GetPlayerImage playerName={props.one.replace(" ", "_").replace(".", ",")} isTeam={props.team} />
                </div>
                <p className="nameTag">{props.one}</p>
              </div>
              <h2 className="vsText">VS</h2>
              <div className="continer">
                <div className="img-container">
                  <GetPlayerImage playerName={props.two.replace(" ", "_").replace(".", ",")} isTeam={props.team} />
                </div>
                <p className="nameTag">{props.two}</p>
              </div>
            </div>
            
            <div className="comparsion" onClick={()=>setPlayer(props.three, props.four)}>
              <div className="continer">
                <div className="img-container">
                  <GetPlayerImage playerName={props.three.replace(" ", "_").replace(".", ",")} isTeam={props.team} />
                </div>
                <p className="nameTag">{props.three}</p>
              </div>
              <div>
                <h2 className="vsText">VS</h2>
              </div>
              <div className="continer">
                <div className="img-container">
                  <GetPlayerImage playerName={props.four.replace(" ", "_").replace(".", ",")} isTeam={props.team} />
                </div>
                <p className="nameTag">{props.four}</p>
              </div>
            </div>

            <div className="comparsion" onClick={()=>setPlayer(props.five, props.six)}>
              <div className="continer">
                <div className="img-container">
                  <GetPlayerImage playerName={props.five.replace(" ", "_").replace(".", ",")} isTeam={props.team} />
                </div>
                <p className="nameTag">{props.five}</p>
              </div>
              <div>
                <h2 className="vsText">VS</h2>
              </div>
              <div className="continer">
                <div className="img-container">
                  <GetPlayerImage playerName={props.six.replace(" ", "_").replace(".", ",")} isTeam={props.team} />
                </div>
                <p className="nameTag">{props.six}</p>
              </div>
            </div>
        </RandomPlayerContiner>
    )
}

export default RandomComparison;