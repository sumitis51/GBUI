import React from 'react'
import './index.css'
class ButtonLightSuccess extends React.Component {
    render() {
        if (this.props.midWidth) {
            return (
                <button onClick={this.props.onClick} disabled={this.props.disabled} className="button button-success midWidth">{this.props.Text}</button>
            )
        } else if (this.props.fullWidth) {
            return (
                <button onClick={this.props.onClick} disabled={this.props.disabled} className="button button-success fullWidth">{this.props.Text}</button>
            )
        } else if (this.props.fullContent) {
            return (
                <button onClick={this.props.onClick} disabled={this.props.disabled} className="button content fullWidth">{this.props.Text}</button>
            )
        } else if (this.props.content) {
            return (
                <button onClick={this.props.onClick} disabled={this.props.disabled} className="button content">{this.props.Text}</button>
            )

        } else if (this.props.outlined) {
            return (
                <button onClick={this.props.onClick} disabled={this.props.disabled} className="button button-success-outlined">{this.props.Text}</button>
            )
        } else if (this.props.midContent) {
            return (
                <button onClick={this.props.onClick} disabled={this.props.disabled} className="button midContent ">{this.props.Text}</button>
            )
        } else if (this.props.smallWidth) {
            return (
                <button onClick={this.props.onClick} disabled={this.props.disabled} className="contentPink smallWidth ">{this.props.Text}</button>
            )
        } else if (this.props.buttonText) {
            return (
                <button onClick={this.props.onClick} disabled={this.props.disabled} className="buttonText button-success ">{this.props.Text}</button>
            )
        } else if (this.props.buttonTextFull) {
            return (
                <button onClick={this.props.onClick} disabled={this.props.disabled} className="buttonTextFull fullWidth button-success ">{this.props.Text}</button>
            )
        }
        else if (this.props.MidSuccessWidth) {
            return (
                <button onClick={this.props.onClick} disabled={this.props.disabled} className="button MidSuccessWidth">{this.props.Text}</button>
            )
        }
        else if (this.props.fullPinkContent) {
            return (
                <button onClick={this.props.onClick} disabled={this.props.disabled} className="button pinkContent fullWidth">{this.props.Text}</button>
            )
        }
        else if (this.props.midWarningPink) {
            return (
                <button onClick={this.props.onClick} disabled={this.props.disabled} className="button midWarning midWidth">{this.props.Text}</button>
            )
        }
        else if (this.props.midWarningYellow) {
            return (
                <button onClick={this.props.onClick} disabled={this.props.disabled} className="button midWarningYellow midWidth">{this.props.Text}</button>
            )
        }
        else if (this.props.fullWarningPink) {
             return (
                 <button onClick={this.props.onClick} disabled={this.props.disabled}  className="button midWarning fullWidth">{this.props.Text}</button>
             )
        }
        else if (this.props.smallWarningPink) {
            return (
                <button onClick={this.props.onClick} disabled={this.props.disabled}  className="button smallWarning fullWidth">{this.props.Text}</button>
            )
       }
        else if (this.props.contentPink) {
            return (
                <button onClick={this.props.onClick} disabled={this.props.disabled} className="button contentPink fullWidth">{this.props.Text}</button>
            )
        }
        else if (this.props.midPinkContent) {
            return (
                <button onClick={this.props.onClick} disabled={this.props.disabled} className="button midWidth pinkContent">{this.props.Text}</button>
            )
        }
        else if (this.props.RoundButton) {
            return (
                <button onClick={this.props.onClick} disabled={this.props.disabled} className=" button-success RoundButton">{this.props.Text}</button>
            )
        }
        else if (this.props.warning) {
            return (
                <button onClick={this.props.onClick} disabled={this.props.disabled} className=" button warning">{this.props.Text}</button>
            )
        }
        else if (this.props.fullWarning) {
            return (
                <button onClick={this.props.onClick} disabled={this.props.disabled} className=" button warning fullWidth">{this.props.Text}</button>
            )
        }
        else if (this.props.feedbackWarning) {
            return (
                <button onClick={this.props.onClick} disabled={this.props.disabled} className=" feedbackwarning ">{this.props.Text}</button>
            )
        }
        else if (this.props.feedbacksubmit) {
            return (
                <button onClick={this.props.onClick} disabled={this.props.disabled} className=" feedbacksubmit">{this.props.Text}</button>
            )
        }
        else if (this.props.feedbackmessage) {
            return (
                <button onClick={this.props.onClick} disabled={this.props.disabled} className=" feedbackmessage">{this.props.Text}</button>
            )
        } else if (this.props.feedbackdisabled) {
            return (
                <button onClick={this.props.onClick} disabled={this.props.disabled} className=" feedbackdisabled">{this.props.Text}</button>
            )
        }
        else if (this.props.warningContent) {
            return (
                <button onClick={this.props.onClick} disabled={this.props.disabled} className=" button warning-content">{this.props.Text}</button>
            )
        }
        else if (this.props.midWarning) {
            return (
                <button onClick={this.props.onClick} disabled={this.props.disabled} className=" button midWarning fullWidth">{this.props.Text}</button>
            )
        }
        else if (this.props.outlinePink) {
            return (
                <button onClick={this.props.onClick} disabled={this.props.disabled} className="button button-pink-outlined fullWidth">{this.props.Text}</button>
            )
        }
        else {
            return (
                <button onClick={this.props.onClick} disabled={this.props.disabled} className="button button-success">{this.props.Text}</button>
            )
        }
    }
}

export default ButtonLightSuccess;
