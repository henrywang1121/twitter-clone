import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {configureStore} from '../store';
import {BrowserRouter as Router} from 'react-router-dom';
import Navbar from './Navbar'
import Main from './Main';
import { setAuthorizationToken } from '../store/actions/auth';
import {setAuthorizationToken, setCurrentUser} from '../store/actions/auth';
import jwtDecode from 'jwt-decode';

const store = configureStore();

if(localStorage.jwtToken){
  setAuthorizationToken(localStorage.jwtToken);

  //Prevent malicious attempt to modify the jwt key
  try{
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  } catch(e){
    //Force user to logout
    store.dispatch(setCurrentUser({}));
  }
}

const App = () => (
  <Provider store={store}>
    <Router>
      <div className='onboarding'>
        <Navbar />
        <Main />
      </div>
    </Router>
  </Provider>
)

export default App;
