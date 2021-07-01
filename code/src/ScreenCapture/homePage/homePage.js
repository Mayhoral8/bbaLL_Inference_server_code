import React, {useState, useEffect, useRef} from 'react'

import { fbFirestore } from "../../App/config"
import { exportComponentAsJPEG } from 'react-component-export-image'

import {
    HomePageContainer,
    PlayerRanks,
    FutureGames,
    FutureGameListBox,
    FutureGameListRow

} from './homePageStyles'

import PlayerRankingCard from '../../Main/playerRankingsCard'
import FutureGameOddsCard from '../../Main/futureGameOddsCard'

import momentTimezone from 'moment-timezone'

const { WebClient } = require('@slack/web-api');
const slack = new WebClient(process.env.REACT_APP_SLACK_TOKEN);

const HomePage = () => {

    const [loading, setLoading] = useState(true)
    const [playerRankings, setPlayerRankings] = useState([{}, {}, {}])
    const [futureGames, setFutureGames] = useState([])
    const [startCapture, setStartCapture] = useState('await')
    const [rankingTypes, setRankingTypes] = useState([])
    const [ranking, setRanking] = useState({
      selectAttrIndex: 0,
      rankingTypeIndex: 0,
      selectOptions: [
        {
          label: ['Points'],
          value: ['Points'],
        },
        {
          label: ['Fantasy Score'],
          value: ['FantasyScore'],
        },
        {
          label: ['Three-pointers'],
          value: ['Three-Pointers'],
        },
        {
          label: ['Possession'],
          value: ['PointsPerPoss'],
        }
      ]
    })

    const labelsForDropdown = {
      FantasyScore: "Fantasy Score",
      Points: "Points",
      PointsPerPoss: "Possession",
      "Three-Pointers": "Three-pointers",
      Num_DD: "Double-Double",
      Num_TD: "Triple-Double",
    };


    const playerRankRef = useRef(null)
    const futureGameListRef = useRef(null)

    useEffect(() => {
        setPlayerRankings(getPlayerRankings())
        setFutureGames(getFutureGames())
        getLatestSlackTrigger()
    }, [])

    useEffect(() => {
        if(playerRankings[0] && rankingTypes[0] && futureGames[0]){
            setLoading(false)
            setStartCapture('start')
        }

    }, [playerRankings, rankingTypes, futureGames])

    useEffect(() => {

      setTimeout(async () => {

        setRankingScreen()

      }, 10000)
      
    }, [ranking, startCapture])

    const setRankingScreen = async() => {
      if(startCapture === 'start'){
        let stateObject = {...ranking}
        if(ranking.rankingTypeIndex === 0){
          // exportComponentAsJPEG(playerRankRef, {fileName: `PlayerRankingsBidaily${ranking.selectOptions[ranking.selectAttrIndex].label[0]}`})
          // await triggerSlackMessage(`PlayerRankingsBidaily${ranking.selectOptions[ranking.selectAttrIndex].label[0]}`)
          if(ranking.selectAttrIndex < 3){
            setRanking({
              ...stateObject,
              selectAttrIndex: stateObject.selectAttrIndex + 1
            })
          }
          
          else{
              let optionsArray = configureSelectOptions(1)
              setRanking({
                rankingTypeIndex: 1,
                selectAttrIndex: 0,
                selectOptions: optionsArray
              })
          }
          
        }
  
        else if(ranking.rankingTypeIndex === 1){
          // exportComponentAsJPEG(playerRankRef, {fileName: `PlayerRankingsWeekly${ranking.selectOptions[ranking.selectAttrIndex].label[0]}`})
          // await triggerSlackMessage(`PlayerRankingsWeekly${ranking.selectOptions[ranking.selectAttrIndex].label[0]}`)
          if(ranking.selectAttrIndex < 3){
            setRanking({
              ...stateObject,
              selectAttrIndex: stateObject.selectAttrIndex + 1
            })
          }
  
          else{
            let optionsArray = configureSelectOptions(2)
            setRanking({
              rankingTypeIndex: 2,
              selectAttrIndex: 0,
              selectOptions: optionsArray
            })
          }
        }
        
        else if(ranking.rankingTypeIndex === 2){
          // exportComponentAsJPEG(playerRankRef, {fileName: `PlayerRankingsSeasonal${ranking.selectOptions[ranking.selectAttrIndex].label[0]}`})
          // await triggerSlackMessage(`PlayerRankingsSeasonal${ranking.selectOptions[ranking.selectAttrIndex].label[0]}`)
          if(ranking.selectAttrIndex < 1){
            let index = ranking.selectAttrIndex
            let optionsArray = ranking.selectOptions
            setRanking({
              rankingTypeIndex: 2,
              selectAttrIndex: index + 1,
              selectOptions: optionsArray
            })
          }

          else{
            // exportComponentAsJPEG(futureGameListRef, {fileName: 'FutureGame'})
            // await triggerSlackMessage('FutureGame')
          }
        }

      }
    }

    const getPlayerRankings = () => {
      let data = [];
      fbFirestore
        .collection("ranking")
        .get()
        .then((snapshot) => {
          const documents = snapshot.docs.map((doc) => doc.data());
          const types = ["bidaily", "weekly", "seasonal"];
  
          let foundTypes = [];
          types.forEach((type) => {
            if (
              type in documents[0] &&
              Object.keys(documents[0][type]).length !== 0
            ) {
              data.push(documents[0][type]);
              foundTypes.push(type);
            }
          });
  
          setRankingTypes(foundTypes);
          data.push(documents[1]);
        });
      return data;
    };

    const getFutureGames = () => {
      let gamesFound = [];
      fbFirestore
      .collection("future_game_info")
      .get()
      .then((snapshot) => {
        snapshot.docs.map((doc) => {
          const obj = doc.data();
          if (Object.keys(obj).length !== 0) {
            gamesFound.push(obj);
          }
        });
      })
      .catch((e) => {
        //Error handeling to be done.
      });
      return gamesFound
    }

    const configureSelectOptions = (index) => {
      let optionsArray = [];
      let rankingData = [playerRankings[0], playerRankings[1], playerRankings[2]]
      Object.keys(rankingData[index]).map((value) => {
        optionsArray.push({ value: [value], label: [labelsForDropdown[value]] });
      })
      return optionsArray
    }

    const triggerSlackMessage = async(fileName) => {
      const date = momentTimezone(new Date()).tz("America/New_York").format('YYYY-MM-DD hh:mm A')
      await slack.chat.postMessage({
        text: `Home page image added: {${date}}  {${fileName}}`,
        channel: process.env.REACT_APP_SLACK_CHANNEL_ID,
      });
    }

    // const getLatestSlackTrigger = async() => {
    //   const result = await slack.conversations.history({
    //     token: process.env.REACT_APP_SLACK_TOKEN,
    //     channel: process.env.REACT_APP_SLACK_CHANNEL_ID,
    //     inclusive: true,
    //     limit: 1
    //   });
    //   console.log(result)
    // }

    return(
      
        loading || startCapture === 'await' ? 
            <HomePageContainer>Loading</HomePageContainer>
        :
        <HomePageContainer>
            <PlayerRanks>
              <PlayerRankingCard
               data = {[playerRankings[0], playerRankings[1], playerRankings[2]]}
               rankingTypes = {rankingTypes}
               selectedRankingType = {null}
               timeOut = {null}
               cycling  = {false}
               selectRankingIndex = {ranking.rankingTypeIndex}
               isScreenCapture = {true}
               selectAttrIndex = {ranking.selectAttrIndex}
               selectOptionsScreenCapture = {ranking.selectOptions}
               reference = {playerRankRef}
              />
            </PlayerRanks>

            <FutureGames>
              <FutureGameListBox>
                <FutureGameListRow>
                  {
                    futureGames.map((element, index) => {
                      return(
                        <FutureGameOddsCard data={element} key={index} reference = {futureGameListRef}/>
                      )
                    })
                  }
                </FutureGameListRow>
              </FutureGameListBox>
            </FutureGames>
        </HomePageContainer>
    )
}
export default HomePage