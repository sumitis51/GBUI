import React, { Component } from 'react'
import Container from 'muicss/lib/react/container'
import { MuiThemeProvider } from '@material-ui/core'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import ButtonLightSuccess from '../Shared/ButtonLightSuccess/index';
import { Link } from 'react-router-dom';
import './index.css'

class Error500 extends Component {
    state = {
        error:'500'
    }
    render() {
        return (
            <div className='Error500'>
                <MuiThemeProvider>
                    <Container fluid={true}>
                        <Row>
                            <Col md={4} xs={4}></Col>
                            <Col md={4} xs={12}>
                            {this.state.error === '500' &&
                                <div className='error-icon'><img alt='500' className='error-pic' src='/assets/500.svg'></img></div>
                            }
                            {this.state.error === '404' &&
                                <div className='error-icon'><img alt='404' className='error-pic' src='/assets/404.svg'></img></div>
                            }
                            </Col>
                            <Col md={12} xs={12}>
                             {this.state.error === '500' &&
                                <div className='server-error'>Internal Server Error</div>
                             }
                             {this.state.error === '404' &&
                                <div className='server-error'>OOPS!</div>
                             }
                            </Col>
                            <Col md={12} xs={12}>
                            {this.state.error === '500' &&
                                <div className='error-code'>Error Code: 500</div>
                            }
                            </Col>
                            <Col md={12} xs={12}>
                            {this.state.error === '404' &&
                                <div className='error-message'>We are unable to find the page you are looking for.</div>
                            }
                             {this.state.error === '500' &&
                                <div className='error-message'>We’re working towards creating something better. We won’t take long </div>
                            }
                            </Col>
                            <Col md={12} xs={12}>
                             <Link to='/'><ButtonLightSuccess midPinkContent={true} Text='Go to Home Page' /></Link>
                            </Col>
                        </Row>
                    </Container>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default Error500;