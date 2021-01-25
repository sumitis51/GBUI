import React from 'react'
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import './level2.css'
import ButtonLightSuccess from '../../Shared/ButtonLightSuccess/index';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import axios from 'axios';
import { connect } from 'react-redux';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';

import constants from '../../../constants/appConstants.json'

const styles = {
    snack:{
        marginTop:'6rem'
    },
};


class Level2 extends React.Component {
    componentDidMount() {
        const vm = this;
        this.props.onCurrentComponent('Level2Grievance.json');
        axios.get('/assets/json/Level2Grievance.json')
            .then((response) => {
                vm.props.onFetchLanguage(response.data[this.props.CurrentLanguage]);
            }, (error) => {
                
            })
    }

    state = {
        openSnack:false,
        show_additional: false,
        policyNo: '',
        customerName: '',
        email: '',
        mobile: '',
        refNo: '',
        complaints: '',
        policies: []
    }
    handleChange = name => event => {
        if (name === 'policyNo') {
            const currentPol = this.state.policies.filter(pol => pol.policyNo === event.target.value)[0]
            this.setState({ customerName: currentPol.name, email: currentPol.email, mobile: currentPol.mobile })
            
        }
        this.setState({
            [name]: event.target.value
        })
    }
    componentWillMount() {
        this.getPolicyNumbers()
    }
    getPolicyNumbers() {
        const token = localStorage.getItem("token")
        const params = {
            headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        }
        const vm = this;
        axios.get(`${constants.apiRootURL}/secure/policy-info`, params)
            .then(response => {
                this.setState({
                    policies: response.data
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

    saveLevel1 = () => {
        const token = localStorage.getItem("token")
        const params = {
            headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        }
        const vm = this;
        const { policyNumber, refNo, customerName, mobile, email, complaints } = this.state
        const data = {
            "policyNo": policyNumber,
            "complaintReferenceNo": refNo,
            "customerName": customerName,
            "mobile": mobile,
            "email": email,
            "complaints": complaints
        }
        axios.post(`${constants.apiRootURL}/secure/complaint-level2`, data, params)
            .then(response => {
                alert(response.data)
                this.setState({ show_additional: false })
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
        const {classes}=this.props
        return (
            <div style={{ paddingTop: '3rem' }}>
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
                        {this.props.FetchedLanguage ? this.props.FetchedLanguage.Level2Grievance : ''}
                    </h3>
                    <h3 className="level_1_heading_2">
                        Please fill the form to submit your grievance to<span style={{ color: '#ea0b4b' }}> Level 2 - Escalation </span>
                    </h3>
                    <Row>
                        <Col md="4">
                            <FormControl fullWidth>
                                <NativeSelect required
                                    value={this.state.policyNo}
                                    onChange={this.handleChange('policyNo')}
                                    input={<Input name="age" id="age-native-label-placeholder" />}
                                >
                                    <option value="">Select Policy Number</option>
                                    {this.state.policies.map(pol =>
                                        <option value={pol.policyNo}>{pol.policyNo}</option>
                                    )}
                                </NativeSelect>
                            </FormControl>

                            <TextField
                                label={this.props.FetchedLanguage ? this.props.FetchedLanguage.Level2InputLabelComplaintReferenceNumber : ''}
                                fullWidth
                                onChange={this.handleChange('refNo')}
                                margin="dense" />
                        </Col>
                        {!this.state.show_additional &&
                            <Col md={12}>
                                <p className="text_link_level_2">
                                    {this.props.FetchedLanguage ? this.props.FetchedLanguage.Level2InCaseYouDoNotHave : ''}
                                    &nbsp;<Link to="#" style={{ color: '#ea0b4b', whiteSpace: 'nowrap' }}>{this.props.FetchedLanguage ? this.props.FetchedLanguage.Level2ClickHere : ''}</Link>
                                </p>
                            </Col>}
                    </Row>
                    {!this.state.show_additional &&
                        <Row>
                            <Col md="5">
                                <div className="submit_1_level_1 mui--hidden-xs mui--hidden-sm">
                                    <ButtonLightSuccess fullWarningPink={true} Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.Level2ButtonTextSubmit : ''} onClick={() => {
                                        this.setState(
                                            { show_additional: true }
                                        )
                                    }} />
                                </div>
                                <div className="submit_1_level_2 mui--hidden-md mui--hidden-lg mui--hidden-xl">
                                    <ButtonLightSuccess fullWarningPink={true} Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.Level2ButtonTextSubmit : ''} fullWidth={true} onClick={() => {
                                        this.setState(
                                            { show_additional: true }
                                        )
                                    }} />
                                </div>
                            </Col>
                        </Row>
                    }
                    {this.state.show_additional &&
                        <div className="additional_level_1">
                            <h3 className="adtnl_details">{this.props.FetchedLanguage ? this.props.FetchedLanguage.Level2HeadingAdditionalDetail : ''}</h3>
                            <Row>
                                <Col md="4">
                                    <TextField
                                        label={this.props.FetchedLanguage ? this.props.FetchedLanguage.Level2InputLabelCustomerName : ''}
                                        margin="dense"
                                        onChange={this.handleChange('customerName')}
                                        value={this.state.customerName}
                                        fullWidth />
                                    <TextField
                                        label={this.props.FetchedLanguage ? this.props.FetchedLanguage.Level2InputLabelPhoneNumber : ''}
                                        margin="dense"
                                        onChange={this.handleChange('mobile')}
                                        value={this.state.mobile}
                                        fullWidth />
                                    <TextField
                                        label={this.props.FetchedLanguage ? this.props.FetchedLanguage.Level2InputLabelEmailId : ''}
                                        margin="dense"
                                        value={this.state.email}
                                        onChange={this.handleChange('email')}
                                        fullWidth />
                                </Col>
                            </Row>
                            <h3 className="f_c_heading">{this.props.FetchedLanguage ? this.props.FetchedLanguage.Level2HeadingFeedbackComplaints : ''}</h3>
                            <Row>
                                <Col md="9">
                                    <textarea rows="9" style={{ width: '100%', borderRadius: '4px' }}
                                        value={this.state.complaints}
                                        onChange={this.handleChange('complaints')}></textarea>
                                    <div className="mui--hidden-md mui--hidden-lg mui--hidden-xl" style={{ marginTop: '1rem', marginBottom: '3rem' }}>
                                        <ButtonLightSuccess fullWarningPink={true} Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.Level2ButtonTextSubmit : ''} fullWidth={true}
                                        onClick={this.saveLevel1} />
                                    </div>
                                    <div className="mui--hidden-sm mui--hidden-xs" style={{ float: 'right', marginTop: '1rem', marginBottom: '3rem' }}>
                                        <ButtonLightSuccess fullWarningPink={true} Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.Level2ButtonTextSubmit : ''}
                                        onClick={this.saveLevel1} />
                                    </div>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                value="checkedI"
                                            />
                                        }
                                        label={this.props.FetchedLanguage ? this.props.FetchedLanguage.Level2InputCheckboxLabel : ''}
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

Level2.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Level2));