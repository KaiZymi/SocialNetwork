import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import reportWebVitals from './app/reportWebVitals';
import {Provider} from "react-redux";
import {HashRouter} from "react-router-dom";
import {store} from "./app/store";


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
