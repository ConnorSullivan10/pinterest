import utilities from '../../helpers/utilities';

const homeComponent = () => {
  const domString = '<h1>PINTEREST</h1>';

  utilities.printToDom('home', domString);
};

export default { homeComponent };
