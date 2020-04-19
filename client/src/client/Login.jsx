import React, { Component, Fragment } from 'react';
import axios from 'axios';
import BackgroundImage from '../res/Witching.jpg';
import { AiOutlineUser } from "react-icons/ai";
import logo from '../res/login.png'
import { Link } from 'react-router-dom';
export default class Login extends Component {
	constructor() {
		super();
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.state = {
			username: '',
			password: ''
		};
	}

	handleInputChange(e) {
		this.setState({ [e.target.name]: e.target.value });
		console.log(this.state);
	}

	handleFormSubmit(e) {
		e.preventDefault();
		axios
			.post('/login', {
				username: this.state.username,
				password: this.state.password
			})
			.then((res) => {
				console.log(res.data);
				if (res.data) {
					localStorage.setItem('_id', JSON.stringify(res.data._id));
					localStorage.setItem('Role', JSON.stringify(res.data.role));
					localStorage.setItem('Image', JSON.stringify(res.data.image));
					if (res.data.role === "User") {
						window.location.assign('/')
					} else if (res.data.role === "Admin") {
						window.location.assign('/dashboard')
					}
				} else {
					alert('Username atau Password Salah');
				}
			})
			.catch((err) => console.log(err));
	}
	render() {
		return (
			<Fragment>
				<div style={{background:'white', height:'750px', transform:'blur(5px)'}}>
					<div className='my-auto col col-md-12 d-flex justify-content-center text-dark'>
						<div style={{ marginTop: '150px' }} className='col col-md-3'>
							<center>
							<img className='img' src={logo} alt='logo' style={{ height:'110px'}} />
							</center>
							<form onSubmit={this.handleFormSubmit}>
								<div className='form-group'>
									<label htmlFor='username'>Username</label>
									<input
										value={this.state.username}
										onChange={this.handleInputChange}
										type='text'
										name='username'
										id='username'
										className='form-control'
										aria-describedby='helpId'
										placeholder= 'Username'
										required
									/>
								</div>
								<div className='form-group'>
									<label htmlFor='password'>Password</label>
									<input
										value={this.state.password}
										onChange={this.handleInputChange}
										type='password'
										name='password'
										id='password'
										className='form-control'
										aria-describedby='helpId'
										placeholder='password'
										required
									/>
								</div>
								<div className='form-group'>
									<button type='submit' className='btn btn-outline-success btn-block'>
										Masuk
									</button>
								</div>
							</form>
						</div>
					</div>
					<div className='text-center'>
						<Link className='text-primary' to='/register'>
							Daftar
						</Link>
					</div>
				</div>
			</Fragment>
		);
	}
}
