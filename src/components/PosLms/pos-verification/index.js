import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Container from 'muicss/lib/react/container'
import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import ButtonLightSuccess from '../../Shared/ButtonLightSuccess/index'
import DialogContent from '@material-ui/core/DialogContent'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import './index.css'


class PosVerfication extends Component {
    state = {
        otp: '1234',
        mobile: '8928403040'
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    handleClickEdit = () => {
        this.props.onEditPosDetails(true)
    }
    render() {
        const { fullScreen} = this.props;
        return (
            <MuiThemeProvider>
                <div className='pos-lms'>
                    <Container fluid={true} className='pos-lms-container'>
                        <Row>
                            <Col md={12} className='lms-card'>
                                <Card square={false} className='card-container'>
                                    {/* verification of otp */}
                                    <Row>
                                        <Col md={7} className='pos-verification-pic mui--hidden-xs mui--hidden-sm'>
                                            <Col md={12}>
                                                <div className='verify-number gbui-h4'>Verify Number</div>
                                            </Col>
                                            <Col md={12}>
                                                <div className='pos-pic'>
                                                    <img className='pos-verification-pic' alt='pos-verification-pic'
                                                        src='/assets/pos/pos-verification.svg' />
                                                </div>
                                            </Col>
                                        </Col>
                                        <Col md={5} xs={12} className='pos-verification-container'>
                                            <Col md={12} xs={12}>
                                                <div className='verification-code gbui-h5'>Verification Code</div>
                                            </Col>
                                            <Col md={12} xs={12} className='type-your-code-column'>
                                                <div className='type-your-code gbui-menu-bar-2'>Please type the verification code sent to +91-9876543210</div>
                                            </Col>
                                            <Col md={12} xs={12}>
                                                <div className='entered-wrong-number gbui-body-1'>Entered wrong details? <span className='edit'
                                                    onClick={this.handleClickEdit}> Edit</span></div>
                                            </Col>
                                            <Col md={12} xs={12}>
                                                <TextField fullWidth
                                                    id="standard-name"
                                                    label="OTP"
                                                    value={this.state.otp}
                                                    onChange={this.handleChange('otp')}
                                                    margin="normal"
                                                />
                                            </Col>
                                            <Col md={12} xs={12}>
                                                <div className='button-confirm'>
                                                    <Link to='/pos-documents'><ButtonLightSuccess Text='Confirm' fullWarningPink={true} /></Link>
                                                </div>
                                            </Col>
                                            <Col md={12} xs={12} style={{textAlign:'center'}}>
                                                <div className='time-left gbui-body-1'>Time left</div>
                                                <div className='time gbui-body-1'>00:00 mins</div>
                                            </Col>
                                            <Col md={12} xs={12} style={{textAlign:'center'}}>
                                                <div className='time-left gbui-body-1'>If you didn’t recieved code!</div>
                                                <div className='time gbui-body-1'>Resend</div>
                                            </Col>
                                        </Col>
                                    </Row>
                                </Card>
                                {/* edit mobile number dialog */}
                                <Dialog
                                    open={this.props.editdetails}
                                    onClose={() => { this.props.onEditPosDetails(false) }}
                                    maxWidth="md"
                                    fullScreen={fullScreen}
                                    aria-labelledby="simple-dialog-title">
                                    <DialogContent>
                                        <Row>
                                            <Col md={12}>
                                                <div className='back-button'>
                                                    <i onClick={() => { this.props.onEditPosDetails(false) }} class="material-icons" style={{ float: 'left', cursor: 'pointer' }}>
                                                        keyboard_backspace
                                                </i>
                                                </div>
                                                <div className='edit-mobile-number h5'>Edit your mobile number</div>
                                            </Col>
                                            <Col md={12}>
                                                <div className='mobile'>
                                                    <TextField
                                                        id="standard-name"
                                                        label="Mobile Number"
                                                        value={this.state.mobile}
                                                        onChange={this.handleChange('mobile')}
                                                        margin="normal"
                                                    />
                                                </div>
                                            </Col>
                                            <Col md={12}>
                                                <div className='get-otp'>
                                                    <ButtonLightSuccess Text='Get OTP' midWidth={true} />
                                                </div>
                                            </Col>
                                        </Row>
                                    </DialogContent>
                                </Dialog>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </MuiThemeProvider>
        )
    }
}

PosVerfication.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    fullScreen: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};

const mapStateToProps = state => {
    return {
        editdetails: state.popup.edit_pos_details
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onEditPosDetails: (details) => dispatch({ type: 'EDIT_POS_DETAILS', details }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)((withMobileDialog({ breakpoint: 'xs' }))(PosVerfication)) 
