import React, { Component } from 'react'
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import { Link } from 'react-router-dom';
import './footerTemp.css'

class FooterTemp extends Component {
    render() {
        return (
          
                <div className='footer' id="footer_main_here">
                    <Container fluid={true}>
                        <Row className='outText'>
                            <Col md={5} xs={12} className='funText'>
                            “Pehla Sukh Nirogi Kaya” <br/>
                                means<br/>
                                “Health is the primary happiness”
                                {/* - Indian Scriptures */}
                              <div className='writer' style={{marginTop: '0.9rem' }}>- Indian Scriptures</div>
                            </Col>
                            <Col md={3} xs={6}>
                                <Col md={12} xs={12} className='links'>USEFUL LINKS</Col>
                                <Link to="/connect-with-us" style={{color:'white'}}><Col md={12} xs={12} className='linkText'>Connect with us</Col></Link>
                                {/* <Link to="/connect-with-us" style={{color:'white'}}><Col md={12} xs={12} className='linkText'>Connect with us</Col></Link> */}
                                {/* <Link to="/about" style={{color:'white'}}><Col md={12} xs={12} className='linkText'
                                  onClick={() => { document.getElementById('about').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})}}>About Us</Col></Link> */}
                                    <Link to="/about" style={{color:'white'}}><Col md={12} xs={12} className='linkText'
                                  >About Us</Col></Link>
                                <Link to="/faq" style={{color:'white'}}><Col md={12} xs={12} className='linkText'>FAQ’s</Col></Link>

                                {/* <Link to="#" style={{color:'white'}}><Col md={12} xs={12} className='linkText'
                                  onClick={() => { document.getElementById('team').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})}}>Teams</Col></Link> */}
                                <Link to="/careers" style={{color:'white'}}><Col md={12} xs={12} className='linkText'
                                  >Careers</Col></Link>
                                   <Link to="/isnp" style={{color:'white'}}><Col md={12} xs={12} className='linkText'
                                  >ISNP</Col></Link>
                                {/* <Link to="/isnp" style={{color:'white'}}><Col md={12} xs={12} className='linkText'>ISNP</Col></Link> */}
                                <Link to="/tnc" style={{color:'white'}}><Col md={12} xs={12} className='linkText'>Legal and Admin Policies</Col></Link>
                            </Col>
                            <Col md={3} xs={6}>
                                <Col md={12} xs={12} className='contact'>Contact Us</Col>
                                <Col md={12} xs={12} className='contactInfo'>Phone number</Col>
                                <Col md={12} xs={12} className='info'><a style={{color:'#ea0b4b'}} href="tel:9707600600">9707600600</a></Col>
                                <Col md={12} xs={12} className='contactInfo'>Email</Col>
                                <Col md={12} xs={12} className='info'><a style={{color:'#ea0b4b'}} href="mailto:connect@groupbima.com?Subject=Hello%20again">connect@groupbima.com</a></Col>
                                <Col md={12} xs={12} className='contactInfo'>Business hours</Col>
                                <Col md={12} xs={12} className='info'>Monday - Saturday <br />9 AM - 6 PM</Col>
                            </Col>
                        </Row>
                        <Row className='outText'>
                            <Col md={12} sm={12} xs={12} className='footerText'>
                            CIN: U66000DL2018PTC331400 | Groupfit Insurance Brokers Private Limited. Corporate Office: Groupfit Insurance Brokers Pvt.Ltd. 1501, 15th Floor,The Ambience Court, Sector 19 D, Vashi, Navi Mumbai 400703. Principal Officer: Dadasaheb Pagare. Email: po_groupfit@groupbima.com | IRDAI License No. 670 License Code No. IRDA/DB741/18. Valid till 01.01.2022 
                            Insurance is the subject matter of solicitation, visitors are hereby informed that their information submitted on the website may be shared with insurers. 
                             Product information is authenticated and solely based on the information received from the insurers.
                           </Col>
                        </Row>
                        <Row className='RightBox'>
                            <Col md='6' xs="12">
                                <div className='copyright-content'>
                                  &copy;2018-All Rights Reserved Groupfit Insurance Brokers Private Limited
                                </div>
                            </Col>
                            <Col md='6' xs="12">
                                <div className='social-icons-container'>
                                    <a href="https://www.facebook.com/GroupBima/">
                                      {/* <Icon className='socialIcon' path={mdiFacebookBox} size={0.8} color="white" /> */}
                                      <div className='socialIcon'><img src={'/assets/social/facebook.svg'}/></div>
                                    </a>
                                    <a href="https://twitter.com/GrpBima">
                                      {/* <Icon className='socialIcon' path={mdiTwitter} size={0.8} color="white" /> */}
                                      <div className='socialIcon'><img src={'/assets/social/twitter.svg'}/></div>
                                    </a>
                                    <a href="https://www.instagram.com/group_bima/">
                                      {/* <Icon className='socialIcon' path={mdiInstagram} size={0.8} color="white" /></a> */}
                                      <div className='socialIcon'><img src={'/assets/social/instagram.svg'}/></div>
                                    </a>
                                    <a href="https://www.linkedin.com/company/groupbima/">
                                      {/* <Icon className='socialIcon' path={mdiLinkedin} size={0.8} color="white" /> */}
                                      <div className='socialIcon'><img src={'/assets/social/linkedin.svg'}/></div>
                                    </a>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            

        )
    }
}

export default FooterTemp;