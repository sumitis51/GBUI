import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import Container from 'muicss/lib/react/container'
import Card from '@material-ui/core/Card'
import ButtonLightSuccess from '../../../Shared/ButtonLightSuccess/index'
import LinearProgress from '@material-ui/core/LinearProgress'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import withMobileDialog from '@material-ui/core/withMobileDialog'

import './index.css'

const styles = theme => ({
    close: {
        padding: theme.spacing.unit / 2,
    },
    barColor:{
        backgroundColor:'#0da176'
    },
});
class UploadDocuments extends Component {
    state = {
        documentRemovalModal: false,
        documentdeleted: false,
    };

    handleClick = () => {
        this.setState({ open: true });
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ documentdeleted: false });
    };

    onClickDocumentRemoval = () => {
        this.setState({
            documentRemovalModal: true,
        })
    }
    handleCloseModal = () => {
        this.setState({
            documentRemovalModal: false
        })
    }
    onDocumentDeleteHandler = () => {
        this.setState({
            documentRemovalModal: false,
            documentdeleted: true,
        })
    }
    render() {
        const { fullScreen, classes } = this.props;
        return (
            <MuiThemeProvider>
                <div className='upload-documents'>
                    <Container fluid={true} className='upload-documents-container'>
                        <Row>
                            <Col md={12} className='upload-documents-card'>
                                <Snackbar
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                    open={this.state.documentdeleted}
                                    autoHideDuration={6000}
                                    onClose={this.handleClose}
                                    ContentProps={{
                                        'aria-describedby': 'message-id',
                                    }}
                                    message={<span id="message-id">Document Removed</span>}
                                    action={[
                                        <IconButton
                                          key="close"
                                          aria-label="Close"
                                          color="inherit"
                                          className={classes.close}
                                          onClick={this.handleClose}
                                        >
                                          <CloseIcon />
                                        </IconButton>,
                                      ]}
                                />
                                <Card square={false} className='card-container'>
                                    <Row>
                                        <Col md={7} className='upload-documents-pic mui--hidden-xs mui--hidden-sm'>
                                            <Col md={12}>
                                                <div className='verify-number gbui-h4'>Upload Documents</div>
                                            </Col>
                                            <Col md={12}>
                                                <div className='pos-documet-upload-pic'>
                                                    <img className='pos-document-pic' alt='document-upload-pic' src='/assets/pos/upload-pos.svg' />
                                                </div>
                                            </Col>
                                        </Col>
                                        <Col md={5} xs={12} className='upload-documents-div'>
                                            <Col md={12} xs={12}>
                                                <div className='upload-documents-heading gbui-h5'>Upload Your Documents</div>
                                            </Col>
                                            <Col md={12} xs={12}>
                                                <div className='upload-documents-subheading gbui-menu-bar-2'>Please upload your documents for verification</div>
                                            </Col>
                                            <Row className='upload-files'>
                                                <Col md={12} xs={12}>
                                                    <div className='upload-files-jpg gbui-menu-bar-2'>Upload files in .pdf, .jpeg, .png</div>
                                                </Col>
                                            </Row>
                                            <Row className='upload-files'>
                                                <Col md={6} xs={6}>
                                                    <div className='upload-passport-size gbui-body-2'>Upload Passport Size</div>
                                                    <div className='photo gbui-subtitle-1'>Photo.jpeg</div>
                                                </Col>
                                                <Col md={6} xs={6}>
                                                    <div className='max-life gbui-body-3'>(Max file size: 5 MB)</div>
                                                    <div className='close-icon' onClick={this.onClickDocumentRemoval}>
                                                        <i class="material-icons" style={{ textAlign: 'right' }}>
                                                            close
                                                            </i>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className='upload-files'>
                                                <Col md={6} xs={6}>
                                                    <div className='upload-passport-size gbui-body-2'>Aadhar card front</div>
                                                    <div className='photo gbui-subtitle-1'>Aadhar.pdf</div>
                                                </Col>
                                                <Col md={6} xs={6}>
                                                    <div className='max-life gbui-body-3'>(Max file size: 5 MB)</div>
                                                    <div className='close-icon' onClick={this.onClickDocumentRemoval}>
                                                        <i class="material-icons" style={{ textAlign: 'right' }}>
                                                            close
                                                            </i>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className='upload-files'>
                                                <Col md={6} xs={6}>
                                                    <div className='upload-passport-size gbui-body-2'>Aadhar card back</div>
                                                    <div className='photo gbui-subtitle-1'>Aadhar.pdf</div>
                                                </Col>
                                                <Col md={6} xs={6}>
                                                    <div className='max-life gbui-body-3'>(Max file size: 5 MB)</div>
                                                    <div className='close-icon' onClick={this.onClickDocumentRemoval}>
                                                        <i class="material-icons" style={{ textAlign: 'right' }}>
                                                            close
                                                            </i>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className='upload-files'>
                                                <Col md={6} xs={6}>
                                                    <div className='upload-passport-size gbui-body-2'>PAN Card</div>
                                                    <div className='photo gbui-subtitle-1'>PAN.jpg</div>
                                                </Col>
                                                <Col md={6} xs={6}>
                                                    <div className='max-life gbui-body-3'>(Max file size: 5 MB)</div>
                                                    <div className='close-icon' onClick={this.onClickDocumentRemoval}>
                                                        <i class="material-icons" style={{ textAlign: 'right' }}>
                                                            close
                                                            </i>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className='upload-files'>
                                                <Col md={8} xs={8}>
                                                    <div className='upload-passport-size gbui-body-2'>Cancelled Cheque</div>
                                                    <div className='photo gbui-subtitle-1' style={{ color: '#000000' }}>Check.jpg</div>
                                                </Col>
                                                <Col md={4} xs={4}>
                                                    <div className='max-life gbui-body-3'>(Max file size: 5 MB)</div>
                                                    <div className='progress-bar'>
                                                        <LinearProgress classes={{ barColorPrimary: classes.barColor }} />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className='upload-files'>
                                                <Col md={8} xs={8}>
                                                    <div className='upload-passport-size gbui-body-2'>Highest Education Certificate</div>
                                                </Col>
                                                <Col md={4} xs={4}>
                                                    <div className='max-life gbui-body-3'>(Max file size: 5 MB)</div>
                                                </Col>
                                            </Row>
                                            <Row className='upload-files'>
                                                <Col md={12} xs={12}>
                                                    <div className='upload-passport-size gbui-body-2'>
                                                        <i class="material-icons"
                                                            style={{ color: '#9c0f46', float: 'left', display: 'inline-block' }}>
                                                            attachment
                                                               <div
                                                                style={{
                                                                    color: '#9c0f46', display: 'inline-block',
                                                                    textAlign: 'left', verticalAlign: 'middle',
                                                                    marginLeft: 3
                                                                }}
                                                                className='gbui-menu-bar-2'>Upload
                                                             </div>
                                                        </i>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className='upload-files'>
                                                <Col md={12} xs={12}>
                                                    <div className='button-confirm-success'>
                                                        <ButtonLightSuccess Text='Save' fullWarningPink={true} />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Card>
                                {/* document remove Dialog */}
                                <Dialog
                                    open={this.state.documentRemovalModal}
                                    onClose={this.handleClose}
                                    maxWidth="sm"
                                    fullScreen={fullScreen}
                                    aria-labelledby="simple-dialog-title">
                                    <DialogContent>
                                        <Row>
                                            <Col md={12}>
                                                <div className='warning-heading h5'>Warning</div>
                                            </Col>
                                            <Col md={12}>
                                                <div className='body-content gbui-body-1 '>Are you sure you want to remove the docuemnt form Aadhar card front?</div>
                                            </Col>
                                            <Col md={6}>
                                                <div className='cancel-button' style={{ textAlign: 'right' }}>
                                                    <ButtonLightSuccess Text='Cancel' midPinkContent={true} />
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className='confirmation-button' >
                                                    <ButtonLightSuccess Text='Continue' onClick={this.onDocumentDeleteHandler} midWarningPink={true} />
                                                </div>
                                            </Col>
                                        </Row>
                                    </DialogContent>
                                </Dialog>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </MuiThemeProvider>
        )
    }
}


UploadDocuments.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)((withMobileDialog({ breakpoint: 'xs' }))(UploadDocuments));
