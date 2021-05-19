import React from 'react'
import { PopupContainer, PopupHeader, H4, ContentContainer, BtnsContainer, CancelBtn, SubmitBtn } from './styles'
const SubmitBetWarningPopup = ({onSubmit, onCancel}) => {
    return(
        <PopupContainer>

            <PopupHeader>
                <H4>Warning!</H4>
            </PopupHeader>

            <ContentContainer>
                Please be aware that on submission, you won't be able to make changes to the overall odds anymore. Are you sure you want to continue?
            </ContentContainer>

            <BtnsContainer>
                <SubmitBtn
                 onClick = {() => {
                    onSubmit()
                 }}
                >
                    Submit
                </SubmitBtn>

                <CancelBtn onClick = {() => {
                    onCancel()
                }}>
                    Cancel
                </CancelBtn>
            </BtnsContainer>

        </PopupContainer>
    )
}
export default SubmitBetWarningPopup