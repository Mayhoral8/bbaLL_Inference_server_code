import styled from 'styled-components'

export const MainContainer=styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    padding:50px;
    background:#333333;
`

export const Wrapper=styled.div`
    display:flex;
    width:100%;

`

export const AvatarC=styled.div`
    width:20%;
`

export const AvatarImg=styled.img`
    width:100%;
    height:100%;
    object-fit: cover;
`

export const Header=styled.div`
    display:flex;
    width:100%;
`

export const Name=styled.div`
    width:20%;
    text-align:center;
    margin-bottom:10px;
    color:#b3b3b3;
    font-weight:900;
`

export const Ratings=styled.div`
    width:80%;
    text-align:center;
    color:#b3b3b3;
    margin-bottom:10px;
    font-weight:900;
`

export const ContentC=styled.div`
    width:80%;
    display:flex;
    justify-content:center;
    align-items:flex-start;
    flex-direction:column;
`