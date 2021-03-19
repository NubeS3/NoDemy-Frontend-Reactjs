import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './configs/store.config';

import './styles/index.scss';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
