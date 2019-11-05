import './pins.scss';
import utilities from '../../helpers/utilities';
import pinData from '../../helpers/data/pinData';

const makeAPin = (boardID) => {
  const pins = pinData.getPinByBoardId(boardID);
  let domString = '';
  pins.forEach((pin) => {
    if (boardID === pin.boardID) {
      domString += `
    <div class="card col-4 pinCard" id="${pin.id}>
      <img src=${pin.imageURL} class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${pin.name}</h5>
        <p>${pin.description}
      </div>
    </div>`;
    } else {
      domString += '';
    }
  });
  utilities.printToDom('pinned-cards', domString);
};

export default { makeAPin };
