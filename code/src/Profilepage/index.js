import React, {useEffect, useState} from 'react'
import constants from './constants.json'

//Child Components
import Table from './ChildComponents/table'

//Styled Components
import {
    ProfilePageContainer,
    TablesContainer
} from './indexStyles'

//Shared Components
import Spinner from '../Shared/Spinner/Spinner'

//Functions and Libraries
import {connect} from 'react-redux'

//Actions
import {getUserBettingHistory} from '../redux/actions/bettingHistoryActions'

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

    return(
        spinner ? 
            <Spinner/>
            :
            <ProfilePageContainer>
                <TablesContainer>
                    <Table
                     columns = {constants.moneyLineTableColumns}
                     data = {props.bettingHistory.moneyLine}
                    />
                    <Table
                     columns = {constants.spreadTableColumns}
                     data = {props.bettingHistory.spread}
                    />
                    <Table
                     columns = {constants.overUnderTableColumns}
                     data = {props.bettingHistory.overUnder}
                    />
                </TablesContainer>
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