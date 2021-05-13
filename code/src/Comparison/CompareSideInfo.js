import React, {useState}from 'react';
import "../fonts.css";
import {StyledSideInfo} from "./comparison-style";
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
    }

    //console.log("Within CompareSideInfo: " + currentYear + " " + name);
    return (
        <>
        {props.isTeam == "false" ? (
            <StyledSideInfo location = {props.location}>
                <p className="info">
                    Weight(kg)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{one}
                    <br />Height(cm)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{two}
                    <br />Salary($mln)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{three}
                </p>
            </StyledSideInfo>
            ) : (
            <StyledSideInfo location = {props.location}>    
                <p className="info">
                    ELo Score&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;97
                    <br />Massey Score&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;197
                    <br />Win Percentage&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.8
                </p>
            </StyledSideInfo>
            )
        }
        </>
    )
}

export default CompareSideInfo