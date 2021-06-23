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

    useEffect(() => {
        setPlayerRankings(getPlayerRankings())
        setFutureGames(getFutureGames())
        setTimeout(() => {
          // exportPlayerRankingImage()
        }, 10000)
    }, [])

    useEffect(() => {
        if(playerRankings[0] && rankingTypes[0] && futureGames[0]){
            setLoading(false)
        }

    }, [playerRankings, rankingTypes, futureGames])

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

    const exportPlayerRankingImage = () => {
      exportComponentAsJPEG(futureGameListRef)
    }

    const playerRankRef = useRef(null)
    const futureGameListRef = useRef(null)


    const onButtonClick = () => {
      exportComponentAsJPEG(futureGameListRef)
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
               timeOut = {null}
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
            <button onClick = {() => { onButtonClick() }}>Click Me!</button>
        </HomePageContainer>
    )
}
export default HomePage