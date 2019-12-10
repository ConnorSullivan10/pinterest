import utilities from '../../helpers/utilities';
import './home.scss';

const homeComponent = () => {
  const domString = '<h1>Welcome to Pickterest: The Pinterest For Your Guitar Gear Addiction</h1>';

  utilities.printToDom('home', domString);
};

export default { homeComponent };
