import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import PropTypes from 'prop-types'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import DialogContent from '@material-ui/core/DialogContent'

import './additional.css'

class AdditionCoverDialog extends React.Component {


    state={
    }


    render() {
        const { fullScreen } = this.props;
        return (
            <div className="additional-cover-parent">
                <Dialog
                    fullScreen={fullScreen}
                    open={this.props.open}
                    onClose={this.props.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogContent>
                        <div className="additional-content">
                            <h3 className="additional-cover-heading">
                                Additional covers for your car
                            </h3>
                            <p className="sub-line">
                                Add additional cover values to fully secure everything about your car.
                            </p>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}


AdditionCoverDialog.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
}
  
export default withMobileDialog()(AdditionCoverDialog)
