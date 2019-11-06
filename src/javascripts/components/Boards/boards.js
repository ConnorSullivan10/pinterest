import './boards.scss';
import utilities from '../../helpers/utilities';
import boardData from '../../helpers/data/boardData';


// const boardsComponent = () => {
//   const domString = '<h1>Boards</h1>';

//   utilities.printToDom('boards', domString);
// };

const createBoard = (uid) => {
  // const { uid } = firebase.auth().currentUser;
  boardData.getBoardByUid(uid)
    .then((boards) => {
      let domString = '';
      boards.forEach((board) => {
        if (board.UID === uid) {
          domString += `
          <div class="card col-4 boardCard" id="${board.id}">
            <img src= class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${board.name}</h5>
              <p>${board.boardDescription}
            </div>
          </div>`;
        } else {
          domString += '';
        }
        utilities.printToDom('board-container', domString);
      });
    });
};

const boardsComponent = (uid) => {
  let domString = '<h1>BOARDS</h1><br><div id="big-board-view" class="d-flex flex-wrap"></div>';
  domString += '<div id="board-container" class="d-flex flex-wrap"></div>';
  utilities.printToDom('boards', domString);
  createBoard(uid);
};


export default { boardsComponent };
