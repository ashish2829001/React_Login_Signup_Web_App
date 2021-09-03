// importing all required components
import Header from './components/header';
import Footer from './components/footer';
import Login from './components/login';
import Signup from './components/signup';
import DashBoard from './components/dashboard';

// importing element to handle routing
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
// importing state from react
import React, { useState } from 'react';

function App() {
  // styleSheet for a div
  let styleForBody = {
    backgroundColor: "",
    width: "50vw",
    height: "86vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto"
  }
  // function for calling Authenticating API
  const auth = async (token) => {
    // creating cred object
    let cred = {
      token
    };
    // stringifying cred
    let strCred = JSON.stringify(cred);
    
    try {
      // calling auth api
      let result = await fetch("http://127.0.0.1:3001/api/auth", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "validationKey": "######^&dmckjfsjkdkfj$$$"
        },
        body: strCred
      });
      result = await result.json();
      // checking status of response
      if (result.success) {
        // storing the details in local Storage
        localStorage.setItem('details', JSON.stringify(result.details));
        // changing status of isAuth to true  
        setIsAuth(true);
      }
    } catch (err) {
      // handling error in try-block
      return alert("Internal Server Error. Please visit later!");
    }
  }
  // declaring a state for isAuth with initial value as false
  const [isAuth, setIsAuth] = useState(false);
  // fetching details from localStorage
  let details = localStorage.getItem('details');
  if (details !== null) {
    // paring the json 
    let val = JSON.parse(details);
    // calling auth function when details exists
    auth(val.token);
  }
  
  // returning the whole body of webpage
  return (
    <>
      {/* implementing routing */}
      <Router>
        {
          // checking whether the user is already logged in or not
          isAuth ? 
            <>
              {/* passing setIsAuth function as props */}
              <Header titleLink="/" first="" firstLink="" second="Logout" secLink="" setIsAuth={setIsAuth} />
              <div style={styleForBody}>
                <DashBoard style={styleForBody} />
              </div>
              <Footer />
            </> 
          :
          // routing for login and signup page
            <Switch>
              {/* route for login */}
              <Route exact path="/">
                <>
                  <Header titleLink="/" first="Login" firstLink="" second="Signup" secLink="/signup" />
                  <div style={styleForBody}>
                    {/* passing setIsAuth function as props */}
                    <Login setIsAuth={setIsAuth} style={styleForBody} />
                  </div>
                  <Footer />
                </>
              </Route>
              {/* route for signup */}
              <Route exact path="/signup">
                <>
                  <Header titleLink="/signup" first="Signup" firstLink="/signup" second="Login" secLink="" />
                  <div style={styleForBody}>
                    <Signup style={styleForBody} />
                  </div>
                  <Footer />
                </>
              </Route>
            </Switch>
        }
      </Router>
    </>
  );
}
// exporting App component
export default App;