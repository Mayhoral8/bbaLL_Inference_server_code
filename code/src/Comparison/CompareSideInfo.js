import React, {useState, useEffect}from 'react';
import "../fonts.css";
import {StyledSideInfo} from "./StatisticsInformation-style";
import { fbFirestore } from "../App/config";


const CompareSideInfo = ({name, year, isTeam, location}) => {
    const [resultArray, setResultArray] = useState(null);
    var dataOne, dataTwo, dataThree;

    useEffect(() => {
        if(year && name) {
            getDatasFromFirestore();
        }
    }, [name, year])

    function getDatasFromFirestore() {
        fbFirestore.collection("player_basic_info")
        .doc(name.replace(/ /g, "_").replace(/\./g, ","))
        .get()
        .then((doc)=>{
            var weight = doc.data()["weight"][year];
            var height = doc.data()["height"][year];
            var salary = doc.data()["salary"][year];
            var temp = [];
            temp.push(weight)
            temp.push(height)
            temp.push(salary)
            setResultArray(temp)
        })
        .catch((error) => {
            console.log(error);
        });
    }

    if (resultArray != null) {
        dataOne =  resultArray[0];
        dataTwo =  resultArray[1];
        dataThree =  resultArray[2];

        dataThree = dataThree / 1000000;
        dataThree = dataThree.toFixed(2);
    }
    //console.log("Within CompareSideInfo: " + currentYear + " " + name);
    return (
        <>
        {isTeam == "false" ? (
            <StyledSideInfo location = {location}>
                <div className={"info"}>
                    <span>Weight(kg)</span>
                    <span>{dataOne}</span>
                    <span>Height(cm)</span>
                    <span>{dataTwo}</span>
                    <span>Salary($mln)</span>
                    <span>{dataThree}</span>
                </div>
            </StyledSideInfo>
            ) : (
            <StyledSideInfo location = {location}>    
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