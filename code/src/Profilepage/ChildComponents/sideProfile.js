import React, { useEffect, useState } from "react";

//Actions
import { getUserRecord } from "../../redux/actions/recordActions";

//Components
import {
  UserStatsContainer,
  ProfileImgFigures,
  ProfileImg,
  UserName,
  PointsRank,
  LevelWinRate,
  Stats,
  StatsContainer,
  IconFigure,
  Icon,
  Figure,
  LoginLogoutBtnsContainer,
  LoginLogoutBtnsWrapper,
  AuthBtn,
} from "../Styles/profileStyle";

//Images
import Img from "../../assets/images/avatar.jpg";
import starIcon from "../../assets/images/star.svg";
import levelIcon from "../../assets/images/level.svg";
import rankIcon from "../../assets/images/rank.svg";
import winRateIcon from "../../assets/images/winRate.svg";
import loginIcon from "../../assets/images/loginIcon.png";
import logoutIcon from "../../assets/images/logoutIcon.png";

//Functions and libraries
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const UserStatsBox = (props) => {
  const [statsSpinner, setStatsSpinner] = useState(true);
  const [winningRate, setWinningRate] = useState(0);
  useEffect(() => {
    props.getUserRecord(props.userDetails.uid);
  }, []);

  useEffect(() => {
    if (props.userRecord.level) {
      let calWinningRate =
        props.userRecord.numBettings === 0
          ? 0
          : props.userRecord.numWins / props.userRecord.numBettings;
      setWinningRate(calWinningRate);
      setStatsSpinner(false);
    }
  }, [props.userRecord]);



  return (
    <UserStatsContainer>
      <UserName>{props.userDetails.displayName}</UserName>
      <ProfileImgFigures>
        <ProfileImg src={Img} />
        <StatsContainer>
          {props.userRecord.level ? (
            <>
              <PointsRank>
                <Stats>
                  Points
                  <IconFigure>
                    <Icon src={starIcon} />
                    <Figure>{props.userRecord.totalPoints.toFixed(3)}</Figure>
                  </IconFigure>
                </Stats>

                <Stats>
                  Rank
                  <IconFigure>
                    <Icon src={rankIcon} />
                    <Figure>{props.userRecord.rank}</Figure>
                  </IconFigure>
                </Stats>
              </PointsRank>

              <LevelWinRate>
                <Stats>
                  Level
                  <IconFigure>
                    <Icon src={levelIcon} />
                    <Figure>{props.userRecord.level}</Figure>
                  </IconFigure>
                </Stats>

                <Stats>
                  Win Rate
                  <IconFigure>
                    <Icon src={winRateIcon} />
                    <Figure>{winningRate.toFixed(2)}</Figure>
                  </IconFigure>
                </Stats>
              </LevelWinRate>
            </>
          ) : (
            <ClipLoader color="#C4C4C4" size="" loading={statsSpinner} />
          )}

          {props.userDetails.displayName ? (
            <LoginLogoutBtnsContainer>
              <LoginLogoutBtnsWrapper
                onClick={() => {
                  props.userDetails.uid
                    ? onLogoutClick()
                    : setLoginModalVisible(true);
                }}
              >
                {props.userDetails.uid ? (
                  <AuthBtn src={logoutIcon} />
                ) : (
                  <AuthBtn src={loginIcon} />
                )}
              </LoginLogoutBtnsWrapper>
            </LoginLogoutBtnsContainer>
          ) : null}
        </StatsContainer>
      </ProfileImgFigures>
      <div className="styledDiv">
        <Link to="/betting" className="styledButton">Bet Now</Link>
      </div>
    </UserStatsContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.authReducer.userDetails.user,
    userRecord: state.recordReducer.userRecord,
  };
};

export default connect(mapStateToProps, { getUserRecord })(UserStatsBox);
