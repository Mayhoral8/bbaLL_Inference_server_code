import React, {useEffect, useState} from 'react';
import { Continer, 
        StyledButtonsContiner, 
        StyleButton,
        TablesContainer} from '../Styles/rightContiner-style';
import constants from '../constants.json';
import Table from './table.js';
import DatePicker from 'react-modern-calendar-datepicker';
import useWindowSize from '../../Shared/hooks/useWindowSize';
import MobileTable from '../ChildComponents/MobileTable';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import "../Styles/customDatePickerWidth.css";
import "../Styles/datePicker.css";

const RightContiner = (props) => {
  const [currentDisplay, setCurrentDisplay] = useState('allBets');
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null
  });
  const [historyData, setHistoryData] = useState(props.userHistory.data)
  const screenWidth = useWindowSize();
  let allBetsActive, onGoingActive,finishedActive;
  let newFormatStartDate, newFromateEndDate;
  let maxDate = props.maxDate, minDate = props.minDate;

  function handleAction(newState) {
    setCurrentDisplay(newState);
  }

  function withinDateRange(data, startDateInput, endDateInput) {
    let dataDate = data['gameDateTime'].split(' ')[0];
    if (startDateInput <= dataDate && dataDate <= endDateInput) {
      return true;
    }
    return false;
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

  function getPlaceHolder(){
    let tempOne, tempTwo;

    if (minDate && maxDate) {
      tempOne = minDate.split(' ');
      tempTwo = maxDate.split(' ');
      return tempOne[0] + ' - ' + tempTwo[0];
    }

    return "No data available";
  }

  useEffect(()=>{
    //console.log("render from useEffect");
    let tempData = props.userHistory.data;
    switch(currentDisplay) {
      case 'allBets':
        break;
      case 'onGoing':
        tempData = tempData.filter(eachData => eachData['gameFinished'] === 'Ongoing');
        break;
      case 'finished':
        tempData = tempData.filter(eachData => eachData['gameFinished'] === 'Finished');
        break;
    }

    if (selectedDayRange.from != null && selectedDayRange.to != null) {
      newFormatStartDate = getDateFormat(selectedDayRange.from);
      newFromateEndDate = getDateFormat(selectedDayRange.to);
      tempData = tempData.filter(eachData => withinDateRange(eachData, newFormatStartDate, newFromateEndDate));
    }
    setHistoryData(tempData); 
  },[currentDisplay, selectedDayRange])

  switch (currentDisplay) {
    case 'allBets':
      allBetsActive = true;
      onGoingActive = false;
      finishedActive = false;
      break;
    case 'onGoing':
      allBetsActive = false;
      onGoingActive = true;
      finishedActive = false;
      break;
    
    case 'finished':
      allBetsActive = false;
      onGoingActive = false;
      finishedActive = true;
      break;

    default:
      allBetsActive = true;
      onGoingActive = false;
      finishedActive = false;
      break;
  }

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
  
  return (
    <Continer>
      <p className="titleStyle">My Bets</p>
      <StyledButtonsContiner>
        <StyleButton isActive = {allBetsActive}>
          <button className="eachButton" onClick={() => handleAction('allBets')}>All Bets</button>
        </StyleButton>
        <StyleButton isActive = {onGoingActive} >
          <button className="eachButton" onClick={() => handleAction('onGoing')}>Ongoing</button>
        </StyleButton>
        <StyleButton isActive = {finishedActive}>
          <button className="eachButton" onClick={() => handleAction('finished')}>Finished</button>
        </StyleButton>
      </StyledButtonsContiner>

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
      
                
      <TablesContainer>
        {  screenWidth <= 610 ? (
            <MobileTable data = {historyData}/>
          ) : (
            <Table
              columns = {constants.COLUMNS}
              data = {historyData}
            />
          )}
      </TablesContainer>

    </Continer>
  )
}

export default RightContiner