import React from 'react'
import Container from 'muicss/lib/react/container'
import Panel from 'muicss/lib/react/panel'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';

import './reset-password.css'
import constants from '../../constants/appConstants.json'

const styles = theme => ({
    snack: {
        marginTop: '6rem'
    },
    cssLabel: {
        fontFamily: 'Source Sans Pro',
        fontSize: '16px',
        color: 'rgba(170, 170, 170, 0.54)',
        '&$cssFocused': {
            color: 'rgba(0,0,0,.87)',
        },
    },
    cssFocused: {},
    cssUnderline: {
        '&:after': {
            borderBottomColor: 'rgba(0,0,0,.87)',
        },
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: 'rgba(0,0,0,.87)',
        },
    },
    errored: {
    },
    backdrop: {
        backgroundColor: "transparent"
    },
    inputLabel: {
        fontFamily: 'Source Sans Pro',
        fontSize: '16px',
        color: '#aaaaaa'
    },
    margin: {
        maxWidth: '330px'
    },
    cssRoot: {
        color: theme.palette.getContrastText('#ea0b4b'),
        backgroundColor: '#ea0b4b',
        '&:hover': {
            backgroundColor: '#ea0b4b',
        },
        maxWidth: '330px',
        textTransform: 'capitalize'
    },
});

class ResetPassword extends React.Component {

    state = {
        openSnack: false,
        password: '',
        cPassword: '',
        isCPError: false,
        isPError: false,
        initCP: true,
        initP: true,
        pRules: { required: true, length: true, isPassword: true },
        cPRules: { required: true, length: true, password: true, isPassword: true },
        isFormValid: false,
        token: ''
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        if (name === 'password') {
            const isValid = this.checkValidity(event.target.value, this.state.pRules)
            let isFormValid = '';
            if (isValid)
                isFormValid = this.checkValidity(this.state.cPassword, this.state.cPRules)

            if (value.length <= 16) {
                this.setState({ password: value, isPError: isValid, initP: false, isFormValid })
            }
        } else {
            const isValid = this.checkValidity(event.target.value, this.state.cPRules)
            let isFormValid = '';
            if (isValid)
                isFormValid = this.checkValidity(this.state.password, this.state.pRules)
            this.setState({ cPassword: value, isCPError: isValid, initCP: false, isFormValid })
        }

    }

    handleFormSubmit = (e) => {
        // Handle form submission
        e.preventDefault()

        const vm = this
        const { password, token } = this.state

        const params = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        axios.post(`${constants.apiRootURL}/secure/reset-password/${password}`, {}, params)
            .then(response => {

                if (response.status === 200) {
                    vm.props.history.push('/login-customer')
                } else if (response.status === 403) {
                    vm.props.history.push('/forgot-password')
                }
            }).catch(error => {
                if (error.response.status === 400) {
                    this.setState({
                        openSnack: true
                    })
                }
                if (error.response.status === 401) {
                    localStorage.clear();
                    this.props.onAuthFail()
                    this.props.history.push('/login-customer')
                }
                if (error.response.status === 403) {
                    this.props.history.push('/500')
                }
                if (error.response.status === 500) {
                    this.props.history.push('/500')
                }
            })
    }

    // Check validity
    checkValidity(value, rules) {
        let isValid = true
        if (!rules) {
            return true
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.length) {
            const vLength = value.trim().length

            isValid = vLength >= 6 && isValid
        }
        if (rules.password) {
            isValid = (value === this.state.password) && isValid

        }
        if (rules.isPassword) {
            const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
            isValid = regex.test(value) && isValid
        }

        return isValid;
    }

    componentWillMount() {
        const token = this.props.location.state.token;
        token ? this.setState({ token }) : this.props.history.push('/forgot-password')
    }

    render() {
        const { classes } = this.props
        const { cPassword, isCPError, password, isPError, initCP, initP, isFormValid } = this.state
        return (
            <div className="reset-password-parent">
                <Container className="mui--hidden-sm mui--hidden-xs">
                    <Panel className="panel-forgot">
                        <Row>
                            <Snackbar
                                className={classes.snack}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                                open={this.state.openSnack}
                                ContentProps={{
                                    'aria-describedby': 'message-id',
                                }}
                                message={<span id="message-id">Something Went Wrong!</span>}
                            />
                            <Col md="7" sm="12" className="img-side">
                                <h4 className="gbui-h4 text-center forgot-h4">Reset Password</h4>
                                <div className="forgot-password-img">
                                    <img src="/assets/reset-password.svg" alt="forgot-password" />
                                </div>
                            </Col>
                            <Col md="5" sm="12">
                                <h5 className="gbui-h5 text-center right-forgot-h5">Change Password</h5>
                                <p className="gbui-menu-bar-2 note-right text-center">Please set your new password</p>
                                <div className="forgot-password-form text-center">
                                    <form onSubmit={this.handleFormSubmit}>
                                        {/* Input field for phone or email */}
                                        <FormControl className={classes.margin} fullWidth>
                                            <InputLabel
                                                htmlFor="password"
                                                classes={{
                                                    root: classes.cssLabel,
                                                    focused: classes.cssFocused,
                                                    error: classes.errored
                                                }}
                                                style={{ color: !isPError && !initP ? 'red' : '' }}
                                            >
                                                New Password
                                            </InputLabel>
                                            <Input
                                                id="password"
                                                classes={{
                                                    underline: classes.cssUnderline,
                                                    // label:classes.inputLabel
                                                }}
                                                value={password}
                                                // label="Name"
                                                fullWidth={true}
                                                required={true}
                                                error={!isPError && !initP}
                                                onChange={this.handleChange}
                                                onBlur={this.checkValidity}
                                                maxLength={16}
                                                name="password"
                                                type="password"
                                            />
                                            {!isPError && !initP && <p style={{ color: 'red' }}>
                                                Please Enter a valid password with following:<br />
                                                <ol>
                                                    <li>Atleast 1 capital letter</li>
                                                    <li>Atleast 1 special character</li>
                                                    <li>Atleas 1 number</li>
                                                    <li>Min. 8 characters and Max. 16 characters</li>
                                                </ol>
                                            </p>}
                                        </FormControl>
                                        <FormControl className={classes.margin} fullWidth>
                                            <InputLabel
                                                htmlFor="cPassword"
                                                classes={{
                                                    root: classes.cssLabel,
                                                    focused: classes.cssFocused,
                                                    error: classes.errored
                                                }}
                                                style={{ color: !isCPError && !initCP ? 'red' : '' }}
                                            >
                                                Confirm Password
                                            </InputLabel>
                                            <Input
                                                id="cPassword"
                                                type="password"
                                                classes={{
                                                    underline: classes.cssUnderline,
                                                    // label:classes.inputLabel
                                                }}
                                                value={cPassword}
                                                // label="Name"
                                                fullWidth={true}
                                                required={true}
                                                error={!isCPError && !initCP}
                                                onChange={this.handleChange}
                                                onBlur={this.checkValidity}
                                                maxLength={16}
                                                name="cPassword"
                                            />
                                        </FormControl>
                                        {!isCPError && !initCP && <p style={{ color: 'red' }}>
                                            Please Enter a valid password with following:<br />
                                            <ol>
                                                <li>Atleast 1 capital letter</li>
                                                <li>Atleast 1 special character</li>
                                                <li>Atleas 1 number</li>
                                                <li>Min. 8 characters and Max. 16 characters</li>
                                            </ol>
                                        </p>}
                                        <div className="submit-button">
                                            <Button
                                                variant="contained"
                                                type="submit"
                                                className={classNames(classes.cssRoot)}
                                                fullWidth
                                                disabled={!isFormValid}
                                            >
                                                submit
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </Col>
                        </Row>
                    </Panel>
                </Container>
                <div className="mui--hidden-md mui--hidden-lg mui--hidden-xl">
                    <h5 className="gbui-h5 text-center">Change Password</h5>
                    <p className="gbui-menu-bar-2 note-right text-center">Please set your new password</p>
                    <div className="forgot-password-form text-center">
                        <form onSubmit={this.handleFormSubmit}>
                            {/* Input field for phone or email */}
                            <FormControl className={classes.margin} fullWidth>
                                <InputLabel
                                    htmlFor="password"
                                    classes={{
                                        root: classes.cssLabel,
                                        focused: classes.cssFocused,
                                        error: classes.errored
                                    }}
                                    style={{ color: this.state.isError ? 'red' : '' }}
                                >
                                    New Password
                                            </InputLabel>
                                <Input
                                    id="password"
                                    classes={{
                                        underline: classes.cssUnderline,
                                        // label:classes.inputLabel
                                    }}
                                    value={this.state.password}
                                    // label="Name"
                                    fullWidth={true}
                                    required={true}
                                    error={this.state.isPError}
                                    onChange={this.handleChange}
                                    onBlur={this.checkValidity}
                                    maxLength={16}
                                    name="password"
                                    type="password"
                                />
                            </FormControl>
                            {!this.state.isPError && <p style={{ color: 'red' }}>
                                Please Enter a valid password with following:<br />
                                <ol>
                                    <li>Atleast 1 capital letter</li>
                                    <li>Atleast 1 special character</li>
                                    <li>Atleas 1 number</li>
                                    <li>Min. 8 characters and Max. 16 characters</li>
                                </ol>
                            </p>}
                            <FormControl className={classes.margin} fullWidth>
                                <InputLabel
                                    htmlFor="cPassword"
                                    classes={{
                                        root: classes.cssLabel,
                                        focused: classes.cssFocused,
                                        error: classes.errored
                                    }}
                                    style={{ color: this.state.isError ? 'red' : '' }}
                                >
                                    Confirm Password
                                            </InputLabel>
                                <Input
                                    id="cPassword"
                                    classes={{
                                        underline: classes.cssUnderline,
                                        // label:classes.inputLabel
                                    }}
                                    value={this.state.cPassword}
                                    // label="Name"
                                    fullWidth={true}
                                    required={true}
                                    error={this.state.isCPError}
                                    onChange={this.handleChange}
                                    onBlur={this.checkValidity}
                                    maxLength={16}
                                    name="cPassword"
                                    type="password"
                                />
                            </FormControl>
                            {!this.state.isCPError && <p style={{ color: 'red' }}>
                                Please Enter a valid password with following:<br />
                                <ol>
                                    <li>Atleast 1 capital letter</li>
                                    <li>Atleast 1 special character</li>
                                    <li>Atleas 1 number</li>
                                    <li>Min. 8 characters and Max. 16 characters</li>
                                </ol>
                            </p>}
                            <div className="submit-button">
                                <Button
                                    onClick={this.handleFormSubmit}
                                    variant="contained"
                                    className={classNames(classes.cssRoot)}
                                    fullWidth
                                >
                                    submit
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

ResetPassword.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResetPassword)