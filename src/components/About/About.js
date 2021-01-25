import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import './About.css'
import Quicklinks from './quickLinks/Quicklinks';
import OurInvestors from './ourInvestors/OurInvestors';
import OurTeam from './ourteam/OurTeam';
import axios from 'axios';
import { connect } from 'react-redux';
import Leftpanel from "../AboutTnCLeftPanel/LeftPanel";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {Helmet} from "react-helmet";




class about extends Component {
    state= {
         setPage:'/about'
    }
    componentWillMount() {
        const vm = this;
        this.props.onCurrentComponent('About.json');
        axios.get('/assets/json/About.json')
            .then((response) => {
                vm.props.onFetchLanguage(response.data[this.props.CurrentLanguage]);
            }, (error) => {
               
            })
    }
    handleChange = (event) =>  {
        this.setState({
            setPage:event.target.value
        })
        this.props.history.push(event.target.value);
      }
     

    render() {
        return (
            <MuiThemeProvider>
                <Helmet>
                    <title>Best Health Insurance Company for Individual &amp; family | Group Bima</title>
                    <meta name="description" content="Group Bima is one of the top medical health insurance service provider companies in India, which deals with the affordable best health insurance plans."/>
                </Helmet>
                <div className='about'>
                    <Container fluid={true} className='aboutus'>
                        <Row>
                            <Leftpanel about={true} leftpanel={this.props.FetchedLanguage} />
                            <Col lg={9} md={9} sm={12} xs={12}>
                                <Row className=' mui--hidden-lg mui--hidden-md mui--hidden-xl'>
                                    <Col xs={12}>
                                        <div className='mobile_select_menu'>
                                            <Select className="mobile_select"
                                                onChange={this.handleChange}
                                                value= {this.state.setPage}
                                            >
                                                <MenuItem value="/about">About Us</MenuItem>
                                                <MenuItem value="/TnC">Terms and Conditions</MenuItem>
                                                <MenuItem value="/privacy-policy">Privacy Policy</MenuItem>
                                            </Select>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md='12' xs='12'>
                                        <div className='about-pic'>
                                            <img alt='about' className='about' src='./assets/aboutUs.jpg' />
                                        </div>
                                    </Col>
                                    <Col md='12' xs='12'>
                                        <div className='linkText'>About <span style={{fontWeight:'600'}}>Us</span></div>
                                        <hr style={{marginTop:'0px',backgroundColor:'#ea0b4b',height:'2px'}} width='8%'/>
                                    </Col>
                                    <Col md='12' xs='12'>
                                        <div className='pageText'>
                                        <span style={{color:'#ea0b4b',fontSize:'24px',fontWeight:600}}>GroupBima</span> is an IRDAI approved insurance brokerage firm incorporated in 2018,  with a dream to connect people with happiness through easily accessible and digitally available insurance solutions. We are registered under the Start-Up India campaign and working towards creating easy innovative ways to help the customers in finding the best-fit insurance solutions.
                                        </div>
                                        <div className='pageText'>
                                        <span style={{color:'#ea0b4b',fontSize:'24px',fontWeight:600}}>GroupBima</span> is incorporated with the spirit to protect the customers’ interest with the help of smart technology, experienced approach, and seamless service. We offer the right plan with the right cover for a price based on the personalized needs of our customers.
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md='1' xs={1}>
                                        <div className='quotes'>“</div>
                                    </Col>
                                    <Col md='10' xs='10' className='quoteColumns'>
                                        <div className='aboutQuotes'>
                                        Excerpt : 
                                        </div>
                                        <div className='aboutQuotes'>
                                        We focus on connecting the customers with happiness by offering the best health insurance services and products for them.
                                        </div>
                                    </Col>
                                    <Col md='1' xs={1}>
                                        <div className='quotes2'>”</div>
                                    </Col>
                                </Row>
                                <Row>
                                    <div className='vision-container'>
                                        <Col md='12' xs='12'>
                                            <div className='linkText'>Our <span style={{fontWeight:'600'}}>Vision</span></div>
                                            <hr style={{marginTop:'0px',backgroundColor:'#ea0b4b',height:'2px',marginBottom:'3rem'}} width='5%'/>
                                        </Col>
                                        <Col md='12' xs='12'>
                                            <div className='headingText'>To make a difference to every life connected with us</div>
                                        </Col>
                                        <Col md='12' xs='12'>
                                            <div className='pageText'>
                                            We are a customer-centric organization and are focused on offering easy and convenient insurance products as per customers requirements. Creating happiness for the customers, partners & employees across India and becoming the change leader is the driving force for us.
                                            </div>
                                        </Col>
                                    </div>
                                </Row>
                                <Row>
                                    <div className='mission-container'>
                                        <Col md='12' xs='12'>
                                            <div className='linkText'>Our <span style={{fontWeight:'600'}}>Mission</span></div>
                                            <hr style={{marginTop:'0px',backgroundColor:'#ea0b4b',height:'2px',marginBottom:'3rem'}} width='5%'/>
                                        </Col>
                                        <Col md='12' xs='12'>
                                            <div className='headingText'>To create an ecosystem which nurtures innovation, satisfaction and trust.</div>
                                        </Col>
                                        <Col md='12' xs='12'>
                                            <div className='pageText'>
                                            We aim to create the fastest e-enabled network to deliver transparent, cutting edge services to our customers. We work with innovative ideas to deliver customer convenience through advanced technology.
                                            </div>
                                        </Col>
                                    </div>
                                </Row>                                                              
                            </Col>
                        </Row>
                    </Container>
                </div>
                <OurTeam ourteam={this.props.FetchedLanguage} />
                {/* <OurInvestors OurInvestors={this.props.FetchedLanguage} /> */}
                <Quicklinks quicklinks={this.props.FetchedLanguage}/>
            </MuiThemeProvider >

        )
    }
}

const mapStateToProps = state => {
    return {
        CurrentLanguage: state.language.current_language,
        FetchedLanguage: state.language.lang_data,
    };
}


const mapDispatchToProps = dispatch => ({
    onCurrentComponent: (fileName) => dispatch({ type: 'CurrentComponent', fileName }),
    onFetchLanguage: (language) => dispatch({ type: 'FetchLanguage', language }),
    onCurrentLanguage: () => dispatch({ type: 'CurrentLanguage' }),
});
export default connect(mapStateToProps, mapDispatchToProps)(about);