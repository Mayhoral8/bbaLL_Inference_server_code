(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{1263:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var react=__webpack_require__(0),react_default=__webpack_require__.n(react),es=__webpack_require__(12);var BoxScoreTableWrapper=__webpack_require__(5).b.div(function _taggedTemplateLiteral(strings,raw){return raw=raw||strings.slice(0),Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}))}(['\n  display: flex;\n  margin: 1.5rem 0 0 0rem;\n  user-select: none;\n  max-height: 410px;\n  \n  .table-scroll {\n    overflow-x: auto;\n    overflow-y: auto;\n    scrollbar-width: thin;\n    position: relative;\n    display: flex;\n  }\n  .table {\n    font-family: "Roboto Condensed", sans-serif;\n  }\n  .table.name,\n  .table.name .table-body {\n    display: flex;\n    flex-direction: column;\n\n    @media (max-width: 834px) {\n      min-width: 7.5rem;\n    }\n  }\n  .table.name {\n    border-right: 1px solid #eee;\n  }\n  .table-body {\n    display: flex;\n    flex-flow: row wrap;\n  }\n  .table-header {\n    background: var(--main-blue);\n    color: var(--white);\n    text-transform: uppercase;\n    font-size: 0.8rem;\n    cursor: pointer;\n    display: flex;\n    width: 100%;\n  }\n  .table.data {\n    width: 100%;\n\n    \n    @media (max-width: 834px) {\n      min-width: 200px;\n    }\n    max-width: 1300px;\n  }\n  .table-row {\n    display: flex;\n    width: 100%;\n    border-bottom: 1px solid #eee;\n  }\n  .table-header .table-row {\n    border-bottom: none;\n  }\n  .table.name .table-data {\n    width: 100%;\n  }\n  .table.data .table-data {\n    text-align: center;\n    position: relative;\n    width: 100%;\n  }\n  .table-data {\n    padding: 0.5rem;\n    overflow: hidden;\n    white-space: nowrap;\n    @media (max-width: 834px) {\n      font-size: 0.7rem;\n    }\n\n    font-size: 0.9rem;\n    a {\n      text-decoration: none;\n      color: var(--black);\n      &:hover {\n        font-weight: bold;\n      }\n    }\n  }\n  .table-row.team {\n    background: ',";\n  }\n  .table-row.team .table-data {\n    display: ",";\n  }\n\n  .table-row .descending.table-data,\n  .table-row .ascending.table-data {\n    background: rgba(53, 48, 88, 0.05);\n  }\n  .top-value {\n    color: var(--accent);\n    font-weight: bold;\n  }\n  .fa-caret-down,\n  .fa-caret-up {\n    position: absolute;\n    color: #7870b1;\n    left: 50%;\n    transform: translateX(-50%);\n    bottom: -0.2rem;\n  }\n  .fa-caret-down {\n    display: none;\n  }\n  .descending {\n    .fa-caret-up {\n      display: none;\n    }\n    .fa-caret-down {\n      display: flex;\n    }\n  }\n\n  @media (max-width: 1200px) {\n    /* .table.data {\n    width: 800px;\n    overflow-x: auto;\n  } */\n  }\n"]),function(_ref){return _ref.bottomRowHeading?"rgba(0, 0, 0, 0.05)":""},function(_ref2){return _ref2.renderTeamData?"block":"none"});function _typeof(o){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o})(o)}function _toConsumableArray(arr){return function _arrayWithoutHoles(arr){if(Array.isArray(arr))return _arrayLikeToArray(arr)}(arr)||function _iterableToArray(iter){if("undefined"!=typeof Symbol&&null!=iter[Symbol.iterator]||null!=iter["@@iterator"])return Array.from(iter)}(arr)||_unsupportedIterableToArray(arr)||function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(r,l){var t=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=t){var e,n,i,u,a=[],f=!0,o=!1;try{if(i=(t=t.call(r)).next,0===l){if(Object(t)!==t)return;f=!1}else for(;!(f=(e=i.call(t)).done)&&(a.push(e.value),a.length!==l);f=!0);}catch(r){o=!0,n=r}finally{try{if(!f&&null!=t.return&&(u=t.return(),Object(u)!==u))return}finally{if(o)throw n}}return a}}(arr,i)||_unsupportedIterableToArray(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _unsupportedIterableToArray(o,minLen){var n;if(o)return"string"==typeof o?_arrayLikeToArray(o,minLen):"Map"===(n="Object"===(n=Object.prototype.toString.call(o).slice(8,-1))&&o.constructor?o.constructor.name:n)||"Set"===n?Array.from(o):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(o,minLen):void 0}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function _defineProperty(obj,key,value){return(key=function _toPropertyKey(arg){arg=function _toPrimitive(input,hint){if("object"!==_typeof(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0===prim)return("string"===hint?String:Number)(input);prim=prim.call(input,hint||"default");if("object"!==_typeof(prim))return prim;throw new TypeError("@@toPrimitive must return a primitive value.")}(arg,"string");return"symbol"===_typeof(arg)?arg:String(arg)}(key))in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function mapStateToProps(state){return{isTeam:state.sidebarReducer.isTeam}}__webpack_require__=function TeamScoreTable(_ref){function tableHeading(headings){return headings.map(function(attr,i){return react_default.a.createElement("div",{key:attr,className:"".concat(sortingType.current[attr]," table-data"),onClick:function onClick(){return setListOfTeams(sortTeams(listOfTeams,attr))}},attr,react_default.a.createElement("i",{className:"fas fa-caret-up"}),react_default.a.createElement("i",{className:"fas fa-caret-down"}))})}var data=_ref.data,DATA_ATTR=["Massey","ELO","Standing"],headings=["rank","ELO","Massey","Win(%)"],initialSortingType=(DATA_ATTR.map(function(key){var arr=[];Object.keys(data[key]).map(function(entry){var name=Object.keys(data[key][entry])[0];arr.push(_defineProperty({},name,data[key][entry][name]))}),data[key]=arr}),{rank:"",name:"",ELO:"",Massey:"","Win(%)":""}),sortingType=Object(react.useRef)({rank:"descending",name:"",ELO:"",Massey:"","Win(%)":""}),_ref=_slicedToArray(Object(react.useState)([]),2),listOfTeams=_ref[0],setListOfTeams=_ref[1],placeholderArray=[],sortTeams=(Object(react.useEffect)(function(){DATA_ATTR.map(function(key){data[key].map(function(teamObj){for(var teamIndex,teamName=Object.keys(teamObj)[0],teamObj=teamObj[teamName],doesObjExist=!1,i=0;i<placeholderArray.length;i++)if(placeholderArray[i].name===teamName){teamIndex=i,doesObjExist=!0;break}!1===doesObjExist&&(placeholderArray.push({name:teamName}),teamIndex=placeholderArray.length-1),"Standing"===key?(placeholderArray[teamIndex]["Win(%)"]=parseFloat(teamObj.PCT),placeholderArray[teamIndex].rank=parseInt(teamObj.rank)):placeholderArray[teamIndex][key]=teamObj})}),setListOfTeams(sortTeams(placeholderArray,"rank"))},[]),function sortTeams(arr,attr){return attr in sortingType.current&&(0===sortingType.current[attr].length?(sortingType.current=initialSortingType,sortingType.current[attr]="descending"):"descending"===sortingType.current[attr]?(sortingType.current=initialSortingType,sortingType.current[attr]="ascending"):"ascending"===sortingType.current[attr]&&(sortingType.current=initialSortingType,sortingType.current[attr]="descending")),_toConsumableArray(arr).sort(function(a,b){function handleMissingProperties(a,b){return a.hasOwnProperty(attr)||b.hasOwnProperty(attr)?a.hasOwnProperty(attr)?b.hasOwnProperty(attr)?void 0:-1:1:0}return"ascending"===sortingType.current[attr]?a.hasOwnProperty(attr)&&b.hasOwnProperty(attr)?a[attr]-b[attr]:handleMissingProperties(a,b):"descending"===sortingType.current[attr]?a.hasOwnProperty(attr)&&b.hasOwnProperty(attr)?b[attr]-a[attr]:handleMissingProperties(a,b):void 0})}),_ref=listOfTeams.map(function(obj,i){return react_default.a.createElement("div",{className:"table-row",key:i},headings.map(function(attr){var value="",value=attr in obj?"Win(%)"===attr?Math.round(100*parseFloat(obj[attr])):"name"===attr?obj[attr]:Math.round(100*parseFloat(obj[attr]))/100:"  -  ";return react_default.a.createElement("div",{key:attr,className:"".concat(sortingType.current[attr]," table-data")},value)}))});return react_default.a.createElement(BoxScoreTableWrapper,null,react_default.a.createElement("div",{className:"table-scroll"},react_default.a.createElement("div",{className:"table name"},react_default.a.createElement("div",{className:"table-header"},react_default.a.createElement("div",{className:"table-row"},react_default.a.createElement("div",{className:"table-data"},"Name"))),react_default.a.createElement("div",{className:"table-body"},function fixedColumn(items){return items.map(function(obj,i){var value="",link="";return"name"in obj?(value=obj.name,link="/team/".concat(value.replaceAll(" ","_"))):value=" - ",react_default.a.createElement("div",{className:"table-row",key:i},react_default.a.createElement("div",{className:"table-data",key:i},react_default.a.createElement("a",{href:link},value)))})}(listOfTeams))),react_default.a.createElement("div",{className:"table data"},react_default.a.createElement("div",{className:"table-header"},react_default.a.createElement("div",{className:"table-row"},tableHeading(headings))),react_default.a.createElement("div",{className:"table-body"},_ref))))};__webpack_exports__.default=Object(es.b)(mapStateToProps)(__webpack_require__)}}]);