import './boards.scss';
// import utilities from '../../helpers/utilities';

// const boardsComponent = () => {
//   const domString = '<h1>Boards</h1>';

//   utilities.printToDom('boards', domString);
// };


const boardsComponent = (board) => {
  let domString = '<h1>BOARDS</h1>';
  domString += `
      <div class="card col-4 pinCard" id="${board.id}>
        <img src= class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${board.name}</h5>
          <p>${board.boardDescription}
        </div>
      </div>`;
  return domString;
};

export default { boardsComponent };
