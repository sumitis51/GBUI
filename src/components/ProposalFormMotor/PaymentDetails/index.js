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
import './payment_proposal.css'



const styles = theme => ({
    root: {
        flexGrow: 0,
        backgroundColor: theme.palette.background.paper,
    },
})
class PaymentDetails extends React.Component {

    state = {
        tab_value: 1,
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="payment-proposal-form-motor-parent">
                <Panel>
                    <Row>
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
                    {/* Addons */}
                    <div className="addon-div">
                        <h3 className="addon-heading">ADD ONS</h3>

                        <Row>
                            <Col md="6">
                                {new Array(4).fill(0, 0).map(item =>
                                    <p className="addon-name">Some really long  add on nameSome really long  add on name...</p>
                                )}
                            </Col>
                            <Col md="6">
                                {new Array(4).fill(0, 0).map(item =>
                                    <p className="addon-price">Rs. 4,546 </p>
                                )}
                            </Col>
                        </Row>
                    </div>

                    {/* Premium */}
                    <div className="premium-div">
                        <h3 className="premium-heading">PREMIUM</h3>
                        <Row>
                            <Col md="6">
                                <p className="premium-name">Packagae Premium...</p>
                                <p className="premium-name">GST@18%...</p>
                                <p className="premium-name">Total Premium...</p>
                            </Col>
                            <Col md="6">
                                <p className="premium-price">Rs. 4,546 </p>
                                <p className="premium-price">Rs. 4,546 </p>
                                <p className="premium-price"><span>Rs. 4,546<span>/month</span></span> </p>
                            </Col>
                        </Row>
                    </div>
                    {/* Full premium breakup */}
                    <p className="premium-breakup">Full Premium Breakup</p>
                    <hr />
                    <div>
                        <p className="cover-type-heading">Coverage Type</p>
                        <p className="cover-type-value">Comprehensive Cover</p>
                    </div>
                    <hr />
                    <div>
                        <p className="total-detail">3 Add-ons, 2 Additional Cover and 1 Discount applied</p>
                        <p className="edit">Edit</p>
                    </div>
                </Panel>
                {/* Second Panel */}
                <Panel className={classes.root}>
                    <div className="tabs-payment">
                        <p className={this.state.tab_value === 1 ? "tabs-active" : ""}>Add-Ons</p>
                        <p className={this.state.tab_value === 2 ? "tabs-active" : ""}>Additional Covers</p>
                        <p className={this.state.tab_value === 3 ? "tabs-active" : ""}>Discounts</p>
                    </div>
                    <hr style={{ marginTop: '-10px', background: '#aaaaaa' }} />

                    {this.state.tab_value === 1 &&
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
                </Panel>
            </div>
        )
    }
}


PaymentDetails.propTypes = {
    classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(PaymentDetails)