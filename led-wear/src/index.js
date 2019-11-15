import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
/*ReactDOM.render(, document.getElementById('main'));
ReactDOM.render(, document.getElementById('settings'));
ReactDOM.render(, document.getElementById('footer'));
*/

registerServiceWorker.unregister();