import './index.css'
import '../node_modules/toastr/build/toastr.min.css';
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App';
import { Provider } from 'react-redux'
import configureStore from './redux/store/configureStore'
import { loadCourses } from './redux/actions/courseActions'
import { loadAuthors } from './redux/actions/authorActions';
import { loadDevices } from './redux/actions/deviceActions';


const store = configureStore();
store.dispatch(loadCourses());
store.dispatch(loadAuthors());
store.dispatch(loadDevices());

render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));
