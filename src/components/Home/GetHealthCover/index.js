import React, { Component } from 'react'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import ButtonLightSuccess from '../../Shared/ButtonLightSuccess/index';
import './index.css'
import InputHealthChildDialogue from '../../InputHealth/index'


const styles = theme => ({
    Mainpaper: {
        // paddingTop: theme.spacing.unit * 2,
        // paddingBottom: theme.spacing.unit * 2,
        // marginTop: theme.spacing.unit * 2,
        borderRadius: '12px',
        boxShadow: '0 2px 12px 2px rgba(51, 51, 51, 0.24)',
        maxWidth:'427px'
    },
    paper: {
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * 2,
        borderRadius: '12px',
        boxShadow: '0 2px 12px 2px rgba(51, 51, 51, 0.24)',
    },
    paper2: {
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * 2,
        borderRadius: '12px',
        boxShadow: '0 2px 12px 2px rgba(51, 51, 51, 0.24)',
    }
});

class GetHealthCover extends Component {
    state = {
        iconValue: '',
        self:false,
        diseaseValue: [
            {
                id: 0,
                value: 'DBTS',
            },
            {
                id: 1,
                value: 'TNSN',
            },
            {
                id: 2,
                value: 'LPDM',
            },
            {
                id: 3,
                value: 'ASTM',
            },
            {
                id: 4,
                value: 'NCRN',
            },
        ],
        members:false,
        smallCardContent: [
            {
                id: 'transaction',
                src: 'assets/HomePage/payment.svg',
                heading_1: 'Ease of Transaction',
                content: 'Seamless and Smooth Buying Process – Easy, Secure & Transparent',
            },
            {
                id: 'claims',
                src: 'assets/HomePage/claims.svg',
                heading_1: 'Claim Support',
                content: 'Our Claim Experts update you regularly, and intervene when necessary.',
            },
            {
                id: 'servicing',
                src: 'assets/HomePage/servicing.svg',
                heading_1: 'Continued Association',
                content: 'Through our proactive approach, we firmly hold your hand, to bring the best to you – always!',
            },
            {
                id: 'assistance',
                src: 'assets/HomePage/headphone.svg',
                heading_1: 'Dedicated Support',
                content: 'Our Intelligent Advisory Unit remains a call away – for any query or clarification',
            },
            {
                id: 'portfolio',
                src: 'assets/HomePage/portfolio.svg',
                heading_1: 'Customer Portfolio',
                content: 'Get a 360-degree view of your Policies & Claims in your E-account',
            },
            {
                id: 'own',
                src: 'assets/HomePage/own.svg',
                heading_1: 'We Own It',
                content: 'Health Insurance can be tricky, but we have made it simple for you. And we own all your concerns!',
            },
        ]
    }
    handleSelf() {
        // Create Family Details on mobile view directly handling redux values
        const vm = this;
        let familyDetails = [];
        const dss = this.state.diseaseValue;
        const self = true
        if (self) {
            // Go for self
            let age = '';
            let diseases = [];
            vm.props.inputFormDataHealth ? vm.props.inputFormDataHealth.familyDetails.map((item, index) => {
                if (item.member === 'self') {
                    age = item.age
                    diseases = item.diseases
                }
                return true
            }): ''

            if (diseases.length < 1) {
                new Array(5).fill(0, 0).map((i, index) => {

                    return diseases.push({
                        name: dss[index].value,
                        value: false
                    })
                })
            }
            familyDetails.push({
                member: 'self',
                age: age,
                diseases: diseases,
                label: 'Self',
                memberCode: 'S'
            })
        }
        let formData = this.props.inputFormDataHealth ? this.props.inputFormDataHealth : {}
        formData.familyDetails = familyDetails
        formData.formMembers = {
            self: true,
            son: false,
            daughter: false,
            spouse: false,
            mother: false,
            father: false,
            mother_in_law: false,
            father_in_law: false,
        }

        this.props.loadInputFormHealth(formData)

        // Here change step to next
        // if (this.checkValidityMob(this.state.step_mob)) { this.setState({ step_mob: 2, tabContent: { padding: '0px 90px' } }) }
    }
scrollToTop = () => {
    window.scrollTo(0, 0)
}

    render() {
        const { classes } = this.props;
        return (
            <div className='get-health-cover'>
                {/* desktop view */}
                <Col md={12} className='health-cover-row mui--hidden-xs mui--hidden-sm'>
                    <div className='get-health-cover-image' >
                        {/* <img className='get-cover' alt='get-health-cover' src='/assets/HomePage/home.jpg' /> */}
                    
                    <div className='right-card'>
                        <Row>
                            <Col md={7} ></Col>
                            <Col md={5} >
                                <div className='gbui-h6 main-heading'>
                                   Buy Health Insurance suited to your needs <br></br> Connect to Happiness
                                </div>
                                <Col lg={12} md={10} className='paper-margin'>
                                <Paper square={false} className= {`${classes.Mainpaper} paper`} elevation={1}>
                                    <div className='heading-card-1 gbui-h5'>Tell us about you</div>
                                    <div className='heading-card-2 gbui-menu-bar-1'>You are?</div>
                                    <Row>
                                        <Col md={6}>
                                            {this.state.iconValue === 'M' ?
                                                <div className='man' style={{cursor:'pointer'}}>
                                                    <div  onClick={() => this.setState({iconValue:'M'})}><img alt='male' className='male-1' className='male' src='/assets/HomePage/male_filled.svg' /></div>
                                                </div> :
                                                <div className='man' style={{cursor:'pointer'}} >
                                                    <div  onClick={() => this.setState({iconValue:'M'})}><img alt='male' className='male-1' src='/assets/HomePage/male_outline.svg' /></div>
                                                </div>
                                            }
                                        </Col>
                                        <Col md={6} style={{textAlign: 'left'}}>
                                            {this.state.iconValue === 'F' ?
                                                <div className='women'style={{cursor:'pointer'}}>
                                                    <div onClick={() => this.setState({iconValue:'F'})}><img alt='female' className='women-1' src='/assets/HomePage/female_filled.svg' /></div>
                                                </div> :
                                                <div className='women' style={{cursor:'pointer'}}>
                                                    <div  onClick={() => this.setState({iconValue:'F'})}><img alt='female' className='women-1'  src='/assets/HomePage/female_outline.svg' /></div>
                                                </div>
                                            }
                                        </Col>
                                    </Row>
                                    <div className='heading-card-end gbui-menu-bar-1'>For whom you want to take insurance</div>
                                    <Row>
                                        <Col md={6}>
                                            <div className='card-btn-1'>
                                              <ButtonLightSuccess disabled={!this.state.iconValue} midPinkContent={true}  Text={process.env.REACT_APP_PROFILE === 'POS' ? 'Proposer' : 'Self'} onClick={() => this.setState({self:true})} />
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className='card-btn-2'>
                                                 <ButtonLightSuccess disabled={!this.state.iconValue} midPinkContent={true} Text='Add Members' 
                                                     onClick={() => this.setState({members:true})}/>
                                            </div>
                                        </Col>
                                        {/*this.state.self*/ true &&
                                        <InputHealthChildDialogue inputFormOpen={(value) => this.setState({self:value})} open={this.state.self}
                                            gender={this.state.iconValue}   member={true} history={this.props.history}  step={2}/>
                                        }
                                         {/*this.state.members*/ true &&
                                        <InputHealthChildDialogue inputFormOpen={(value) => this.setState({members:value})} open={this.state.members}
                                           gender={this.state.iconValue} history={this.props.history}   />
                                        }
                                    </Row>
                                </Paper>
                                </Col>
                            </Col>
                        </Row>
                    </div>
                    </div>
                </Col>
                <div className='second-card-container mui--hidden-xs mui--hidden-sm'>
                    <Col lg={12} md={12}>
                        <div className='gbui-h4 sub-heading'>What’s special about GroupBima?</div>
                    </Col>
                    {this.state.smallCardContent.map(item => 
                            <Col lg={4} md={6} className='card-column-image'>
                                <div className='small-card'>
                                    <Paper square={false} className={classes.paper} elevation={1}>
                                        <div className='transaction-image'>
                                            <img className='transaction' src={item.src} />
                                        </div>
                                        <div className='heding-text gbui-h5'>{item.heading_1}</div>
                                        <div className='content-text gbui-button-1'>{item.content}</div>
                                    </Paper>
                                </div>
                            </Col>
                        )
                    }
                    <Col md={12}>
                        <div className='center-content gbui-subtitle-1'>
                            “A dedicated approach to serve you with the best insurance products and services like a
                                Friend, Mentor, and Guide throughout our association”
                           </div>
                    </Col>
                    <Col md={12}  style={{textAlign:'center'}}>
                        <Link to="/find-out-more" >
                            <div className='find-out-more-btn'>
                                <ButtonLightSuccess fullPinkContent={true} Text='Find Out More' />
                            </div>
                        </Link>
                    </Col>
                    <Col md={12}>
                        <div className='what-are-you-looking gbui-h4'>
                            What are you looking to do today?
                           </div>
                    </Col>
                    <Col md={5} >
                        <div className='research'>
                            <img alt='research' className='research' src='/assets/HomePage/plan.svg' />
                        </div>
                        <div className='main-heading gbui-h5'>Research Insurance</div>
                        <Link to='/alternate-buyer-health'><div className='research-btn'>
                            <ButtonLightSuccess fullPinkContent={true} Text='Research Now' />
                        </div></Link>
                    </Col>
                    <Col md={2}>
                        <div className='divider' style={{textAlign: '-webkit-center'}}>
                           <img alt='divider' src='/assets/HomePage/divider.svg' />
                        </div>
                    </Col>
                    <Col md={5}>
                        <div className='plan'>
                            <img alt='plan' className='plan' src='/assets/HomePage/buy.svg' />
                        </div>
                        <div className='main-heading-2 gbui-h5'>Buy a plan</div>
                        <Link to='/' onClick={this.scrollToTop}><div className='buy-btn'>
                            <ButtonLightSuccess fullPinkContent={true} Text='Buy Now' />
                        </div></Link>
                    </Col>
                    {/* <Col md={12}>
                        <div className='what-our-customers-say gbui-h4'>
                            What our customers say?
                           </div>
                    </Col>
                    <Col md={2} className='quote-column'>
                        <img alt='quote' className='quote' src='/assets/leftQuote.svg' />
                    </Col>
                    <Col md={8}>
                        <div className='quoteParagraph gbui-h6'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                           </div>
                        <div className='writer gbui-menu-bar-1'>JOHN DOE</div>
                    </Col>
                    <Col md={2} className='quote-column'>
                        <img alt='quote' className='quote2' src='/assets/rightQuote.svg' />
                    </Col>
                    <Col md={12}>
                        <div className='dots'>
                            <div class="loading-dots">
                                <div class="loading-dots--dot"></div>
                                <div class="loading-dots--dot"></div>
                                <div class="loading-dots--dot"></div>
                                <div class="loading-dots--dot"></div>
                            </div>
                        </div>
                    </Col> */}
                    <Col md={12}>
                        <div className='what-our-customers-say gbui-h4'>
                            Who are our partners?
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className='insurer-block'>
                            <Col lg={3} md={3}>
                                <Link to="/alternate-buyer-health-insurer-religare" >
                                    <div className='insurer-image'>
                                        <img className='insurer' alt='insurer' src='/assets/insurerLogo/insurerReligare.png' />
                                    </div>
                                </Link>
                            </Col>
                            <Col lg={3} md={3}>
                                <Link to="/alternate-buyer-health-insurer-fg" >
                                    <div className='insurer-image'>
                                        <img className='insurer' alt='insurer' src='/assets/insurerLogo/insurerFg.png' />
                                    </div>
                                </Link>
                            </Col>
                            <Col lg={3} md={3}>
                                <Link to="/alternate-buyer-health-insurer-sbi" >
                                    <div className='insurer-image'>
                                        <img className='insurer' alt='insurer' src='/assets/insurerLogo/insurerSbi.svg' />
                                    </div>
                                </Link>
                            </Col>
                            <Col lg={3} md={3}>
                                <Link to="/alternate-buyer-health-insurer-hdfc" >
                                    <div className='insurer-image'>
                                        <img className='insurer' alt='insurer' src='/assets/insurerLogo/insurerHDFC.svg' />
                                    </div>
                                </Link>
                            </Col>
                        </div>
                    </Col>
                    <Col md={12}>
                        <div style={{textAlign:'center'}}>
                            <Link to="/alternate-buyer-health-insurer-abhi" >
                                <div className='insurer-image'>
                                    <img className='insurer' alt='insurer' src='/assets/insurerLogo/abhi1x.png' />
                                </div>
                            </Link>
                        </div>
                    </Col>
                </div>


                {/* mobile view */}
                <div className='mobile-view mui--visible-xs-block mui--visible-sm-block'>
                        {this.state.selfMobile &&
                            <InputHealthChildDialogue gender={this.state.iconValue} inputFormOpenMobile={(value) => this.setState({selfMobile:value})}
                                 history={this.props.history}  step={2}/>
                        }
                        {this.state.membersMobile &&
                           <InputHealthChildDialogue gender={this.state.iconValue} inputFormOpenMobile={(value) => this.setState({membersMobile:value})}
                         history={this.props.history}   />
                        }
                    <Col xs={12} className='health-cover-row'>
                        <div className='gbui-h7 main-heading'>
                        Buy Health Insurance suited to your needs Connect to Happiness
                        </div>
                    </Col>
                    <Col xs={12} className='health-cover-row'>
                        <div className='heading-card-1 gbui-h5'>Tell us about you</div>
                    </Col>
                    <Col xs={12}>
                        <div className='heading-card-2 gbui-menu-bar-1'>You are?</div>
                    </Col>
                    <Col xs={6}>
                    {this.state.iconValue === 'M' ?
                        <div className='man'>
                            <div  onClick={() => this.setState({iconValue:'M'})}>
                               <img alt='male' className='man-2' style={{width:'50%',height:'auto'}} src='/assets/HomePage/male_filled.svg' />
                            </div>
                        </div> :
                        <div className='man' >
                            <div onClick={() => this.setState({iconValue:'M'})}>
                               <img alt='male' className='man-2' style={{width:'50%',height:'auto'}} src='/assets/HomePage/male_outline.svg' />
                            </div>
                        </div>
                    }
                    </Col>
                    <Col xs={6}>
                    {this.state.iconValue === 'F' ?
                        <div className='women'>
                            <div onClick={() => this.setState({iconValue:'F'})}>
                                <img alt='female' className='women-2' style={{width:'50%',height:'auto'}} src='/assets/HomePage/female_filled.svg' />
                            </div>
                        </div> :
                        <div className='female-image'>
                            <div  onClick={() => this.setState({iconValue:'F'})}>
                              <img alt='female' className='women-2' style={{width:'50%',height:'auto'}} src='/assets/HomePage/female_outline.svg' />
                            </div>
                        </div>
                    }
                    </Col>
                    <Col xs={12}>
                        <div className='for-whom-you-want gbui-menu-bar-2'>For whom you want to take insurance</div>
                    </Col>
                    <Col xs={6}>
                        <div className='card-btn-1'>
                            <ButtonLightSuccess disabled={!this.state.iconValue} midPinkContent={true} 
                                  onClick={() => {this.setState({selfMobile:true});this.handleSelf();}} Text='SELF' />
                        </div>
                    </Col>
                    <Col xs={6}>
                        <div className='card-btn-2'>
                              <ButtonLightSuccess disabled={!this.state.iconValue} 
                                  onClick={() => {this.setState({membersMobile:true});}} midPinkContent={true} Text='ADD MEMBER' />
                        </div>
                    </Col>
                    <Col xs={12}>
                        <div className='gbui-h6 sub-heading'>What’s special about GroupBima?</div>
                    </Col>
                    {this.state.smallCardContent.map(item => {
                        return (
                            <Col xs={12} className='mui--visible-xs-block' style={{paddingLeft:'10px',paddingRight:'10px'}}>
                                <div className='small-card'>
                                    <Paper square={false} className={classes.paper2} elevation={1}>
                                        <div className='transaction-image'>
                                            <img className='transaction' src={item.src} />
                                        </div>
                                        <div className='heding-text gbui-h5'>{item.heading_1}</div>
                                        <div className='content-text gbui-button-1'>{item.content}</div>
                                    </Paper>
                                </div>
                            </Col>
                        )
                    })}
                    <Col xs={12}>
                        <div className='center-content gbui-caption-1'>
                            “A dedicated approach to serve you with the best insurance products and services like a
                              Friend, Mentor, and Guide throughout our association”
                        </div>
                    </Col>
                    <Col md={12}>
                        <Link to="/find-out-more" >
                            <div className='find-out-more-btn'>
                                <ButtonLightSuccess fullPinkContent={true} Text='Find Out More' />
                            </div>
                        </Link>
                    </Col>
                    <Col md={12}>
                        <div className='what-are-you-looking gbui-h6'>
                            What are you looking to do today?
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className='research'>
                            <img alt='research' className='research' src='/assets/HomePage/researchMobile.svg' />
                        </div>
                        <div className='gbui-subtitle-2 researh-insurance-heading'>Research Insurance</div>
                        <Link to='/alternate-buyer-health'>
                            <div className='research-btn'>
                                <ButtonLightSuccess fullPinkContent={true} Text='Research Now' />
                            </div>
                        </Link>
                    </Col>
                    <Col xs={12}>
                        <div className='divider-homepage-mobile' style={{textAlign:'center'}}>
                           <img alt='divider' className='divider-mobile' src='/assets/HomePage/mobileDivider.svg' />
                        </div>
                    </Col>
                    <Col xs={12}>
                        <div className='buy'>
                            <img alt='research' className='buy-mobile' src='/assets/HomePage/buyMobile.svg' />
                        </div>
                        <div className='buy-insurance-heading gbui-subtitle-2'>Buy a plan</div>
                        <Link to='/input-form-health'>   
                            <div className='research-btn'>
                                <ButtonLightSuccess fullPinkContent={true} Text='Buy Now' />
                            </div>
                        </Link>
                    </Col>
                    {/* <Col xs={12}>
                        <div className='what-are-you-looking gbui-h6'>
                            What our customers say?
                        </div>
                    </Col>
                    <Col xs={2} className='quote-column'>
                        <img alt='quote' className='quote' src='/assets/leftQuote.svg' />
                    </Col>
                    <Col xs={8}>
                        <div className='quoteParagraph gbui-menu-bar-1'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                           </div>
                        <div className='writer gbui-menu-bar-1'>JOHN DOE</div>
                    </Col>
                    <Col xs={2} className='quote-column'>
                        <img alt='quote' className='quote2' src='/assets/rightQuote.svg' />
                    </Col>
                    <Col xs={12}>
                        <div className='dots'>
                            <div class="loading-dots">
                                <div class="loading-dots--dot"></div>
                                <div class="loading-dots--dot"></div>
                                <div class="loading-dots--dot"></div>
                                <div class="loading-dots--dot"></div>
                            </div>
                        </div>
                    </Col> */}
                    <Col xs={12}>
                        <div className='what-are-you-looking gbui-h6'>
                          Our partners
                        </div>
                    </Col>
                    <Col xs={12}>
                        <div className='insurer-block'>
                            <Col xs={6} className='insurer-column'>
                                <Link to="/alternate-buyer-health-insurer-religare" >
                                    <div className='insurer-image'>
                                    <img className='insurer' alt='insurer' src='/assets/insurerLogo/religareAgain.png' />
                                    </div>
                                </Link>
                            </Col>
                            <Col xs={6} className='insurer-column'>
                                <Link to="/alternate-buyer-health-insurer-fg" >
                                    <div className='insurer-image'>
                                    <img className='insurer' alt='insurer' src='/assets/insurerLogo/fgAgain.png' />
                                    </div>
                                </Link>
                            </Col>
                            <Col xs={6} className='insurer-column'>
                                <Link to="/alternate-buyer-health-insurer-sbi" >
                                    <div className='insurer-image'>
                                    <img className='insurer' alt='insurer' src='/assets/insurerLogo/sbi.png' />
                                    </div>
                                </Link>
                            </Col>
                            <Col xs={6} className='insurer-column'>
                                <Link to="/alternate-buyer-health-insurer-hdfc" >
                                    <div className='insurer-image'>
                                    <img className='insurer' alt='insurer' src='/assets/insurerLogo/HDFC.png' />
                                    </div>
                                </Link>
                            </Col>
                            <Col xs={6} className='insurer-column'>
                                <Link to="/alternate-buyer-health-insurer-hdfc" >
                                    <div className='insurer-image'>
                                    <img className='insurer' alt='insurer' src='/assets/insurerLogo/abhiNewMobile.png' />
                                    </div>
                                </Link>
                            </Col>
                        </div>
                    </Col>
                    {/* <Col xs={12}>
                        <div style={{textAlign:'center'}}>
                            <Link to="/alternate-buyer-health-insurer-abhi" >
                                <div className='insurer-image'>
                                <img className='insurer' alt='insurer' src='/assets/insurerLogo/ABHI.png' />
                                </div>
                            </Link>
                        </div>
                    </Col> */}
                </div>
            </div>
        )
    }
}

GetHealthCover.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
    loadInputFormHealth: (data) => dispatch({ type: 'INPUT_FORM_HEALTH', data })
})

const mapStateToProps = state => ({
    inputFormDataHealth: state.inputFormHealth.inputFormHealthData
})

export default ((connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GetHealthCover))))


