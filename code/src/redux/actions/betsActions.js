import {fbFirestore} from '../../App/config'
import {GET_FUTURE_GAMES_INFO} from './types'

export const getFutureGamesInfo=()=>{
    return async(dispatch)=>{
        await fbFirestore.collection('future_game_info').get()
        .then(async(collections)=>{
            let data=[]
            await collections.forEach((doc) => {
                const docData=doc.data()
                data.push(docData)
            })
            dispatch({
                type:GET_FUTURE_GAMES_INFO,
                payload:data
            })
        })
        .catch((e)=>{
            throw e
        })
    }
}