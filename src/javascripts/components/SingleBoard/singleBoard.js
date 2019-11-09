// import './singleBoard.scss';
// import $ from 'jquery';
// import utilities from '../../helpers/utilities';
// import boardPrinter from '../Boards/boards';
// import pinPrinter from '../Pins/pins';
// import boardData from '../../helpers/data/boardData';


// const bigBoard = (singleBoard) => {
//   const boards = boardData.getBoardByUid();
//   let bigBoardString = '';
//   boards.forEach((board) => {
//     const boardName = board.name.toLowerCase();
//     if (singleBoard === `${board.id}`) {
//       bigBoardString += `
//       <div class="big-board-card Card text-center ${boardName}" id="bigBoard-${board.id}">
//          <button class="close d-flex justify-content-end" style="color:red;">X</button>
//          <h2>${board.name}</h2>
//          <h3>${board.boardDescription}</h3>
//          <div id="pinned-cards" class="d-flex flex-wrap"></div>'
//      </div>`;
//       utilities.printToDom('big-board-view', bigBoardString);
//       pinPrinter.makeAPin(board.id);
//     }
//   });
// };

// const clickToPrintBigBoard = () => {
//   $('.boardCard').on('click', (event) => {
//     const singleBoard = event.target.id;
//     bigBoard(singleBoard);
//     utilities.printToDom('board-container', '');
//   });
// };

// const closeBigBoard = () => {
//   $('body').on('click', '.close', () => {
//     utilities.printToDom('big-board-view', '');
//     boardPrinter.boardsComponent();
//     boardPrinter.createBoard();
//     clickToPrintBigBoard();
//   });
// };

// export default { clickToPrintBigBoard, closeBigBoard };
