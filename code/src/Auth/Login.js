import React, { useEffect } from 'react'
import {LoginContainer,LoginWrapper,LoginHeader,LoginHeaderWrapper,Heading,ContentContainer,Button,ButtonContainer,Image} from './styles'
import firebase from "firebase/app"
import 'firebase/auth';
import {firebaseInstanceSpigamebet} from '../App/spigamebetFirebase'
import GoogleLogo from '../assets/images/googleLogo.svg'
import TwitterLogo from '../assets/images/twitterLogo.svg'
import FacebookLogo from '../assets/images/facebookLogo.svg'
import {connect} from 'react-redux'
import {LoginAction} from '../redux/actions/authActions'
const Login =(props)=>{
    const buttonArray=[{title:'Login with Google',type:'google',src:GoogleLogo},{title:'Login with Facebook',type:'facebook',src:FacebookLogo},{title:'Login with Twitter',type:'twitter',src:TwitterLogo}]
    const loginClickHandler=(params)=>{
        if(params==='google'){
            const provider = new firebase.auth.GoogleAuthProvider()
            firebaseInstanceSpigamebet.auth().signInWithPopup(provider)
            .then(async(res)=>{
                const {uid,displayName,email}=res.user
                await props.LoginAction({uid,displayName,email})
            })
            .catch((e)=>{
                console.log(e)// Error handeling
            })
        } else if(params==='facebook'){
            const provider = new firebase.auth.FacebookAuthProvider();
            firebaseInstanceSpigamebet.auth().signInWithPopup(provider)
            .then((res)=>{
                console.log('hiTHere')
                console.log(res)
            })
            .catch((e)=>{
                console.log(e)//error handeling
            })
        } else{
            const provider = new firebase.auth.TwitterAuthProvider()
            firebaseInstanceSpigamebet.auth().signInWithPopup(provider)
            .then((res)=>{
                const {screen_name,name}=res.additionalUserInfo.profile
                const {uid}=res.user
            })
            .catch((e)=>{
                console.log(e)
            })
        }
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
export default connect(mapStateToProps,{LoginAction})(Login)