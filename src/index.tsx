import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './features/store';
import {Provider} from "react-redux";
import {BrowserRouter, HashRouter} from "react-router-dom";


// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
	<Provider store={store}>
		<HashRouter>
			<App/>
		</HashRouter>
	</Provider>
)



reportWebVitals();
