import React from 'react'
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import './level3.css'
import ButtonLightSuccess from '../../Shared/ButtonLightSuccess/index';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import axios from 'axios';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import constants from '../../../constants/appConstants.json'
import Snackbar from '@material-ui/core/Snackbar';



const styles = theme => ({
    snack:{
        marginTop:'6rem'
    },
    label: {
        fontFamily: 'Source Sans Pro',
        fontSize: '12px',
        color: '#aaaaaa'
    },
    selectOption: {
        fontFamily: 'Source Sans Pro',
        fontSize: '16px',
        color: '#000000'
    },

})



class Level3 extends React.Component {
    componentDidMount() {
        let token = localStorage.getItem('token')
        const vm = this;
        this.props.onCurrentComponent('Level3Grievance.json');
        axios.get('/assets/json/Level3Grievance.json')
            .then((response) => {
                vm.props.onFetchLanguage(response.data[this.props.CurrentLanguage]);
            }, (error) => {
              
            })
            let config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            let thirdLevelComplaint = {
                policyNo: this.state.policyNo,
                level2ReferenceNo: this.state.level2ReferenceNo,
                customerName: this.state.customerName,
                mobile: this.state.mobile,
                email: this.state.email,
                complaints: this.state.complaints,
            }
            axios.get(`${constants.apiRootURL}/secure/policy-info`, config)
                .then(response => {
                    this.setState({
                        policies:response.data,
                        policyNo:response.data.policyNo
                    })
                   
                }).catch(error => {
                    if(error.response.status === 500) {
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
                    }
                })
    }
    
      handleClose = () => {
        this.setState({ open: false });
      };

    handleSubmitForm = () =>{
        let token = localStorage.getItem('token')
            let config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            let thirdLevelComplaint = {
                policyNo: this.state.policyNo,
                level2ReferenceNo: this.state.level2ReferenceNo,
                customerName: this.state.customerName,
                mobile: this.state.mobile,
                email: this.state.email,
                complaints: this.state.complaints,
            }
            axios.post(`${constants.apiRootURL}/secure/complaint-level3`, thirdLevelComplaint, config)
                .then(response => {
                    this.setState({
                        open: true,
                    })
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

    state = {
        openSnack:false,
        show_additional: false,
        policyNo:'',
        level2ReferenceNo: '',
        customerName: '',
        mobile: '',
        email: '',
        complaints: '',
        authorization:false,
        open: false,
        policies:[]
    }
    handleChange = name => event =>{
       
        this.setState({
            [name]:event.target.value
        })
    }

    render() {
        const { classes } = this.props;
        return(
            <div style={{paddingTop: '3rem'}}>
                <div className="mui-container">
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
                    <h3 className="level_1_heading">
                        Level 3 - Grievance
                    </h3>
                    <h3 className="level_1_heading_2">
                       Please fill the form to submit your grievance to<span style={{color:'#ea0b4b'}}> Level 3 - Escalation </span>
                    </h3>
                    <Row>
                        <Col md="4">
                            <FormControl  fullWidth className={classes.formControl}>
                                <NativeSelect required
                                    value={this.state.policyNo}
                                    onChange={this.handleChange('policyNo')}
                                    input={<Input  name="age" id="age-native-label-placeholder" />}
                                >
                                   {this.state.policies.map(item =>
                                       <option value={item.policyNo}>{item.policyNo}</option>
                                    )}
                                </NativeSelect>
                            </FormControl>

                            <TextField required
                                value={this.state.level2ReferenceNo}
                                onChange={this.handleChange('level2ReferenceNo')}
                                label='Enter Level 2 reference number'
                                fullWidth
                                margin="dense"/>
                        </Col>
                        <Col md={12}>
                            {!this.state.show_additional &&
                                <p className="text_link_level_2">
                                In case you do not have a Service Request/Complaint reference Number,
                                    &nbsp;<Link to="/level-2" style={{color: '#ea0b4b', whiteSpace: 'nowrap'}}> Click Here</Link>
                                </p>
                            }
                        </Col>
                    </Row>
                    {!this.state.show_additional &&
                        <Row>
                            <Col md="5">
                                <div className="submit_1_level_1 mui--hidden-xs mui--hidden-sm">
                                    <ButtonLightSuccess  fullWarningPink={true} Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.Level3ButtonTextSubmit : ''} onClick={() => {this.setState(
                                        {show_additional: true}
                                    )}}/>
                                </div>
                                <div className="submit_1_level_2 mui--hidden-md mui--hidden-lg mui--hidden-xl">
                                    <ButtonLightSuccess  fullWarningPink={true} Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.Level3ButtonTextSubmit : ''} fullWidth={true} onClick={() => {this.setState(
                                        {show_additional: true}
                                    )}}/>
                                </div>
                            </Col>
                        </Row>
                    }
                    {this.state.show_additional &&
                        <div className="additional_level_1">
                            <h3 className="adtnl_details">{this.props.FetchedLanguage ? this.props.FetchedLanguage.Level3HeadingAdditionalDetail : ''}</h3>
                            <Row>
                                <Col md="4">
                                    <TextField
                                        value={this.state.customerName}
                                        onChange={this.handleChange('customerName')}
                                        label={this.props.FetchedLanguage ? this.props.FetchedLanguage.Level3InputLabelCustomerName : ''}
                                        margin="dense"
                                        fullWidth />
                                    <TextField
                                        value={this.state.mobile}
                                        onChange={this.handleChange('mobile')}
                                        label={this.props.FetchedLanguage ? this.props.FetchedLanguage.Level3InputLabelPhoneNumber : ''}
                                        margin="dense"
                                        fullWidth />
                                    <TextField
                                        value={this.state.email}
                                        onChange={this.handleChange('email')}
                                        label={this.props.FetchedLanguage ? this.props.FetchedLanguage.Level3InputLabelEmailId : ''}
                                        margin="dense"
                                        fullWidth />
                                </Col>
                            </Row>
                            <h3 className="f_c_heading">{this.props.FetchedLanguage ? this.props.FetchedLanguage.Level3HeadingFeedbackComplaints : ''}</h3>
                                <Row>
                                    <Col md="9">
                                        <textarea  
                                         value={this.state.complaints}
                                         onChange={this.handleChange('complaints')} rows="9" style={{width: '100%', borderRadius: '4px'}}></textarea>
                                        <div className="mui--hidden-md mui--hidden-lg mui--hidden-xl" style={{marginTop: '1rem', marginBottom: '3rem'}}>
                                            <ButtonLightSuccess onClick={this.handleSubmitForm} disabled={!this.state.authorization} fullWarningPink={true} Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.Level3ButtonTextSubmit : ''} fullWidth={true}/>
                                        </div>
                                        <div className="mui--hidden-sm mui--hidden-xs" style={{float: 'right', marginTop: '1rem', marginBottom: '3rem'}}>
                                            <ButtonLightSuccess onClick={this.handleSubmitForm} disabled={!this.state.authorization} fullWarningPink={true} Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.Level3ButtonTextSubmit : ''}/>
                                        </div>
                                        <FormControlLabel
                                            control={
                                                <Checkbox onChange={() => {this.setState({authorization:true})}}
                                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                value="checkedI"
                                                />
                                            }
                                            label={this.props.FetchedLanguage ? this.props.FetchedLanguage.Level3InputCheckboxLabel : ''}
                                        />
                                          <Snackbar
                                             anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'center',
                                              }}
                                            open={this.state.open}
                                            onClose={this.handleClose}
                                            ContentProps={{
                                                'aria-describedby': 'message-id',
                                            }}
                                            message={<span id="message-id">Your Complaint request has been accepted</span>}
                                            />
                                    </Col>
                                </Row>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

Level3.propTypes = {
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


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Level3))