import React, { Component } from 'react';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import { Link } from 'react-router-dom';
import './leftpanel.css';


class LeftPanel extends Component {
    render() {
        return (
            <div>
                    <Col md={3} className='mui--hidden-sm mui--hidden-xs'>
                       {this.props.about &&
                          <div>
                               <Row>
                                    <Col md={12}>
                                        {/* <div className='companyName'>
                                            <div class='companyNameText'>{this.props.leftpanel ? this.props.leftpanel.LeftPanelCompanyNameText : ''}</div>
                                        </div> */}
                                        <div className="termText">
                                           <Link to="/about" style={{ color: '#333333' }}><div className='aboutText' style={{ color: '#333333' }}>{this.props.leftpanel ? this.props.leftpanel.LeftPanelAboutUsText : ''}</div></Link>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <div className='legal'>
                                            <div className='legalText'>{this.props.leftpanel ? this.props.leftpanel.LeftPanelLegalText : ''}</div>
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <Link to="/TnC" style={{ color: '#333333' }}><div className='terms'>{this.props.leftpanel ? this.props.leftpanel.LeftPanelTermsNCondition : ''}</div></Link>
                                        <Link to="/privacy-policy" style={{ color: '#333333' }}><div className='policy'>{this.props.leftpanel ? this.props.leftpanel.LeftPanelPrivacyPolicy : ''}</div></Link>
                                    </Col>
                                </Row>
                          </div>
                        }
                        {this.props.Tnc &&
                          <div>
                            <Row>
                                <Col md={12}>
                                    {/* <div className='companyName'>
                                        <div class='companyNameText'>{this.props.leftpanel ? this.props.leftpanel.LeftPanelCompanyNameText : ''}</div>
                                    </div> */}
                                    <Link to="/about" style={{ color: '#333333' }}><div className='aboutText2'>{this.props.leftpanel ? this.props.leftpanel.LeftPanelAboutUsText : ''}</div></Link>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <div className='legal'>
                                        <div className='legalText'>{this.props.leftpanel ? this.props.leftpanel.LeftPanelLegalText : ''}</div>
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <div className="termText">
                                    <Link to="/TnC" style={{ color: '#333333' }}><div className='terms' style={{ color: '#333333' }}>{this.props.leftpanel ? this.props.leftpanel.LeftPanelTermsNCondition : ''}</div></Link>
                                    </div>
                                    <Link to="/privacy-policy" style={{ color: '#333333' }}><div className='policy'>{this.props.leftpanel ? this.props.leftpanel.LeftPanelPrivacyPolicy : ''}</div></Link>
                                </Col>
                            </Row>
                            </div>
                        }
                        {this.props.privacyPOlicy && <div>
                            <Row>
                                <Col md={12}>
                                    {/* <div className='companyName'>
                                        <div class='companyNameText'>{this.props.leftpanel ? this.props.leftpanel.LeftPanelCompanyNameText : ''}</div>
                                    </div> */}
                                    <Link to="/about" style={{ color: '#333333' }}><div className='aboutText2'>{this.props.leftpanel ? this.props.leftpanel.LeftPanelAboutUsText : ''}</div></Link>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <div className='legal'>
                                        <div className='legalText'>{this.props.leftpanel ? this.props.leftpanel.LeftPanelLegalText : ''}</div>
                                    </div>
                                </Col>
                                <Col md={12}>
                                    <Link to="/TnC" style={{ color: '#333333' }}><div className='terms' style={{color:'#808080'}}>{this.props.leftpanel ? this.props.leftpanel.LeftPanelTermsNCondition : ''}</div></Link>
                                    <div className="termText">
                                     <Link to="/privacy-policy" style={{ color: '#333333' }}><div className='policy' style={{ color: '#333333' }}>{this.props.leftpanel ? this.props.leftpanel.LeftPanelPrivacyPolicy : ''}</div></Link>
                                    </div>
                                </Col>
                            </Row>
                        </div>}
                    </Col>
            </div>
        )
    }
}

export default LeftPanel;