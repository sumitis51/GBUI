import React from 'react'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
// import Panel from 'muicss/lib/react/panel'
// import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp'
// import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
// import classNames from 'classnames'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios';
import appConstants from '../../constants/appConstants.json'
import Snackbar from '@material-ui/core/Snackbar';


import PanelsHeaderHealth from './PanelsHeaderHealth'
import QuoteDetails from './QuoteDetails'
// import PaymentDetails from './PaymentDetails'

import './health_quotes.css'
// import HealthGroupTabs from '../QuoteListingHealth/GroupHealthTabs/index'
// import Fab from '@material-ui/core/Fab'





const styles = theme => ({
    snack: {
        marginTop: '6rem'
    },
    fab: {
        backgroundColor: '#ea0b4b',
        top: 'auto',
        right: 10,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
        '&:hover': {
            backgroundColor: '#ea0b4b',
        },
    },
    fab1: {
        backgroundColor: '#ea0b4b',
        top: 'auto',
        right: 10,
        bottom: '16rem',
        left: 'auto',
        position: 'fixed',
        '&:hover': {
            backgroundColor: '#ea0b4b',
        },
    },
    fab2: {
        backgroundColor: '#ea0b4b',
        top: 'auto',
        right: 10,
        bottom: '11rem',
        left: 'auto',
        position: 'fixed',
        '&:hover': {
            backgroundColor: '#ea0b4b',
        },
    },
    fab3: {
        backgroundColor: '#ea0b4b',
        top: 'auto',
        right: 10,
        bottom: '6rem',
        left: 'auto',
        position: 'fixed',
        '&:hover': {
            backgroundColor: '#ea0b4b',
        },
    },
    fabClose: {
        backgroundColor: '#878787',
        top: 'auto',
        right: 10,
        bottom: 0,
        left: 'auto',
        marginBottom: '1rem',
        position: 'fixed', '&:hover': {
            backgroundColor: '#878787',
        },
    },

    buttonRoot3: {
        color: 'white',
        backgroundColor: '#ea0b4b',
        '&:hover': {
            backgroundColor: '#ea0b4b',
        },
        padding: '15px 10px'
    }
})
class HealthQuotes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openSnack: false,
            showFab: false,
            quoteDetails: {},
            selectedPlan: {},
            quoteDetailsHtmlData: {}
        }
    }
    showFab = () => {
        this.setState({
            showFab: true
        })
    }
    hideFab = () => {
        this.setState({
            showFab: false
        })
    }

    componentWillMount() {
        // Here get details
        const inputForm = JSON.parse(localStorage.getItem("inputForm"))
        const currentPlan = JSON.parse(localStorage.getItem("currentPlan"))
        // Check for Input Form Details of Health, if not then redirect to inputForm Health
        if (this.props.inputFromData && this.props.inputFromData.familyDetails) {
            this.getPlanDetails()
        } else if (inputForm && currentPlan) {
            this.props.loadInputFormHealth(inputForm)
            this.props.setCurrentPlan(currentPlan)
            this.getPlanDetailsWithLocal(inputForm, currentPlan)
        } else {
            this.props.history.push("/")
        }

        // this.props.inputFromData ? 
        // this.getPlanDetails() : this.props.history.push(this.props.location.state && this.props.location.state.rootPath)
        // console.log(this.props.insurer)
    }

    getPlanDetailsWithLocal(inputForm, currentPlan) {

        const data = inputForm;
        data.income = Number(inputForm.income)
        const modifyCover = this.props.history.location.state.modifyCovers
        if (modifyCover && modifyCover.flag) {

            data.modifyCoverClicked = true
            data.minCoverage = modifyCover.minCoverage
            data.maxCoverage = modifyCover.maxCoverage
        }


        data.insurerId = this.props.location.state.insurer.insurerId;
        data.planCode = this.props.location.state.insurer.planCode;
        data.sumInsured = this.props.location.state.insurer.sumInsured;
        axios.post(`${appConstants.apiRootURL}/plan-details`, data)
            .then(response => {
                this.setState({ quoteDetailsHtmlData: response.data })
                let selectedPlan = response.data.insurerPlans.filter(item => {
                    return item.insurerPlanId === currentPlan.insurerPlanId
                })[0]

                let amt = Math.round(selectedPlan.premium)
                try {

                    selectedPlan.addOns = selectedPlan.addOns.map(item => {
                        let it = item
                        if (item.mandatory) {
                            it.checked = true
                            amt += it.amount
                        } else {
                            it.checked = false
                        }
                        return it
                    })
                } catch (error) {
                    console.log(error)
                }
                
                const serviceTax = Math.round((18 / 100) * amt)
                let totalPremium = Math.round(amt + Number(serviceTax))
                // totalPremium = totalPremium.toFixed(2)
                // amt = amt.toFixed(2)
                selectedPlan.premium = amt
                selectedPlan.gst = serviceTax
                selectedPlan.totalPremium = totalPremium

                const premiumDetails = {
                    premiumAmount: amt,
                    serviceTax: serviceTax,
                    premiumWithServiceTax: totalPremium,
                    proposerId: null
                }
                this.props.onPremiumFetch(premiumDetails)
                // this.props.selectedPlan(currentPlan)
                this.props.setCurrentPlan(selectedPlan)
                this.setState({ quoteDetails: response.data, selectedPlan, quoteDetailsHtmlData: response.data })

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

    getPlanDetails = () => {

        const data = this.props.inputFromData;
        data.income = Number(this.props.inputFromData.income)
        const modifyCover = this.props.history.location.state.modifyCovers
        if (modifyCover && modifyCover.flag) {

            data.modifyCoverClicked = true
            data.minCoverage = modifyCover.minCoverage
            data.maxCoverage = modifyCover.maxCoverage
        }


        data.insurerId = this.props.location.state.insurer.insurerId;
        data.planCode = this.props.location.state.insurer.planCode;
        data.sumInsured = this.props.location.state.insurer.sumInsured;
        axios.post(`${appConstants.apiRootURL}/plan-details`, data)
            .then(response => {
              
                this.setState({ quoteDetailsHtmlData: response.data })
                let selectedPlan = response.data.insurerPlans.filter(item => {
                    console.log(this.props.currentPlan.insurerPlanId, item.insurerPlanId)
                    return item.insurerPlanId === this.props.currentPlan.insurerPlanId
                })[0]

                let amt = Number(selectedPlan.premium)
                try {

                    selectedPlan.addOns = selectedPlan.addOns.map(item => {
                        let it = item
                        if (item.mandatory) {
                            it.checked = true
                            amt += it.amount
                        } else {
                            it.checked = false
                        }
                        return it
                    })
                } catch (error) {
                    console.log(error)
                }
                const serviceTax = Math.round((18 / 100) * amt)
                let totalPremium = Math.round(amt + Number(serviceTax))
                // totalPremium = totalPremium.toFixed(2)
                // amt = amt.toFixed(2)
                selectedPlan.premium = amt
                selectedPlan.gst = serviceTax
                selectedPlan.totalPremium = totalPremium

                const premiumDetails = {
                    premiumAmount: amt,
                    serviceTax: serviceTax,
                    premiumWithServiceTax: totalPremium,
                    proposerId: null
                }
                this.props.onPremiumFetch(premiumDetails)
                // this.props.selectedPlan(currentPlan)
                this.props.setCurrentPlan(selectedPlan)
                this.setState({ quoteDetails: response.data, selectedPlan, quoteDetailsHtmlData: response.data })

            }).catch(error => {
                console.log(error)
                debugger
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
    handleChangeAuto = (item) => {

        let currentPlan = this.props.currentPlan
        let amt = currentPlan.premium
        currentPlan.addOns = currentPlan.addOns.map(adn => {
            let addon = adn
            if (adn.name === item.name) {
                if (adn.checked) {
                    amt -= adn.amount
                } else {
                    amt += adn.amount
                }
                addon.checked = !adn.checked
                addon.newUpdate = 'True Yes Required'
            }
            return addon
        })

        currentPlan.premium = amt

        const premiumDetails = {
            premiumAmount: currentPlan.premium,
            serviceTax: currentPlan.gst,
            premiumWithServiceTax: currentPlan.totalPremium,
            proposerId: null
        }
        this.props.onPremiumFetch(premiumDetails)
        this.props.setCurrentPlan(currentPlan)
        this.setState({ selectedPlan: currentPlan });
    }
    handleChangePlan = (plan) => {
        this.setState({ selectedPlan: plan });
        this.props.setCurrentPlan(plan)
    }
    render() {
        const { classes } = this.props;
        return (
            <div className="parent-div-car-quotes">
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
                {/* Body content with margin on desktop */}
                <div className="child-div-car-quotes">
                    <div className="car-quotes-body">
                        <p className="back-quotes-link">
                            <Link to="/quote-listing-health"><img src="/assets/back.png" alt='back' /></Link>
                            &nbsp;Back To Quote Listing
                    </p>

                        {/* <p className="car-quotes-heading">Health Quote Detail</p> */}

                        {/* Headers Panel */}
                        <PanelsHeaderHealth history={this.props.history} />
                        {/* tabs */}
                        <div className='mui--hidden-xs'>
                            {/* <HealthGroupTabs /> */}
                        </div>


                        {/* Here divide in two columns */}
                        {console.log(this.state.quoteDetails, "testtesttest")}
                        <Row>
                            <Col md="12">
                                <QuoteDetails
                                    quoteDetailsHtmlData={this.state.quoteDetailsHtmlData}
                                    quoteDetails={this.state.quoteDetails}
                                    // currentPlan={this.state.selectedPlan}
                                    selectedPlan={(plan) => { this.handleChangePlan(plan) }}
                                    forceUpdate={() => { this.forceUpdate() }} />
                            </Col>
                        </Row>
                    </div>
                    {/* {!this.state.showFab &&
                    <Fab onClick={this.showFab} aria-label="Add" className={classes.fab}>
                        <img class="group-chat" src='/assets/groupChat.svg' alt='group-chat' />
                    </Fab>}
                {this.state.showFab && <div>
                    <div className='chat'>
                        <Fab onClick={this.showFab} aria-label="Add" className={classes.fab1}>
                            <img class="faq" src='/assets/faq.svg' alt='faq' />
                        </Fab>
                    </div>
                    <div className='chat'>
                        <Fab onClick={this.showFab} aria-label="Add" className={classes.fab2}>
                            <img class="chat" src='/assets/chat.svg' alt='chat' />
                        </Fab>
                    </div>
                    <div className='chat'>
                        <Fab onClick={this.showFab} aria-label="Add" className={classes.fab3}>
                            <img class="call" src='/assets/call.svg' alt='call' />
                        </Fab>
                    </div>
                    <div className='chat'>
                        <Fab  onClick={this.hideFab} aria-label="Add" className={classes.fabClose}>
                            <i class="material-icons" style={{ color: '#ffffff' }}>
                                close
                            </i>
                        </Fab>
                    </div>
                </div>
                } */}
                </div>
            </div>
        )
    }
}

HealthQuotes.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    healthTab: state.GroupHealthTabs.value,
    inputFromData: state.inputFormHealth.inputFormHealthData,
    currentPlan: state.currentPlan.details ? state.currentPlan.details : {}
})
const mapDispatchToProps = dispatch => ({
    setCurrentPlan: (plan) => dispatch({ type: 'CURRENT_PLAN', plan }),
    loadInputFormHealth: (data) => dispatch({ type: 'INPUT_FORM_HEALTH', data }),
    onSelectPremium: (premium, model_id) => dispatch({ type: 'PREMIUM_BREAKUP_MODAL', premium, model_id }),
    onPremiumFetch: (data) => dispatch({ type: 'PREMIUM_DETAILS', data })
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HealthQuotes))