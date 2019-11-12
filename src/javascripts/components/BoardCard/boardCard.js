import './boardCard.scss';


const createBoard = (board) => {
  let domString = '';
  domString += `
  <div class="card col-4 boardCard">
  <div class="card-body">
      <img src="${board.imageURL}" class="card-img-top" alt="..."/>
      <h5 class="card-title">${board.name}</h5>
      <p>${board.boardDescription}
      <button class="pin-button" id="${board.id}">View Pins</button>
    </div>
  </div>`;
  return domString;
};

export default { createBoard };
