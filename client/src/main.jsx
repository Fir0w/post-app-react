import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { AuthContextProvider } from './components/AuthContextProvider';
import axios from 'axios';
import App from './App'

axios.defaults.baseURL = 'https://post-app-react-z5ki-mgdy21utf-fir0ws-projects.vercel.app';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AuthContextProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</AuthContextProvider>
	</React.StrictMode>,
);
