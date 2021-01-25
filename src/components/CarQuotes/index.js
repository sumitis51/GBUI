import React from 'react'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Panel from 'muicss/lib/react/panel'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

import PanelsHeader from '../Proposal_Summary_Motor/HeaderPanels'
import QuoteDetails from './QuoteDetails'
import PaymentDetails from './PaymentDetails'

import './car_quotes.css'


const styles = theme => ({
    buttonRoot3: {
        color: 'white',
        backgroundColor: '#0da176',
        '&:hover': {
            backgroundColor: '#0da176',
        },
        padding: '15px 10px'
    }
})
class CarQuotes extends React.Component{

    render() {
        const {classes} = this.props;
        return(
            <div className="parent-div-car-quotes">
                {/* Body content with margin on desktop */}

                <div className="car-quotes-body">
                    <p className="back-quotes-link">
                        <img alt='car-quotes' src="/assets/back.png" />
                        &nbsp;BACK TO PROPOSAL FORM
                    </p>

                    <p className="car-quotes-heading">Proposal Summary</p>

                    {/* Headers Panel */}
                    <PanelsHeader />

                    {/* Here divide in two columns */}
                    <Row>
                        <Col md="8">
                            <QuoteDetails />
                        </Col>
                        <Col md="4">
                            <div className="mui--hidden-xs mui--hidden-sm"><PaymentDetails /></div>
                            <Panel className="mui--hidden-lg mui--hidden-md mui--hidden-xl">
                                <p className="total-premium-heading">Total Premium <span>Full Premium Breakup</span></p>
                                <p className="details-addon">Details & Add-Ons <KeyboardArrowUp style={{marginBottom: '-8px'}}/></p>
                                <Row>
                                    <Col sm="7" xs="7">
                                        <p className="amount-year">Rs. 6,778<sup>/Year</sup></p>
                                        <p className="cover-value">Cover Value: Rs. 5,08,900</p>
                                    </Col>
                                    <Col sm="5" xs="5">
                                        {/* Buy policy button */}
                                        <Button
                                            className={classNames(classes.buttonRoot3)}>Buy Policy</Button>
                                    </Col>
                                </Row>
                            </Panel>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

CarQuotes.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CarQuotes)