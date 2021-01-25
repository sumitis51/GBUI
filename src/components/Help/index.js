import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'
import Checkbox from '@material-ui/core/Checkbox';
import ButtonLightSuccess from '../Shared/ButtonLightSuccess/index';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Drawer from '../Shared/Drawer'
import './help.css'
import constants from '../../constants/appConstants.json'
import RightCard from './feedbackRatings/index'

const styles = theme => ({
    snack:{
        marginTop:'6rem'
    },
    close: {
        padding: theme.spacing.unit / 2,
    },
    card: {
        minWidth: 275,
    },
    paper: {
        backgroundColor: '#f3f5fb',
    },
    paper1: {
        padding: theme.spacing.unit * 2,
    },
    textfield:{
        width:'70%'
    },
    cardHeader: {
        backgroundColor: '#f4f4f4'
    },
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        background: 'white',
        color: '#333'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    toolbar: theme.mixins.toolbar,
    formControl: {
        margin: `${theme.spacing.unit}px 0px`,
    },
    group: {
        margin: `0px 0`,
    },
    radio: {
        color: '#000000',
        '&$checked': {
            color: '#0da176',
        },
    },
    checked: {},
    label: {
        fontSize: '12px',
        fontFamily: 'Source Sans Pro',
        color: 'rgba(170, 170, 170, 0.54)'
    },
});

class Help extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openSnack:false,
            language:'',
            consent:false,
            request:true,
            mobile:'',
            reviews: '',
            successMessage: false,
            tillResponse:true,
        };
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({ successMessage: false });
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleChangeCheckbox = (event) => {
        this.setState({ [event.target.name]: event.target.checked });
    }
    handleHelpRequest = (event) =>{
        this.setState({ 
            consent:false,
            [event.target.name]: event.target.value ,
            language:'',
            mobile:'',
            reviews: '',
            tillResponse:false,
        });
        let token = localStorage.getItem('token')
        let config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const data = {
            language:this.state.language,
            mobile:this.state.mobile,
            notificationEnabled:this.state.consent        
        }
        axios.post(`${constants.apiRootURL}/secure/help`,data,config)
        .then(response => {
            this.setState({ successMessage: true ,consent:false,tillResponse:true });
            console.log(response.data)
        }).catch(error => {
            if (error.response.status === 400) {
                this.setState({
                    openSnack:true
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

    render() {
        const { classes } = this.props;
        return (
            <div className="help-parent">
                <CssBaseline />
                <Row id="area-to-click">
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
                    <Col md="1" className="mui--hidden-xs mui--hidden-sm">
                        {/* Left Side Bar */}
                        <Drawer variant="permanent" authenticate={true}/>
                    </Col>
                    <Col md="11" sm="12" xs="12">
                        {/* Content */}
                        <div className="div-content-help">
                            <Row>
                                <Col md={8}>
                                    <div className='help-heading-gb'>Help</div>
                                    <Col md={6} className='left-container' >
                                    <Col md={12}>
                                        <div className='recommended-heading-help gbui-h5'>Recommended</div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='get-callback-heading-help gbui-h6'>Get a call back</div>
                                    </Col>
                                    {/* <Col md={12}>
                                        <div className='avrage-waiting-time gbui-menu-bar-2'>Average wait time:</div>
                                        <div className='time gbui-menu-bar-2'>7 Mins</div>
                                    </Col> */}
                                    <Col md={11}>
                                        <div className='div-margin'>
                                            <FormControl
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
                                                    onChange={this.handleChange}
                                                    inputProps={{
                                                        name: 'language',
                                                        id: 'select-labguage',
                                                    }}
                                                >
                                                    <MenuItem value={'English'}>English</MenuItem>
                                                    <MenuItem value={'Hindi'}>Hindi</MenuItem>
                                                    <MenuItem value={'Marathi'}>Marathi</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </Col>
                                    <Col md={11}>
                                        <div className='div-margin'>
                                            <FormControl
                                                className={classes.formControl}
                                                fullWidth
                                                margin="none">
                                                <InputLabel
                                                    htmlFor="phone"
                                                    classes={{
                                                        root: classes.input_label_root,
                                                        focused: classes.focused,
                                                    }}>
                                                    Phone Number
                                                    </InputLabel>
                                                <Input
                                                    id="phone"
                                                    name='mobile'
                                                    inputProps={{maxLength:'10'}}
                                                    value={this.state.mobile}
                                                    onChange={this.handleChange}
                                                    classes={{
                                                        root: classes.root_input,
                                                    }} />
                                            </FormControl>
                                        </div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='div-margin'>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={this.state.consent}
                                                        onChange={this.handleChangeCheckbox}
                                                        value={this.state.consent}
                                                        name="consent"
                                                    />
                                                }
                                                label="I agree to receive notifications(calls & sms) from Groupbima."
                                            />
                                        </div>
                                    </Col>
                                    <Col md={11}>
                                        <div className='div-margin2'>
                                            <ButtonLightSuccess onClick={this.handleHelpRequest} Text='Submit' fullWarningPink={true} disabled={!this.state.consent} />
                                        </div>
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
                                    </Col>
                                </Col>
                                <Col md={6}>
                                    <Col md={12}>
                                        <div className='recommended-heading-help gbui-h5'>Other options</div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='get-callback-heading-help gbui-h6'>Want to contact us</div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='div-margin2'>
                                            <a href="tel:+18003240987"><div className='helpline-number gbui-h6'>9707600600</div></a>
                                            <div className='helpline-text gbui-menu-bar-2'>Phone number</div>
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='div-margin2'>
                                          <a href="mailto:connect@groupbima.com">
                                            <div className='helpline-number gbui-h6'>connect@groupbima.com</div>
                                          </a>
                                            <div className='helpline-text gbui-menu-bar-2'>Customer Query, Claims & Policy Servicing</div>
                                        </div>
                                    </Col>
                                </Col>
                                </Col>
                                <Col md={4} style={{marginTop:'3.4rem'}}>
                                   <RightCard />
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

Help.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Help)