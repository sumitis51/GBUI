import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core'
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import './Ourmission.css'


class OurMission extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className='ourmission'>
                    <Container fluid={true} className='missionContainer'>
                        <Row>
                            <Col md="3"></Col>
                            <Col md="9">
                                <Row>
                                    <Col md='12' xs='12'>
                                        <div className='missionText'>{this.props.OurInvestors ? this.props.OurInvestors.OurInvestors_OurInvestorsText : ''}</div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={3} sm={5} md="4" xs="12">
                                        <div className='investorLogo'></div>
                                    </Col>
                                    <Col lg={9} sm={7} md='8' xs='12'>
                                        <div className='investorName'>{this.props.OurInvestors ? this.props.OurInvestors.OurInvestors_InvestorName1 : ''}</div>
                                        <div className='investorInfo'>
                                            {this.props.OurInvestors ? this.props.OurInvestors.OurInvestors_InvestorAboutText1 : ''}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={3} sm={5} md="4" xs="12">
                                        <div className='investorLogo'></div>
                                    </Col>
                                    <Col lg={9} sm={7} md='8' xs='12'>
                                        <div className='investorName'>{this.props.OurInvestors ? this.props.OurInvestors.OurInvestors_InvestorName2 : ''}</div>
                                        <div className='investorInfo'>
                                            {this.props.OurInvestors ? this.props.OurInvestors.OurInvestors_InvestorAboutText2 : ''}
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default OurMission