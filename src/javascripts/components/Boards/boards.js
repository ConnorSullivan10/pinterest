import './boards.scss';
import utilities from '../../helpers/utilities';
import boardData from '../../helpers/data/boardData';

// const boardsComponent = () => {
//   const domString = '<h1>Boards</h1>';

//   utilities.printToDom('boards', domString);
// };

const boardsComponent = () => {
  let domString = '<h1>BOARDS</h1>';
  domString += '<div id="board-container" class="d-flex flex-wrap">';
  utilities.printToDom('boards', domString);
};

const createBoard = () => {
  let domString = '';
  const boards = boardData.getBoardByUid();
  boards.forEach((board) => {
    domString += `
        <div class="card col-4 boardCard" id="${board.id}>
          <img src= class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${board.name}</h5>
            <p>${board.boardDescription}
          </div>
        </div>`;
    utilities.printToDom('board-container', domString);
  });
};

export default { boardsComponent, createBoard };
