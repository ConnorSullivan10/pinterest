import firebase from 'firebase';

import auth from './components/Auth/auth';
import authData from './helpers/data/authData';
import myNavbar from './components/MyNavbar/myNavbar';
import home from './components/Home/home';
import boards from './components/Boards/boards';
import singleBoard from './components/SingleBoard/singleBoard';


import apiKeys from './helpers/apiKeys.json';

import '../styles/main.scss';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  authData.checkLoginStatus();
  auth.loginButton();
  myNavbar.logoutEvent();
  home.homeComponent();
  boards.boardsComponent();
  singleBoard.clickToPrintBigBoard();
  singleBoard.closeBigBoard();
};

init();
