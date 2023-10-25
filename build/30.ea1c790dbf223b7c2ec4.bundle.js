(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{1081:function(module,exports,__webpack_require__){module.exports=function(url,opts){null==opts&&(opts={fuzzy:!0});if(/youtu\.?be/.test(url)){var patterns=[/youtu\.be\/([^#\&\?]{11})/,/\?v=([^#\&\?]{11})/,/\&v=([^#\&\?]{11})/,/embed\/([^#\&\?]{11})/,/\/v\/([^#\&\?]{11})/];for(i=0;i<patterns.length;++i)if(patterns[i].test(url))return patterns[i].exec(url)[1];if(opts.fuzzy)for(var tokens=url.split(/[\/\&\?=#\.\s]/g),i=0;i<tokens.length;++i)if(/^[^#\&\?]{11}$/.test(tokens[i]))return tokens[i]}return null}},1106:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(0),react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__),get_youtube_id__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(1081),get_youtube_id__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(get_youtube_id__WEBPACK_IMPORTED_MODULE_1__),_Overview_styles__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(929),_Shared_Spinner_loadingSpinner__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(920);__webpack_exports__.default=function Overview(_ref){var highlights=_ref.highlights,YoutubeHighlight=_ref.YoutubeHighlight,screenCapture=_ref.screenCapture,_ref=_ref.reference,YoutubeHighlight=get_youtube_id__WEBPACK_IMPORTED_MODULE_1___default()(YoutubeHighlight);return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Overview_styles__WEBPACK_IMPORTED_MODULE_2__.d,{ref:_ref,screenCapture:screenCapture},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Suspense,{fallback:react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Shared_Spinner_loadingSpinner__WEBPACK_IMPORTED_MODULE_3__.a,null)},void 0!==YoutubeHighlight||screenCapture?screenCapture?null:react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Overview_styles__WEBPACK_IMPORTED_MODULE_2__.n,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("iframe",{width:"853",height:"440",src:"https://www.youtube.com/embed/".concat(YoutubeHighlight),frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0,title:"Embedded youtube"})):react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Overview_styles__WEBPACK_IMPORTED_MODULE_2__.j,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Overview_styles__WEBPACK_IMPORTED_MODULE_2__.m,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Overview_styles__WEBPACK_IMPORTED_MODULE_2__.c,null,react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1",null,"OOPS!"),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2",null,"Sorry, we can't find highlights for this game"))))),0<highlights.length?react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Overview_styles__WEBPACK_IMPORTED_MODULE_2__.j,{screenCapture:screenCapture},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3",null,"TOP HIGHLIGHTS"),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul",null,highlights.map(function(text,i){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li",{key:i},text)}))):null))}},929:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"d",function(){return OverviewWrapper}),__webpack_require__.d(__webpack_exports__,"j",function(){return StyledHighlightWrapper}),__webpack_require__.d(__webpack_exports__,"n",function(){return VideoResonsiveWrapper}),__webpack_require__.d(__webpack_exports__,"m",function(){return VideoNotFoundContiner}),__webpack_require__.d(__webpack_exports__,"c",function(){return Message}),__webpack_require__.d(__webpack_exports__,"l",function(){return TapsWrapper}),__webpack_require__.d(__webpack_exports__,"g",function(){return PlotButtonsContiner}),__webpack_require__.d(__webpack_exports__,"h",function(){return PlotButtonsContinerLeft}),__webpack_require__.d(__webpack_exports__,"f",function(){return PlotButtons}),__webpack_require__.d(__webpack_exports__,"k",function(){return SummaryOverviewWrapper}),__webpack_require__.d(__webpack_exports__,"i",function(){return ProgressBarWrapper}),__webpack_require__.d(__webpack_exports__,"e",function(){return PlayByPlayList}),__webpack_require__.d(__webpack_exports__,"b",function(){return ListItem}),__webpack_require__.d(__webpack_exports__,"a",function(){return ChartContainer});var __webpack_exports__=__webpack_require__(5),polished__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(167);function _taggedTemplateLiteral(strings,raw){return raw=raw||strings.slice(0),Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))}var OverviewWrapper=__webpack_exports__.b.div(_taggedTemplateLiteral(["\n  ","\n"]),function(props){return props.screenCapture?"\n      width: 100%;\n    ":"\n      display:grid;\n      grid-template-columns: 1fr;\n      margin-bottom: 2rem;\n      padding-left: 1.5rem;\n      padding-right: 1.5rem;\n      padding-bottom: 2rem;\n      border-bottom: 1px solid silver;\n      grid-gap: 1rem;\n      @media (min-width: 996px) {\n        grid-template-columns: 1.5fr 1fr;\n      }"}),StyledHighlightWrapper=__webpack_exports__.b.div(_taggedTemplateLiteral(["\n  margin-top: ",";\n  padding-top: 1.5rem;\n  border:0.5px solid #080A1E;\n  box-shadow: ",';\n  h3 {\n    border-bottom:0.5px solid #080A1E;\n    margin-left: 2rem;\n    margin-right: 2rem;\n    color: var(--lighter-black);\n    text-transform: uppercase;\n    letter-spacing: 1px;\n    font-family: Popins;\n    font-style: normal;\n    font-weight: 600;\n    display: flex;\n    align-items: center;\n    img {\n      width: 30px;\n      margin-right: 0.5rem;\n    }\n  }\n  ul {\n    list-style-type: square;\n    margin-left: 2.5rem;\n    margin-right: 2rem;\n    margin-top: 0.5rem;\n    padding-bottom: 1rem;\n    list-style-type: none;\n\n  }\n  ul > li {\n    text-indent: -5px;\n  }\n\n  ul > li: before {\n    content: "-           ";\n    text-indent: -5px;\n  }\n  li {\n    padding: 3px 0;\n    font-family: Popins;\n    font-style: normal;\n    font-weight: 400;\n  }\n  @media (max-width: 568px) {\n    ul {\n      margin-left: 2.5rem;\n    }\n  }\n']),function(props){return props.screenCapture?"10px":"0px"},function(props){return props.screenCapture?"":"0 4px 2px 0px gray"}),VideoResonsiveWrapper=__webpack_exports__.b.div(_taggedTemplateLiteral(["\n  overflow:hidden;\n  padding-bottom: 56.25%;\n  position: relative;\n  height: 0;\n  border:0.5px solid #080A1E;\n  box-shadow: 0 4px 2px 0px gray;\n  iframe {\n    left: 0;\n    top: 0;\n    height: 100%;\n    width: 100%;\n    position: absolute;\n  }\n"])),VideoNotFoundContiner=__webpack_exports__.b.div(_taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  padding: 1vw;\n\n  @media(min-width: 996px) {\n    flex-direction: row;\n  }\n"])),Message=__webpack_exports__.b.div(_taggedTemplateLiteral(["\n\n  h1 {\n    font-size: 6vw;\n    text-shadow: 2px 1px 0px #7A7A7A;\n    color: #353058;\n  }\n  h2 {\n    font-size: 2vw;\n    color: #333;\n    margin-bottom: 2rem;\n  }\n  @media(min-width: 768px) {\n    h1 {\n      font-size: 6vw;\n      text-shadow: 4px 3px 0px #7A7A7A;\n      color: #353058;\n    }\n  }\n"])),TapsWrapper=(__webpack_exports__.b.button(_taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n  outline: none;\n  margin: 0 auto 0.5rem;\n\n  span {\n    margin: 0 0.5rem;\n    font-size: 0.9rem;\n  }\n\n  .toggle-label {\n    cursor: pointer;\n    width: 40px;\n    height: 21px;\n    background: grey;\n    display: block;\n    border-radius: 40px;\n    position: relative;\n\n    &:after{\n      content: '';\n      position: absolute;\n      top: 2px;\n      left: 2px;\n      width: 17px;\n      height: 17px;\n      background: var(--white);\n      border-radius: 40px;\n      transition: 0.3s;\n      transform: ",";\n    }\n  }\n\n  input {\n    height: 0;\n    width: 0;\n    visibility: hidden;\n  }\n"]),function(_ref){return!0===_ref.toggled?"translateX(19px)":"translateX(0)"}),__webpack_exports__.b.div(_taggedTemplateLiteral(["\n  display:grid;\n  grid-template-columns: 1fr 1fr;\n  @media(min-width: 996px){\n    grid-template-columns: 2.5fr 1fr;\n  }\n"]))),PlotButtonsContiner=__webpack_exports__.b.div(_taggedTemplateLiteral(["\n  width: 95%;\n  position: relative;\n  margin:-13px auto 0 auto;\n  justify-content: center;\n  @media (min-width: 996px) {\n    width:50%;\n  }\n  \n  @media (min-width: 768px) and (max-width:996px) {\n    width: 30%;\n  }\n\n  @media (min-width: 592px) and (max-width:769px) {\n    width: 40%;\n  }\n\n  @media (min-width: 486px) and (max-width:591px) {\n    width: 50%;\n  }\n\n  @media (min-width: 450px) and (max-width:485px) {\n    width: 60%;\n  }\n\n\n  @media (min-width: 366px) and (max-width:449px) {\n    width: 60%;\n  }\n\n  @media (min-width: 330px) and (max-width:365px) {\n    width: 80%;\n  }\n\n  @media (min-width: 280px) and (max-width:330px) {\n    width: 100%;\n  }\n"])),PlotButtonsContinerLeft=__webpack_exports__.b.div(_taggedTemplateLiteral(["\nwidth: 95%;\nposition: relative;\nmargin:-13px auto 0 auto;\njustify-content: center;\n\n@media (min-width: 1194px) {\n  width:30%;\n}\n@media (min-width: 996px) and (max-width:1194px) {\n  width:40%;\n}\n@media (min-width: 901px) and (max-width:995px) {\n  width: 50%;\n}\n@media (min-width: 768px) and (max-width:900px) {\n  width: 60%;\n}\n@media (min-width: 330px) and (max-width:450px) {\n  width: 100%;\n}\n@media (min-width: 570px) and (max-width:768px) {\n  width: 70%;\n}\n@media (min-width: 471px) and (max-width:570px) {\n  width: 80%;\n}\n@media (min-width: 450px) and (max-width:470px) {\n  width: 90%;\n}\n@media (min-width: 280px) and (max-width:330px) {\n  width: 100%;\n}\n"])),PlotButtons=__webpack_exports__.b.div(_taggedTemplateLiteral(["\n  margin: 1rem auto;\n  text-align: center;\n  display: flex;\n  width: 100%;\n  justify-content: center;\n  align-items: center;\n  height: 50px;\n  border-bottom: 3px solid grey;\n"])),SummaryOverviewWrapper=__webpack_exports__.b.div(_taggedTemplateLiteral(["\n  display: grid;\n  grid-template-columns: 1fr;\n  grid-gap: 1rem;\n  .mobile-hide {\n    display: none;\n  }\n  .axis-description {\n    text-align: center;\n    font-size: 0.9rem;\n    color: var(--lighter-black);\n\n    background: rgba(0, 0, 0, 0.05);\n    padding: 0.5rem 1rem;\n    margin-bottom: 1rem;\n    .vertical-divider {\n      margin: 0 0.5rem;\n    }\n  }\n  @media (min-width: 996px) {\n    grid-template-columns: 2fr 1fr;\n    .mobile-hide {\n      display: flex;\n      justify-content: center;\n    }\n    .desktop-hide {\n      display: none;\n    }\n    .axis-description {\n      margin-top: 0rem;\n    }\n  }\n"])),ProgressBarWrapper=__webpack_exports__.b.div(_taggedTemplateLiteral(["\n  width: 100%;\n  height: 2.5rem;\n  background: grey;\n  display: flex;\n  /* margin-bottom: 1rem; */\n  .bar {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    height: 2.5rem;\n    color: var(--white);\n  }\n\n  .home-bar {\n    width: ","%;\n    background: ",";\n  }\n\n  .away-bar {\n    width: ","%;\n    height: 2.5rem;\n    background: ",";\n  }\n"]),function(_ref2){_ref2=_ref2.progressbar;return _ref2&&0===_ref2[0]&&0===_ref2[1]?50:_ref2?_ref2[0]/(_ref2[0]+_ref2[1])*100:void 0},function(_ref3){_ref3=_ref3.homecolour;return _ref3},function(_ref4){_ref4=_ref4.progressbar;return _ref4&&0===_ref4[0]&&0===_ref4[1]?50:_ref4?_ref4[1]/(_ref4[0]+_ref4[1])*100:void 0},function(_ref5){_ref5=_ref5.awaycolour;return _ref5}),PlayByPlayList=__webpack_exports__.b.ul(_taggedTemplateLiteral(["\n  list-style: none;\n  border: 1px solid silver;\n  height: 25rem;\n  overflow-y: auto;\n  h3 {\n    padding: 0.5rem;\n  }\n  @media (max-width: 996px) {\n    margin-top: 2rem;\n    height: 15rem;\n  }\n"])),ListItem=__webpack_exports__.b.li(_taggedTemplateLiteral(["\n  background: ",";\n  display: grid;\n  grid-template-columns: 1fr 5fr;\n\n  .summary-container {\n    display: flex;\n    flex-direction: column;\n  }\n  .summary:not(:first-child) {\n    margin: 0.5rem 0;\n  }\n  .summary {\n    font-size: 0.9rem;\n    padding: 0.5rem;\n  }\n  .time {\n    padding: 0.5rem;\n    text-align: center;\n  }\n  @media (max-width: 500px) {\n    .time {\n      padding: 0.3rem;\n      text-align: center;\n      font-size: 0.7rem;\n    }\n    .summary {\n      font-size: 0.7rem;\n      padding: 0.3rem;\n    }\n    .summary:not(:first-child) {\n      margin: 0.2rem 0;\n    }\n  }\n"]),function(_ref6){var colour=_ref6.colour,_ref6=_ref6.currentCount;return colour&&Object(polished__WEBPACK_IMPORTED_MODULE_1__.b)(colour,.1*_ref6)}),ChartContainer=__webpack_exports__.b.div(_taggedTemplateLiteral(["\nposition: relative;\ndisplay: ",";\nwidth: 95vw;\nmargin: 0 auto;\nmax-width: 1000px;\nheight: 50vh;\nmax-height: 270px;\n\n@media (min-width: 768px) {\n  width: 91vw;\n  max-height: 45vh;\n  min-height: 350px;\n}\n\n@media (min-width: 996px) {\n  display: ",";\n  width: 57vw;\n  height: 50vh;\n}\n"]),function(_ref7){return _ref7.hide?"none":"block"},function(_ref8){return _ref8.hide?"block":"none"})}}]);