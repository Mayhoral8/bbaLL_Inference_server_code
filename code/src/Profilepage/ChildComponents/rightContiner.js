import React, {useEffect, useState} from 'react';
import { Continer, 
        StyledButtonsContiner, 
        StyleButton,
        StyledTable} from '../Styles/rightContiner-style';

const MONEY_LINE = 'moneyLine';
const SPREAD = 'spread';
const OVER_UNDER = 'overUnder';
const NEVER_EXIST_VALUES = 'dummy';

const RightContiner = (props) => {
  const [currentDisplay, setCurrentDisplay] = useState('allBets');
  const [dataType, setDataType] = useState('all bet data')
  let historyData = props.userHistory;
  let allBetsActive, onGoingActive,finishedActive;
  let dataArray = [];
  let headerTitle = ['No.', 'Date', 'Betting type', 'Home Vs Away', 'Score', 'Bet odds', 'Bid $', 'Status']
  const headerTitleObjct = headerTitle.map((eachTitle, i) => ({id: i, title: eachTitle}));
  
  // console.log(Object.values(historyData[MONEY_LINE]));
  // console.log(Object.values(historyData[SPREAD]));
  // console.log(Object.values(historyData[OVER_UNDER]));
 
  
  if (historyData[MONEY_LINE].length != 0) {
    for (let index = 0; index < historyData[MONEY_LINE].length; index++) {
      dataArray.push(Object.values(historyData[MONEY_LINE][index]));
      //console.log(JSON.stringify(historyData[MONEY_LINE][index]) + " " + typeof(historyData[MONEY_LINE][index]));
    }
  }

  if (historyData[SPREAD].length != 0) {
    for (let index = 0; index < historyData[SPREAD].length; index++) {
      dataArray.push(Object.values(historyData[SPREAD][index]));
      //console.log(JSON.stringify(historyData[SPREAD][index]) + " " + typeof(historyData[SPREAD][index]));
    }
  }

  if (historyData[OVER_UNDER].length != 0) {
    for (let index = 0; index < historyData[OVER_UNDER].length; index++) {
      dataArray.push(Object.values(historyData[OVER_UNDER][index]));
      //console.log(JSON.stringify(historyData[OVER_UNDER][index]) + " " + typeof(historyData[OVER_UNDER][index]));
    }
  }


  console.log(dataArray)
  useEffect(()=>{
    switch(currentDisplay) {
      case 'allBets':
        setDataType('all betbdata');
        break;
      case 'onGoing':
        setDataType('ongoing data');
        break;
      case 'finished':
        setDataType('finished data');
        break;
    }
  },[currentDisplay])

  function handleAction(newState) {
    setCurrentDisplay(newState);
  }

  function renderTableHeader() {
    return headerTitleObjct.map((eachTitle) => {
      return <th key={eachTitle.id} className="HeaderStyle">{eachTitle.title}</th>
   })
  }

  console.log("current state: " + currentDisplay);

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

        {dataType}
        <StyledTable>
          <table>
            <tbody>
              <tr>{renderTableHeader()}</tr>
            </tbody>
          </table>
        </StyledTable>
    </Continer>
  )
}

export default RightContiner