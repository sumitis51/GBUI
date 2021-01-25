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
import Paper from '@material-ui/core/Paper'
import axios from 'axios';
import './index.css'
import constants from '../../../constants/appConstants.json'
import Snackbar from '@material-ui/core/Snackbar';

const styles = theme => ({
    snack:{
        marginTop:'6rem'
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
        '&:focus': {
            outline: '#ffffff',
        },
    },
    tabSelected: {},
    card: {
        minWidth: 275,
        boxShadow: 'none',
        border: '1px solid #aaaaaa',
        padding: '7px 12px',
        margin: '8px 0px 8px 0px',
    },
});



class SelectPathlabView extends Component {
    constructor(props) {
        super();
        this.state = {
            openSnack:false,
            value: 0,
            // parents: 0,
            pincode: 0,
            sameForAllMembers: true,
            pathlabName: true,
            pathlabDetail: []
        }
    }
    componentWillMount() {
        this.checkInsurerId()
    }

    checkInsurerId() {
        if(this.props.insurer.insurerId) {
            this.loadInitLabs()
        } else {
            setTimeout(() => {
                this.checkInsurerId()
            }, 100)
        }
    }

    loadInitLabs() {
        let pinCode = parseInt(this.props.inputFormDataHealth.selfPincode,10)
        console.log(typeof(pinCode))
        this.setState({
            pincode:pinCode
        })
        axios.get(`${constants.apiRootURL}/network-hospital/${this.props.insurer.insurerId}/${pinCode}`)
        .then(response => {
           
            this.setState({ pathlabDetail: response.data })
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



    handleChangePin = name => event => {
        const pincodelength = event.target.value
        if (pincodelength.length <= 6) {
            this.setState({
                [name]: event.target.value,
            });
        }
        if (pincodelength.length === 6 && this.props.insurer.insurerId) {
            
            axios.get(`${constants.apiRootURL}/network-hospital/${this.props.insurer.insurerId}/${pincodelength}`)
                .then(response => {
                    this.setState({ pathlabDetail: response.data })
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
    }

    handleClose = () => {
        this.setState({pincode: '', pathlabDetail: []})
        this.props.onSelectPathlabView(false)
    };
    handleChange = (event, value) => {
        this.setState({ value });
    };
  
    handleChangeCheckbox = name => event => {
        this.setState({ [name]: event.target.checked });
    };
    render() {
        const { fullScreen, classes } = this.props;
        const { value } = this.state;
        const currentPlan = this.props.insurer

        // // To maintain the same order for tab members and also to show only those members which are eligible for premedical
        // const members = []
        // this.props.premedical.premedicalRequiredFor.map(prf => {
        //     this.props.proposalForm.insuredMembersList ? this.props.proposalForm.insuredMembersList.map((item, index) => {
        //         prf.relationship === item.relationship ? members.push(item) : ''
        //     }) : ''
        // })
        return (
            <MuiThemeProvider>
                <Dialog className="select-pathlab-view"
                    open={this.props.open}
                    onClose={this.handleClose}
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
                                <div className='select-pathlab-heading'>Plan Details</div>
                            </Col>
                            <Col md={3} xs={2}>
                                <i onClick={this.handleClose} class="material-icons" style={{ color: '#808080', float: 'right' }}>
                                    close
                                </i>
                            </Col>
                            <Col md={12} xs={12} className='tab-row'>
                                {/* <Tabs variant="fullWidth" classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
                                    scrollable value={value} onChange={this.handleChange}>
                                    {this.props.premedical.premedicalRequiredFor.map(item =>
                                        <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label={`Labs for ${item.relationship}`} />)
                                    }
                                    

                                </Tabs> */}
                                <div>
                                    <Row className='insurer-row'>
                                        <Col md={3} xs={4}>
                                            <div className='image-insurer'>
                                                <img src={`${constants.mediaBucketURL}/${currentPlan.insurerLogo}`} alt={currentPlan.insurerName} className='insurer-pic' />
                                            </div>
                                        </Col>
                                        <Col md={7} xs={8}>
                                            <div className='policy-name'>{currentPlan.insurerName} {currentPlan.planName}</div>
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
                                            <div className='pathology-near-you'>Hospitals near you</div>
                                        </Col>
                                        <Col md={7} xs={7}>
                                            <TextField
                                                id="standard-name"
                                                label="Pincode"
                                                className={classes.textField}
                                                value={this.state.pincode}
                                                onChange={this.handleChangePin('pincode')}
                                                margin="normal"
                                                maxlength="6"
                                            />
                                        </Col>
                                        <Col md={12} xs={12}>
                                            <div className='notify'>You can also check hospitals at your desired pincode</div>
                                        </Col>

                                        {this.state.pathlabDetail.length > 0 ? this.state.pathlabDetail.map((pathlab, index) =>
                                            <Col md={12} xs={12} className='card-column' key={index}>
                                                <Paper className={classes.card} key={index}>
                                                    <Row>
                                                        <Col md={12} xs={10} key={index}>
                                                            <div key={index} className='pathlab-name'>{pathlab.name}</div>
                                                        </Col>
                                                        <Col md={9} xs={7} key={index}>
                                                            <div key={index} className='address'>{`${pathlab.address}  ${pathlab.city} ${pathlab.state}${pathlab.pincode}`}</div>
                                                        </Col>
                                                        <Col md={3} xs={5} key={index}>
                                                            <div className='contact' key={index}>{pathlab.mobile}</div>
                                                        </Col>
                                                    </Row>
                                                </Paper>
                                            </Col>
                                        ) : null}

                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </DialogContent>
                </Dialog>
            </MuiThemeProvider>
        )
    }
}

SelectPathlabView.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    fullScreen: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};


const mapStateToProps = state => ({
    inputFormDataHealth: state.inputFormHealth.inputFormHealthData
})


export default connect(mapStateToProps)((withMobileDialog({ breakpoint: 'xs' })(withStyles(styles, { withTheme: true })(SelectPathlabView)))) 