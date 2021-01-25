import React, { Component, Fragment } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Container from 'muicss/lib/react/container';
import Card from '@material-ui/core/Card';
import ButtonLightSuccess from '../Shared/ButtonLightSuccess/index';
import axios from 'axios';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Rating from '../RatingPopup/index'
import constants from '../../constants/appConstants.json'
import './index.css'


const styles = theme => ({
    snack: {
        marginTop: '6rem'
    },
})
class PaymentSuccess extends Component {
    // paymentStatus: success/failed
    state = {
        openSnack: false,
        paymentStatus: '',
        hideRating:false,
        paymentDetails: {},
        paymentDetails1: [
            {
                key: 'orderId',
                value: 'OD1234',
                display: 'Order Id',
                css: {},
            },
            {
                key: 'amount',
                value: '12345',
                display: 'Amount',
                css: {},
            },
            {
                key: 'paymentMethod',
                value: 'Internet Banking',
                display: 'Payment Method',
                css: {},
            },
            {
                key: 'status',
                value: 'Successful',
                display: 'Status',
                css: { color: '#ea0b4b' },
            },
            {
                key: 'policyNumber',
                value: 'UIDFN1234567H',
                display: 'Policy Number',
                css: {},
            },
            {
                key: 'policyMailTo',
                value: 'johndoe1234567@email.com',
                display: 'Policy mailed to',
                css: {},
            },
            {
                key: 'transactionId',
                value: '123456789ASDE1235',
                display: 'Transaction Id',
                css: {},
            },
        ],
        paymentDetails2: [
            {
                key: 'orderId',
                value: 'OD1234',
                display: 'Order Id',
                css: {},
            },
            {
                key: 'amount',
                value: '12345',
                display: 'Amount',
                css: {},
            },
            {
                key: 'paymentMethod',
                value: 'Internet Banking',
                display: 'Payment Method',
                css: {},
            },
            {
                key: 'status',
                value: 'Successful',
                display: 'Status',
                css: { color: '#ea0b4b' },
            },
            {
                key: 'transactionId',
                value: '123456789ASDE1235',
                display: 'Transaction Id',
                css: {},
            },
        ]
    }
    componentWillMount() {
        const vm = this;
        this.props.onCurrentComponent('PaymentSuccess.json');
        setTimeout(this.setState({hideRating:true}), 3000)
        axios.get('/assets/json/PaymentSuccess.json')
            .then((response) => {
                vm.props.onFetchLanguage(response.data[this.props.CurrentLanguage]);
            }, (error) => {
                console.log(error);
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
        let params = (new URL(document.location)).searchParams;
        // alert(params.get("policyId"))
        if (params.get("policyId") !== "") {
            axios.get(`${constants.apiRootURL}/payment-info/${params.get("policyId")}`)
                .then(res => {
                    this.setState({ paymentDetails: res.data, paymentStatus: 'success' })
                    localStorage.removeItem("contactDetails")
                    localStorage.removeItem("currentPlan")
                    localStorage.removeItem("inputForm")
                    localStorage.removeItem("insuredMembers")
                    localStorage.removeItem("nominee")
                    localStorage.removeItem("prevInsurer")
                    localStorage.removeItem("proposerDetails")
                    localStorage.removeItem("proposerId")
                    // console.log(res)
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
        } else if (params.get("transId")) {

            // Load Proposal Form and Input From Data
            const inputForm = JSON.parse(localStorage.getItem("inputForm"))
            const currentPlan = JSON.parse(localStorage.getItem("currentPlan"))

            this.props.loadInputFormHealth(inputForm)
            this.props.setCurrentPlan(currentPlan)
            const premiumDetails = {
                premiumAmount: currentPlan.premium,
                serviceTax: currentPlan.gst,
                premiumWithServiceTax: currentPlan.totalPremium
            }
            this.props.onPremiumFetch(premiumDetails)
            axios.get(`${constants.apiRootURL}/transaction-info/${params.get("transId")}`)
                .then(res => {
                    this.setState({ paymentDetails: res.data, paymentStatus: 'failed' })
                    console.log(res)
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

        } else {
            this.setState({ paymentStatus: 'failed' })
        }
    }
    handlePathlogySelect = () => {
        this.props.history.push('/pre-medical-required', this.state.paymentDetails)
    }
    handlePayAgain = () => {
        const proposerId = localStorage.getItem("proposerId")
        const url = `${constants.apiRootURL}/payment?proposalFormId=${this.props.premium ? proposerId : ''}&insurer=${this.props.currentPlan.insurerId}&identity=${localStorage.getItem('token')}`
        // localStorage.removeItem("proposerId")
        window.location = url
    }
   
      
    render() {
        const paymentDetails = this.state.paymentDetails
        const { classes } = this.props
      
        return (
            <MuiThemeProvider>
                <div className='paymentSuccess'>
                    <Container fluid={true} className='paymentContainer'>
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
                        <Card className='paymentCard'>
                            <div className='CardPic'>
                           
                                {this.state.paymentStatus === 'success' &&
                                    <Row>
                                        <Col md={12}>
                                            <div className='cardHeaderContent'> 
                                                {this.props.FetchedLanguage ? this.props.FetchedLanguage.PaymentSuccessPaymentSuccessHeading : ''}
                                            </div>
                                        </Col>
                                        <Col md={12} className='mui--hidden-xs mui--hidden-sm modalbox'>
                                            <div class="icon">
                                                <img src="assets/checked-1.svg" className='paymentPic' alt='payment-failed' />
                                            </div>

                                        </Col>
                                        <Col md={12}>
                                            {/* <Rating /> */}
                                           
                                              {/* {this.state.hideRating &&  <Rating onClose={() => {this.setState({hideRating: false})}}/>} */}
                                        </Col>
                                    </Row>
                                }
                                {this.state.paymentStatus === 'failed' &&
                                    <Row>
                                        <Col md={12}>
                                            <div className='cardHeaderContent'>
                                                Payment Failed
                                        </div>
                                        </Col>
                                        <Col md={12} className='mui--hidden-xs mui--hidden-sm'>
                                            <img src="assets/paymentFailed.svg" className='paymentPic' alt='payment-failed' />
                                        </Col>
                                    </Row>
                                }
                            </div>
                            <div className='CardContent'>
                                <Row>
                                    {this.state.paymentStatus === 'success' &&
                                        <Col md={12}>
                                            <div className='cardText'>
                                                Congratulations!! Payment for the purchase of your <span style={{ color: '#ea0b4b' }}>{paymentDetails.planName}</span> is successful.
                                        </div>
                                        </Col>
                                    }
                                    {this.state.paymentStatus === 'failed' &&
                                        <Col md={12} className='mui--hidden-xs mui--hidden-sm'>
                                            <div className='cardText'>
                                                Oops!! The payment transaction for the purchase of your <span style={{ color: '#ea0b4b' }}>{paymentDetails.planName}</span> was unsuccessful.
                                        </div>
                                        </Col>
                                    }
                                    {this.state.paymentStatus === 'success' &&
                                        <Fragment>
                                            {/* {this.state.paymentDetails1.map((item) =>{
                                        return( <Fragment key={item.key}>
                                            <Col md={6} xs={6}>
                                                <div className='orderInfoLeft' >{item.display}</div>
                                            </Col>
                                            <Col md={6} xs={6}>
                                                <div className='orderInfoRight' style={item.css}>{item.value}</div>
                                            </Col>
                                        </Fragment>)
                                    })} */}
                                            <Row>
                                                <Col md={6} xs={6}>
                                                    <div className='orderInfoLeft' >Order Id</div>
                                                </Col>
                                                <Col md={6} xs={6}>
                                                    <div className='orderInfoRight' >{paymentDetails.orderId}</div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={6} xs={6}>
                                                    <div className='orderInfoLeft' >Amount</div>
                                                </Col>
                                                <Col md={6} xs={6}>
                                                    <div className='orderInfoRight' >{paymentDetails.amount}</div>
                                                </Col>
                                            </Row>
                                            {/* <Row>
                                                <Col md={6} xs={6}>
                                                    <div className='orderInfoLeft' >Payment Method</div>
                                                </Col>
                                                <Col md={6} xs={6}>
                                                    <div className='orderInfoRight' >{paymentDetails.paymentMethod}</div>
                                                </Col>
                                            </Row> */}
                                            <Row>
                                                <Col md={6} xs={6}>
                                                    <div className='orderInfoLeft' >Status</div>
                                                </Col>
                                                <Col md={6} xs={6}>
                                                    <div className='orderInfoRight' >{paymentDetails.status}</div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={6} xs={6}>
                                                    <div className='orderInfoLeft' >Policy Number</div>
                                                </Col>
                                                <Col md={6} xs={6}>
                                                    <div className='orderInfoRight' >{paymentDetails.policyNumber && !paymentDetails.hasError ? paymentDetails.policyNumber : paymentDetails.errorMessage}</div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={6} xs={6}>
                                                    <div className='orderInfoLeft' >Policy mailed to</div>
                                                </Col>
                                                <Col md={6} xs={6}>
                                                    <div className='orderInfoRight' >{paymentDetails.policyBuyerEmail}</div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={6} xs={6}>
                                                    <div className='orderInfoLeft' >Transaction Id</div>
                                                </Col>
                                                <Col md={6} xs={6}>
                                                    <div className='orderInfoRight' >{paymentDetails.transactionId}</div>
                                                </Col>
                                            </Row>
                                        </Fragment>
                                    }
                                    {this.state.paymentStatus === 'failed' &&
                                        <Fragment>
                                            <Row>
                                                <Col md={6} xs={6}>
                                                    <div className='orderInfoLeft' >Order Id</div>
                                                </Col>
                                                <Col md={6} xs={6}>
                                                    <div className='orderInfoRight' >{paymentDetails.orderId}</div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={6} xs={6}>
                                                    <div className='orderInfoLeft' >Amount</div>
                                                </Col>
                                                <Col md={6} xs={6}>
                                                    <div className='orderInfoRight' >{paymentDetails.amount}</div>
                                                </Col>
                                            </Row>
                                            {/* <Row>
                                                <Col md={6} xs={6}>
                                                    <div className='orderInfoLeft' >Payment Method</div>
                                                </Col>
                                                <Col md={6} xs={6}>
                                                    <div className='orderInfoRight' >{paymentDetails.paymentMethod}</div>
                                                </Col>
                                            </Row> */}
                                            <Row>
                                                <Col md={6} xs={6}>
                                                    <div className='orderInfoLeft' >Status</div>
                                                </Col>
                                                <Col md={6} xs={6}>
                                                    <div className='orderInfoRight' >{paymentDetails.status}</div>
                                                </Col>
                                            </Row>
                                            {/* <Row>
                                                <Col md={6} xs={6}>
                                                    <div className='orderInfoLeft' >Policy Number</div>
                                                </Col>
                                                <Col md={6} xs={6}>
                                                    <div className='orderInfoRight' >{paymentDetails.policyNumber ? paymentDetails.policyNumber : '-'}</div>
                                                </Col>
                                            </Row> */}
                                            <Row>
                                                <Col md={6} xs={6}>
                                                    <div className='orderInfoLeft' >Policy mailed to</div>
                                                </Col>
                                                <Col md={6} xs={6}>
                                                    <div className='orderInfoRight' >{paymentDetails.policyBuyerEmail}</div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={6} xs={6}>
                                                    <div className='orderInfoLeft' >Transaction Id</div>
                                                </Col>
                                                <Col md={6} xs={6}>
                                                    <div className='orderInfoRight' >{paymentDetails.transactionId}</div>
                                                </Col>
                                            </Row>
                                        </Fragment>
                                    }
                                    {this.state.paymentStatus === 'failed' &&
                                        <Col md={12} className='mui--hidden-xs mui--hidden-sm'>
                                            <div className='amount-deducted' style={{ color: '#ea0b4b' }}>
                                                Any amount deducted for this transaction will be credited to your account within {paymentDetails.days} days.
                                        </div>
                                        </Col>
                                    }
                                </Row>
                                {paymentDetails.eligibleForPremedical &&
                                    <ButtonLightSuccess Text='Set Pathlogy' midWarningPink={true} onClick={this.handlePathlogySelect} />
                                }
                                {this.state.paymentStatus === 'success' &&
                                    <div>
                                        <Col md={12}>
                                            {/* <div className='policyButton'>
                                                <ButtonLightSuccess Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.PaymentSuccessButtonDownloadPolicySlipText : ''} midPinkContent={true} />
                                            </div> */}
                                        </Col>
                                        <Col md={12}>



                                            {process.env.REACT_APP_PROFILE === 'POM'&&<div className='policyButton'>
                                                <ButtonLightSuccess
                                                    onClick={() => { this.props.history.push("/dashboard-customer") }}
                                                    Text='Visit E-Account' midWarningPink={true} >

                                                </ButtonLightSuccess>

                                            </div>}
                                            {process.env.REACT_APP_PROFILE === 'POS'&&<div className='policyButton'>
                                                <ButtonLightSuccess
                                                    onClick={() => { this.props.history.push("/pos-sales-transaction") }}
                                                    Text='Sales Transactions' midWarningPink={true} >

                                                </ButtonLightSuccess>

                                            </div>}
                                        </Col>
                                    </div>}
                                {this.state.paymentStatus === 'failed' &&
                                    <div>
                                        <Col md={12}>
                                            <div className='tryAgain'>
                                                <ButtonLightSuccess Text='Try Again' midWarningPink={true} onClick={/*() => {this.props.history.push("/proposal-form-health", {proposalSummary: false})}*/this.handlePayAgain} />
                                            </div>
                                        </Col>
                                    </div>}
                            </div>
                            {this.state.paymentStatus === 'success' &&
                                <Row>
                                    <Col md={12} className='cardFooter'>
                                        <div className='FooterText'>Congratulations on the beginning of an awesome association with us. Visit E-Account for more details</div>
                                    </Col>
                                </Row>}
                        </Card>
                    </Container>
                </div>
            </MuiThemeProvider>
        )
    }
}

const mapStateToProps = state => ({
    CurrentLanguage: state.language.current_language,
    FetchedLanguage: state.language.lang_data,
    premium: state.premium.details ? state.premium.details : {},
    currentPlan: state.currentPlan.details ? state.currentPlan.details : {}
});

const mapDispatchToProps = dispatch => ({
    onCurrentComponent: (fileName) => dispatch({ type: 'CurrentComponent', fileName }),
    onFetchLanguage: (language) => dispatch({ type: 'FetchLanguage', language }),
    onCurrentLanguage: () => dispatch({ type: 'CurrentLanguage' }),
    onPremiumFetch: (data) => dispatch({ type: 'PREMIUM_DETAILS', data }),
    loadInputFormHealth: (data) => dispatch({ type: 'INPUT_FORM_HEALTH', data }),
    setCurrentPlan: (plan) => dispatch({ type: 'CURRENT_PLAN', plan })
});

PaymentSuccess.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PaymentSuccess));