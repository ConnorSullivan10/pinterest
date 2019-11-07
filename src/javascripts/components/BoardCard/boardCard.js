import './boardCard.scss';


const createBoard = (board) => {
  let domString = '';
  domString += `
  <div class="card col-4 boardCard" id="${board.id}">
    <img src= class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${board.name}</h5>
      <p>${board.boardDescription}
    </div>
  </div>`;
  return domString;
};

export default { createBoard };
