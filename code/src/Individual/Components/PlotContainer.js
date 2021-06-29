import React, { PureComponent } from "react";
import { PlotDiv } from "../indiv-style";
import { FormatYearAddEnding } from "Functions/YearFormat";
import { fbFirestore } from "Firebase";
import { ContainerCard, GraphTitle } from "../../globalStyles";
import IndivPlots from "./IndivPlots";
import * as individualConstants from "../individualConstants";
import { withRouter } from "react-router-dom";
import Spinner from "../../Shared/Spinner/Spinner";
//props: name, categoryData, indivStat
const LegendEntries = 2;
const PlotTitle = 3;
const PlotType = 4;
const Left = 0;
const Right = 1;

class PlotContainer extends PureComponent {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.getData = this.getData.bind(this);
    this.plotData = this.plotData.bind(this);
    this.fetchFromFirestore = this.fetchFromFirestore.bind(this);
    this.state = {
      indivStat: [],
      top100Stat: [],
      top100YearIndices: [],
      PlayerYearsUsed: this.props.isTeam,
      name: this.props.name,
      width: window.innerWidth,
    };
  }
  componentDidMount() {
    this.fetchFromFirestore();
    window.addEventListener("resize", () =>
      this.setState({ width: window.innerWidth })
    );
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener("resize", () =>
      this.setState({ width: window.innerWidth })
    );
  }

  componentDidUpdate() {
    if (!this._isMounted) {
      return;
    }
    if (this.props.name !== this.state.name) {
      this.fetchFromFirestore();
      this.setState({ name: this.props.name });
    }
  }

  fetchFromFirestore() {
    let years;
    const indivCollection = fbFirestore.collection(
      this.props.isTeam ? "team_ind_page_v2" : "player_ind_page_v2"
    );
    indivCollection
      .doc(this.props.name)
      .get()
      .then((doc) => {
        years = doc.data().Regular.years;
        this.setState({
          indivStat: doc.data().Regular,
        });
      })
      .catch((error) => {
        // this.props.history.push('/404');
        console.log(error);
      });
    indivCollection
      .doc(this.props.isTeam ? "Team_Avg" : "top100")
      .get()
      .then((doc) => {
        let yearArray = [];
        years.forEach((year) => {
          yearArray.push(doc.data().Regular.years.indexOf(year));
        });
        this.setState({
          top100Stat: doc.data().Regular,
          top100YearIndices: yearArray,
          PlayerYearsUsed: this.props.isTeam,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // Generate data using given props and individualConstants
  getData(plot, stat, plotStats, isTop100, sortino, plotType) {
    if (plotStats[stat] === undefined) {
      return;
    }
    let plotdata = [],
      sortinoplotdata = [];
    const textlabelA = [],
      textlabelM = [];

    // top100 plotting
    if (isTop100) {
      let plotTop100 = plot[0];
      plotTop100.map((trace, j) => {
        trace = trace[0];

        let indivStatData = [...plotStats[stat][trace]];
        // if (this.state.top100YearIndices.includes(-1)) {
        //   indivStatData.unshift(null)
        //   this.state.top100YearIndices.splice(0, 1, null)
        // }
        // console.log("indivSTat", indivStatData)
        // console.log("this.state.top100YearIndices", this.state.top100YearIndices)

        let newIndivStatData = [];
        let years = plotStats.years.map((year) => year.substring(0, 4));
        years.unshift("1984");
        console.log("prev years", years);
        if (isTop100) {
          for (let i = 0; i < this.state.top100YearIndices.length; i++) {
            const yearIndices = this.state.top100YearIndices[i];
            if (yearIndices === -1) {
              newIndivStatData.push(null);
            } else {
              newIndivStatData.push(indivStatData[yearIndices]);
            }
          }
          years = years.filter((year, i) => {
            if (this.state.top100YearIndices.includes(i)) {
              return year.substring(0, 4);
            }
          });
        }

        console.log("years", years);
        let name;
        if (isTop100 && this.props.isTeam) {
          name = "League Avg";
        } else if (isTop100) {
          name = "Top100 Avg.";
        }
        const removeNullFromArr = newIndivStatData.filter(
          (value) => value !== -10000
        );

        const removeNullFromYears = [];
        newIndivStatData.forEach((val, i) => {
          if (val !== -10000) {
            removeNullFromYears.push(years[i]);
          }
        });

        let data = {
          name,
          x: removeNullFromYears,
          y: removeNullFromArr,
          type: plotType[0],
          dataset: {
            type: plotType[0],
            label: name,
            data: removeNullFromArr,
            backgroundColor: "rgb(128,128,128)",
            borderColor: "rgb(128,128,128)",
            fill: false,
            radius: 2,
            borderWidth: 4,
          },
        };
        if (sortino === 1) {
          if (trace.slice(-3) === "PCT") {
            data = {
              ...data,
              y: removeNullFromArr,
            };
            data.dataset.type = "line";
            data.type = "line";
            sortinoplotdata.push(data);
          }
        }
        // Win percentage top 100 plot label change to add "%"
        if (trace.split("_")[0] === "W") {
          data.dataset.label = "League Avg ";
          // console.log(data.dataset);
        }
        // years.includes("1996-97")
        // if (years.includes("1996") || years.includes("1997")) {
        //   data.dataset.hidden = "true"
        // }
        plotdata.push(data);
      });
      return sortino === 1 ? sortinoplotdata : plotdata;
    } else {
      // Generate individual player plots
      plot[0][sortino].map((trace, j) => {
        // "/team" page
        // Some traces changed here to match player_ind_page_v2 avg_tot property names
        if (this.props.isTeam && trace === "DOWN_AVG") {
          trace = "DOWN_PTS";
        } else if (this.props.isTeam && trace === "UP_AVG") {
          trace = "UP_PTS";
          // trace changed here again to generate inndivStatData with no errors
        } else if (this.props.isTeam && trace === "AVG_AST") {
          trace = "AST";
        } else if (this.props.isTeam && trace === "AVG_STL") {
          trace = "STL";
        } else if (this.props.isTeam && trace === "AVG_BLK") {
          trace = "BLK";
        } else if (this.props.isTeam && trace === "AVG_TOV") {
          trace = "TOV";
        }

        let indivStatData = [...plotStats[stat][trace]];
        // arr of individual year genereated
        let years = plotStats.years.map((year) => year.substring(0, 4));
        if (isTop100) {
          indivStatData = indivStatData.filter((data, i) => {
            if (this.state.top100YearIndices.includes(i)) {
              return data;
            }
          });
          years = years.filter((year, i) => {
            if (this.state.top100YearIndices.includes(i)) {
              return year.substring(0, 4);
            }
          });
        }
        //basic data format
        let name;
        if (isTop100 && this.props.isTeam) {
          name = "League Avg";
        } else if (isTop100) {
          name = "Top 100";
        } else {
          name = plot[1][sortino][j];
        }
        // to avoid NaN values
        const removeNullFromArr = indivStatData.filter(
          (value) => value !== -10000
        );
        const removeNullFromYears = [];
        indivStatData.forEach((val, i) => {
          if (val !== -10000) {
            removeNullFromYears.push(years[i]);
          }
        });

        //data format for chart.js
        let data = {
          name,
          x: removeNullFromYears,
          y: removeNullFromArr,
          type: plotType[0],
          dataset: {
            type: plotType[0],
            label: name,
            data: removeNullFromArr,
            backgroundColor: individualConstants.colours[2][0],
            borderColor: individualConstants.colours[2][0],
            fill: false,
            radius: 2,
            borderWidth: 4,
            hidden: false,
          },
        };
        //fills between stat attempted and stat made
        if (
          ["A", "M"].includes(trace.slice(-1)) &&
          !isTop100 &&
          sortino === 0
        ) {
          if (["A"].includes(trace.slice(-1))) {
            data["text"] = textlabelA;
          } else if (["M"].includes(trace.slice(-1))) {
            data["text"] = textlabelM;
          }
        }
        // percentage data type change from bar to line
        if (sortino === 1) {
          if ("PCT" === trace.slice(-3)) {
            data = {
              ...data,
              y: removeNullFromArr,
            };
            data.dataset.type = "line";
            data.type = "line";
            sortinoplotdata.push(data);
          }
        }
        if (data.type === "bar") {
          data.dataset.borderWidth = 0;
        }

        //plot data option change here
        if (trace.split("_")[0] === "DOWN") {
          data.dataset.fill = 0;
          data.dataset.backgroundColor = individualConstants.colours[2][1];
          data.dataset.borderColor = false;
          data.dataset.radius = 0;
          // data.dataset.hidden = isTeam && true;
        } else if (trace.split("_")[0] === "UP") {
          data.dataset.fill = 1;
          data.dataset.backgroundColor = individualConstants.colours[2][2];
          data.dataset.borderColor = false;
          data.dataset.radius = 0;
          // data.dataset.hidden = isTeam && true;
        } else if (trace.slice(-1) === "A" || trace.split("_")[1] === "DREB") {
          data.dataset.backgroundColor = individualConstants.colours[2][1];
        } else {
          data.dataset.fill = false;
          data.dataset.backgroundColor = individualConstants.colours[2][0];
        }
        plotdata.push(data);
      });
      return sortino === 1 ? sortinoplotdata : plotdata;
    }
  }
  // get plot title.
  getPlotTitle(plotdata) {
    const { indivStat: page } = this.props;
    let preprocessTitles = [];
    plotdata.forEach((plot) => {
      Object.keys(this.props.categoryData)
        .filter((category) => {
          if (
            (this.props.isTeam && category !== "plus_minus") ||
            (!this.props.isTeam && !["wpct", "poss"].includes(category))
          ) {
            return category;
          }
          return;
        })
        .forEach((stat) => {
          let plotStat = this.props.categoryData[stat];
          const title = plotStat[PlotTitle];
          //Data ending with "%" should inlcude "Rating" in the title
          if (
            (page === "Shots" && plot.name.slice(-1) === "M") ||
            (page === "Shots" && plot.name.slice(-1) === "A")
          ) {
            preprocessTitles.push(``);
          } else {
            preprocessTitles.push(title);
          }
        });
    });
    return preprocessTitles;
  }
  // configure and plot data
  plotData(years) {
    if (
      this.state.indivStat.length === 0 ||
      this.state.top100Stat.length === 0 ||
      this.state.PlayerYearsUsed !== this.props.isTeam
    ) {
      return;
    }
    let preprocessData = [];
    const { indivStat: page } = this.props;
    Object.keys(this.props.categoryData)
      .filter((category) => {
        if (
          (this.props.isTeam && category !== "plus_minus") ||
          (!this.props.isTeam && !["wpct", "poss"].includes(category))
        ) {
          return category;
        }
        return;
      })
      .forEach((stat) => {
        let plot = this.props.categoryData[stat];
        let plotType = plot[PlotType][Left] === "bar" ? ["bar"] : ["line"];
        if (stat.split("_")[1] === "points") {
          stat = "3pts";
        }
        //Normal Non-Adjusted Plot Data
        let plotdata = this.getData(
          plot,
          stat,
          this.state.indivStat,
          false,
          0,
          plotType
        );

        if (page === "Shots") {
          //  plot Data
          let sortinoplotdata = this.getData(
            plot,
            stat,
            this.state.indivStat,
            false,
            1,
            plotType
          );
          // to generate top 100 data for rating charts on Shots page
          if (sortinoplotdata[0].name.slice(-1) === "%") {
            sortinoplotdata = sortinoplotdata.concat(
              this.getData(plot, stat, this.state.top100Stat, true, 1, plotType)
            );
          }
          preprocessData.push(sortinoplotdata);
        }
        if (plotType[0] !== "bar") {
          plotdata = plotdata.concat(
            this.getData(plot, stat, this.state.top100Stat, true, 0, plotType)
          );
        }
        preprocessData.push(plotdata);
      });

    const plotJsx = (plot, barData, plotTitle, labels, i) => {
      //Change plot titles
      if (plotTitle === "Free Throws") plotTitle = "3 Points";
      else if (plotTitle === "3 Points") plotTitle = "Free Throws";
      if (this.props.isTeam && plotTitle === "Salary") {
        plotTitle = "Estimated Total Salary";
      }
      return (
        <>
          <GraphTitle>{plotTitle}</GraphTitle>
          <ContainerCard
            key={i}
            style={{
              margin: "0",
              flex: "0 0 33.3333%"
              // display: "flex",
              // flexWrap: "wrap"
            }}
          >
            <IndivPlots
              data={plot}
              barData={barData}
              labels={labels}
              page={page}
              isTeam={this.props.isTeam}
              style={{

              }}
            />
          </ContainerCard>
        </>
      );
    };

    // only line type plotdata
    const lineData = (plotdata) => {
      return plotdata
        .filter((plot) => plot.type === "line")
        .map((p) => p.dataset);
    };
    // only bar type plotdata
    const barData = (plotdata) => {
      return plotdata
        .filter((plot) => plot.type === "bar")
        .map((p) => p.dataset);
    };
    // console.log(this.state.indivStat.years);
    //for plotting legend players including years of 1996-97
    return years.includes("1992-93")
      ? preprocessData
          .map((plots) =>
            plots.filter((data) => data.name.slice(-10) !== "Plus/Minus")
          )
          .map((plot, i) => {
            if (plot.length > 1) {
              return plotJsx(
                lineData(plot),
                barData(plot),
                this.getPlotTitle(plot).filter(
                  (title) => !title.match(/Plus\/minus/g)
                )[i],
                // slice used to limit the # of data points
                this.state.indivStat.years,
                i
              );
            }
          })
      : preprocessData.map((plot, i) => {
          return plotJsx(
            lineData(plot),
            barData(plot),
            this.getPlotTitle(plot)[i],
            this.state.indivStat.years,
            i
          );
        });
  }

  render() {
    return <PlotDiv>{this.plotData(this.props.years)}</PlotDiv>;
  }
}
export default withRouter(PlotContainer);
