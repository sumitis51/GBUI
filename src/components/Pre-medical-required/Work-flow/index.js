import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { MuiThemeProvider } from '@material-ui/core/styles'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'

import './index.css'


const styles = theme => ({
    cardContent: {
        padding: '5px 16px',
    },
});


class WorkFlow extends Component {
    handleClose = () => {
        this.props.onWorkFlow(false)
    };
    render() {
        const { fullScreen, classes } = this.props;

        return (
            <MuiThemeProvider>
                <Dialog className="work-flow"
                    open={this.props.open}
                    onClose={() => { this.props.onWorkFlow(false) }}
                    maxWidth="sm"
                    fullScreen={fullScreen}
                    aria-labelledby="simple-dialog-title">
                    <DialogContent className='workflow-content'>
                        <Row>
                            <Col md={12} xs={10}><div className='flow-heading'>Process Flow</div></Col>
                            <Col xs={2} onClick={this.handleClose} className='mui--visible-xs-block'><i class="material-icons">close</i></Col>
                        </Row>
                        <Row className='workflow-row'>
                            <Col md={4} xs={4} className='workflow-column'>
                                <div className='card-container1'>
                                    <Card>
                                        <CardContent className={classes.cardContent}>
                                            <div className='header-content'>YOU ARE HERE</div>
                                            <div className='showing_premedical_pic1'><img src='assets/showingPremedical.svg' alt='line' /></div>
                                            <div className='firstCardContent'>
                                                Showing <span style={{ color: '#0da176' }}>Premedical Condition Requirement </span> before Buying the Policy
                                        </div>
                                        </CardContent>
                                    </Card>
                                </div>
                                <div className='card-container3'>
                                    <Card>
                                        <CardContent className={classes.cardContent}>
                                            <div className='showing_premedical_pic'><img src='assets/doctor.svg' alt='line' /></div>
                                            <div className='firstCardContent'>
                                                <span style={{ color: '#0da176' }}>Premedical checkup is done</span> but decision on Policy Issuance is pending from Insurance Co.
                                        </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </Col>
                            <Col md={2} xs={2} className='line-column'>
                                <div className='lineImage'><img src='assets/line.svg' alt='line'></img></div>
                            </Col>
                            <Col md={4} xs={4} className='workflow-column'>
                                <div className='card-container2'>
                                    <Card>
                                        <CardContent className={classes.cardContent}>
                                            <div className='showing_premedical_pic2'><img src='assets/customerBought.svg' alt='line' /></div>
                                            <div className='firstCardContent'>Customer has
                                             <span style={{ color: '#0da176' }}>
                                                    Bought the policy but Premedical checkup is pending
                                           </span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                        <Row className='workflow-card-row'>
                            <Col md={4} xs={4} className='workflow-card-column'>
                                <div className='card-container'>
                                    <Card>
                                        <CardContent className={classes.cardContent}>
                                            <div className='showing_premedical_pic'><img src='assets/customerBought.svg' alt='line' /></div>
                                            <div className='firstCardContent'>
                                                <span style={{ color: '#0da176' }}>Policy Loading </span> as per your
                                                   premedical test result before Buying the Policy
                                            </div>

                                        </CardContent>
                                    </Card>
                                </div>
                                <img src='assets/options.svg' alt='line' />
                                <Col md={6} xs={6} className='loading-accept'>Loading Accepted</Col>
                                <Col md={6} xs={6} className='loading-reject'>Loading Rejected</Col>
                                <div className='card-container'>
                                    <Card>
                                        <CardContent className={classes.cardContent}>
                                            <div className='showing_premedical_pic'><img src='assets/shopping.svg' alt='line' /></div>
                                            <div className='policy-issued'>
                                                Health Insurance Done
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </Col>
                            <Col md={4} xs={4} className='workflow-card-column'>
                                <div className='card-container'>
                                    <Card>
                                        <CardContent className={classes.cardContent}>
                                            <div className='showing_premedical_pic'><img src='assets/shopping.svg' alt='line' /></div>
                                            <div className='policy-issued'>
                                                Health Insurance Done and policy issued
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </Col>
                            <Col md={4} xs={4} className='workflow-card-column'>
                                <div className='card-container'>
                                    <Card>
                                        <CardContent className={classes.cardContent}>
                                            <div className='showing_premedical_pic'><img src='assets/rejected.svg' alt='line' /></div>
                                            <div className='policy-rejected'>
                                                Health insurance rejected by insurer
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <img src='assets/vertical.svg' className='vertical' style={{ display: 'inline' }} alt='line' />
                                    <div className='refund'>Amount Refunded</div>
                                </div>
                            </Col>
                        </Row>
                    </DialogContent>
                </Dialog>
            </MuiThemeProvider>
        )
    }
}


WorkFlow.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    fullScreen: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};

const mapStateToProps = state => {
    return {
        workflow: state.popup.work_flow_visible
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onWorkFlow: (workflow) => dispatch({ type: 'WORK_FLOW_VISIBLE', workflow })
    };
};
export default connect(mapStateToProps, mapDispatchToProps)((withMobileDialog({ breakpoint: 'xs' })(withStyles(styles, { withTheme: true })(WorkFlow))));