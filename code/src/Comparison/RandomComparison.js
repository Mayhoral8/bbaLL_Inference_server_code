import React from "react";
import {RandomPlayerContiner} from './comparison-style';
import GetPlayerImage from "../Individual/Components/GetPlayerImage";

function RandomComparison(props) {

  console.log(props.compareYear)
  function setPlayer(nameOne, nameTwo) {
    console.log("function run")
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
              <div className="img-container-side">
                <GetPlayerImage playerName={props.one.replace(" ", "_").replace(".", ",")} isTeam={props.team} />
              </div>
              <p className="nameTag">{props.one}</p>
              <p className="nameTag">2020-21</p>
            </div>
            <h2 className="vsText">VS</h2>
            <div className="continer">
              <div className="img-container-side">
                <GetPlayerImage playerName={props.two.replace(" ", "_").replace(".", ",")} isTeam={props.team} />
              </div>
              <p className="nameTag">{props.two}</p>
              <p className="nameTag">2020-21</p>
            </div>
          </div>
          
          <div className="comparsion" onClick={()=>setPlayer(props.three, props.four)}>
            <div className="continer">
              <div className="img-container-side">
                <GetPlayerImage playerName={props.three.replace(" ", "_").replace(".", ",")} isTeam={props.team} />
              </div>
              <p className="nameTag">{props.three}</p>
              <p className="nameTag">2020-21</p>
            </div>
            <h2 className="vsText">VS</h2>
            <div className="continer">
              <div className="img-container-side">
                <GetPlayerImage playerName={props.four.replace(" ", "_").replace(".", ",")} isTeam={props.team} />
              </div>
              <p className="nameTag">{props.four}</p>
              <p className="nameTag">2020-21</p>
            </div>
          </div>

          <div className="comparsion" onClick={()=>setPlayer(props.five, props.six)}>
            <div className="continer">
              <div className="img-container-side">
                <GetPlayerImage playerName={props.five.replace(" ", "_").replace(".", ",")} isTeam={props.team} />
              </div>
              <p className="nameTag">{props.five}</p>
              <p className="nameTag">2020-21</p>
            </div>
            <h2 className="vsText">VS</h2>
            <div className="continer">
              <div className="img-container-side">
                <GetPlayerImage playerName={props.six.replace(" ", "_").replace(".", ",")} isTeam={props.team} />
              </div>
              <p className="nameTag">{props.six}</p>
              <p className="nameTag">2020-21</p>
            </div>
          </div>

          <div className="comparsion" onClick={()=>setPlayer(props.seven, props.eight)}>
            <div className="continer">
              <div className="img-container-side">
                <GetPlayerImage playerName={props.seven.replace(" ", "_").replace(".", ",")} isTeam={props.team} />
              </div>
              <p className="nameTag">{props.seven}</p>
              <p className="nameTag">2020-21</p>
            </div>
            <h2 className="vsText">VS</h2>
            <div className="continer">
              <div className="img-container-side">
                <GetPlayerImage playerName={props.eight.replace(" ", "_").replace(".", ",")} isTeam={props.team} />
              </div>
              <p className="nameTag">{props.eight}</p>
              <p className="nameTag">2020-21</p>
            </div>
          </div>

          <div className="comparsion" onClick={()=>setPlayer(props.nine, props.ten)}>
            <div className="continer">
              <div className="img-container-side">
                <GetPlayerImage playerName={props.nine.replace(" ", "_").replace(".", ",")} isTeam={props.team} />
              </div>
              <p className="nameTag">{props.nine}</p>
              <p className="nameTag">2020-21</p>
            </div>
            <h2 className="vsText">VS</h2>
            <div className="continer">
              <div className="img-container-side">
                <GetPlayerImage playerName={props.ten.replace(" ", "_").replace(".", ",")} isTeam={props.team} />
              </div>
              <p className="nameTag">{props.ten}</p>
              <p className="nameTag">2020-21</p>
            </div>
          </div>
      </RandomPlayerContiner>
  )
}

export default RandomComparison;