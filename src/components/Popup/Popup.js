import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import PropTypes from 'prop-types';
import './Popup.css';
import Stepper from '../Stepper/Stepper';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { connect } from 'react-redux';

class SimpleDialog extends Component {
    render() {
        const getSteps = ['Car','Fuel','Model','Registration Year'];
        const { fullScreen } = this.props;
        if (this.props.show) {
            return (
                <div>
                    <Dialog style={{ textAlign: 'center' }}
                        fullScreen={fullScreen}
                        maxWidth="md"
                        className='dialogBox'
                        open={this.props.show}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogContent>
                            {(!this.props.pfs && !this.props.show_bought_new_car) && 
                                <div className='notAble mui--hidden-xs '>
                                    Snap!! We are not able to fetch your car details. Please select your car details.
                                </div>
                            }
                            <Stepper getSteps={getSteps}/>
                        </DialogContent>

                    </Dialog>
                </div>
            )
        } else {
            return (
                null
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        pfs: state.popup.popup_forgot_show,
        show_bought_new_car: state.popup.popup_bought_new_car
    };
};
SimpleDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    fullScreen: PropTypes.bool.isRequired,
};

export default  connect(mapStateToProps)(withMobileDialog({breakpoint: 'xs'})(SimpleDialog));




