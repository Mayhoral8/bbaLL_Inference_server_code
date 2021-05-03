import React, {useEffect} from 'react'

//Actions
import {LogoutAction} from '../../redux/actions/authActions'
import {getUserRecord} from '../../redux/actions/recordActions'

//Components
import {
    UserStatsContainer, 
    ProfileImgFiguresViewMore, 
    ProfileImg, 
    UserName, 
    BettingOddsRank, 
    FiguresViewMore, 
    ViewMoreLink, 
    LogoutImgContainer, 
    LogoutImg
} from './userStatsContainerStyles'

//Images
import Img from '../../assets/images/avatar.jpg'
import logoutIcon from '../../assets/images/logoutIcon.png'

//Functions and libraries
import {connect} from 'react-redux'

const UserStatsBox = (props) => {

    useEffect(() => {
        props.getUserRecord(props.userDetails.uid)
    },[])

    console.log("Hi there")

    return(
        <UserStatsContainer>
            <UserName>{props.userDetails.displayName}</UserName>
            <ProfileImgFiguresViewMore>
                <ProfileImg src={Img}/>
                <FiguresViewMore>
                    <BettingOddsRank>Points: {props.userRecord.totalPoints}</BettingOddsRank>
                    <BettingOddsRank>Rank: {props.userRecord.rank}</BettingOddsRank>
                    <BettingOddsRank>Level: {props.userRecord.level}</BettingOddsRank>
                    <BettingOddsRank>Winning Rate: {props.userRecord.winPercentage}</BettingOddsRank>
                    <ViewMoreLink>View More...</ViewMoreLink>
                </FiguresViewMore>
            </ProfileImgFiguresViewMore>
        </UserStatsContainer>
    )
}

const mapStateToProps = (state) => {
    return{
        userDetails: state.authReducer.userDetails.user,
        userRecord: state.recordReducer.userRecord
    }
}

export default connect(mapStateToProps, {LogoutAction, getUserRecord})(UserStatsBox)