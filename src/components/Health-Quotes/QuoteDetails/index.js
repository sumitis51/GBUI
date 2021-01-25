import React from 'react'
import Panel from 'muicss/lib/react/panel'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import Help from '@material-ui/icons/Help'
import Row from 'muicss/lib/react/row'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem';
import Col from 'muicss/lib/react/col'
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import PremiumBreakup from '../../PremiumBreakupPopUp/index';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import GetDiscount from '../../Shared/Health/Discount/index'
import constants from '../../../constants/appConstants.json'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp'
import PaymentDetails from '../PaymentDetails'
import classNames from 'classnames'
import Tooltip from '@material-ui/core/Tooltip'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'

import './quote.css'

const styles = theme => ({
    button: {
        // margin: theme.spacing.unit,
        background: 'white'
    },
    input: {
        display: 'none',
    },
    slider: {
        padding: '22px 0px',
    },
    sliderRoot: {
        background: '#ea0b4b'
    },
    rootCheck: {
        color: 'black',
        '&$checked': {
            color: '#ea0b4b',
        },
        margin: '-1rem 0'
    },
    checked: {},
    buttonRoot3: {
        color: 'white',
        backgroundColor: '#ea0b4b',
        '&:hover': {
            backgroundColor: '#ea0b4b',
        },
        padding: '10px 60px',
        margin: '0.5rem 0 0rem 0'
    },
});

const RawHTML = ({ children, className = "" }) =>
    <div className={className}
        dangerouslySetInnerHTML={{ __html: children }} />

class QuoteDetails extends React.Component {

    state = {
        dropdownD: false,
        dropdownDValue: '',
        dropdownCover: false,
        dropdownCoverValue: '',
        dropdownYear: false,
        dropdownYearValue: '',
        selectedPlan: {},
        selectedPlanN: {},
        discountDialog: false,
        dropValuehide: 1,
        pdTab: 0,
        insurer: '',
        deductibles: 100000,
        deductibleValue: [
            { key: '1 lacs', value: 100000 },
            { key: '2 lacs', value: 200000 },
            { key: '3 lacs', value: 300000 },
            { key: '4 lacs', value: 400000 },
            { key: '5 lacs', value: 500000 },
            { key: '10 lacs', value: 1000000 },
            { key: '15 lacs', value: 1500000 },
            { key: '20 lacs', value: 2000000 },
        ],
        mandatoryAddonTooltip: false
    }

    PremiumBreakupPopUp = () => {
        console.log('nbhjv')
        this.props.onSelectPremium(true, 'PREMIUM_BREAKUP')
    }
    PremiumBreakup = () => {
        this.props.onSelectPremium(true, 'plan_cover')
    }
    editPremiumBreakup = () => {
        this.props.onSelectPremium(true, 'cashless_hospital')
    }
    handleChangeDeductible = name => event => {
        const value = event.target.value
        const item = this.props.quoteDetails.insurerPlans.filter(item => item.deductibleAmount === value)[0]
        this.setState({ [name]: value, selectedPlan: item });
        this.props.setCurrentPlan(item);
        this.props.selectedPlan(item)
    }
    convertAmountToLacs = (amount) => {
        //   const lacAmt=`${amount}` 
        //   const firstDigit= `${lacAmt[0]}.${lacAmt[1]}`
        //      return firstDigit
        var val = Math.abs(amount)
        if (val >= 100000) {
            val = (val / 100000).toFixed(1)
        }
        /*else if(val >= 1000) val = (val/1000).toFixed(2) + ' K';*/
        return val;
    }
    handleDropDown = (value) => (event) => {
        this.setState({
            dropdownDValue: event.target.attributes['value'].value,
            dropdownD: false,
            selectedPlan: value
        })
        this.props.selectedPlan(value)
    }
    handleDropDownComp = (value) => (event) => {
        this.setState({
            dropdownCoverValue: event.target.attributes['value'].value,
            dropdownCover: false,
            selectedPlan: value
        })
    }
    handleDropDownYear = (event) => {
        this.setState({
            dropdownYearValue: event.target.attributes['value'].value,
            dropdownYear: false
        })
    }

    handleGetDiscountDialog = () => {
        this.setState({ discountDialog: !this.state.discountDialog })
    }

    componentWillMount() {
        this.setState({ selectedPlan: this.props.currentPlan })

    }
    calculateAddonAmount() {
        let currentPlan = this.props.currentPlan
        let amt = currentPlan.basePremium
        currentPlan.addOns = currentPlan.addOns.map(adn => {
            // let addon = adn
            if (adn.checked) {
                amt = Number(amt) + Number(adn.amount)
            }
        })
        return Number(amt)
    }
    updateAddonAmount(addons, amt) {
        return addons.map(adn => {
            if (adn.calculationType === 'ON_TOTAL_BASE_PREMIUM') {
                adn.amount = Math.round(amt * (adn.percentage / 100))
            }
            return adn
        })
    }
    getAmountWithoutPercent() {
        let currentPlan = this.props.currentPlan
        let amt = Number(currentPlan.basePremium)
        currentPlan.addOns.map(adn => {
            if (adn.checked && adn.amountType === 'ABSOLUTE') {
                amt += adn.amount
            }
        })
        return amt
    }
    getAmountWithPercent(nowAmount) {
        let currentPlan = this.props.currentPlan
        let amt = 0
        currentPlan.addOns.map(adn => {
            if (adn.checked && adn.calculationType === 'ON_TOTAL_BASE_PREMIUM') {
                amt += Math.round(nowAmount * (adn.percentage / 100))
            } else {
                console.log('else case addon', adn)
            }
        })

        return amt
    }
    handleChange = (item) => () => {

        let currentPlan = this.props.currentPlan
        let amt = Number(currentPlan.premium)
        let nowAmount = 0;
        currentPlan.addOns = currentPlan.addOns.map(adn => {
            let addon = adn
            if (adn.name === item.name) {
                if (adn.calculationType === 'ON_TOTAL_BASE_PREMIUM') {
                    if (adn.checked) {
                        addon.checked = !adn.checked
                        const decAmount = this.calculateAddonAmount()
                        amt = decAmount
                        const adnAmount = amt * (adn.percentage / 100)
                        addon.amount = adnAmount
                    } else {
                        const adnAmount = amt * (adn.percentage / 100)
                        amt += Math.round(adnAmount)
                        addon.checked = !adn.checked
                        addon.amount = adnAmount
                    }

                } else if (adn.amountType === 'ABSOLUTE') {

                    if (adn.checked) {
                        nowAmount = Number(this.getAmountWithoutPercent()) - adn.amount
                        amt = nowAmount + Number(this.getAmountWithPercent(nowAmount))
                    } else {
                        nowAmount = Number(this.getAmountWithoutPercent()) + adn.amount
                        amt = nowAmount + Number(this.getAmountWithPercent(nowAmount))
                    }
                    addon.checked = !adn.checked
                }
            }
            return addon
        })

        if (item.calculationType !== 'ON_TOTAL_BASE_PREMIUM') {
            currentPlan.addOns = this.updateAddonAmount(currentPlan.addOns, nowAmount)
        }

        const serviceTax = Math.round((18 / 100) * amt)
        // let totalPremium = (Number(amt) + Number(serviceTax))
        let totalPremium = Math.round(amt + serviceTax)
        // totalPremium = Number(totalPremium).toFixed(2)
        // amt = Number(amt).toFixed(2)
        currentPlan.premium = amt
        currentPlan.gst = serviceTax
        currentPlan.totalPremium = totalPremium

        const premiumDetails = {
            premiumAmount: amt,
            serviceTax: serviceTax,
            premiumWithServiceTax: totalPremium,
            proposerId: null
        }
        console.log(serviceTax, totalPremium, amt)
        this.props.onPremiumFetch(premiumDetails)
        this.props.setCurrentPlan(currentPlan)
        this.props.selectedPlan(currentPlan)
        this.forceUpdate()
        //this.props.forceUpdate()
        //   console.log("addons Called to update")
        //   alert("update addon on mandatory")
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

        const serviceTax = ((18 / 100) * amt).toFixed(2)
        const totalPremium = (amt + serviceTax).toFixed(2)
        amt = amt.toFixed(2)
        currentPlan.premium = amt
        currentPlan.gst = serviceTax
        currentPlan.totalPremium = totalPremium

        const premiumDetails = {
            premiumAmount: amt, // Package Premium
            serviceTax: serviceTax,
            premiumWithServiceTax: totalPremium,
            proposerId: null
        }
        this.props.onPremiumFetch(premiumDetails)
        this.props.setCurrentPlan(currentPlan)
        this.props.selectedPlan(currentPlan)
        //  this.forceUpdate()
        //this.props.forceUpdate()
        //   alert("update addon on mandatory")
    }

    componentDidMount() {
        this.setState({ deductibles: this.props.currentPlan.deductibleAmount })
    }
    handleCloseTooltip = () => {
        const {mandatoryAddonTooltip} = this.state;
        this.setState({mandatoryAddonTooltip: !mandatoryAddonTooltip})
    }

    render() {
        const { classes } = this.props;
        const {mandatoryAddonTooltip} = this.state;
        return (
            <div className="parent-div-quote-details">
                <Row>
                    <Col md="8">
                        <Panel>
                            <div style={{ textAlign: 'right' }}>
                            </div>
                            {/* Here the discount Dialog */}
                            <GetDiscount open={this.state.discountDialog} close={this.handleGetDiscountDialog} />
                            <img src={`${constants.mediaBucketURL}/${this.props.currentPlan ? this.props.currentPlan.insurerLogo : ''}`} alt="insurer" />
                            <span className="no_of_plans">
                                {this.props.currentPlan && this.props.currentPlan.planName}</span><br />

                            {/* Dropdown */}
                            <div className="dropdown-quote-details mui--hidden-xs mui--hidden-sm">
                            </div>
                            {/* Dropdown mobile */}
                            <div className="dropdown-insurer-mobile mui--hidden-md mui--hidden-lg mui--hidden-xl">
                                <div className="dropdown-insurer-mobile-btn">
                                    {this.props.currentPlan.policyName}
                                    <KeyboardArrowDown color="black" style={{ marginBottom: '-8px' }} />
                                </div>
                            </div>
                            <Row>
                                <Col md="12">
                                    {/* Pdf link*/}
                                    <a href={`${constants.mediaBucketURL}/${this.props.currentPlan.policyBrochure}`} target="_blank">
                                        <p className="policy-broucher">
                                            <span>
                                                <i class="material-icons" style={{ fontSize: '13px', color: '#ea0b4b' }}>
                                                    picture_as_pdf
                                               </i>
                                            </span>&nbsp;
                                            <a href={`${constants.mediaBucketURL}/${this.props.currentPlan.policyBrochure}`}
                                                style={{ color: '#ea0b4b' }} target="_blank">
                                                <span>Policy Brochure</span></a>
                                            <span style={{ color: '#000000' }}> &amp; </span>
                                            <a href={`${constants.mediaBucketURL}/${this.props.currentPlan.policyWording}`} style={{ color: '#ea0b4b' }}
                                                target="_blank">
                                                <span>TnC </span></a>
                                        </p>
                                    </a>
                                </Col>
                            </Row>
                            <hr style={{ margin: '0px -15px' }} className="mui--hidden-md mui--hidden-lg mui--hidden-xl" />

                            {/* details for plan */}
                            <Row>
                                <Col md="6">
                                    <table style={{ width: '100%', marginTop: '1rem' }}>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <span>Cover Type</span>
                                                </td>
                                                <td>
                                                    {this.props.currentPlan.planType &&
                                                        <div className="dropdown-comp-cover">
                                                            <div className="dropdown-comp-cover-btn" >
                                                                {this.props.currentPlan.coverageType}
                                                            </div>
                                                        </div>
                                                    }

                                                </td>
                                            </tr>

                                            {this.props.currentPlan.planType == "TOP_UP" &&
                                                <tr className="">
                                                    <td>
                                                        <p style={{ marginTop: '8px', marginBottom: '10px' }}><span className="heading-h6 grey">Deductible</span><span class="field-item tooltipHQ"><i class="material-icons" style={{
                                                            fontSize: '14px', verticalAlign: 'middle', marginLeft: '3px'
                                                        }} >help</i>
                                                            <span class="tooltiptext" style={{ color: '#ffffff' }}>The expenses that are not covered in your policy.
                                                       </span></span>
                                                        </p>
                                                    </td>
                                                    <td>
                                                        <FormControl fullWidth margin="dense">

                                                            <InputLabel htmlFor="age-simple"></InputLabel>
                                                            <Select
                                                                value={this.state.deductibles}

                                                                onChange={this.handleChangeDeductible('deductibles')}
                                                                inputProps={{
                                                                    name: 'income',
                                                                    id: 'income',
                                                                }}
                                                            >
                                                                {this.props.quoteDetails.insurerPlans ? this.props.quoteDetails.insurerPlans.map(item => <MenuItem value={item.deductibleAmount}>{this.convertAmountToLacs(item.deductibleAmount)} Lacs</MenuItem>) : ''}

                                                            </Select>
                                                        </FormControl>
                                                    </td>
                                                </tr>}
                                            <tr className="">
                                                <td>
                                                    <span>OPD Cover</span>
                                                </td>
                                                <td>
                                                    <p className="current-amount">{this.props.currentPlan.opdAmount ? this.props.currentPlan.opdAmount : 0}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Cashless Hospital at
                                                    <span onClick={this.editPremiumBreakup} edit mui--hidden-xs mui--hidden-sm style={{
                                                        fontSize: '18px',
                                                        color: '#ea0b4b'
                                                    }}>
                                                        &nbsp;{this.props.inputFormDataHealth ? this.props.inputFormDataHealth.selfPincode : ''} Edit
                                                    </span>
                                                    {/* <span className="edit mui--hidden-xs mui--hidden-sm" onClick={this.editPremiumBreakup} >&nbsp; Edit</span>
                                                    </span>                                                         */}
                                                    {this.props.model_id === "cashless_hospital" ?
                                                        <PremiumBreakup closeMethod={(value) => () => { this.setState({ PremiumBreakup: value }) }} plan={this.props.currentPlan} /> : null
                                                    }
                                                </td>
                                                <td>
                                                    <span className="no_of_garage">{this.props.currentPlan.hospitalsNearYou}</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Col>
                                <Col md="6" style={{ borderLeft: window.innerWidth < 768 ? 'none' : '1px solid #979797' }}>
                                    <table style={{ width: '100%', marginTop: '1rem' }}>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <span>Policy Term</span><br />
                                                    {false && <span className="guide-line">You can avail discount by increasing your term period</span>}
                                                </td>
                                                <td>
                                                    <div className="td2">
                                                        <div
                                                            className="dropdown-year-btn"
                                                            onClick={() => {
                                                                const vm = this;
                                                                this.setState({ dropdownYear: !vm.state.dropdownYear })
                                                            }}>
                                                            {this.state.dropValuehide == 1 ? '1 year' : "3 years<KeyboardArrowDown style={{ marginBottom: '-8px' }}"}

                                                        </div>
                                                        {/* {this.state.dropdownYear &&
                                                            <div className="dropdown-year-content">
                                                                {/* {this.props.quoteDetails.insurerPlans ? this.props.quoteDetails.insurerPlans.map((item, index) =>
                                                            <p value={index} onClick={this.handleDropDownComp(item)}>{item.planName}</p>
                                                        ) : ''} 
                                                                <p value="1" onClick={this.handleDropDownYear}>Text 1</p>
                                                                <p value="2" onClick={this.handleDropDownYear}>Text 2</p>
                                                                <p value="3" onClick={this.handleDropDownYear}>Text 3</p>
                                                                <p value="4" onClick={this.handleDropDownYear}>Text 4</p>
                                                            </div>
                                                        } */}
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span>
                                                        Cover Value
                                            </span>
                                                </td>
                                                <td>
                                                    <div className="td2">
                                                        {this.props.currentPlan.sumInsured}
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span>
                                                        Existing Disease after
                                            </span>
                                                </td>
                                                <td>
                                                    <div className="td2">
                                                        {this.props.currentPlan.preExistingDisease}
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span>
                                                        Room Rent Eligibility
                                                   </span>
                                                </td>
                                                <td>
                                                    <div className="td2">
                                                        {this.props.currentPlan.roomRentEligibility}
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <span>
                                                        Co-Pay
                                                   </span>
                                                </td>
                                                {this.props.currentPlan &&
                                                    <td>
                                                        {this.props.currentPlan.coPay && Object.keys(this.props.currentPlan.coPay).length === 0 && this.props.currentPlan.coPay.constructor === Object ?
                                                            <div className="td2">
                                                                <div className='copay gbui-subtitle-3' style={{ color: '#000000' }}> NA
                                                            </div>
                                                            </div> :
                                                            <div>
                                                                {this.props.currentPlan.coPay && Object.keys(this.props.currentPlan.coPay).map(key =>
                                                                    <div className="td2">
                                                                        <div className='copay gbui-subtitle-3' style={{ color: '#000000' }}>{key}
                                                                            <span className='gbui-body-3' style={{ color: '#808080', margin: '0px 5px' }}>for {this.props.currentPlan.coPay[key]} years</span>
                                                                        </div>
                                                                    </div>)}
                                                            </div>}
                                                    </td>}
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span>
                                                        No Claim Bonus
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="td2">
                                                        {this.props.currentPlan.noClaimBonus === '' ? 'NA' : this.props.currentPlan.noClaimBonus}
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span>
                                                        Medical Test Required
                                            </span>
                                                </td>
                                                <td>
                                                    <div className="td2">
                                                        {this.props.currentPlan.medicalTestRequired ? this.props.currentPlan.medicalTestRequired : 'NA'}
                                                    </div>
                                                </td>
                                            </tr>
                                            {/* <tr>
                                                <td>
                                                    <span>
                                                        Medical Test Amount
                                            </span>
                                                </td>
                                                <td>
                                                    <div className="td2">
                                                        {this.props.currentPlan.medicalTestAmount ? this.props.currentPlan.medicalTestAmount : 'NA'}
                                                    </div>
                                                </td>
                                            </tr> */}
                                            <tr>
                                                <td>
                                                    <span>
                                                        Premium/Lac of SI
                                            </span>
                                                </td>
                                                <td>
                                                    <div className="td2">
                                                        {this.props.currentPlan.premiumPerLacOfSI ? this.props.currentPlan.premiumPerLacOfSI : 'NA'}
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Col>
                            </Row>
                            {/* <p className="plan-incl-excl-text" onClick={this.PremiumBreakup}>Plan Coverage</p>
                            {this.props.model_id === 'plan_cover' ?
                                <PremiumBreakup closeMethod={(value) => () => { this.setState({ PremiumBreakup: value }) }} plan={this.props.currentPlan} /> : null
                            } */}

                            <hr style={{ margin: '0px -15px', backgroundColor: '#aaaaaa' }} />

                            {/* Key Features Div */}
                            <div className="key-feature-div">
                                <div className="MOB-KEY-FEATURE mui--hidden-md mui--hidden-lg mui--hidden-xl">
                                    <h3 className="key-feature-heading">Key Feature</h3>
                                    <p>1. Key Feature one</p>
                                    <p>2. Key Feature two</p>
                                </div>
                                <Row className="mui--hidden-xs mui--hidden-sm">
                                    <h3 className="key-feature-heading-md gbui-h6">Key Features</h3>
                                    {this.props.currentPlan.keyFeatureList && this.props.currentPlan.keyFeatureList.map(item =>
                                        <Col md="4" lg="4" xl="4">
                                            <Row>
                                                <Col md="12">
                                                    <h3>{item.featureName}</h3>
                                                    <p>{item.featureDescription}</p>
                                                    <br />
                                                </Col>
                                            </Row>
                                        </Col>
                                    )}
                                </Row>
                                <p className="see-more"
                                    onClick={() => {
                                        window.scrollTo({ left: 0, top: document.getElementById('keyFeatures').offsetTop - 30, behavior: 'smooth' })
                                    }}>
                                    See more features</p>
                            </div>

                            <div className="addons-div">
                                {this.props.currentPlan.addOns && this.props.currentPlan.addOns.length > 0 &&
                                    (<h3 className="addons-heading">
                                        Add - Ons {/*<Help style={{ fontSize: '13px' }} />*/}
                                    </h3>)
                                }


                                {<Row>
                                    {this.props.currentPlan.addOns ? this.props.currentPlan.addOns.map((item) =>
                                        <Col md="4">
                                            <Panel>
                                                <p className="addon-name mui--hidden-xs mui--hidden-sm">{item.name} {item.mandatory && <Tooltip
                                                    title={"This add-ons is mandatory with this plan"}
                                                    placement="right-start">
                                                    <Help style={{ fontSize: '13px' }} />
                                                </Tooltip>}</p>
                                                <p className="addon-name mui--hidden-md mui--hidden-lg mui--hidden-xl">{item.name} {item.mandatory &&
                                                    <Help onClick={this.handleCloseTooltip} style={{ fontSize: '13px' }} />}</p>

                                                <hr />
                                                <p className="benifits">Benefits</p>
                                                <p className="addon-desc">{item.benefit}</p>
                                                <hr />
                                                <p className="addon-price">Rs.{item.amount}</p>
                                                <p className="a-r-checkbox">
                                                    {/* {item.mandatory && this.handleChangeAuto(item)} */}
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={item.checked}
                                                                disabled={item.mandatory}
                                                                value="checkedG"
                                                                classes={{
                                                                    root: classes.rootCheck,
                                                                    checked: classes.checked,
                                                                }}
                                                                onChange={this.handleChange(item)}
                                                            />
                                                        }
                                                        label={item.checked ? "Remove" : "Add"}
                                                        labelPlacement="start"
                                                    />

                                                </p>
                                            </Panel>
                                        </Col>
                                    ) : ''}
                                </Row>}
                            </div>


                            {/* Performance details */}
                            {/* <div className="performance-details">
                                <h3 className="pf-d-heading">Performance Details</h3>

                                <div className="box">
                                    <div className="text-box">
                                        <p className="text-1">{this.props.quoteDetails.performanceDetails ? this.props.quoteDetails.performanceDetails.claimsSettled : ''}%</p>
                                        <p className="text-2">Claims Settled</p>
                                    </div>
                                </div>
                                <div className="box">
                                    <div className="text-box">
                                        <p className="text-1">{this.props.quoteDetails.performanceDetails ? this.props.quoteDetails.performanceDetails.policyIssued : ''} days</p>
                                        <p className="text-2">Policy Issues</p>
                                    </div>
                                </div>
                                <div className="box">
                                    <div className="text-box">
                                        <p className="text-1">{this.props.quoteDetails.performanceDetails ? this.props.quoteDetails.performanceDetails.policyServed : ''} days</p>
                                        <p className="text-2">Policy served</p>
                                    </div>
                                </div>
                                <div className="box">
                                    <div className="text-box">
                                        <p className="text-1">{this.props.quoteDetails.performanceDetails ? this.props.quoteDetails.performanceDetails.claimsServiced : ''} days</p>
                                        <p className="text-2">Claims Serviced</p>
                                    </div>
                                </div>
                            </div> */}

                            {/* Policy Details */}
                            <div className="policy-details">
                                <p className="policy-details-heading">Policy Description</p>
                                <p className='gbui-body-2 first-disclaimer' style={{ color: '#ea0b4b' }}>For better visibility, we have highlighted policy features with amount limitations.</p>
                                {/* TAbs */}
                                <div className="tabs">
                                    <ul>
                                        <li
                                            className={this.state.pdTab === 0 ? "active" : "nactive"}
                                            onClick={() => { this.setState({ pdTab: 0 }) }}>Benefits & Features</li>
                                        <li
                                            className={this.state.pdTab === 1 ? "active" : "nactive"}
                                            onClick={() => { this.setState({ pdTab: 1 }) }}>Policy Conditions</li>
                                        <li
                                            className={this.state.pdTab === 2 ? "active" : "nactive"}
                                            onClick={() => { this.setState({ pdTab: 2 }) }}> Other Details</li>
                                    </ul>
                                </div>
                                <div className="tab-content">
                                    {/* <h3 className="key-benifit-heading">Key Benefits of this plan</h3>
                                    <p>
                                        {this.props.quoteDetails.policyDescription ? this.props.quoteDetails.policyDescription.benefitsAndFeatures : ''}
                                    </p> */}
                                    {this.state.pdTab === 0 && <div>
                                        <p id="keyFeatures">
                                            {this.props.currentPlan.policyDescription &&
                                                <Row>
                                                    <Col lg={12}>
                                                        <h3>
                                                            <RawHTML>{this.props.currentPlan.policyDescription ? this.props.currentPlan.policyDescription.benefitsAndFeatures : 'NA'}</RawHTML>
                                                        </h3>
                                                    </Col>
                                                </Row>
                                            }
                                        </p>
                                    </div>}
                                    {this.state.pdTab === 1 && <div>
                                        <p id="keyFeatures">
                                            {this.props.currentPlan.policyDescription &&
                                                <Row>
                                                    <Col lg={12}>
                                                        <h3>
                                                            <RawHTML>{this.props.currentPlan.policyDescription ? this.props.currentPlan.policyDescription.policyConditions : 'NA'}</RawHTML>
                                                        </h3>
                                                    </Col>
                                                </Row>
                                            }
                                        </p>
                                    </div>}
                                    {this.state.pdTab === 2 && <div>
                                        <p id="keyFeatures">
                                            {this.props.currentPlan.policyDescription &&
                                                <Row>
                                                    <Col lg={12}>
                                                        <h3>
                                                            <RawHTML>{this.props.currentPlan.policyDescription ? this.props.currentPlan.policyDescription.otherDetails : 'NA'}</RawHTML>
                                                        </h3>
                                                    </Col>
                                                </Row>
                                            }
                                        </p>
                                    </div>}
                                </div>

                                <hr />

                                <h3 className="disclaimer">Disclaimer</h3>

                                <p className="disclaimer-text">
                                    {this.props.currentPlan.policyDescription ? this.props.currentPlan.policyDescription.disclaimer : null}
                                    <a href={`${constants.mediaBucketURL}/${this.props.currentPlan.policyBrochure}`} target="_blank">
                                        <span>Policy Brochure</span></a><span style={{ margin: '0px 5px' }}>&</span>
                                    <a href={`${constants.mediaBucketURL}/${this.props.currentPlan.policyWording}`} target="_blank"><span> TnC</span></a>
                                </p>
                            </div>

                            {/* secureity and partners */}
                            {/* <Row className="partners">
                                <Col md="1" sm="7" xs="7">
                                    <img
                                        src="/assets/irdai.jpeg"
                                        alt="irdai"
                                        width="55"
                                        height="55" />
                                    <p className="licenced_no">LICENSED No.<br />123243567yterwq</p>
                                </Col>
                                <Col md="2" sm="5" xs="5">
                                    <div className="rectangle"></div>
                                    <div className="rectangle"></div>
                                    <p style={{ marginLeft: '30px' }}>SECURE</p>
                                </Col>
                                <Col md="6" sm="12" xs="12" className="networks">
                                    {new Array(7).fill(0, 0).map(item =>
                                        <div className="rectangle"></div>
                                    )}
                                    <p style={{ marginLeft: '8.3rem', display: 'block' }}>PAYMENT NETWORK</p>
                                </Col>
                            </Row> */}
                        </Panel>
                    </Col>
                    <Col md="4">
                        {/* {this.props.healthTab !== 0 &&
                            <Panel style={{ marginTop: '15px', marginRight: '0px', backgroundColor: '#9c0f46' }}>
                                <Row>
                                    <Col md="3">
                                        <div style={{ width: '55px', height: '55px', borderRadius: '50%', textAlign: 'center', backgroundColor: '#ffffff' }}>
                                            <i class="material-icons" style={{ color: '#9c0f46', fontSize: '25px', margin: '7px 12px 0px' }}>shopping_basket</i>
                                            <div style={{ color: '#9c0f46', fontFamily: 'Nunito', fontSize: '9.1px', }}>Bag</div>
                                        </div>
                                    </Col>
                                    <Col md="9">
                                        <div style={{ textAlign: 'left' }}>
                                            <div style={{ fontFamily: 'Nunito', fontSize: '12px', color: '#ffffff' }}> Group 1: -</div>
                                            <div style={{ fontFamily: 'Nunito', fontSize: '12px', color: '#ffffff' }}> Group 2: -</div>
                                            <div style={{ fontFamily: 'Nunito', fontSize: '12px', color: '#ffffff' }}> Group 3: -</div>
                                            <div style={{ fontFamily: 'Nunito', fontSize: '12px', color: '#ffffff' }}> Total Amount: -</div>
                                        </div>
                                    </Col>
                                </Row>
                            </Panel>
                        } */}
                        <div className="mui--hidden-xs mui--hidden-sm">
                            <PaymentDetails key={'New'} />
                        </div>
                        <Panel className="mui--hidden-lg mui--hidden-md mui--hidden-xl">
                            <p className="total-premium-heading" onClick={this.PremiumBreakupPopUp}>Total Premium <span>Full Premium Breakup</span></p>
                            {this.props.model_id === 'PREMIUM_BREAKUP' ?
                                <PremiumBreakup closeMethod={(value) => () => { this.setState({ PremiumBreakup: value }) }} plan={this.props.currentPlan ? { ...this.props.currentPlan } : {}} /> : null
                            }
                            <p className="details-addon">Details & Add-Ons <KeyboardArrowUp style={{ marginBottom: '-8px' }} /></p>
                            <Row>
                                <Col sm="7" xs="7">
                                    <p className="amount-year">{this.props.currentPlan ? this.props.currentPlan.totalPremium : 'NA'}/<sup>/Year</sup></p>
                                    <p className="cover-value">Cover Value: {this.props.currentPlan ? this.props.currentPlan.sumInsured : 'NA'}</p>
                                </Col>
                                <Col sm="5" xs="5">
                                    {/* Buy policy button */}
                                    <Link to={{ pathname: `/proposal-form-health`, state: { insurer: this.props.currentPlan } }}>
                                        <Button
                                            className={classNames(classes.buttonRoot3)}>Buy Policy</Button>
                                    </Link>
                                </Col>
                                <Col xs="12" className="mui--hidden-md mui--hidden-lg">
                                    <hr className="hr-ln" />

                                    {/* Addons */}
                                    <div className="addons">
                                        {this.props.currentPlan.addOns && this.props.currentPlan.addOns.length > 0 &&
                                            (<h3
                                                className="addons-heading">
                                                Add - Ons
                                                </h3>)
                                        }
                                        {this.props.currentPlan.addOns ? this.props.currentPlan.addOns.map((item, index) =>
                                            item.checked ? (<div key={index}>
                                                {item.checked && <Row>
                                                    <Col xs="7">
                                                        <p className="addon-text">{item.name}</p>
                                                    </Col>
                                                    <Col xs="5">
                                                        <p className="addon-amount">Rs. {item.amount} </p>
                                                    </Col>
                                                </Row>

                                                }</div>) : '') : console.log(this.props.currentPlan, 'From Payment')}


                                    </div>
                                    {/* Premium */}
                                    <div className="premium">
                                        <h3 className="premium-heading">PREMIUM</h3>
                                        <Row>
                                            <Col xs="7">
                                                <p className="premium-text">Base Premium</p>
                                                <p className="premium-text">Package Premium</p>
                                                <p className="premium-text">GST@18%</p>
                                                <p className="premium-text">Total Premium</p>
                                            </Col>
                                            <Col xs="5">
                                                <p className="premium-amount">Rs. {this.props.currentPlan ? this.props.currentPlan.basePremium : 'NA'} </p>
                                                <p className="premium-amount">Rs. {this.props.currentPlan ? this.props.currentPlan.premium : 'NA'} </p>
                                                <p className="premium-amount">Rs. {this.props.currentPlan ? this.props.currentPlan.gst : 'NA'} </p>
                                                <p className="premium-amount">
                                                    <span className="amount">
                                                        Rs. {this.props.currentPlan ? this.props.currentPlan.totalPremium : 'NA'}/
                                                    <span>
                                                            year
                                                    </span>
                                                    </span>
                                                </p>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </Panel>
                    </Col>
                </Row>
                {/* Mandatory addon tooltip */}
                <Dialog
                    onClose={this.handleCloseTooltip}
                    aria-labelledby="simple-dialog-title"
                    open={mandatoryAddonTooltip}>
                    {/* Cross icon */}
                    <div
                        className="mandatory-addon-cancel">
                        <img
                            src="/assets/cancel.svg"
                            alt="cancel"
                            onClick={this.handleCloseTooltip}/></div>
                    <div className="mandatory-addon-div">
                        This add-ons is mandatory with this plan
                    </div>
                </Dialog>
            </div>
        )
    }
}

QuoteDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        premiumBreakup: state.popup.premium_breakup_modal,
        model_id: state.popup.model_id,
        currentPlan: state.currentPlan.details ? { ...state.currentPlan.details } : {},
        healthTab: state.GroupHealthTabs.value,
        inputFormDataHealth: state.inputFormHealth.inputFormHealthData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSelectPremium: (premium, model_id) => dispatch({ type: 'PREMIUM_BREAKUP_MODAL', premium, model_id }),
        setCurrentPlan: (plan) => dispatch({ type: 'CURRENT_PLAN', plan }),
        onPremiumFetch: (data) => dispatch({ type: 'PREMIUM_DETAILS', data })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(QuoteDetails))