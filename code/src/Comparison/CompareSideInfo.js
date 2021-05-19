import React, {useState}from 'react';
import "../fonts.css";
import {StyledSideInfo} from "./StatisticsInformation-style";
import { fbFirestore } from "../App/config";


const CompareSideInfo = (props) => {
    const currentYear = props.year;
    const name = (props.name).replace(/ /g, "_").replace(/\./g, ",");
    const [resultArray, setResultArray] = useState(null);
    var one, two, three;

    fbFirestore.collection("player_basic_info")
    .doc(name)
    .get()
    .then((doc)=>{
        var weight = doc.data()["weight"][currentYear];
        var height = doc.data()["height"][currentYear];
        var salary = doc.data()["salary"][currentYear];
        var temp = [];
        temp.push(weight)
        temp.push(height)
        temp.push(salary)
        setResultArray(temp)
    })
    .catch((error) => {
        console.log(error);
    });

    if (resultArray != null) {
        one =  resultArray[0];
        two =  resultArray[1];
        three =  resultArray[2];

        three = three / 1000000;
        three = three.toFixed(2);
    }

    //console.log("Within CompareSideInfo: " + currentYear + " " + name);
    return (
        <>
        {props.isTeam == "false" ? (
            <StyledSideInfo location = {props.location}>
                <div className={"info"}>
                    <span>Weight(kg)</span>
                    <span>{one}</span>
                    <span>Height(cm)</span>
                    <span>{two}</span>
                    <span>Salary($mln)</span>
                    <span>{three}</span>
                </div>
            </StyledSideInfo>
            ) : (
            <StyledSideInfo location = {props.location}>    
                <div className={"info"}>
                    <span>Elo Score</span>
                    <span>20</span>
                    <span>Massey Score</span>
                    <span>30</span>
                    <span>Win Percentage</span>
                    <span>40</span>
                </div>
            </StyledSideInfo>
            )
        }
        </>
    )
}

export default CompareSideInfo