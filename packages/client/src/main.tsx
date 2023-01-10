import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './components/app/App';
import './index.css';

ReactDOM.hydrateRoot(
    document.getElementById('root') as HTMLElement,
    <StrictMode>
    	<BrowserRouter>
    		<App/>
    	</BrowserRouter>
    </StrictMode>
);
