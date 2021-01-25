import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core'
import Container from 'muicss/lib/react/container'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonLightSuccess from '../../Shared/ButtonLightSuccess/index';

import './index.css'

const styles = {
    media: {
        // ⚠️ object-fit is not supported by IE 11.
        //objectFit: 'cover',
    },
    cardActions: {
        borderTop: '1px solid #b2b2b2',
        padding:0,
    },
    readArticleButton: {
        color: '#333333',
        textTransform: 'capitalize',
        fontFamily: 'Source Sans Pro',
        fontSize: '16px',
        margin:'20px 18px 20px 18px'
    }
};
class Blogs extends Component {
    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider>
                <div className='blog-posts'>
                    <Container fluid={true} className='blog-container'>
                        <Row>
                            <Col md={12} xs={12}>
                                <div className='gbui-h4 blog' >
                                   Wish to know more on Health Insurance?
                                </div>
                                <div className='gbui-h7 blog2'>
                                    Check-out our Interesting & Informative Blogs
                                </div>
                            </Col>
                        </Row>
                        <Row className='cards-row'>
                            <Col md={4} xs={12}>
                                <Card className='card'>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt="Contemplative Reptile"
                                            className={classes.media}
                                            image="assets/HomePage/Terminologies.png"
                                            title=""
                                        />
                                        <CardContent className='card-content'>
                                            <Row>
                                                {/* <Col md={12}>
                                                    <div className='date-of-post gbui-caption-2'>Posted 22 Sept, 2018</div>
                                                </Col> */}
                                                <Col md={12}>
                                                    <div className='first-heading gbui-h5'>Health Insurance Glossary</div>
                                                </Col>
                                                <Col md={12}>
                                                    <div className='content-body gbui-body-1'>
                                                        Are you planning to buy health insurance for yourself and/ or your beloved ones? 
                                                        It will be of great help if you know the terminologies normally involved in the health 
                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardContent>
                                    </CardActionArea>
                                    <a href='https://blog.groupbima.com/health-insurance-terminologies/' target="_blank">
                                    <CardActions className={classes.cardActions} style={{ cursor: 'pointer' }}>
                                        <Col md={6} xs={6} className='card-action-column'>
                                            <div style={{ float: 'left', display: 'inline' }} className='read-article-button'>
                                                Read Article
                                                </div>
                                        </Col>
                                        <Col md={6} xs={6} className='card-action-column'>
                                            <div style={{ float: 'right', display: 'inline' }} className='read-article-button'>
                                                <img alt='arrow' classname='arrow' src='/assets/HomePage/arrow.svg' />
                                            </div>
                                        </Col>
                                    </CardActions>
                                    </a>
                                </Card>
                            </Col>
                            <Col md={4} xs={12}>
                                <Card className='card'>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt="Contemplative Reptile"
                                            className={classes.media}
                                            image="assets/HomePage/health-insurance-myths.png"
                                            title=""
                                        />
                                        <CardContent className='card-content'>
                                            <Row>
                                                {/* <Col md={12}>
                                                    <div className='date-of-post gbui-caption-2'>Posted 22 Sept, 2018</div>
                                                </Col> */}
                                                <Col md={12}>
                                                    <div className='first-heading gbui-h5'>Myths About Health Insurance</div>
                                                </Col>
                                                <Col md={12}>
                                                    <div className='content-body gbui-body-1'>
                                                        Inadequate information and the misconceptions regarding health insurance discourages customers from buying one. 
                                                        Let's bust the myths about health insurance  
                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardContent>
                                    </CardActionArea>
                                    <a href='https://blog.groupbima.com/myths-and-facts-about-health-insurance-policies/' target="_blank">
                                    <CardActions className={classes.cardActions} style={{ cursor: 'pointer' }}>
                                        <Col md={6} xs={6} className='card-action-column'>
                                            <div style={{ float: 'left', display: 'inline' }} className='read-article-button'>
                                                Read Article
                                            </div>
                                        </Col>
                                        <Col md={6} xs={6} className='card-action-column'>
                                            <div style={{ float: 'right', display: 'inline' }} className='read-article-button'>
                                                <img alt='arrow' classname='arrow' src='/assets/HomePage/arrow.svg' />
                                            </div>
                                        </Col>
                                    </CardActions>
                                    </a>
                                </Card>
                            </Col>
                            <Col md={4} xs={12}>
                                <Card className='card'>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt="Contemplative Reptile"
                                            className={classes.media}
                                            image="assets/HomePage/New-regulations-irda.png"
                                            title=""
                                        />
                                        <CardContent className='card-content'>
                                            <Row>
                                                {/* <Col md={12}>
                                                    <div className='date-of-post gbui-caption-2'>Posted 22 Sept, 2018</div>
                                                </Col> */}
                                                <Col md={12}>
                                                    <div className='first-heading gbui-h5'>Key changes in Health</div>
                                                </Col>
                                                <Col md={12}>
                                                    <div className='content-body gbui-body-1'>
                                                        Changes in rules and regulations bring in some new innovative and productive aspects that help in growth and development. 
                                                        Let’s have a look at the key changes a 
                                                    </div>
                                                </Col>
                                            </Row>
                                        </CardContent>
                                    </CardActionArea>
                                    <a href='https://blog.groupbima.com/health-insurance-regulations-issued-by-irdai-in-2016/' target="_blank">
                                    <CardActions className={classes.cardActions} style={{ cursor: 'pointer' }}>
                                        <Col md={6} xs={6} className='card-action-column'>
                                            <div style={{ float: 'left' }} className='read-article-button'>
                                                Read Article
                                            </div>
                                        </Col>
                                        <Col md={6} xs={6} className='card-action-column'>
                                            <div style={{ float: 'right', display: 'inline' }} className='read-article-button'>
                                                <img alt='arrow' classname='arrow' src='/assets/HomePage/arrow.svg' />
                                            </div>
                                        </Col>
                                    </CardActions>
                                    </a>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} xs={12} style={{textAlign:'center'}}>
                                <div className='see-more-blogs-btn'>
                                    <a href='https://blog.groupbima.com/' target="_blank">
                                        <ButtonLightSuccess fullPinkContent={true} Text='See more blogs' />
                                    </a>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </MuiThemeProvider>
        )
    }
}

Blogs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Blogs);
