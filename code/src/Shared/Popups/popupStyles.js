import styled from 'styled-components'

export const PopupContainer = styled.div`
    width: 100%;
    box-shadow: 0px 4px 20px rgba(179, 179, 179, 0.5);
    border-radius: 10px;
`

export const PopupHeader = styled.div`
    width:100%;
    padding:20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #ececec;
`

export const H4 = styled.h4`
    color: #333333;
`

export const ContentContainer = styled.div`
    padding:40px;
    text-align:center;
`

export const BtnsContainer = styled.div`
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 40px;
`

export const SubmitBtn = styled.button`
    margin:0px 10px;
    border-radius:10px;
    background: #6733D6;
    color: #ffff;
    height: 40px;
    width: 120px;
`

export const CancelBtn = styled.button`
    margin:0px 10px;
    border-radius:10px;
    background: #d9534f;
    color: #ffff;
    height: 40px;
    width: 120px;
`