import React from 'react';
import ReactDOM from 'react-dom/client';
import { Main } from './view-components/main';
import './style.scss';
import 'rc-slider/assets/index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
	ReactDOM.createRoot(rootElement).render(
		<React.StrictMode>
			<Main />
		</React.StrictMode>
	);
}

