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
import AdminLandingPage from "./admin/AdminLandingPage/AdminLandingPage";
import AdminMemberPage from "./admin/AdminMember/AdminMemberPage";
import AdminBoardPage from "./admin/AdminBoard/AdminBoardPage";
import AdminMemberView from "./admin/AdminMember/AdminMemberView";
import AdminBoardView from "./admin/AdminBoard/AdminBoardView";
import Nav from "./components/views/LandingPage/Nav"
function App() {

//로그인 상태관리
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {

    if (sessionStorage.getItem('email')) {
      setIsLogin(true)
      
} 

  },[])

  return (
    
    <>

    <Router>
     {/* <Nav/> */}
      <div>
          <Switch>
             
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
        
          {/* adminpage */}
          <Route exact path="/adminLandingPage" component={AdminLandingPage} />
          <Route exact path="/adminMemberPage" component={AdminMemberPage} />
          <Route exact path="/adminBoardPage" component={AdminBoardPage} />
          <Route exact path='/memberView/:no' component={AdminMemberView} />
          <Route exact path='/adminBoardView/:no' component={AdminBoardView} />
        </Switch>
      </div>
      </Router>
     
      </> 
  );
}

export default App;
