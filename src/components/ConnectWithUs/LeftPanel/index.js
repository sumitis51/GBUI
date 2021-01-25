import React, { Component } from 'react'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import { Link } from 'react-router-dom';
import './index.css';

class LeftPanel extends Component {
    render() {
        return (
            <div>
                <Row>
                    {this.props.parentComponent === 'complaints' &&
                        <Col md={12}>
                            <div className='connect-with-us-heading gbui-h6'>Connect With us</div>
                            <Link to="/connect-with-us"><div className='contact-us-text gbui-subtitle-1'>Contact Us</div></Link>
                            <Link to="/feedback"><div className='share-your-feedback gbui-subtitle-1' style={{color:'#808080'}}>Share your Feedback</div></Link>
                            <Link to="/complaints-grievances"><div className='complaints gbui-subtitle-1' style={{color:'#000000'}}>Complains &amp; Grievances</div>
                            </Link>
                        </Col>
                    }
                    {/* {this.props.parentComponent === 'connectUs' && 
                        <Col md={12}>
                               <div class='connect-with-us-heading gbui-h6'>Connect With us</div>
                            <Link to="/connect-with-us"><div className='contact-us-text gbui-subtitle-1'>Contact Us</div></Link>
                            <Link to="/feedback"><div className='share-your-feedback gbui-subtitle-1'>Share your Feedback</div></Link>
                            <Link to="/complaints-grievances"><div className='complaints gbui-subtitle-1'>Complains &</div>
                                 <div className='grievances gbui-subtitle-1'>Grievances</div>
                            </Link>
                        </Col>} */}
                    {this.props.parentComponent === 'connectUs' && 
                    <Col md={12}>
                           <div className='connect-with-us-heading gbui-h6'>Connect With us</div>
                        <Link to="/connect-with-us"><div className='contact-us-text gbui-subtitle-1' style={{color:'#000000'}}>Contact Us</div></Link>
                        <Link to="/feedback"><div className='share-your-feedback gbui-subtitle-1'  style={{color:'#808080'}}>Share your Feedback</div></Link>
                        <Link to="/complaints-grievances"><div className='complaints gbui-subtitle-1'>Complains &amp; Grievances</div>
                        </Link>
                    </Col>}
                    {this.props.parentComponent === 'feedback' && 
                    <Col md={12}>
                           <div className='connect-with-us-heading gbui-h6'>Connect With us</div>
                        <Link to="/connect-with-us"><div className='contact-us-text gbui-subtitle-1'>Contact Us</div></Link>
                        <Link to="/feedback"><div className='share-your-feedback gbui-subtitle-1' >Share your Feedback</div></Link>
                        <Link to="/complaints-grievances"><div className='complaints gbui-subtitle-1'>Complains &amp; Grievances</div>
                        </Link>
                    </Col>}
                </Row>
            </div>
        )
    }
}

export default LeftPanel