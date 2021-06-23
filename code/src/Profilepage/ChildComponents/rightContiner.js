import React, {useEffect, useState} from 'react';
import { Continer, 
        StyledButtonsContiner, 
        StyleButton,
        TablesContainer} from '../Styles/rightContiner-style';
import constants from '../constants.json';
import Table from './table.js';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';
import "../Styles/customDatePickerWidth.css";

const RightContiner = (props) => {
  const [currentDisplay, setCurrentDisplay] = useState('allBets');
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: null,
    to: null
  });
  const [historyData, setHistoryData] = useState(props.userHistory.data)
  let allBetsActive, onGoingActive,finishedActive;
  let newFormatStartDate, newFromateEndDate

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
      ref={ref}
      placeholder="Select A Range"
      value={selectedDayRange.from && selectedDayRange.to ? 
            `${getDateFormat(selectedDayRange.from)} - ${getDateFormat(selectedDayRange.to)}`: ''}
      style={{
        textAlign: 'center',
        padding: '1rem 1.5rem',
        fontSize: '18px',
        border: '1px solid #9c88ff',
        borderRadius: '20px',
        width: '400px',
        boxShadow: '0 1.5rem 2rem rgba(156, 136, 255, 0.2)',
        color: '#9c88ff',
        outline: 'none',
      }}
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
        <Table
          columns = {constants.COLUMNS}
          data = {historyData}
        />
      </TablesContainer>

    </Continer>
  )
}

export default RightContiner