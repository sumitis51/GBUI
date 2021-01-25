import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core'
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import './OurTeamTemp.css';
import Avatar from '@material-ui/core/Avatar';


class OurTeamTemp extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className='ourteamtemp'>
                    <Container fluid={true}>
                        <Row >
                            <Col md={12} xs={12}>
                                <div className='gbui-h4 ourteamText'>
                                    {this.props.ourteam ? this.props.ourteam.OurTeamHeadingText : ''}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4} sm={12} xs={12} className='team-block'>
                                <Col md={12} sm={12} xs={12} >
                                    <div className='image'>
                                        <Avatar alt="Dada Saheb" src="/assets/HomePage/DS.jpg" style={{ width: '91px', height: '91px' }} />
                                    </div>
                                </Col>
                                <Col md={12} sm={12} xs={12}>
                                    <div className='gbui-menu-bar-1 name'>{this.props.ourteam ? this.props.ourteam.ourTeamMembarName1 : ''}</div>
                                    <div className='gbui-caption-1 designationText'>{this.props.ourteam ? this.props.ourteam.ourTeamMembarDesignation1 : ''}</div>
                                    <div className='gbui-body-1 about'>{this.props.ourteam ? this.props.ourteam.ourTeamMembarAbout1 : ''}</div>
                                </Col>
                            </Col>
                            <Col md={4} sm={12} xs={12} className='team-block'>
                                <Col md={12} sm={12} xs={12}>
                                    <div className='image'>
                                        <Avatar alt="Dada Saheb" src="/assets/HomePage/ashwini.jpg" style={{ width: '91px', height: '91px' }} />
                                    </div>
                                </Col>
                                <Col md={12} sm={12} xs={12}>
                                    <div className='gbui-menu-bar-1 name'>{this.props.ourteam ? this.props.ourteam.ourTeamMembarName2 : ''}</div>
                                    <div className='gbui-caption-1 designationText'>{this.props.ourteam ? this.props.ourteam.ourTeamMembarDesignation2 : ''}</div>
                                    <div className='gbui-body-1 about'>{this.props.ourteam ? this.props.ourteam.ourTeamMembarAbout2 : ''}</div>
                                </Col>
                            </Col>
                            <Col md={4} sm={12} xs={12} className='team-block'>
                                <Col md={12} sm={12} xs={12}>
                                    <div className='image'>
                                        <Avatar alt="Dada Saheb" src="/assets/HomePage/mohit.jpg" style={{ width: '91px', height: '91px' }} />
                                    </div>
                                </Col>
                                <Col md={12} sm={12} xs={12}>
                                    <div className='gbui-menu-bar-1 name'>{this.props.ourteam ? this.props.ourteam.ourTeamMembarName3 : ''}</div>
                                    <div className='gbui-caption-1 designationText'>{this.props.ourteam ? this.props.ourteam.ourTeamMembarDesignation3 : ''}</div>
                                    <div className='gbui-body-1 about'>{this.props.ourteam ? this.props.ourteam.ourTeamMembarAbout3 : ''}</div>
                                </Col>
                            </Col>
                        </Row>
                        <Row>
                            {/* <Col md={6} sm={12} xs={12} className='team-block'>
                                <Col md={3} sm={12} xs={12}>
                                    <div className='image'>
                                        <Avatar alt="Dada Saheb" src="/assets/HomePage/orindam.jpg" style={{ width: '91px', height: '91px' }} />
                                    </div>
                                </Col>
                                <Col md={9} sm={12} xs={12}>
                                    <div className='gbui-menu-bar-1 name'>{this.props.ourteam ? this.props.ourteam.ourTeamMembarName4 : ''}</div>
                                    <div className='gbui-caption-1 designationText'>{this.props.ourteam ? this.props.ourteam.ourTeamMembarDesignation4 : ''}</div>
                                    <div className='gbui-body-1 about'>{this.props.ourteam ? this.props.ourteam.ourTeamMembarAbout4 : ''}</div>
                                </Col>
                            </Col> */}
                           
                        </Row>
                    </Container>
                </div>
            </MuiThemeProvider>

        )
    }
}

export default OurTeamTemp;
