import React, { Component } from 'react';
import './AddedVehicles.css';
import { MuiThemeProvider } from '@material-ui/core';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import ButtonLightSuccess from '../../Shared/ButtonLightSuccess/index';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import { connect } from 'react-redux';
import Drawer from '../../Shared/Drawer/index';
import AddVehicleDetailPopup from '../AddVehiclePopup/index';




const styles = {
    card: {
        borderRadius: ' 6px',
        boxShadow: ' 0 2px 4px 0 rgba(0, 0, 0, 0.5)',
        backgroundColor: ' #ffffff',
        margin: '2rem 0rem',
        paddingBottom: '0rem'
    },
    Content: {
        paddingLeft: '0px',
        paddingRight: '0px',
    }
};


class AddedVehicles extends Component {
    constructor(props) {
        super();
        this.state = {
            anchorEl: null,
        };
    }
    componentWillMount() {
        const vm = this;
        this.props.onCurrentComponent('AddedVehicleDetails.json');
        axios.get('/assets/json/AddedVehicleDetails.json')
            .then((response) => {
                vm.props.onFetchLanguage(response.data[this.props.CurrentLanguage]);
            }, (error) => {
               
            })
    }


    handleClickAddVehicle() {
        this.props.onAddVehicleDetailForm();
        this.props.onAddVehicleDetailCounter(this.props.AddVehicleDetailCounter ? this.props.AddVehicleDetailCounter++ : 0);
    }

    handleClickMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleCloseMenu = () => {
        this.setState({ anchorEl: null });
    };
    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        return (
            <MuiThemeProvider>
                <div className='addedVehicle'>
                    <Container fluid={true}>
                        <Row>
                            <Col md={2} className='mui--hidden-xs'>
                                <div className='mui--hidden-xs mui--hidden-sm'><Drawer variant="permanent" /></div>
                            </Col>
                            <Col md={8} className='AddedVehicleDetailsContainer'>
                                <div className="AddedVehicleDetails">
                                    <Col md={6}>
                                        <div className='YourVehiclesText'>{this.props.FetchedLanguage ? this.props.FetchedLanguage.AddedVehicleDetailYourVehicles : ''}</div></Col>
                                    <Col md={6}>
                                        {this.props.onAddVehicleDetailForm && <AddVehicleDetailPopup />}
                                        <div className='AddVehiclesButtonRight mui--hidden-xs'><ButtonLightSuccess onClick={this.handleClickAddVehicle.bind(this)} Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.AddedVehicleDetailAddVehiclesButtonText : ''} midWidth={true}></ButtonLightSuccess></div>
                                    </Col>
                                    <Col md={4}>
                                        <Card className={classes.card}>
                                            <CardContent className={classes.Content} style={{ paddingBottom: '0px' }}>
                                                <Row>
                                                    <Col md={12} xs={6}>
                                                        <div className='CardText'>Card</div>
                                                    </Col>
                                                    <Col xs={6} className='mui--visible-xs-block'>
                                                        <i aria-owns={anchorEl ? 'simple-menu' : undefined} onClick={this.handleClickMenu} class="material-icons" style={{ float: 'right', marginRight: '1rem', cursor: 'pointer' }}>
                                                            more_horiz
                                                        </i>
                                                        <Menu
                                                            id="simple-menu"
                                                            anchorEl={anchorEl}
                                                            open={Boolean(anchorEl)}
                                                            onClose={this.handleClose}
                                                        >
                                                            <MenuItem onClick={this.handleCloseMenu}>
                                                                <i aria-owns={anchorEl ? 'simple-menu' : undefined} onClick={this.handleClickMenu} class="material-icons" style={{ float: 'right', marginRight: '1rem', cursor: 'pointer' }}>
                                                                    edit
                                                             </i>Edit</MenuItem>
                                                            <MenuItem onClick={this.handleCloseMenu}>
                                                                <i aria-owns={anchorEl ? 'simple-menu' : undefined} onClick={this.handleClickMenu} class="material-icons" style={{ float: 'right', marginRight: '1rem', cursor: 'pointer' }}>
                                                                    delete
                                                             </i>
                                                                Delete</MenuItem>
                                                        </Menu>
                                                    </Col>
                                                    <Col md={12}>
                                                        <div className='VehicleNumber'>DL-23-AJ-1234</div>
                                                    </Col>
                                                    <Col md={12}>
                                                        <div className='Use'>{this.props.FetchedLanguage ? this.props.FetchedLanguage.AddedVehicleDetailUse : ''}: Personal</div>
                                                    </Col>
                                                    <Col md={12}>
                                                        <div className='Use'>{this.props.FetchedLanguage ? this.props.FetchedLanguage.AddedVehicleDetailPolicyExpDate : ''}: 01-Mar-2019</div>
                                                    </Col>
                                                    <Col md={12} style={{ textAlign: 'center' }}>
                                                        <div className='GetQuotesButton'>
                                                            <ButtonLightSuccess Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.AddedVehicleDetailGetQuotesButtonText : ''} midContent={true}></ButtonLightSuccess>
                                                        </div>
                                                    </Col>
                                                    <Col md={12}>
                                                        <div className='CoveredWithContainer'>
                                                            <div className='CoveredWith'>Covered with Groupbima</div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </CardContent>
                                        </Card>
                                        <Col md={6} xs={12}>
                                            <div className='AddVehiclesButtonRight mui--visible-xs-block'><ButtonLightSuccess onClick={this.handleClickAddVehicle.bind(this)} Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.AddedVehicleDetailYourVehicles : ''} smallWidth={true} ></ButtonLightSuccess></div>
                                        </Col>
                                    </Col>
                                    <Col md={4} className='mui--hidden-xs'>
                                        <Card className={classes.card}>
                                            <CardContent className={classes.Content} style={{ paddingBottom: '0px' }}>
                                                <Row>
                                                    <Col md={12}>
                                                        <div className='CardText'>Card</div>
                                                    </Col>
                                                    <Col md={12}>
                                                        <div className='VehicleNumber'>DL-23-AJ-1234</div>
                                                    </Col>
                                                    <Col md={12}>
                                                        <div className='Use'>{this.props.FetchedLanguage ? this.props.FetchedLanguage.AddedVehicleDetailUse : ''}: Personal</div>
                                                    </Col>
                                                    <Col md={12}>
                                                        <div className='Use'>{this.props.FetchedLanguage ? this.props.FetchedLanguage.AddedVehicleDetailPolicyExpDate : ''}: 01-Mar-2019</div>
                                                    </Col>
                                                    <Col md={12} style={{ textAlign: 'center' }}>
                                                        <div className='GetQuotesButton'>
                                                            <ButtonLightSuccess Text="Get Quotes" midContent={true}></ButtonLightSuccess>
                                                        </div>
                                                    </Col>
                                                    <Col md={12}>
                                                        <div className='CoveredWithContainer'>
                                                            <div className='NotCoveredWith'>Not covered with Groupbima</div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </CardContent>
                                        </Card>
                                    </Col>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </MuiThemeProvider>
        )
    }
}
AddedVehicles.propTypes = {
    classes: PropTypes.object.isRequired,
};

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


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddedVehicles));