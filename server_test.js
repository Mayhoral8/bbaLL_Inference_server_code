const PORT = 5000;
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const compression = require("compression");
const app = express();
const fs = require("fs");
// const constants = require("./constants.json");
// const _ = require("lodash");
// const { log } = require("console");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());

const pathToBuild = "./build";

// app.get("/home", async (req, res) => {
//   try {
//     const filePath = path.resolve(__dirname, pathToBuild, "index.html");
//     fs.readFile(filePath, "utf8", (err, metadata) => {
//       if (err) {
//         throw err;
//       } else {
//         metadata = metadata
//           .replace("$OG_TITLE", constants.pageMetaData.home.title)
//           .replace("$OG_DESCRIPTION", constants.pageMetaData.home.description)
//           .replace("$META_DESCRIPTION", constants.pageMetaData.home.description)
//           .replace(
//             "$OG_IMAGE",
//             "https://nba-basketball-inference.s3.us-east-2.amazonaws.com/home.PNG"
//           );
//         res.send(metadata);
//       }
//     });
//   } catch (e) {
//     throw e;
//   }
// });

// app.get("/player/:playerName", async (req, res) => {
//   try {
//     const { playerName } = req.params;
//     let titlePlayerName = playerName.replace(/_/g, "&nbsp;");
//     let configuredPlayerName = playerName.replace(/,/g, ".")
//     const filePath = path.resolve(__dirname, pathToBuild, "index.html");
//     fs.readFile(filePath, "utf8", (err, metadata) => {
//       if (err) {
//         throw err;
//       } else {
//         metadata = metadata
//           .replace("$OG_TITLE", `${titlePlayerName} ${constants.pageMetaData.player.description} ${titlePlayerName}`)
//           .replace(
//             "$OG_DESCRIPTION",
//             constants.pageMetaData.common.description
//           )
//           .replace(
//             "$META_DESCRIPTION",
//             constants.pageMetaData.common.description
//           )
//           .replace("$OG_IMAGE", `https://nbaplayers2021-22.s3.ca-central-1.amazonaws.com/${configuredPlayerName}.png`);
//         res.send(metadata);
//       }
//     });
//   } catch (e) {
//     throw e;
//   }
// });

// app.get("/team/:teamName", async (req, res) => {
//   try {
//     const { teamName } = req.params;
//     const titleTeamName = teamName.replace(/_/g, "&nbsp;");
//     const filePath = path.resolve(__dirname, pathToBuild, "index.html");
//     fs.readFile(filePath, "utf8", (err, metadata) => {
//       if (err) {
//         throw err;
//       } else {
//         metadata = metadata
//           .replace("$OG_TITLE", titleTeamName)
//           .replace(
//             "$OG_DESCRIPTION",
//             constants.pageMetaData.common.description
//           )
//           .replace(
//             "$META_DESCRIPTION",
//             constants.pageMetaData.common.description
//           )
//           .replace("$OG_IMAGE", `https://nba-team-spi-logo.s3.ca-central-1.amazonaws.com/${teamName}.png`);
//         res.send(metadata);
//       }
//     });
//   } catch (e) {
//     throw e;
//   }
// });

// app.get("/games", async (req, res) => {
//   try {
//     const filePath = path.resolve(__dirname, pathToBuild, "index.html");
//     fs.readFile(filePath, "utf8", (err, metadata) => {
//       if (err) {
//         throw err;
//       } else {
//         metadata = metadata
//           .replace("$OG_TITLE", constants.pageMetaData.games.title)
//           .replace("$OG_DESCRIPTION", constants.pageMetaData.games.description)
//           .replace(
//             "$META_DESCRIPTION",
//             constants.pageMetaData.games.description
//           );
//         res.send(metadata);
//       }
//     });
//   } catch (e) {
//     throw e;
//   }
// });

// app.get("/leaderboard", async (req, res) => {
//   try {
//     const filePath = path.resolve(__dirname, pathToBuild, "index.html");
//     fs.readFile(filePath, "utf8", (err, metadata) => {
//       if (err) {
//         throw err;
//       } else {
//         metadata = metadata
//           .replace("$OG_TITLE", constants.pageMetaData.leaderboard.title)
//           .replace(
//             "$OG_DESCRIPTION",
//             constants.pageMetaData.leaderboard.description
//           )
//           .replace(
//             "$META_DESCRIPTION",
//             constants.pageMetaData.leaderboard.description
//           );
//         res.send(metadata);
//       }
//     });
//   } catch (e) {
//     throw e;
//   }
// });

// app.get("/stats", async (req, res) => {
//   try {
//     const filePath = path.resolve(__dirname, pathToBuild, "index.html");
//     fs.readFile(filePath, "utf8", (err, metadata) => {
//       if (err) {
//         throw err;
//       } else {
//         metadata = metadata
//           .replace("$OG_TITLE", constants.pageMetaData.stats.title)
//           .replace("$OG_DESCRIPTION", constants.pageMetaData.stats.description)
//           .replace(
//             "$META_DESCRIPTION",
//             constants.pageMetaData.stats.description
//           )
//           .replace(
//             "$OG_IMAGE",
//             "https://static-nba-page.s3.ca-central-1.amazonaws.com/stats-page.png"
//           );
//         res.send(metadata);
//       }
//     });
//   } catch (e) {
//     throw e;
//   }
// });

// app.get("/comparison", async (req, res) => {
//   try {
//     const filePath = path.resolve(__dirname, pathToBuild, "index.html");
//     fs.readFile(filePath, "utf8", (err, metadata) => {
//       if (err) {
//         throw err;
//       } else {
//         metadata = metadata
//           .replace("$OG_TITLE", constants.pageMetaData.comparison.title)
//           .replace(
//             "$OG_DESCRIPTION",
//             constants.pageMetaData.comparison.description
//           )
//           .replace(
//             "$META_DESCRIPTION",
//             constants.pageMetaData.comparison.description
//           )
//           .replace(
//             "$OG_IMAGE",
//             "https://static-nba-page.s3.ca-central-1.amazonaws.com/comparison-page.png"
//           );
//         res.send(metadata);
//       }
//     });
//   } catch (e) {
//     throw e;
//   }
// });

// app.get("/betting", async (req, res) => {
//   try {
//     const filePath = path.resolve(__dirname, pathToBuild, "index.html");
//     fs.readFile(filePath, "utf8", (err, metadata) => {
//       if (err) {
//         throw err;
//       } else {
//         metadata = metadata
//           .replace("$OG_TITLE", constants.pageMetaData.betting.title)
//           .replace(
//             "$OG_DESCRIPTION",
//             constants.pageMetaData.betting.description
//           )
//           .replace(
//             "$META_DESCRIPTION",
//             constants.pageMetaData.betting.description
//           );
//         res.send(metadata);
//       }
//     });
//   } catch (e) {
//     throw e;
//   }
// });

app.use("/", express.static(pathToBuild));

app.get("*", (req, res) => {
  res.sendFile("./index.html", {
    root: path.join(__dirname, pathToBuild),
  });
});

app.listen(PORT, function () {
  console.log("Server's up @: " + PORT);
});
