import React from "react";
import {RandomPlayerContiner} from './comparison-style';
import GetPlayerImage from "../Individual/Components/GetPlayerImage";

// Larry Nace Jr.
const RandomComparison = (props) => {
  const currentYear = props.compareYear;

  function setPlayer(nameOne, nameTwo) {
    props.setTempNameOneProp(nameOne.replace(/ /g, "_").replace(".", ","));
    props.setTempNameTwoProp(nameTwo.replace(/ /g, "_").replace(".", ","));
    props.setTempYearOneProp(currentYear);
    props.setTempYearTwoProp(currentYear);

    props.setNameOneProp(nameOne.replace(/ /g, "_").replace(".", ","));
    props.setNameTwoProp(nameTwo.replace(/ /g, "_").replace(".", ","));
    props.setYearOneProp(currentYear);
    props.setYearTwoProp(currentYear);
  }
  return (
      <RandomPlayerContiner>
          <div className="comparsion" onClick={()=>setPlayer(props.one, props.two)}>
            <div className="continer">
              <div className="img-container-side left">
                <GetPlayerImage playerName={props.one.replace(/ /g, "_").replace(".", ",")} isTeam={props.team} />
              </div>
              <p className="nameTag">{props.one}</p>
              <p className="nameTag">2020-21</p>
            </div>
            <h2 className="vsText">VS</h2>
            <div className="continer">
              <div className="img-container-side right">
                <GetPlayerImage playerName={props.two.replace(/ /g, "_").replace(".", ",")} isTeam={props.team} />
              </div>
              <p className="nameTag">{props.two}</p>
              <p className="nameTag">2020-21</p>
            </div>
          </div>
          
          <div className="comparsion" onClick={()=>setPlayer(props.three, props.four)}>
            <div className="continer">
              <div className="img-container-side left">
                <GetPlayerImage playerName={props.three.replace(/ /g, "_").replace(".", ",")} isTeam={props.team} />
              </div>
              <p className="nameTag">{props.three}</p>
              <p className="nameTag">2020-21</p>
            </div>
            <h2 className="vsText">VS</h2>
            <div className="continer">
              <div className="img-container-side right">
                <GetPlayerImage playerName={props.four.replace(/ /g, "_").replace(".", ",")} isTeam={props.team} />
              </div>
              <p className="nameTag">{props.four}</p>
              <p className="nameTag">2020-21</p>
            </div>
          </div>

          <div className="comparsion" onClick={()=>setPlayer(props.five, props.six)}>
            <div className="continer">
              <div className="img-container-side left">
                <GetPlayerImage playerName={props.five.replace(/ /g, "_").replace(".", ",")} isTeam={props.team} />
              </div>
              <p className="nameTag">{props.five}</p>
              <p className="nameTag">2020-21</p>
            </div>
            <h2 className="vsText">VS</h2>
            <div className="continer">
              <div className="img-container-side right">
                <GetPlayerImage playerName={props.six.replace(/ /g, "_").replace(".", ",")} isTeam={props.team} />
              </div>
              <p className="nameTag">{props.six}</p>
              <p className="nameTag">2020-21</p>
            </div>
          </div>

          <div className="comparsion" onClick={()=>setPlayer(props.seven, props.eight)}>
            <div className="continer">
              <div className="img-container-side left">
                <GetPlayerImage playerName={props.seven.replace(/ /g, "_").replace(".", ",")} isTeam={props.team} />
              </div>
              <p className="nameTag">{props.seven}</p>
              <p className="nameTag">2020-21</p>
            </div>
            <h2 className="vsText">VS</h2>
            <div className="continer">
              <div className="img-container-side right">
                <GetPlayerImage playerName={props.eight.replace(/ /g, "_").replace(".", ",")} isTeam={props.team} />
              </div>
              <p className="nameTag">{props.eight}</p>
              <p className="nameTag">2020-21</p>
            </div>
          </div>

          <div className="comparsion" onClick={()=>setPlayer(props.nine, props.ten)}>
            <div className="continer">
              <div className="img-container-side left">
                <GetPlayerImage playerName={props.nine.replace(/ /g, "_").replace(".", ",")} isTeam={props.team} />
              </div>
              <p className="nameTag">{props.nine}</p>
              <p className="nameTag">2020-21</p>
            </div>
            <h2 className="vsText">VS</h2>
            <div className="continer">
              <div className="img-container-side right">
                <GetPlayerImage playerName={props.ten.replace(/ /g, "_").replace(".", ",")} isTeam={props.team} />
              </div>
              <p className="nameTag">{props.ten}</p>
              <p className="nameTag">2020-21</p>
            </div>
          </div>
      </RandomPlayerContiner>
  )
}

export default RandomComparison;