import React from 'react'
import Container from 'muicss/lib/react/container'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Link } from 'react-router-dom';
import ButtonLightSuccess from '../Shared/ButtonLightSuccess/index';
import './BecomePOS.css';
import axios from 'axios';
import { connect } from 'react-redux';




const styles = theme => ({
    withoutLabel: {
        marginTop: theme.spacing.unit * 3,
    },
    textFieldLabel: {
        fontFamily: 'Source Sans Pro',
        fontSize:'16px',
        color:'#aaaaaa'
    },
});

class BecomePOS extends React.Component {
    componentWillMount() {
        const vm = this;
        this.props.onCurrentComponent('BecomePos.json');
        axios.get('/assets/json/BecomePos.json')
            .then((response) => {
                vm.props.onFetchLanguage(response.data[this.props.CurrentLanguage]);
            }, (error) => {
              
            })
    }
    constructor(props) {
        super(props);
        this.slideIndex = 1;
        this.slideIndex_i = 1;
        this.showSlides = this.showSlides.bind(this);
        this.showSlides_i = this.showSlides_i.bind(this);
    }

    state = {
        password: '',
        slideIndex: 1,
        slideIndex_i: 1,
    }


    currentSlide(n) {
        this.slideIndex = n;
       
        this.showSlides(n);
    }
    showSlides(n) {
       
        try {
            let i;
            let slides = document.getElementsByClassName('mySlides');
            let dots = document.getElementsByClassName('dot');
            if (n > slides.length) {
                this.slideIndex = 1;
            }
            if (n < 1) {
                this.slideIndex = slides.length;
            }
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = 'none';
            }

            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(' active', '');
            }
            slides[this.slideIndex - 1].style.display = 'block';
           
            dots[this.slideIndex - 1].className += ' active';
            if (this.slideIndex <= 3) {
                this.slideIndex++;
            } else {
                this.slideIndex = 1;
            }
            setTimeout(() => {
                this.showSlides(n);
            }, 2500);
        } catch (error) {
           
        }
    }
    currentSlide_i(n) {
        this.slideIndex_i = n;
       
        this.showSlides_i(n);
    }
    showSlides_i(n) {
      
        try {
            let i;
            let slides = document.getElementsByClassName('mySlides_i');
            let dots = document.getElementsByClassName('dot_i');
            if (n > slides.length) {
                this.slideIndex_i = 1;
            }
            if (n < 1) {
                this.slideIndex_i = slides.length;
            }
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = 'none';
            }

            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(' active', '');
            }
            slides[this.slideIndex_i - 1].style.display = 'block';
           
            dots[this.slideIndex_i - 1].className += ' active';
            if (this.slideIndex_i <= 3) {
                this.slideIndex_i++;
            } else {
                this.slideIndex_i = 1;
            }
            setTimeout(() => {
                this.showSlides_i(n);
            }, 2500);
        } catch (error) {
           
        }
    }
    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };
    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };
    componentDidMount() {
        this.showSlides(this.slideIndex);
        this.showSlides_i(this.slideIndex_i);
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <div className="bp_container_div">
                    <Container className="bp_container">
                        <div className="become_pos_heading">
                            {this.props.FetchedLanguage ? this.props.FetchedLanguage.BecomePosBecomeAPosHeading1 : ''}
                        </div>
                        <div className="sp_heading">
                            {this.props.FetchedLanguage ? this.props.FetchedLanguage.BecomePosSignupForPosSubHeading1 : ''}
                        </div>
                        <div
                            style={{ color: '#808080', fontSize: '16px', textAlign: 'center', fontFamily: 'Source Sans Pro', marginTop: '0.3rem' }}>
                            {this.props.FetchedLanguage ? this.props.FetchedLanguage.BecomePosContentUnderHeading : ''}
                        </div>
                        <Row className="form_row">
                            <Col className="mui--hidden-sm mui--hidden-xs mui--text-center" md="7" lg="6" sm="12">
                                <img src="assets/bocome-pos.svg"  alt="Become a POS" />
                            </Col>
                            <Col sm="12" md="5" lg="6" style={{textAlign:'center'}}>
                                <TextField 
                                    classes={{root:'textfield',label:classes.textFieldLabel}}
                                    label={this.props.FetchedLanguage ? this.props.FetchedLanguage.BecomePosInputLabelYourName : ''}  
                                    margin="dense" 
                                />

                                <TextField 
                                   className ='textfield'
                                   label={this.props.FetchedLanguage ? this.props.FetchedLanguage.BecomePosInputLabelEmail : ''}  
                                   margin="dense" 
                                />

                                <TextField 
                                    className ='textfield'
                                    label={this.props.FetchedLanguage ? this.props.FetchedLanguage.BecomePosInputLabelPhoneNumber : ''}  
                                    margin="dense" 
                                />
                                <FormControl className ='textfield' margin="dense" >
                                    <InputLabel htmlFor="adornment-password">
                                         {this.props.FetchedLanguage ? this.props.FetchedLanguage.BecomePosInputLabelPassword : ''}
                                    </InputLabel>
                                    <Input
                                        id="adornment-password"
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        value={this.state.password}
                                        onChange={this.handleChange('password')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="Toggle password visibility"
                                                    onClick={this.handleClickShowPassword}
                                                >
                                                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        fullWidth={true}
                                        margin="dense"
                                    />
                                </FormControl>
                                <TextField 
                                    className ='textfield'
                                    label={this.props.FetchedLanguage ? this.props.FetchedLanguage.BecomePosInputLabelRefrel : ''} 
                                    margin="dense" 
                                />
                                <div style={{ color: '#808080', fontSize: '14px' }} className="agree_text">
                                    {this.props.FetchedLanguage ? this.props.FetchedLanguage.BecomePosByLoggingInText : ''} &nbsp; 
                                    <span style={{ color: '#ea0b4b' }}>{this.props.FetchedLanguage ? this.props.FetchedLanguage.BecomePosTnCAndPrivacyPolicyText1 : ''} &amp;
                                    {this.props.FetchedLanguage ? this.props.FetchedLanguage.BecomePosTnCAndPrivacyPolicyText2 : ''}<span style={{ color: '#333333' }}> &amp;</span> 
                                        {this.props.FetchedLanguage ? this.props.FetchedLanguage.BecomePosTnCAndPrivacyPolicyText3 : ''}</span>
                                </div>
                                <div style={{ color: '#9c0f46',}} className="age-condition">* To become POS your age should be 25 yrs and must be 12th pass</div>
                                <div className='submit-button'>
                                    <Link to='/pos-lms'><ButtonLightSuccess Text={this.props.FetchedLanguage ? this.props.FetchedLanguage.BecomePosSubmitButtonText : ''} 
                                      midWarningPink={true} /></Link>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="lhw_div">
                    <div className="lwh_text">{this.props.FetchedLanguage ? this.props.FetchedLanguage.BecomePosLearnHowItWorksHeading1 : ''}</div>
                    <Container>
                        <Row>
                            <Col sm="12" md="3">
                                <div className="lhiw_text">{this.props.FetchedLanguage ? this.props.FetchedLanguage.BecomePosLearnHowItWorksSubHeading1 : ''}<div style={{ borderTop: '1px solid #aaaaaa', width: '102px' }}></div></div>
                                <div className="liwh_para">
                                    <p style={{ marginTop: '16px' }}>
                                        {this.props.FetchedLanguage ? this.props.FetchedLanguage.BecomePosLearnHowItWorksParagraphText1 : ''}
                                    </p><br />
                                </div>
                            </Col>
                            <Col sm="12" md="6">
                                <div className="video_pos"></div>
                            </Col>
                            <Col sm="12" md="3">
                                <div className="lhiw_text">{this.props.FetchedLanguage ? this.props.FetchedLanguage.BecomePosHowToGetStartedSubHeading2 : ''}<div style={{ borderTop: '1px solid #aaaaaa', width: '102px' }}></div></div><br />
                                <div className="liwh_para">
                                    <p>{this.props.FetchedLanguage ? this.props.FetchedLanguage.BecomePosHowToGetStartedParagraphText2 : ''}</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="benifits_div">
                    <Container>
                        <div className="lwh_text">{this.props.FetchedLanguage ? this.props.FetchedLanguage.BecomePosBenifitsHeading1 : ''}</div>
                        <Row style={{ marginTop: '2rem' }}>
                            <Col sm="6" xs="6" md="3" className="text-center">
                                <div style={{ textAlign: 'center' }}>
                                    <p style={{ width: '110px', height: '110px', background: '#d8d8d8', margin: 'auto' }}></p><br />
                                    <div className="benifit_sub_heading">{this.props.FetchedLanguage ? this.props.FetchedLanguage.BecomePosBenifitsSubHeading1 : ''}</div>
                                    <div className="benifit_text">
                                        {this.props.FetchedLanguage ? this.props.FetchedLanguage.BecomePosBenifitsParagraph1 : ''}
                                    </div>
                                </div>
                            </Col>
                            <Col sm="6" xs="6" md="3">
                                <div style={{ textAlign: 'center' }}>
                                    <p style={{ width: '110px', height: '110px', background: '#d8d8d8', margin: 'auto' }}></p><br />
                                    <div className="benifit_sub_heading">{this.props.FetchedLanguage ? this.props.FetchedLanguage.BecomePosBenifitsSubHeading2 : ''}</div>
                                    <div className="benifit_text">
                                        {this.props.FetchedLanguage ? this.props.FetchedLanguage.BecomePosBenifitsParagraph2 : ''}
                                    </div>
                                </div>
                            </Col>
                            <Col sm="6" xs="6" md="3">
                                <div style={{ textAlign: 'center' }}>
                                    <p style={{ width: '110px', height: '110px', background: '#d8d8d8', margin: 'auto' }}></p><br />
                                    <div className="benifit_sub_heading">{this.props.FetchedLanguage ? this.props.FetchedLanguage.BecomePosBenifitsSubHeading3 : ''}</div>
                                    <div className="benifit_text">
                                        {this.props.FetchedLanguage ? this.props.FetchedLanguage.BecomePosBenifitsParagraph3 : ''}
                                    </div>
                                </div>
                            </Col>
                            <Col sm="6" xs="6" md="3">
                                <div style={{ textAlign: 'center' }}>
                                    <p style={{ width: '110px', height: '110px', background: '#d8d8d8', margin: 'auto' }}></p><br />
                                    <div className="benifit_sub_heading">{this.props.FetchedLanguage ? this.props.FetchedLanguage.BecomePosBenifitsSubHeading4 : ''}</div>
                                    <div className="benifit_text">
                                        {this.props.FetchedLanguage ? this.props.FetchedLanguage.BecomePosBenifitsParagraph4 : ''}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="testimonial_div" style={{ background: '#f4f4f4' }}>
                    <div className="testmonial_head">{this.props.FetchedLanguage ? this.props.FetchedLanguage.BecomePosTestimonialsHeading : ''}</div>
                    <div className="slideshow-container">

                        <div className="mySlides">
                            <div className="fade">
                                <Container>
                                    <Row>
                                        <div className="testi_up"></div>
                                        <Col xs="12" sm="12" md="3" className="text-center">
                                            <div className="circle_test"></div>
                                        </Col>
                                        <Col xs="12" sm="12" md="9" className="text-center">
                                            <div className="test_text">
                                                {this.props.FetchedLanguage ? this.props.FetchedLanguage.BecomePosTestimonialsParagraph1 : ''}
                                                <br />
                                                <div className="testi_back"></div>
                                                <div className="test_text" style={{ float: 'right' }}>John Doe</div>
                                            </div><br />

                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </div>

                        <div className="mySlides">
                            <div className="fade">
                                <Container>
                                    <Row>
                                        <div className="testi_up"></div>
                                        <Col xs="12" sm="12" md="3" className="text-center">
                                            <div className="circle_test"></div>
                                        </Col>
                                        <Col xs="12" sm="12" md="9" className="text-center">
                                            <div className="test_text">
                                                {this.props.FetchedLanguage ? this.props.FetchedLanguage.BecomePosTestimonialsParagraph2 : ''}
                                                <br />
                                                <div className="testi_back"></div>
                                                <div className="test_text" style={{ float: 'right' }}>John Doe</div>
                                            </div><br />

                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </div>

                        <div className="mySlides">
                            <div className="fade">
                                <Container>
                                    <Row>
                                        <div className="testi_up"></div>
                                        <Col xs="12" sm="12" md="3" className="text-center">
                                            <div className="circle_test"></div>
                                        </Col>
                                        <Col xs="12" sm="12" md="9" className="text-center">
                                            <div className="test_text">
                                                {this.props.FetchedLanguage ? this.props.FetchedLanguage.BecomePosTestimonialsParagraph3 : ''}
                                                <br />
                                                <div className="testi_back"></div>
                                                <div className="test_text" style={{ float: 'right' }}>John Doe</div>
                                            </div><br />
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </div>
                        <div className="mySlides">
                            <div className="fade">
                                <Container>
                                    <Row>
                                        <div className="testi_up"></div>
                                        <Col xs="12" sm="12" md="3" className="text-center">
                                            <div className="circle_test"></div>
                                        </Col>
                                        <Col xs="12" sm="12" md="9" className="text-center">
                                            <div className="test_text">
                                                {this.props.FetchedLanguage ? this.props.FetchedLanguage.BecomePosTestimonialsParagraph4 : ''}
                                                <br />
                                                <div className="testi_back"></div>
                                                <div className="test_text" style={{ float: 'right' }}>John Doe</div>
                                            </div><br />

                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </div>

                    </div>
                    <br />

                    <div style={{ "textAlign": "center" }}>
                        <span className="dot" onClick={this.currentSlide.bind(this, 1)}></span>
                        <span className="dot" onClick={this.currentSlide.bind(this, 2)}></span>
                        <span className="dot" onClick={this.currentSlide.bind(this, 3)}></span>
                        <span className="dot" onClick={this.currentSlide.bind(this, 4)}></span>
                    </div>
                    <br /><br />
                </div>
                <div className="top_insurers_div">
                    <div className="testmonial_head">{this.props.FetchedLanguage ? this.props.FetchedLanguage.BecomePosTopInsurersHeading : ''}</div>
                    <div className="slideshow-container_i">
                        <div className="mySlides_i">
                            <div className="fade">
                                <Container className='mui--visible-xs-block mui--visible-sm-block'>
                                    <Row>
                                        <Col xs={12} className="text-center">
                                            <Col xs="4">
                                                <img className='insurer' alt='insurer' src='/assets/insurerLogo/religareAgain.png' />
                                            </Col>
                                            <Col xs="4">
                                                <img className='insurer' alt='insurer' src='/assets/insurerLogo/fgAgain.png' />
                                            </Col>
                                            <Col xs="4">
                                                <img className='insurer' alt='insurer' src='/assets/insurerLogo/sbi.png' />
                                            </Col>
                                        </Col>
                                    </Row>
                                </Container>
                                <Container className='mui--hidden-xs mui--hidden-sm'>
                                    <Row>
                                        <Col lg={12} className="text-center">
                                            <Col lg="4" >
                                                <img className='insurer' alt='insurer' src='/assets/insurerLogo/insurerReligare.png' />
                                            </Col>
                                            <Col lg="4" >
                                                <img className='insurer' alt='insurer' src='/assets/insurerLogo/insurerFg.png' />
                                            </Col>
                                            <Col lg="4" >
                                                <img  alt='insurer' src='/assets/insurerLogo/insurerSbi.svg' />
                                            </Col>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </div>
                        <div className="mySlides_i">
                            <div className="fade">
                                <Container className='mui--visible-xs-block mui--visible-sm-block'>
                                    <Row>
                                        <Col xs={12} className="text-center ">
                                            <Col xs="4">
                                                <img className='insurer' alt='insurer' src='/assets/insurerLogo/sbi.png' />
                                            </Col>
                                            <Col xs="4">
                                                <img className='insurer' alt='insurer' src='/assets/insurerLogo/fgAgain.png' />
                                            </Col>
                                            <Col xs="4">
                                                <img className='insurer' alt='insurer' src='/assets/insurerLogo/HDFC.png' />
                                            </Col>
                                        </Col>
                                    </Row>
                                </Container>
                                <Container className='mui--hidden-xs mui--hidden-sm'>
                                    <Row>
                                        <Col lg={12} className="text-center ">
                                            <Col lg="4">
                                                <img className='insurer' alt='insurer' src='/assets/insurerLogo/insurerSbi.svg' />
                                            </Col>
                                            <Col lg="4">
                                                <img className='insurer' alt='insurer' src='/assets/insurerLogo/insurerFg.png' />
                                            </Col>
                                            <Col lg="4">
                                                <img  alt='insurer' src='/assets/insurerLogo/insurerHDFC.svg' />
                                            </Col>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </div>
                        <div className="mySlides_i">
                            <div className="fade">
                                <Container className='mui--visible-xs-block mui--visible-sm-block'>
                                    <Row>
                                        <Col xs={12} className="text-center ">
                                            <Col xs="4">
                                                <img className='insurer' alt='insurer' src='/assets/insurerLogo/fgAgain.png' />
                                            </Col>
                                            <Col xs="4">
                                                <img className='insurer' alt='insurer' src='/assets/insurerLogo/HDFC.png' />
                                            </Col>
                                            <Col xs="4">
                                                <img className='insurer' alt='insurer' src='/assets/insurerLogo/abhiNewMobile.png' />
                                            </Col>
                                        </Col>
                                    </Row>
                                </Container>
                                <Container className='mui--hidden-xs  mui--hidden-sm'>
                                    <Row>
                                        <Col lg={12} className="text-center ">
                                            <Col lg="4">
                                                <img className='insurer' alt='insurer' src='/assets/insurerLogo/insurerFg.png' />
                                            </Col>
                                            <Col lg="4">
                                                <img  alt='insurer' src='/assets/insurerLogo/insurerHDFC.svg' />
                                            </Col>
                                            <Col lg="4">
                                                <img className='insurer' alt='insurer' src='/assets/insurerLogo/abhi1x.png' />
                                            </Col>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </div>
                    </div>
                    <div className="slideshow-container_i">
                        <div className="mySlides_i">
                            <div className="fade">
                                <Container className='mui--visible-xs-block mui--visible-sm-block'>
                                    <Row>
                                        <Col xs={12} className="text-center">
                                            <Col xs="4">
                                                <img className='insurer' alt='insurer' src='/assets/insurerLogo/religareAgain.png' />
                                            </Col>
                                            <Col xs="4">
                                                <img className='insurer' alt='insurer' src='/assets/insurerLogo/fgAgain.png' />
                                            </Col>
                                            <Col xs="4">
                                                <img className='insurer' alt='insurer' src='/assets/insurerLogo/sbi.png' />
                                            </Col>
                                        </Col>
                                    </Row>
                                </Container>
                                <Container className='mui--hidden-xs  mui--hidden-sm'>
                                    <Row>
                                        <Col lg={12} className="text-center">
                                            <Col lg="4" >
                                                <img className='insurer' alt='insurer' src='/assets/insurerLogo/insurerReligare.png' />
                                            </Col>
                                            <Col lg="4" >
                                                <img className='insurer' alt='insurer' src='/assets/insurerLogo/insurerFg.png' />
                                            </Col>
                                            <Col lg="4" >
                                                <img  alt='insurer' src='/assets/insurerLogo/insurerSbi.svg' />
                                            </Col>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </div>
                    </div>
                    <div className="slideshow-container_i">
                        <div className="mySlides_i">
                            <div className="fade">
                                <Container>
                                    <Row>
                                        <Col xs="3" sm="3" md="3" className="text-center">
                                            <div className="circle_test"></div>
                                        </Col>
                                        <Col xs="3" sm="3" md="3" className="text-center">
                                            <div className="circle_test"></div>
                                        </Col>
                                        <Col xs="3" sm="3" md="3" className="text-center">
                                            <div className="circle_test"></div>
                                        </Col>
                                        <Col xs="3" sm="3" md="3" className="text-center">
                                            <div className="circle_test"></div>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </div>

                        <div className="mySlides_i">
                            <div className="fade">
                                <Container>
                                    <Row>
                                        <Col xs="3" sm="3" md="3" className="text-center">
                                            <div className="circle_test"></div>
                                        </Col>
                                        <Col xs="3" sm="3" md="3" className="text-center">
                                            <div className="circle_test"></div>
                                        </Col>
                                        <Col xs="3" sm="3" md="3" className="text-center">
                                            <div className="circle_test"></div>
                                        </Col>
                                        <Col xs="3" sm="3" md="3" className="text-center">
                                            <div className="circle_test"></div>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </div>

                        <div className="mySlides_i">
                            <div className="fade">
                                <Container>
                                    <Row>
                                        <Col xs="3" sm="3" md="3" className="text-center">
                                            <div className="circle_test"></div>
                                        </Col>
                                        <Col xs="3" sm="3" md="3" className="text-center">
                                            <div className="circle_test"></div>
                                        </Col>
                                        <Col xs="3" sm="3" md="3" className="text-center">
                                            <div className="circle_test"></div>
                                        </Col>
                                        <Col xs="3" sm="3" md="3" className="text-center">
                                            <div className="circle_test"></div>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </div>
                        <div className="mySlides_i">
                            <div className="fade">
                                <Container>
                                    <Row>
                                        <Col xs="3" sm="3" md="3" className="text-center">
                                            <div className="circle_test"></div>
                                        </Col>
                                        <Col xs="3" sm="3" md="3" className="text-center">
                                            <div className="circle_test"></div>
                                        </Col>
                                        <Col xs="3" sm="3" md="3" className="text-center">
                                            <div className="circle_test"></div>
                                        </Col>
                                        <Col xs="3" sm="3" md="3" className="text-center">
                                            <div className="circle_test"></div>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </div>

                    </div>
                    <br />
                    <div style={{ "textAlign": "center" }}>
                        <span className="dot_i" onClick={this.currentSlide_i.bind(this, 1)}></span>
                        <span className="dot_i" onClick={this.currentSlide_i.bind(this, 2)}></span>
                        <span className="dot_i" onClick={this.currentSlide_i.bind(this, 3)}></span>
                        <span className="dot_i" onClick={this.currentSlide_i.bind(this, 4)}></span>
                        <Row>
                            <Col md={12}>
                                <div className='more-about'>More about insurer companies</div>
                            </Col>
                        </Row>
                    </div>
                    <br /><br />
                </div>
            </div>
        )
    }
}

BecomePOS.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    CurrentLanguage: state.language.current_language,
    FetchedLanguage: state.language.lang_data,
});

const mapDispatchToProps = dispatch => ({
    onCurrentComponent: (fileName) => dispatch({ type: 'CurrentComponent', fileName }),
    onFetchLanguage: (language) => dispatch({ type: 'FetchLanguage', language }),
    onCurrentLanguage: () => dispatch({ type: 'CurrentLanguage' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BecomePOS));