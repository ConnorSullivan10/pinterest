import './boards.scss';
import utilities from '../../helpers/utilities';
import boardData from '../../helpers/data/boardData';
import boardCard from '../BoardCard/boardCard';
import pin from '../Pins/pins';

// PRINTS MAIN BOARDS
const boardsComponent = (uid) => {
  boardData.getBoardByUid(uid)
    .then((boards) => {
      let domString = '';
      domString += '<h1>BOARDS</h1>';
      domString += '<div id="big-board-view" class="d-flex flex-wrap"></div>';
      domString += '<div id="board-container" class="d-flex flex-wrap">';
      boards.forEach((board) => {
        domString += boardCard.createBoard(board);
      });
      domString += '</div>';
      utilities.printToDom('boards', domString);
    });
};

// Attempt to print boards and single big card div on click

const clickToPrintBigBoard = () => {
  $('.boardCard').on('click', (event) => {
    const singleBoard = event.target.id;
    let bigBoardString = '';
    boards.forEach((board) => {
      const boardName = board.name.toLowerCase();
      if (singleBoard === `${board.id}`) {
        bigBoardString += `
      <div class="big-board-card Card text-center ${boardName}" id="bigBoard-${board.id}">
         <button class="close d-flex justify-content-end" style="color:red;">X</button>
         <h2>${board.name}</h2>
         <h3>${board.boardDescription}</h3>
         <div id="pinned-cards" class="d-flex flex-wrap"></div>'
     </div>`;
        utilities.printToDom('big-board-view', bigBoardString);
        pin.makeAPin(board.id);
      }
    });
    utilities.printToDom('board-container', '');
  });
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

export default { boardsComponent, clickToPrintBigBoard };
