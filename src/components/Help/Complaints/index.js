import React from 'react'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

const styles = theme => ({
    buttonRoot3: {
        color: 'white',
        backgroundColor: '#0da176',
        '&:hover': {
            backgroundColor: '#0da176',
        },
        padding: '10px 60px',
        margin: '0 0 1rem 0'
    },
})


class ContactUs extends React.Component {


    render() {
        const { classes } = this.props;
        return (
            <div>
                <div>
                    <Row>
                        <Col md="9" sm="12" xs="12" className="">
                            <div className="contact_recommend_other_div">
                                
                                <Row>
                                    <Col md="9">
                                        <h3
                                            className="l1_heading">
                                            Level 1: Submitting a complaint for the first time
                                        </h3>
                                        <p className="l1_text">
                                            Click here to send us an e-mail of your grievance.<br className="mui--hidden-sm mui--hidden-xs" />
                                            To help us serve you better and for security of your account,<br className="mui--hidden-sm mui--hidden-xs" />
                                            please mention your registered e-mail ID.
                                            <div style={{ paddingTop: '1rem' }}>
                                                <Button
                                                    onClick={() => { window.open('/level-1', '_blank') }}
                                                    className={classNames(classes.buttonRoot3)}>Raise a Complaint </Button>
                                            </div>
                                        </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="9">
                                        <h3
                                            className="l1_heading">
                                            Level 2: You are not satisfied with the first response
                                        </h3>
                                        <p className="l1_text">
                                            If the resolution you receive does not meet your<br className="mui--hidden-sm mui--hidden-xs" />
                                            expectations, please write to Mr. Subhendu Tripathy, Head<br className="mui--hidden-sm mui--hidden-xs" /> - Phone Banking
                                            <br className="mui--hidden-sm mui--hidden-xs" /><br className="mui--hidden-sm mui--hidden-xs" />
                                            Click here to raise a query/request to Senior Management.
                                            <div style={{ paddingTop: '1rem' }}>
                                                <Button
                                                    onClick={() => { window.open('/level-2', '_blank') }}
                                                    className={classNames(classes.buttonRoot3)}>Raise a Complaint</Button>
                                            </div>
                                        </p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="9">
                                        <h3
                                            className="l1_heading">
                                            Level 2: You are not satisfied with the first response
                                        </h3>
                                        <p className="l1_text">
                                            If the resolution you receive does not meet your<br className="mui--hidden-sm mui--hidden-xs" />
                                            expectations, please write to Mr. Subhendu Tripathy, Head<br className="mui--hidden-sm mui--hidden-xs" /> - Phone Banking
                                            <br className="mui--hidden-sm mui--hidden-xs" /><br className="mui--hidden-sm mui--hidden-xs" />
                                            Click here to raise a query/request to Senior Management.
                                            <div style={{ paddingTop: '1rem' }}>
                                                <Button
                                                    onClick={() => { window.open('/level-3', '_blank') }}
                                                    className={classNames(classes.buttonRoot3)}>Raise a Complaint</Button>
                                            </div>
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

ContactUs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContactUs)