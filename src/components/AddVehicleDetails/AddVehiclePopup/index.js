import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import { MuiThemeProvider } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ButtonLightSuccess from '../../Shared/ButtonLightSuccess/index';
import './index.css';
import InputAdornment from '@material-ui/core/InputAdornment';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import green from '@material-ui/core/colors/green';
import FormLabel from '@material-ui/core/FormLabel';


const styles = theme => ({

    formControl: {
        margin: '5px 0px',
    },
    divider: {
        backgroundColor: '#aaaaaa',
        marginTop: 20,
        marginBottom: 20,
    },
    label: {
        fontSize: '14px',
        textAlign: 'left',
        fontFamily: 'Nunito',
        color: '#000000',
    },
    root: {
        color: '#000000',
        '&$checked': {
            color: green[500],
        },
    },
    checked: {},
});

class AddVehicleDetailPopup extends Component {
    constructor(props) {
        super();
        this.state = {
            car_type: 'Personal Car',
            Vehicle_type: 'Car',
            succcessMessage: false,
            RegNumber: 'Dl 12 AJ 12345',
            PolicyExpDate: '16-Jun-2019'
        };
    }
    handleChangeRadio = event => {
        this.setState({ car_type: event.target.value });
    };
    handleChangeRadio2 = event => {
        this.setState({ Vehicle_type: event.target.value });
    };
    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleSuccessMessage = () => {
        this.setState({
            succcessMessage: true
        })
    }

    handleClose = () => {
        this.props.onAddVehicleDetailForm();
    };

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    render() {
        const { fullScreen, classes } = this.props;
        return (
            <div>
                <MuiThemeProvider>
                    <Dialog open={this.props.AddVehicleDetailForm}
                        onClose={this.handleClose}
                        maxWidth="md"
                        fullScreen={fullScreen}
                        aria-labelledby="simple-dialog-title">
                        <DialogContent >
                            {this.state.succcessMessage && <Row>
                                <Col md={12}>
                                    <div className='succcessMessage'><div className='successText' style={{ color: '#ffffff' }}>You have suceessfully added your vehicle</div></div>
                                </Col>
                            </Row>}
                            <Row>
                                <Col md={12} style={{ textAlign: 'center' }}>
                                    <div className='AddVehicleHeading'>
                                        Add Vehicle
                                    </div>
                                    <div className='close' >
                                        <i onClick={this.handleClose} class="material-icons" style={{ float: 'right', marginRight: '1rem', cursor: 'pointer' }}>
                                            close
                                        </i>
                                    </div>
                                </Col>
                                <Col md={6} className='VehicleUsageContainer' >
                                    <Col md={12}>
                                        <FormLabel component="legend" style={{ fontSize: '14px' }}>Vehicle Usage</FormLabel>
                                    </Col>
                                    <Col md={12}>
                                        <div className='radioControl' style={{ display: 'inline' }}>
                                            <FormControlLabel
                                                classes={{
                                                    label: classes.label,
                                                }}
                                                value="Personal Car"
                                                control={<Radio
                                                    checked={this.state.car_type === 'Personal Car'}
                                                    onChange={this.handleChangeRadio}
                                                    value="Personal Car"
                                                    name="car_type"
                                                    classes={{
                                                        root: classes.root,
                                                        checked: classes.checked,
                                                    }}
                                                />}
                                                label="Personal"
                                            />
                                        </div>
                                        <div className='radioControl' style={{ display: 'inline' }}>
                                            <FormControlLabel
                                                classes={{
                                                    label: classes.label,
                                                }}
                                                value="Commercial Car"
                                                control={<Radio
                                                    checked={this.state.car_type === 'Commercial Car'}
                                                    onChange={this.handleChangeRadio}
                                                    value="Commercial Car"
                                                    name="car_type"
                                                    classes={{
                                                        root: classes.root,
                                                        checked: classes.checked,
                                                    }}
                                                />}
                                                label="Commercial"
                                            />
                                        </div>
                                    </Col>
                                </Col>
                                <Col md={6} className='VehicleTypeContainer' >
                                    <Col md={12}>
                                        <FormLabel component="legend" style={{ fontSize: '14px' }}>Vehicle Type</FormLabel>
                                    </Col>
                                    <Col md={12}>
                                        <div className='radioControl2' style={{ display: 'inline' }}>
                                            <FormControlLabel
                                                classes={{
                                                    label: classes.label,
                                                }}
                                                value="Personal Car"
                                                control={<Radio
                                                    checked={this.state.Vehicle_type === 'Car'}
                                                    onChange={this.handleChangeRadio2}
                                                    value="Car"
                                                    name="Vehicle_type"
                                                    classes={{
                                                        root: classes.root,
                                                        checked: classes.checked,
                                                    }}
                                                />}
                                                label="Car"
                                            />
                                        </div>
                                        <div className='radioControl2' style={{ display: 'inline' }}>
                                            <FormControlLabel
                                                classes={{
                                                    label: classes.label,
                                                }}
                                                value="Bike"
                                                control={<Radio
                                                    checked={this.state.Vehicle_type === 'Bike'}
                                                    onChange={this.handleChangeRadio2}
                                                    value="Bike"
                                                    name="Vehicle_type"
                                                    classes={{
                                                        root: classes.root,
                                                        checked: classes.checked,
                                                    }}
                                                />}
                                                label="Bike"
                                            />
                                        </div>
                                    </Col>
                                </Col>

                                <Col md={6} className='VehicleUsageContainer' >
                                    <Col md={12}>
                                        <FormControl fullWidth className={classes.formControl}>
                                            <InputLabel htmlFor="component-simple">Registration Number</InputLabel>
                                            <Input
                                                value={this.state.RegNumber}
                                                aria-haspopup="true"
                                                onClick={this.handleClick}
                                                id="component-simple"
                                                onChange={this.handleChange('RegNumber')} />
                                        </FormControl>
                                    </Col>
                                </Col>
                                <Col md={6} className='VehicleTypeContainer' >
                                    <Col md={12}>
                                        <FormControl fullWidth className={classes.formControl}>
                                            <InputLabel htmlFor="component-simple">Policy Exp. Date</InputLabel>
                                            <Input
                                                value={this.state.PolicyExpDate}
                                                endAdornment={<InputAdornment position="end"><img alt='vehicle' src='assets/MyAccountEdit/dateRange.svg'></img></InputAdornment>}
                                                aria-haspopup="true"
                                                onClick={this.handleClick}
                                                id="component-simple"
                                                onChange={this.handleChange('PolicyExpDate')} />
                                        </FormControl>
                                    </Col>
                                </Col>

                                <Col md={12} style={{ textAlign: 'center' }}>
                                    <div className='SaveButton'>
                                        <ButtonLightSuccess Text='Save' onClick={this.handleSuccessMessage} middleWidth={true} />
                                    </div>
                                </Col>
                            </Row>
                        </DialogContent>
                    </Dialog>
                </MuiThemeProvider>
            </div >
        )
    }
}



AddVehicleDetailPopup.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    fullScreen: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
    return {
        AddVehicleDetailForm: state.AddVehicleDetail.add_vehicle_detail_form_open,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddVehicleDetailForm: (value) => dispatch({ type: 'AddVehicleDetailForm_HIDE', value }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withMobileDialog({ breakpoint: 'xs' })(withStyles(styles, { withTheme: true })(AddVehicleDetailPopup)));
