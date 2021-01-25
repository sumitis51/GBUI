import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core'
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import './index.css';
import axios from 'axios';
import { connect } from 'react-redux';
import Leftpanel from '../AboutTnCLeftPanel/LeftPanel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
class PrivacyPolicy extends Component {
    state = {
        setPage: '/privacy-policy'
    }
    componentWillMount() {
        const vm = this;
        this.props.onCurrentComponent('TnC.json');
        axios.get('/assets/json/TnC.json')
            .then((response) => {
                vm.props.onFetchLanguage(response.data[this.props.CurrentLanguage]);
            }, (error) => {

            })
    }
    handleChange = (event) => {
        this.setState({
            setPage: event.target.value
        })
        this.props.history.push(event.target.value);
    }
    render() {
        return (
            <MuiThemeProvider>
                <div className='privacy-policy'>
                    <Container fluid={true} className='TermText'>
                        <Row>
                            <Leftpanel leftpanel={this.props.FetchedLanguage} privacyPOlicy={true} />
                            <Col md={9} sm={12} xs={12}>
                                <Row className=' mui--hidden-lg mui--hidden-md mui--hidden-xl'>
                                    <Col xs={12}>
                                        <div className='mobile_select_menu'>
                                            <Select className="mobile_select"
                                                onChange={this.handleChange}
                                                value={this.state.setPage}
                                            >
                                                <MenuItem value="/about">About Us</MenuItem>
                                                <MenuItem value="/TnC">Terms and Conditions</MenuItem>
                                                <MenuItem value="/privacy-policy">Privacy Policy</MenuItem>
                                            </Select>
                                        </div>

                                    </Col>




                                </Row>
                                <Col md={12} xs={12}>
                                    <div className="TitleText">Privacy Policy</div>
                                    <div className="SubTitleText">Last Updated On: 10th March 2018</div>
                                    <div className="policyText">
                                        This Privacy Policy governs the manner in which Groupbima collects, uses, stores, discloses and protects information collected from users (each, a “User”) of the website -<a href=" http://www.groupbima.com"> http://www.groupbima.com</a> (‘site’).
                                    </div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className='UseText'>
                                        Collection of Information
                                    </div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className='policyText'>
                                        We may collect personal identification information from Users in ways including, but not limited to, when Users browse our site, place an order, register on the site, respond to our surveys, fill forms. While using the site, Users may be asked for information including name, phone number, email address, mailing address, payment instrument details - as and when appropriate. Personal identification information is collected only when voluntarily submitted by the User. When asked for personal identification information, Users can refuse to provide this information. However, not providing the required information may limit the Site features accessible by the User.
                                    </div>
                                    <div className="policyText">When Users interact with our Site, we may also collect non-personal information such as type of device, browser details, network service provider details and other generic information.</div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className='UseText'>
                                        Cookies
                                    </div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className='policyText'>
                                        Cookies help us enhance the User’s experience on our site. Users may set their web browser to refuse or set it to alert you when cookies are being shared. However, if this is done, it may hamper the User’s experience on some parts of the site.
                                    </div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className='UseText'>
                                        Use of Collected Information
                                    </div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className='policyText'>
                                        Groupbima may use the personal information provided by Users for the following purposes:
                                    </div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className='midText'>
                                        <ul>
                                            <li>To personalise user experience.
                                          </li>
                                            <li> To improve customer service provided to Users.
                                        </li><li>
                                                To improve our website, products and services offered.
                                        </li><li>
                                                To process payments. This information is not shared with any third party except when required to provide this service.
                                        </li><li>
                                                To provide further information on products purchased by Users.
                                        </li><li>
                                                To respond to your queries.
                                        </li>
                                        </ul>
                                    </div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className='midText'>
                                        To send periodic emails with newsletters, news, updates and information on products and services offered. Users may unsubscribe to emails by following simple instructions at the bottom of each such email or by contacting customer care through the site.
                                    </div>
                                    <div className="midText">
                                        To contact Users via email or phone to offer information and services related to products or services offered by us.
                                    </div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className='UseText'>
                                        Protection of Your Information
                                    </div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className='policyText'>
                                        We have adopted significant data collection, storage and processing practices and security measures to protect against unauthorized access, modification, disclosure or destruction of your personal information, transaction details, username, password and other data stored on our site.
                                    </div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className='policyText'>
                                        Sensitive data exchange between the site and its Users happens over a SSL secured communication channel. All sensitive data exchange is encrypted and protected with digital signatures.
                                    </div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className='UseText'>
                                        Sharing your Personal Information
                                    </div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className='policyText'>
                                        We may share your personal information with our affiliates and third party service providers to help us operate our business and site or administer activities ranging from sending newsletters to detection of potentially illegal acts. Your usage of this website implies that we may share your information for these purposes.
                                    </div>
                                    <div className="policyText">
                                        We may disclose your personal information if required to do so by law or in the good faith that such disclosure is in compliance of law with Government agencies.
                                    </div>
                                </Col>

                                <Col md={12} xs={12}>
                                    <div className='UseText'>
                                        Changes to this Privacy Policy
                                    </div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className='policyText'>
                                        Groupbima has the discretion to update this privacy policy at any time. When this privacy policy is updated, we shall revise the “date of update” on this page. We encourage Users to regularly check this page for any changes in our privacy policy. By using our site, you acknowledge and agree that it is your responsibility to review this privacy policy regularly.
                                    </div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className='UseText'>
                                        Your Acceptance of these Terms
                                    </div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className='policyText'>
                                        By using this site, you indicate your absolute acceptance of this privacy policy.
                                    </div>
                                </Col>
                                {/* <Col md={12} xs={12}>
                                    <div className='UseText'>
                                     Refund Policy
                                    </div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className='policyText'>
                                     In case of a refund due to an erroneous transaction or cancellation, the premium paid for an insurance product will be refunded via cheque or direct credit as per the policy of the Insurance provider, that you have chosen to buy the product from.
                                    </div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className='UseText'>
                                     Cancellation Policy
                                    </div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className='policyText'>
                                     In case of a cancellation, the premium paid for an insurance product will be refunded via cheque or direct credit as per the policy of the Insurance provider, that you have chosen to buy the product from.
                                    </div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className='policyText'>
                                     You do not need to return the copy of the policy documents received by you, in order to cancel the policy.
                                    </div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className='bottomPolicy'>
                                     However the insurer from whom you have purchased your policy, which is the subject matter of a premature cancellation or amendment leading to refunds, can ask for certain specified documents at their discretion to support your claim for such refunds.
                                    </div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className='UseText'>
                                    Contact Information
                                    </div>
                                </Col>
                                <Col md={12} xs={12}>
                                    <div className='bottomPolicy' style={{margin:0}}>
                                    If you have any questions or comments about these our Terms of Service as outlined above, you can contact us at:
                                    </div>
                                    <div className='bottomPolicy' style={{margin:0}}>
                                    Groupfit Insurance Brokers Pvt. Ltd. 
                                    </div>
                                    <div className='bottomPolicy' style={{margin:0}}>
                                    1001, 10th Floor, The Ambience Court
                                    </div>
                                    <div className='bottomPolicy' style={{margin:0}}>
                                    Sector 19D, Vashi, Navi Mumbai
                                    </div>
                                    <div className='bottomPolicy'>
                                    Maharashtra - 400703
                                    </div>
                                </Col> */}
                            </Col>
                        </Row>
                    </Container>
                </div>
            </MuiThemeProvider>

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

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy);