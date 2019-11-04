import './pins.scss';
import pinData from '../../helpers/data/pinData';

const makeAPin = () => {
  let domString = '';
  const pins = pinData.getPinByBoardId();
  pins.forEach((pin) => {
    domString += `
    <div class="card col-4 pinCard" id="${pin.id}>
      <img src=${pin.imageURL} class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${pin.name}</h5>
        <p>${pin.description}
      </div>
    </div>`;
    return domString;
  });
};

export default { makeAPin };
