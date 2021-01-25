import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Container from 'muicss/lib/react/container'
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import './index.css'

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        padding: '4px 6px',
        display: 'block',
        backgroundColor: '#f4f4f4',
    },
});


class PosTermsConditions extends Component {
    state = {
        contract: false,
        termsAndConditions: true,
        pos: ''
    }

    onClickContractHandler = () => {
        if (window.innerWidth <= 767) {
            document.getElementById("pos-element").className = 'gbui-h6 pos-terms-conditions-mainheading'
        }
        else {
            document.getElementById("pos-element").className = 'gbui-h4 pos-terms-conditions-mainheading'
        }
        this.setState({
            contract: true,
            termsAndConditions: false
        })
    }
    onClickTermsHandler = () => {
        this.setState({
            contract: false,
            termsAndConditions: true
        })
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
        if (event.target.value === 10) {
            this.setState({
                contract: false,
                termsAndConditions: true,
            })
        } else if (event.target.value === 20) {
            this.setState({
                contract: true,
                termsAndConditions: false,
            })
        }
    };

    componentDidUpdate = () => {
        if (window.innerWidth <= 767) {
            console.log('hiii')
            document.getElementById("pos-element").className = 'gbui-h6 pos-terms-conditions-mainheading'
        }
        else {
            document.getElementById("pos-element").className = 'gbui-h4 pos-terms-conditions-mainheading'
        }
    }


    componentWillMount = () => {
        window.addEventListener("resize", () => {
            if (window.innerWidth <= 767) {
                document.getElementById("pos-element").className = 'gbui-h6 pos-terms-conditions-mainheading'
            }
            else {
                document.getElementById("pos-element").className = 'gbui-h4 pos-terms-conditions-mainheading'
            }
        });
    }
    componentDidMount() {
        if (window.innerWidth <= 767) {
            document.getElementById("pos-element").className = 'gbui-h6 pos-terms-conditions-mainheading'
        }
        else {
            document.getElementById("pos-element").className = 'gbui-h4 pos-terms-conditions-mainheading'
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider>
                <div className='pos-terms-conditions'>
                    <Container fluid={true} className='pos-terms-conditions-container'>
                        <Row>
                            <Col md={3} className='left-panel mui--hidden-xs mui--hidden-sm'>
                                <Col md={12}>
                                    <div className='gbui-h4 pos-heading'>POS</div>
                                </Col>
                                {this.state.termsAndConditions && <div>
                                    <Col md={12}>
                                        <div className='gbui-subtitle-1 contact-heading' onClick={this.onClickContractHandler}>Contract Details</div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='gbui-subtitle-1 terms-conditions-heading' onClick={this.onClickTermsHandler}>Terms and Condition</div>
                                    </Col>
                                </div>}
                                {this.state.contract && <div>
                                    <Col md={12}>
                                        <div className='gbui-subtitle-1 terms-conditions-heading' onClick={this.onClickContractHandler}>Contract Details</div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='gbui-subtitle-1 contact-heading' onClick={this.onClickTermsHandler}>Terms and Condition</div>
                                    </Col>
                                </div>}
                                <Col md={12}>
                                    <div className='gbui-subtitle-1 contact-heading'>Privacy Policy</div>
                                </Col>
                            </Col>
                            <Col md={9} className='right-panel'>
                                {/* pos  terms and conditions */}
                                {this.state.termsAndConditions && <div>
                                    <Col xs={12} className='mui--visible-xs-block'>
                                        <FormControl className={classes.formControl}>
                                            <NativeSelect fullWidth
                                                value={this.state.pos}
                                                onChange={this.handleChange('pos')}
                                                input={<Input name="age" id="age-native-helper" disableUnderline={true} />}
                                            >
                                                <option value={10}>POS- Terms and Condition</option>
                                                <option value={20}>POS- Contract Details</option>
                                                <option value={30}>POS- Privacy Policy</option>
                                            </NativeSelect>
                                        </FormControl>
                                    </Col>
                                    <Col md={12}>
                                        <div id='pos-element' className='gbui-h4 pos-terms-conditions-mainheading'>POS Terms and Condition</div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='gbui-h7 pos-terms-last-update'>Last Updated On: 10th March 2018</div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='gbui-body-1 pos-terms-body-text'>
                                            GroupBima Insurance Broking Pvt. Limited (hereinafter referred to as Coverfox) operates the
                                            website http://www.coverfox.com to provide consumers choice and an easy way to buy Insurance
                                            products from multiple Insurance companies. Coverfox is not an insurance company. Coverfox is a
                                            licensed Insurance Broking Company holding a Broking licence from the Indian Insurance Regulator
                                            – Insurance Regulatory and Development authority.
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='gbui-body-1 pos-terms-body-text'>
                                            IRDA Direct Broker Code : IRDA/ DB 556/16
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='gbui-body-1 pos-terms-body-text'>
                                            Our participating insurance providers supply some of the information available on
                                             the Website and therefore there may be inaccuracies in the Website Information over
                                             which Coverfox has limited control.
                                    </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='gbui-body-1 pos-terms-body-text'>
                                            Coverfox does not warrant or guarantee the Timeliness, accuracy or
                                            completeness of the Website Information; or Quality of the results obtained
                                            from the use of the Website.
                                    </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='gbui-body-1 pos-terms-body-text'>
                                            To the maximum extent permitted by law, Coverfox has no liability in relation to or
                                            arising out of the Website Information and Website recommendations. You are responsible
                                            for the final choice of your product and you should take time to read through all information
                                            supplied before proceeding. If you are in any doubt regarding a product or its terms you
                                            should seek further advice from Coverfox or the relevant participating provider before choosing your product.
                                    </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='gbui-body-1 pos-terms-body-text'>
                                            Coverfox may pass on your personal information to the relevant participating provider if you apply to purchase
                                            a product through www.coverfox.com , however, Coverfox does not guarantee when or if you will actually acquire
                                            the product that you have chosen. Coverfox does not accept any liability arising out of circumstances where there
                                            is delay in you acquiring the product you have chosen.
                                    </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='gbui-body-1 pos-terms-body-text'>
                                            Please note that Coverfox is only collecting or assisting in collecting the premium deposit on behalf of the insurer you have chosen to buy the policy. The acceptance of the deposit as premium and final issuance of the policy is subject to the underwriting norms and discretion of the Insurer whose policy you have chosen to buy on which Coverfox has no control. Coverfox will ensure that the amount is refunded by the insurer in case there is no ultimate issuance of policy.
                                    </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='gbui-body-1 pos-terms-body-text'>
                                            By visiting our website and accessing the information, resources, services, products, and tools we provide, you understand and agree to accept and adhere to the following terms and conditions as stated in this policy (hereafter referred to as ‘User Agreement’), along with the terms and conditions as stated in our Privacy Policy (please refer to the Privacy Policy section below for more information).
                                   </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='gbui-body-1 pos-terms-body-text'>
                                            This agreement is in effect as of Oct 02, 2013.
                                    </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='gbui-body-1 pos-terms-body-text'>
                                            We reserve the right to change this User Agreement from time to time without notice. You acknowledge and agree that it is your responsibility to review this User Agreement periodically to familiarize yourself with any modifications. Your continued use of this site after such modifications will constitute acknowledgment and agreement of the modified terms and conditions.
                                    </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='gbui-h6 pos-terms-responsible-use-text'>
                                            Responsible Use and Conduct
                                    </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='gbui-body-1 pos-terms-body-text'>
                                            By visiting our website and accessing the information, resources, services, products, and tools we provide for you, either directly or indirectly (hereafter referred to as ‘Resources’), you agree to use these Resources only for the purposes intended as permitted by (a) the terms of this User Agreement, and (b) applicable laws, regulations and generally accepted online practices or guidelines.
                                    </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='gbui-body-1 pos-understand-body-text'>
                                            Wherein, you understand that:
                                    </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='pos-understand-block'>
                                            <div className='gbui-body-1 pos-terms-body-text'>
                                                In order to access our Resources, you may be required to provide certain information about yourself (such as identification, 	contact details, etc.) as part of the registration process, or as part of your ability to use the Resources. You agree that any	information you provide will always be accurate, correct, and up to date.
                                        </div>
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='pos-understand-block'>
                                            <div className='gbui-body-1 pos-terms-body-text'>
                                                You are responsible for maintaining the confidentiality of any login information associated with any account you use to access	our Resources. Accordingly, you are responsible for all activities that occur under your account/s.
                                        </div>
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='pos-understand-block'>
                                            <div className='gbui-body-1 pos-terms-body-text'>
                                                Accessing (or attempting to access) any of our Resources by any means other than through the means we provide, is strictly	prohibited. You specifically agree not to access (or attempt to access) any of our Resources through any automated, unethical 	or unconventional means.
                                        </div>
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='pos-understand-block'>
                                            <div className='gbui-body-1 pos-terms-body-text'>
                                                Engaging in any activity that disrupts or interferes with our Resources, including the servers and/or networks to which our	Resources are located or connected, is strictly prohibited.
                                        </div>
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='gbui-h5 pos-terms-responsible-use-text'>
                                            Privacy
                                    </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='gbui-body-1 pos-terms-body-text'>
                                            Your privacy is very important to us, which is why we’ve created a separate Privacy Policy in order to explain in detail how we collect, manage, process, secure, and store your private information. Our privacy policy is included under the scope of this User Agreement. To read our privacy policy in its entirety, click here.
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='gbui-h5 pos-terms-responsible-use-text'>
                                            Limitation of Warranties
                                    </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='gbui-body-1 pos-terms-body-text'>
                                            By using our website, you understand and agree that all Resources we provide are “as is” and “as available”. This means that we do not represent or warrant to you that:
                                    </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='gbui-h5 pos-terms-responsible-use-text'>
                                            Contact Information
                                    </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='gbui-body-1 pos-terms-body-text'>
                                            If you have any questions or comments about these our Terms of Service as outlined above, you can contact us at:
                                    </div>
                                    </Col>
                                    <Col md={5}>
                                        <div className='gbui-body-1 pos-terms-body-text'>
                                            Groupbima Insurance Broking Pvt. Ltd.
                                            Ambience Court, 1001,
                                            The, Sector No 19D, Vashi,
                                            Navi Mumbai, Maharashtra 400703
                                    </div>
                                    </Col>
                                </div>}
                                {/* contract */}
                                {this.state.contract && <div>
                                    <Col xs={12} className='mui--visible-xs-block'>
                                        <FormControl className={classes.formControl}>
                                            <NativeSelect fullWidth
                                                value={this.state.pos}
                                                onChange={this.handleChange('pos')}
                                                input={<Input name="age" id="age-native-helper" disableUnderline={true} />}
                                            >
                                                <option value={10}>POS- Terms and Condition</option>
                                                <option value={20}>POS- Contract Details</option>
                                                <option value={30}>POS- Privacy Policy</option>
                                            </NativeSelect>
                                        </FormControl>
                                    </Col>
                                    <Col md={12}>
                                        <div id='pos-element' className='gbui-h4 pos-terms-conditions-mainheading'>Contract Details</div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='gbui-h7 pos-terms-last-update'>Last Updated On: 10th March 2018</div>
                                    </Col>
                                    <Col md={12}>fullWidth
                                        <div className='gbui-body-1 pos-membership-start-body-text'>
                                            POS Membership Start Date: 1 Jan 2019
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='gbui-body-1 pos-membership-start-body-text'>
                                            POS Membership Expiry Date: 31 Dec 2019
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='gbui-body-1 pos-membership-start-body-text'>
                                            POS Membership Renewal Date: 1 Jan 2020
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='gbui-body-1 pos-membership-start-body-text' style={{ color: '#0da176' }}>
                                            Agreed Comission: 10 %
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='gbui-body-1 pos-membership-start-body-text' style={{ textDecoration: 'underline' }}>
                                            Download your contract
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='gbui-body-1 pos-terms-body-text'>
                                            1. In order to access our Resources, you may be required to provide certain information about yourself (such as identification,
                                                contact details, etc.) as part of the registration process, or as part of your ability to use the Resources. You agree that any
                                                information you provide will always be accurate, correct, and up to date.
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='gbui-body-1 pos-terms-body-text'>
                                            2. You are responsible for maintaining the confidentiality of any login information associated with any account you use to access
                                             our Resources.Accordingly, you are responsible for all activities that occur under your account / s.
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='gbui-body-1 pos-terms-body-text'>
                                            3. Accessing(or attempting to access) any of our Resources by any means other than through the means we provide, is strictly
                                                prohibited.You specifically agree not to access(or attempt to access) any of our Resources through any automated, unethical
                                                or unconventional means.
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='gbui-body-1 pos-terms-body-text'>
                                            4.  Engaging in any activity that disrupts or interferes with our Resources, including the servers and / or networks to which our
                                                Resources are located or connected, is strictly prohibited.
                                        </div>
                                    </Col>
                                </div>}
                            </Col>
                        </Row>
                    </Container>
                </div>
            </MuiThemeProvider>
        )
    }
}

PosTermsConditions.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PosTermsConditions);















