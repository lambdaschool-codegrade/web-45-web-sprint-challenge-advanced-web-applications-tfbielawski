import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from "./components/BubblePage";
import axiosWithAuth from "./helpers/axiosWithAuth";
import Login from "./components/Login";
import "./styles.scss";

//
function App() {
  //
  const logout = () => {
    console.log("LOGOUT");
    //
    axiosWithAuth()
      .post("/api/logout")
      .then(res => {
        localStorage.removeItem("token");
        localStorage.removeItem("role", res.data.role);
        localStorage.removeItem("username", res.data.username);
        window.location.href = "LogIn";
      })

      .catch(err =>{
        console.log(err)
      })

  }
  
  
 
  return (
    <Router>
      {/* <PrivateRoute exact path='/protected' component={BubblePage} /> */}
      <Route exact path = "/login" component = {Login}/>
      <Route exact path = "/" component = {Login}/>
      
      <div className="App">
        <header>
          Color Picker Sprint Challenge
          <a onClick = {logout} data-testid="logoutButton" href="#">logout</a>
        </header>
      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Add in two routes that link to the Login Component, one for the default path '/' and one for the '/login'.
//2. Render BubblePage as a PrivateRoute
//2. Build the logout button to call the logout endpoint, remove the localStorage Item and redirect to the login page.