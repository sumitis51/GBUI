import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import Container from 'muicss/lib/react/container';
import './NotFound.css';
import axios from 'axios';
import { connect } from 'react-redux';





class NotFound extends Component {
    componentWillMount() {
        const vm = this;
        this.props.onCurrentComponent('notFound.json');
        axios.get('/assets/json/notFound.json')
            .then((response) => {
                vm.props.onFetchLanguage(response.data[this.props.CurrentLanguage]);
            }, (error) => {
                console.log(error);
            })
    }
    render() {
        return (
            <MuiThemeProvider>
                <div className='NotFound'>
                    <Container fluid={true}>
                        <div className='NotFoundImage'>
                            <img src="assets/NotFound/NotFound.svg" className='notfound' alt='notfound' />
                        </div>
                        <Row>
                            <Col md={12}>
                                <div className='oops'>{this.props.FetchedLanguage ? this.props.FetchedLanguage.NotFoundOOPSText : ''}</div>
                            </Col>
                            <Col md={12}>
                                <div className='errCode'>{this.props.FetchedLanguage ? this.props.FetchedLanguage.NotFoundErrrorCodeText : ''}</div>
                            </Col>
                            <Col md={12}>
                                <div className='cantSeem'>{this.props.FetchedLanguage ? this.props.FetchedLanguage.NotFoundErrorMessageWeCantSeem : ''}</div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </MuiThemeProvider>
        )
    }
}

const mapStateToProps = state => ({
    CurrentLanguage: state.language.current_language,
    FetchedLanguage: state.language.lang_data,
});

const mapDispatchToProps = dispatch => ({
    onCurrentComponent: (fileName) => dispatch({ type: 'CurrentComponent', fileName }),
    onFetchLanguage: (language) => dispatch({ type: 'FetchLanguage', language }),
    onCurrentLanguage: () => dispatch({ type: 'CurrentLanguage' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotFound);