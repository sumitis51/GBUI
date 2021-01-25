import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';


class FilterDialog extends Component {
    render() {
        return (
                <Dialog style={{ textAlign: 'center' }}
                    // fullScreen={fullScreen}
                    // maxWidth="md"
                    className='dialogBox'
                    open={this.props.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogContent>
                            <div className='notAble mui--hidden-xs '>
                                Snap!! We are not able to fetch your car details. Please select your car details.
                            </div>
                    </DialogContent>

                </Dialog>
        );
    }
}

export default FilterDialog;