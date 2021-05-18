import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { fbStorage } from "Firebase";
import Loader from "../../Shared/Loader";

const GetPlayerImage = ({ playerName, isTeam }) => {
  const history = useHistory();
  const pageLocation = history.location.pathname;

  const [playerUrl, setPlayerUrl] = useState("");

  useEffect(() => {
    let isMounted = true;
    fbStorage
      .ref()
      .child(
        `${isTeam ? "team_logo_spi" : "player_photo_hayaoStyle_S"}/${
          playerName + ".png"
        }`
      )
      .getDownloadURL()
      .then((url) => {
        if (isMounted) {
          setPlayerUrl(url);
        }
      })
      .catch(() => {
        fbStorage
          .ref()
          .child(`player_photo_hayaoStyle_S/Anonymous_Image.png`)
          .getDownloadURL()
          .then((url) => {
            if (isMounted) {
              setPlayerUrl(url);
            }
          })
          .catch((error) => console.log(error));
      });
    return () => {
      isMounted = false;
    };
  }, [playerName]);

  if (playerUrl === "") {
    return <Loader page={pageLocation} />;
  }

  return <img src={playerUrl} alt={playerName} />;
};

export default GetPlayerImage;
