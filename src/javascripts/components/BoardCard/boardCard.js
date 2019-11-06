import boardData from '../../helpers/data/boardData';

const createBoard = (uid) => {
  // const { uid } = firebase.auth().currentUser;
  boardData.getBoardByUid(uid)
    .then((boards) => {
      let domString = '';
      boards.forEach((board) => {
        if (board.uid === uid) {
          domString += `
          <div class="card col-4 boardCard" id="${board.id}">
            <img src= class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${board.name}</h5>
              <p>${board.boardDescription}
            </div>
          </div>`;
        } else {
          domString += '';
        }
        return domString;
      });
    });
};

export default { createBoard };
