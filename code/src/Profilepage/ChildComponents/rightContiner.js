import React, {useEffect, useState} from 'react';
import { Continer, 
        StyledButtonsContiner, 
        StyleButton,
        TablesContainer} from '../Styles/rightContiner-style';
import constants from '../constants.json';
import Table from './table.js';
import useWindowSize from '../../Shared/hooks/useWindowSize';
import MobileTable from '../ChildComponents/MobileTable';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import "../Styles/customDatePickerWidth.css";
import "../Styles/datePicker.css";

const RightContiner = (props) => {
  const [currentDisplay, setCurrentDisplay] = useState('allBets');
  const [historyData, setHistoryData] = useState(props.userHistory.data)
  const screenWidth = useWindowSize();
  let allBetsActive, onGoingActive,finishedActive;

  function handleAction(newState) {
    setCurrentDisplay(newState);
  }

  useEffect(() => {
    setHistoryData(props.userHistory.data);
  }, [props.userHistory.data])

  useEffect(()=>{

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
    setHistoryData(tempData); 
  },[currentDisplay])

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
  
  return (
    <Continer>
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