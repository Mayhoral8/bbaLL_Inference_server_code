import React from 'react';
import "../fonts.css";
import {StyledSideInfo} from "./comparison-style";


const CompareSideInfo = (props) => {

    return (
        <>
        {props.isTeam == "false" ? (
            <StyledSideInfo location = {props.location}>
                <p className="info">
                    Weight(kg)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;97
                    <br />Height(cm)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;197
                    <br />Salary($mln)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.8
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