import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
// import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { MuiThemeProvider } from '@material-ui/core/styles'
import classNames from 'classnames'




import './index.css'

const styles = theme => ({
    root: {
        padding: '0 24px 0px ',
    },
    tab: {
        fontSize: '12px',
        textTransform: 'capitalize',
        minWidth: '33.3%',
        color: '#000000',
        minHeight: 40,
    },
    tabsIndicator: {
        backgroundColor: '#ea0b4b',
    },
    checkbox: {
        padding: '3px 6px 0px 11px'
    },
    label: {
        color: '#808080',
    }
});

class PremiumBreakUp extends Component {
    constructor(props) {
        super();
        this.state = {
            PremiumBreakup: true,
            value: 0,
            counter: [1, 1, 1],
            whatsCovered: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut."
        };
    }

    handleChange = (event, value) => {
        this.setState({ value: value });
    };

    handleClose = () => {
        this.setState({
            PremiumBreakup: false
        })
    };
    render() {
        const { fullScreen, classes } = this.props;
        const { value } = this.state;
        return (
            <div>
                <MuiThemeProvider>
                    <Dialog className={classes.dialog}
                        open={this.state.PremiumBreakup}
                        onClose={this.handleClose}
                        maxWidth="sm"
                        fullScreen={fullScreen}
                        aria-labelledby="simple-dialog-title">
                        <div className='premium-breakup'>
                            <Row>
                                <Col md={12} xs={12}>
                                    <div className={classNames('mui--hidden-xs', "plan-details")}>Full Premium Breakup</div>
                                    <div className='close-model-icon'>
                                        <i onClick={this.handleClose} class="material-icons" style={{ float: 'right', cursor: 'pointer' }}>
                                            close
                                        </i>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <Divider style={{ backgroundColor: '#000000',marginTop:'10px' }} />
                        <Tabs classes={{ root: classes.tab, indicator: classes.tabsIndicator }}
                            value={value} onChange={this.handleChange}>
                            <Tab className={classes.tab} label="Plan for Self + 2" />
                            <Tab className={classes.tab} label="Plan for parents" />
                            <Tab className={classes.tab} label="Plans for In-laws" />

                        </Tabs>
                        <Divider style={{ backgroundColor: '#000000' }} />
                        <div className='premium-breakup'>
                            <Row>
                                <Col md={3} xs={4}>
                                    <div className='image-insurer'>
                                        <img src='assets/kotak-general-insurance.jpg' alt='kotak' className='insurer-pic' />
                                    </div>
                                </Col>
                                <Col md={9} xs={8}>
                                    <div className='policy-name'>Reliance some awesome policy name</div>
                                    {/* <div className='customer-rating'>Customers Rating:<span className='rating'>4.7</span>
                                        <span className='rating-star'><i style={{ color: '#efce4a', fontSize: '12px' }} class="material-icons">
                                            star_rate
                                            </i></span></div>
                                    <div className='customer-rating'>GB Rating:<span className='rating'>4.7</span>
                                        <span className='rating-star'><i style={{ color: '#efce4a', fontSize: '12px' }} class="material-icons">
                                            star_rate
                                            </i></span></div> */}
                                </Col>
                            </Row>
                        </div>
                        <DialogContent>
                            {value === 0 &&
                                <div className='premium-breakup-box'>
                                    <Col md={12} xs={12}>
                                        <div className='premium-discounts'>Base Premium</div>
                                    </Col>
                                    <Col md={6} xs={7}>
                                        <div className='premium'>Basic plan amount</div>
                                    </Col>
                                    <Col md={6} xs={5}>
                                        <div className='premium-value'>Rs. 4,567</div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='premium-discounts'>Discounts</div>
                                    </Col>
                                    <Col md={6} xs={7}>
                                        <div className='premium'>Other Discounts</div>
                                    </Col>
                                    <Col md={6} xs={5}>
                                        <div className='premium-value'>Rs. 4,567</div>
                                    </Col>
                                    <Col md={6} xs={7}>
                                        <div className='premium'>Other Discounts</div>
                                    </Col>
                                    <Col md={6} xs={5}>
                                        <div className='premium-value'>Rs. 4,567</div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='premium-discounts'>Add-Ons</div>
                                    </Col>
                                    <Col md={6} xs={7}>
                                        <div className='premium'>Add ons 1</div>
                                    </Col>
                                    <Col md={6} xs={5}>
                                        <div className='premium-value'>Rs. 4,567</div>
                                    </Col>
                                    <Col md={6} xs={7}>
                                        <div className='premium'>Add on 2</div>
                                    </Col>
                                    <Col md={6} xs={5}>
                                        <div className='premium-value'>Included</div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <div className='premium-discounts'>Premium Details</div>
                                    </Col>
                                    <Col md={6} xs={7}>
                                        {/* <div className='premium'>Package Premium</div> */}
                                    </Col>
                                    <Col md={6} xs={5}>
                                        {/* <div className='premium-value'>Rs. 4,567</div> */}
                                    </Col>
                                    <Col md={6} xs={7}>
                                        <div className='premium'>GST@18%</div>
                                    </Col>
                                    <Col md={6} xs={5}>
                                        <div className='premium-value'>Rs. 4,567</div>
                                    </Col>
                                    <Col md={6} xs={7}>
                                        <div className='premium-discounts'>Final Premium</div>
                                    </Col>
                                    <Col md={6} xs={5}>
                                        <div className='premium-value'>Rs. 4,567</div>
                                    </Col>
                                </div>}
                            {value === 1 &&
                                <div className='covered-plan-container'>
                                    <Col md={12} xs={12}>
                                        <div className='what-covered'>What’s Covered in this plan</div>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        {this.state.counter.map(i =>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox className={classes.checkbox} />
                                                }
                                                label={<Typography className={classes.label}>{this.state.whatsCovered}</Typography>}
                                            />)}
                                    </Col>
                                    <Col md={12}>
                                        <div className='what-covered'>What’s not Covered in this plan</div>
                                    </Col>
                                    <Col md={12}>
                                        {this.state.counter.map(i =>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox className={classes.checkbox} />
                                                }
                                                label={<Typography className={classes.label}>{this.state.whatsCovered}</Typography>}
                                            />)}
                                    </Col>
                                </div>}
                        </DialogContent>
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


export default (withMobileDialog({ breakpoint: 'xs' })(withStyles(styles, { withTheme: true })(PremiumBreakUp)));

