import React, { Component, Fragment } from 'react';
import axios from 'axios';
import PayModal from '../components/PayModal'
export default class BookedLot extends Component {
    constructor() {
        super();
        this.handleBookedLot = this.handleBookedLot.bind(this);
        this.handleModalStatus = this.handleModalStatus.bind(this)
        this.state = {
            _id: '',
            userId: '',
            activeLot: [],
            total: 0,
            status: '',
            startedTime: '',
            endedTime: '',
            image: '',
            modalStatus: false
        };
    }

    handleModalStatus() {
        this.setState({ modalStatus: !this.state.modalStatus })
    }

    componentDidMount() {
        this.handleBookedLot();
    }

    handleBookedLot() {
        let _id = localStorage.getItem('_id');
        if (_id) {
            _id = JSON.parse(_id);
            axios
                .get('/rent/user/' + _id)
                .then((res) => {
                    let response = res.data
                    this.setState({
                        _id: response._id,
                        userId: response.userId,
                        activeLot: response.rentedLot,
                        total: response.total,
                        status: response.status,
                        startedTime: response.startedTime,
                        endedTime: response.endedTime,
                        image: response.image
                    });
                })
                .catch((err) => console.log(err));
        } else {
            alert('Silahkan Sewa Lapangan Baru');
        }
    }

    render() {
        return (
            <Fragment>
                {this.state.activeLot.map((data) => {
                    return (
                        <div key={data._id} className='container-fluid' style={{ marginTop: "15px" }}>
                            <div className='row'>
                                <div className='col-md-4'>
                                    <div className="row">
                                        <img
                                            src={`${process.env.PUBLIC_URL}/uploads/lots/${data.image}`}
                                            alt={this.state.userId}
                                            style={{ height: "200px" }}
                                        />
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='row'>
                                        <div className='col-md-12'>
                                            <div className='row'>
                                                <div className='col-md-6'>Judul</div>
                                                <div className='col-md-6'>{data.title}</div>
                                                <div className='col-md-6'>Lokasi</div>
                                                <div className='col-md-6'>{data.location}</div>
                                                <div className='col-md-6'>Harga</div>
                                                <div className='col-md-6'>{data.price}</div>
                                                <div className='col-md-6'>Durasi</div>
                                                <div className='col-md-6'>{data.duration}</div>
                                                <div className='col-md-6'>Status</div>
                                                <div className='col-md-6'>{this.state.status}</div>
                                                <div className='col-md-6'>Dimulai dari</div>
                                                <div className='col-md-6'>{this.state.startedTime}</div>
                                                <div className='col-md-6'>Sampai</div>
                                                <div className='col-md-6'>{this.state.endedTime}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 d-flex justify-content-center text-center">
                                    <div className="row">
                                        <div className="col-md-6">
                                            Total
                                        </div>
                                        <div className="col-md-6">
                                            {this.state.total}
                                        </div>
                                        <div className="col-md-12">
                                            <button className="btn btn-sm btn-outline-success btn-block" onClick={this.handleModalStatus} disabled={this.state.image}>Bayar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    {this.state.activeLot.map(hehe => {
                                        return (
                                            <span key={hehe._id}>{hehe.description}</span>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
                <PayModal modalStatus={this.state.modalStatus} handleModalStatus={this.handleModalStatus} _id={this.state._id} />
            </Fragment>
        );
    }
}
