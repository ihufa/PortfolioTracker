import React, { Component } from 'react'

class Error extends Component {

    handleClose = (e) => {
        e.preventDefault()
        console.log(e.target)
        if (e.target.className !== 'modal') { this.props.handleClose() }
    }

    render() {
        const backgroundStyle = {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 100
        }
        const modalStyle = {
            backgroundColor: "#22201e",
            borderRadius: 3,
            border: "2px solid orange",
            width: 450,
            height: 75,
            margin: 'auto',
            marginTop: 250,
            position: 'relative',
            zIndex: 101
        }


        return (
            <div onClick={this.handleClose} style={backgroundStyle}>
                <div className="modal" style={modalStyle}>
                    <h3 className="modal"><span>Too many API requests. You probably refreshed the page and started simulation within one minute. Please wait one minute and try again!<button onClick={this.handleClose}>X</button></span></h3>
                </div>
            </div>
        )
    }
}

export default Error
