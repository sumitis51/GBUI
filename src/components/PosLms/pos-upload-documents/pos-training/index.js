import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Container from 'muicss/lib/react/container'
import Card from '@material-ui/core/Card'
import ButtonLightSuccess from '../../../Shared/ButtonLightSuccess/index'

import './index.css'

class PosTraining extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className='pos-training-documents'>
                    <Container fluid={true} className='pos-training-documents-container'>
                        <Row>
                            <Col md={12} className='pos-training-documents-card'>
                                <Card square={false} className='card-container'>
                                    <Row>
                                        <Col md={7} className='pos-training-documents-pic mui--hidden-xs mui--hidden-sm'>
                                            <Col md={12}>
                                                <div className='verify-number gbui-h4'>Your documents are approved,Now you can start your training.</div>
                                            </Col>
                                            <Col md={12}>
                                                <div className='pos-documet-pos-training-pic'>
                                                    <img className='pos-document-pic' alt='document-pos-training-pic' src='/assets/pos/approved-pos.svg' />
                                                </div>
                                            </Col>
                                        </Col>
                                        <Col md={5} xs={12} className='pos-training-documents-div'>
                                            <Col md={12} xs={12}>
                                                <div className='pos-training-documents-heading gbui-h5'>Start your training</div>
                                            </Col>
                                            <Col md={12} xs={12}>
                                                <div className='pos-training-documents-subheading gbui-menu-bar-2'>Awesome line</div>
                                            </Col>
                                            <Row className='pos-training-files'>
                                                <Col md={12} xs={12} className='document-verified-column'>
                                                    <div className='close-icon' style={{ display: 'inline' }}>
                                                        <i class="material-icons"
                                                            style={{
                                                                color: '#0da176',
                                                                display: 'inline',
                                                                verticalAlign: 'middle'
                                                            }}
                                                        >
                                                            done
                                                            </i>
                                                    </div>
                                                    <div className='some-documents-pos-training gbui-label-1'style={{ display: 'inline' }}>
                                                        Document Verified
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className='pos-training-files'>
                                                <Col md={12} xs={12}>
                                                    <div className='button-view-comment'>
                                                        <ButtonLightSuccess Text='View your document' fullPinkContent={true} />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className='pos-training-files'>
                                                <Col md={12} xs={12}>
                                                    <div className='pos-training-passport-size gbui-body-2'>Training</div>
                                                </Col>
                                            </Row>
                                            <Row className='pos-training-files'>
                                                <Col md={10} xs={12}>
                                                    <div className='pos-training-passport-size gbui-body-2'>As per the IRDA regulations to become a POS, you
                                                                       should have certification.</div>
                                                </Col>
                                            </Row>
                                            <Row className='pos-training-files'>
                                                <Col md={12} xs={12} className='pos-training-files'>
                                                    <div className='button-continue-training'>
                                                        <ButtonLightSuccess Text='Continue to Training' midWarning={true} />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className='pos-refrel'>
                                                <Col md={12} xs={12}>
                                                    <div className='pos-training-refral-amount-credit gbui-body-1'>Hurray!!!
                                                        50% of the referral amount has
                                                            been credited to your refree</div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default PosTraining