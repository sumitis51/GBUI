import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Divider from '@material-ui/core/Divider'
import { MuiThemeProvider } from '@material-ui/core/styles'
import classNames from 'classnames'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import { connect } from 'react-redux';
import axios from 'axios';
import constants from '../../constants/appConstants.json'


import './index.css'

const styles = theme => ({
    root: {
        padding: '0 24px 0px ',
        flexGrow: 1,
    },
    tab: {
        fontSize: '12px',
        textTransform: 'capitalize',
      minWidth:'45%',
        color: '#000000',
        minHeight: 40,
    },
    tabsIndicator: {
        backgroundColor: '#ea0b4b',
    },
    label: {
        color: '#333333',
        fontSize: '14px',
        fontFamily:'Nunito'
    },
    checkbox: {
        padding: '3px 6px 0px 11px',
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
    checked: {},
    card: {
        minWidth: 275,
        boxShadow: 'none',
        border: '1px solid #aaaaaa',
        padding: '7px 12px',
        margin: '8px 0px 8px 0px',
    },
});

class PremiumBreakUp extends Component {
    constructor(props) {
        super();
        this.state = {
            value:2,
            pincode: '',    
            pathlabName: true,
            pathlabDetail: [],
            counter: [1, 1, 1],
           
        };
    }
    componentWillMount = () => {
        if(this.props.alternateBuyerHealthInsurer){
            this.setState({
                pathlabDetail:this.props.alternateBuyerHealthInsurer
            })
       }
    }
    componentDidMount(){
        if(! this.props.alternateBuyerHealthInsurer){
        this.setState({
            value:this.props.model_id,
            pincode: this.props.inputFormDataHealth  ? this.props.inputFormDataHealth.selfPincode : this.props.plan.pinCode
        })
        this.checkInsurerId()
        }

    }
    checkInsurerId() {
        if(this.props.plan && this.props.plan.insurerId) {
            this.loadInitLabs()
        } else {
            setTimeout(() => {
                this.checkInsurerId()
            }, 100)
        }
    }

    loadInitLabs() {
        const pinCode = this.props.inputFormDataHealth ? this.props.inputFormDataHealth.selfPincode : this.props.plan.pinCode
        this.setState({
            pincode:pinCode
        })
        axios.get(`${constants.apiRootURL}/network-hospital/${this.props.plan.insurerId}/${pinCode}`)
        .then(response => {
            this.setState({ pathlabDetail: response.data })
            console.log(response,'response')
        }).catch(error => {
            if (error.response.status === 500) {
                this.props.history.push('/500')
            }
        })
    }
    handleChange = (event, value) => {
        this.setState({ value: value });
    };

    handleChangePin = name => event => {
        const pincodelength = event.target.value
        if (pincodelength.length <= 6) {
            this.setState({
                [name]: event.target.value,
            });
        }
        if (pincodelength.length === 6) {
            // const vm = this;
            this.getPathLabs(pincodelength)
        }
    }
    getPathLabs(pincodelength) {
        axios.get(`${constants.apiRootURL}/network-hospital/${this.props.plan.insurerId}/${pincodelength}`)
                .then(response => {
                    this.setState({ pathlabDetail: response.data })
                }).catch(error => {
                    if (error.response.status === 500) {
                        this.props.history.push('/500')
                    }
                })
    }
    handleChangeCheckbox = name => event => {
        this.setState({ [name]: event.target.checked });
    };
    handleClose = () => {
        this.props.onSelectPremium(false)
        this.props.closeMethod(false)
        console.log('this.props.alternateBuyerHealthInsurer',this.props.alternateBuyerHealthInsurer)
    };
    render() {
        const { fullScreen, classes} = this.props;
        const { value } = this.state;
        return (
            <div>
                <MuiThemeProvider>
                    <Dialog className={classes.dialog}
                        // key={this.props.model_id}
                        open={this.props.premiumBreakup}
                        onClose={this.handleClose}
                        maxWidth="md"
                        fullScreen={fullScreen}
                        aria-labelledby="simple-dialog-title">
                        <div className='premium-breakup'>
                            <Row>
                                { ! this.props.alternateBuyerHealthInsurer &&
                                <Col md={12} xs={12}>
                                    <div className={classNames('mui--hidden-xs', "plan-details")}>Plan Details</div>
                                   
                                    <div className='close-model-icon'>
                                        <i onClick={this.handleClose} class="material-icons" style={{ float: 'right', cursor: 'pointer' }}>
                                            close
                                        </i>
                                    </div>
                                </Col>}
                                {this.props.alternateBuyerHealthInsurer ? <div>
                                 <Col md={7} xs={7}>
                                    <div className='plan-details'>Cashless Hospitals</div>
                                 </Col>
                                 <Col xs={5} className='mui--visible-xs-block mui--visible-sm-block'>
                                    <div className='close-model-icon'>
                                        <i onClick={this.handleClose} class="material-icons" style={{ float: 'right', cursor: 'pointer' }}>
                                            close
                                        </i>
                                    </div>
                                 </Col>
                                 </div>
                                 :
                                 <div>                                
                                <Col md={3} xs={4}>
                                    <div className='image-insurer'>
                                        <img src={`${constants.mediaBucketURL}/${this.props.plan.insurerLogo}`} alt={this.props.plan.planName} className='insurer-pic' />
                                    </div>
                                </Col>
                                <Col md={7} xs={8}>
                                    <div className='policy-name'>{this.props.plan && this.props.plan.planName}</div>
                                    {/* <div className='customer-rating'>Customers Rating:<span className='rating'>{this.props.plan.customerRating}</span>
                                        <span className='rating-star'><i style={{ color: '#efce4a', fontSize: '12px' }} class="material-icons">
                                            star_rate
                                            </i></span></div>
                                    <div className='customer-rating'>GB Rating:<span className='rating'>{this.props.plan.gbRating}</span>
                                        <span className='rating-star'><i style={{ color: '#efce4a', fontSize: '12px' }} class="material-icons">
                                            star_rate
                                            </i></span></div> */}
                                </Col>
                                </div>}
                            </Row>
                        </div>
                        <Divider style={{ backgroundColor: '#000000' }} />
                       
                       
                       {this.props.alternateBuyerHealthInsurer ?
                           <DialogContent>
                             <div className='cashless-hospitals'>
                            {this.props.alternateBuyerHealthInsurer.length > 0 ? this.props.alternateBuyerHealthInsurer.map((pathlab, index) =>
                                <Col md={12} xs={12} className='card-column'>
                                    <Paper className={classes.card} key={index}>
                                        <Row>
                                            <Col md={11} xs={10}>
                                                <div key={index} className='pathlab-name'>{pathlab.name}</div>
                                            </Col>
                                            <Col md={9} xs={7}>
                                                <div key={index} className='address'>{`${pathlab.address} ${pathlab.landmark} ${pathlab.city} ${pathlab.zone} ${pathlab.state}${pathlab.pincode}`}</div>
                                            </Col>
                                            <Col md={3} xs={5}>
                                                <div key={index} className='contact'>{pathlab.mobile}</div>
                                            </Col>
                                        </Row>
                                    </Paper>
                                </Col>
                            ) : null}</div></DialogContent>
                       :<div>
                        <Tabs classes={{ root: classes.tab, indicator: classes.tabsIndicator }}
                            value={value} onChange={this.handleChange}>
                           {this.props.plan.planType=='CRITICAL_ILLNESS' && <Tab className={classes.tab} label="Critical Illness Cover" value="CRITICAL_ILLNESS"/>} 
                            <Tab className={classes.tab} label="Premium Breakup" value = "PREMIUM_BREAKUP"/>
                            {/* <Tab className={classes.tab} value ="plan_cover" label="Plan Coverage" /> */}
                              <Tab className={classes.tab} value ="cashless_hospital" label="Cashless Hospitals"/>
                           
                        </Tabs>
                        <Divider style={{ backgroundColor: '#000000' }} />
                        <DialogContent>
                        {value==="CRITICAL_ILLNESS" &&
                                <div className='critical_conditions'>
                                    {this.props.plan && (this.props.plan.criticalIllnessConditions || []).map((item,index) =>{
                                        return(
                                    <Col md={4} xs={4}>
                                      <p className={classes.label}>{index+1}. {item.name} </p>
                                     
                                    </Col>
                                    )})}
                                </div>}
                            {value === "PREMIUM_BREAKUP" &&
                                <div className='premium-breakup-container'>
                                    {!this.props.isDashboard && <React.Fragment>
                                        <Col md={6} xs={7}>
                                        <div className='premium-discounts'>Base Premium</div>
                                    </Col>
                                    <Col md={6} xs={5}>
                                        <div className='premium-value'>Rs.{this.props.isDashboard ? `${this.props.plan.premiumPerLacOfSI}` : `${this.props.currentPlan.basePremium}`}</div>
                                    </Col>
                                    </React.Fragment>}
                                    <Col md={12} xs={12}>
                                    {this.props.isDashboard ? <div>
                                        {this.props.plan.addOns && this.props.plan.addOns.length>0 &&  ( <div className='premium-discounts'>Add-Ons</div>)}
                                    </div> : <div>
                                    {this.props.currentPlan.addOns && this.props.currentPlan.addOns.length>0 &&  ( <div className='premium-discounts'>Add-Ons</div>)}
                                    </div>}
                                  
                                   
                                    </Col>
                                    {this.props.isDashboard ? <div>
                                        {(this.props.plan.addOns||[]).map(item=>(
                                     item.checked &&  <div>
                                  
                                    <Col md={6} xs={7}>
                                        <div className='premium'>{item.name}</div>
                                    </Col>
                                    <Col md={6} xs={5}>
                                        <div className='premium-value'>Rs {item.amount} </div>
                                    </Col>
                                    </div>
                                    ))}
                                    </div>: !this.props.isProposalSummary && <div>
                                    {(this.props.currentPlan.addOns||[]).map(item=>(
                                     item.checked &&  <div>
                                  
                                    <Col md={6} xs={7}>
                                        <div className='premium'>{item.name}</div>
                                    </Col>
                                    <Col md={6} xs={5}>
                                        <div className='premium-value'>Rs {item.amount} </div>
                                    </Col>
                                    </div>
                                    ))}
                                    </div>}
                                
                                    <Col md={12} xs={12}>
                                        <div className='premium-discounts'>Premium Details</div>
                                    </Col> 
                                    {this.props.isDashboard ? <React.Fragment>
                                    <Col md={6} xs={7}>
                                        <div className='premium-discounts'>Final Premium</div>
                                    </Col>
                                    <Col md={6} xs={5}>
                                        <div className='premium-value'>Rs. {this.props.currentPlan ? this.props.currentPlan.totalPremium : 'NA' }</div>
                                    </Col>
                                    </React.Fragment>: <React.Fragment>
                                    {!this.props.isProposalSummary && <React.Fragment><Col md={6} xs={7}>
                                         <div className='premium'>Package Premium</div> 
                                    </Col>
                                    <Col md={6} xs={5}>
                                         <div className='premium-value'>Rs. {this.props.currentPlan ? this.props.currentPlan.premium : 'NA'}</div> 
                                    </Col>
                                    <Col md={6} xs={7}>
                                        <div className='premium'>GST@18%</div>
                                    </Col>
                                    <Col md={6} xs={5}>
                                        <div className='premium-value'>Rs. {this.props.currentPlan ? this.props.currentPlan.gst : 'NA'}</div>
                                    </Col></React.Fragment>}
                                    <Col md={6} xs={7}>
                                        <div className='premium-discounts'>Final Premium</div>
                                    </Col>
                                    <Col md={6} xs={5}>
                                        <div className='premium-value'>Rs.{this.props.currentPlan ? this.props.currentPlan.totalPremium : 'NA'} </div>
                                    </Col>
                                    </React.Fragment>}
                                </div>}
                            {/* {value === "plan_cover" &&
                                <div className='covered-plan-container'>
                                    <Col md={12} xs={12}>
                                        <div className='what-covered'>What’s Covered in this plan</div>
                                    </Col>
                                    {this.props.plan && this.props.plan.planInclusionExclusion['planInclusion'].map((item,index) =>{
                                        return(
                                    <Col md={4} xs={4}>
                                      <p className={classes.label}>{index+1}. {item}
                                      </p>
                                    </Col>
                                    )})}
                                    <Col md={12}>
                                        <div className='what-covered'>What’s not Covered in this plan</div>
                                    </Col>
                                     {this.props.plan && this.props.plan.planInclusionExclusion['planExclusion'].map((item,index) =>{
                                         
                                        return(
                                    <Col md={4} xs={4}>
                                      <p className={classes.label} style={{color:'#808080'}}>{index+1}. {item}
            
                                      </p>
                                     
                                    </Col>
                                    )})}
                                </div>} */}
                            {value === "cashless_hospital" &&
                                <div className='cashless-hospitals'>
                                    <Col md={3} xs={4}>
                                        <div className='pathology-near-you'>Hospitals in Pincode</div>
                                    </Col>
                                    <Col md={3} xs={3}>
                                        <TextField
                                            id="standard-name"
                                            label="Pincode"
                                            className={classes.textField}
                                            value={this.state.pincode}
                                            onChange={this.handleChangePin('pincode')}
                                            margin="normal"
                                        />
                                    </Col>
                                    {/* <Col md={12} xs={12} className='card-column'>
                                        <Paper className={classes.card}>
                                            <Row>
                                                <Col md={12} xs={12}>
                                                    <div className='pathlab-name'>Lorem Ipsum name of Pathology</div>
                                                </Col>
                                                <Col md={9} xs={7}>
                                                    <div className='address'>Lorem ipsum FULL Address of the garage. Lorem ipsum FULL Address of the garage. Lorem ipsum FULL Address of the garage.</div>
                                                </Col>
                                                <Col md={3} xs={5}>
                                                    <div className='contact'>+91-9827987675</div>
                                                    <div className='contact'>+91-9827987675</div>
                                                </Col>
                                            </Row>
                                        </Paper>
                                    </Col> */}
                                    {this.state.pathlabDetail.length > 0 ? this.state.pathlabDetail.map((pathlab, index) =>
                                                <Col md={12} xs={12} className='card-column'>
                                                    <Paper className={classes.card} key={index}>
                                                        <Row>
                                                            <Col md={11} xs={10}>
                                                                <div key={index} className='pathlab-name'>{pathlab.name}</div>
                                                            </Col>
                                                            {/* <Col md={1} xs={2}>
                                                                <div className='pathlab-checkbox' key={index}>
                                                                    <Checkbox key={index}
                                                                        classes={{ root: classes.checkboxPathlabName, checked: classes.checked, label: classes.label }}
                                                                        onChange={this.handleChangeCheckbox('pathlabName')}
                                                                        value="this.state.pathlabName" />
                                                                </div>
                                                            </Col> */}
                                                            <Col md={9} xs={7}>
                                                                <div key={index} className='address'>{`${pathlab.address ? pathlab.address : ''} ${pathlab.landmark ? pathlab.landmark : ''} ${pathlab.city ? pathlab.city : ''} ${pathlab.zone ? pathlab.zone : ''} ${pathlab.state ? pathlab.state : ''} ${pathlab.pincode ? pathlab.pincode : ''}`}</div>
                                                            </Col>
                                                            <Col md={3} xs={5}>
                                                                <div key={index} className='contact'>{pathlab.mobile}</div>
                                                            </Col>
                                                        </Row>
                                                    </Paper>
                                                </Col>
                                    ) : null}
                                    {/* <Col md={12} xs={12} className='card-column'>
                                        <Paper className={classes.card}>
                                            <Row>
                                                <Col md={12} xs={12}>
                                                    <div className='pathlab-name'>Lorem Ipsum name of Pathology</div>
                                                </Col>
                                                <Col md={9} xs={7}>
                                                    <div className='address'>Lorem ipsum FULL Address of the garage. Lorem ipsum FULL Address of the garage. Lorem ipsum FULL Address of the garage.</div>
                                                </Col>
                                                <Col md={3} xs={5}>
                                                    <div className='contact'>+91-9827987675</div>
                                                    <div className='contact'>+91-9827987675</div>
                                                </Col>
                                            </Row>
                                        </Paper>
                                    </Col>
                                    <Col md={12} xs={12} className='card-column'>
                                        <Paper className={classes.card}>
                                            <Row>
                                                <Col md={12} xs={12}>
                                                    <div className='pathlab-name'>Lorem Ipsum name of Pathology</div>
                                                </Col>
                                                <Col md={9} xs={7}>
                                                    <div className='address'>Lorem ipsum FULL Address of the garage. Lorem ipsum FULL Address of the garage. Lorem ipsum FULL Address of the garage.</div>
                                                </Col>
                                                <Col md={3} xs={5}>
                                                    <div className='contact'>+91-9827987675</div>
                                                    <div className='contact'>+91-9827987675</div>
                                                </Col>
                                            </Row>
                                        </Paper>
                                    </Col>
                                    <Col md={12} xs={12} className='card-column'>
                                        <Paper className={classes.card}>
                                            <Row>
                                                <Col md={12} xs={12}>
                                                    <div className='pathlab-name'>Lorem Ipsum name of Pathology</div>
                                                </Col>
                                                <Col md={9} xs={7}>
                                                    <div className='address'>Lorem ipsum FULL Address of the garage. Lorem ipsum FULL Address of the garage. Lorem ipsum FULL Address of the garage.</div>
                                                </Col>
                                                <Col md={3} xs={5}>
                                                    <div className='contact'>+91-9827987675</div>
                                                    <div className='contact'>+91-9827987675</div>
                                                </Col>
                                            </Row>
                                        </Paper>
                                    </Col> */}
                                </div>
                            }
                        </DialogContent>
                        </div>}
                    </Dialog>
                </MuiThemeProvider>
            </div>
        )
    }
}

PremiumBreakUp.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    fullScreen: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};
const mapStateToProps = state => {
    return {
        premiumBreakup:state.popup.premium_breakup_modal,
        model_id:state.popup.model_id,
        proposalFormDataHealth: state.proposalFormHealth.proposalFormHealthData,
        inputFormDataHealth: state.inputFormHealth.inputFormHealthData,
        premium: state.premium.details,
        currentPlan: state.currentPlan.details,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSelectPremium: (premium) => dispatch({ type: 'PREMIUM_BREAKUP_MODAL',premium }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)((withMobileDialog({ breakpoint: 'xs' })(withStyles(styles, { withTheme: true })(PremiumBreakUp))));

