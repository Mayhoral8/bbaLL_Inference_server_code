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
import DatePicker from 'react-modern-calendar-datepicker';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import "./Styles/customDatePickerWidth.css";
import "./Styles/datePicker.css";

const ProfilePage = (props) => {
    const [spinner, setSpinner] = useState(true);
    const [error, setError] = useState({isError: false, status:'', message: ''});
    const[selectedDayRange, setSelectedDayRange] = useState({from: null, to: null});
    let maxDate = null, minDate = null;
    let currentDate = new Date();
    let currentMonth = momentTimeZone(currentDate).tz('America/New_York').format('M');

 
    useEffect(() => {
        let response = props.getUserBettingHistory(props.userDetails.user.uid, selectedDayRange)
        if(response.isError){
            setError({isError: true, status: response.status, message: response.message})
        }
    }, [])

    useEffect(() => {
        if(props.userDetails.user.displayName && !props.userDetails.isLoading){
            let response = props.getUserBettingHistory(props.userDetails.user.uid, selectedDayRange)
            if(response.isError){
                setError({isError: true, status: response.status, message: response.message})
            }
        }
    }, [props.userDetails, selectedDayRange])

    useEffect(() => {
        if(!props.bettingHistory.isLoading){
            setSpinner(false)
        }
    }, [props.bettingHistory])

    const renderCustomInput = ({ ref }) => (
        <input
          readOnly
          ref = {ref}
          placeholder = {getPlaceHolder()} 
          value = {selectedDayRange.from && selectedDayRange.to ? 
                `${getDateFormat(selectedDayRange.from)} - ${getDateFormat(selectedDayRange.to)}`: ''}
          className="datePicker input"
        />
    )
    
    function getPlaceHolder(){
        let tempOne, tempTwo;

        if (minDate && maxDate) {
            tempOne = minDate.split(' ');
            tempTwo = maxDate.split(' ');
            return tempOne[0] + ' - ' + tempTwo[0];
        }

        return "No data available";
    }

    function getDateFormat(dateObject) {
        let returnString = null;
        if (dateObject == null) {
          return;
        }
        let year = dateObject['year'];
        let month = (dateObject['month'] < 10) ? '0' + dateObject['month'] : dateObject['month'];
        let day = (dateObject['day'] < 10) ? '0' + dateObject['day'] : dateObject['day'];
        returnString = year + '-' + month + '-' + day;
    
        return returnString;
    }

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

                <div className='Wrapper'>
                    <p className="titleStyle">My Bets</p>
                    <div className="customDatePickerWidth">
                        <DatePicker
                        value={selectedDayRange}
                        onChange={setSelectedDayRange}
                        shouldHighlightWeekends
                        colorPrimary="#552A9F"
                        colorPrimaryLight="rgba(85, 42, 159, 0.4)"
                        renderInput={renderCustomInput}
                        renderFooter={() => (
                            <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '40px'}}>
                            <button
                                type="button"
                                onClick={() => {
                                setSelectedDayRange({
                                    from: null,
                                    to: null
                                })
                                }}
                                style={{
                                border: '#0fbcf9',
                                color: '#fff',
                                borderRadius: '0.5rem',
                                padding: '12px 7px',
                                backgroundColor: '#552A9F'
                                }}
                            >
                                Reset Value!
                            </button>
                            </div>
                        )}
                        />
                    </div>
                    <RightContiner 
                        userHistory = {props.bettingHistory} 
                        minDate = {minDate} 
                        maxDate = {maxDate}/>
                </div>
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