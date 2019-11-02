import utilities from '../../helpers/utilities';

const boardsComponent = () => {
  const domString = '<h1>Boards</h1>';

  utilities.printToDom('boards', domString);
};

export default { boardsComponent };
