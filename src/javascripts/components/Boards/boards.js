import './boards.scss';
import utilities from '../../helpers/utilities';
import boardCard from '../BoardCard/boardCard';


// const boardsComponent = () => {
//   const domString = '<h1>Boards</h1>';

//   utilities.printToDom('boards', domString);
// };


const boardsComponent = (uid) => {
  let domString = '<h1>BOARDS</h1><br><div id="big-board-view" class="d-flex flex-wrap"></div>';
  domString += '<div id="board-container" class="d-flex flex-wrap"></div>';
  boardCard.createBoard(uid);
  utilities.printToDom('boards', domString);
};


export default { boardsComponent };
