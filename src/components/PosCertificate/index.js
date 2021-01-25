import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Container from 'muicss/lib/react/container'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ButtonLightSuccess from '../Shared/ButtonLightSuccess/index'
import Divider from '@material-ui/core/Divider';


import './index.css'

const styles = theme => ({
    line: {
        height: '2px',
        backgroundColor: '#aaaaaa',
    },
    line1: {
        height: '2px',
        backgroundColor: '#ea0b4b',
    },
    button: {
        textTransform: 'capitalize',
        color: '#ea0b4b'
    },
    rightIcon: {
        marginLeft: theme.spacing.unit * 2,
    },
    checkbox: {
        color: '#000000',
        '&$checked': {
            color: '#0da176',
        },
    },
    checked: {},
    label: {
        fontFamily: 'Nunito',
        fontSize: '12px',
        color: '#000000',
    }
});


class PosCertificate extends Component {
    render() {
        const { classes } = this.props;
        return (
            <MuiThemeProvider>
                <div className='pos-training-certificate'>
                    <Row>
                        <Col md={12} xs={12} className='stepbar-row'>
                            <Col md={5} xs={5} className='line-columns'>
                                <div className='upload-documents gbui-body-1'>
                                    Upload Documents
                                </div>
                            </Col>
                            <Col md={1} xs={2}>
                                <hr className={classes.line} />
                            </Col>
                            <Col md={5} xs={5} className='line-columns'>
                                <div className='training gbui-body-1'>
                                    Training & Examination
                                </div>
                            </Col>
                        </Col>
                        <Col md={12} xs={12} className='line-row'>
                            <Col md={6} xs={6} className='line-column'>
                                <Divider className={classes.line1} />
                            </Col>
                            <Col md={6} xs={6} className='line-column'>
                                <Divider className={classes.line1} />
                            </Col>
                        </Col>
                    </Row>
                    <Container fluid={true} className='pos-training-certificate-container'>
                        <Row>
                            <Col md={12} className='pos-training-certificate-card'>
                                <Card square={false} className='card-container'>
                                    <Row>
                                        <Col md={7} className='pos-training-certificate-pic mui--hidden-xs mui--hidden-sm'>
                                            <Col md={12}>
                                                <div className='verify-number gbui-h4'>
                                                    You have sucessfully completed your training
                                                </div>
                                            </Col>
                                            <Col md={12}>
                                                <div className='pos-documet-pos-certficate-pic'>
                                                    <img className='pos-document-pic' alt='document-pos-training-pic' src='/assets/pos/pos-verification.svg' />
                                                </div>
                                            </Col>
                                        </Col>
                                        <Col md={5} xs={12} className='pos-training-certificate-div'>
                                            <Col md={12} xs={12}>
                                                <div className='pos-training-certificate-heading gbui-h5'>Training Certification</div>
                                            </Col>
                                            <Col md={12} xs={12}>
                                                <div className='pos-training-certificate-subheading gbui-menu-bar-2'>Awesome line</div>
                                            </Col>
                                            <Col md={12} xs={12}>
                                                <div className='pos-training-certificate-text gbui-overline-1'>Training Certificate</div>
                                            </Col>
                                            <Col md={12} xs={12}>
                                                <div className='As-per-IRDAI-you-have gbui-caption-1'>
                                                    As per IRDAI you have completed your training so here is your
                                                                training certificate
                                                </div>
                                            </Col>
                                            <Col md={12} xs={12}>
                                                <div className='button-download'>
                                                    <Button fullWidth variant="outlined" color="secondary" classes={{ root: classes.button, label: 'gbui-button-1' }}>
                                                        Training Certificate
                                                    <CloudDownloadIcon className={classes.rightIcon} />
                                                    </Button>
                                                </div>
                                            </Col>
                                            <Col md={12} xs={12}>
                                                <div className='pos-appointment-letter gbui-label-2'>POS Appointment Letter</div>
                                            </Col>
                                            <Col md={12} xs={12}>
                                                <div className='As-per-IRDAI-you-have gbui-caption-1'>
                                                    Congratulation!!! we are providing you groupbima appointment
                                                          letter
                                                </div>
                                            </Col>
                                            <Col md={12} xs={12}>
                                                <div className='button-download'>
                                                    <Button fullWidth variant="outlined" color="secondary" classes={{ root: classes.button, label: 'gbui-button-1' }}>
                                                        POS Appointment Letter
                                                     <CloudDownloadIcon className={classes.rightIcon} />
                                                    </Button>
                                                </div>
                                            </Col>
                                            <Col md={12} xs={12}>
                                                <div className='declaration'>
                                                    <FormControlLabel classes={{ label: classes.label }}
                                                        control={
                                                            <Checkbox
                                                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                                classes={{
                                                                    root: classes.checkbox,
                                                                    checked: classes.checked,
                                                                }}
                                                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                                value="Declaration of Using Groupbima platform"
                                                            />
                                                        }
                                                        label="Declaration of Using Groupbima platform"
                                                    />
                                                </div>
                                            </Col>
                                            <Col md={12} xs={12}>
                                                <div className='confirm-button'>
                                                    <ButtonLightSuccess Text='Confirm' fullWarningPink={true} />
                                                </div>
                                            </Col>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </MuiThemeProvider>
        )
    }
}


PosCertificate.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PosCertificate);

