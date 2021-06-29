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

      }, 2000)
      
    }, [ranking, startCapture])

    const setRankingScreen = async() => {
      if(startCapture === 'start'){
        let stateObject = {...ranking}
        if(ranking.rankingTypeIndex === 0){

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
          if(ranking.selectAttrIndex < 1){
            let index = ranking.selectAttrIndex
            let optionsArray = ranking.selectOptions
            setRanking({
              rankingTypeIndex: 2,
              selectAttrIndex: index + 1,
              selectOptions: optionsArray
            })
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

    const exportPlayerRankingImage = async(fileName, captureFutureGamesCard) => {
      await exportComponentAsJPEG(playerRankRef, {fileName})
      if(captureFutureGamesCard){
        exportComponentAsJPEG(futureGameListRef, {fileName: 'futureGameCard'})
      }
    }

    const configureSelectOptions = (index) => {
      let optionsArray = [];
      let rankingData = [playerRankings[0], playerRankings[1], playerRankings[2]]
      Object.keys(rankingData[index]).map((value) => {
        optionsArray.push({ value: [value], label: [labelsForDropdown[value]] });
      })
      // if(index === 2){
      //   console.log("Options Array in Function: ", optionsArray)
      // }
      return optionsArray
    }

    return(
      
        loading || startCapture === 'await' ? 
            <HomePageContainer>Loading</HomePageContainer>
        :
        <HomePageContainer>
            <PlayerRanks ref = {playerRankRef}>
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
              />
            </PlayerRanks>

            <FutureGames>
              <FutureGameListBox>
                <FutureGameListRow ref = {futureGameListRef}>
                  {
                    futureGames.map((element, index) => {
                      return(
                        <FutureGameOddsCard data={element} key={index}/>
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