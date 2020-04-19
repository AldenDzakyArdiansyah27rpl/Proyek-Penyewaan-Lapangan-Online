import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Bar, Line, Pie } from 'react-chartjs-2';
export default class Dashboard extends Component {
    constructor() {
        super();
        this.handleUserData = this.handleUserData.bind(this);
        this.state = {
            users: [],
        };
    }
    componentDidMount() {
        this.handleUserData();
    }
    handleUserData() {
        axios
            .get('/user')
            .then((response) => {
                this.setState({ users: response.data });
                console.log(this.state);
            })
            .catch((error) => console.log(error));
    }
    render() {
        return (
            <Fragment>
                <div>
                    <div className='content-wrapper'>
                        <div className='container-fluid'  style={{marginTop:'200px', marginLeft:'170px'}} >
                            <div className='row'>
                                <div className='col-xl-3 col-sm-6 mb-3'>
                                    <div className='card text-white bg-danger o-hidden h-100'>
                                        <div className='card-body'>
                                            <div className='card-body-icon'>
                                                <i className='fa fa-fw fa-comments' />
                                            </div>
                                            <div className='mr-5'>Tabel Lapangan</div>
                                        </div>
                                        <a className='card-footer text-white clearfix small z-1' href='/lot'>
                                            <span className='float-left'>Lihat Data</span>
                                            <span className='float-right'>
                                                <i className='fa fa-angle-right' />
                                            </span>
                                        </a>
                                    </div>
                                </div>
                                <div className='col-xl-3 col-sm-6 mb-3'>
                                    <div className='card text-white bg-warning o-hidden h-100'>
                                        <div className='card-body'>
                                            <div className='card-body-icon'>
                                                <i className='fa fa-fw fa-list' />
                                            </div>
                                            <div className='mr-5'>Tabel Transaksi</div>
                                        </div>
                                        <a className='card-footer text-white clearfix small z-1' href='/transactions'>
                                            <span className='float-left'>Lihat Data</span>
                                            <span className='float-right'>
                                                <i className='fa fa-angle-right' />
                                            </span>
                                        </a>
                                    </div>
                                </div>
                                <div className='col-xl-3 col-sm-6 mb-3'>
                                    <div className='card text-white bg-primary o-hidden h-100'>
                                        <div className='card-body'>
                                            <div className='card-body-icon'>
                                                <i className='fa fa-fw fa-shopping-cart' />
                                            </div>
                                            <div className='mr-5'>Tabel Pengguna</div>
                                        </div>
                                        <a className='card-footer text-white clearfix small z-1' href='/users'>
                                            <span className='float-left'>Lihat</span>
                                            <span className='float-right'>
                                                <i className='fa fa-angle-right' />
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
