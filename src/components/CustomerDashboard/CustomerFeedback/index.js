import React, { Component } from 'react'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import RadioGroup from '@material-ui/core/RadioGroup';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import constants from '../../../constants/appConstants.json'
import Rightcard from '../../Help/feedbackRatings/index'
import Drawer from '../../Shared/Drawer/index';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonLightSuccess from '../../Shared/ButtonLightSuccess/index';
import './index.css'

const styles = theme => ({
    snack:{
        marginTop:'6rem'
    },
    root: {
        color: '#000000',
        '&$checked': {
            color: '#ea0b4b',
        },
    },
    disabledButton: {
        backgroundColor:'yellow important'
      },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    checked: {},
});

class CustomerFeedback extends Component {
    state = {
        openSnack:false,
        policyNumber: '',
        feedbackForm: false,
        feedbackData: [],
        finaFeedbackInfo: {},
        questinData: [
            {
                id: 0,
                question: 'Purpose of your feedback',
                options: [
                    {
                        id: 0,
                        option: 'Buy'
                    },
                    {
                        id: 1,
                        option: 'Claim'
                    },
                    {
                        id: 2,
                        option: 'Renew'
                    },
                    {
                        id: 2,
                        option: 'Policy Servicing'
                    },
                ],
                css: {
                    color: '#808080'
                },
                className: 'gbui-body-2, purpose',
                name: 'feedbackPurpose',
                value: ''
            },
            {
                id: 1,
                question: 'Question 1: Did we meet your expectations?',
                options: [
                    {
                        id: 0,
                        option: 'Yes'
                    },
                    {
                        id: 1,
                        option: 'No'
                    }
                ],
                css: {
                    color: '#000000'
                },
                className: 'gbui-body-1',
                name: 'question1',
                value: ''
            },
            {
                id: 2,
                question: 'Question 2: How much effort did you personally have to put forth to handle your request?',
                options: [
                    {
                        id: 0,
                        option: 'A small amount of effort'
                    },
                    {
                        id: 1,
                        option: 'An usual amount of effort'
                    },
                    {
                        id: 2,
                        option: 'A lot of effort'
                    }
                ],
                css: {
                    color: '#000000'
                },
                className: 'gbui-body-1',
                name: 'question2',
                value: ''
            }
        ],
        policyNo: '',
        email: '',
        mobile: '',
        name: '',
        shareYourViews: '',
        feedbackClear: [],
        open: false,
        checkValidity:true
    }
    handleChange = name => event => {

        const pol = this.state.feedbackData.filter(pol => pol.policyNo === event.target.value)[0]
        console.log(name, pol)
        this.setState({
            [name]: event.target.value,
            name: pol.name,
            email: pol.email,
            mobile: pol.mobile
        })
    }
    handleFeedbackRadio = (e, item) => {
        item.value = e.target.value;
        let questinData = [...this.state.questinData];
        debugger
        questinData = questinData.map(ques => {
            if (ques.id !== item.id) {
                return ques;
            }
             return item;
        })  
        this.setState({ ...this.state, questinData })
       
        let checkedArrayValue=questinData.map(item=>item.value).filter(selectValue=>selectValue)
        if(checkedArrayValue.length==3){
            this.setState({checkValidity:false})
         }else{
            this.setState({checkValidity:true})
         }
    }
    handleFeedbackForm = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleClose = (event) => {
        this.setState({ open: false })
    }
    handleFeedbackSubmit = (event) => {
        const { policyNo, name, email, mobile, questinData, shareYourViews } = this.state;
        let [{ value: feedbackPurpose },{ value: question1 },{ value: question2 }] = questinData;
        const data = {
            "policyNo": policyNo,
            "name": name,
            "email": email,
            "mobile": mobile,
            "feedbackPurpose": feedbackPurpose,
            "question1": question1,
            "question2": question2,
            "shareYourViews": shareYourViews
        }
        const token = localStorage.getItem("token")
        const params = {
            headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        }
        axios.post(`${constants.apiRootURL}/secure/feedback`, data, params)
            .then(response => {
                this.setState({ open: true })
                //    alert(JSON.stringify(response.data), {

                //     });
                this.state.questinData.map(item => {
                    let it = item;
                    it.value = ''
                    this.state.feedbackClear.push(it)
                })
                this.setState({
                    feedbackForm: false,
                    questinData: this.state.feedbackClear,
                    shareYourViews: '',
                })
            }).catch(error => {
                console.log(error)
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

    handlePolicyNumber = () => {
        this.setState({
            feedbackForm: true
        })
    }

    getFeedbackPolicy() {
        const vm = this
        const token = localStorage.getItem("token")
        const params = {
            headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        }

        axios.get(`${constants.apiRootURL}/secure/policy-info`, params)
            .then(response => {
                vm.setState({ feedbackData: response.data || [] })
                // vm.props.onMyAccountChangePopupShow()

            })
            .catch(error => {
                const status = error.response.status
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

    componentWillMount() {
        this.getFeedbackPolicy()
    }

    render() {
        const { classes } = this.props;
       
    console.log(this.state.feedbackForm,'this.state.feedbackForm')
        return (
            <div className='customer-feedback'>
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
                    <Col md={2} className='mui--hidden-xs mui--hidden-sm'>
                        <div className='mui--hidden-xs mui--hidden-sm'><Drawer authenticate={true} variant="permanent" /></div>
                    </Col>
                    <Col md={10} xs={12}>
                        <Col md={8} xs={12} className='feedback-container'>
                            <Col md={12} xs={12}>
                                <div className='main-heading-1 gbui-menu-bar-1'>Feedback</div>
                            </Col>
                            <Col md={5} xs={12} >
                                <FormControl fullWidth className={classes.formControl}>
                                    <NativeSelect
                                        value={this.state.policyNo}
                                        onChange={this.handleChange('policyNo')}
                                        input={<Input name="age" id="age-native-label-placeholder" />}
                                    >
                                        <option value="">Select Policy Number</option>
                                        {this.state.feedbackData.map(item => <option value={item.policyNo}>{item.policyNo}</option>)}
                                    </NativeSelect>
                                </FormControl>
                            </Col>
                            <Col md={3} xs={12}>
                                <div className='btn-submit'>
                              {!this.state.policyNo?
                              <ButtonLightSuccess 
                              onClick={this.handlePolicyNumber} 
                              disabled={this.state.feedbackForm===false?!this.state.policyNo:this.state.policyNo}
                              feedbackWarning={true} 
                              Text='Submit' />:
                              this.state.feedbackForm===true?
                              <ButtonLightSuccess 
                              onClick={this.handlePolicyNumber} 
                              disabled={this.state.feedbackForm===false?!this.state.policyNo:this.state.policyNo}
                              feedbackWarning={true} 
                              Text='Submit' />:
                              <ButtonLightSuccess 
                              onClick={this.handlePolicyNumber} 
                              disabled={this.state.feedbackForm===false?!this.state.policyNo:this.state.policyNo}
                              feedbacksubmit={true} 
                              Text='Submit' /> }
                              
                                </div>
                            </Col>
                            {this.state.feedbackForm &&
                                <Col md={12} xs={12} className='feedback-column'>
                                    <div className='customer-feedback-form'>
                                        <Col md={4} xs={12}>
                                            <TextField
                                                margin="dense"
                                                label='Full Name'
                                                name={"name"}
                                                fullWidth
                                                value={this.state.name}
                                                onChange={this.handleFeedbackForm} />
                                        </Col>
                                        <Col md={4}>
                                            <TextField
                                                margin="dense"
                                                label='Mail Id'
                                                name={"email"}
                                                value={this.state.email}
                                                fullWidth
                                                onChange={this.handleFeedbackForm} />
                                        </Col>
                                        <Col md={4}>
                                            <TextField
                                                margin="dense"
                                                label='Phone Number'
                                                fullWidth
                                                name={"mobile"}
                                                inputProps={{maxLength:'10'}}
                                                value={this.state.mobile}
                                                onChange={this.handleFeedbackForm} />
                                        </Col>
                                        {(this.state.questinData || []).map(item => {
                                            return (
                                                <Col md={12}>
                                                    <div className={item.className} style={item.css}>
                                                        {item.question}
                                                    </div>
                                                    <FormControl  component="fieldset" required>
                                                        <FormLabel component="legend">{this.props.FetchedLanguage ?
                                                            this.props.FetchedLanguage.FeedbackInputLabelPurposeOfYourFeedback : ''}</FormLabel>
                                                        <RadioGroup row
                                                            aria-label="Purpose Of Your Feedback"
                                                            name={item.name}
                                                            value={item.value}
                                                            onChange={(e) => this.handleFeedbackRadio(e, item)}
                                                        >
                                                            {(item.options || []).map(option => (
                                                                <FormControlLabel value={option.option} control={
                                                                    <Radio
                                                                        classes={{
                                                                            root: classes.root,
                                                                        }}
                                                                    />
                                                                } label={option.option} />
                                                            ))}
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Col>
                                            )
                                        })}
                                        <Col md={12} xs={12}>
                                            <div className='share-views gbui-body-1'>Share your views</div>
                                        </Col>
                                        <Col md={12} xs={12}>
                                            <textarea rows="9" className='textarea' style={{ width: '100%', borderRadius: '4px' }} 
                                            value={this.state.shareYourViews} name={"shareYourViews"} onChange={this.handleFeedbackForm}></textarea>
                                        </Col>
                                        <Col md={12} xs={12}>
                                            <div className='submit-btn'>
                                          {this.state.checkValidity ?
                                           <ButtonLightSuccess 
                                           feedbackdisabled={true}
                                           disabled={this.state.checkValidity}  
                                           onClick={this.handleFeedbackSubmit}
                                               Text='Submit' />
                                            :<ButtonLightSuccess 
                                            feedbackmessage={true}
                                            disabled={this.state.checkValidity}  
                                            onClick={this.handleFeedbackSubmit}
                                                Text='Submit' />}
                                            </div>
                                        </Col>
                                    </div>
                                </Col>
                            }
                        </Col>
                        <Col md={4} xs={12} className='right-column'>
                            <Rightcard />
                        </Col>
                    </Col>
                </Row>
                <div>

                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        open={this.state.open}
                        autoHideDuration={6000}
                        onClose={this.handleClose}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">Thanks for sharing your feedback</span>}
                        action={[
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                className={classes.close}
                                onClick={this.handleClose}
                            >
                            </IconButton>,
                        ]}
                    />
                </div>

            </div>
        )
    }
}

CustomerFeedback.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomerFeedback)