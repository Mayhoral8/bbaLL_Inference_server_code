import React, { useEffect, useState } from "react";
import OverviewPlot from "./OverviewPlot";
import PlayByPlay from "./PlayByPlay";
import ProgressBar from "./ProgressBar";
import { BadgeButton } from "../../../globalStyles";
import "../../../fonts.css";
import { avoidColourSets } from "../../../Shared/Functions/gameStatsFunctions";
import { createScatterPlot } from "../../../Shared/Functions/scatterPlotFunctions";
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { capitalizeFirstLetter } from "../../../Shared/Functions/capitalizeFirstLetter";
import { TapsWrapper, PlotButtonsContiner, PlotButtons, SummaryOverviewWrapper} from "./Overview-styles"
// CONSTANT
const CS = 0;
const SCORES = 4;

const Summary = ({
  selectedGameIndex,
  homeTeam,
  awayTeam,
  gamePbp,
}) => {
  // extract data
  const selectedGameData = gamePbp[selectedGameIndex];
  const xAxis = selectedGameData["timer"];
  const yAxisHomeScores = selectedGameData["Home_scores"];
  const yAxisAwayScores = selectedGameData["Away_scores"];
  const efg = selectedGameData["Flow_data"]["EFG"];
  const cs = selectedGameData["Flow_data"]["RoG"];
  const scoreDiff = selectedGameData["Score_difference"];
  const fantasy = selectedGameData["Flow_data"]["Fantasy_score"];
  const playScore = selectedGameData["Flow_data"]["Play_score"];
  const rawText = selectedGameData["raw_text"];


  const colours = avoidColourSets(
    homeTeam.replace(/\s/g, "").toUpperCase(),
    awayTeam.replace(/\s/g, "").toUpperCase()
  );

  const initialRawText = [];
  for (let i = 2; i >= 0; i--) {
    initialRawText.push(rawText[rawText.length - 1 - i]);
  }

  // create an array of objects for scatter plot
  const homeData = [];
  const awayData = [];
  const efgData = [];
  const csData = [];
  const scoreDiffData = [];
  const fantasyData = [];
  const playData = [];

  const efgYValues = efg["Rolling_EFG_by_4min"]["Diff"];
  const csYValues = cs["RoG_cum_difference"];
  const fantasyYValues = fantasy["Rolling_Fantasy_score_by_4min"]["Diff"];
  const playYValues = playScore["Rolling_Play_score_by_4min"]["Diff"];

  xAxis.forEach((x, i) => createScatterPlot(yAxisHomeScores, homeData, x, i));
  xAxis.forEach((x, i) => createScatterPlot(yAxisAwayScores, awayData, x, i));
  xAxis.forEach((x, i) => createScatterPlot(efgYValues, efgData, x, i));
  xAxis.forEach((x, i) => createScatterPlot(csYValues, csData, x, i));
  xAxis.forEach((x, i) => createScatterPlot(scoreDiff, scoreDiffData, x, i));
  xAxis.forEach((x, i) => createScatterPlot(fantasyYValues, fantasyData, x, i));
  xAxis.forEach((x, i) => createScatterPlot(playYValues, playData, x, i));

  // states
  const plotButtons = ["CS", "EFG", "Fantasy", "Play"];
  const plotSideButtons= ["CS", "EFG", "Fantasy", "Play", "Scores"];

  const plotArr = [csData, efgData, fantasyData, playData];
  const progressArr = [cs, efg, fantasy, playScore];
  const YValuesArr = [csYValues, efgYValues, fantasyYValues, playYValues];
  const [toggled, setToggled] = useState(false);
  const [textToDisplay, setTextToDisplay] = useState(initialRawText);
  const [displayPlot, setDisplayPlot] = useState(plotArr[CS]);
  const [selectedPlotBtn, setSelectedPlotBtn] = useState(plotButtons[CS]);
  const [selectedToggleBtn, setSelectedToggleBtn] = useState(plotSideButtons[SCORES]);

  const [selectedPlotIndex, setSelectedPlotIndex] = useState(0);
  const [selectedPlotProgress, setSelectedPlotProgress] = useState([
    progressArr[selectedPlotIndex].Home[
      progressArr[selectedPlotIndex].Home.length - 1
    ],
    progressArr[selectedPlotIndex].Away[
      progressArr[selectedPlotIndex].Away.length - 1
    ],
  ]);
  const [scoresProgress, setScoresProgress] = useState([
    yAxisHomeScores[yAxisHomeScores.length - 1],
    yAxisAwayScores[yAxisAwayScores.length - 1],
  ]);
  const [currentText, setCurrentText] = useState("");

  const { pathname, search } = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (search) {
      let plotType = search.split("=")[1];
      if( plotType==='cs' || plotType==='efg'){
        plotType = plotType.toUpperCase();
      } else {
        plotType = capitalizeFirstLetter(plotType);
      }
      if (!plotButtons.includes(plotType)) {
        history.push("/404");
      }
      setSelectedPlotBtn(plotType);
    }
  }, []);

  // Overview plot y axis range
  const scoreDiffMinVal = Math.min(...scoreDiff);
  const scoreDiffMaxVal = Math.max(...scoreDiff);
  const scoreDiffCapVal = Math.max(scoreDiffMaxVal, Math.abs(scoreDiffMinVal));

  let leftAxisCapVal = [];
  YValuesArr.forEach((val) => {
    const leftAxisMinVal = Math.min(...val);
    const leftAxisMaxVal = Math.max(...val);
    leftAxisCapVal.push(Math.max(leftAxisMaxVal, Math.abs(leftAxisMinVal)));
  });

  return (
    <> 
      <TapsWrapper>
        <PlotButtonsContiner>
          <PlotButtons>
            {plotButtons.map((btn, i) => {
                return (
                  <BadgeButton
                    key={i}
                    isActive={btn === selectedPlotBtn}
                    onClick={() => {
                      setSelectedPlotBtn(btn);
                      setSelectedPlotIndex(i);
                      setSelectedPlotProgress([
                      progressArr[i].Home[progressArr[i].Home.length - 1],
                      progressArr[i].Away[progressArr[i].Away.length - 1],
                      ]);
                      setDisplayPlot(plotArr[i]);
                    }
                  }
                  >
                    <Link to={`${pathname}?plot=${btn.toLowerCase()}`}>{btn}</Link>
                  </BadgeButton>
                );
            })}
            
          </PlotButtons>
        </PlotButtonsContiner>
        <PlotButtonsContiner>
            <PlotButtons>
                {["Scores", selectedPlotBtn].map((btn, i) => {
                  return (
                    <BadgeButton
                      key={i}
                      onClick={() => {
                        setToggled(btn === "Scores" ? false : true);
                        setSelectedToggleBtn(btn);
                      }}
                      isActive={ btn === selectedToggleBtn}
                    >
                      <Link to={`${pathname}?plot=${btn.toLowerCase()}`}>
                        {btn}
                      </Link>
                    </BadgeButton>
                  );
                })}
              </PlotButtons>
          </PlotButtonsContiner>
      </TapsWrapper>
      
      <SummaryOverviewWrapper>
        <div>
          <div className="axis-description mobile-hide">
            <p>
              <strong>Positive: </strong>
              <span>
                {homeTeam.split(" ").slice(-1)} outperforms{" "}
                {awayTeam.split(" ").slice(-1)}
              </span>
            </p>
            <span className="vertical-divider">|</span>
            <p>
              <strong>Negative:</strong>{" "}
              <span>
                {awayTeam.split(" ").slice(-1)} outperforms{" "}
                {homeTeam.split(" ").slice(-1)}
              </span>
            </p>
          </div>

          <OverviewPlot
            homeData={homeData}
            awayData={awayData}
            scoreDiffData={scoreDiffData}
            yAxisData={displayPlot}
            selectedPlotBtn={selectedPlotBtn}
            rawText={rawText}
            setCurrentText={setCurrentText}
            homeTeam={homeTeam}
            awayTeam={awayTeam}
            homeColour={colours.colourOne}
            awayColour={colours.colourTwo}
            setTextToDisplay={setTextToDisplay}
            setSelectedPlotProgress={setSelectedPlotProgress}
            setScoresProgress={setScoresProgress}
            progressArr={progressArr}
            selectedPlotIndex={selectedPlotIndex}
            scoreDiffCapVal={scoreDiffCapVal}
            leftAxisCapVal={leftAxisCapVal}
            hide
          />
        </div>

        <div>      
          <ProgressBar
            toggled={toggled}
            scoresProgress={scoresProgress}
            selectedPlotProgress={selectedPlotProgress}
            homeColour={colours.colourOne}
            awayColour={colours.colourTwo}
          />

          <div className="desktop-hide">
            <p className="axis-description">
              <strong>Positive:</strong>{" "}
              <span>
                {homeTeam.split(" ").slice(-1)} outperforms{" "}
                {awayTeam.split(" ").slice(-1)}
              </span>
              <br />
              <strong> Negative: </strong>
              <span>
                {awayTeam.split(" ").slice(-1)} outperforms{" "}
                {homeTeam.split(" ").slice(-1)}
              </span>
            </p>
            <OverviewPlot
              homeData={homeData}
              awayData={awayData}
              scoreDiffData={scoreDiffData}
              yAxisData={displayPlot}
              selectedPlotBtn={selectedPlotBtn}
              rawText={rawText}
              setCurrentText={setCurrentText}
              homeTeam={homeTeam}
              awayTeam={awayTeam}
              homeColour={colours.colourOne}
              awayColour={colours.colourTwo}
              progressArr={progressArr}
              selectedPlotIndex={selectedPlotIndex}
              setTextToDisplay={setTextToDisplay}
              setSelectedPlotProgress={setSelectedPlotProgress}
              setScoresProgress={setScoresProgress}
              scoreDiffCapVal={scoreDiffCapVal}
              leftAxisCapVal={leftAxisCapVal}
            />
          </div>
          <PlayByPlay
            textToDisplay={textToDisplay}
            homeColour={colours.colourOne}
            awayColour={colours.colourTwo}
            currentText={currentText}
          />
        </div>
      </SummaryOverviewWrapper>
    </>
  );
};

export default Summary;
