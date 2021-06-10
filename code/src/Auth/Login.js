import React from 'react'
import {LoginContainer,LoginWrapper,LoginHeader,LoginHeaderWrapper,Heading,ContentContainer,Button,ButtonContainer,Image} from './styles'
import GoogleLogo from '../assets/images/googleLogo.svg'
import TwitterLogo from '../assets/images/twitterLogo.svg'
import FacebookLogo from '../assets/images/facebookLogo.svg'
import {connect} from 'react-redux'
const Login =(props)=>{
    
    const buttonArray = [
        {
            title: 'Login with Google', 
            type: 'google', 
            src: GoogleLogo
        },
        {
            title: 'Login with Facebook', 
            type:'facebook', 
            src: FacebookLogo
        },
        {
            title: 'Login with Twitter', 
            type:'twitter', 
            src: TwitterLogo
        }
    ]

    const loginClickHandler=(params)=>{
        props.onLoginClick(params)
    }
    return(
        <LoginContainer>
            <LoginWrapper>
                <LoginHeader>
                    <LoginHeaderWrapper>
                        <Heading>Sign in</Heading>
                    </LoginHeaderWrapper>
                </LoginHeader>
                <ContentContainer>
                    {buttonArray.map((element,index)=>{
                        return(
                            <ButtonContainer key={index} type={element.type} onClick={()=>{
                                loginClickHandler(element.type)
                            }}>
                                <Image src={element.src}/>
                                <Button>{element.title}</Button>
                            </ButtonContainer>
                        )
                    })}
                </ContentContainer>
            </LoginWrapper>
        </LoginContainer>
    )
}
const mapStateToProps=(state)=>{
    return{
        state
    }
}
export default connect(mapStateToProps)(Login)