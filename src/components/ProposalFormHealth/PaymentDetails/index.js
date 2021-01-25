import React from 'react'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Panel from 'muicss/lib/react/panel'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import StarRate from '@material-ui/icons/StarRate'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog'
import classNames from 'classnames'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Divider from '@material-ui/core/Divider'

import './payment_proposal.css'
import ButtonLightSuccess from '../../Shared/ButtonLightSuccess/index'
import PremiumBreakup from '../../PremiumBreakupPopUp/index'
import constants from '../../../constants/appConstants.json'
import Sticky from 'react-stickynode';



const styles = theme => ({
    root: {
        flexGrow: 0,
        backgroundColor: theme.palette.background.paper,
    },
    buttonRoot3: {
        color: 'white',
        backgroundColor: '#ea0b4b',
        '&:hover': {
            backgroundColor: '#ea0b4b',
        },
        padding: '13px 50px',
        marginTop: '1rem',
        marginLeft: '0.5rem'
    },
    dialogContent: {
        padding: '16px'
    },
    checkbox: {
        '&$checked': {
            color: '#ea0b4b',
        },
    },
    checked: {},
    label: {
        fontFamily: 'Nunito',
        fontSize: '16px',
        color: '#000000',
    },
    tab: {
        fontSize: '14px',
        textTransform: 'capitalize',
        minWidth: '50%',
        color: '#000000',
        minHeight: 40,
        fontFamily: 'Nunito',
    },
    tabsIndicator: {
        backgroundColor: '#9c0f46',
    },
})
class PaymentDetails extends React.Component {

    state = {
        RoundedOffValue: 0,
        tab_value: 1,
        group: false,
        open: false,
        editAddon: false,
        checkedA: false,
        value: 0,
        docheight:0,
        footerid: 0,
    }

    componentWillMount() {
        let calculatedValue = (this.props.premium && this.props.premium.premiumWithServiceTax - this.props.currentPlan && this.props.currentPlan.totalPremium) / this.props.currentPlan &&
            this.props.currentPlan.totalPremium * 100
        let RoundedOffValue = Math.round(calculatedValue)

        this.setState({
            RoundedOffValue: RoundedOffValue
        })
    }
    // componentDidMount(){
        
    //     window.addEventListener("scroll", () => {
    //         let footerid = document.querySelector('#footer_main_here').offsetTop
    //         this.setState({footerid})
    //     })
    // }
    // componentWillUnmount() {
    //     window.removeEventListener('scroll');
    // }
    
    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClickedit = () => {
        this.setState({
            editAddon: true,
        });
    };

    handleChangeCheckbox = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    handleClose = value => {
        this.setState({
            selectedValue: value, open: false,
            editAddon: false,
        });
    };
    handleChangeTab = (event, value) => {
        this.setState({ value: value });
    };

    Coverage = () => {
        this.props.onSelectPremium(true, 1)
    }

    PremiumBreakup = () => {
        this.props.onSelectPremium(true, "PREMIUM_BREAKUP")
    }
 
    render() {
        // var footerid = document.querySelector('#footer_main_here')
        // console.log(footerid1, "uuuuuuuzzz")
        // console.log(footerid.offsetTop, "uuuuuuuuuuuu")
        const { fullScreen, classes } = this.props;
        const { value, footerid } = this.state;
        const amountVaried = Math.round(((this.props.premium.premiumWithServiceTax - this.props.currentPlan.totalPremium)/this.props.currentPlan.totalPremium)*100)

        return (
            // <Sticky enabled={true} top={50} 
            // bottomBoundary={footerid}
            // >

       <div className="payment-proposal-form-motor-parent">
                {this.state.group ?
                    <Panel style={{ marginBottom: '0px', boxShadow: 'none' }}>
                        {/* <Row>
                            <Col md={6} className='group-column'>
                                <div className='group1'>Self + 2</div>
                                <div className='description'>(You, your wife, and two sons)</div>
                            </Col>
                            <Col md={6} className='group-column'>
                                <div className='cover'>Comprehensive Cover
                             <i style={{
                                        verticalAlign: 'middle',
                                        fontSize: '24px',
                                        margin: '0px 4px',
                                        color: '#808080'
                                    }} class="material-icons">close</i>
                                </div>
                            </Col>
                            <Col md="3">
                                <img src="/assets/group.svg" alt="insurer" />
                            </Col>
                            <Col md="5">
                                <p className="package-name">
                                    Bajaj Allianz car policy package
                            </p>
                                <p className="customer-rating">
                                    Customers Rating:
                                <span className="rating-value">4.7</span>
                                    <StarRate style={{ marginBottom: '-8px', color: "#efce4a" }} />
                                </p>
                                <p className="gb-rating">
                                    GB Rating: <span>4.7</span>
                                    <StarRate style={{ marginBottom: '-8px', color: '#efce4a' }} />
                                </p>
                            </Col>
                            <Col md="4">
                                <p className="plan-details">Plan Details</p>
                                <p className="total-premiuim">Total Premium</p>
                                <p className="amount">Rs. 1,143<span>/month</span></p>
                            </Col>
                        </Row>
                        <hr />
                        <div>
                            <p className="total-detail">3 Add-ons, 2 Additional Cover and 1 Discount applied</p>
                            <p className="edit" onClick={this.handleClickedit}>Edit</p>
                        </div>
                        <hr />
                        <Row>
                            <Col md={6} className='group-column'>
                                <div className='group1'>Parents</div>
                                <div className='description'>(Father & Mother)</div>
                            </Col>
                            <Col md={6} className='group-column'>
                                <div className='cover'>Comprehensive Cover
                             <i style={{
                                        verticalAlign: 'middle',
                                        fontSize: '24px',
                                        margin: '0px 4px',
                                        color: '#808080'
                                    }} class="material-icons">close</i>
                                </div>
                            </Col>
                            <Col md="3">
                                <img src="/assets/group.svg" alt="insurer" />
                            </Col>
                            <Col md="5">
                                <p className="package-name">
                                    Bajaj Allianz car policy package
                            </p>
                                <p className="customer-rating">
                                    Customers Rating:
                                <span className="rating-value">4.7</span>
                                    <StarRate style={{ marginBottom: '-8px', color: "#efce4a" }} />
                                </p>
                                <p className="gb-rating">
                                    GB Rating: <span>4.7</span>
                                    <StarRate style={{ marginBottom: '-8px', color: '#efce4a' }} />
                                </p>
                            </Col>
                            <Col md="4">
                            
                                <p className="plan-details">Plan Details</p>
                                <p className="total-premiuim">Total Premium</p>
                                <p className="amount">Rs. 1,143<span>/month</span></p>
                            </Col>
                        </Row>
                        <hr />
                        <div>
                            <p className="total-detail">3 Add-ons, 2 Additional Cover and 1 Discount applied</p>
                            <p className="edit" onClick={this.handleClickedit}>Edit</p>
                        </div>
                        <hr />
                        <Row>
                            <Col md={6} className='group-column'>
                                <div className='group1'>In Laws</div>
                                <div className='description'>(Father and Mother in laws)</div>
                            </Col>
                            <Col md={6} className='group-column'>
                                <div className='cover'>Comprehensive Cover
                             <i style={{
                                        verticalAlign: 'middle',
                                        fontSize: '24px',
                                        margin: '0px 4px',
                                        color: '#808080'
                                    }} class="material-icons">close</i>
                                </div>
                            </Col>
                            <Col md="3">
                                <img src="/assets/group.svg" alt="insurer" />
                            </Col>
                            <Col md="5">
                                <p className="package-name">
                                    Bajaj Allianz car policy package
                            </p>
                                <p className="customer-rating">
                                    Customers Rating:
                                <span className="rating-value">4.7</span>
                                    <StarRate style={{ marginBottom: '-8px', color: "#efce4a" }} />
                                </p>
                                <p className="gb-rating">
                                    GB Rating: <span>4.7</span>
                                    <StarRate style={{ marginBottom: '-8px', color: '#efce4a' }} />
                                </p>
                            </Col>
                            <Col md="4">
                                <p className="plan-details">Plan Details</p>
                                <p className="total-premiuim">Total Premium</p>
                                <p className="amount">Rs. 1,143<span>/month</span></p>
                            </Col>
                        </Row>
                        <hr />
                        <div>
                            <p className="total-detail">3 Add-ons, 2 Additional Cover and 1 Discount applied</p>
                            <p className="edit" onClick={this.handleClickedit}>Edit</p>
                        </div>
                        <hr /> */}
                        {/* policy tenure */}
                        {/* <div className="addon-div">
                            <h3 className="addon-heading">POLICY TENURE</h3>
                            <Row>
                                <Col md="6">
                                    <p className="addon-name">Policy Term</p>
                                </Col>
                                <Col md="6">
                                    <p className="addon-price">1 Year<span><i class="material-icons" style={{ verticalAlign: 'middle' }}>
                                        keyboard_arrow_down
                                            </i></span></p>
                                </Col>
                            </Row>
                        </div> */}
                        <div className='gbui-overline-2 ' style={{ textAlign: 'left', color: '#ea0b4b' }}>
                            You can avail discount by increasing your term period
                           </div>
                        {/* Addons */}
                        <div className="premium-div">
                            <Row>
                                <Col md="6">
                                    {/* <div className="premium-heading">ADD ONS</div> */}
                                </Col>
                                <Col md="6">
                                    <p className="plan-details" onClick={this.handleClickOpen}>View all Add-ons</p>
                                </Col>
                            </Row>
                            {this.props.currentPlan.addOns ? this.props.currentPlan.addOns.map(adn =>
                                adn.checked && <Row>
                                    <Col md="6">
                                        <p className="premium-name">{adn.name}</p>
                                    </Col>
                                    <Col md="6">
                                        <p className="premium-price">Rs. {adn.amount} </p>
                                    </Col>
                                </Row>
                            ) : ''}
                            {/* <Row>
                                <Col md="6">
                                    <p className="premium-name">Total Addons value...</p>
                                </Col>
                                <Col md="6">
                                    <p className="premium-price">Rs. 4,546 </p>
                                </Col>
                            </Row> */}
                        </div>
                        {/* Premium */}
                        <div className="premium-div">
                            <Row>
                                <Col md="6">
                                    <div className="premium-heading">PREMIUM</div>
                                </Col>
                                <Col md="6">
                                    <p className="plan-details" style={{ color: 'blue' }} onClick={this.PremiumBreakup}>Full Premium Breakup</p>
                                    {this.props.model_id === "PREMIUM_BREAKUP" ?
                                        <PremiumBreakup stepValue={0} isProposalSummary = {this.props.isProposalSummary} closeMethod={(value) => () => { this.setState({ PremiumBreakup: value }) }} plan={this.props.currentPlan} /> : null
                                    }
                                    {this.props.model_id === 1 ?
                                        <PremiumBreakup closeMethod={(value) => () => { this.setState({ PremiumBreakup: value }) }} plan={this.props.currentPlan} /> : null
                                    }
                                </Col>
                                <Col md="6">
                                    <p className="premium-name">Packagae Premium</p>
                                    <p className="premium-name">GST@18%</p>
                                    <p className="premium-name">Total Premium</p>
                                </Col>
                                <Col md="6">
                                    <p className="premium-price">Rs. {this.props.premium ? this.props.premium : 'NA'} </p>
                                    <p className="premium-price">Rs. {this.props.premium ? this.props.premium.serviceTax : 'NA'} </p>
                                    <p className="premium-price"><span>Rs. {this.props.premium ? this.props.premium.premiumWithServiceTax : 'NA'}<span>/year</span></span> </p>
                                </Col>
                            </Row>
                        </div>

                    </Panel> : <div>
                        <Panel>
                            <Row>
                                <Col md="3">
                                    <img src={`${constants.mediaBucketURL}/${this.props.currentPlan && this.props.currentPlan.insurerLogo}`} alt="insurer" />
                                </Col>
                                <Col md="5">
                                    <p className="package-name">
                                        {this.props.currentPlan && this.props.currentPlan.planName}
                                    </p>
                                    {/* <p className="customer-rating">
                                        Customers Rating:
                                <span className="rating-value">4.7</span>
                                        <StarRate style={{ marginBottom: '-8px', color: "#efce4a" }} />
                                    </p>
                                    <p className="gb-rating">
                                        GB Rating: <span>4.7</span>
                                        <StarRate style={{ marginBottom: '-8px', color: '#efce4a' }} />
                                    </p> */}
                                </Col>
                                <Col md="4">
                                    <p
                                        className="plan-details"
                                        onClick={() => { this.Coverage(); this.props.history.push("/health-quotes", { insurer: this.props.currentPlan }) }}>Plan Details</p>
                                    <p className="total-premiuim">Total Premium</p>
                                    <p className="amount">Rs. {this.props.premium ? this.props.premium.premiumWithServiceTax : 'NA'}<span>/year</span></p>
                                    {this.props.premium && (this.props.premium.premiumWithServiceTax > this.props.currentPlan.totalPremium) ? <p color="#ea0b4b">
                                        {amountVaried > 0 ? amountVaried+' % insurer increased the price' : amountVaried < 0 ? amountVaried+ ' % insurer decreased the price': ''}</p> : ''}
                                </Col>
                            </Row>
                            <hr />
                            {/* policy tenure */}
                            <div className="addon-div">
                                <h3 className="addon-heading">POLICY TENURE</h3>
                                <Row>
                                    <Col md="6">
                                        <p className="addon-name">Policy Term</p>
                                    </Col>
                                    <Col md="6">
                                        <p className="addon-price">1 Year
                                        {/* <span><i class="material-icons" style={{ verticalAlign: 'middle' }}>
                                            keyboard_arrow_down
                                            </i></span> */}
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                            <hr />
                            {/* Addons */}
                            <div className="addon-div">
                                {(this.props.currentPlan && this.props.currentPlan.addOns) ? <React.Fragment>
                                    <h3 className="addon-heading">ADD ONS</h3>
                                    {this.props.currentPlan.addOns.map(adn =>
                                        adn.checked && <Row>
                                            <Col md="6">
                                                <p className="addon-name">{adn.name}</p>
                                            </Col>
                                            <Col md="6">
                                                <p className="addon-price">Rs. {adn.amount} </p>
                                            </Col>
                                        </Row>
                                    )}
                                </React.Fragment> : ''}
                            </div>

                            {/* Premium */}
                            <div className="premium-div">
                                <h3 className="premium-heading">PREMIUM</h3>
                                <Row>
                                    <Col md="6">
                                        {!this.props.isProposalSummary && <React.Fragment>
                                            <p className="premium-name">Base Premium</p>
                                            <p className="premium-name">Package Premium</p>
                                            <p className="premium-name">GST@18%</p>
                                        </React.Fragment>
                                        }
                                        <p className="premium-name">Total Premium</p>
                                    </Col>
                                    <Col md="6">
                                        {!this.props.isProposalSummary && <React.Fragment><p className="premium-price">Rs. {this.props.premium ? this.props.premium.basePremium : 'NA'} </p>
                                            <p className="premium-price">Rs. {this.props.premium ? Math.round(this.props.premium.premiumAmount) : 'NA'} </p>
                                            <p className="premium-price">Rs. {this.props.premium ? Math.round(this.props.premium.serviceTax) : 'NA'} </p>
                                        </React.Fragment>}
                                        <p className="premium-price"><span>Rs. {this.props.premium ? this.props.premium.premiumWithServiceTax : 'NA'}<span>/year</span></span> </p>
                                    </Col>
                                </Row>
                            </div>
                            {/* Full premium breakup */}
                            <p className="premium-breakup" onClick={this.PremiumBreakup}>Full Premium Breakup</p>
                            {this.props.model_id === "PREMIUM_BREAKUP" ?
                                <PremiumBreakup stepValue={0} closeMethod={(value) => () => { this.setState({ PremiumBreakup: value }) }} plan={this.props.currentPlan ? this.props.currentPlan : {}} /> : null
                            }
                            <hr />
                            <div>
                                <p className="cover-type-heading">Coverage Type</p>
                                <p className="cover-type-value">{this.props.currentPlan && this.props.currentPlan.coverageType}</p>
                            </div>
                            {/* {this.props.component === 'preMedical' && */}
                            <div>
                                <div>
                                    <p className="cover-type-heading">Cover Value:</p>
                                    <p className="cover-type-value">Rs {this.props.currentPlan && this.props.currentPlan.sumInsured || "NA"}</p>
                                </div>
                                <div>
                                    <p className="cover-type-heading">Policy Term :</p>
                                    <p className="cover-type-value">1 year</p>
                                </div>
                                <div>
                                    <p className="cover-type-heading">Existing Disease after:</p>
                                    <p className="cover-type-value">{this.props.currentPlan && this.props.currentPlan.preExistingDisease}</p>
                                </div>
                                <div>
                                    <p className="cover-type-heading">No Claim Bonus:</p>
                                    <p className="cover-type-value">{this.props.currentPlan && this.props.currentPlan.noClaimBonus || 'NA'}</p>
                                </div>
                                <div>
                                    <p className="cover-type-heading">Medical Test Required:</p>
                                    <p className="cover-type-value">{this.props.currentPlan && this.props.currentPlan.medicalTestRequired || 'NA'}</p>
                                </div>
                            </div>
                            {/* } */}
                            <hr />
                            {/* <div>
                                <p className="total-detail">3 Add-ons, 2 Additional Cover and 1 Discount applied</p>
                                <p className="edit" onClick={this.handleClickedit}>Edit</p>
                            </div> */}
                            {/* {this.props.step === 5 && <Button
                                className={classNames(classes.buttonRoot3)}
                                fullWidth>
                                Payment/Pre-medical Checkup
                </Button>} */}
                        </Panel>
                        {/* Second Panel */}
                        {/* {this.props.step !== 5 && <Panel className={classes.root}>
                            <div className="tabs-payment">
                                <p className={this.state.tab_value === 1 ? "tabs-active" : ""}>Add-Ons</p>
                                <p className={this.state.tab_value === 2 ? "tabs-active" : ""}>Additional Covers</p>
                                <p className={this.state.tab_value === 3 ? "tabs-active" : ""}>Discounts</p>
                            </div>
                            <hr style={{ marginTop: '-10px', background: '#aaaaaa' }} />

                            {(this.state.tab_value === 1) &&
                                <div className="tabs-payment-content">
                                    <h3 className="recommend-heading">Reccomended Add-Ons <span>(3)</span></h3>

                                    <FormControl>
                                        <FormGroup>
                                            {new Array(3).fill(0, 0).map((item, index) =>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox checked={false} value={`Add-On${index + 1}`} />
                                                    }
                                                    label={`Add-On${index + 1}`}
                                                />
                                            )}
                                        </FormGroup>
                                    </FormControl>

                                    <h3 className="recommend-heading">More Add-Ons <span>(5)</span></h3>

                                    <FormControl>
                                        <FormGroup>
                                            {new Array(5).fill(0, 0).map((item, index) =>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox checked={false} value={`Add-On${index + 1}`} />
                                                    }
                                                    label={`Add-On${index + 1}`}
                                                />
                                            )}
                                        </FormGroup>
                                    </FormControl>
                                </div>
                            }
                        </Panel>} */}
                    </div>
                }
                <Dialog open={this.state.open}
                    className={classes.dialog}
                    maxWidth="sm"
                    onClose={this.handleClose}
                    fullWidth
                    fullScreen={fullScreen}
                    aria-labelledby="simple-dialog-title">
                    <DialogContent
                        className={classNames(classes.dialogContent)}
                    >
                        <Row className='add-on-row'>
                            <Col md={9}>
                                <div className='total-add-on-title'>Total Add ons</div>
                            </Col>
                            <Col md={3} style={{ textAlign: 'right' }}>
                                <i
                                    onClick={this.handleClose}
                                    style={{
                                        verticalAlign: 'middle',
                                        fontSize: '24px',
                                        color: '#808080',
                                        margin: '0rem 0rem 0.5rem 0rem;',
                                    }} class="material-icons">close</i>
                            </Col>
                            <Col md={12}>
                                <div className='group-heading'>Self + 2 <span style={{ color: '#000000' }}>(3)</span></div>
                            </Col>
                            {new Array(3).fill(0, 0).map((item, index) => <div>
                                <Col md={9}>
                                    <FormControlLabel classes={{ label: classes.label }}
                                        style={{ marginBottom: '0px' }}
                                        control={
                                            <Checkbox classes={{ root: classes.checkbox, checked: classes.checked, }}
                                                checked={this.state.checkedA}
                                                onChange={this.handleChangeCheckbox('checkedA')}
                                                value="checkedA"
                                            />
                                        }
                                        label='Some really long  add on name..........'
                                    />
                                </Col>
                                <Col md={3}>
                                    <p className="premium-price-add-on">Rs. 4,546 </p>
                                </Col></div>
                            )}
                            <Col md={12}>
                                <div className='group-heading'>Parents<span style={{ color: '#000000' }}>(3)</span></div>
                            </Col>
                            {new Array(3).fill(0, 0).map((item, index) => <div>
                                <Col md={9}>
                                    <FormControlLabel classes={{ label: classes.label }}
                                        style={{ marginBottom: '0px' }}
                                        control={
                                            <Checkbox classes={{ root: classes.checkbox, checked: classes.checked, }}
                                                checked={this.state.checkedA}
                                                onChange={this.handleChangeCheckbox('checkedA')}
                                                value="checkedA"
                                            />
                                        }
                                        label='Some really long  add on name..........'
                                    />
                                </Col>
                                <Col md={3}>
                                    <p className="premium-price-add-on">Rs. 4,546 </p>
                                </Col></div>
                            )}
                            <Col md={12}>
                                <div className='group-heading'>In-laws<span style={{ color: '#000000' }}>(3)</span></div>
                            </Col>
                            {new Array(3).fill(0, 0).map((item, index) => <div>
                                <Col md={9}>
                                    <FormControlLabel classes={{ label: classes.label }}
                                        style={{ marginBottom: '0px' }}
                                        control={
                                            <Checkbox classes={{ root: classes.checkbox, checked: classes.checked, }}
                                                checked={this.state.checkedA}
                                                onChange={this.handleChangeCheckbox('checkedA')}
                                                value="checkedA"
                                            />
                                        }
                                        label='Some really long  add on name..........'
                                    />
                                </Col>                                <Col md={3}>
                                    <p className="premium-price-add-on">Rs. 4,546 </p>
                                </Col></div>
                            )}
                            <Col md={6} style={{ textAlign: 'right', margin: '0.2rem 0rem' }}><ButtonLightSuccess warningContent={true} Text='Cancel' onClick={this.handleClose} /></Col>
                            <Col md={6} style={{ textAlign: 'left', margin: '0.2rem 0rem' }}><ButtonLightSuccess MidSuccessWidth={true} Text='Ok' /></Col>
                        </Row>
                    </DialogContent>
                </Dialog>

                {/* dialog for discount */}

                <Dialog open={this.state.editAddon}
                    className={classes.dialog}
                    maxWidth="sm"
                    onClose={this.handleClose}
                    fullWidth
                    fullScreen={fullScreen}
                    aria-labelledby="simple-dialog-title">
                    <DialogContent
                        className={classNames(classes.dialogContent)}
                    >
                        <Row className='add-on-row'>
                            <Col md={9}>
                                <div className='total-add-on-title'>Add ons and Discount for self</div>
                            </Col>
                            <Col md={3} style={{ textAlign: 'right' }}>
                                <i
                                    onClick={this.handleClose}
                                    style={{
                                        verticalAlign: 'middle',
                                        fontSize: '24px',
                                        color: '#808080',
                                        margin: '0rem 0rem 0.5rem 0rem;',
                                    }} class="material-icons">close</i>
                            </Col>
                            <Col md={12}>
                                <Divider style={{ backgroundColor: '#000000' }} />
                                <Tabs classes={{ root: classes.tab, indicator: classes.tabsIndicator }}
                                    value={value} onChange={this.handleChangeTab}>
                                    <Tab className={classes.tab} label="Add ons" />
                                    <Tab className={classes.tab} label="Discount" />
                                </Tabs>
                                <Divider style={{ backgroundColor: '#000000' }} />
                            </Col>
                            {value === 0 && 0}
                            {value === 1 && 1}
                            <Col md={12}>
                                <div className='group-heading'>Reccomended Add-Ons <span style={{ color: '#000000' }}>(3)</span></div>
                            </Col>
                            {new Array(3).fill(0, 0).map((item, index) => <div>
                                <Col md={9}>
                                    <FormControlLabel classes={{ label: classes.label }}
                                        style={{ marginBottom: '0px' }}
                                        control={
                                            <Checkbox classes={{ root: classes.checkbox, checked: classes.checked, }}
                                                checked={this.state.checkedA}
                                                onChange={this.handleChangeCheckbox('checkedA')}
                                                value="checkedA"
                                            />
                                        }
                                        label={<div>Add-On {index + 1} <i style={{ verticalAlign: 'middle', fontSize: '17px' }} class="material-icons">
                                            help
                                        </i></div>}
                                    />
                                </Col>
                                <Col md={3}>
                                    <p className="premium-price-add-on">Rs. 4,546 </p>
                                </Col></div>
                            )}
                            <Col md={12}>
                                <div className='group-heading'>More Add-Ons<span style={{ color: '#000000' }}>(8)</span></div>
                            </Col>
                            {new Array(5).fill(0, 0).map((item, index) => <div>
                                <Col md={9}>
                                    <FormControlLabel classes={{ label: classes.label }}
                                        style={{ marginBottom: '0px' }}
                                        control={
                                            <Checkbox classes={{ root: classes.checkbox, checked: classes.checked, }}
                                                checked={this.state.checkedA}
                                                onChange={this.handleChangeCheckbox('checkedA')}
                                                value="checkedA"
                                            />
                                        }
                                        label={<div>Add-On {index + 1} <i style={{ verticalAlign: 'middle', fontSize: '17px' }} class="material-icons">
                                            help
                                        </i></div>}
                                    />
                                </Col>
                                <Col md={3}>
                                    <p className="premium-price-add-on">Rs. 4,546 </p>
                                </Col></div>
                            )}
                            <Col md={6} style={{ textAlign: 'right', margin: '0.2rem 0rem' }}><ButtonLightSuccess warningContent={true} Text='Cancel' onClick={this.handleClose} /></Col>
                            <Col md={6} style={{ textAlign: 'left', margin: '0.2rem 0rem' }}><ButtonLightSuccess MidSuccessWidth={true} Text='Submit' /></Col>
                        </Row>
                    </DialogContent>
                </Dialog>
            </div>
            // </Sticky>
       )
    }
}

const mapStateToProps = state => ({
    premiumBreakup: state.popup.premium_breakup_modal,
    step: state.proposal_form_motor.stepH,
    premium: state.premium.details,
    currentPlan: state.currentPlan.details,
    model_id: state.popup.model_id,
})
const mapDispatchToProps = dispatch => {
    return {
        onSelectPremium: (premium, model_id) => dispatch({ type: 'PREMIUM_BREAKUP_MODAL', premium, model_id }),
    };
};
PaymentDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    fullScreen: PropTypes.bool.isRequired
}
export default (withMobileDialog({ breakpoint: 'xs' })(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PaymentDetails))))