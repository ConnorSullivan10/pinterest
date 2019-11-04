import './pins.scss';

const makeAPin = (pin) => {
  const domString = `
    <div class="card col-4 pinCard" id="${pin.id}>
      <img src=${pin.imageURL} class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${pin.name}</h5>
        <p>${pin.description}
      </div>
    </div>`;
  return domString;
};

export default { makeAPin };
