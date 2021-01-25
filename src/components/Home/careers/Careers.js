import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core'
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Panel from 'muicss/lib/react/panel';
import FormCV from '../../UploadCV/';
import ButtonLightSuccess from '../../Shared/ButtonLightSuccess/index';
import { connect } from 'react-redux';

import './careers.css'


class Carrers extends Component {
    state = {
        formId:0
    }
    handleExpansion(id_no,formId) {
        this.setState({formId:formId})
        this.props.onCvUpload(true);
        console.log('id',formId);
    }
    render() {
        return (
            <MuiThemeProvider>
                <div class='career'>
                    <Container fluid={true}>
                        <Row>
                            <Col md={12} xs={12}>
                                <div className='gbui-h4 carrier' >
                                    CAREERS
                                </div>
                            </Col>
                            <Col md={12} xs={12}>
                                <div className='gbui-subtitle-1 some-awesome-line' >
                                  We believe and value smart people who make ideas turn into action !
                                </div>
                                <div className='gbui-subtitle-1 some-awesome-line' >
                                    Unleash your potential with us !
                                </div>
                            </Col>
                            <Col md={12} xs={6}>
                                <div className=' gbui-subtitle-1 designing' >
                                    Developers(4 Jobs)
                                </div>
                            </Col>
                        </Row>
                        <Panel className='parent-panel'>
                            <Row>
                                <Col md="12" xs={12} className='userExpDesign gbui-subtitle-1'>
                                    LEAD JAVA DEVELOPER
                                </Col>
                                <Col md="12" xs={12} className='exp gbui-body-2'>
                                    Experience:-5 Years
                                </Col>
                                <Col md="12" xs={12} className='responsibilities gbui-body-1'>
                                    Roles and responsibilities:
                                </Col>
                                <Col md={12}>
                                    <div className='details gbui-body-1'>
                                        • Build high availability and extreme reliable high volume transactional systems.
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className='details gbui-body-1'>
                                        • Deliver reliable solutions that handle massive data and high traffic.
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className='details gbui-body-1'>
                                        •  Complete ownership of problem-free execution of owned modules and solutions.
                                    </div>
                                </Col>
                                <Col md={6} xs={12}>
                                    <div className='view-more-button' onClick={this.handleExpansion.bind(this, 1,1)} open={true} id="d_job_btn_1">
                                        <ButtonLightSuccess Text="View More" contentPink={true} />
                                    </div>
                                    <div className="job_form1" id="d_job_form_1">
                                        <FormCV Key={this.state.formId} formId={1} />
                                    </div>
                                </Col>
                            </Row>
                        </Panel>
                        <Panel className='parent-panel'>
                            <Row>
                                <Col md="12" xs={12} className='userExpDesign gbui-subtitle-1'>
                                    JAVA DEVELOPERS (2)
                                </Col>
                                <Col md="12" xs={12} className='exp gbui-body-2'>
                                    Experience:-2 Years
                                </Col>
                                <Col md="12" xs={12} className='responsibilities gbui-body-1'>
                                    Roles and responsibilities:
                                </Col>
                                <Col md={12}>
                                    <div className='details gbui-body-1'>
                                        • Build high availability and extreme reliable high volume transactional systems.
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className='details gbui-body-1'>
                                        • Deliver reliable solutions that handle massive data and high traffic.
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className='details gbui-body-1'>
                                        • Complete ownership of problem-free execution of owned modules and solutions.
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className='details gbui-body-1'>
                                        •  Focus on code optimisation, code quality, maintainability etc.
                                    </div>
                                </Col>
                                <Col md={6} xs={12}>
                                    <div className='view-more-button' onClick={this.handleExpansion.bind(this, 1,2)} id="d_job_btn_1">
                                        <ButtonLightSuccess Text="View More" contentPink={true} />
                                    </div>
                                    <div className="job_form" id="d_job_form_2">
                                        <FormCV Key={this.state.formId} formId={2} />
                                    </div>
                                </Col>
                            </Row>
                        </Panel>
                        <Panel className='parent-panel'>
                            <Row>
                                <Col md="12" xs={12} className='userExpDesign gbui-subtitle-1'>
                                    FRONT END DEVELOPERS (2)
                                </Col>
                                <Col md="12" xs={12} className='exp gbui-body-2'>
                                    Experience:-2 Years
                                </Col>
                                <Col md="12" xs={12} className='responsibilities gbui-body-1'>
                                    Roles and responsibilities:
                                </Col>
                                <Col md={12}>
                                    <div className='details gbui-body-1'>
                                        • Developing new user-facing features using React.js
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className='details gbui-body-1'>
                                        • Building reusable components and front-end libraries for future use
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className='details gbui-body-1'>
                                        • Translating designs and wireframes into high quality code
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className='details gbui-body-1'>
                                        • Optimizing components for maximum performance across a vast array of web-capable devices and browsers.
                                    </div>
                                </Col>
                                <Col md={6} xs={12}>
                                    <div className='view-more-button' onClick={this.handleExpansion.bind(this, 1,3)} id="d_job_btn_1">
                                        <ButtonLightSuccess Text="View More" contentPink={true} />
                                    </div>
                                    <div className="job_form" id="d_job_form_3">
                                        <FormCV Key={this.state.formId} formId={3} />
                                    </div>
                                </Col>
                            </Row>
                        </Panel>
                    </Container>
                </div>
            </MuiThemeProvider>
        )
    }
}

const mapStateToProps = state => {
    return {
        onSelectCvUpload: state.popup.form_cv_upload
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCvUpload: (value) => dispatch({ type: 'FORM_CV_UPLOAD', value }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Carrers);