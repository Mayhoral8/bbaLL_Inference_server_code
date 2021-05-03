import React from 'react'

import {UsersRankContainer, Col, Header, ColContainer, ColHeading} from './usersRankContainerStyles'

const UserRankContainer = () => {
    return(
        <UsersRankContainer>
            <Header>Users Ranking</Header>
            <ColContainer>
                <Col>
                    <ColHeading>Name</ColHeading>
                    <div></div>
                </Col>
                <Col>
                    <ColHeading>Points</ColHeading>
                    <div></div>
                </Col>
            </ColContainer>
        </UsersRankContainer>
    )
}

export default UserRankContainer