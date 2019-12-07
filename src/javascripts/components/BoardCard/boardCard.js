import './boardCard.scss';


const createBoard = (board) => {
  let domString = '';
  domString += `
  <div class="card col-4 boardCard card-body">
      <img src="${board.imageURL}" class="card-img-top" alt="..."/>
      <h5 class="card-title">${board.name}</h5>
      <p>${board.boardDescription}</p>
      <button class="pin-button btn btn-primary" id="${board.id}">View Pins</button>
  `;
  return domString;
};

export default { createBoard };
