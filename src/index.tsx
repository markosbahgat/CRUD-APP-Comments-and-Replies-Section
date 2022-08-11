import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './services/store/store';
import { Provider } from 'react-redux';
import '@fortawesome/fontawesome-free/css/all.css';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
