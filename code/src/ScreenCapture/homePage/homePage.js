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
    const [startCapture, setStartCapture] = useState('loading')
    const [rankingTypes, setRankingTypes] = useState([])
    const [futureGamesRefs, setFutureGamesRefs] = useState([])
    const [rankingProps, setRankingProps] = useState({
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
    const refsArray = useRef([])

    useEffect(() => {
        setPlayerRankings(getPlayerRankings())
        setFutureGames(getFutureGames())
        // getLatestSlackTrigger()
    }, [])
    
    useEffect(() => {
        if(playerRankings[0] && rankingTypes[0] && futureGames[0]){
            refsArray.current = new Array(futureGames.length)
            setLoading(false)
            setStartCapture('start')
        }
    }, [playerRankings, rankingTypes, futureGames])

    // useEffect(() => {
    //   if(startCapture === 'await'){
    //     setTimeout(() => {
    //       setRankingProps({
    //         selectAttrIndex: 0,
    //         rankingTypeIndex: 0,
    //         selectOptions: [
    //           {
    //             label: ['Points'],
    //             value: ['Points'],
    //           },
    //           {
    //             label: ['Fantasy Score'],
    //             value: ['FantasyScore'],
    //           },
    //           {
    //             label: ['Three-pointers'],
    //             value: ['Three-Pointers'],
    //           },
    //           {
    //             label: ['Possession'],
    //             value: ['PointsPerPoss'],
    //           }
    //         ]
    //       })
    //       setStartCapture('start')
    //     }, 60000);
    //   }
    // }, [startCapture])

    useEffect(() => {
        if(startCapture === 'start'){
          setTimeout(() => {
            setRankingScreen()
          }, 10000)
        }
    }, [rankingProps, startCapture])

    const setRankingScreen = async() => {
      let stateObject = rankingProps
      if(rankingProps.rankingTypeIndex === 0){
        // exportComponentAsJPEG(playerRankRef, {fileName: `PlayerRankingsBidaily${rankingProps.selectOptions[rankingProps.selectAttrIndex].label[0]}`})
        // await triggerSlackMessage(`PlayerRankingsBidaily${rankingProps.selectOptions[rankingProps.selectAttrIndex].label[0]}`)
        if(rankingProps.selectAttrIndex < 3){
          setRankingProps({
            ...stateObject,
            selectAttrIndex: stateObject.selectAttrIndex + 1
          })
        }
        
        else{
            let optionsArray = configureSelectOptions(1)
            setRankingProps({
              rankingTypeIndex: 1,
              selectAttrIndex: 0,
              selectOptions: optionsArray
            })
        }
        
      }

      else if(rankingProps.rankingTypeIndex === 1){
        // exportComponentAsJPEG(playerRankRef, {fileName: `PlayerRankingsWeekly${rankingProps.selectOptions[rankingProps.selectAttrIndex].label[0]}`})
        // await triggerSlackMessage(`PlayerRankingsWeekly${rankingProps.selectOptions[rankingProps.selectAttrIndex].label[0]}`)
        if(rankingProps.selectAttrIndex < 3){
          setRankingProps({
            ...stateObject,
            selectAttrIndex: stateObject.selectAttrIndex + 1
          })
        }

        else{
          let optionsArray = configureSelectOptions(2)
          setRankingProps({
            rankingTypeIndex: 2,
            selectAttrIndex: 0,
            selectOptions: optionsArray
          })
        }
      }
      
      else if(rankingProps.rankingTypeIndex === 2){
        // exportComponentAsJPEG(playerRankRef, {fileName: `PlayerRankingsSeasonal${rankingProps.selectOptions[rankingProps.selectAttrIndex].label[0]}`})
        // await triggerSlackMessage(`PlayerRankingsSeasonal${rankingProps.selectOptions[rankingProps.selectAttrIndex].label[0]}`)
        if(rankingProps.selectAttrIndex < 1){
          let index = rankingProps.selectAttrIndex
          let optionsArray = rankingProps.selectOptions
          setRankingProps({
            rankingTypeIndex: 2,
            selectAttrIndex: index + 1,
            selectOptions: optionsArray
          })
        }

        else{
          // exportComponentAsJPEG(futureGameListRef, {fileName: 'FutureGame'})
          // await triggerSlackMessage('FutureGame')
          setStartCapture('await')
        }
      }
    }
    console.log(refsArray)
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

    return(
      
        loading? 
            <HomePageContainer>Loading</HomePageContainer>
        :
        <HomePageContainer>
            <PlayerRanks>
              <PlayerRankingCard
               data = {[playerRankings[0], playerRankings[1], playerRankings[2]]}
               timeOut = {null}
               cycling  = {false}
               isScreenCapture = {true}
               rankingProps = {rankingProps}
               reference = {playerRankRef}
               rankingTypes = {rankingTypes}
              />
            </PlayerRanks>

            <FutureGames>
              <FutureGameListBox>
                <FutureGameListRow>
                  {
                    futureGames.map((element, index) => {
                      return(
                        <FutureGameOddsCard data={element} key={index} reference = {referedEl => refsArray.current[index] = referedEl}/>
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