import React, {useEffect, useState} from 'react';
import {
    ProfilePageContainer,
} from './Styles/index-styles';
import Spinner from '../Shared/Spinner/Spinner';
import {connect} from 'react-redux';
import {getUserBettingHistory} from '../redux/actions/bettingHistoryActions';
import RightContiner from './ChildComponents/rightContiner';
import LeftUserProfile from './ChildComponents/sideProfile';
import moment from 'moment';
import momentTimeZone from 'moment-timezone';

const ProfilePage = (props) => {
    const [spinner, setSpinner] = useState(true);
    const [error, setError] = useState({isError: false, status:'', message: ''});
    //const[selectedDayRange, setSelectedDayRange] = useState({from: null, to: null});
    let maxDate = null, minDate = null;
    let currentDate = new Date();
    let currentMonth = momentTimeZone(currentDate).tz('America/New_York').format('M');

 
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


   //console.log(props.bettingHistory);
    if (props.bettingHistory.data != undefined) {
        for (let index = 0; index < props.bettingHistory.data.length; index++) {
            let gameDate = props.bettingHistory.data[index]['gameDateTime'];
            let gameMonth = moment(gameDate).format('M');
            if (currentMonth === gameMonth) {
                if (maxDate == null) {
                    maxDate = props.bettingHistory.data[index]['gameDateTime'];
                }
            
                if (minDate == null) {
                    minDate = props.bettingHistory.data[index]['gameDateTime'];
                }
            
                if (minDate > props.bettingHistory.data[index]['gameDateTime']) {
                    minDate = props.bettingHistory.data[index]['gameDateTime'];
                }
            
                if (maxDate < props.bettingHistory.data[index]['gameDateTime']) {
                    maxDate = props.bettingHistory.data[index]['gameDateTime'];
                }
            }
        }
    }

    return(
        spinner ? 
            <Spinner/>
            :
            <ProfilePageContainer>
                <LeftUserProfile />

                <RightContiner 
                    userHistory = {props.bettingHistory} 
                    minDate = {minDate} 
                    maxDate = {maxDate}/>
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