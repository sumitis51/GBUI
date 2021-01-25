import React, { Component } from 'react'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'

import './index.css'

class FindOutMOre extends Component {
    state = {
        cardData: [
            {
                id: 0,
                src:'/assets/HomePage/transaction.svg',
                heading: 'Ease of transaction',
                content: 'We offer the customers a smooth buying experience. It is easy, it is secure & it is transparent. Find the best insurance solutions that suits your requirements.'
            },
            {
                id: 1,
                src:'/assets/HomePage/money.svg',
                heading: 'Claim Support Service',
                content: 'Our team of Claim Experts monitor your claim – at every step and update you regularly. We guide you through the entire journey and intervene on your behalf to ensure fair & fast claim settlement, particularly in case of any medical emergencies.'
            },
            {
                id: 2,
                src:'/assets/HomePage/support.svg',
                heading: 'Continued Association',
                content: 'A proactive approach in reaching out to our customers, we create an understanding and provide them tailored solutions throughout our relationship, be it pertaining to a claim or policy transaction.'
            },
            {
                id: 3,
                src:'/assets/HomePage/headphone.svg',
                heading: 'Dedicated Support',
                content: 'We have created an Intelligent Advisory Unit – who are just a call away. For any query or clarification regarding health insurance, our Intelligent Advisors remain available 24 x 7'
            },
            {
                id: 4,
                src:'/assets/HomePage/office.svg',
                heading: 'Customer Portfolio',
                content: 'We offer a 360 Degree View of the customer portfolio through your E-Account. Policy documents, or Claim Status or any related query, available right on your mobile and laptop.'
            },
            {
                id: 5,
                src:'/assets/HomePage/person.svg',
                heading: 'We own it',
                content: 'Health Insurance can be a tricky business, but we have made it simple for you. We own all your concerns and handhold for any requirement throughout our relationship'
            },
            {
                id: 6,
                src:'/assets/HomePage/triangle.svg',
                heading: 'Communication channel',
                content: 'Your trust is important to us! Through a personalized and open communication channel, we cement our relationships and win your trust.'
            },
            {
                id: 7,
                src:'/assets/HomePage/increase.svg',
                heading: 'Compare and buy online',
                content: 'View customised quotes, Make Comparison and buy the policy – best suited for your requirements. As your brokers, we inform you the Insurer ratings, their Claim Settlement records – for you to make an informed choice.'
            },
        ]
    }
    render() {
        return (
            <div className='FindOutMore'>
                <Row>
                    <Col  md={12} xs={12} xl={12} sm={12} lg={12}>
                        <div className='office-image'>
                        {/* <div className="bannerText">
                            <div className="Text">
                            <span className="topQuote">&nbsp;</span>Without health insurance, getting sick or injured could mean going bankrupt, going without needed care, or even dying needlessly.<span className="topQuote btmQuote">&nbsp;</span></div>
                            </div> */}
                            <img className='office' alt='office' src='/assets/HomePage/office.jpg' />
                        </div>
                    </Col>
                    <div className='find-out-more-container'>
                        <Col md={12} xs={12} xl={12} sm={12} lg={12}>    
                            <div className='gbui-h5 main-heading-1 bold'>What’s special about GroupBima?</div>
                        </Col>
                        <Col md={12} xs={12}>
                            <div className='gbui-h6 main-heading-1 bold'>
                                <span style={{ color: '#ea0b4b' }}>GroupBima</span> was incorporated with the spirit to protect the customers’ interest and make a difference to
                                every life connected with us.In India, a large number of people are unaware of the benefits and necessity
                                of health insurance and thus are mostly unwilling to buy it for them. People are also reluctant to buy insurance
                                due to the various procedures involved and the myths regarding health insurance revolving around.
                        </div>
                        </Col>
                        <Col md={12} xs={12}>
                            <div className='gbui-h6 main-heading-1-1 bold'>
                                To solve these issues and create awareness about health insurance we aim to create an ecosystem which nurtures innovation,
                                 satisfaction, and trust for the benefit of the customers.
                        </div>
                        </Col>
                        <Col md={6} xs={12}>
                            <div className='family-image-block'>
                                <img className='family' alt='family' src='/assets/HomePage/family_find_out.png' />
                            </div>
                        </Col>
                        <Col md={6} xs={12}>
                            <Col md={3} className='mui--hidden-xs mui--hidden-sm'>
                                <hr className='dash'></hr>
                            </Col>
                            <Col md={12} xs={12}>
                                <div className='gbui-h6 side-content-1'>
                                    The dream is to connect people to happiness through fast and painless, easily accessible and digitally
                                    available, best-fit health insurance solutions. We aim to optimize the whole health insurance buying
                                    process and make it a flawless, convenient and effortless proposition for you through technology.
                                    Creating happiness for the customers, partners &amp; employees across India and becoming the change leader
                                    is the driving force for us.
                                </div>
                            </Col>
                        </Col>
                        <Col md={12} xs={12}>
                            <div className='gbui-h5 main-heading-1 bold'>
                                Unique values offered by us to our customers
                            </div>
                        </Col>
                        {this.state.cardData.map(item => {
                            return (
                                <Col md={6} xs={12}>
                                    <div className='image-text-container'>
                                        <div className='div-image'>
                                            <img alt='div' className='round-div-image' src={item.src} />
                                        </div>
                                        <div className='main-heading-2 gbui-h6'>{item.heading}</div>
                                        <div className='text-content-2 gbui-menu-bar-1'>{item.content}</div>
                                    </div>
                                </Col>
                            )
                        })}
                         <Col md={12} xs={12}>
                            <div className='gbui-h7 main-heading-1 bold'>
                                After all, We Connect you to Happiness!
                            </div>
                        </Col>
                    </div>
                </Row>
            </div>
        )
    }
}

export default FindOutMOre