import React, {useEffect, useState} from 'react'

//Actions
import {LogoutAction} from '../../redux/actions/authActions'
import {getUserRecord} from '../../redux/actions/recordActions'

//Components
import {
    UserStatsContainer, 
    ProfileImgFiguresViewMore, 
    ProfileImg, 
    UserName, 
    Points,
    Rank,
    Level,
    WinningRate, 
    FiguresViewMore,
    ViewMoreLink
} from './userStatsContainerStyles'

//Images
import Img from '../../assets/images/avatar.jpg'
import logoutIcon from '../../assets/images/logoutIcon.png'

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
                            <Points>Points: {props.userRecord.totalPoints}</Points>
                            <Rank>Rank: {props.userRecord.rank}</Rank>
                            <Level>Level: {props.userRecord.level}</Level>
                            <WinningRate>Win Rate: {" "}
                                {
                                    winningRate.toFixed(2)
                                }
                            </WinningRate>
                            <ViewMoreLink>
                                <Link
                                to = '/profile'
                                >
                                    View More...
                                </Link>
                            </ViewMoreLink>
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
    return{
        userDetails: state.authReducer.userDetails.user,
        userRecord: state.recordReducer.userRecord
    }
}

export default connect(mapStateToProps, {LogoutAction, getUserRecord})(UserStatsBox)