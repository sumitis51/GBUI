import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Container from 'muicss/lib/react/container'
import Card from '@material-ui/core/Card'
import ButtonLightSuccess from '../../../Shared/ButtonLightSuccess/index'


import './index.css'

class UnapprovedDocuments extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className='not-approved-documents'>
                    <Container fluid={true} className='not-approved-documents-container'>
                        <Row>
                            <Col md={12} className='not-approved-documents-card'>
                                <Card square={false} className='card-container'>
                                    <Row>
                                        <Col md={7} className='not-approved-documents-pic mui--hidden-xs mui--hidden-sm'>
                                            <Col md={12}>
                                                <div className='verify-number gbui-h4'>Some of your documents are not approved</div>
                                            </Col>
                                            <Col md={12}>
                                                <div className='pos-documet-not-approved-pic'>
                                                    <img className='pos-document-pic' alt='document-not-approved-pic' src='/assets/pos/unapproved-pos.svg' />
                                                </div>
                                            </Col>
                                        </Col>
                                        <Col md={5} xs={12} className='not-approved-documents-div'>
                                            <Col md={12} xs={12}>
                                                <div className='not-approved-documents-heading gbui-h5'>Unapproved Documents</div>
                                            </Col>
                                            <Col md={12} xs={12}>
                                                <div className='not-approved-documents-subheading gbui-menu-bar-2'>Awesome line</div>
                                            </Col>
                                            <Row className='not-approved-files'>
                                                <Col md={12} xs={12}>
                                                    <div className='not-approved-files-jpg gbui-menu-bar-2'>View your approved document</div>
                                                </Col>
                                            </Row>
                                            <Row className='not-approved-files'>
                                                <Col md={12} xs={12}>
                                                    <div className='button-view-comment'>
                                                        <ButtonLightSuccess Text='View your document' fullPinkContent={true} />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className='not-approved-files'>
                                                <Col md={12} xs={12} className='not-approved-column'>
                                                    <div className='close-icon' style={{ display: 'inline' }}>
                                                        <i class="material-icons"
                                                            style={{
                                                                color: '#940016',
                                                                backgroundColor: '#ffffff',
                                                                display: 'inline',
                                                                verticalAlign: 'middle'
                                                            }}
                                                        >
                                                            cancel
                                                            </i>
                                                    </div>
                                                    <div className='some-documents-not-approved gbui-caption-1' style={{ display: 'inline' }}>
                                                        Some of your documents are not approved
                                                    </div>
                                                </Col>
                                                <Col md={12} xs={12}>
                                                    <div className='reason gbui-caption-1'>
                                                        Reason: Lorem Ipsum is simply dummy text of the printing and
                                                                  typesetting industry.
                                                        </div>
                                                </Col>
                                                <Col md={12} xs={12}>
                                                    <div className='upload-these-documents gbui-subtitle-1'>
                                                        Upload these Documents
                                                        </div>
                                                </Col>
                                            </Row>
                                            <Row className='not-approved-files'>
                                                <Col md={6} xs={6}>
                                                    <div className='not-approved-passport-size gbui-body-2'>Document Type 1</div>
                                                    <div className='photo gbui-subtitle-1'>Document1.jpg</div>
                                                </Col>
                                                <Col md={6} xs={6}>
                                                    <div className='max-life gbui-caption-2'>(Max file size: 5 MB)</div>
                                                    <div className='close-icon'>
                                                        <i class="material-icons" style={{ float: 'right' }}>
                                                            close
                                                            </i>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className='not-approved-files'>
                                                <Col md={6} xs={6}>
                                                    <div className='not-approved-passport-size gbui-body-2'>Document Type 2</div>
                                                    <div className='photo gbui-subtitle-1'>Document2.jpg</div>
                                                </Col>
                                                <Col md={6} xs={6}>
                                                    <div className='max-life gbui-caption-2'>(Max file size: 5 MB)</div>
                                                    <div className='close-icon'>
                                                        <i class="material-icons" style={{ float: 'right' }}>
                                                            close
                                                            </i>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className='not-approved-files'>
                                                <Col md={6} xs={6}>
                                                    <div className='not-approved-passport-size gbui-body-2'>Document Type 3</div>
                                                    <div className='photo gbui-subtitle-1'>Document3.jpg</div>
                                                </Col>
                                                <Col md={6} xs={6}>
                                                    <div className='max-life gbui-caption-2'>(Max file size: 5 MB)</div>
                                                    <div className='close-icon'>
                                                        <i class="material-icons" style={{ float: 'right' }}>
                                                            close
                                                            </i>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className='not-approved-files'>
                                                <Col md={12} xs={12}>
                                                    <div className='button-confirm-success'>
                                                        <ButtonLightSuccess Text='Submit' fullWarningPink={true} />
                                                    </div>
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



export default UnapprovedDocuments;
