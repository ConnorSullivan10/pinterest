import './pins.scss';
import $ from 'jquery';
import utilities from '../../helpers/utilities';
import pinData from '../../helpers/data/pinData';

const boardsToHide = $('#boards');

const createPinsOnBoard = (singleBoard) => {
  let bigBoardString = `<div class="big-board-title card text-center" id="${singleBoard}">
      <h2>${singleBoard}</h2><button class="close d-flex justify-content-end" style="color:black;">X</button>
      </div>`;
  bigBoardString += '<div id="pinned-cards" class="d-flex flex-wrap">';
  pinData.getPinByBoardId(singleBoard)
    .then((pins) => {
      boardsToHide.empty();
      pins.forEach((pin) => {
        bigBoardString += `
          <div class="card col-4 pinCard card-body"  id="${pin.id}">
            <img src="${pin.imageURL}" class="card-img-top" alt="..."/>
            <h5 class="card-title" id="pin">${pin.name}</h5>
            <p>${pin.description}</p>
            <button class="btn btn-danger delete-pin" data-boardID="${pin.boardID}" id="${pin.id}">Remove Pin</button>
          </div>`;
      });
      bigBoardString += '</div>';
      utilities.printToDom('big-board-view', bigBoardString);
    })
    .catch((error) => console.error(error));
};


export default { createPinsOnBoard };
