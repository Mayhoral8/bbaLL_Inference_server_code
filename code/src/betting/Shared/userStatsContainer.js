import React from 'react'
import Img from '../../assets/images/avatar.jpg'

import {UserStatsContainer, ProfileImgFiguresViewMore, ProfileImg, UserName, BettingOddsRank, FiguresViewMore, ViewMoreLink} from './userStatsContainerStyles'

const UserStatsBox = () => {
    return(
        <UserStatsContainer>
            <UserName>Daniel Wong</UserName>
            <ProfileImgFiguresViewMore>
                <ProfileImg src={Img}/>
                <FiguresViewMore>
                    <BettingOddsRank>Betting Odds: 20.4%</BettingOddsRank>
                    <BettingOddsRank>Rank: 12209 (191)</BettingOddsRank>
                    <ViewMoreLink>View More...</ViewMoreLink>
                </FiguresViewMore>
            </ProfileImgFiguresViewMore>
        </UserStatsContainer>
    )
}

export default UserStatsBox