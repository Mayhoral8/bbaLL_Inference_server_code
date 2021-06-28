import React, {useEffect, useState} from 'react'
import {
    ProfilePageContainer,
} from './Styles/index-styles'
import Spinner from '../Shared/Spinner/Spinner'
import {connect} from 'react-redux'
import {getUserBettingHistory} from '../redux/actions/bettingHistoryActions'
import RightContiner from './ChildComponents/rightContiner'
import LeftUserProfile from './ChildComponents/sideProfile'

const ProfilePage = (props) => {
    const [spinner, setSpinner] = useState(true)
    const [error, setError] = useState({isError: false, status:'', message: ''})
 
    useEffect(() => {
        let response = props.getUserBettingHistory(props.userDetails.user.uid)
        if(response.isError){
            setError({isError: true, status: response.status, message: response.message})
        }
    }, [])

    useEffect(() => {
        if(props.userDetails.user.displayName && !props.userDetails.isLoading){
            let response = props.getUserBettingHistory(props.userDetails.user.uid)
            if(response.isError){
                setError({isError: true, status: response.status, message: response.message})
            }
        }
    }, [props.userDetails])

    useEffect(() => {
        if(!props.bettingHistory.isLoading){
            setSpinner(false)
        }
    }, [props.bettingHistory])

   // console.log(props.bettingHistory)
    return(
        spinner ? 
            <Spinner/>
            :
            <ProfilePageContainer>
                <LeftUserProfile />
                <RightContiner userHistory = {props.bettingHistory}/>
            </ProfilePageContainer>
    )
}
const mapStateToProps = (state) => {
    return{
        userDetails: state.authReducer.userDetails,
        bettingHistory: state.bettingHistoryReducer.bettingHistory
    }
}

export default connect(mapStateToProps, {getUserBettingHistory})(ProfilePage)