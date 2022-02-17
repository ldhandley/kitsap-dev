import ReactDOM from 'react-dom';
import {SimpleComponent} from '../src/index';

const x: number = 5; // <-- NEW

const Welcome = () => {
  return <SimpleComponent/>;
};

const mountingNode = document.querySelector("#root");

ReactDOM.render(<Welcome />, mountingNode);
