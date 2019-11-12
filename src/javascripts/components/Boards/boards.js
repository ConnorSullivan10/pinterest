import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import utilities from '../../helpers/utilities';
import boardData from '../../helpers/data/boardData';
import boardCard from '../BoardCard/boardCard';
import pinPrinter from '../Pins/pins';
import pinData from '../../helpers/data/pinData';
import './boards.scss';


// FUNCTION TO ADD NEW BOARD TO ARRAY FROM BOARDS.JSON

const addNewBoard = (e) => {
  e.stopImmediatePropagation();
  const { uid } = firebase.auth().currentUser;
  const newBoard = {
    imageURL: $('#board-image-url').val(),
    name: $('#board-name').val(),
    uid,
    isPrivate: true,
    boardDescription: $('#board-description').val(),
  };
  boardData.addNewBoard(newBoard)
    .then(() => {
      $('#exampleModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      boardsComponent(uid);
    })
    .catch((error) => console.error(error));
};

// FUNCTION TO ADD NEW PIN TO ARRAY FROM PINS.JSON

const addNewPin = (e) => {
  e.stopImmediatePropagation();
  const assignToBoard = $('.big-board-title')[0].id;
  const newPin = {
    name: $('#pin-name').val(),
    imageURL: $('#pin-image-url').val(),
    siteURL: $('#pin-site-url').val(),
    description: $('#pin-description').val(),
    boardID: `${assignToBoard}`,
  };
  pinData.addNewPin(newPin)
    .then(() => {
      $('#examplePinModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      pinPrinter.createPinsOnBoard(assignToBoard);
    })
    .catch((error) => console.error(error));
};

// PRINTS BIG BOARD CARD BASED ON SELECTED BOARD

const printBigBoardByBoardClick = (event) => {
  const singleBoard = event.target.id;
  pinPrinter.createPinsOnBoard(singleBoard);
};

const deletePinFromBoard = (e) => {
  e.preventDefault();
  pinData.deletePin(e.target.id)
    .then(() => {
    // eslint-disable-next-line no-use-before-define
      console.log(e.target);
      pinPrinter.createPinsOnBoard(e.target.dataset.boardid);
    })
    .catch((error) => console.error(error));
};

const deleteBoardAndPins = (e) => {
  const { uid } = firebase.auth().currentUser;
  e.preventDefault();
  pinData.deletePinByBoardId(e.target.id);
  boardData.deleteBoard(e.target.id)
    .then(() => {
    // eslint-disable-next-line no-use-before-define
      console.log(e.target);
      // eslint-disable-next-line no-use-before-define
      boardsComponent(uid);
    })
    .catch((error) => console.error(error));
};

// // REASSIGNS PINS TO NEW BOARD

// const updatePinBoard = (e) => {
//   const { uid } = firebase.auth().currentUser;
//   const pinId = e.target.id.split('edit-')[1];
//   const boardId = $('#inlineFormCustomSelect3').val();
// };

// PRINTS MAIN BOARDS & EVENT LISTENER FOR BIG CARD, DELETE-PIN BUTTON,
const boardsComponent = (uid) => {
  boardData.getBoardByUid(uid)
    .then((boards) => {
      let domString = '';
      domString += '<h1>BOARDS</h1>';
      domString += `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
    Add Board
    </button>`;
      domString += '<div id="board-container" class="d-flex flex-wrap">';
      boards.forEach((board) => {
        domString += boardCard.createBoard(board);
        domString += `<button class="btn btn-danger delete-board" data-boardID="${board.id}" id="${board.id}">Remove Board</button>`;
      });
      domString += '</div>';
      utilities.printToDom('boards', domString);
      // eslint-disable-next-line no-use-before-define
      $('#boards').on('click', '.pin-button', printBigBoardByBoardClick);
      // eslint-disable-next-line no-use-before-define
      $('#boards').on('click', '.delete-board', deleteBoardAndPins);
      // eslint-disable-next-line no-use-before-define
      $(document.body).on('click', '#add-new-board', addNewBoard);
      // eslint-disable-next-line no-use-before-define
      $('#big-board-view').on('click', '.delete-pin', deletePinFromBoard);
      $(document.body).on('click', '#add-new-pin', addNewPin);
      //  $('#big-board-view').on('click', '.dropdown-item', updatePinBoard);
      $('#big-board-view').on('click', '.close', () => {
        $('#big-board-view').empty();
        boardsComponent(uid);
      });
    });
};

export default { boardsComponent };
