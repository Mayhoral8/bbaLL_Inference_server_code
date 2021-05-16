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

    useEffect(() => {
        props.getUserBettingHistory(props.userDetails.user.uid)
    }, [])

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