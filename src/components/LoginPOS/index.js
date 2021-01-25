import React from 'react'
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Link } from 'react-router-dom';
import ButtonLightSuccess from '../Shared/ButtonLightSuccess/index';
import './loginPOS.css';
import axios from 'axios';
import { connect } from 'react-redux';




const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    checkbox: {
        '&$checked': {
            color: '#ea0b4b',
        },
    },
    checked: {},
    margin: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    withoutLabel: {
        marginTop: theme.spacing.unit * 3,
    },
    textField: {
        flexBasis: 200,
    },
});

class LoginPOS extends React.Component {
    componentWillMount() {
        const vm = this;
        this.props.onCurrentComponent('loginPos.json');
        axios.get('/assets/json/loginPos.json')
            .then((response) => {
                vm.props.onFetchLanguage(response.data[this.props.CurrentLanguage]);
            }, (error) => {
                console.log(error);
            })
    }
    state = {
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
        rememberMe: true,
    };

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };
    handleRemember = name => event => {
        this.setState({ [name]: event.target.checked });
    };
    render() {
        const { classes } = this.props;
        return (
            <div className="login-pos-root">
                <Container className="mui--z2 mui--hidden-sm mui--hidden-xs" style={{ marginBottom: '6rem' }}>
                    <Row style={{ background: '#f4f4f4' }}>
                        <Col md="6" lg="7" className="mui--hidden-xs mui--hidden-sm">
                            <p style={{ textAlign: 'center', color: '#000000', fontSize: '34px', fontFamily: 'Nunito', marginTop: '4rem' }}>
                            {this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginPosWelcomeCardText1 : ''}<br />{this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginPosWelcomeCardText2 : ''}
                            </p>
                            <div style={{ textAlign: 'center' }}>
                                <img alt ='pos' src="assets/bocome-pos.svg" style={{width:'100%',height:'auto'}} />
                            </div>
                        </Col>
                        <Col md="6" lg="5" style={{ background: '#fff', padding: '0px' }}>
                            <p style={{ textAlign: 'center', fontSize: '24px', color: '#000000', fontFamily: 'SourceSansPro-Regular', marginTop: '5rem' }}>
                             {this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginPosHeadingText1 : ''}
                            </p>
                            <p style={{ textAlign: 'center', fontSize: '16px', color: '#808080', fontFamily: 'Nunito', }}>
                            {this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginPosPLeaseLoginToAccountText : ''}
                            </p>
                            <div style={{ marginTop: '3rem', padding: '0 15px' }}>
                                <TextField label={this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginPosInputField1LabelEmail : ''} fullWidth={true} style={{marginBottom: '0.5rem' }} />
                                <FormControl className={classNames(classes.margin, classes.textField)} fullWidth={true}>
                                    <InputLabel htmlFor="adornment-password">{this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginPosInputField2LabelPassword : ''}</InputLabel>
                                    <Input
                                        id="adornment-password"
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        value={this.state.password}
                                        onChange={this.handleChange('password')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="Toggle password visibility"
                                                    onClick={this.handleClickShowPassword}
                                                >
                                                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        fullWidth={true}
                                    />
                                </FormControl>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.rememberMe}
                                            onChange={this.handleRemember('rememberMe')}
                                            value="remember"
                                            classes={{
                                                root: classes.checkbox,
                                                checked: classes.checked,
                                            }}
                                        />
                                    }
                                    label={this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginPosRememberMeText : ''}
                                />
                                <Link to="#" style={{ color: '#333333', float: 'right', marginTop: '0.77rem' }}>{this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginPosForgotPasswordText : ''}</Link>
                                <div className='login-button'>
                                   <ButtonLightSuccess Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginPosLoginText : ''} fullWarningPink={true} />
                                </div>
                            </div>
                            <div style={{ width: '100%', height: '14px', borderBottom: '1px solid #aaaaaa', textAlign: 'center', marginTop: '2rem' }}>
                                <span style={{ fontSize: '4px', backgroundColor: '#FFFFFF', padding: '0px 10px' }}>
                                    &nbsp;&nbsp;
                                    </span>
                            </div>
                            <div style={{ padding: '0 15px' }}>
                                <p style={{ color: '#000000', fontSize: '24px', textAlign: 'center', fontFamily: 'Nunito', marginTop: '2rem' }}>
                                  {this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginPosHeadingText2 : ''}
                                </p>
                                <p style={{ color: '#808080', textAlign: 'center', fontSize: '16px' }}>{this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginPosMiddleContent : ''}</p>
                                <div style={{ textAlign: 'center', margin: '2rem' }}>
                                    <ButtonLightSuccess Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginPosBecomeAPosText : ''} outlinePink={true} />
                                </div>
                                <p style={{ fontSize: '14px', marginTop: '1rem' }}><span style={{ color: '#aaaaaa' }}>{this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginPosByLoggingInText : ''}</span><br /><span style={{ color: '#333333' }}>{this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginPosTnCAndPrivacyPolicyText1 : ''} &amp; {this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginPosTnCAndPrivacyPolicyText2 : ''} &amp; {this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginPosTnCAndPrivacyPolicyText3 : ''}</span></p>
                                <br /><br /><br /><br />
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div className="mui--hidden-md mui--hidden-lg mui--hidden-xl">
                    <Container fluid={true} style={{ background: '#fff' }}>
                        <p style={{ textAlign: 'center', fontSize: '24px', color: '#000000', fontFamily: 'Nunito', marginTop: '5rem' }}>
                        {this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginPosHeadingText1 : ''}
                            </p>
                        <p style={{ textAlign: 'center', fontSize: '16px', color: '#808080', fontFamily: 'Nunito', }}>
                        {this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginPosPLeaseLoginToAccountText : ''}
                            </p>
                        <div>
                            <TextField label={this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginPosInputField1LabelEmail : ''} fullWidth={true} style={{marginBottom: '0.5rem' }} />
                            <FormControl className={classNames(classes.margin, classes.textField)} fullWidth={true}>
                                <InputLabel htmlFor="adornment-password">{this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginPosInputField2LabelPassword : ''}</InputLabel>
                                <Input
                                    id="adornment-password"
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    value={this.state.password}
                                    onChange={this.handleChange('password')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="Toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                            >
                                                {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    fullWidth={true}
                                />
                            </FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.rememberMe}
                                        onChange={this.handleRemember('rememberMe')}
                                        value="remember"
                                        classes={{
                                            root: classes.checkbox,
                                            checked: classes.checked,
                                        }}
                                    />
                                }
                                label={this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginPosRememberMeText : ''}
                            />
                            <Link to="#" style={{ color: '#333333', float: 'right', marginTop: '0.77rem' }}>{this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginPosForgotPasswordText : ''}</Link>
                            <ButtonLightSuccess Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginPosLoginText : ''} fullWarningPink={true} />
                            <div style={{ width: '100%', height: '14px', borderBottom: '1px solid #aaaaaa', textAlign: 'center', marginTop: '2rem' }}>
                                <span style={{ fontSize: '4px', backgroundColor: '#FFFFFF', padding: '0px 10px' }}>
                                    &nbsp;&nbsp;
                                    </span>
                            </div>
                            <p
                                style={{ color: '#000000', fontSize: '24px', textAlign: 'center', fontFamily: 'Nunito', marginTop: '2rem' }}>
                                {this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginPosHeadingText2 : ''}
                                </p>
                            <p style={{ color: '#808080', textAlign: 'center', fontSize: '16px' }}>{this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginPosMiddleContent : ''}</p>
                            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                                <ButtonLightSuccess Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginPosBecomeAPosText : ''} outlinePink={true} />
                            </div>
                            <p style={{ fontSize: '14px', marginTop: '1rem' }}><span style={{ color: '#aaaaaa' }}>{this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginPosByLoggingInText : ''}</span><br /><span style={{ color: '#333333' }}>{this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginPosTnCAndPrivacyPolicyText1 : ''} &amp; {this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginPosTnCAndPrivacyPolicyText2 : ''} &amp; {this.props.FetchedLanguage ? this.props.FetchedLanguage.LoginPosTnCAndPrivacyPolicyText3 : ''}</span></p>
                            <br /><br />
                        </div>
                    </Container>
                </div>
            </div>
        )
    }
}

LoginPOS.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    CurrentLanguage: state.language.current_language,
    FetchedLanguage: state.language.lang_data,
});

const mapDispatchToProps = dispatch => ({
    onCurrentComponent: (fileName) => dispatch({ type: 'CurrentComponent', fileName }),
    onFetchLanguage: (language) => dispatch({ type: 'FetchLanguage', language }),
    onCurrentLanguage: () => dispatch({ type: 'CurrentLanguage' }),
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginPOS));