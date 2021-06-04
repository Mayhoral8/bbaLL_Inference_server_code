import React from 'react'
import { PopupContainer, PopupHeader, H4, ContentContainer, BtnsContainer, CancelBtn, SubmitBtn } from './popupStyles'
const SubmitBetWarningPopup = ({onSubmit, onPopupClose, type, numberOfGamesExceedingTimeLimit}) => {
    return(
        <PopupContainer>

            {
                type === 'Submit bet warning' ? 
                <>
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
                            onPopupClose('Submit bet warning')
                        }}>
                            Cancel
                        </CancelBtn>
                    </BtnsContainer>
                </>
                :
                <>
                    <PopupHeader>
                        <H4>Alert!</H4>
                    </PopupHeader>
                    <ContentContainer>
                        Please be aware that {`${numberOfGamesExceedingTimeLimit}`} of your selected games have already been kicked off. You'll have to resbumit the bet.
                    </ContentContainer>
                    <BtnsContainer>
                        <CancelBtn onClick = {() => {
                            onPopupClose('Bet time limit exceeded')
                        }}>
                            Retry
                        </CancelBtn>
                    </BtnsContainer>
                </>
            }

        </PopupContainer>
    )
}
export default SubmitBetWarningPopup