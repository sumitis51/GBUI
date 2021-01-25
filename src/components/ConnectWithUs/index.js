import React, { Component } from 'react'
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import constants from '../../constants/appConstants.json'
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import './index.css'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import LeftPanel from './LeftPanel/index'
import ButtonLightSuccess from '../Shared/ButtonLightSuccess/index';
import Checkbox from '@material-ui/core/Checkbox'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import {Helmet} from "react-helmet";
import { connect } from 'react-redux';


const styles = theme => ({
    label: {
        fontFamily: 'Source Sans Pro',
        // fontSize: '12px',
        color: '#aaaaaa'
    },
    consentlabel:{
        fontFamily: 'Source Sans Pro',
        fontSize: '14px',
  fontWeight: 'normal',
  fontStyle: 'normal',
  fontStretch: 'normal',
  lineHeight: 'normal',
  letterSpacing: 'normal',
  color: '#000000',
  textAlign:'start'
    },
    selectOption: {
        fontFamily: 'Source Sans Pro',
        fontSize: '16px',
        color: '#000000'
    },
    formControl: {
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        backgroundColor: '#f4f4f4'
    }

})

class ConnectWithUs extends Component {
    state = {
        language: 'English',
        mobile: '',
        age: '',
        successMessage: false,
        age:'',
        setPage:'/connect-with-us',
        isValid:false,
        checkbox: false
    };
    handleChange = name => event => {
        // debugger
        
        if(name === 'checkbox') {
            this.setState({ [name]: event.target.checked });
        } else {
            let mNumber = event.target.value
            if(mNumber.length > 10) {
                 return false
            } else {
            this.setState({ [name]: mNumber });
            }
        }
        
        this.checkValidity(event.target)
    };
    checkValidity(event){
        let isValid = true;
        if(event.name == "mobile")
        {
            isValid =  (event.value !== "")  && isValid
            isValid =  (event.value.length > 9) && isValid
            isValid = this.state.checkbox && isValid
        } else {
            isValid = event.checked && isValid
            isValid = this.state.mobile !== '' && isValid
        }
        this.setState({isValid})
            
    }
    handleHelpRequest = (event) => {
        let token = localStorage.getItem('token')
        let config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const data = {
            language: this.state.language,
            mobile: this.state.mobile
        }
         let apiURL;
         apiURL = `${constants.apiRootURL}/connect-with-us/help`;
        
        axios.post(apiURL, data, config)
            .then(response => {
                this.setState({ successMessage: true, tillResponse: true });
                console.log(response.data)
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
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ successMessage: false });
    };
    handleChangeRoute=name=>event=>{
        if(name==="age"){
         this.props.history  && this.props.history.push(event.target.value);
        }
     }
    handleNavChange = (event) =>  {
        this.setState({
            setPage:event.target.value
        })
        this.props.history.push(event.target.value);
      }
    render() {
        const { classes } = this.props;
        return (
            <div className='connect-with-us'>
                <Helmet>
                    <title>Choose the Best &amp; Affordable Health Insurance Plans Online Now</title>
                    <meta name="description" content="Contact us to choose the best national health insurance policy and plans for single, family, friends, etc at affordable cost with big benefits."/>
                </Helmet>
                <Container fluid={true} className='connect-container'>



                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        open={this.state.successMessage}
                        autoHideDuration={6000}
                        onClose={this.handleClose}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id"><div className='message-response gbui-button-1'>
                            Your request for call back has been submitted successfully</div></span>}
                        action={[
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                className={classes.close}
                                onClick={this.handleClose}
                            >
                                <CloseIcon />
                            </IconButton>,
                        ]}
                    />
                    <Row className='connect-row'>
                        <Col md={3} className='mui--hidden-xs mui--hidden-sm'>
                            <LeftPanel parentComponent='connectUs' />
                        </Col>
                        <Col md={9} sm={12} xs={12} className='connect-with-us-column'>
                            <div className='connect-dropdown mui--visible-xs-block mui--visible-sm-block'>
                                <Col xs={12} >
                                <div className='mobile_select_menu btm_margin' >
                                        <Select className="mobile_select"
                                              onChange={this.handleNavChange}
                                              value= {this.state.setPage}
                                        >
                                          <MenuItem value="/connect-with-us">Contact Us</MenuItem>
                                          <MenuItem value="/feedback">Share your Feedback</MenuItem>
                                          <MenuItem value="/complaints-grievances">Complains &amp; Grievances</MenuItem>
                                                    
                                        </Select>
                                        </div>
                                </Col>
                            </div>
                            <div class="connect-with-us-container-image">
                                <img alt='connect-with-us' className='connect-with-us-image mui--hidden-xs mui--hidden-sm' src='/assets/support.jpg' />
                                <img alt='connect-with-us' className='connect-with-us-image mui--visible-xs-block' src='/assets/support_mobile.jpg' />
                                <div class="centered-text-2 gbui-h5">How would you like to contact us?</div>
                                <div class="centered-text-3 gbui-menu-bar-1" style={{textAlign:'center'}}>
                                Got any queries regarding health insurance? We are here to help you at every step. Contact us! We look forward to hearing from you.
                                </div>
                            </div>
                            <Col md={6} xs={12} className='connect-block'>
                                <Col md={12} xs={12} className='connect-column'>
                                    <div className='sub-heading-1 gbui-h5'>Recommended</div>
                                </Col>
                                <Col md={12} xs={12} className='connect-column'>
                                    <div className='sub-heading-2 gbui-h6'>Get a call back</div>
                                </Col>
                                {/* <Col md={12} xs={12} className='connect-column'>
                                    <div className='sub-heading-2 gbui-menu-bar-1'>Average wait time:
                                    </div>
                                </Col> */}
                                <Col md={12} xs={12} className='connect-column'>
                                    <div className='language-column'>
                                    {/* <FormControl
                                                className={classes.formControl}
                                                fullWidth
                                                margin="none">
                                                <InputLabel
                                                    htmlFor="select-language"
                                                    classes={{
                                                        root: classes.input_label_root,
                                                        focused: classes.focused,

                                                    }}>
                                                    Language
                                                </InputLabel>
                                                <Select
                                                    name='language'
                                                    value={this.state.language}
                                                    onChange={this.handleChange('language')}
                                                    inputProps={{
                                                        name: 'language',
                                                        id: 'select-labguage',
                                                    }}
                                                >
                                                    <MenuItem value={'English'}>English</MenuItem>
                                                    <MenuItem value={'Hindi'}>Hindi</MenuItem>
                                                    <MenuItem value={'Marathi'}>Marathi</MenuItem>
                                                </Select>
                                            </FormControl> */}
                                        <FormControl fullWidth >
                                            <InputLabel className={classes.label} shrink htmlFor="age-native-label-placeholder">Language</InputLabel>
                                            <NativeSelect className={classes.selectOption}
                                                name='language'
                                                value={this.state.language}
                                                onChange={this.handleChange('language')}
                                                input={<Input name="language" id="select-labguage" />}
                                            >
                                                <option value={"English"}>English</option>
                                                <option value={"Hindi"}>Hindi</option>
                                                <option value={"Marathi"}>Marathi</option>
                                            </NativeSelect>
                                        </FormControl>
                                    </div>
                                </Col>
                                <Col md={12} xs={12} className='connect-column'>
                                    <div className='language-column'>
                                        <FormControl fullWidth>
                                            <TextField
                                                classes={{
                                                    label: classes.label
                                                }}
                                                id="standard-name"
                                                label="Phone Number"
                                                name="mobile"
                                                type="number"
                                                value={this.state.mobile}
                                                onChange={this.handleChange('mobile')}
                                                margin="normal"
                                                
                                            />
                                        </FormControl>
                                    </div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div>
                                    <FormControlLabel
                                                            control={
                                                                <Checkbox className={{ root: classes.checkboxConcent }}
                                                                    onChange={this.handleChange('checkbox')}
                                                                    value={this.state.checkbox}
                                                                    name='checkbox'
                                                                />
                                                            }
                                                            label="I agree to GroupBima contacting me on the given
                                                               phone number as any such contact  attempt will
                                                              be ‘transactional’ as per the TRAI guidelines."
                                                            classes={{ label: classes.consentlabel }}
                                                        />
                                    </div>
                                </Col>
                                <Col md={12} xs={12} className='connect-column'>
                                    <div className='language-column'>
                                        <ButtonLightSuccess Text='Submit' onClick={this.handleHelpRequest} disabled={!this.state.isValid} fullWarningPink={true} />
                                    </div>
                                </Col>
                            </Col>
                            <Col md={6} className='connect-block' xs={12}>
                                <Col md={12} xs={12} className='connect-column'>
                                    <div className='sub-heading-1 gbui-h5'>Other options</div>
                                </Col>
                                <Col md={12} xs={12} className='connect-column'>
                                    <div className='sub-heading-2 gbui-h6'>Want to contact us</div>
                                </Col>
                                <Col md={12} xs={12} className='connect-column'>
                                    <div style={{ color: '#ea0b4b' }} className='sub-heading-2 gbui-h6'>
                                        9707600600
                                    </div>
                                    <div style={{ color: '#333333' }} className='sub-heading gbui-menu-bar-1'>
                                    
                                            Helpline number
                                    </div>
                                </Col>
                                <Col md={12} xs={12} className='connect-column'>
                                    <div style={{ color: '#ea0b4b' }} className='sub-heading-2 gbui-h6'>
                                        connect@groupbima.com
                                    </div>
                                    <div style={{ color: '#333333' }} className='sub-heading gbui-menu-bar-1'>
                                       Email Us
                                    </div>
                                </Col>
                                {/* <Col md={12} xs={12} className='connect-column'>
                                    <div style={{ color: '#ea0b4b' }} className='sub-heading-2 gbui-h6'>
                                        connect@groupbima.com
                                    </div>
                                    <div style={{ color: '#333333' }} className='sub-heading gbui-menu-bar-1'>
                                        Coorporate Queries
                                    </div>
                                </Col> */}
                            </Col>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.token,
    }
  };
ConnectWithUs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(ConnectWithUs));
