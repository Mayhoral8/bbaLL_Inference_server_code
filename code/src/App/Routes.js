import React,{useEffect} from 'react'
import {RoutesContainer} from './app-style'
import { MainContainerDiv } from "./app-style";
import { GlobalStyle } from "../globalStyles";
import { Switch, Route, Redirect,withRouter } from "react-router-dom";
import PageNotFound from "../Shared/PageNotFound/PageNotFound";
import TermsOfUse from "../Policy/TermsOfUse";
import PrivacyPolicy from "../Policy/PrivacyPolicy";
import Layout from "../Shared/Layout/Layout";
import Footer from "../Shared/Layout/Footer";
import Login from '../Auth/Login'
import Loadable from "react-loadable";
import Spinner from "../Shared/Spinner/Spinner";
import {connect} from 'react-redux'
import {compose} from 'redux'
import 'firebase/auth';
import {firebaseInstanceSpigamebet} from './spigamebetFirebase'
import {LoginAction} from '../redux/actions/authActions'
const Games = Loadable({
    loader: () => import("../GameStats/GamePageContainer"),
    loading() {
      return <Spinner />;
    },
  });
  const Leaderboard = Loadable({
    loader: () => import("../Leaderboard/LeaderPageContainer"),
    loading() {
      return <Spinner />;
    },
  });
  const Stats = Loadable({
    loader: () => import("../Stats/StatsPageContainer.js"),
    loading() {
      return <Spinner />;
    },
  });
  const Indiv = Loadable({
    loader: () => import("../Individual/IndivContainer"),
    loading() {
      return <Spinner />;
    },
  });
  const Comparsion = Loadable({
    loader: () => import("../Comparison/ComparisonPage"),
    loading() {
      return <Spinner />;
    },
  });
  const Betting = Loadable({
    loader: () => import("../betting/index"),
    loading() {
      return <Spinner />;
    },
  });

const Routes=(props)=>{
    useEffect(()=>{
      firebaseInstanceSpigamebet.auth().onAuthStateChanged(async(user)=>{
          if(user){
            const {displayName,email,uid}=user
            const userDetails={displayName,email,uid}
            await props.LoginAction(userDetails)
          }else{
            
          }
      })
    },[])
    return(
        <RoutesContainer>
            <GlobalStyle />  
              <Switch>
                <Layout>
                  <MainContainerDiv>
                    <Route exact path="/" render={() => <Redirect to="/games" />}/>
                    <Route path="/games" component={Games} />
                    <Route path="/leaderboard" component={Leaderboard} />
                    <Route path="/stats" component={Stats} />
                    <Route path="/player/:player" component={Indiv} />
                    <Route path="/team/:team" component={Indiv} />
                    <Route path="/comparison" component={Comparsion} />
                    <Route exact path="/terms-of-use" component={TermsOfUse} />
                    <Route exact path="/privacy-policy" component={PrivacyPolicy}/>
                    <Route path="/404" component={PageNotFound} />
                    <Route path='/login' component={Login}/>
                    <Route path='/betting' component={Betting}/>
                    <Footer />
                  </MainContainerDiv>
                </Layout>
              </Switch>
        </RoutesContainer>
    )
}
const mapStateToProps=(state)=>{
    console.log(state)
    return{
      userDetails:state.authReducer.userDetails
    }
}
export default compose(
    withRouter,
    connect(mapStateToProps, {LoginAction})
  )(Routes)