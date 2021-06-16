import React, {useEffect, useState} from 'react';
import { Continer, 
        StyledButtonsContiner, 
        StyleButton,
        TablesContainer} from '../Styles/rightContiner-style';
import constants from '../constants.json';
import Table from './table.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment'

const RightContiner = (props) => {
  const [currentDisplay, setCurrentDisplay] = useState('allBets');
  const [selectedDateRange, setSelectedDateRange] = useState([null, null]);
  const [startDate, endDate] = selectedDateRange;
  const [historyData, setHistoryData] = useState(props.userHistory.data)
  let allBetsActive, onGoingActive,finishedActive;

  console.log("render");

  function handleAction(newState) {
    setCurrentDisplay(newState);
  }

  function withinDateRange(data, startDateInput, endDateInput) {
    let dataDate = data['gameDateTime'].split(' ')[0];
    //console.log(dataDate + " " + startDateInput + " " + endDateInput)
    if (startDateInput <= dataDate && dataDate <= endDateInput) {
      return true;
    }
    return false;
  }

  useEffect(()=>{
    console.log("render from useEffect");
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

    if (startDate != null && endDate != null) {
      let newFormatStartDate = moment(startDate).format('YYYY-MM-DD');
      let newFromateEndDate = moment(endDate).format('YYYY-MM-DD');
      tempData = tempData.filter(eachData => withinDateRange(eachData, newFormatStartDate, newFromateEndDate));
    }
    setHistoryData(tempData); 
  },[currentDisplay, selectedDateRange])

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

  //console.log(historyData);

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
      
      <DatePicker 
        selectsRange={true}
        startDate={startDate} 
        endDate={endDate}
        onChange={(update) => {
          setSelectedDateRange(update);
        }}
        isClearable={true}
        monthsShown={2}
        /> 

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