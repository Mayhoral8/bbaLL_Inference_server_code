import React from 'react'
import Img from '../assets/images/avatar.jpg'
import {MainContainer,AvatarC,ContentC,Wrapper,AvatarImg,Header,Name,Ratings} from './styles'
class UserProfile extends React.Component{
    render(){
        return(
            <MainContainer>
                <Header>
                    <Name>Daniel Jiwoong</Name>
                    <Ratings>Ratings</Ratings>
                </Header>
                <Wrapper>
                    <AvatarC>
                        <AvatarImg src={Img} alt=''/>
                    </AvatarC>
                    <ContentC>
                        
                    </ContentC>
                </Wrapper>
            </MainContainer>
        )
    }
}
export default UserProfile