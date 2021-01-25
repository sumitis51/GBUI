import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import { MuiThemeProvider } from '@material-ui/core/styles'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import { connect } from 'react-redux'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Paper from '@material-ui/core/Paper'
import ButtonLightSuccess from '../../Shared/ButtonLightSuccess/index'
import axios from 'axios';
import constants from '../../../constants/appConstants.json'
import Radio from '@material-ui/core/Radio'
import Snackbar from '@material-ui/core/Snackbar';


import './index.css'

const styles = theme => ({
    snack: {
        marginTop: '6rem'
    },
    root: {
        flexGrow: 1,
        padding: '0 24px 0px ',
    },
    tabsRoot: {
        borderBottom: '1px solid #aaaaaa',
    },
    tabRoot: {
        minWidth: '33%',
        fontSize: '14px',
        color: '#000000',
        textTransform: 'capitalize',
        fontFamily: [
            'Nunito'
        ].join(','),
        '&$tabSelected': {
            color: '#ea0b4b',
        },
    },
    tabParents: {
        minWidth: '50%',
        fontSize: '14px',
        color: '#000000',
        textTransform: 'capitalize',
        fontFamily: [
            'Nunito'
        ].join(','),
        '&$tabSelected': {
            color: '#ea0b4b',
        },
    },
    tabsIndicator: {
        backgroundColor: '#ea0b4b',
    },
    radio: {
        color: '#000000',
        '&$checked': {
            color: '#ea0b4b',
        },
    },
    checked: {},
    tabSelected: {},
    checkbox: {
        '&$checked': {
            color: '#ea0b4b',
        },
        label: {
            fontFamily: 'Nunito',
            fontSize: '14px',
            color: '#000000'
        }
    },
    checkboxPathlabName: {
        padding: 0,
        '&$checked': {
            color: '#ea0b4b',
        },
        label: {
            fontFamily: 'Nunito',
            fontSize: '14px',
            color: '#000000'
        }
    },
    card: {
        minWidth: 275,
        boxShadow: 'none',
        border: '1px solid #aaaaaa',
        padding: '7px 12px',
        margin: '8px 0px 8px 0px',
    },
});



class SelectPathlab extends Component {
    constructor(props) {
        super();
        this.state = {
            openSnack: false,
            value: 0,
            parents: 0,
            pincode: '',
            sameForAllMembers: true,
            pathlabName: true,
            pathlabDetail: [],
            members: [],
        }
    }

    componentWillMount() {
        if (this.props.currentPlan) {
            const pincode = this.props.proposalFormDataHealth ? this.props.proposalFormDataHealth.pincode : 201307
            this.setState({
                pincode: pincode
            })
            let pinCode = parseInt(pincode, 10)
            console.log(pinCode)
            const token = localStorage.getItem("token")
            const params = {
                headers: {
                    Authorization: 'Bearer ' + token //the token is a variable which holds the token
                }
            }
            // const vm = this;
            axios.get(`${constants.apiRootURL}/secure/pathology-center/${this.props.currentPlan.insurerId}/${pinCode}`, params)
                .then(response => {
                    console.log('pincode', response.data)
                    this.setState({ pathlabDetail: response.data })
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

    }

    handleClose = () => {
        this.props.onSelectPathlab(false)
    };
    handleChangePin = name => event => {
        const pincodelength = event.target.value
        if (pincodelength.length <= 6) {
            this.setState({
                [name]: event.target.value,
            });
        }
        console.log('event', pincodelength, this.state.pincode.length)
        if (pincodelength.length === 6) {
            const token = localStorage.getItem("token")
            const params = {
                headers: {
                    Authorization: 'Bearer ' + token //the token is a variable which holds the token
                }
            }
            // const vm = this;
            axios.get(`${constants.apiRootURL}/secure/pathology-center/${this.props.currentPlan.insurerId}/${pincodelength}`, params)
                .then(response => {
                    console.log('pincode', response.data)
                    const data = response.data
                    this.setState({ pathlabDetail: data })
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
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };
    handleChangeParents = (event, parents) => {
        this.setState({ parents });
    };
    handleChangeCheckbox = (memberId, pathlabId, pathlabName,pathlabaddress, index) => event => {
        const members = []
        this.props.premedical.premedicalRequiredFor.map(prf => {
            this.props.proposalForm.insuredMembersList ? this.props.proposalForm.insuredMembersList.map((item, index) => {
                prf.relationship === item.relationship ? members.push(item) : ''
            }) : ''
        })

        const currentLab = this.state.pathlabDetail.find(pl => pl.id === pathlabId)[0];
        const pathlabDetails = { memberId: memberId, pathlabId: pathlabId, pathlabName: pathlabName,pathlabaddress : pathlabaddress};


        let membs = members
        // members.map((item,index) => {
        //     if(memberId === memberId) {
        //         membs[index].pathlabDetails = pathlabDetails
        //     }
        // })
        membs[this.state.value].pathLabDetails = pathlabDetails
        this.setState({ pathlabName: pathlabId, memberId: memberId, members: members,pathlabaddress : pathlabaddress });
        console.log(membs)
        // alert(memberId + "  " + pathlabId)
    };
    handleSubmitNoPathLab = () => {
        let currentPlan = this.props.currentPlan
        currentPlan.proposalSummary = true
        currentPlan.premedical = this.props.premedical
        currentPlan.updatedMem = this.state.members
        this.props.premedical.postPay ? this.props.history.push('/proposal-form-health', currentPlan) : this.props.history.push('/track-your-policy')
    }
    handleSubmit = () => {

        const members = this.state.members
        // this.props.premedical.premedicalRequiredFor.map(prf => {
        //     this.props.proposalForm.insuredMembersList ? this.props.proposalForm.insuredMembersList.map((item, index) => {
        //         prf.relationship === item.relationship ? members.push(item) : ''
        //     }) : ''
        // })
        const pathLabDetails = []
        members.map((item, index) => {
            console.log(item,'item')
            item.pathLabDetails !== undefined ? pathLabDetails.push(item.pathLabDetails) : ''
        })
        const token = localStorage.getItem("token")
        const params = {
            headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        }
        console.log(pathLabDetails, members)

        axios.post(`${constants.apiRootURL}/secure/save-pathlab`, pathLabDetails, params)
            .then(response => {
                let currentPlan = this.props.currentPlan
                currentPlan.proposalSummary = true
                currentPlan.premedical = this.props.premedical
                currentPlan.updatedMem = members
                console.log(currentPlan)
                this.props.premedical.postPay ? this.props.history.push('/proposal-form-health', currentPlan) : this.props.history.push('/track-your-policy')
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
    render() {
        const { fullScreen, classes } = this.props;
        const { value, parents } = this.state;
        // To maintain the same order for tab members and also to show only those members which are eligible for premedical
        const members = []
        this.props.premedical.premedicalRequiredFor.map(prf => {
            this.props.proposalForm.insuredMembersList ? this.props.proposalForm.insuredMembersList.map((item, index) => {
                prf.relationship === item.relationship ? members.push(item) : ''
            }) : ''
        })
        console.log(members,'this.props.premedical')
        const proposalForm = this.props.proposalForm
        return (
            <MuiThemeProvider>
                <Dialog className="select-pathlab"
                    open={this.props.open}
                    onClose={() => { this.props.onSelectPathlab(false) }}
                    maxWidth="md"
                    fullScreen={fullScreen}
                    aria-labelledby="simple-dialog-title">
                    <DialogContent className='dialogue-content'>
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
                            <Col md={9} xs={10}>
                                <div className='select-pathlab-heading'>Select Pathologies for premedical</div>
                            </Col>
                            <Col md={3} xs={2}>
                                <i onClick={this.handleClose} class="material-icons" style={{ color: '#808080', float: 'right' }}>
                                    close
                                </i>
                            </Col>
                            <Col md={12} xs={12}>
                                <div className='notify'>We will notify you by email what all pathologies you have selected  for premedical checkup</div>
                            </Col>
                            <Col md={12} xs={12} className='tab-row'>
                                <Tabs variant="fullWidth" classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
                                    scrollable value={value} onChange={this.handleChange}>
                                    {/* <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Labs for Self + 2" />
                                    <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Labs for parents" />
                                    <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Labs for In-laws" /> */}
                                    {this.props.premedical.premedicalRequiredFor.map(item =>
                                        <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label={`Labs for ${item.relationship}`} />)
                                    }
                                </Tabs>
                                {/* {value === 1 && <div>
                                    <Tabs variant="fullWidth" classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
                                        scrollable value={parents} onChange={this.handleChangeParents}>
                                        <Tab classes={{ root: classes.tabParents, selected: classes.tabSelected }} label="Your Father" />
                                        <Tab classes={{ root: classes.tabParents, selected: classes.tabSelected }} label="Your Mother" />
                                    </Tabs>
                                </div>} */}
                                {members.map((item, index) =>
                                    <div>
                                        {value === index &&
                                            <div>
                                                <Row className='insurer-row'>
                                                    <Col md={3} xs={4}>
                                                        <div className='image-insurer'>
                                                            <img src={`${constants.mediaBucketURL}/${proposalForm.insurerLogo}`} alt='kotak' className='insurer-pic' />
                                                        </div>
                                                    </Col>
                                                    <Col md={7} xs={8}>
                                                        <div className='policy-name'>{proposalForm.planName}</div>
                                                        {/* <div className='customer-rating'>Customers Rating:<span className='rating'>4.7</span>
                                                            <span className='rating-star'><i style={{ color: '#efce4a', fontSize: '12px' }} class="material-icons">
                                                                star_rate
                                                    </i></span></div>
                                                        <div className='customer-rating'>GB Rating:<span className='rating'>4.7</span>
                                                            <span className='rating-star'><i style={{ color: '#efce4a', fontSize: '12px' }} class="material-icons">
                                                                star_rate
                                                    </i></span></div> */}
                                                    </Col>
                                                    <Col md={3} xs={5}>
                                                        <div className='pathology-near-you'>Pathologies near you</div>
                                                    </Col>
                                                    <Col md={7} xs={7}>
                                                        <TextField
                                                            id="standard-name"
                                                            label="Pincode"
                                                            className={classes.textField}
                                                            value={this.state.pincode}
                                                            onChange={this.handleChangePin('pincode')}
                                                            margin="normal"
                                                        />
                                                    </Col>
                                                    {/* <Col md={12} xs={12}>
                                                        <FormGroup>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        classes={{ root: classes.checkbox, checked: classes.checked, label: classes.label }}
                                                                        checked={this.state.sameForAllMembers}
                                                                        onChange={this.handleChangeCheckbox('sameForAllMembers')}
                                                                        value="this.state.sameForAllMembers" />
                                                                }
                                                                label="Same for all members"
                                                            />
                                                        </FormGroup>
                                                    </Col> */}
                                                    {this.state.pathlabDetail.length > 0 ? this.state.pathlabDetail.map((pathlab, index) =>
                                                        <Col md={12} xs={12} className='card-column'>
                                                            <Paper className={classes.card} key={index}>
                                                                <Row>
                                                                    <Col md={11} xs={10}>
                                                                        <div key={index} className='pathlab-name'>{pathlab.pathologyName}</div>
                                                                    </Col>
                                                                    <Col md={1} xs={2}>
                                                                        <div className='pathlab-checkbox' key={index}>
                                                                            {/* <Checkbox key={index}
                                                                                classes={{ root: classes.checkboxPathlabName, checked: classes.checked, label: classes.label }}
                                                                                onChange={this.handleChangeCheckbox(item.memberId, pathlab.id)}
                                                                                value={this.state.pathlabName} /> */}
                                                                            <Radio
                                                                                checked={this.state.pathlabName === pathlab.id}
                                                                                onChange={this.handleChangeCheckbox(item.memberId, pathlab.id, pathlab.pathologyName,pathlab.address)}
                                                                                value={this.state.pathlabName}
                                                                                name=""
                                                                                aria-label={pathlab.pathologyName}
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                    <Col md={9} xs={7}>
                                                                        <div key={index} className='address'>{pathlab.address}</div>
                                                                    </Col>
                                                                    <Col md={3} xs={5}>
                                                                        <div key={index} className='contact'>{pathlab.mobile}</div>
                                                                    </Col>
                                                                </Row>
                                                            </Paper>
                                                        </Col>
                                                    ) :
                                                        <Col md={12} xs={12} className='card-column'>
                                                            <h1>No Pathology Available</h1>
                                                        </Col>
                                                    }
                                                    {this.state.pathlabDetail.length > 0 ?
                                                        <div>
                                                            <Col md={6} xs={6} style={{ textAlign: 'right' }} className='cancel-button'>
                                                                <div className='button-div'>
                                                                    <ButtonLightSuccess Text='Cancel' midPinkContent={true} onClick={this.handleClose}/>
                                                                </div>
                                                            </Col>
                                                            <Col md={6} className='submit-button-1 mui--hidden-xs'>
                                                                <div className='button-div'>
                                                                    <ButtonLightSuccess
                                                                        midWarningPink={true}
                                                                        Text='Submit'
                                                                        onClick={this.handleSubmit} />
                                                                </div>
                                                            </Col>
                                                            <Col xs={6} className='submit-button mui--visible-xs-block'>
                                                                {this.state.pathlabDetail.length > 0 && <ButtonLightSuccess
                                                                    Text='Submit'
                                                                    midWarningPink={true}
                                                                    onClick={this.handleSubmit} />}
                                                                {this.state.pathlabDetail.length < 1 && <ButtonLightSuccess
                                                                    Text='Proceed to Summary'
                                                                    midWarningPink={true}
                                                                    onClick={this.handleSubmitNoPathLab} />}
                                                            </Col>
                                                        </div> :

                                                        <Col md={12} xs={12} className='cancel-button'>
                                                            <div className='button-div'>
                                                                <ButtonLightSuccess Text='Skip' midPinkContent={true} onClick={this.handleSubmitNoPathLab} />
                                                            </div>

                                                        </Col>}
                                                </Row>
                                            </div>
                                        }
                                    </div>
                                )}
                                {/* {value === 1 && parents === 0 &&
                                    <div>
                                        <Row className='insurer-row'>
                                            <Col md={3} xs={4}>
                                                <div className='image-insurer'>
                                                    <img src='assets/kotak-general-insurance.jpg' alt='kotak' className='insurer-pic' />
                                                </div>
                                            </Col>
                                            <Col md={7} xs={8}>
                                                <div className='policy-name'>Reliance some awesome policy name</div>
                                                <div className='customer-rating'>Customers Rating:<span className='rating'>4.7</span>
                                                    <span className='rating-star'><i style={{ color: '#efce4a', fontSize: '12px' }} class="material-icons">
                                                        star_rate
                                                    </i></span></div>
                                                <div className='customer-rating'>GB Rating:<span className='rating'>4.7</span>
                                                    <span className='rating-star'><i style={{ color: '#efce4a', fontSize: '12px' }} class="material-icons">
                                                        star_rate
                                                    </i></span></div>
                                            </Col>
                                            <Col md={3} xs={5}>
                                                <div className='pathology-near-you'>Pathologies near you</div>
                                            </Col>
                                            <Col md={7} xs={7}>
                                                <TextField
                                                    id="standard-name"
                                                    label="Pincode"
                                                    className={classes.textField}
                                                    value={this.state.pincode}
                                                    onChange={this.handleChangePin('pincode')}
                                                    margin="normal"
                                                />
                                            </Col>
                                            <Col md={12} xs={12}>
                                                <FormGroup>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                classes={{ root: classes.checkbox, checked: classes.checked, label: classes.label }}
                                                                checked={this.state.sameForAllMembers}
                                                                onChange={this.handleChangeCheckbox('sameForAllMembers')}
                                                                value="this.state.sameForAllMembers" />
                                                        }
                                                        label="Same for all members"
                                                    />
                                                </FormGroup>
                                            </Col>
                                            {this.state.pathlabDetail.length > 0 ? this.state.pathlabDetail.map((pathlab, index) =>
                                                <Col md={12} xs={12} className='card-column'>
                                                    <Paper className={classes.card} key={index}>
                                                        <Row>
                                                            <Col md={11} xs={10}>
                                                                <div key={index} className='pathlab-name'>{pathlab.pathologyName}</div>
                                                            </Col>
                                                            <Col md={1} xs={2}>
                                                                <div className='pathlab-checkbox' key={index}>
                                                                    <Checkbox key={index}
                                                                        classes={{ root: classes.checkboxPathlabName, checked: classes.checked, label: classes.label }}
                                                                        onChange={this.handleChangeCheckbox('pathlabName')}
                                                                        value="this.state.pathlabName" />
                                                                </div>
                                                            </Col>
                                                            <Col md={9} xs={7}>
                                                                <div key={index} className='address'>{pathlab.address}</div>
                                                            </Col>
                                                            <Col md={3} xs={5}>
                                                                <div key={index} className='contact'>{pathlab.mobile}</div>
                                                            </Col>
                                                        </Row>
                                                    </Paper>
                                                </Col>
                                            ) : null}
                                            <Col md={6} xs={6} style={{ textAlign: 'right' }} className='cancel-button'>
                                              <div className='cancel-button-div'>
                                                 <ButtonLightSuccess Text='Cancel' midPinkContent={true} />
                                              </div>
                                            </Col>
                                            <Col md={6} className='submit-button mui--hidden-xs'>
                                                <ButtonLightSuccess Text='Submit' />
                                            </Col>
                                            <Col xs={6} className='submit-button mui--visible-xs-block'>
                                                <ButtonLightSuccess Text='Submit' smallWidth={true} />
                                            </Col>
                                        </Row>
                                    </div>
                                } */}
                            </Col>
                        </Row>
                    </DialogContent>
                </Dialog>
            </MuiThemeProvider>
        )
    }
}

SelectPathlab.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    fullScreen: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};

const mapStateToProps = state => {
    return {
        pathlab: state.popup.select_pathlab,
        currentPlan: state.currentPlan.details ? state.currentPlan.details : {},
        inputFormDataHealth: state.inputFormHealth.inputFormHealthData,
        proposalFormDataHealth: state.proposalFormHealth.proposalFormHealthData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSelectPathlab: (pathlab) => dispatch({ type: 'SELECT_PATHLAB', pathlab }),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)((withMobileDialog({ breakpoint: 'xs' })(withStyles(styles, { withTheme: true })(SelectPathlab)))) 