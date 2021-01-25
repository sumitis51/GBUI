import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core'
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import './livesoon.css';





class LiveSoon extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className='parentDiv'>
                    <Container fluid={true} className='livesoon'>
                        <Row>
                            <Col md={7} xs={12} sm={6} className='mainText'>
                                <Col md={12} xs={12}>
                                    <div className='gbui-h4 make-a-difference-heading'>
                                        {this.props.liveSoon ? this.props.liveSoon.liveSoonInsuranceHeadingText : ''}
                                    </div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className='to-create-an-ecosysytem-heading gbui-h5'>
                                        {this.props.liveSoon ? this.props.liveSoon.liveSoonInsuranceSubHeadingText : ''}
                                    </div>
                                </Col>
                                <Col xs={12} className='mui--visible-xs-block'>
                                    <div className='home-temp-image'>
                                        <img src="assets/HomePage/family.jpg" className='mainPic' alt='livesoon' />
                                    </div>
                                </Col>
                                <Col md={12} xs={12} sm={12}>
                                    <div className='gbui-h7 main-content'>{this.props.liveSoon ? this.props.liveSoon.liveSoonInsuranceMainText : ''}</div>
                                </Col>
                                <Col md={12} xs={12} sm={12}>
                                    <div className="gbui-h7 no-false-promise-text">{this.props.liveSoon ? this.props.liveSoon.liveSoonInsuranceVisionEMNoFalse : ''}</div>
                                </Col>
                            </Col>
                            <Col md={5} xs={12} sm={6} className='mui--hidden-xs'>
                                <div className='home-temp-image'>
                                    <img src="assets/HomePage/livesoon.jpg" className='mainPic' alt='livesoon' />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default (LiveSoon);


