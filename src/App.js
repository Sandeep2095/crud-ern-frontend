import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import AddEdit from './pages/AddEdit';
import About from './pages/About';
import View from './pages/View';
import './App.css';
import Header from './components/Header';

function App() {
	return (
		<BrowserRouter>
			<div className='app'>
				<Header />
				<ToastContainer position='bottom-right' />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/add' element={<AddEdit />} />
					<Route path='/update/:id' element={<AddEdit />} />
					<Route path='/view/:id' element={<View />} />
					<Route path='/about' element={<About />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
