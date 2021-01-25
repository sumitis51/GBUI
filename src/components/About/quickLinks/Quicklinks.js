import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core'
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Card from '@material-ui/core/Card';
import ButtonLightSuccess from '../../Shared/ButtonLightSuccess/index';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom';
import './Quicklinks.css';


class Quicklinks extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className='quicklinks'>
                    <Container fluid={true} className='links'>
                        <Row>
                            <Col lg={3} md="3"></Col>
                            <Col lg={9} md="9">
                                <Row>
                                    <Col md="12" xs='12'>
                                        <div className='linkText'>Quick <span style={{fontWeight:'600'}}>Links</span></div>
                                         <hr style={{marginTop:'0px',backgroundColor:'#ea0b4b',height:'2px',marginBottom:'3rem'}} width='8%'/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={4} md="6" xs='12' >
                                        <div class='cardContainer'>
                                            <Card className='cardStyle'>
                                                <CardContent>
                                                    <Row>
                                                        <Col xs='12'>
                                                            <div className='getQuotes'>{this.props.quicklinks ? this.props.quicklinks.QuickLinksCardHeadingGetQuotesText : ''}</div>
                                                        </Col>
                                                        <Col xs='12'>
                                                            <div className='cardText'>
                                                                {this.props.quicklinks ? this.props.quicklinks.QuickLinksCardGetQuotesParagraphText : ''}</div>
                                                        </Col>
                                                        <Col xs='12'>
                                                            <Link to="/input-form-health" >
                                                                <div className='button-card'>
                                                                    <ButtonLightSuccess fullPinkContent={true} Text={this.props.quicklinks ? this.props.quicklinks.QuickLinksGetQuoteButtonText : ''} />
                                                                </div>
                                                            </Link>
                                                        </Col>
                                                    </Row>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </Col>
                                    <Col lg={4} md="6" xs='12'>
                                        <div class='cardContainer'>
                                            <Card className='cardStyle'>
                                                <CardContent>
                                                    <Row>
                                                        <Col xs='12'>
                                                            <div className='getQuotes'>{this.props.quicklinks ? this.props.quicklinks.QuickLinksCardHeadingBecomeAPartnerText : ''}</div>
                                                        </Col>
                                                        <Col xs='12'>
                                                            <div className='cardText'>
                                                                {this.props.quicklinks ? this.props.quicklinks.QuickLinksCardBecomeAPartnerParagraphText : ''}
                                                            </div>
                                                        </Col>
                                                        <Col xs='12'>
                                                            <Link to="/careers" >
                                                                <div className='button-card'>
                                                                    <ButtonLightSuccess fullPinkContent={true} Text={this.props.quicklinks ? this.props.quicklinks.QuickLinksSignUpForPosButtonText : ''} />
                                                                </div>
                                                            </Link>
                                                        </Col>
                                                    </Row>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </Col>
                                    <Col lg={4} md="6" xs='12'>
                                        <div class='cardContainer'>
                                            <Card className='cardStyle'>
                                                <CardContent>
                                                    <Row>
                                                        <Col xs='12'>
                                                            <div className='getQuotes'>{this.props.quicklinks ? this.props.quicklinks.QuickLinksCardHeadingHowWeWorkText : ''}</div>
                                                        </Col>
                                                        <Col xs='12'>
                                                            <div className='cardText'>
                                                                {this.props.quicklinks ? this.props.quicklinks.QuickLinksCardHeadingHowWeWorkParagraphText : ''}
                                                            </div>
                                                        </Col>
                                                        <Col xs='12'>
                                                            <div className='button-card'>
                                                               <ButtonLightSuccess fullPinkContent={true} Text={this.props.quicklinks ? this.props.quicklinks.QuickLinksHowWeWorkButtonText : ''} />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </CardContent>
                                            </Card>
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

export default Quicklinks;