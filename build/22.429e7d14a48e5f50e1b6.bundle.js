(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{1085:function(module,__webpack_exports__,__webpack_require__){"use strict";function breakTeamName(name){var firstName="",lastName="",lastName=(3===name.split(" ").length?(firstName=(name.split(" ")[0]+name.split(" ")[1]).replace(/\,/g,"."),name.split(" ")[2]):(firstName=name.split(" ")[0],name.split(" ")[1])).replace(/\,/g,".");return{firstName:firstName,lastName:lastName}}var react=__webpack_require__(0),react_default=__webpack_require__.n(react),Carousel=__webpack_require__(968),GetMonthName=__webpack_require__(915),GetPlayerImage=__webpack_require__(911),styled_components_browser_esm=__webpack_require__(5);function _taggedTemplateLiteral(strings,raw){return raw=raw||strings.slice(0),Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))}var RecentEventsItemWrapper=styled_components_browser_esm.b.div(_taggedTemplateLiteral(["\n  display: flex;\n  position: relative;\n  height: 100%;\n  .image-container {\n    width: 30px;\n    height: 30px;\n    margin-right: 0.5rem;\n    img {\n      width: 30px;\n      height: 30px;\n    }\n  }\n  .active.team-container {\n    border-bottom: 5px solid var(--main-blue);\n  }\n  .team-container {\n    padding: 0.5rem 1rem;\n    border-right: 1px solid silver;\n    width: 200px;\n  }\n  .team {\n    display: flex;\n    font-size: 0.9rem;\n    align-items: center;\n    margin: 0.3rem auto;\n  }\n  .team-score {\n    margin-left: auto;\n  }\n"])),RecentEventsListWrapper=styled_components_browser_esm.b.section(_taggedTemplateLiteral(["\nbox-shadow: var(--box-shadow-2);\n\n.recent-events-wrapper {\n  display: flex;\n  max-width: 1440px;\n  margin: 0 auto;\n}\n\n.slick-slider,\n.date-select {\n  height: 100px;\n}\n\n.carousel {\n  width: calc(100% - 100px);\n  border-right: 1px solid silver;\n}\n.date-select {\n  width: 100px;\n  min-width: 100px;\n  position: relative;\n  border-right: 1px solid silver;\n  border-left: 1px solid silver;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  button {\n    text-transform: uppercase;\n    letter-spacing: 1px;\n    color: var(--lighter-black);\n    width: 100%;\n    height: 100%;\n  }\n  .active-button {\n    background-color: rgba(0, 0, 0, 0.15);\n    font-weight: bold;\n  }\n}\n\n.item-container {\n  cursor: pointer;\n  height: 100px;\n  width: 200px;\n}\n.slick-prev:before,\n.slick-next:before {\n  color: black;\n}\n.slick-list:focus {\n  outline: none;\n}\n"])),RecentEvents_RecentEventsItem=function RecentEventsItem(_ref){var homeTeam=_ref.homeTeam,awayTeam=_ref.awayTeam,gameSummary=_ref.gameSummary,homeScore=_ref.homeScore,awayScore=_ref.awayScore,index=_ref.index,_ref=_ref.selectedGameIndex;return react_default.a.createElement(RecentEventsItemWrapper,{gameSummary:gameSummary},react_default.a.createElement("div",{className:"".concat(_ref===index?"active":"inactive"," team-container")},react_default.a.createElement("div",{className:"team away"},react_default.a.createElement("div",{className:"image-container"},react_default.a.createElement(GetPlayerImage.a,{playerName:awayTeam.replace(/\s/g,"_"),isTeam:!0})),react_default.a.createElement("p",{className:"team-name"},breakTeamName(awayTeam).firstName,react_default.a.createElement("br",null),breakTeamName(awayTeam).lastName),react_default.a.createElement("p",{className:"team-score"},awayScore)),react_default.a.createElement("div",{className:"team home"},react_default.a.createElement("div",{className:"image-container"},react_default.a.createElement(GetPlayerImage.a,{playerName:homeTeam.replace(/\s/g,"_"),isTeam:!0})),react_default.a.createElement("p",{className:"team-name"},breakTeamName(homeTeam).firstName,react_default.a.createElement("br",null),breakTeamName(homeTeam).lastName),react_default.a.createElement("p",{className:"team-score"},homeScore))))},react_router=__webpack_require__(16),react_router_dom=__webpack_require__(13),es=__webpack_require__(12),gamesActions=__webpack_require__(250);function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(r,l){var t=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=t){var e,n,i,u,a=[],f=!0,o=!1;try{if(i=(t=t.call(r)).next,0===l){if(Object(t)!==t)return;f=!1}else for(;!(f=(e=i.call(t)).done)&&(a.push(e.value),a.length!==l);f=!0);}catch(r){o=!0,n=r}finally{try{if(!f&&null!=t.return&&(u=t.return(),Object(u)!==u))return}finally{if(o)throw n}}return a}}(arr,i)||_unsupportedIterableToArray(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _unsupportedIterableToArray(o,minLen){var n;if(o)return"string"==typeof o?_arrayLikeToArray(o,minLen):"Map"===(n="Object"===(n=Object.prototype.toString.call(o).slice(8,-1))&&o.constructor?o.constructor.name:n)||"Set"===n?Array.from(o):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(o,minLen):void 0}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}__webpack_exports__.a=function RecentEventsList(_ref){function getDateFromGameCode(game){return game=game.id,Object(GetMonthName.a)(game.substring(4,6))+" "+game.substring(6,8)}function handleSelectDate(date){setSelectedDate(date)}function renderGamesList(){return dateToGames[selectedDate].map(function(game){var homeTeam=game.Home.Team,awayTeam=game.Away.Team,homeScore=game.Home.points,awayScore=game.Away.points,index=gameInfo.map(function(e){return e.id}).indexOf(game.id);return react_default.a.createElement("div",{onClick:function onClick(){return setSelectedGameIndex(index)},className:"item-container",key:index,style:{width:200}},react_default.a.createElement(react_router_dom.a,{to:"".concat(url,"/").concat(gameInfo[index].id,"/").concat(activeTab)},react_default.a.createElement(RecentEvents_RecentEventsItem,{homeTeam:homeTeam,awayTeam:awayTeam,homeScore:homeScore,awayScore:awayScore,index:index,selectedGameIndex:selectedGameIndex})))})}var gameInfo=_ref.gameInfo,setSelectedGameIndex=_ref.setSelectedGameIndex,selectedGameIndex=_ref.selectedGameIndex,url=_ref.url,_ref=Object(react_router.h)(),history=Object(react_router.g)(),gamePath=_ref.pathname.split("/")[2],activeTab=Object(es.d)(function(state){return state.gamesReducer.activeTab}),dispatch=Object(es.c)(),gameCodeArr=gameInfo.map(function(game){return game.id}),findIndexFromGamePath=(Object(react.useEffect)(function(){var index,_selectedDate;gamePath&&(gameCodeArr.includes(gamePath)?(index=findIndexFromGamePath(gamePath),_selectedDate=Object(GetMonthName.a)(gamePath.substring(4,6))+" "+gamePath.substring(6,8),setSelectedGameIndex(index),dispatch(Object(gamesActions.a)(activeTab)),setSelectedDate(_selectedDate)):history.push("/404"))},[_ref]),function findIndexFromGamePath(path){return gameInfo.map(function(e){return e.id}).indexOf(path)}),_ref=_slicedToArray(Object(react.useState)(getDateFromGameCode(gameInfo[gameInfo.length-1])),2),selectedDate=_ref[0],setSelectedDate=_ref[1],dateToGames={},dateList=[];gameInfo.forEach(function(game){var date=getDateFromGameCode(game);date in dateToGames?dateToGames[date].push(game):dateToGames[date]=[game],dateList.includes(date)||dateList.push(date)}),dateList=dateList.sort().slice(Math.max(dateList.length-3,0));return react_default.a.createElement(RecentEventsListWrapper,{selectedGameIndex:selectedGameIndex},react_default.a.createElement("div",{className:"recent-events-wrapper"},react_default.a.createElement("div",{className:"date-select"},function renderDateButtons(){var _step,buttonArr=[],_iterator=function _createForOfIteratorHelper(o,allowArrayLike){var normalCompletion,didErr,err,i,it="undefined"!=typeof Symbol&&o[Symbol.iterator]||o["@@iterator"];if(it)return didErr=!(normalCompletion=!0),{s:function s(){it=it.call(o)},n:function n(){var step=it.next();return normalCompletion=step.done,step},e:function e(_e2){didErr=!0,err=_e2},f:function f(){try{normalCompletion||null==it.return||it.return()}finally{if(didErr)throw err}}};if(Array.isArray(o)||(it=_unsupportedIterableToArray(o))||allowArrayLike&&o&&"number"==typeof o.length)return it&&(o=it),i=0,{s:allowArrayLike=function F(){},n:function n(){return i>=o.length?{done:!0}:{done:!1,value:o[i++]}},e:function e(_e){throw _e},f:allowArrayLike};throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(dateList);try{var _loop=function _loop(){var date=_step.value;buttonArr.push(react_default.a.createElement("button",{key:date,onClick:function onClick(){return handleSelectDate(date)},className:date===selectedDate?"active-button":""},date))};for(_iterator.s();!(_step=_iterator.n()).done;)_loop()}catch(err){_iterator.e(err)}finally{_iterator.f()}return buttonArr}()),react_default.a.createElement("div",{className:"carousel"},react_default.a.createElement(Carousel.a,{numOfItems:dateToGames[selectedDate].length},renderGamesList()))))}},1259:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var react=__webpack_require__(0),react_default=__webpack_require__.n(react),globalStyles=__webpack_require__(63),RecentEventsList=__webpack_require__(1085),ScrollToTopOnMount=__webpack_require__(128),react_router=__webpack_require__(16),loadingSpinner=__webpack_require__(920);function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(r,l){var t=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=t){var e,n,i,u,a=[],f=!0,o=!1;try{if(i=(t=t.call(r)).next,0===l){if(Object(t)!==t)return;f=!1}else for(;!(f=(e=i.call(t)).done)&&(a.push(e.value),a.length!==l);f=!0);}catch(r){o=!0,n=r}finally{try{if(!f&&null!=t.return&&(u=t.return(),Object(u)!==u))return}finally{if(o)throw n}}return a}}(arr,i)||function _unsupportedIterableToArray(o,minLen){var n;if(o)return"string"==typeof o?_arrayLikeToArray(o,minLen):"Map"===(n="Object"===(n=Object.prototype.toString.call(o).slice(8,-1))&&o.constructor?o.constructor.name:n)||"Set"===n?Array.from(o):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(o,minLen):void 0}(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function mapStateToProps(_ref){return{gameInfo:(_ref=_ref.firestoreReducer).ordered.gameInfoJson,gamePbp:_ref.ordered.gamePbpJson,gamePlayers:_ref.ordered.gamePlayersJson}}var GameSummary=Object(react.lazy)(function(){return __webpack_require__.e(25).then(__webpack_require__.bind(null,1108))}),GameStats_GamePage=function GamePage(props){var _useState2=_slicedToArray(Object(react.useState)(props.gameInfo.length-1),2),selectedGameIndex=_useState2[0],_useState2=_useState2[1],_useRouteMatch=Object(react_router.j)(),path=_useRouteMatch.path,_useRouteMatch=_useRouteMatch.url;return Object(react.useEffect)(function(){props.history.push("".concat(path,"/").concat(props.gameInfo[0].id,"/overview"))},[]),react_default.a.createElement(react_default.a.Fragment,null,react_default.a.createElement(ScrollToTopOnMount.a,null),react_default.a.createElement(RecentEventsList.a,{gameInfo:props.gameInfo,setSelectedGameIndex:_useState2,selectedGameIndex:selectedGameIndex,url:_useRouteMatch}),react_default.a.createElement(globalStyles.b,{games:!0},react_default.a.createElement(react.Suspense,{fallback:react_default.a.createElement("div",{style:{width:"100%",height:"calc(100vh - 284.14px)",display:"flex",justifyContent:"center",alignItems:"center"}},react_default.a.createElement(loadingSpinner.a,{width:"100%",height:"100%"}))},react_default.a.createElement(react_router.b,{path:"".concat(path,"/:gameId?")},react_default.a.createElement(GameSummary,{gameInfo:props.gameInfo,gamePbp:props.gamePbp,gamePlayers:props.gamePlayers,selectedGameIndex:selectedGameIndex})))))},SEO=__webpack_require__(916),es=__webpack_require__(12),GamePageContainer_GamePageContainer=function GamePageContainer(props){return react_default.a.createElement(react_default.a.Fragment,null,react_default.a.createElement(SEO.a,{title:"NBA game analytics",description:"NBA game analytics - powered by AI, Machine learning, & Statistics. We provide match facts, boxscores, shot types, fantasy ranking, and time series analysis. The time series analysis consists of game of runs, effective field goal percentage, fantasy scores, plays (possessions), and play by play texts. We aim to have the most accurate and fastest sports stats provider."}),react_default.a.createElement(globalStyles.d,null,react_default.a.createElement(GameStats_GamePage,{gameInfo:props.gameInfo,gamePbp:props.gamePbp,gamePlayers:props.gamePlayers,history:props.history})))};__webpack_exports__.default=Object(es.b)(mapStateToProps)(GamePageContainer_GamePageContainer)},911:function(module,__webpack_exports__,__webpack_require__){"use strict";var react=__webpack_require__(0),react_default=__webpack_require__.n(react),react_router=__webpack_require__(16),config=__webpack_require__(34),react_content_loader_es=__webpack_require__(919),Shared_Loader=function Loader(_ref){var width,_ref=_ref.page,_ref=_ref.includes("/leaderboard")?width=80:_ref.includes("/team")?(width=150,160):width=27;return react_default.a.createElement(react_content_loader_es.a,{speed:2,width:width,height:_ref,viewBox:"0 0 ".concat(width," ").concat(_ref),backgroundColor:"#f3f3f3",foregroundColor:"#ecebeb"},react_default.a.createElement("rect",{x:"0",y:"0",rx:"0",ry:"0",width:"".concat(width),height:"".concat(_ref)}))};function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(r,l){var t=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=t){var e,n,i,u,a=[],f=!0,o=!1;try{if(i=(t=t.call(r)).next,0===l){if(Object(t)!==t)return;f=!1}else for(;!(f=(e=i.call(t)).done)&&(a.push(e.value),a.length!==l);f=!0);}catch(r){o=!0,n=r}finally{try{if(!f&&null!=t.return&&(u=t.return(),Object(u)!==u))return}finally{if(o)throw n}}return a}}(arr,i)||function _unsupportedIterableToArray(o,minLen){var n;if(o)return"string"==typeof o?_arrayLikeToArray(o,minLen):"Map"===(n="Object"===(n=Object.prototype.toString.call(o).slice(8,-1))&&o.constructor?o.constructor.name:n)||"Set"===n?Array.from(o):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(o,minLen):void 0}(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}__webpack_exports__.a=function GetPlayerImage(_ref){var playerName=_ref.playerName,isTeam=_ref.isTeam,_ref=Object(react_router.g)().location.pathname,_useState2=_slicedToArray(Object(react.useState)(""),2),playerUrl=_useState2[0],setPlayerUrl=_useState2[1];return Object(react.useEffect)(function(){var isMounted=!0;return config.d.ref().child("".concat(isTeam?"team_logo_spi":"player_photo_hayaoStyle_S","/").concat(playerName+".png")).getDownloadURL().then(function(url){isMounted&&setPlayerUrl(url)}).catch(function(){config.d.ref().child("player_photo_hayaoStyle_S/Anonymous_Image.png").getDownloadURL().then(function(url){isMounted&&setPlayerUrl(url)}).catch(function(error){return console.log(error)})}),function(){isMounted=!1}},[playerName]),""===playerUrl?react_default.a.createElement(Shared_Loader,{page:_ref}):react_default.a.createElement("img",{src:playerUrl,alt:playerName})}},915:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",function(){return getMonthName});var getMonthName=function getMonthName(num){return["January","February","March","April","May","June","July","August","September","October","November","December"][num-1].substring(0,3)}},916:function(module,__webpack_exports__,__webpack_require__){"use strict";var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__),react_helmet__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(938);__webpack_exports__.a=function SEO(_ref){var title=_ref.title,description=_ref.description;_ref.slug;return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_helmet__WEBPACK_IMPORTED_MODULE_1__.a,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("title",null,title?"".concat(title," | Sports Inference"):"Sports Inference"),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta",{name:"title",content:"Sports Inference","data-react-helmet":"true"}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta",{name:"description",content:description,"data-react-helmet":"true"}))}},920:function(module,__webpack_exports__,__webpack_require__){"use strict";var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__),react_spinners__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(926);__webpack_exports__.a=function Spinner(_ref){var width=_ref.width,_ref=_ref.height;return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div",{style:{width:width,height:_ref,display:"flex",justifyContent:"center",alignItems:"center"}},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_spinners__WEBPACK_IMPORTED_MODULE_1__.ClipLoader,{color:"#C4C4C4",size:"",loading:!0}))}},968:function(module,__webpack_exports__,__webpack_require__){"use strict";var react=__webpack_require__(0),react_default=__webpack_require__.n(react),lib=(__webpack_require__(979),__webpack_require__(980),__webpack_require__(981)),lib_default=__webpack_require__.n(lib);var CarouselWrapper=__webpack_require__(5).b.div(function _taggedTemplateLiteral(strings,raw){return raw=raw||strings.slice(0),Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))}(["\n  .slick-track {\n    max-width: calc(1440px - 100px)!important;\n    display: flex;\n    width: 100% !important;\n  }\n  .slick-slide:hover {\n    background: rgba(255, 255, 255, 1);\n  }\n  .slick-slide div:focus {\n    outline: none;\n  }\n  .slick-prev{\n    z-index: 1;\n    height: 100%;\n    width: 1rem;\n    left: 0;\n    background: silver;\n  } \n  .slick-arrow{\n    font-size: 1rem;\n    color: #333;\n    background: rgba(0,0,0,0.1);\n    position: absolute;\n    width: 3rem;\n    height: 3rem;\n    cursor: pointer;\n    top: 50%;\n    transform: translateY(-50%);\n    border-radius: 50%;\n    z-index: 2;\n    &.left {\n      left: 0.5rem;\n    }\n    &.right {\n      right: 0.5rem;\n    }\n    &:hover {\n      background: var(--main-blue);\n      color: var(--white);\n    }\n    .fa-chevron-left, .fa-chevron-right {\n      display: flex;\n      align-items: center;\n      height: 100%;\n      margin: auto;\n    }\n  }\n  .hide, .slick-disabled {\n    display: none;\n  }\n  @media(max-width: 568px) {\n    .slick-arrow {\n      display: none;\n    }\n  }\n"]));function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(r,l){var t=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=t){var e,n,i,u,a=[],f=!0,o=!1;try{if(i=(t=t.call(r)).next,0===l){if(Object(t)!==t)return;f=!1}else for(;!(f=(e=i.call(t)).done)&&(a.push(e.value),a.length!==l);f=!0);}catch(r){o=!0,n=r}finally{try{if(!f&&null!=t.return&&(u=t.return(),Object(u)!==u))return}finally{if(o)throw n}}return a}}(arr,i)||function _unsupportedIterableToArray(o,minLen){var n;if(o)return"string"==typeof o?_arrayLikeToArray(o,minLen):"Map"===(n="Object"===(n=Object.prototype.toString.call(o).slice(8,-1))&&o.constructor?o.constructor.name:n)||"Set"===n?Array.from(o):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(o,minLen):void 0}(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}var Carousel_LeftArrow=function LeftArrow(_ref){var onClick=_ref.onClick,_ref=_ref.activeSlide;return react_default.a.createElement("button",{className:"slick-arrow left ".concat(0===_ref&&"hide"),disabled:0===_ref,onClick:onClick},react_default.a.createElement("i",{className:"fas fa-chevron-left"}))},Carousel_RightArrow=function RightArrow(_ref2){var onClick=_ref2.onClick,numOfItems=_ref2.numOfItems,_ref2=_ref2.activeSlide,numOfItems=Math.floor(numOfItems/6)<=_ref2;return react_default.a.createElement("button",{className:"slick-arrow right ".concat(numOfItems&&"hide"),onClick:onClick,disabled:numOfItems},react_default.a.createElement("i",{className:"fas fa-chevron-right"}))};__webpack_exports__.a=function Carousel(_ref3){var children=_ref3.children,_ref3=_ref3.numOfItems,_useState2=_slicedToArray(Object(react.useState)(0),2),activeSlide=_useState2[0],setActiveSlide=_useState2[1];return react_default.a.createElement(CarouselWrapper,{activeSlide:activeSlide},react_default.a.createElement(lib_default.a,{className:"variable-width center",infinite:!1,slidesToShow:6,slidesToScroll:6,swipeToSlide:!0,variableWidth:!0,prevArrow:react_default.a.createElement(Carousel_LeftArrow,{activeSlide:activeSlide}),nextArrow:react_default.a.createElement(Carousel_RightArrow,{activeSlide:activeSlide,numOfItems:_ref3}),beforeChange:function beforeChange(current,next){return setActiveSlide(next)},responsive:[{breakpoint:1440,settings:{slidesToShow:5,slidesToScroll:5}},{breakpoint:1380,settings:{slidesToShow:4,slidesToScroll:4}},{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:3}},{breakpoint:768,settings:{slidesToShow:2,slidesToScroll:2}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]},children))}}}]);