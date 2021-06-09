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
    this.getLayout = this.getLayout.bind(this);
    this.plotData = this.plotData.bind(this);
    this.fetchFromFirestore = this.fetchFromFirestore.bind(this);
    this.state = {
      indivStat: [],
      top100Stat: [],
      top100YearIndices: [],
      PlayerYearsUsed: this.props.isTeam,
      name: this.props.name,
      width: window.innerWidth,
      indivStat_v2: [],
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
      this.props.isTeam ? "team_ind_page" : "player_ind_page"
    );
    indivCollection
      .doc(this.props.name)
      .get()
      .then((doc) => {
        console.log("indiv_data--->", doc.data().Regular);
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
        console.log("doc.", doc.data())
        years.forEach((year) => {
          console.log("year", year)
          yearArray.push(doc.data().Regular.years.indexOf(year));
        });
        // console.log(yearArray)
        // console.log(this.props.isTeam)
        // console.log(this.state.top100Stat,this.state.top100YearIndices, this.state.PlayerYearsUsed)
        // console.log(doc.data().Regular)
        // console.log((doc.data().Regular["3pts"]["AVG_FG3A"]))
        // console.log(Array.isArray((doc.data().Regular["3pts"]["AVG_FG3A"])))
        console.log(doc.data().Regular)
        
        // this.setState({
        //   top100Stat: doc.data().Regular[Symbol.iterator](),
        //   top100YearIndices: yearArray,
        //   PlayerYearsUsed: this.props.isTeam,
        // });
      })
      .catch((error) => {
        console.log(error);
      });
      // console.log(this.state.top100Stat)
    // getting data from player_ind_v2
    const indivCollection_v2 = fbFirestore.collection(
      this.props.isTeam ? "team_ind_page" : "player_ind_page_v2"
    );

    // indivCollection_v2
    //   .doc(this.props.name)
    //   .get()
    //   .then((doc) => {
    //     console.log("indiv2_data--->", doc.data().Regular);
    //     this.setState({
    //       indivStat_v2: doc.data().Regular,
    //     });
    //   })
    //   .catch((error) => {
    //     // this.props.history.push('/404');
    //     console.log(error);
    //   });
  }

  getData(plot, stat, plotStats, isTop100, sortino, plotType) {
    // console.log('plot: ', plot)
    // console.log('stat: ', stat)
    // console.log('plotStats: ', plotStats)
    // console.log('isTop100: ', isTop100)
    // console.log('sortino: ', sortino)
    // console.log('plotType: ', plotType)
    // console.log('plotStats[stat]: ', plotStats[stat])
    // console.log('this.state.indivStat: ', this.state.indivStat)
    if (plotStats[stat] === undefined) {
      console.log("stat", stat);
      console.log("plotStats[stat]", plotStats[stat]);
      return;
    }
    let sortinoplotdata = [],
      plotdata = [];

    const textlabelA = [],
      textlabelM = [];
    // console.log("plot[0]", plot[0], "plot[0][sortino]", plot[0][sortino])
    // console.log("plotStats[stat]", plotStats[stat])
    // console.log("plot[0].map",plot[0][sortino].map((trace, j) => [...plotStats[stat][trace]] ))
    plot[0][sortino].map((trace, j) => {
      let indivStatData = [...plotStats[stat][trace]];
      if (["A"].includes(trace.slice(-1))) {
        let trace4made = trace.substring(0, trace.length - 1).concat("M");
        for (let s = 0; s < indivStatData.length; s++) {
          const subtracted_val =
            plotStats[stat][trace][s] - plotStats[stat][trace4made][s];
          indivStatData[s] = subtracted_val;
          const attempdata =
            plotStats[stat][trace][s] + plotStats[stat][trace4made][s];
          textlabelA.push(attempdata.toString().substring(0, 3));
        }
      } else if (["M"].includes(trace.slice(-1))) {
        indivStatData.map((val) => {
          textlabelM.push(val.toString().substring(0, 3));
        });
      }
      let years = plotStats.years.map((year) => year.substring(0, 4));
      // if (isTop100) {
      //   indivStatData = indivStatData.filter((data, i) => {
      //     if (this.state.top100YearIndices.includes(i)) {
      //       return data;
      //     }
      //   });
      //   years = years.filter((year, i) => {
      //     if (this.state.top100YearIndices.includes(i)) {
      //       return year.substring(0, 4);
      //     }
      //   });
      // }

      //basic data format
      let name;
      if (isTop100 && this.props.isTeam) {
        name = "League Avg";
      } else if (isTop100) {
        name = "Top 100";
      } else {
        name = plot[1][sortino][j];
      }

      const removeNullFromArr = indivStatData.filter(
        (value) => value !== -10000
      );

      const removeNullFromYears = [];
      indivStatData.forEach((val, i) => {
        if (val !== -10000) {
          removeNullFromYears.push(years[i]);
        }
      });

      // console.log(data.label==="FGM")
      // console.log(data.label==="FGA")
      let data = {
        name,
        x: removeNullFromYears,
        y: removeNullFromArr,
        type: plotType[0],
        dataset: {
          type: plotType[0],
          label: name,
          data: removeNullFromArr,
          borderColor: isTop100 ? "blue" : "red",
          backgroundColor: isTop100 ? "blue" : "rgba(255, 10, 13, 0.1)",
          borderWidth: 1,
          fill: 1,
        },
        // mode: plotType[1],
        // opacity: `${isTop100 ? 0.75 : 1}`,
        // line: {
        //   dash: `${isTop100 ? "dash" : "solid"}`,
        //   color: individualConstants.colours[isTop100 ? 1 : 0][j],
        // },
        // marker: {
        //   color: individualConstants.colours[2][j],
        // },
      };
      
      data;
      //fills between stat attempted and stat made
      if (["A", "M"].includes(trace.slice(-1)) && !isTop100 && sortino === 0) {
        data = {
          ...data,
          fill: "tozeroy",
          fillcolor: individualConstants.colours[1][j],
          hoverinfo: "none",
          textposition: "outside",
        };
        if (["A"].includes(trace.slice(-1))) {
          data["text"] = textlabelA;
        } else if (["M"].includes(trace.slice(-1))) {
          data["text"] = textlabelM;
        }
      } else if ("PCT" === trace.slice(-3) && sortino === 0) {
        data = {
          ...data,
          y: indivStatData.map((value) => value * 100),
        };
      }
      if (sortino === 1) {
        if (["FG_PCT", "FT_PCT", "FG3_PCT"].includes(trace)) {
          sortinoplotdata.push({
            ...data,
            y: removeNullFromArr,
            yaxis: "y2",
          });
        } else {
          sortinoplotdata.push(
            (data = {
              ...data,
              y: removeNullFromArr,
            })
          );
        }
      } else if ("TOT" === trace) {
        plotdata.push({ ...data, yaxis: "y2" });
      } else {
        plotdata.push(data);
      }
    });
    // console.log("cur sortino, ", sortino)
    // console.log("sortinoplotdata", sortinoplotdata)
    // console.log("plotdata", plotdata)
    return sortino === 1 ? sortinoplotdata : plotdata;
  }

  getLayout(data, title, yaxisTitle1, yaxisTitle2, plotType) {
    let margin;
    const breakpoint = 500;

    if (this.state.width < breakpoint) {
      margin = {
        t: 0,
        r: 60,
        l: 60,
      };
    } else {
      margin = {
        t: 0,
        r: 60,
        l: 60,
      };
    }

    const layout = {
      autosize: true,
      legend: {
        xanchor: "right",
        orientation: "h",
        yanchor: "bottom",
        x: 1,
        y: 1.02,
      },
      font: {
        family: "Roboto Condensed",
      },
      margin,
      yaxis: {
        title: yaxisTitle1,
        //rangemode: "tozero",
        titlefont: { color: individualConstants.colours[0][0] },
        tickfont: { color: individualConstants.colours[0][0] },
      },

      yaxis2: {
        title: yaxisTitle2,
        titlefont: { color: individualConstants.colours[0][1] },
        tickfont: { color: individualConstants.colours[0][1] },
        overlaying: "y",
        side: "right",
        //rangemode: "tozero",
      },
      xaxis: {
        tickvals: data[0].x,
        ticktext: data[0].x.map((year) => FormatYearAddEnding(year)),
      },
    };

    if (plotType[0] === "bar") {
      layout["barmode"] = "stack";
    }
    return layout;
  }

  // get graph data
  getPlotTitle() {
    let preprocessTitles = [];
    // console.log("Object.keys(this.props.categoryData)", Object.keys(this.props.categoryData))
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
        const hasAdjustedRating = !["wpct", "poss", "salary"].includes(stat);

        if (stat.split("_")[1] === "points") {
          stat = "3pts";
        }
        //Normal Non-Adjusted Plot Data
        let title = plot[PlotTitle];
        //Adjusted Rating Plot Data
        if (hasAdjustedRating) {
          const adjustedTitle = plot[PlotTitle] + " Rating";
          preprocessTitles.push(plot[PlotTitle], adjustedTitle);
        } else {
          preprocessTitles.push(title);
        }
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
    let preprocessData = [],
      preprocessLayout = [];
    // const categoryData_obj = Object.keys(this.props.categoryData).filter(
    //   (category) => {
    //     if (
    //       (this.props.isTeam && category !== "plus_minus") ||
    //       (!this.props.isTeam && !["wpct", "poss"].includes(category))
    //     ) {
    //       return category;
    //     }
    //     return;
    //   }
    // ).forEach((stat) => {
    //   console.log("stat===>", stat)
    //   console.log("this.props.categoryData[stat]", this.props.categoryData[stat])
    // });
    // console.log("Objec.dket", Object.keys(this.props.categoryData));
    // console.log("categoryData_obj", categoryData_obj);

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
        let plotType =
          plot[PlotType][Left] === "bar"
            ? ["bar", "stack"]
            : ["line", "lines and markers"];
        const hasAdjustedRating = !["wpct", "poss", "salary"].includes(stat);
        if (stat.split("_")[1] === "points") {
          stat = "3pts";
        }
        //Normal Non-Adjusted Plot Data
        const yaxisTitle1 = plot[LegendEntries][0];
        const yaxisTitle2 = plot[LegendEntries][1];
        const title = plot[PlotTitle];
        let plotdata = this.getData(
          plot,
          stat,
          this.state.indivStat,
          false,
          0,
          plotType
        );

        if (plotType[0] !== "bar") {
          plotdata = plotdata.concat(
            this.getData(plot, stat, this.state.top100Stat, true, 0, plotType)
          );
        }

        const layoutFig1 = this.getLayout(
          plotdata,
          title,
          yaxisTitle1,
          yaxisTitle2,
          plotType
        );
        //Adjusted Rating Plot Data
        if (hasAdjustedRating) {
          const yaxisTitle1 = plot[LegendEntries][0];
          const yaxisTitle2 = plot[LegendEntries][1];
          plotType =
            plot[PlotType][Right] === "bar"
              ? ["bar", "stack"]
              : ["line", "lines and markers"];
          const title = "Adjusted " + plot[PlotTitle] + " Rating";
          let sortinoplotdata = this.getData(
            plot,
            stat,
            this.state.indivStat,
            false,
            1,
            plotType
          );
          // if (plotType[0] !== "bar") {
          //   sortinoplotdata = sortinoplotdata.concat(
          //     this.getData(plot, stat, this.state.top100Stat, true, 1, plotType)
          //   );
          // }
          const layoutFig2 = this.getLayout(
            sortinoplotdata,
            title,
            yaxisTitle1,
            yaxisTitle2,
            plotType
          );
          preprocessData.push(plotdata);
          // preprocessData.push(sortinoplotdata);
          preprocessLayout.push(layoutFig1);
          preprocessLayout.push(layoutFig2);
        } else {
          preprocessData.push(plotdata);
          preprocessLayout.push(layoutFig1);
        }
      });

    const plotJsx = (plot, plotTitle, labels, i) => {
      const { indivStat } = this.props;

      if (
        (indivStat === "Overall" && plotTitle === "Average/Total Points") ||
        plotTitle === "Plus/Minus" ||
        plotTitle === "Salary"
      ) {
        return (
          <ContainerCard key={i} style={{ margin: "0" }}>
            <GraphTitle>{plotTitle}</GraphTitle>
            <IndivPlots
              data={plot}
              layout={preprocessLayout[i]}
              labels={labels}
            />
          </ContainerCard>
        );
      } else if (indivStat === "Shots") {
        return (
          <ContainerCard key={i} style={{ margin: "0" }}>
            <GraphTitle>{plotTitle}</GraphTitle>
            <IndivPlots
              data={plot}
              layout={preprocessLayout[i]}
              labels={labels}
            />
          </ContainerCard>
        );
      } else if (
        (indivStat === "Assists & Rebounds" && plotTitle === "Assists") ||
        plotTitle === "Rebounds"
      ) {
        return (
          <ContainerCard key={i} style={{ margin: "0" }}>
            <GraphTitle>{plotTitle}</GraphTitle>
            <IndivPlots
              data={plot}
              layout={preprocessLayout[i]}
              labels={labels}
            />
          </ContainerCard>
        );
      } else if (
        (indivStat === "Defence" && plotTitle === "Steals") ||
        plotTitle === "Blocks" ||
        plotTitle === "Turnovers"
      ) {
        return (
          <ContainerCard key={i} style={{ margin: "0" }}>
            <GraphTitle>{plotTitle}</GraphTitle>
            <IndivPlots
              data={plot}
              layout={preprocessLayout[i]}
              labels={labels}
            />
          </ContainerCard>
        );
      }
      // return (
      //   <ContainerCard key={i} style={{ margin: "0" }}>
      //     <GraphTitle>{plotTitle}</GraphTitle>
      //     <IndivPlots
      //       data={plot}
      //       layout={preprocessLayout[i]}
      //       labels={labels}
      //     />
      //   </ContainerCard>
      // );
    };

    const filteredData = (plotdata) => {
      const { indivStat } = this.props;

      // const stackedOption = plotdata.filter((plot) => plot.type==="bar")

      const mappedPlot = plotdata.map((plot) => plot.dataset);
      if (indivStat === "Overall") {
        return plotdata
          .filter(
            (plot) =>
              plot.name === "Average" ||
              (plot.name === "Top 100" && !plot.yaxis) || plot.name === "Salary" || plot.name === "Plus/Minus"
          )
          .map((plot) => plot.dataset);
      } else if (indivStat === "Shots") {
        return plotdata
          .filter(
            (plot) =>
              plot.type === "bar" ||
              plot.name === "FG%" ||
              plot.name === "FT%" ||
              plot.name === "3P%" ||
              (plot.name === "Top 100" && plot.yaxis)
          )
          .map((plot) => plot.dataset);
      } else if (indivStat === "Assists & Rebounds") {
        return plotdata.map((plot) => plot.dataset);
      } else if (indivStat === "Defence") {
        return plotdata.map((plot) => plot.dataset);
      }

      return mappedPlot;
    };

    return years.includes("1996-97")
      ? preprocessData
          .filter((data) => data[0].name !== "Plus/Minus")
          .map((plot, i) => {
            return plotJsx(
              plot.map((plot) => plot.dataset),
              this.getPlotTitle().filter(
                (title) => !title.match(/Plus\/Minus/g)
              )[i],
              this.state.indivStat.years,
              i
            );
          })
      : preprocessData.map((plot, i) => {
          // console.log("this.getPlotTitle()", this.getPlotTitle());
          return plotJsx(
            filteredData(plot),
            this.getPlotTitle()[i],
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
