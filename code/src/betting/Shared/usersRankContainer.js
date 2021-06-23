import React, {useState, useEffect}from 'react'
import { fbFirestoreSpigameBet } from '../../App/spigamebetFirebase'
import { Argsort } from "Shared/Functions/Argsort";
import {UsersRankContainer, 
        Col, 
        Header, 
        ColContainer} from './usersRankContainerStyles'

async function getUserId(){
    let dataInform = await fbFirestoreSpigameBet.collection('userRecords').get();
    //console.log(dataInform)
    let data=[]
    let playerInfo = [];
    let rank = [];
    let sortedPlayerInfo = [];

    dataInform.forEach((doc) => {
        const docData = doc.data()
        const docId = doc.id
        data.push({docData, docId})
    })

    for (let index = 0; index < data.length; index++) {
        //console.log(index + ": " + data[index].docData['displayName'] + " " + data[index].docData['rank'])
        let eachPlayerObject = {
            name: data[index].docData['displayName'],
            odd: (Math.round(data[index].docData['totalPoints'] * 100) / 100).toFixed(2)
        }

        playerInfo.push(eachPlayerObject);
        rank.push(data[index].docData['rank']);
    }
    
    let sorted = Argsort(rank);
    for ( let index = 0; index < sorted.length; index++) {
        sortedPlayerInfo.push(playerInfo[sorted[index]]);
    }

    return sortedPlayerInfo;
}

const UserRankContainer = () => {
    const [dataArray, setDataArray] = useState("");

    useEffect(() => {
        getUserId()
          .then(link => setDataArray(() => link))
          .catch(() => setDataArray(""));
      }, []);
    //console.log(dataArray.length);

    return(
        <>
        { dataArray.length != 0 &&
            <UsersRankContainer>
                <Header>Users Ranking</Header>
                <ColContainer>
                    <Col>
                        <div>Name</div>
                        <div>Odd</div>
                    </Col>
                    {
                        dataArray.map((element) => {
                            return(
                                <Col>
                                    <div>{element['name']}</div>
                                    <div>{element['odd']}</div>
                                </Col>
                            )
                        })
                    }

                </ColContainer>
            </UsersRankContainer>
        }
        </>
    )
}

export default UserRankContainer