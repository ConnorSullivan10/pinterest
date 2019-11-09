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

const deletePin = (id) => axios.delete(`${baseUrl}/pins/${id}.json`);

export default { getPinByBoardId, deletePin };
