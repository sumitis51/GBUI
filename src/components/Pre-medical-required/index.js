import React, { Component } from 'react'
import Container from 'muicss/lib/react/container'
import { MuiThemeProvider } from '@material-ui/core'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './index.css'
import ButtonLightSuccess from '../Shared/ButtonLightSuccess/index'
import MemberDetails from './Member-details-model/index'
import WorkFlow from './Work-flow/index'
import HeaderPanels from '../Health-Quotes/PanelsHeaderHealth'
import PaymentDetails from '../ProposalFormHealth/PaymentDetails/index'
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import PathlabModal from './Pathlab-Modal/index'
import PathlabModalView from './pathlab-view-modal/index'
import axios from 'axios'
import Snackbar from '@material-ui/core/Snackbar';

import constants from '../../constants/appConstants.json'

const styles = theme => ({
    snack:{
        marginTop:'6rem'
    },
    checkbox: {
        padding: '12px 10px 12px 28px',
        '&$checked': {
            color: '#ea0b4b',
        },
    },
    checked: {},
})

class PreMedicalRequired extends Component {
    state = {
        openSnack:false,
        groupbimaPlatform: true,
        premedical: {},
        proposalForm: {}
    };
    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };
    onClickMemberDetails = () => {
        this.props.onMemberDetails(true);

    }
    onClickSelectPathlab = () => {
        this.props.onSelectPathlab(true);
    }
    onhandleWorkflow = () => {
        this.props.onWorkFlow(true);
    }
    onClickViewPathlab = () => {
        this.props.onSelectPathlabView(true);
    }
    getProposerDetails() {
        console.log('hiii')
        axios.get(`${constants.apiRootURL}/proposer/proposal-form/${this.props.location.state.proposerId}`)
            .then(response => {
                this.setState({ proposalForm: response.data })
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
    componentWillMount() {
        if (this.props.location.state && this.props.currentPlan) {
            this.setState({ premedical: this.props.location.state })
            this.getProposerDetails()
        } else {
            this.props.history.push('/input-form-health')
            return false
        }

    }
    render() {
        const { classes , pincode } = this.props;
        return (
            <div className='pre-medical'>
                <MuiThemeProvider>
                    <Container fluid={true}>
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
                        <Row>
                            {/* <Col md={12} className='header-column mui--hidden-xs'>
                                <HeaderPanels />
                            </Col> */}
                            <Col md={7}>
                                {/* BAck to quotes link */}
                                <div className="back-link mui--hidden-xs">
                                    <img alt='back' src="/assets/back.png" /> &nbsp;
                                    BACK TO PROPOSAL FORM
                                </div>
                            </Col>
                            <Col xs={6} className='medical-column mui--hidden-xs'>
                                <div className='pre-medical-heading mui--hidden-xs'>Premedical Required</div>
                            </Col>
                            <Col xs={12} className='mui--visible-xs-block'>
                                <div className='medical-checkup'>Pre-medical Checkup Required</div>
                            </Col>
                            <Col xs={12} className='mui--visible-xs-block'>
                                <div className='some-lines'>Some awesome line</div>
                            </Col>
                            <Col md={5} xs={6} className='mui--hidden-xs'>
                                <Col md={12} xs={12} className='process-column'>
                                    <div className='process-main-text'>Process flow</div>
                                </Col>
                                <Col md={12} xs={12} className='view-column'>
                                    <div className='view-text' onClick={this.onhandleWorkflow}>View</div>
                                    {this.props.workflow !== 'undefine' &&
                                        <WorkFlow open={this.props.workflow} />}
                                </Col>
                            </Col>
                            <Col xs={12} style={{ padding: '6px 0px', opacity: '0.99', backgroundColor: '#f4f4f4' }} className='mui--visible-xs-block'>
                                <Col xs={8} className=' medical-column mui--visible-xs-block'>
                                    <div className='medical-required'>Medical Test Required</div>
                                </Col>
                                <Col xs={4}>
                                    <Col xs={12} className='process-column'>
                                        <div className='process-main-text'>Process flow</div>
                                    </Col>
                                    <Col xs={12} className='view-column'>
                                        <div className='view-text' onClick={this.onhandleWorkflow}>View</div>
                                        {this.props.workflow !== 'undefine' &&
                                            <WorkFlow open={this.props.workflow} />}
                                    </Col>
                                </Col>
                            </Col>
                            <Col md={8} xs={12} className='medical-required-row'>
                                <div className='medical-test-required-heading mui--hidden-xs'>
                                    <div className='medical-test-required-heading-text'>Medical Test Required</div>
                                </div>
                                <Paper square={true} className='policy-paper'>
                                    <Row className='policy-row'>
                                        <Col md={4} className='policy-column'>
                                            <div className='policy-container'>
                                                <Col md={12} xs={5} className='test-required-container'>
                                                    <div className='policy-text'>Policy Issuance</div>
                                                </Col>
                                                <Col md={12} xs={7} className='tests-required'>
                                                    <div className='policy-middle-text'>15- 20 Working Days</div>
                                                </Col>
                                            </div>
                                        </Col>
                                        <Col md={4} className='policy-column'>
                                            {/* <div className='policy-container'>
                                                <Col md={12} xs={6} className='test-required-container'>
                                                    <div className='policy-text'>Medical Test Required</div>
                                                </Col>
                                                <Col md={12} xs={6} className='tests-required'>
                                                    <div className='policy-age-text'>MER, FBS, ECG
                                                    <span className='policy-age-subtext'>for age 18 yrs - 45 yrs</span>
                                                    </div>
                                                    <div className='policy-age-text'>MER, FBS, ECG
                                                    <span className='policy-age-subtext'>for all</span>
                                                    </div>
                                                    <div className='policy-age-text'>MER, FBS, ECG
                                                    <span className='policy-age-subtext'>for age 18 yrs - 45 yrs</span>
                                                    </div>
                                                    <div className='policy-age-text'>MER, FBS, ECG
                                                    <span className='policy-age-subtext'>for age 18 yrs - 45 yrs</span>
                                                    </div>
                                                    <div className='policy-age-text'>MER, FBS, ECG
                                                    <span className='policy-age-subtext'>for age 18 yrs - 45 yrs</span>
                                                    </div>
                                                    <div className='policy-age-text'>MER, FBS, ECG, 2D ECHO,</div>
                                                    <div className='policy-age-text'> Lipids, Sr creatinine, LFT,</div>
                                                    <div className='policy-age-text'> Sr uric acid, USG Abd
                                                    <span className='policy-age-subtext'>for age 61 yrs - 65 yrs</span>
                                                    </div>
                                                </Col>
                                            </div> */}
                                        </Col>
                                        <Col md={4} xs={12} className='pathology-container'>
                                            <Col md={12} xs={12} className='pathology-column'>
                                                <div className='pathology-main-text'>Pathologies near you</div>
                                            </Col>
                                            {(this.state.premedical.premedicalRequiredFor||[]).map(item =>
                                                <Row>
                                                    <Col md={3} xs={3} className='pathology-view-column'>
                                                        <div className='pathology-main-text'>{item.relationship}:</div>
                                                    </Col>

                                                    <Col md={9} xs={9} className='pathology-view-column'>
                                                        <div className='pincode-text'>{pincode ? pincode : 'NA'}
                                                            <span onClick={this.onClickViewPathlab} className='view'>(View)</span>
                                                            <div className='test-result-pathlogy mui--visible-xs-block'>Pathologies Test result will be valid for only 90 days</div>
                                                        </div>
                                                        <PathlabModalView
                                                            open={this.props.pathlabview}
                                                            premedical={this.state.premedical}
                                                            proposalForm={this.state.proposalForm} />
                                                    </Col>
                                                </Row>
                                            )}
                                            {/* <Col md={3} xs={3} className='pathology-view-column'>
                                                <div className='pathology-main-text'>Parents:</div>
                                            </Col>

                                            <Col md={9} xs={9} className='pathology-view-column'>
                                                <div className='pincode-text'>282001
                                                    <span onClick={this.onClickViewPathlab} className='view'>(View)</span>
                                                    <div className='test-result-pathlogy mui--visible-xs-block'>Pathologies Test result will be valid for only 90 days</div>
                                                </div>
                                            </Col>
                                            <Col md={3} xs={3} className='pathology-view-column'>
                                                <div className='pathology-main-text'>In Laws:</div>
                                            </Col>
                                            <Col md={9} xs={9} className='pathology-view-column'>
                                                <div className='pincode-text'>282001
                                                    <span onClick={this.onClickViewPathlab} className='view'>(View)</span>
                                                    <div className='test-result-pathlogy mui--visible-xs-block'>Pathologies Test result will be valid for only 90 days</div>
                                                </div>
                                            </Col> */}
                                        </Col>
                                        <Col md={12} xs={12} className='policy-column'>
                                            <div className='medical-test-required'>
                                                <div className='medical-test-required-text'>Premedical Required for</div>
                                            </div>
                                        </Col>
                                        <div className='policy-paper'>
                                            {this.props.member !== 'undefine' &&
                                                <MemberDetails
                                                    history={this.props.history}
                                                    open={this.props.member}
                                                    premedical={this.state.premedical}
                                                    proposalForm={this.state.proposalForm} />}
                                            <Row className='user-row'>
                                                {this.state.premedical.premedicalRequiredFor ? this.state.premedical.premedicalRequiredFor.map(item =>
                                                    <Col md={4} className='user-container'>
                                                        <Col md={12} xs={6} className='self-text'>{item.relationship}:</Col>
                                                        <Col md={12} xs={6} className='name'>{item.memberName}
                                                            <span style={{color:' #ea0b4b'}}onClick={this.onClickMemberDetails} className='view'>(View)</span>
                                                        </Col>
                                                        <Col md={12} xs={6} className='type mui--hidden-xs'><ul>{item.premedicalTests.map(test => <li>{test}</li>)}</ul></Col>
                                                    </Col>
                                                ): ''}
                                                {/* <Col md={4} xs={12} className='user-column'>
                                                    <Col md={4} className='user-container'>
                                                        <Col md={12} xs={6} className='self-text'>Self:</Col>
                                                        <Col md={12} xs={6} className='name'>Mr.Arpit Sharma
                                                              <span onClick={this.onClickMemberDetails} className='view'>(View)</span>
                                                        </Col>
                                                        <Col md={12} xs={6} className='type mui--hidden-xs'>MER, FBS, ECG</Col>
                                                    </Col>
                                                    <Col md={12} className='user-container'>
                                                        <Col md={12} xs={6} className='self-text'>Spouse:</Col>
                                                        <Col md={12} xs={6} className='name'>Mrs. Girl Name
                                                               <span onClick={this.onClickMemberDetails} className='view'>(View)</span>
                                                        </Col>
                                                        <Col md={12} xs={6} className='type mui--hidden-xs'>MER, FBS, ECG</Col>
                                                    </Col>
                                                </Col> */}
                                                {/* <Col md={4} xs={12} className='user-column'>
                                                    <Col md={12} className='user-container'>
                                                        <Col md={12} xs={6} className='self-text'>Father:</Col>
                                                        <Col md={12} xs={6} className='name'>Mr.Arpit Sharma
                                                           <span onClick={this.onClickMemberDetails} className='view'>(View)</span>
                                                        </Col>
                                                        <Col md={12} xs={6} className='type mui--hidden-xs'>MER, FBS, ECG</Col>
                                                    </Col>
                                                    <Col md={12} className='user-container'>
                                                        <Col md={12} xs={6} className='self-text'>Son1:</Col>
                                                        <Col md={12} xs={6} className='name'>Master. Name
                                                             <span onClick={this.onClickMemberDetails} className='view'>(View)</span>
                                                        </Col>
                                                        <Col md={12} xs={6} className='type mui--hidden-xs'>MER, FBS, ECG</Col>
                                                    </Col>
                                                </Col>
                                                <Col md={4} xs={12} className='user-column'>
                                                    <Col md={12} className='user-container'>
                                                        <Col md={12} xs={6} className='self-text'>Mother:</Col>
                                                        <Col md={12} xs={6} className='name'>Mr.Arpit Sharma
                                                             <span onClick={this.onClickMemberDetails} className='view'>(View)</span>
                                                        </Col>
                                                        <Col md={12} xs={6} className='type mui--hidden-xs'>MER, FBS, ECG</Col>
                                                    </Col>
                                                    <Col md={12} className='user-container'>
                                                        <Col md={12} xs={6} className='self-text'>Son2:</Col>
                                                        <Col md={12} xs={6} className='name'>Master. Name
                                                            <span onClick={this.onClickMemberDetails} className='view'>(View)</span>
                                                        </Col>
                                                        <Col md={12} xs={6} className='type mui--hidden-xs'>MER, FBS, ECG</Col>
                                                    </Col>
                                                </Col> */}
                                            </Row>
                                        </div>
                                        <Col md={12} xs={12} className='policy-column'>
                                            <div className='medical-test-required'>
                                                <div className='medical-test-required-text'>Premedical Test Amount</div>
                                            </div>
                                        </Col>
                                        {this.state.premedical.premedicalRequiredFor &&  this.state.premedical.premedicalRequiredFor.map(item =>
                                            <Col md={4} className='policy-column'>
                                                <div className='policy-container'>
                                                    <Col md={12} xs={5} className='test-required-container'>
                                                        <div className='policy-text'>Cost to Medical Test</div>
                                                    </Col>
                                                    <Col md={12} xs={7} className='tests-required'>
                                                        <div className='policy-middle-text'>Rs.{item.cost}</div>
                                                    </Col>
                                                    <div className='policy-cost-text'>
                                                    100% cost will handle by an insurer. No deduction from the premium on non- issuance of the policy, 
                                                    however, 100% cost deducted if cancellation raised by customer post-policy issuance
                                                </div>
                                                </div>
                                                <div className='result-column'>
                                                    <div className='test-result'>Pathologies Test result will be valid for only 90 days</div>
                                                </div>
                                            </Col>
                                        )}

                                        {/* <Col md={4} className='policy-column'>
                                            <div className='policy-container'>
                                                <Col md={12} xs={5} className='test-required-container'>
                                                    <div className='policy-text'>Cost to Medical Test</div>
                                                </Col>
                                                <Col md={12} xs={7} className='tests-required'>
                                                    <div className='policy-middle-text'>Rs. 800/- to Rs. 1000/-</div>
                                                </Col>

                                                <div className='policy-cost-text'>
                                                    100% cost will handle by inurer. No deduction from premium on non- issuanceof policy, however,
                                                    100% cost deducted if cancellation raised by customer post policy issunace
                                                </div>
                                            </div>
                                            <div className='result-column'>
                                                <div className='test-result'>Pathologies Test result will be valid for only 90 days</div>
                                            </div>
                                        </Col>
                                        <Col md={4} className='policy-column'>
                                            <div className='policy-container'>
                                                <Col md={12} xs={5} className='test-required-container'>
                                                    <div className='policy-text'>Cost to Medical Test</div>
                                                </Col>
                                                <Col md={12} xs={7} className='tests-required'>
                                                    <div className='policy-middle-text'>Rs. 800/- to Rs. 1000/-</div>
                                                </Col>

                                                <div className='policy-cost-text'>
                                                    100% cost will handle by inurer. No deduction from premium on non- issuanceof policy, however,
                                                    100% cost deducted if cancellation raised by customer post policy issunace
                                                </div>
                                            </div>
                                            <div className='result-column'>
                                                <div className='test-result'>Pathologies Test result will be valid for only 90 days</div>
                                            </div>
                                        </Col> */}
                                    </Row>
                                </Paper>

                                {/* <Col md={12} className='license-row mui--hidden-xs'>
                                    <Col md={1} className='license-column'>
                                        <img className='license-image' src='assets/bitmap.jpg' alt='license'></img>
                                        <div className='licesnse-text'>LICENSED No.123243567yterwq</div>
                                    </Col>
                                    <Col md={1} >
                                        <div className='license-rect'></div>
                                    </Col>
                                    <Col md={1}>
                                        <div className='license-rect'></div>
                                        <div style={{
                                            fontSize: '10px',
                                            fontWeight: '600',
                                            textAlign: 'center',
                                            color: '#333333'
                                        }} >SECURE</div>
                                    </Col>
                                    <Col md={1}>
                                        <div className='license-rect'></div>
                                    </Col>
                                    <Col md={1}>
                                        <div className='license-rect'></div>
                                    </Col>
                                    <Col md={1}>
                                        <div className='license-rect'></div>
                                        <div style={{
                                            fontSize: '10px',
                                            fontWeight: '600',
                                            textAlign: 'center',
                                            color: '#333333'
                                        }} >PAYMENT NETWORKS</div>
                                    </Col>
                                    <Col md={1}>
                                        <div className='license-rect'></div>
                                    </Col>
                                    <Col md={1}>
                                        <div className='license-rect'></div>
                                    </Col>
                                    <Col md={1}>
                                        <div className='license-rect'></div>
                                    </Col>
                                    <Col md={1}>
                                        <div className='license-rect'></div>
                                    </Col>
                                    <Col md={1}>
                                        <div className='license-rect'></div>
                                    </Col>
                                </Col> */}
                                <Col xs={12} style={{ textAlign: 'center' }} className='button-row mui--visible-xs-block mui--visible-sm-block'>
                                    <ButtonLightSuccess onClick={this.onClickSelectPathlab} style={{ display: 'inline' }} buttonTextFull={true} Text='Procedd to Proposal Summary' />
                                    {this.props.pathlab !== 'undefine' &&
                                        <PathlabModal
                                            open={this.props.pathlab}
                                            premedical={this.state.premedical}
                                            proposalForm={this.state.proposalForm} />
                                    }
                                </Col>
                            </Col>
                            <Col md="4">
                                <div className="mui--hidden-xs mui--hidden-sm" style={{ backgroundColor: '#ffffff', padding: '20px 0px' }}>
                                    <PaymentDetails component='preMedical' />
                                    <div style={{ margin: '10px 0px' }}><Divider /></div>
                                    <div>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        classes={{ root: classes.checkbox, checked: classes.checked, }}
                                                        checked={this.state.groupbimaPlatform}
                                                        onChange={this.handleChange('groupbimaPlatform')}
                                                        value="false" />
                                                }
                                                label="Declaration of Using Groupbima platform"
                                            />
                                        </FormGroup>
                                    </div>
                                    <div style={{ padding: '0px 15px' }}>
                                        <ButtonLightSuccess style={{ display: 'inline' }} onClick={this.onClickSelectPathlab} fullWarningPink={true} Text='Proceed to Select Pathologies' />
                                        {this.props.pathlab !== 'undefine' &&
                                            <PathlabModal
                                                open={this.props.pathlab}
                                                premedical={this.state.premedical}
                                                proposalForm={this.state.proposalForm}
                                                history={this.props.history} />
                                        }
                                    </div>
                                </div>
                            </Col>
                            <Col md={12} className='mui--visible-xs-block'>
                                <div className='ChatDiv'>
                                    <i class="material-icons" style={{ color: 'white', fontSize: '2rem', marginTop: '15px', marginLeft: '0.8rem' }}>
                                        chat_bubble
                                        </i>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </MuiThemeProvider>
            </div >
        )
    }
}

PreMedicalRequired.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        member: state.popup.member_detail_visible,
        workflow: state.popup.work_flow_visible,
        pathlab: state.popup.select_pathlab,
        pathlabview: state.popup.pathlab_view_modal,
        currentPlan: state.currentPlan.details ? state.currentPlan.details : undefined,
        pincode : state.proposalFormHealth && state.proposalFormHealth.proposalFormHealthData && state.proposalFormHealth.proposalFormHealthData.pincode 
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onMemberDetails: (member) => dispatch({ type: 'MEMBER_DETAIL_VISIBLE', member }),
        onWorkFlow: (workflow) => dispatch({ type: 'WORK_FLOW_VISIBLE', workflow }),
        onSelectPathlab: (pathlab) => dispatch({ type: 'SELECT_PATHLAB', pathlab }),
        onSelectPathlabView: (pathlabsview) => dispatch({ type: 'PATHLAB_VIEW_MODAL', pathlabsview }),
    };
};


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PreMedicalRequired))