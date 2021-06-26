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
    const [rankingTypes, setRankingTypes] = useState([])
    const [rankingTypeIndex, setRankingTypeIndex] = useState(0)
    const [selectAttrIndex, setSelectAttrIndex] = useState(0)


    const playerRankRef = useRef(null)
    const futureGameListRef = useRef(null)


    useEffect(() => {
        setPlayerRankings(getPlayerRankings())
        setFutureGames(getFutureGames())

        setTimeout(async() => {
          
            // await exportPlayerRankingImage('BidailyPlayerRankings')
            setSelectAttrIndex(1)
        }, 10000)

    }, [])

    useEffect(() => {
        if(playerRankings[0] && rankingTypes[0] && futureGames[0]){
            setLoading(false)
        }
    }, [playerRankings, rankingTypes, futureGames])

    useEffect(() => {
      if(rankingTypeIndex === 0){
        if(selectAttrIndex < 3){
          setTimeout(() => {
            setSelectAttrIndex((prevState) => prevState + 1)
          }, 2000)
        }

        else{
          setSelectAttrIndex(0)
          setRankingTypeIndex(1)
        }
      }
      else if(rankingTypeIndex === 1){
        if(selectAttrIndex < 3){

          setTimeout(() => {
            setSelectAttrIndex((prevState) => prevState+ 1)
          }, 2000)
        }

        else{
          setSelectAttrIndex(0)
          setRankingTypeIndex(2)
        }
      }
      else if(rankingTypeIndex === 2){
        if(selectAttrIndex < 1){
          setTimeout(() => {
            setSelectAttrIndex(prevState => prevState + 1)
          }, 2000)
        }
      }
    }, [rankingTypeIndex, selectAttrIndex])

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

    return(
        loading ? 
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
               selectRankingIndex = {rankingTypeIndex}
               isScreenCapture = {true}
               selectAttrIndex = {selectAttrIndex}
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