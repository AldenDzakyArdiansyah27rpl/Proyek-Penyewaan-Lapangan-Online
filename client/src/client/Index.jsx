import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import Picture1 from '../res/basket.jpg';
import Picture2 from '../res/tenis.jpg';
import Picture3 from '../res/bola.jpg';
import lokasi from '../res/lokasi.png';
import tugas from '../res/tugas.png';
import jam from '../res/24 jam.png'
import {FiHome} from 'react-icons/fi';
export default class Index extends Component {
	constructor() {
		super();
		this.state = {
			lots: [],
			userId: ''
		};
	}
	componentDidMount() {
		this.handleLotData();
		console.log(this.state);
	}
	handleLotData() {
		axios
			.get('/lot')
			.then((lot) => {
				this.setState({ lots: lot.data });
			})
			.catch((err) => console.log(err));
	}
	handleRentClick(data) {
		window.location.assign('/selected-lot');
		if (localStorage.getItem('Lapangan dipilih')) {
			alert('Kamu Hanya bisa memilih satu lapngan saja');
		} else {
			localStorage.setItem('Selected Lot', JSON.stringify(data));
		}
	}
	render() {
		return (
			<Fragment>
				<nav style={{ height: '100px' }} className='navbar navbar-expand-md navbar-dark bg-dark'>
					<a className='navbar-brand' href='/'>
						<FiHome />
					</a>
					<div className='collapse navbar-collapse' id='collapsibleNavId'>
						<ul className='navbar-nav mr-auto mt-2 mt-lg-0'>
							<li className='nav-item'>
								<form className='form-inline my-2 my-lg-0'>
									<input
										style={{ width: '900px' }}
										type='text'
										className='form-control border-right-0'
										placeholder='Search..'
										aria-label='Search..'
										aria-describedby='basic-addon2'
									/>
									<div className='input-group-append'>
										<button className='btn btn-outline-light border-left-0' type='button'>
											Search
										</button>
									</div>
								</form>
							</li>
						</ul>
					</div>
				</nav>

				<Carousel>
					<Carousel.Item>
						<img style={{ height: '450px' }} className='d-block w-100' src={Picture1} alt='First slide' />
						<Carousel.Caption>
							
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<img style={{ height: '450px' }} className='d-block w-100' src={Picture2} alt='Third slide' />

						<Carousel.Caption>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<img style={{ height: '450px' }} className='d-block w-100' src={Picture3} alt='Third slide' />

						<Carousel.Caption>
						</Carousel.Caption>
					</Carousel.Item>
				</Carousel>
				<div className='container' style={{ marginTop: '100px', marginBottom: '100px' }}>
					<div className='row'>
						<div className='col text-center'>
						<img src={jam} style={{height:'100px'}} />
							<h4 style={{marginTop:'20px'}}>Layanan 24 Jam</h4>
							<p>Kami selalu siap sedia 24 jam</p>
						</div>
						<div className='col text-center'>
						<img src={tugas} style={{height:'100px'}} />
							<h4 style={{marginTop:'20px'}}>Tugas Kami</h4>
							<p>Tugas kami membantu anda untuk menyewa lapangan</p>
						</div>
						<div className='col text-center'>
							<img src={lokasi} style={{height:'100px'}} />
							<h4 style={{marginTop:'20px'}}>Kantor Kami</h4>
							<p>Di Jl.Tak Terarah No.29, Surabaya</p>
						</div>
					</div>
				</div>
				<div className='row'>
					{this.state.lots.map((lot) => {
						return (
							<div className='col-md-3'>
								<div className='card text-left'>
									<img className='card-img-top' src={`${process.env.PUBLIC_URL}/uploads/lots/${lot.image}`} alt='kwkwkw' />
									<div className='card-body'>
										<h4 className='card-title'>{lot.title}</h4>
										<p className='card-text'>Lokasi: {lot.location}</p>
										<p className='card-text'>Contact: {lot.contact}</p>
										<p className='card-text'>
											Status:{' '}
											{lot.status === 'Tersedia' ? (
												<span className='text-success'>{lot.status}</span>
											) : (
												<span className='text-danger'>{lot.status}</span>
											)}{' '}
										</p>
										<button
											onClick={() => this.handleRentClick(lot)}
											className='btn btn-outline-primary btn-block'
											disabled={lot.status === 'Tidak Tersedia'}
										>
											Sewa
										</button>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</Fragment>
		);
	}
}
