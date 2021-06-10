import React from "react";
import GetPlayerImage from "../../Individual/Components/GetPlayerImage";
import {EachRandomSetWrapper} from '../comparison-style';

const EachRandomSet = (props) => {
    const nameOne = props.leftName.replace(/ /g, "_").replace(".", ",")
    const nameTwo = props.rightName.replace(/ /g, "_").replace(".", ",")
    const isTeam = props.isTeam;

    return(
        <EachRandomSetWrapper>
            <div className="comparsion">
                <div className="continer">
                    <div className="outlineLeft">
                        <div className="img-container-side left">
                            <GetPlayerImage playerName={nameOne} isTeam={isTeam} />
                        </div>
                    </div>
                    <p className="nameTag">{props.leftName}</p>
                    <p className="nameTag">2020-21</p>
                </div>
                <h2 className="vsText">VS</h2>
                <div className="continer">
                    <div className="outlineRight">
                        <div className="img-container-side right">
                            <GetPlayerImage playerName={nameTwo} isTeam={isTeam} />
                        </div>
                    </div>
                    <p className="nameTag">{props.rightName}</p>
                    <p className="nameTag">2020-21</p>
                </div>
            </div>
        </EachRandomSetWrapper>
    )
};

export default EachRandomSet;