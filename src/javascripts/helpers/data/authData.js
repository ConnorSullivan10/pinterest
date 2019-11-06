import $ from 'jquery';
import firebase from 'firebase/app';
// ask Zoe about the difference between what these imports mean
import 'firebase/auth';
import boards from '../../components/Boards/boards';

const authDiv = $('#auth');
const boardsDiv = $('#boards');
const homeDiv = $('#home');
const logoutNavbar = $('#navbar-button-logout');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      authDiv.addClass('hide');
      homeDiv.addClass('hide');
      boardsDiv.removeClass('hide');
      logoutNavbar.removeClass('hide');
      boards.boardsComponent(user.uid);
    } else {
      authDiv.removeClass('hide');
      homeDiv.removeClass('hide');
      boardsDiv.addClass('hide');
      logoutNavbar.addClass('hide');
    }
  });
};

export default { checkLoginStatus };
