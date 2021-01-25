import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
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

const styles = theme => ({

    formControl: {
        margin: '20px 0px',
    },
});


class MyAccountChange extends Component {

    constructor(props) {
        super();
        this.state = {
            otp: '',
            isvalidOTP: true,
            succcessMessage: false,
        };
    }
    handleSuccessMessage = () => {
        // this.setState({
        //     succcessMessage: true
        // })
        this.props.verifyOtp(this.state.otp)
        console.log(this.state.otp)
    }
    handleChange = prop => event => {
        const isvalidOTP = event.target.value.trim() !== ''
        this.setState({ [prop]: event.target.value, isvalidOTP });
        
    };
    handleClose = () => {
        this.props.onMyAccountChangePopupHide();
    };
    render() {
        const { fullScreen, classes } = this.props;
        return (
            <div>
                <MuiThemeProvider>
                    <Dialog open={this.props.MyAccountChangePopup}
                        onClose={this.handleClose}           
                        maxWidth="md"
                        fullScreen={fullScreen}
                        aria-labelledby="simple-dialog-title">
                        <DialogContent >
                            {this.state.succcessMessage && <Row>
                                <Col md={12}>
                                    <div className='succcessMessage'><div className='successText' style={{ color: '#ffffff' }}>You have suceessfully changed your details</div></div>
                                </Col>
                            </Row>}
                            <DialogTitle>It seems you have changed your details</DialogTitle>
                            <div className='my-account-changes'>
                                <div className='please-share-otp-text'>
                                    Please share the OTP you have recieved on your {this.props.otpSource}
                                </div>
                                <Row>
                                    <Col md={12}>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel
                                                htmlFor="component-simple"
                                                style={{color: `${this.state.isvalidOTP ? '':'red'}`}}>One time Passwor(OTP)</InputLabel>
                                            <Input
                                                value={this.state.otp}
                                                aria-haspopup="true"
                                                onClick={this.handleClick}
                                                id="component-simple"
                                                onChange={this.handleChange('otp')}
                                                error={!this.state.isvalidOTP} />
                                        </FormControl>
                                    </Col>
                                    <Col md={12}>
                                        <div className='SubmitButton'>
                                            <ButtonLightSuccess
                                                Text='Submit'
                                                onClick={this.handleSuccessMessage}
                                                middleWidth={true}
                                                disabled={!this.state.isvalidOTP} />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </DialogContent>
                    </Dialog>
                </MuiThemeProvider>
            </div>
        )
    }
}

MyAccountChange.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    fullScreen: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
    return {
        AddFamilyMemberForm: state.AddFamilyMember.add_family_member_form_open,
        MyAccountChangePopup: state.MyAccount.my_account_change_popup
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddFamilyMemberForm: (value) => dispatch({ type: 'AddFamilyMemberForm_HIDE', value }),
        onMyAccountChangePopupShow: () => dispatch({ type: 'MY_ACCOUNT_CHANGE_POPUP_SHOW' }),
        onMyAccountChangePopupHide: () => dispatch({ type: 'MY_ACCOUNT_CHANGE_POPUP_HIDE' }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withMobileDialog({ breakpoint: 'xs' })(withStyles(styles, { withTheme: true })(MyAccountChange)));


