import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core'
import Row from 'muicss/lib/react/row'
import Col from 'muicss/lib/react/col'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import './index.css'
import UploadDocuments from './upload-documents/index'
import SuccessfullySharedDocuments from './succeefully-shared-documents/index'
import UnapprovedDocuments from './unapproved-documents/index'
import PosTraining from './pos-training/index'


const styles = theme => ({
    line: {
        height: '2px',
        backgroundColor: '#aaaaaa',
    },
    line1: {
        height: '2px',
        backgroundColor: '#0da176',
    },
    line2: {
        height: '2px',
        backgroundColor: '#aaaaaa',
    },
});

class PosUploadDocuments extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className='pos-upload-documents'>
                <MuiThemeProvider>
                    <Row>
                        <Col md={12} xs={12} className='stepbar-row'>
                            <Col md={5} xs={5} className='line-column'>
                                <div className='upload-documents gbui-body-1'>
                                    Upload Documents
                                </div>
                            </Col>
                            <Col md={1} xs={2}>
                                <hr className={classes.line} />
                            </Col>
                            <Col md={5} xs={5} className='line-column'>
                                <div className='training gbui-body-1'>
                                    Training & Examination
                                </div>
                            </Col>
                        </Col>
                        <Col md={12} xs={12} className='line-row'>
                            <Col md={5} xs={5} className='line-column'>
                                <Divider className={classes.line1} />
                            </Col>
                            <Col md={7} xs={7} className='line-column'>
                                <Divider className={classes.line2} />
                                {/* <Divider className={classes.line1} /> */}
                            </Col>
                        </Col>
                        <Col md={12} xs={12}>
                            {/* <UploadDocuments /> */}
                            {/* <SuccessfullySharedDocuments /> */}
                            {/* <UnapprovedDocuments /> */}
                            <PosTraining />
                        </Col>
                    </Row>
                </MuiThemeProvider>
            </div>
        )
    }
}


PosUploadDocuments.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PosUploadDocuments);
