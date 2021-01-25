import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Container from 'muicss/lib/react/container'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Divider from '@material-ui/core/Divider'

import './index.css'
import ButtonLightSuccess from '../Shared/ButtonLightSuccess/index';




class SearchResult extends Component {
    constructor(props) {
        super();
        this.state = {
            serach_result_found: false,
            serach_result_not_found: true,
            counter: [1, 1, 1, 1],
            result_info_heading: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            result_link: 'www.groupbima.com/kuchaageacchasalink/accordingtoabovetitle',
            result_description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry"s  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions..'
        };
    }
    handleColorChange() {
        document.getElementById('1').style.color = '#0da176'
    }
    render() {
        return (
            <div className='search-container'>
                <MuiThemeProvider>
                    <Container fluid={true}>
                        {this.state.serach_result_found && <Row>
                            <Col md={12}>
                                <div className='search-result-page-heading'>About 236,000,000 results (0.59 seconds)</div>
                            </Col>
                            {this.state.counter.map(i =>
                                <div>
                                    <Col md={12}>
                                        <div className="result-info-heading">{this.state.result_info_heading}</div>
                                    </Col>
                                    <Col md={12}>
                                        <div className="result-link">{this.state.result_link}</div>
                                    </Col>
                                    <Col md={12}>
                                        <div className="result-description">{this.state.result_description}</div>
                                        <div className='divider'>
                                            <Divider />
                                        </div>
                                    </Col>
                                </div>)}
                            <Col md={12}>
                                <div className='pagination'>
                                    <span id='1' onClick={this.handleColorChange} className='paginationNumber'>1</span>
                                    <span id='2' className='paginationNumber'>2</span>
                                    <span id='3' className='paginationNumber'>3</span>
                                    <span id='4' className='paginationNumber'>4</span>
                                    <span id='5' className='paginationNumber'>5</span>
                                    <span id='6' className='paginationNumber'>6</span>
                                    <span id='7' className='paginationNumber'>7</span>
                                    <span id='8' className='paginationNumber'>8</span>
                                    <span id='9' className='paginationNumber'>9</span>
                                </div>
                            </Col>
                        </Row>}
                        {this.state.serach_result_not_found && <div>
                            <div className='result-not-found-image'>
                                <img src="assets/AddVehicleDetail/AddVehicleDetail.svg" className='not-found-result' alt='notfound' />
                            </div>
                            <Row className='result-row'>
                                <Col md={12} className='result-column'>
                                    <div className='no-record'>No record found</div>
                                </Col>
                                <Col md={12} className='result-column'>
                                    <div className='unable-to-search'>We are unable to search anything with the given information </div>
                                </Col>
                                <Col md={12} xs={12} className='result-column'>
                                    <div className='button-edit-input'>
                                        <ButtonLightSuccess  Text='Edit Input Details' />
                                    </div>
                                </Col>
                            </Row>
                        </div>}
                    </Container>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default SearchResult