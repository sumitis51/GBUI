import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core'
import Container from 'muicss/lib/react/container'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


import './index.css'
import ButtonLightSuccess from '../Shared/ButtonLightSuccess/index'


const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    panel: {
        boxShadow: 'none',
    },
    panelSummary: {
        boxShadow: ' 0 1px 2px 0 rgba(0, 0, 0, 0.16)'
    },
    panelDetails: {
        backgroundColor: '#f6f6f6',
        padding: '8px 13px 24px'
    }

});


class Payment extends Component {
    constructor(props) {
        super();
        this.state = {
            mobileView: false
        }
    }
    componentWillMount() {
        if (window.innerWidth <= 544) {
            this.setState({ mobileView: true })
        }
        const vm = this;
        window.addEventListener("resize", () => {
            if (window.innerWidth <= 544) {
                vm.setState({
                    mobileView: true
                })
            }
            else {
                vm.setState({ mobileView: false })
            }
        });
    }
    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider>
                <div className='payment'>
                    <Container fluid={true}>
                        {this.state.mobileView ?
                            <div>
                                <Row>
                                    <Col xs={12}>
                                        <div className='gbui-h7 payment-title'> Now Payment Time</div>
                                        <div className='gbui-menu-bar-1 payment-subtitle'>We are directly sending your amount to insurer company.</div>
                                    </Col>
                                </Row>
                                <ExpansionPanel defaultExpanded={true} classes={{ root: classes.panel }} >
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes={{ root: classes.panelSummary }}>
                                        <div className=' gbui-subtitle-3 member-name'>Self + 2<span className='gbui-caption-1 members-explained'>(You, your wife, and two sons)</span></div>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails classes={{ root: classes.panelDetails }}>
                                        <Row>
                                            <Col xs={12}>
                                                <div>
                                                    <img alt='payment' src="/assets/group.svg" />
                                                </div>
                                            </Col>
                                            <Col xs={8}>
                                                <div className='gbui-button-1'>Bajaj Allianz health policy package</div>
                                            </Col>
                                            <Col xs={4} style={{ padding: '0px' }}>
                                                <div className='gbui-h7 policy-amount'>Rs. 6,778<span className='duration' style={{ color: '#000000' }}>/Year</span></div>
                                            </Col>
                                            <Col xs={12}>
                                                <div className='gbui-caption-1 plan-detail'>Plan Details</div>
                                            </Col>
                                            <Col xs={6}>
                                                <div className='gbui-menu-bar-2 left-container'>Order Id</div>
                                                <div className='gbui-menu-bar-2 left-container'>Amount</div>
                                                <div className='gbui-menu-bar-2 left-container'>Payment Method</div>
                                                <div className='gbui-menu-bar-2 left-container'>Status</div>
                                                <div className='gbui-menu-bar-2 left-container'>Policy Number</div>
                                                <div className='gbui-menu-bar-2 left-container'>Transaction Id</div>
                                            </Col>
                                            <Col xs={6}>
                                                <div className='gbui-menu-bar-2 right-container'>OD1234</div>
                                                <div className='gbui-menu-bar-2 right-container'>Rs. 12345</div>
                                                <div className='gbui-menu-bar-2 right-container'>Internet Banking</div>
                                                <div className='gbui-menu-bar-2 right-container' style={{ color: '#0da176' }}>Successful</div>
                                                <div className='gbui-menu-bar-2 right-container'>UIDFN1234567H</div>
                                                <div className='gbui-menu-bar-2 right-container'>123456789ASDE1235</div>
                                            </Col>
                                            <Col xs={12}><ButtonLightSuccess fullContent={true} Text='Download Policy' /></Col>
                                        </Row>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel classes={{ root: classes.panel }} >
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes={{ root: classes.panelSummary }}>
                                        <div className=' gbui-subtitle-3 member-name'>Father & Mother<span className='gbui-caption-1 members-explained'>(Your father and mother)</span></div>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails classes={{ root: classes.panelDetails }}>
                                        <Row>
                                            <Col xs={12}>
                                                <div>
                                                    <img alt='payment' src="/assets/group.svg" />
                                                </div>
                                            </Col>
                                            <Col xs={8}>
                                                <div className='gbui-button-1'>Bajaj Allianz health policy package</div>
                                            </Col>
                                            <Col xs={4} style={{ padding: '0px' }}>
                                                <div className='gbui-h7 policy-amount'>Rs. 6,778<span className='duration' style={{ color: '#000000' }}>/Year</span></div>
                                            </Col>
                                            <Col xs={12}>
                                                <div className='gbui-caption-1 plan-detail'>Plan Details</div>
                                            </Col>
                                            <Col xs={6}>
                                                <div className='gbui-menu-bar-2 left-container'>Order Id</div>
                                                <div className='gbui-menu-bar-2 left-container'>Amount</div>
                                                <div className='gbui-menu-bar-2 left-container'>Payment Method</div>
                                                <div className='gbui-menu-bar-2 left-container'>Status</div>
                                                <div className='gbui-menu-bar-2 left-container'>Transaction Id</div>
                                            </Col>
                                            <Col xs={6}>
                                                <div className='gbui-menu-bar-2 right-container'>OD1234</div>
                                                <div className='gbui-menu-bar-2 right-container'>Rs. 12345</div>
                                                <div className='gbui-menu-bar-2 right-container'>Internet Banking</div>
                                                <div className='gbui-menu-bar-2 right-container' style={{ color: '#940016' }}>Failed</div>
                                                <div className='gbui-menu-bar-2 right-container'>123456789ASDE1235</div>
                                            </Col>
                                            <Col xs={12}>
                                                <div className='gbui-button-1 payment-failure-text'>
                                                    If any amount deducted from your account it will be
                                                     credited back to your account with 7 working days.
                                                        </div>
                                            </Col>
                                            <Col xs={12}><ButtonLightSuccess fullWarning={true} Text='Try Again' /></Col>
                                        </Row>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <ExpansionPanel classes={{ root: classes.panel }} >
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes={{ root: classes.panelSummary }}>
                                        <div className=' gbui-subtitle-3 member-name'>Father & Mother in laws<span className='gbui-caption-1 members-explained'>(Your father and mother)</span></div>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails classes={{ root: classes.panelDetails }}>
                                        <Row>
                                            <Col xs={12}>
                                                <div>
                                                    <img alt='payment' src="/assets/group.svg" />
                                                </div>
                                            </Col>
                                            <Col xs={8}>
                                                <div className='gbui-button-1'>Bajaj Allianz health policy package</div>
                                            </Col>
                                            <Col xs={4} style={{ padding: '0px' }}>
                                                <div className='gbui-h7 policy-amount'>Rs. 6,778<span className='duration' style={{ color: '#000000' }}>/Year</span></div>
                                            </Col>
                                            <Col xs={12}>
                                                <div className='gbui-caption-1 plan-detail'>Plan Details</div>
                                            </Col>
                                            <Col xs={6}>
                                                <div className='gbui-menu-bar-2 left-container'>Packagae Premium</div>
                                                <div className='gbui-menu-bar-2 left-container'>Add on prices</div>
                                                <div className='gbui-menu-bar-2 left-container'>GST@18%</div>
                                                <div className='gbui-menu-bar-2 left-container'>Total Premium</div>
                                            </Col>
                                            <Col xs={6}>
                                                <div className='gbui-menu-bar-2 right-container'>Rs. 4,546 </div>
                                                <div className='gbui-menu-bar-2 right-container'>Rs. 4,546 </div>
                                                <div className='gbui-menu-bar-2 right-container'>Rs. 4,546 </div>
                                                <div className='gbui-menu-bar-2 right-container' style={{ color: '#9c0f46' }}>Rs. 4,546<span style={{ color: '#000000' }}>/month</span></div>
                                            </Col>
                                            <Col xs={12} className='button-column'><ButtonLightSuccess fullWidth={true} Text='Proceed To Pay' /></Col>
                                        </Row>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                <Row className="partners">
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
                                        {new Array(6).fill(0, 0).map(item =>
                                            <div className="rectangle"></div>
                                        )}
                                        <p style={{ marginLeft: '8.3rem', display: 'block' }}>PAYMENT NETWORK</p>
                                    </Col>
                                </Row>
                            </div> :
                            <div>
                                <Row>
                                    <Col md={12}>
                                        <div className="back-link">
                                            <img alt='payment' src="/assets/back.png" /> &nbsp;
                                            BACK TO PROPOSAL SUMMARY
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className="title-link">
                                            Payment Page
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <Paper className={classes.root} elevation={1}>
                                            <div className='gbui-h5 payment-title'> Now Payment Time</div>
                                            <div className='gbui-menu-bar-1 payment-subtitle'>We are directly sending your amount to insurer company.</div>
                                            <Row className='payment-row'>
                                                <Col md={4}>
                                                    <Col md={12}>
                                                        <div className=' gbui-subtitle-3 member-name'>Self + 2<span className='gbui-caption-1 members-explained'>(You, your wife, and two sons)</span></div>
                                                    </Col>
                                                    <Col md={4}>
                                                        <div>
                                                            <img alt='payment' src="/assets/group.svg" />
                                                        </div>
                                                    </Col>
                                                    <Col md={4}>
                                                        <div className='gbui-subtitle-2'>Bajaj Allianz health policy package</div>
                                                    </Col>
                                                    <Col md={4}>
                                                        <div className='gbui-caption-1 plan-detail'>Plan Details</div>
                                                    </Col>
                                                    <Col md={12}>
                                                        <div className='gbui-caption-1 gb-rating' style={{ color: '#808080' }}>Customers Rating:<span className='rating-point' style={{ color: '#000000' }}>4.7</span>
                                                            <i class="material-icons" style={{ fontSize: '16px', color: '#efce4a', display: 'inline' }}>star_rate</i>
                                                        </div>
                                                        <div className='gbui-caption-1 gb-rating' style={{ color: '#808080' }}>GB Rating:<span className='rating-point' style={{ color: '#000000' }}>4.7</span>
                                                            <i class="material-icons" style={{ fontSize: '16px', color: '#efce4a', display: 'inline' }}>star_rate</i>
                                                        </div>
                                                    </Col>
                                                    <Col md={6}>
                                                        <div className='gbui-menu-bar-2 left-container'>Order Id</div>
                                                        <div className='gbui-menu-bar-2 left-container'>Amount</div>
                                                        <div className='gbui-menu-bar-2 left-container'>Payment Method</div>
                                                        <div className='gbui-menu-bar-2 left-container'>Status</div>
                                                        <div className='gbui-menu-bar-2 left-container'>Policy Number</div>
                                                        <div className='gbui-menu-bar-2 left-container'>Transaction Id</div>
                                                    </Col>
                                                    <Col md={6}>
                                                        <div className='gbui-menu-bar-2 right-container'>OD1234</div>
                                                        <div className='gbui-menu-bar-2 right-container'>Rs. 12345</div>
                                                        <div className='gbui-menu-bar-2 right-container'>Internet Banking</div>
                                                        <div className='gbui-menu-bar-2 right-container' style={{ color: '#0da176' }}>Successful</div>
                                                        <div className='gbui-menu-bar-2 right-container'>UIDFN1234567H</div>
                                                        <div className='gbui-menu-bar-2 right-container'>123456789ASDE1235</div>
                                                    </Col>
                                                    <Col md={12}><ButtonLightSuccess fullContent={true} Text='Download Policy' /></Col>
                                                </Col>
                                                <Col md={4} style={{ borderLeft: '2px dashed #979797' }}>
                                                    <Col md={12}>
                                                        <div className=' gbui-subtitle-3 member-name'>Father & Mother<span className='gbui-caption-1 members-explained'>(Your father and mother)</span></div>
                                                    </Col>
                                                    <Col md={4}>
                                                        <div>
                                                            <img alt='payment' src="/assets/group.svg" />
                                                        </div>
                                                    </Col>
                                                    <Col md={4}>
                                                        <div className='gbui-subtitle-2'>Bajaj Allianz health policy package</div>
                                                    </Col>
                                                    <Col md={4}>
                                                        <div className='gbui-caption-1 plan-detail'>Plan Details</div>
                                                    </Col>
                                                    <Col md={12}>
                                                        <div className='gbui-caption-1 gb-rating' style={{ color: '#808080' }}>Customers Rating:<span className='rating-point' style={{ color: '#000000' }}>4.7</span>
                                                            <i class="material-icons" style={{ fontSize: '16px', color: '#efce4a', display: 'inline' }}>star_rate</i>
                                                        </div>
                                                        <div className='gbui-caption-1 gb-rating' style={{ color: '#808080' }}>GB Rating:<span className='rating-point' style={{ color: '#000000' }}>4.7</span>
                                                            <i class="material-icons" style={{ fontSize: '16px', color: '#efce4a', display: 'inline' }}>star_rate</i>
                                                        </div>
                                                    </Col>
                                                    <Col md={6}>
                                                        <div className='gbui-menu-bar-2 left-container'>Order Id</div>
                                                        <div className='gbui-menu-bar-2 left-container'>Amount</div>
                                                        <div className='gbui-menu-bar-2 left-container'>Payment Method</div>
                                                        <div className='gbui-menu-bar-2 left-container'>Status</div>
                                                        <div className='gbui-menu-bar-2 left-container'>Transaction Id</div>
                                                    </Col>
                                                    <Col md={6}>
                                                        <div className='gbui-menu-bar-2 right-container'>OD1234</div>
                                                        <div className='gbui-menu-bar-2 right-container'>Rs. 12345</div>
                                                        <div className='gbui-menu-bar-2 right-container'>Internet Banking</div>
                                                        <div className='gbui-menu-bar-2 right-container' style={{ color: '#940016' }}>Failed</div>
                                                        <div className='gbui-menu-bar-2 right-container'>123456789ASDE1235</div>
                                                    </Col>
                                                    <Col md={12}>
                                                        <div className='gbui-button-1 payment-failure-text'>
                                                            If any amount deducted from your account it will be
                                                             credited back to your account with 7 working days.
                                                        </div>
                                                    </Col>
                                                    <Col md={12}><ButtonLightSuccess fullWarning={true} Text='Try Again' /></Col>
                                                </Col>
                                                <Col md={4} style={{ borderLeft: '2px dashed #979797' }}>
                                                    <Col md={12}>
                                                        <div className=' gbui-subtitle-3 member-name'>Father & Mother in laws<span className='gbui-caption-1 members-explained'>(Your father and mother)</span></div>
                                                    </Col>
                                                    <Col md={4}>
                                                        <div>
                                                            <img alt='payment' src="/assets/group.svg" />
                                                        </div>
                                                    </Col>
                                                    <Col md={4}>
                                                        <div className='gbui-subtitle-2'>Bajaj Allianz health policy package</div>
                                                    </Col>
                                                    <Col md={4}>
                                                        <div className='gbui-caption-1 plan-detail'>Plan Details</div>
                                                    </Col>
                                                    <Col md={12}>
                                                        <div className='gbui-caption-1 gb-rating' style={{ color: '#808080' }}>Customers Rating:<span className='rating-point' style={{ color: '#000000' }}>4.7</span>
                                                            <i class="material-icons" style={{ fontSize: '16px', color: '#efce4a', display: 'inline' }}>star_rate</i>
                                                        </div>
                                                        <div className='gbui-caption-1 gb-rating' style={{ color: '#808080' }}>GB Rating:<span className='rating-point' style={{ color: '#000000' }}>4.7</span>
                                                            <i class="material-icons" style={{ fontSize: '16px', color: '#efce4a', display: 'inline' }}>star_rate</i>
                                                        </div>
                                                    </Col>
                                                    <Col md={6}>
                                                        <div className='gbui-menu-bar-2 left-container'>Packagae Premium</div>
                                                        <div className='gbui-menu-bar-2 left-container'>Add on prices</div>
                                                        <div className='gbui-menu-bar-2 left-container'>GST@18%</div>
                                                        <div className='gbui-menu-bar-2 left-container'>Total Premium</div>
                                                    </Col>
                                                    <Col md={6}>
                                                        <div className='gbui-menu-bar-2 right-container'>Rs. 4,546 </div>
                                                        <div className='gbui-menu-bar-2 right-container'>Rs. 4,546 </div>
                                                        <div className='gbui-menu-bar-2 right-container'>Rs. 4,546 </div>
                                                        <div className='gbui-menu-bar-2 right-container' style={{ color: '#9c0f46' }}>Rs. 4,546<span style={{ color: '#000000' }}>/month</span></div>
                                                    </Col>
                                                    <Col md={12} className='button-column'><ButtonLightSuccess fullWidth={true} Text='Proceed To Pay' /></Col>
                                                </Col>
                                            </Row>
                                        </Paper>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={8} className='license-row mui--hidden-xs'>
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
                                    </Col>
                                </Row>
                            </div>}
                    </Container>
                </div>
            </MuiThemeProvider>
        )
    }
}

Payment.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Payment)