import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import './AddVehicles.css';
import ButtonLightSuccess from '../Shared/ButtonLightSuccess/index';
import axios from 'axios';
import { connect } from 'react-redux';
import Drawer from '../Shared/Drawer/index';
import AddVehicleDetailPopup from './AddVehiclePopup/index';



class AddVehicleDetail extends Component {
    componentWillMount() {
        const vm = this;
        this.props.onCurrentComponent('AddVehicleDetail.json');
        axios.get('/assets/json/AddVehicleDetail.json')
            .then((response) => {
                vm.props.onFetchLanguage(response.data[this.props.CurrentLanguage]);
            }, (error) => {
              
            })
    }
    handleClickAddVehicle() {
        this.props.onAddVehicleDetailForm();
        this.props.onAddVehicleDetailCounter(this.props.AddVehicleDetailCounter ? this.props.AddVehicleDetailCounter++ : 0);
    }
    render() {
        return (
            <MuiThemeProvider>
                <div className='addVehicle'>
                    <Container fluid={true}>
                        <Row>
                            <Col md={2} className='mui--hidden-xs'>
                                <div className='mui--hidden-xs mui--hidden-sm'><Drawer variant="permanent" /></div>
                            </Col>
                            <Col md={8}>
                            {this.props.onAddVehicleDetailForm && <AddVehicleDetailPopup />}
                                <div className="AddVehicleDetails">
                                    <div className='YourVehicles'>{this.props.FetchedLanguage ? this.props.FetchedLanguage.AddVehicleDetailYourVehicles : ''}</div>
                                    <img src="assets/AddVehicleDetail/AddVehicleDetail.svg" className='AddVehicleDetailsPic' alt='AddVehicleDetails' />
                                    <div className='NoVehicles'>{this.props.FetchedLanguage ? this.props.FetchedLanguage.AddVehicleDetailNoVehicles : ''}</div>
                                    <div className='AddVehiclesYet'>{this.props.FetchedLanguage ? this.props.FetchedLanguage.AddVehicleDetailAddVehiclesYet : ''}</div>
                                    <div className='AddVehiclesButton'><ButtonLightSuccess onClick={this.handleClickAddVehicle.bind(this)} Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.AddVehicleDetailAddVehiclesButtonText : ''}></ButtonLightSuccess></div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </MuiThemeProvider>
        )
    }
}

const mapStateToProps = state => ({
    CurrentLanguage: state.language.current_language,
    FetchedLanguage: state.language.lang_data,
    AddVehicleDetailForm: state.AddVehicleDetail.add_vehicle_detail_form_open,
    AddVehicleDetailCounter: state.AddVehicleDetail.add_vehicle_counter,

});

const mapDispatchToProps = dispatch => ({
    onCurrentComponent: (fileName) => dispatch({ type: 'CurrentComponent', fileName }),
    onFetchLanguage: (language) => dispatch({ type: 'FetchLanguage', language }),
    onCurrentLanguage: () => dispatch({ type: 'CurrentLanguage' }),
    onAddVehicleDetailCounter: (value) => dispatch({ type: 'ADDVEHICLECOUNTER', value }),
    onAddVehicleDetailForm: (value) => dispatch({ type: 'AddVehicleDetailForm_SHOW', value }),

});

export default connect(mapStateToProps, mapDispatchToProps)(AddVehicleDetail);