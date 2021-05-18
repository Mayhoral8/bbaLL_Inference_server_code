import React, {useEffect} from 'react'

//Child Components
import Table from './ChildComponents/table'

//Styled Components
import {
    ProfilePageContainer,
    TableContainer
} from './indexStyles'

//Functions and Libraries
import {connect} from 'react-redux'

//Actions
import {getUserBettingHistory} from '../redux/actions/userBettingHistoryActions'

const ProfilePage = (props) => {

    // useEffect(() => {
    //     props.getUserBettingHistory(props.userDetails.user.uid)
    // }, [])
    if(props.userDetails.user.displayName){
        props.getUserBettingHistory(props.userDetails.user.uid)
    }
    // useEffect(() => {
    //     if(props.userDetails.user.displayName && !props.userDetails.isLoading){
    //         props.getUserBettingHistory(props.userDetails.user.uid)
    //     }
    // }, [props.userDetails])

    return(
        <ProfilePageContainer>
            <TableContainer>
                <Table
                 columns = {[]}
                 data = {[]}
                />
            </TableContainer>
        </ProfilePageContainer>
    )
}
const mapStateToProps = (state) => {
    return{
        userDetails: state.authReducer.userDetails
    }
}

export default connect(mapStateToProps, {getUserBettingHistory})(ProfilePage)