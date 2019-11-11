import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPinByBoardId = (boardID) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="boardID"&equalTo="${boardID}"`)
    .then((response) => {
      const demPins = response.data;
      const pins = [];
      Object.keys(demPins).forEach((fbId) => {
        demPins[fbId].id = fbId;
        pins.push(demPins[fbId]);
      });
      resolve(pins);// Hard code to return pins
    })
    .catch((error) => reject(error));
});

const addNewPin = (newPin) => axios.post(`${baseUrl}/pins.json`, newPin);

const deletePin = (id) => axios.delete(`${baseUrl}/pins/${id}.json`);

const deletePinByBoardId = (boardID) => {
  getPinByBoardId(boardID)
    .then((pins) => {
      pins.forEach((pin) => {
        deletePin(pin.id);
      });
    });
};

export default {
  getPinByBoardId,
  addNewPin,
  deletePin,
  deletePinByBoardId,
};
