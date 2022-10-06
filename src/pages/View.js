import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const View = () => {
	const [user, setUser] = useState(null);

	const { id } = useParams();

	useEffect(() => {
		if (id) {
			getSingleUser(id);
		}
	}, [id]);

	const getSingleUser = async (id) => {
		const response = await axios.get(`https://crud-ern.herokuapp.com/user/${id}`);
		if (response.status === 200) {
			setUser({ ...response.data[0] });
		}
	};

	return (
		<div style={{ marginTop: '150px' }}>
			<div className='card'>
				<div className='card-header'>
					<p>User Conatct Details</p>
				</div>
				<div className='container'>
					<strong>ID: </strong>
					<span>{id} </span>
					<hr />
					<br />

					<strong>Name: </strong>
					<span>{user && user.name} </span>
					<hr />
					<br />

					<strong>Email: </strong>
					<span>{user && user.email} </span>
					<hr />
					<br />

					<strong>Contact Number: </strong>
					<span>{user && user.contact} </span>
					<hr />
					<br />
					<Link to='/'>
						<button className='btn btn-edit'>Back</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default View;
