import React from 'react';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
// import './uploadCv.css';
import axios from 'axios';
import { connect } from 'react-redux';
import constants from '../../constants/appConstants.json'


import './index.css'

const styles = theme => ({
    cssLabel: {
        fontFamily: 'Source Sans Pro',
        fontSize: '16px',
        color: '#aaaaaa',
        '&$cssFocused': {
            color: 'rgba(0,0,0,.87)',
        },
    },
    cssFocused: {},
    cssUnderline: {
        '&:after': {
            borderBottomColor: 'rgba(0,0,0,.87)',
        },
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: 'rgba(0,0,0,.87)',
        },
    },
    errored: {
    },
    backdrop: {
        backgroundColor: "transparent"
    },
    inputLabel: {
        fontFamily: 'Source Sans Pro',
        fontSize: '16px',
        color: '#aaaaaa'
    }
});
class FormCV extends React.Component {

    constructor(props) {
        super(props);
        this.fileName = 'Nopes';
        this.state = {
            fileName: 'Nothing',
            showFileName: false,
            name: '',
            email: '',
            disabled: false,
            errorName: false,
            errorEmail: false,
            errorNameMessage: '',
            errorEmailMessage: '',
            init: false,
            errorFile: true,
            errorFileMessage: '',
            ThankYouNote: false,
            uploadState: 'Upload resume'
        };
    }
    componentWillMount() {
        this.setState({ showFileName: false })
    }
    triggerFileUpload() {
        document.getElementById(`fileUpload${this.props.formId}`).click();
    }
    handleFileUpload = () => {
        let txt = ""; //eslint-disable-line
        const _validFileExtensions = [".jpeg", ".pdf", ".doc", ".docx"];
        const x = document.getElementById(`fileUpload${this.props.formId}`);
        if ('files' in x) {
            if (x.files.length === 0) {
                txt = "Select one or more files.";
                // this.setState({errorFile: true, errorFileMessage: 'Please upload resume'})

            }
            else {
                for (var i = 0; i < x.files.length; i++) {
                    txt += "<br><strong>" + (i + 1) + ". file</strong><br>";
                    var file = x.files[i];
                    if ('name' in file) {
                        txt += "name: " + file.name + "<br>";
                      
                        this.fileName = file.name;
                        this.setState({ fileName: file.name, uploadState: 'Resume Uploaded' });
                        // this.setState({errorFile: false, errorFileMessage: ''})
                    }
                    if ('size' in file) {
                        txt += "size: " + file.size + " bytes <br>";
                    }
                    if (file.size > 2e+7) {
                        this.setState({
                            errorFileMessage: 'File size exceeds more than 20 MB'
                        })
                    }
                    else {
                        for (var j = 0; j < _validFileExtensions.length; j++) {
                            var sCurExtension = _validFileExtensions[j].split('.').pop().toLowerCase();
                            let Extension = x.value.split('.').pop().toLowerCase();
                            if (Extension === sCurExtension) {
                                this.setState({
                                    showFileName: true,
                                    errorFileMessage: ' '
                                });
                                break;
                            }
                            else {
                                this.setState({
                                    errorFileMessage: 'Allowable formats are doc, docx, pdf ( correct HTML)'
                                })
                            }
                        }
                    }
                }
            }
        }
    }
    removeFile() {
        document.getElementById(`fileUpload${this.props.formId}`).value = null;
        this.setState({ showFileName: false, fileName: '' });
        // this.setState({errorFile: true, errorFileMessage: 'Please upload resume'})
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
        if (name === 'name') {
            // if (this.state.init && this.checkName() && this.checkEmail()) this.setState({disabled: false})
            // else this.checkName()
            this.checkName()
        }
        if (name === 'email') {
            // if (this.state.init && this.checkEmail() && this.checkName()) this.setState({disabled: false})
            // else this.checkEmail()
            this.checkEmail()
        }


    };
    checkEmail() {
        /*eslint-disable no-useless-escape*/
        if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email)) {
            this.setState({ errorEmail: false, errorEmailMessage: '' })
            return true
        } else {
            this.setState({
                errorEmail: true,
                errorEmailMessage: 'Please enter valid email address'
            })
            return false
        }
    }

    checkName() {
        if (this.state.name === '' || this.state.name.length < 2) {
            this.setState({
                errorName: true,
                errorNameMessage: 'Please enter more than 2 characters'
            })
            return false
        } else {
            this.setState({ errorName: false, errorNameMessage: '' })
            return true
        }
    }
    submit() {
        this.checkEmail()
        this.checkName()
        // if (this.errorFile) this.setState({errorFileMessage: 'Please upload resume'})
        if (this.checkEmail() && this.checkName()) {
            // alert('submitted')
            // const obj = {
            //     authtoken: 'f3fa740872a77430c357a913e587eac6',
            //     scope: 'recruitapi',
            //     duplicateCheck: 2,
            //     version: 4,
            //     xmlData: '<Candidates><row no="1"><FL val="Current employer"><![CDATA[VS%26Co]]></FL><FL val="First Name">John</FL><FL val="Last Name">Gossling</FL><FL val="Email">john@zohocorp.com</FL></row></Candidates>',
            // };
            const obj = {
                email: this.state.email,
                name: this.state.name
            }
            let form_data = new FormData();

            for (let key in obj) {
                form_data.append(key, obj[key]);
            }
            form_data.append('file', document.getElementById(`fileUpload${this.props.formId}`).files[0]);
           
            axios.post(`${constants.apiRootURL}/careers/apply`, form_data, { headers: { 'Content-Type': 'multipart/form-data' } })
                .then((response) => {
                    this.setState({ ThankYouNote: true })
                }, (error) => {
                    
                });

        } else {
            alert('Rectify all errors')
        }
    }
    handleClose = () => {
        this.props.onCvUpload(false)
        document.getElementById(`fileUpload${this.props.formId}`).value = null;
        this.setState({
            showFileName: false, fileName: '', name: '', email: '', disabled: false,
            errorName: false,
            errorEmail: false,
            errorNameMessage: '',
            errorEmailMessage: '',
            uploadState: 'Upload resume'
        });
        //document.body.style.overflow = 'auto'
    }
    render() {
        const { fullScreen, classes } = this.props;
        return (
            <Dialog aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullScreen={fullScreen}
                maxWidth='md'
                open={this.props.onSelectCvUpload}
                onClose={this.handleClose}
                BackdropProps={{
                    classes: {
                        root: classes.backdrop
                    }
                }}>
                <DialogContent style={{ overflowX: 'hidden' }}>
                    {this.state.ThankYouNote === false ?
                        <Row className='uploadCv'>
                            <Col md={10} xs={10} className='userExpDesigns gbui-subtitle-1'>
                                {this.props.Key === 1 && 'LEAD JAVA DEVELOPER'}
                                {this.props.Key === 2 && 'JAVA DEVELOPER'}
                                {this.props.Key === 3 && 'FRONT END DEVELOPER'}
                            </Col>
                            <Col md={2} xs={2}>
                                <i onClick={() => this.props.onCvUpload(false)}
                                    class="material-icons" style={{
                                        color: '#333333', float: 'right',
                                        verticalAlign: 'middle', cursor: 'pointer'
                                    }}>
                                    close
                                </i>
                            </Col>
                            <Col md="12" xs={12} className='exp gbui-body-2'>
                                {this.props.Key === 1 && 'Experience:-5 Years'}
                                {this.props.Key === 2 && 'Experience:-2 Years'}
                                {this.props.Key === 3 && 'Experience:-2 Years'}
                            </Col>
                            <Col md="12" xs={12} className='responsibilities gbui-body-1'>
                                Roles and responsibilities:
                            </Col>
                            {this.props.Key === 3 &&
                                <div>
                                    <Col md={12}>
                                        <div className='details gbui-body-1'>
                                            • Developing new user-friendly features using React.js
                                       </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='details gbui-body-1'>
                                            • Building reusable components and front-end libraries for future use
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='details gbui-body-1'>
                                            • Translating designs and wireframes into high quality code
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='details gbui-body-1'>
                                            • Optimizing components for maximum performance across a vast array of web-capable devices and browsers.
                                        </div>
                                    </Col>
                                    <Col md="12" xs={12} className='skills-required gbui-body-1'>
                                        Skill required:
                                    </Col>
                                    <Col md={12}>
                                        <div className='details gbui-body-1'>
                                            •	MVVM framework like Angular 4/5 (Component based architecture similar to react)  or Vue.
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='details gbui-body-1'>
                                            •	Familiarity with nosql databases like Mongo db/ Redis and relational databases like Mysql/SQL/Oracle etc.
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='details gbui-body-1'>
                                            •	A performer and team player who enjoys challenging assignments in a high-energy, fast growing and start-up workplace.
                                        </div>
                                    </Col>
                        
                                </div>
                            }
                            {this.props.Key === 2 &&
                                <div>
                                    <Col md={12}>
                                        <div className='details gbui-body-1'>
                                            • Build high availability and extremely reliable high volume transactional systems.
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='details gbui-body-1'>
                                            •  Deliver reliable solutions that handle massive data and high traffic.
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='details gbui-body-1'>
                                            •  Complete ownership and problem-free execution of owned modules and solutions.
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='details gbui-body-1'>
                                            •  Focus on code optimisation, code quality and maintenance etc.
                                        </div>
                                    </Col>

                                    <Col md="12" xs={12} className='skills-required gbui-body-1'>
                                        Skill required:
                                    </Col>
                                    <Col md={12}>
                                        <div className='details gbui-body-1'>
                                            •	MS or BS/B.Tech in computer science or equivalent experience.
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='details gbui-body-1'>
                                            •	Hands-on experience in Core J2EE or Core Java (collection, Multi-threading).
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='details gbui-body-1'>
                                            •	Proficiency in Spring, Hibernate, JDBC, JSP, Servlets.
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='details gbui-body-1'>
                                            •	Strong working knowledge of Databases – MySQL/NoSQL, OS - Linux/Ubuntu.
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='details gbui-body-1'>
                                            •	Experience and knowledge of open source tools & frameworks, broader cutting edge technologies around server side development.

                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='details gbui-body-1'>
                                            •	Excellent data structure & algorithm and problem solving skills.
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='details gbui-body-1'>
                                            •	An active contributor to developer communities like Stackoverflow, Topcoder, Github, Google Developer Groups (GDGs).
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='details gbui-body-1'>
                                            •	A performer and team player who enjoys challenging assignments in a high-energy, fast growing and start-up workplace.
                                        </div>
                                    </Col>
                                        </div>}
                                {this.props.Key === 1  &&
                                <div>
                                   <Col md={12}>
                                        <div className='details gbui-body-1'>
                                            • Build high availability and extremely reliable high volume transactional systems.
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='details gbui-body-1'>
                                            •  Deliver reliable solutions that handle massive data and high traffic.
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='details gbui-body-1'>
                                            •  Complete ownership and problem-free execution of owned modules and solutions.
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='details gbui-body-1'>
                                            •  Focus on code optimisation, code quality and maintenance etc.
                                        </div>
                                    </Col>
                                    <Col md="12" xs={12} className='skills-required gbui-body-1'>
                                        Skill required:
                                    </Col>
                                    <Col md={12}>
                                        <div className='details gbui-body-1'>
                                            •	MS or BS/B.Tech in computer science or equivalent experience.
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='details gbui-body-1'>
                                            •	Hands-on experience in Core J2EE or Core Java (collection, Multi-threading).
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='details gbui-body-1'>
                                            •	Proficiency in Spring, Hibernate, JDBC, JSP, Servlets.
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='details gbui-body-1'>
                                            •	Strong working knowledge of Databases – MySQL/NoSQL, OS - Linux/Ubuntu.
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='details gbui-body-1'>
                                            •	Experience and knowledge of open source tools & frameworks, broader cutting edge technologies around server side development.

                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='details gbui-body-1'>
                                            •	Excellent data structure & algorithm and problem solving skills.
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='details gbui-body-1'>
                                            •	An active contributor to developer communities like Stackoverflow, Topcoder, Github, Google Developer Groups (GDGs).
                                        </div>
                                    </Col>
                                    <Col md={12}>
                                        <div className='details gbui-body-1'>
                                            •	A performer and team player who enjoys challenging assignments in a high-energy, fast growing and start-up workplace.
                                        </div>
                                    </Col>
                                </div>}

                            <Col sm="5" md="5" xs="12">
                                <FormControl className={classes.margin} fullWidth>
                                    <InputLabel
                                        htmlFor="name"
                                        classes={{
                                            root: classes.cssLabel,
                                            focused: classes.cssFocused,
                                            error: classes.errored
                                        }}
                                        style={{ color: this.state.errorName ? 'red' : '' }}
                                    >
                                        Name
                                    </InputLabel>
                                    <Input
                                        id="name"
                                        classes={{
                                            underline: classes.cssUnderline,
                                            // label:classes.inputLabel
                                        }}
                                        value={this.state.name}
                                        // label="Name"
                                        fullWidth={true}
                                        required={true}
                                        error={this.state.errorName}
                                        onChange={this.handleChange('name')}
                                        onBlur={this.checkName.bind(this)}
                                    />
                                </FormControl>
                                {/* <TextField
                                    id={`name${this.props.formId}`}
                                    
                                    inputProps={

                                    } /> */}
                                {/* <p style={{ color: 'red', marginTop: '0.8rem' }}>{this.state.errorNameMessage}</p> */}
                                <input type="file" id={`fileUpload${this.props.formId}`} onChange={this.handleFileUpload} style={{ display: 'none' }} />
                            </Col>
                            <Col sm="7" md="7" >
                                <p className='upload-icon'>
                                    <span style={{ cursor: 'pointer' }} onClick={this.triggerFileUpload.bind(this, this.props.formId)}><Icon style={{ color: '#ea0b4b', marginBottom: '-7px' }}>attachment</Icon>
                                        &nbsp;<span style={{ color: '#ea0b4b', fontSize: '16px' }}>{this.state.uploadState}</span></span>
                                    {this.state.showFileName && <div style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}><span>
                                        <span style={{
                                            fontSize: '16px', marginLeft: '0rem'
                                        }}>{this.state.fileName}</span>
                                        <Icon style={{ marginLeft: '1rem', marginBottom: '-7px', cursor: 'pointer' }} onClick={this.removeFile.bind(this)}>close</Icon>
                                    </span></div>}
                                </p>
                                <p className='gbui-caption-2 max-file-size'>Max File size 20 MB. Jpeg,PDF, Doc, Docx</p>
                                <p className='gbui-caption-2 max-file-size' style={{ fontFamily: 'Nunito', fontSize: '10px', color: '#ea0b4b' }}>{this.state.errorFileMessage}</p>
                            </Col>
                            <Col sm="5" md="5" xs="12">
                                <FormControl className={classes.margin} fullWidth>
                                    <InputLabel
                                        htmlFor="email"
                                        classes={{
                                            root: classes.cssLabel,
                                            focused: classes.cssFocused,
                                            error: classes.errored
                                        }}
                                        style={{ color: this.state.errorEmail ? 'red' : '' }}
                                    >
                                        Email Id
                                    </InputLabel>
                                    <Input
                                        id="email"
                                        classes={{
                                            underline: classes.cssUnderline,
                                        }}
                                        value={this.state.email}
                                        fullWidth={true}
                                        required={true}
                                        error={this.state.errorEmail}
                                        onChange={this.handleChange('email')}
                                        onBlur={this.checkEmail.bind(this)}
                                    />
                                </FormControl>
                                {/* <TextField
                                    id={`emailId${this.props.formId}`}
                                    label="Email Id"
                                    fullWidth={true}
                                    required={true}
                                    error={this.state.errorEmail}
                                    onChange={this.handleChange('email')}
                                    onBlur={this.checkEmail.bind(this)} /> */}
                                <p style={{ color: 'red', marginTop: '0.8rem' }}>{this.state.errorEmailMessage}</p>
                            </Col>
                            <Col md={3}></Col>
                            <Col sm="4" md="4" xs="12">
                                {!this.state.disabled &&
                                    <button
                                        className="smallWarning fullWidth apply-button"
                                        onClick={this.submit.bind(this)}>APPLY NOW</button>
                                }
                                {this.state.disabled &&
                                    <button className="button button-success" style={{ 'float': 'right', margin: '0rem', cursor: 'not-allowed', opacity: '0.6' }} disabled>Submit</button>
                                }
                            </Col>
                        </Row>:''}
                    {this.state.ThankYouNote &&
                        <Row className='thank-you-for-uploading-cv'>
                            <Col md="12" xs={12} >
                                <div className='gb-logo' style={{ display: 'inline' }}>
                                    <img className='GBlogo1' src="/assets/logo.svg" alt="GB Logo" />
                                    <img className='GBlogo2' hspace='14px' src="/assets/logotext.svg" alt="GB Logo" />
                                </div>
                                <div style={{ display: 'inline', color: '#333333', float: 'right', }} className='close-icon'>
                                    <i onClick={() => this.props.onCvUpload(false)} class="material-icons" style={{ verticalAlign: 'middle' }}>
                                        close
                                    </i>
                                </div>
                            </Col>
                            {/* <Col md="3" xs={3}>
                                <i onClick={() => this.props.onCvUpload(false)} class="material-icons" style={{ color: '#333333', float: 'right', verticalAlign: 'middle' }}>
                                    close
                                </i>
                            </Col> */}
                            <Col xs={12}>
                                <div className='thank-you-image'>
                                    <img src="assets/HomePage/thankYou.svg" className='mainPic' alt='livesoon' />
                                </div>
                            </Col>
                            <Col md={12}>
                                <div className='thank-you gbui-body-1'>
                                    Thank you for submiiting your resume.
                                      We will get back to you shortly
                                </div>
                            </Col>
                        </Row>}
                </DialogContent>
            </Dialog>
        )
    }
}

FormCV.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => {
    return {
        onSelectCvUpload: state.popup.form_cv_upload
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCvUpload: (value) => dispatch({ type: 'FORM_CV_UPLOAD', value }),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withMobileDialog({ breakpoint: 'xs'})(withStyles(styles)(FormCV)))