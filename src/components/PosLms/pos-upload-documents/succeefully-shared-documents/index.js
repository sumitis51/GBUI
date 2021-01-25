import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Container from 'muicss/lib/react/container'
import Card from '@material-ui/core/Card'
import ButtonLightSuccess from '../../../Shared/ButtonLightSuccess/index'

import './index.css'

class SuccessfullSharedDocuments extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className='successfully-upload-documents'>
                    <Container fluid={true} className='successfully-upload-documents-container'>
                        <Row>
                            <Col md={12} className='successfully-upload-documents-card'>
                                <Card square={false} className='card-container'>
                                    <Row>
                                        <Col md={7}
                                            className='successfully-upload-documents-pic mui--hidden-xs mui--hidden-sm'>
                                            <Col md={12}>
                                                <div className='successfully-uploaded-text gbui-h4'>
                                                    You have sucessfully shared your document.
                                                  </div>
                                            </Col>
                                            <Col md={12}>
                                                <div className='pos-documet-successfully-upload-pic'>
                                                    <img
                                                        alt='pos-document-pic'
                                                        className='pos-document-pic'
                                                        src='/assets/pos/uploaded-successfully.svg' />
                                                </div>
                                            </Col>
                                        </Col>
                                        <Col md={5} xs={12} className='successfully-upload-documents-div'>
                                            <Col md={12} xs={12}>
                                                <div className='successfully-upload-documents-heading gbui-h5'>
                                                    Confirmation Awaited
                                                    </div>
                                            </Col>
                                            <Col md={12} xs={12}>
                                                <div className=
                                                    'successfully-upload-documents-subheading gbui-menu-bar-2'>
                                                    Awesome line
                                                    </div>
                                            </Col>
                                            <Row className='successfully-upload-files'>
                                                <Col md={12} xs={12}>
                                                    <div className='view-your-comment gbui-body-2'>
                                                        View/Edit your document
                                                    </div>
                                                </Col>
                                                <Col md={12}>
                                                    <div className='edit-your-comment-button'>
                                                        <ButtonLightSuccess Text='View/Edit your document' fullPinkContent={true} />
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

export default SuccessfullSharedDocuments