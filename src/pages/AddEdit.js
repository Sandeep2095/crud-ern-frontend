import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
	name: '',
	email: '',
	contact: '',
};

const AddEdit = () => {
	const [state, setState] = useState(initialState);
	const { name, email, contact } = state;

	const history = useNavigate();

	const { id } = useParams();

	useEffect(() => {
		if (id) {
			getSingleUser(id);
		}
	}, [id]);

	const getSingleUser = async (id) => {
		const response = await axios.get(`https://crud-ern.herokuapp.com/user/${id}`);
		if (response.status === 200) {
			setState({ ...response.data[0] });
		}
	};

	const addUser = async (data) => {
		const response = await axios.post(
			'https://crud-ern.herokuapp.com/user',
			data
		);
		if (response.status === 200) {
			toast.success(response.data);
		}
	};

	const updateUser = async (data, id) => {
		const response = await axios.put(
			`https://crud-ern.herokuapp.com/user/${id}`,
			data
		);
		if (response.status === 200) {
			toast.success(response.data);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!name || !email || !contact) {
			toast.error('Please provide value into each input field');
		} else {
			if (!id) {
				addUser(state);
			} else {
				updateUser(state, id);
			}
			setTimeout(() => history.push('/'), 500);
		}
	};

	const handleInputChange = (e) => {
		let { name, value } = e.target;
		setState({ ...state, [name]: value });
	};

	return (
		<div style={{ marginTop: '100px' }}>
			<form
				style={{
					margin: 'auto',
					padding: '15px',
					maxWidth: '400px',
					alignContent: 'center',
				}}
				onSubmit={handleSubmit}
			>
				<label htmlFor='name'>Name</label>
				<input
					type='text'
					id='name'
					name='name'
					placeholder='Enter Name..'
					onChange={handleInputChange}
					value={name}
				/>

				<label htmlFor='email'>Email</label>
				<input
					type='email'
					id='email'
					name='email'
					placeholder='Email ID'
					onChange={handleInputChange}
					value={email}
				/>

				<label htmlFor='contact'>Contact</label>
				<input
					type='integer'
					id='contact'
					name='contact'
					placeholder='Enter Contact number..'
					onChange={handleInputChange}
					value={contact}
				/>
				<input type='submit' value={id ? 'Update' : 'Add'} />
			</form>
		</div>
	);
};

export default AddEdit;
