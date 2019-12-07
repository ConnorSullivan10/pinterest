import './pins.scss';
import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import utilities from '../../helpers/utilities';
import pinData from '../../helpers/data/pinData';
import boardData from '../../helpers/data/boardData';

const boardsToHide = $('#boards');

const buildDropdownSelection = () => new Promise((resolve, reject) => {
  const { uid } = firebase.auth().currentUser;
  let bigBoardString = '';
  boardData.getBoardByUid(uid)
    .then((boards) => {
      boards.forEach((board) => {
        bigBoardString += `<a class="dropdown-item" href="#" id="${board.id}">${board.name}</a>`;
      });
      resolve(bigBoardString);
    })
    .catch((error) => reject(error));
});

const createPinsOnBoard = (singleBoard) => {
  let boardSelections = '';
  buildDropdownSelection()
    .then((resolve) => {
      boardSelections = resolve;
    });
  let bigBoardString = `
  <div class="big-board-title card text-center" id="${singleBoard}">
  <h2>${singleBoard}</h2>
  </div>
  <button class="close d-flex justify-content-end" style="color:black;">X</button>
  <div class="text-center"><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#examplePinModal">
  Add Pin
  </button></div>
  `;
  bigBoardString += '<div id="pinned-cards" class="d-flex flex-wrap">';
  return pinData.getPinByBoardId(singleBoard)
    .then((pins) => {
      console.log(pins);
      boardsToHide.empty();
      pins.forEach((pin) => {
        bigBoardString += `
        <div class="card col-4 pinCard card-body"  id="${pin.id}">
        <img src="${pin.imageURL}" class="card-img-top" alt="..."/>
        <h5 class="card-title" id="pin">${pin.name}</h5>
        <p>${pin.description}</p>
        <a href="#${pin.siteURL}" class="btn btn-info" role="button">Link</a>
        <button class="btn btn-danger delete-pin" data-boardID="${pin.boardID}" id="${pin.id}">Remove Pin</button>
        <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" data-boardID="${pin.boardID} type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Change Board
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" data-boardid="${pin.boardID}" id="dropdownMenuButton-${pin.id}">
        ${boardSelections}</div></div></div>
        `;
      });
      bigBoardString += '</div>';
      utilities.printToDom('big-board-view', bigBoardString);
    })
    .catch((error) => console.error(error));
};

export default { createPinsOnBoard };
