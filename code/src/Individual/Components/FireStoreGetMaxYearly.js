import { fbFirestore } from "Firebase";
const getMaxYearly = (year, playersOrTeams, setMaxYearly) => {
  fbFirestore
    .collection("max_yearly_stats")
    .doc(year)
    .collection("teams_players")
    .doc(playersOrTeams)
    .get()
    .then((doc) => {
      setMaxYearly(doc.data());
    })
    .catch((error) => {
      console.log(error);
    });
};
export default getMaxYearly;
