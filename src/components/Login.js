import axios from "axios";
import React from "react";

// make a post request to retrieve a token from the api
// when you have handled the token, navigate to the BubblePage route

class Login extends React.Component {
  
  //Declare and init state
  state = {
    //initial credentials state
    credentials: {
      username: "",
      password: ""
    },
    //initial error state
    // error:  "",
  };

  //Change handler
  handleChange(event){
    //Set state
    this.setState({
        credentials: {
            ...this.state.credentials,
            [event.target.name]: event.target.value
        },
        // error: {
        //   ...this.state.error,
        // }
    })
}

  //error = "Username or Password not valid.";
  //replace with error state

  login(event){
    //Prevent default behavior
    event.preventDefault();
    //Axios post calls server
    axios.post("http://localhost:5000/api/login", this.state.credentials)
    //then it sets the token
    .then(res =>{
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("username", res.data.username);
      //localStorage.setItem("password", res.data.password);
      this.props.history.push("/protected");
    })
  }

  // if (credentials.username === "" || credentials.password === '') {
  //   setError('Username and password are required.') 
  // } else if (credentials.username !== 'Lambda' || credentials.password !== 'School'){
  //   setError('Incorrect username or password.')
  // }

  render(){
    return (
      <div>
        <h1>Welcome to the Bubble App!</h1>
        <div data-testid="loginForm" className="login-form">
          <h2>Log in to pick your color</h2>
        </div>
  
        {/* Show errors */}
        <p id="error" className="error">{this.state.error}</p>

        {/* Begin Form */}
        <form onSubmit={this.login}>
          <input
            id = "username"
            type = "text"
            name = "username"
            value = {this.state.credentials.username}
            onChange = {this.handleChange}
            placeholder = {"username"}
          />
          <input
            id = "password"
            type ="password"
            name ="password"
            value ={this.state.credentials.password}
            onChange ={this.handleChange}
            placeholder = {"password"}
          />
          <button>Login</button>
        </form>
      </div>
    );
  }
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//4. If either the username or password is not entered, display the following words with 
//the p tag provided: Username or Password not valid.
//5. If the username / password is equal to "Lambda" / "School", save that token to localStorage and redirect to a BubblePage route.
//6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password"
//7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit"
//8. MAKE SURE YOUR ERROR p tag contains the id="error"