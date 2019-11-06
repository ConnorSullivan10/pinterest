import './boards.scss';
import utilities from '../../helpers/utilities';
import boardData from '../../helpers/data/boardData';
import boardCard from '../BoardCard/boardCard';


// const boardsComponent = () => {
//   const domString = '<h1>Boards</h1>';

//   utilities.printToDom('boards', domString);
// };


const boardsComponent = (uid) => {
  // const { uid } = firebase.auth().currentUser;
  boardData.getBoardByUid(uid)
    .then((boards) => {
      let domString = '';
      domString += '<h1>BOARDS</h1><br><div id="big-board-view" class="d-flex flex-wrap"></div>';
      domString += '<div id="board-container" class="d-flex flex-wrap">';
      boards.forEach((board) => {
        domString += boardCard.createBoard(board);
      });
      domString += '</div>';
      utilities.printToDom('boards', domString);
    });
};

export default { boardsComponent };
