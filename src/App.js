import React, { useEffect, useState }from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import FindIdPage from "./components/views/LoginPage/FindIdPage";
import FindPasswordPage from "./components/views/LoginPage/FindPasswordPage";
import ChangePasswordPage from "./components/views/LoginPage/ChangePasswordPage";
import BoardMainPage from "./components/boardPage/BoardMainPage";
import BoardInsertPage from "./components/boardPage/BoardInsertPage";
import PostView from "./components/boardPage/PostView";
import BoardUpdate from "./components/boardPage/BoardUpdate";
function App() {

//로그인 상태관리
  const [isLogin, setIsLogin] = useState(false);


  useEffect(() => {
   
    if (sessionStorage.getItem('email')) {
  setIsLogin(true)
}

  },[])

  return (
    <Router>
      <div>
        <Switch>
          {/* {isLogin ? <Route exact path="/main" render={() => <LandingPage isLogin={isLogin}/>} />: <Route exact path="/login" component={LoginPage} />} */}
         <Route exact path="/" render={()=><LandingPage isLogin={isLogin}/>} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/id" component={FindIdPage} />
          <Route exact path="/pass" component={FindPasswordPage} />
          <Route exact path="/changepass" component={ChangePasswordPage} />
          <Route exact path="/boardmain" component={BoardMainPage} />
          <Route exact path='/postView/:no' component={PostView} />
          <Route exact path="/boardInsert" component={BoardInsertPage} />
          <Route exact path='/boardUpdate/:no' component={BoardUpdate} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
