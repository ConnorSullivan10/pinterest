import firebase from 'firebase';
import $ from 'jquery';
import './boards.scss';
import utilities from '../../helpers/utilities';
import boardData from '../../helpers/data/boardData';
import boardCard from '../BoardCard/boardCard';
import pinData from '../../helpers/data/pinData';

// PRINTS MAIN BOARDS & EVENT LISTENER FOR BIG CARD
const boardsComponent = (uid) => {
  boardData.getBoardByUid(uid)
    .then((boards) => {
      let domString = '';
      domString += '<h1>BOARDS</h1>';
      domString += '<div id="board-container" class="d-flex flex-wrap">';
      boards.forEach((board) => {
        domString += boardCard.createBoard(board);
      });
      domString += '</div>';
      utilities.printToDom('boards', domString);
      // eslint-disable-next-line no-use-before-define
      $('#boards').on('click', '.boardCard', printBigBoard);
    });
};

// PRINTS BIG CARD AND EVENT LISTENER FOR CLOSE BUTTON

const boardsToHide = $('#boards');

const printBigBoard = (event) => {
  const { uid } = firebase.auth().currentUser;
  const singleBoard = event.target.id;
  let bigBoardString = `<div class="big-board-title card text-center" id="${singleBoard}">
    <h2>$(singleBoard)</h2><button class="close d-flex justify-content-end" style="color:black;">X</button>
    </div>`;
  bigBoardString += '<div id="pinned-cards" class="d-flex flex-wrap">';
  pinData.getPinByBoardId(singleBoard)
    .then((pins) => {
      boardsToHide.empty();
      pins.forEach((pin) => {
        bigBoardString += `
        <div class="card col-4 pinCard" id="${pin.id}">
          <img src=${pin.imageURL} class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title" id="pin>${pin.name}</h5>
            <p>${pin.description}
          </div>
        </div>`;
      });
      bigBoardString += '</div>';
      utilities.printToDom('big-board-view', bigBoardString);
      $('#big-board-view').on('click', '.close', () => {
        $('#big-board-view').empty();
        boardsComponent(uid);
      });
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
