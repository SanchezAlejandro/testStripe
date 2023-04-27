import React from 'react';
// import ReactDOM from 'react-dom'; // For React 17
import { createRoot } from 'react-dom/client'; // For React 18
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/styles.scss';
import App from './App/App';
import { ThemeContextProvider } from './contexts/themeContext';
import './i18n';

const children = (
	<Router>
		<React.StrictMode>
			<ThemeContextProvider>
				<App />
			</ThemeContextProvider>
		</React.StrictMode>
	</Router>
);

const container = document.getElementById('root');

// ReactDOM.render(children, container); // For React 17
createRoot(container).render(children); // For React 18
