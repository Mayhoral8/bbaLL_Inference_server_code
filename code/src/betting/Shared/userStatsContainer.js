import React, {useEffect, useState} from 'react'

//Actions
import { LogoutAction } from "../../redux/actions/authActions";
import { getUserRecord } from "../../redux/actions/recordActions";

//Components
import {
    UserStatsContainer, 
    ProfileImgFiguresViewMore, 
    ProfileImg, 
    UserName, 
    BettingOddsRank, 
    FiguresViewMore
} from './userStatsContainerStyles'

//Images
import Img from "../../assets/images/avatar.jpg";
import logoutIcon from "../../assets/images/logoutIcon.png";

//Functions and libraries
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {ClipLoader} from 'react-spinners'

const UserStatsBox = (props) => {
    const [statsSpinner, setStatsSpinner] = useState(true)
    const [winningRate, setWinningRate] = useState(0)
    useEffect(() => {
        props.getUserRecord(props.userDetails.uid)
    },[])

    useEffect(() => {
        if(props.userRecord.level){
            let calWinningRate = props.userRecord.numBettings === 0 ? 0
            :
            props.userRecord.numWins / props.userRecord.numBettings
            setWinningRate(calWinningRate)
            setStatsSpinner(false)
        }
    }, [props.userRecord])

    return(
        <UserStatsContainer>
            <UserName>{props.userDetails.displayName}</UserName>
            <ProfileImgFiguresViewMore>
                <ProfileImg src={Img}/>
                <FiguresViewMore>
                    {
                        props.userRecord.level
                        ?
                        <>
                            <BettingOddsRank>Points: {props.userRecord.totalPoints}</BettingOddsRank>
                            <BettingOddsRank>Rank: {props.userRecord.rank}</BettingOddsRank>
                            <BettingOddsRank>Level: {props.userRecord.level}</BettingOddsRank>
                            <BettingOddsRank>Winning Rate: {" "}
                                {
                                    winningRate.toFixed(2)
                                }
                            </BettingOddsRank>
                            <Link
                            to = '/profile'
                            >
                                View More...
                            </Link>
                        </>
                        :
                        <ClipLoader color = '#C4C4C4' size = '' loading = {statsSpinner}/>
                    }
                </FiguresViewMore>
            </ProfileImgFiguresViewMore>
        </UserStatsContainer>
    )
}


const mapStateToProps = (state) => {
  return {
    userDetails: state.authReducer.userDetails.user,
    userRecord: state.recordReducer.userRecord,
  };
};

export default connect(mapStateToProps, { LogoutAction, getUserRecord })(
  UserStatsBox
);
