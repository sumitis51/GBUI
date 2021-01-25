import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Container from 'muicss/lib/react/container'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'

import './index.css'

class Redirecting extends Component {
    render() {
        return (
            <div className='redirecting'>
                <MuiThemeProvider>
                    <Container fluid={true}>
                        <div className='redirecting-image'>
                            <img src="assets/redirecting.svg" className='redirecting-pic' alt='redirecting' />
                        </div>
                        <div class="loading-dots">
                            <div class="loading-dots--dot"></div>
                            <div class="loading-dots--dot"></div>
                            <div class="loading-dots--dot"></div>
                            <div class="loading-dots--dot"></div>
                        </div>
                        <Row>
                            <Col md={12} xs={12} >
                                <div className='redirecting-message'>We are redirecting to you to the insurer payment gateway.</div>
                            </Col>
                            <Col md={12} xs={12} >
                                <div className='do-not-refresh'>Please do not press “Back” Or “Refresh” Button.</div>
                            </Col>
                        </Row>
                    </Container>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default Redirecting;