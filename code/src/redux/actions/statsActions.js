import {
    fbRealtimeDB
} from "../../App/config";

export const getStats = (statsType, year) => {
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

            let playerTeamStats = []
            let champMvpStats = {
                regular: [],
                playOffs: []
            }
            if(statsType === "player_stats_page" || statsType === "team_stats_page"){
                await fbRealtimeDB.ref(`${statsType}/${year}`)
                .once("value", (snapshots) => {
                    snapshots.forEach((snapShot) => {
                        playerTeamStats.push(snapShot.val())
                    });
                })
                dispatch({
                    type: "Stats",
                    payload: {
                        isLoading: false,
                        type: {
                            playOffs: playerTeamStats[0],
                            regular: playerTeamStats[1]
                        }
                    }
                })
            }
            else{
                await fbRealtimeDB.ref(`${statsType}`)
                .once("value", (snapshots) => {
                    snapshots.forEach((snapShot) => {
                        champMvpStats.regular.push(snapShot.val().Regular)
                        champMvpStats.playOffs.push(snapShot.val().Playoffs)
                    });
                })
                dispatch({
                    type: "Stats",
                    payload: {
                        isLoading: false,
                        type: champMvpStats
                    }
                })
            }
            
        }
        catch(e){
            throw e
        }
    }
}