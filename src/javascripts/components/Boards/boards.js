import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import utilities from '../../helpers/utilities';
import boardData from '../../helpers/data/boardData';
import boardCard from '../BoardCard/boardCard';
import pinPrinter from '../Pins/pins';
import pinData from '../../helpers/data/pinData';

import './boards.scss';

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
      $('#boards').on('click', '#add-new-board', addNewBoard);
      // eslint-disable-next-line no-use-before-define
      $('#big-board-view').on('click', '.delete-pin', deletePinFromBoard);
      $('#big-board-view').on('click', '.close', () => {
        $('#big-board-view').empty();
        boardsComponent(uid);
      });
    });
};

// FUNCTION TO ADD NEW BOARD TO ARRAY FROM BOARDS.JSON

let counter = 4;

const addNewBoard = (e) => {
  e.stopImmediatePropagation();
  const { uid } = firebase.auth().currentUser;
  const newBoard = {
    id: `board${counter}`,
    imageURL: $('#board-image-url').val(),
    name: $('#board-name').val(),
    uid,
    isPrivate: true,
    boardDescription: $('#board-description').val(),
  };
  counter += 1;
  boardData.addNewBoard(newBoard)
    .then(() => {
      $('#exampleModal').modal('hide');
      // eslint-disable-next-line no-use-before-define
      boardsComponent(uid);
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
      boardsComponent(uid);
    })
    .catch((error) => console.error(error));
};

// // PRINTS MAIN BOARDS AND BIG BOARDS (hidden)
// const boardsComponent = (uid) => {
//   boardData.getBoardByUid(uid)
//     .then((boards) => {
//       let domString = '';
//       let bigBoardString = '';
//       domString += '<h1>BOARDS</h1><br><div id="big-board-view" class="d-flex flex-wrap"></div>';
//       domString += '<div id="board-container" class="d-flex flex-wrap">';
//       boards.forEach((board) => {
//         const boardName = board.name.toLowerCase();
//         domString += boardCard.createBoard(board);
//         bigBoardString += `
//             <div class="big-board-card Card text-center ${boardName}" id="bigBoard-${board.id}" style="display: none">
//                 <button class="close d-flex justify-content-end" style="color:red;">X</button>
//                 <h2>${board.name}</h2>
//                 <h3>${board.boardDescription}</h3>
//                 <div id="pinned-cards" class="d-flex flex-wrap"></div>
//                 </div>`;
//       });
//       domString += '</div>';
//       utilities.printToDom('boards', domString);
//       utilities.printToDom('big-board-view', bigBoardString);
//       // pin.makeAPin(board.id);
//     });
// };

export default { boardsComponent };
