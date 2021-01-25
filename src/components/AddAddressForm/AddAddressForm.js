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
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import './AddAddressForm.css';
import { connect } from 'react-redux';
import ButtonLightSuccess from '../Shared/ButtonLightSuccess/index';




const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 250,
        fontSize: 16,
    },
    input: {
        display: 'flex',
        padding: 0,
    },
    formControl: {
        margin: theme.spacing.unit,
    },
});


class AddAddressForm extends Component {
    constructor(props) {
        super();
    }

    state = {
        value: 'Value',
        age: '',
        multiline: 'Controlled',
        currency: 'EUR',
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };


    handleClose = () => {
        this.props.onAddAddressForm();
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    render() {
        const { fullScreen } = this.props;
        return (
            <div>
                <MuiThemeProvider>
                    <Dialog open={this.props.AddAddressForm}
                        onClose={this.handleClose}
                        maxWidth="sm"
                        fullScreen={fullScreen}
                        aria-labelledby="simple-dialog-title">
                        <DialogContent>
                            <Row style={{ textAlign: 'center' }}>
                                <Col md={12}>
                                    <img src="assets/CarInsurance/arrowBack.svg" className='ArrowPic mui--visible-xs-block' alt='arrow'
                                        onClick={this.handleClose}
                                    />
                                    <div className='addAddressHeading'>
                                    {this.props.AddAddress ? this.props.AddAddress.AddAddressHeading : ''}
                                    </div>
                                </Col>

                                <Col md={12}>
                                    <div className='inputDiv'>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="component-simple">{this.props.AddAddress ? this.props.AddAddress.AddAddressNameFieldLabel : ''}</InputLabel>
                                            <Input
                                                aria-haspopup="true"
                                                id="component-simple"
                                                value={this.state.value}
                                                onChange={this.handleChange('value')}
                                            />
                                        </FormControl>
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className='inputDiv'>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="component-simple">{this.props.AddAddress ? this.props.AddAddress.AddAddressPhoneNumberFieldLabel : ''}</InputLabel>
                                            <Input
                                                aria-haspopup="true"
                                                onClick={this.handleClick}
                                                id="component-simple" value='Value' onChange={this.handleChange} />
                                        </FormControl>
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className='inputDiv'>
                                        <TextField fullWidth
                                            id="outlined-number"
                                            label={this.props.AddAddress ? this.props.AddAddress.AddAddressAddressFieldLabel : ''}
                                            type="text"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            margin="normal"
                                            variant="outlined"
                                        />
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className='inputDiv'>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="component-simple">{this.props.AddAddress ? this.props.AddAddress.AddAddressPinCodeFieldLabel : ''}</InputLabel>
                                            <Input
                                                aria-haspopup="true"
                                                onClick={this.handleClick}
                                                id="component-simple" value='Value' onChange={this.handleChange} />
                                        </FormControl>
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className='inputDiv'>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="component-simple">{this.props.AddAddress ? this.props.AddAddress.AddAddressCityFieldLabel : ''}</InputLabel>
                                            <Input
                                                aria-haspopup="true"
                                                onClick={this.handleClick}
                                                id="component-simple" value='Value' onChange={this.handleChange} />

                                        </FormControl>
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className='inputDiv'>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="component-simple">{this.props.AddAddress ? this.props.AddAddress.AddAddressStateFieldLabel : ''}</InputLabel>
                                            <Input
                                                aria-haspopup="true"
                                                onClick={this.handleClick}
                                                id="component-simple" value='Value' onChange={this.handleChange} />
                                        </FormControl>
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className='SaveButton'>
                                        <ButtonLightSuccess Text={this.props.AddAddress ? this.props.AddAddress.AddAddressButtonTextSave : ''} fullWidth={true} />
                                    </div>
                                </Col>
                            </Row>
                        </DialogContent>
                    </Dialog>
                </MuiThemeProvider>
            </div>
        )
    }
}


AddAddressForm.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    fullScreen: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
    return {
        AddAddressForm: state.PreInspection.add_address_form_open,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddAddressForm: () => dispatch({ type: 'AddAddressForm_HIDE' }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withMobileDialog({ breakpoint: 'xs' })(withStyles(styles, { withTheme: true })(AddAddressForm)));