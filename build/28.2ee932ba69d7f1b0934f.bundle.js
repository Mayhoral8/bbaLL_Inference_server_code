(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{1086:function(module,__webpack_exports__,__webpack_require__){"use strict";var react=__webpack_require__(0),react_default=__webpack_require__.n(react),config=__webpack_require__(34),gameStatsFunctions=__webpack_require__(912),__webpack_require__=__webpack_require__(5);function _taggedTemplateLiteral(strings,raw){return raw=raw||strings.slice(0),Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))}var Card=__webpack_require__.b.div(_taggedTemplateLiteral(["\n  display: flex;\n  background: linear-gradient(to right, #e9e9e9 50%, #a3a3a3 50%);\n\n  @media screen and (max-width: 834px) {\n    margin: 0.5rem;\n  }\n  margin: 30px 10px;\n  height: 175px;\n  min-width: 240px;\n  max-width: 270px;\n\n  flex-direction: column;\n  justify-content: center;\n\n  .team-names {\n    display: flex;\n    flex-direction: row;\n    font-size: 1rem;\n    position: relative;\n    top: 0px;\n    margin-top: 0.5rem;\n    font-family: Roboto;\n    text-align: center;\n    // -webkit-text-stroke-width: 5px;\n    // -webkit-text-stroke-color: black;\n    text-shadow: 1px 1px 1px #949494;\n  }\n\n  .team-name1 {\n    color: ",";\n    width: 50%;\n  }\n\n  .team-name2 {\n    color: ",";\n    width: 50%;\n  }\n  .scores {\n    display: flex;\n    justify-content: center;\n    flex-direction: row;\n  }\n\n  .scores-col {\n    display: flex;\n    flex-direction: column;\n    text-align: center;\n    margin-top: 0.25rem;\n    margin-right: 0.25rem;\n    margin-left: 0.25rem;\n    margin-bottom: 0.25rem;\n    @media screen and (max-width: 834px) {\n      font-size: 0.8rem;\n    }\n    font-size: 0.9rem;\n  }\n\n  .game-date {\n    background-color: white;\n    margin-top: 1rem;\n    max-width: 80%;\n    font-size: 0.8rem;\n    text-align: center;\n    padding: 0.5rem;\n    filter: drop-shadow(0.2rem 0.2rem 0.35rem rgba(0, 0, 0, 0.3));\n    margin: 0.5rem auto 0.5rem auto;\n  }\n"]),function(props){return props.homeColour},function(props){return props.awayColour}),LogoBox=__webpack_require__.b.div(_taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-evenly;\n  min-height: 75px;\n\n  img {\n    margin: 0rem;\n    position: relative;\n    z-index: 99;\n  }\n\n  .logo-1 {\n    z-index: 0;\n    width: 97.827px;\n    height: 75px;\n    top: -3px;\n  }\n\n  .logo-2 {\n    z-index: 0;\n    width: 97.827px;\n    height: 75px;\n    top: -3px;\n  }\n\n  .vs-text {\n    font-size: 2rem;\n    color: white;\n    font-family: Roboto;\n    filter: drop-shadow(0.2rem 0.2rem 0.35rem rgba(0, 0, 0, 0.3));\n    -webkit-text-stroke: 0.5px gray;\n    position: relative;\n    top: 25px;\n  }\n"]));function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(r,l){var t=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=t){var e,n,i,u,a=[],f=!0,o=!1;try{if(i=(t=t.call(r)).next,0===l){if(Object(t)!==t)return;f=!1}else for(;!(f=(e=i.call(t)).done)&&(a.push(e.value),a.length!==l);f=!0);}catch(r){o=!0,n=r}finally{try{if(!f&&null!=t.return&&(u=t.return(),Object(u)!==u))return}finally{if(o)throw n}}return a}}(arr,i)||function _unsupportedIterableToArray(o,minLen){var n;if(o)return"string"==typeof o?_arrayLikeToArray(o,minLen):"Map"===(n="Object"===(n=Object.prototype.toString.call(o).slice(8,-1))&&o.constructor?o.constructor.name:n)||"Set"===n?Array.from(o):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(o,minLen):void 0}(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function calculateBettingOddsPercent(teamA,teamB){return teamA=1/teamA,Math.round(teamA/(teamA+1/teamB)*100)}var futureGameOddsCard_vsImg=function vsImg(homeImg,awayImg){return react_default.a.createElement(LogoBox,null,react_default.a.createElement("img",{className:"logo-1",src:homeImg}),react_default.a.createElement("div",{className:"vs-text"},react_default.a.createElement("b",null,"VS")),react_default.a.createElement("img",{className:"logo-2",src:awayImg}))};__webpack_exports__.a=function FutureGameOddsCard(_ref){var data=_ref.data,_ref=_ref.reference,data=_slicedToArray(Object(react.useState)(data),2),JSON=data[0],data=(data[1],_slicedToArray(Object(react.useState)(""),2)),homeImg=data[0],setHomeImg=data[1],data=_slicedToArray(Object(react.useState)(""),2),awayImg=data[0],setAwayImg=data[1],data=JSON["Game Info"]["Game Time"],homeTeamName=JSON["Game Info"]["Home Team"],awayTeamName=JSON["Game Info"]["Away Team"],allbettingOdds=JSON["Game Odds"].General,latestDate="",homeRatings=(Object.keys(allbettingOdds).map(function(date){(latestDate=0==latestDate.length?date:latestDate)<date&&(latestDate=date)}),[{value:" - ",percent:""},{value:" - ",percent:""},{value:" - ",percent:""}]),awayRatings=[{value:" - ",percent:""},{value:" - ",percent:""},{value:" - ",percent:""}];try{homeRatings[0].value=Math.round(JSON["Game Prediction"].ELO[homeTeamName].rating),homeRatings[0].percent=Math.round(100*JSON["Game Prediction"].ELO[homeTeamName].prob),awayRatings[0].value=Math.round(JSON["Game Prediction"].ELO[awayTeamName].rating),awayRatings[0].percent=Math.round(100*JSON["Game Prediction"].ELO[awayTeamName].prob)}catch(error){}try{homeRatings[1].value=Math.round(100*JSON["Game Prediction"].Massey[homeTeamName].rating)/100,homeRatings[1].percent=Math.round(100*JSON["Game Prediction"].Massey[homeTeamName].prob),awayRatings[1].value=Math.round(100*JSON["Game Prediction"].Massey[awayTeamName].rating)/100,awayRatings[1].percent=Math.round(100*JSON["Game Prediction"].Massey[awayTeamName].prob)}catch(error){}try{0<Object.keys(JSON["Game Odds"].General).length&&(homeRatings[2].value=Math.round(100*JSON["Game Odds"].General[latestDate][homeTeamName])/100,awayRatings[2].value=Math.round(100*JSON["Game Odds"].General[latestDate][awayTeamName])/100)}catch(error){console.log("Missing data for the future game Odds")}JSON["Game Odds"].General.hasOwnProperty(latestDate)&&(homeRatings[2].percent=calculateBettingOddsPercent(homeRatings[2].value,awayRatings[2].value),awayRatings[2].percent=100-homeRatings[2].percent);for(var i=0;i<awayRatings.length;i++)0<i&&(" - "!==awayRatings[i].value&&(awayRatings[i].value=awayRatings[i].value.toFixed(2))," - "!==homeRatings[i].value)&&(homeRatings[i].value=homeRatings[i].value.toFixed(2));var allbettingOdds=homeTeamName.replaceAll(" ","_"),JSON=awayTeamName.replaceAll(" ","_"),allbettingOdds=config.d.refFromURL("gs://nba-database-cb52a.appspot.com/team_logo_spi/"+allbettingOdds+".png"),JSON=config.d.refFromURL("gs://nba-database-cb52a.appspot.com/team_logo_spi/"+JSON+".png"),allbettingOdds=(allbettingOdds.getDownloadURL().then(function(url){setHomeImg(url)}),JSON.getDownloadURL().then(function(url){setAwayImg(url)}),Object(gameStatsFunctions.a)(homeTeamName.replaceAll(" ","").toUpperCase(),awayTeamName.replaceAll(" ","").toUpperCase())),JSON=homeTeamName.split(" "),awayWords=awayTeamName.split(" "),homeTeamName=JSON[JSON.length-1],awayTeamName=awayWords[awayWords.length-1];return react_default.a.createElement(Card,{homeColour:allbettingOdds.colourOne,awayColour:allbettingOdds.colourTwo,ref:_ref},futureGameOddsCard_vsImg(homeImg,awayImg),react_default.a.createElement("div",{className:"team-names"},react_default.a.createElement("div",{className:"team-name1"},react_default.a.createElement("b",null,homeTeamName)),react_default.a.createElement("div",{className:"team-name2"},react_default.a.createElement("b",null,awayTeamName))),react_default.a.createElement("div",{className:"scores"},react_default.a.createElement("div",{className:"scores-col"},homeRatings.map(function(obj,index){return obj.percent>awayRatings[index].percent?react_default.a.createElement("b",{key:index},react_default.a.createElement("p",{key:index},obj.value," ",""===obj.percent?"":"("+obj.percent+"%)")):react_default.a.createElement("p",{key:index},obj.value," ",""===obj.percent?"":"("+obj.percent+"%)")})),react_default.a.createElement("div",{className:"scores-col"},["ELO","Massey","Odds"].map(function(name,index){return react_default.a.createElement("p",{key:index},name)})),react_default.a.createElement("div",{className:"scores-col"},awayRatings.map(function(obj,index){return obj.percent>homeRatings[index].percent?react_default.a.createElement("b",{key:index},react_default.a.createElement("p",{key:index},obj.value," ",""===obj.percent?"":"("+obj.percent+"%)")):react_default.a.createElement("p",{key:index},obj.value," ",""===obj.percent?"":"("+obj.percent+"%)")}))),react_default.a.createElement("div",{className:"game-date"},data))}},1248:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__),_futureGameOddsCard__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(1086);__webpack_exports__.default=function FutureGameList(_ref){return _ref.games.map(function(item,index){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_futureGameOddsCard__WEBPACK_IMPORTED_MODULE_1__.a,{data:item,key:index})})}},910:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"ATLANTAHAWKS",function(){return ATLANTAHAWKS}),__webpack_require__.d(__webpack_exports__,"BOSTONCELTICS",function(){return BOSTONCELTICS}),__webpack_require__.d(__webpack_exports__,"BROOKLYNNETS",function(){return BROOKLYNNETS}),__webpack_require__.d(__webpack_exports__,"CHARLOTTEHORNETS",function(){return CHARLOTTEHORNETS}),__webpack_require__.d(__webpack_exports__,"CHICAGOBULLS",function(){return CHICAGOBULLS}),__webpack_require__.d(__webpack_exports__,"CLEVELANDCAVALIERS",function(){return CLEVELANDCAVALIERS}),__webpack_require__.d(__webpack_exports__,"DALLASMAVERICKS",function(){return DALLASMAVERICKS}),__webpack_require__.d(__webpack_exports__,"DENVERNUGGETS",function(){return DENVERNUGGETS}),__webpack_require__.d(__webpack_exports__,"DETROITPISTONS",function(){return DETROITPISTONS}),__webpack_require__.d(__webpack_exports__,"GOLDENSTATEWARRIORS",function(){return GOLDENSTATEWARRIORS}),__webpack_require__.d(__webpack_exports__,"HOUSTONROCKETS",function(){return HOUSTONROCKETS}),__webpack_require__.d(__webpack_exports__,"INDIANAPACERS",function(){return INDIANAPACERS}),__webpack_require__.d(__webpack_exports__,"LOSANGELESCLIPPERS",function(){return LOSANGELESCLIPPERS}),__webpack_require__.d(__webpack_exports__,"LOSANGELESLAKERS",function(){return LOSANGELESLAKERS}),__webpack_require__.d(__webpack_exports__,"MEMPHISGRIZZLIES",function(){return MEMPHISGRIZZLIES}),__webpack_require__.d(__webpack_exports__,"MIAMIHEAT",function(){return MIAMIHEAT}),__webpack_require__.d(__webpack_exports__,"MILWAUKEEBUCKS",function(){return MILWAUKEEBUCKS}),__webpack_require__.d(__webpack_exports__,"MINNESOTATIMBERWOLVES",function(){return MINNESOTATIMBERWOLVES}),__webpack_require__.d(__webpack_exports__,"NEWORLEANSPELICANS",function(){return NEWORLEANSPELICANS}),__webpack_require__.d(__webpack_exports__,"NEWYORKKNICKS",function(){return NEWYORKKNICKS}),__webpack_require__.d(__webpack_exports__,"OKLAHOMACITYTHUNDER",function(){return OKLAHOMACITYTHUNDER}),__webpack_require__.d(__webpack_exports__,"ORLANDOMAGIC",function(){return ORLANDOMAGIC}),__webpack_require__.d(__webpack_exports__,"PHILADELPHIA76ERS",function(){return PHILADELPHIA76ERS}),__webpack_require__.d(__webpack_exports__,"PHOENIXSUNS",function(){return PHOENIXSUNS}),__webpack_require__.d(__webpack_exports__,"PORTLANDTRAILBLAZERS",function(){return PORTLANDTRAILBLAZERS}),__webpack_require__.d(__webpack_exports__,"SACRAMENTOKINGS",function(){return SACRAMENTOKINGS}),__webpack_require__.d(__webpack_exports__,"SANANTONIOSPURS",function(){return SANANTONIOSPURS}),__webpack_require__.d(__webpack_exports__,"TORONTORAPTORS",function(){return TORONTORAPTORS}),__webpack_require__.d(__webpack_exports__,"UTAHJAZZ",function(){return UTAHJAZZ}),__webpack_require__.d(__webpack_exports__,"WASHINGTONWIZARDS",function(){return WASHINGTONWIZARDS});var ATLANTAHAWKS="#e1353c",BOSTONCELTICS="#07824b",BROOKLYNNETS="#040204",CHARLOTTEHORNETS="#008ea9",CHICAGOBULLS="#cc1342",CLEVELANDCAVALIERS="#b4193b",DALLASMAVERICKS="#046cb5",DENVERNUGGETS="#4991ca",DETROITPISTONS="#ec144c",GOLDENSTATEWARRIORS="#0446ab",HOUSTONROCKETS="#cc1342",INDIANAPACERS="#04245c",LOSANGELESCLIPPERS="#C8102E",LOSANGELESLAKERS="#fccc2c",MEMPHISGRIZZLIES="#648fbb",MIAMIHEAT="#95082e",MILWAUKEEBUCKS="#053515",MINNESOTATIMBERWOLVES="#0C2340",NEWORLEANSPELICANS="#cfa755",NEWYORKKNICKS="#1d37a0",OKLAHOMACITYTHUNDER="#4872bf",ORLANDOMAGIC="#0273bb",PHILADELPHIA76ERS="#d0103f",PHOENIXSUNS="#3c2b87",PORTLANDTRAILBLAZERS="#e1353c",SACRAMENTOKINGS="#3c2b87",SANANTONIOSPURS="#c4ccd4",TORONTORAPTORS="#CE1141",UTAHJAZZ="#042244",WASHINGTONWIZARDS="#002B5C"},912:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"b",function(){return classNameForTopValues}),__webpack_require__.d(__webpack_exports__,"c",function(){return getClassNameFor}),__webpack_require__.d(__webpack_exports__,"d",function(){return numToMinSec}),__webpack_require__.d(__webpack_exports__,"a",function(){return gameStatsFunctions_avoidColourSets});var teamColours2_namespaceObject={},teamColours=(__webpack_require__.r(teamColours2_namespaceObject),__webpack_require__.d(teamColours2_namespaceObject,"ATLANTAHAWKS",function(){return ATLANTAHAWKS}),__webpack_require__.d(teamColours2_namespaceObject,"BOSTONCELTICS",function(){return BOSTONCELTICS}),__webpack_require__.d(teamColours2_namespaceObject,"BROOKLYNNETS",function(){return BROOKLYNNETS}),__webpack_require__.d(teamColours2_namespaceObject,"CHARLOTTEHORNETS",function(){return CHARLOTTEHORNETS}),__webpack_require__.d(teamColours2_namespaceObject,"CHICAGOBULLS",function(){return CHICAGOBULLS}),__webpack_require__.d(teamColours2_namespaceObject,"CLEVELANDCAVALIERS",function(){return CLEVELANDCAVALIERS}),__webpack_require__.d(teamColours2_namespaceObject,"DALLASMAVERICKS",function(){return DALLASMAVERICKS}),__webpack_require__.d(teamColours2_namespaceObject,"DENVERNUGGETS",function(){return DENVERNUGGETS}),__webpack_require__.d(teamColours2_namespaceObject,"DETROITPISTONS",function(){return DETROITPISTONS}),__webpack_require__.d(teamColours2_namespaceObject,"GOLDENSTATEWARRIORS",function(){return GOLDENSTATEWARRIORS}),__webpack_require__.d(teamColours2_namespaceObject,"HOUSTONROCKETS",function(){return HOUSTONROCKETS}),__webpack_require__.d(teamColours2_namespaceObject,"INDIANAPACERS",function(){return INDIANAPACERS}),__webpack_require__.d(teamColours2_namespaceObject,"LOSANGELESCLIPPERS",function(){return LOSANGELESCLIPPERS}),__webpack_require__.d(teamColours2_namespaceObject,"LOSANGELESLAKERS",function(){return LOSANGELESLAKERS}),__webpack_require__.d(teamColours2_namespaceObject,"MEMPHISGRIZZLIES",function(){return MEMPHISGRIZZLIES}),__webpack_require__.d(teamColours2_namespaceObject,"MIAMIHEAT",function(){return MIAMIHEAT}),__webpack_require__.d(teamColours2_namespaceObject,"MILWAUKEEBUCKS",function(){return MILWAUKEEBUCKS}),__webpack_require__.d(teamColours2_namespaceObject,"MINNESOTATIMBERWOLVES",function(){return MINNESOTATIMBERWOLVES}),__webpack_require__.d(teamColours2_namespaceObject,"NEWORLEANSPELICANS",function(){return NEWORLEANSPELICANS}),__webpack_require__.d(teamColours2_namespaceObject,"NEWYORKKNICKS",function(){return NEWYORKKNICKS}),__webpack_require__.d(teamColours2_namespaceObject,"OKLAHOMACITYTHUNDER",function(){return OKLAHOMACITYTHUNDER}),__webpack_require__.d(teamColours2_namespaceObject,"ORLANDOMAGIC",function(){return ORLANDOMAGIC}),__webpack_require__.d(teamColours2_namespaceObject,"PHILADELPHIA76ERS",function(){return PHILADELPHIA76ERS}),__webpack_require__.d(teamColours2_namespaceObject,"PHOENIXSUNS",function(){return PHOENIXSUNS}),__webpack_require__.d(teamColours2_namespaceObject,"PORTLANDTRAILBLAZERS",function(){return PORTLANDTRAILBLAZERS}),__webpack_require__.d(teamColours2_namespaceObject,"SACRAMENTOKINGS",function(){return SACRAMENTOKINGS}),__webpack_require__.d(teamColours2_namespaceObject,"SANANTONIOSPURS",function(){return SANANTONIOSPURS}),__webpack_require__.d(teamColours2_namespaceObject,"TORONTORAPTORS",function(){return TORONTORAPTORS}),__webpack_require__.d(teamColours2_namespaceObject,"UTAHJAZZ",function(){return UTAHJAZZ}),__webpack_require__.d(teamColours2_namespaceObject,"WASHINGTONWIZARDS",function(){return WASHINGTONWIZARDS}),__webpack_require__(910)),ATLANTAHAWKS="#26282A",BOSTONCELTICS="#000000",BROOKLYNNETS="#002A60",CHARLOTTEHORNETS="#1D1160",CHICAGOBULLS="#000000",CLEVELANDCAVALIERS="#041E42",DALLASMAVERICKS="#002B5E",DENVERNUGGETS="#0E2240",DETROITPISTONS="#1D42BA",GOLDENSTATEWARRIORS="#1D428A",HOUSTONROCKETS="#C4CED4",INDIANAPACERS="#FDBB30",LOSANGELESCLIPPERS="#1D428A",LOSANGELESLAKERS="#552583",MEMPHISGRIZZLIES="#12173F",MIAMIHEAT="#000000",MILWAUKEEBUCKS="#EEE1C6",MINNESOTATIMBERWOLVES="#9ea4ab",NEWORLEANSPELICANS="#0C2340",NEWYORKKNICKS="#F58426",OKLAHOMACITYTHUNDER="#EF3B24",ORLANDOMAGIC="#C4CED4",PHILADELPHIA76ERS="#ED174C",PHOENIXSUNS="#E56020",PORTLANDTRAILBLAZERS="#000000",SACRAMENTOKINGS="#63727A",SANANTONIOSPURS="#000000",TORONTORAPTORS="#000000",UTAHJAZZ="#00471B",WASHINGTONWIZARDS="#E31837",classNameForTopValues=(__webpack_require__(915),function classNameForTopValues(items,attr,n,detail){n>items.length?topElement=!1:topElements=items.slice().sort(function(a,b){return b[attr]-a[attr]}).slice(0,n);var topElements,numOccurrences0=items.filter(function(item){return item[attr]===topElements[0][attr]}).length,items=items.filter(function(item){return item[attr]===topElements[n-1][attr]}).length;return(2!==n||topElements[n-2].player_id!==topElements[n-1].player_id)&&(topElements[0].player_id===detail.player_id&&1===numOccurrences0||topElements[n-1].player_id===detail.player_id&&1===numOccurrences0&&1===items)?"top-value":""}),getClassNameFor=function getClassNameFor(name,sortConfig){return sortConfig&&sortConfig.key===name?sortConfig.direction:""},numToMinSec=function numToMinSec(minutes){var sign=minutes<0?"-":"",min=Math.floor(Math.abs(minutes)),minutes=Math.floor(60*Math.abs(minutes)%60);return sign+(min<10?"0":"")+min+":"+(minutes<10?"0":"")+minutes},gameStatsFunctions_avoidColourSets=function avoidColourSets(home,away){for(var colourOne,colourTwo,_i=0,_avoidSets=[["CHARLOTTEHORNETS","DALLASMAVERICKS","DENVERNUGGETS","GOLDENSTATEWARRIORS","INDIANAPACERS","MEMPHISGRIZZLIES","NEWYORKKNICKS","OKLAHOMACITYTHUNDER","ORLANDOMAGIC","SACRAMENTOKINGS","MINNESOTATIMBERWOLVES","WASHINGTONWIZARDS"],["ATLANTAHAWKS","CHICAGOBULLS","CLEVELANDCAVALIERS","DETROITPISTONS","HOUSTONROCKETS","MIAMIHEAT","PHILADELPHIA76ERS","PORTLANDTRAILBLAZERS","TORONTORAPTORS","LOSANGELESCLIPPERS"],["BROOKLYNNETS","UTAHJAZZ","SANANTONIOSPURS"],["BOSTONCELTICS","MILWAUKEEBUCKS"],["LOSANGELESLAKERS","NEWORLEANSPELICANS"]];_i<_avoidSets.length;_i++){var colourSet=_avoidSets[_i];if(colourSet.includes(home)&&colourSet.includes(away)){colourOne=teamColours[home],colourTwo=teamColours2_namespaceObject[away];break}colourOne=teamColours[home],colourTwo=teamColours[away]}return{colourOne:colourOne,colourTwo:colourTwo}}}}]);