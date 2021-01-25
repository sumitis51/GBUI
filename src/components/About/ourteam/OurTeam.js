import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core'
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import './ourteam.css'




class OurTeam extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className='ourteam'>
                    <Container fluid={true}>
                        <Row>
                            <Col lg={3} md="3"></Col>
                            <Col lg={9} md="9" className='links-div'>
                                <Row>
                                    <Col md='12' xs='12'>
                                        <div className='linkText'>Our <span style={{ fontWeight: '600' }}>Team</span></div>
                                        <hr style={{ marginTop: '0px', backgroundColor: '#ea0b4b', height: '2px',marginBottom:'3rem' }} width='5%' />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4} xs={12}>
                                        <Card className='team-card'>
                                            <CardContent>
                                                <Col md={12} sm={12} xs={12} >
                                                    <div className='subject-image'>
                                                        <Avatar alt="Dada Saheb" src="/assets/HomePage/DS.jpg" style={{ width: '91px', height: '91px' }} />
                                                    </div>
                                                </Col>
                                                <Col md={12} xs={12}>
                                                  <div className='name'>{this.props.ourteam ? this.props.ourteam.OurTeam_OurTeamMembarName1 : ''}</div>
                                                </Col>
                                                <Col md={12} xs={12}>
                                                  <div className='designationText'>CEO and Fulltime Director, GroupBima</div>
                                                </Col>
                                                <Col md={12} xs={12}>
                                                  <div className='designationText detail' style={{lineHeight:'1.5'}}>
                                                    A dynamic leader with experience in multiple classes of insurance business. He has rich experience in multiple classes of insurance business such as Engineering, Aviation, Property, Motor, Aviation, Liability & Speciality areas and is known for ensured growth, profitability and cost leadership.
                                                  </div>
                                                </Col>
                                            </CardContent>
                                        </Card>
                                    </Col>
                                    <Col md={4} xs={12}>
                                        <Card className='team-card'>
                                            <CardContent>
                                                <Col md={12} sm={12} xs={12} >
                                                    <div className='subject-image'>
                                                        <Avatar alt="Dada Saheb" src="/assets/HomePage/ashwini.jpg" style={{ width: '91px', height: '91px' }} />
                                                    </div>
                                                </Col>
                                                <Col md={12}>
                                                <div className='name'>Ashwani Kumar</div>
                                                </Col>
                                                <Col md={12}>
                                                <div className='designationText'>CEO and Fulltime Director, GroupBima</div>
                                                </Col>
                                                <Col md={12}>
                                                    <div className='designationText detail' style={{lineHeight:'1.5'}}>
                                                    Ashwani is an insurance professional with managerial and techno-marketing experience in business lines such as Personal lines, Fire, Engineering, and Marine.
                                                    He has interacted and collaborated with various International Insurers as well besides the Indian Insurers.
                                                    </div>
                                                </Col>
                                            </CardContent>
                                        </Card>
                                    </Col>
                                    <Col md={4} xs={12}>
                                        <Card className='team-card'>
                                            <CardContent>
                                                <Col md={12} sm={12} xs={12} >
                                                    <div className='subject-image'>
                                                        <Avatar alt="Dada Saheb" src="/assets/HomePage/mohit.jpg" style={{ width: '91px', height: '91px' }} />
                                                    </div>
                                                </Col>
                                                <Col md={12}>
                                                <div className='name'>Mohit Garg</div>
                                                </Col>
                                                <Col md={12}>
                                                <div className='designationText'>Head of Technology, GroupBima</div>
                                                </Col>
                                                <Col md={12}>
                                                <div className='designationText detail' style={{lineHeight:'1.5'}}>
                                                   Mohit has a diverse experience of over a decade in the E-commerce and Mobile development technology field. His core strengths include designing and handling large-scale systems with stability resulting in seamless user experience.
                                                </div>
                                                </Col>
                                            </CardContent>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md='12' xs='12'>
                                       <div className='linkText'>Our <span style={{ fontWeight: '600' }}>Values</span></div>
                                      <hr style={{ marginTop: '0px', backgroundColor: '#ea0b4b', height: '2px',marginBottom:'3rem'}} width='5%' />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md='12' xs='12'>
                                        <div className='valuetext'>
                                          Values are something that inspires us, defines who we are and how we work. These values work as DNA of our processes and help us in making things work and providing the customers with solutions for every issue. 
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <div className='number'>1</div>
                                        <div className='ownership-image'>
                                            <img alt='ownership' src='/assets/owenership.svg' className='ownership' />
                                        </div>
                                        <div className='main-heading'>Ownership</div>
                                        <div className='designationText detail' style={{lineHeight:'1.5'}}>
                                           At Groupbima, we think and work for the long term results. We believe in taking the ownership at everything we do, to give the desired positive result.
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <div className='number'>2</div>
                                        <div className='ownership-image'>
                                            <img alt='ownership' src='/assets/start-up.svg' className='ownership' />
                                        </div>
                                        <div className='main-heading'>Ambitious</div>
                                        <div className='designationText detail' style={{lineHeight:'1.5'}}>
                                            Thinking big leads to achieving big, when turned into action plans. We create a bold roadmap and communicate it with the teams to inspire the results. We always think and look for different ways to serve the customers better.
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <div className='number'>3</div>
                                        <div className='ownership-image'>
                                            <img alt='ownership' src='/assets/idea.svg' className='ownership' />
                                        </div>
                                        <div className='main-heading'>Innovation</div>
                                        <div className='designationText detail' style={{lineHeight:'1.5'}}>
                                           We at Groupbima look for new ideas everywhere, every time. Everyone here works to make things simple with innovative ideas. 
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <div className='number'>4</div>
                                        <div className='ownership-image'>
                                            <img alt='ownership' src='/assets/motivation.svg' className='ownership' />
                                        </div>
                                        <div className='main-heading'>Empowerment</div>
                                        <div className='designationText detail' style={{lineHeight:'1.5'}}>
                                          Exceptional talent is recognized and moved throughout the organization at Groupbima. Every hiring and promotion here raises the performance bar. We work for people and help them to invent development mechanisms.
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <div className='number'>5</div>
                                        <div className='ownership-image'>
                                            <img alt='ownership' src='/assets/medal.svg' className='ownership' />
                                        </div>
                                        <div className='main-heading'>Standards</div>
                                        <div className='designationText detail' style={{lineHeight:'1.5'}}>
                                          We believe in fixing the defects and problems once and for all. Relentlessly high standards are followed here by everyone. We motivate our teams to deliver high-quality products, processes, and services, by raising their standards and performance bar. 
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <div className='number'>6</div>
                                        <div className='ownership-image'>
                                            <img alt='ownership' src='/assets/handshake.svg' className='ownership' />
                                        </div>
                                        <div className='main-heading'>Trust</div>
                                        <div className='designationText detail' style={{lineHeight:'1.5'}}>
                                          At Groupbima, we listen attentively, speak candidly and treat others with respect. We measure us and our teams against the best. 
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <div className='number'>7</div>
                                        <div className='ownership-image'>
                                            <img alt='ownership' src='/assets/frugality.svg' className='ownership' />
                                        </div>
                                        <div className='main-heading'>Frugality</div>
                                        <div className='designationText detail' style={{lineHeight:'1.5'}}>
                                          We believe in being prudent or economical in the consumption of resources. We always try to accomplish more with less. Constraints help us in bringing resourcefulness, self-sufficiency, and invention.
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <div className='number'>8</div>
                                        <div className='ownership-image'>
                                            <img alt='ownership' src='/assets/curiosity.svg' className='ownership' />
                                        </div>
                                        <div className='main-heading'>Curiosity</div>
                                        <div className='designationText detail' style={{lineHeight:'1.5'}}>
                                          We are always curious about the new possibilities available and act in order to explore them. At Groupbima, we believe that there is always a scope for improvement and thus we never stop learning new things. 
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


export default (OurTeam);

