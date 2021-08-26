import {
    fbRealtimeDB
} from "../../App/config";

export const getStats = (statsType, year) => {
    console.log(statsType, year)
    return async(dispatch) => {
        try{
            dispatch({
                type: "Stats",
                    payload: {
                        isLoading: true,
                        type: {
                            playOffs: null,
                            regular: null
                        }
                    }
            })
            let data = []
            await fbRealtimeDB.ref(`${statsType}/${year}`).once("value", (snapshots) => {
                snapshots.forEach((snapShot) => {
                    data.push(snapShot.val())
                });

                dispatch({
                    type: "Stats",
                    payload: {
                        isLoading: false,
                        type: {
                            playOffs: data[0],
                            regular: data[1]
                        }
                    }
                })
            })
        }
        catch(e){
            throw e
        }
    }
}