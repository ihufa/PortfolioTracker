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
            backgroundColor: 'rgba(0,0,0,0.5)'
        }
        const modalStyle = {
            backgroundColor: '#fff',
            width: '70%',
            height: 150,
            margin: 'auto',
            marginTop: 250,
            position: 'relative'
        }


        return (
            <div onClick={this.handleClose} style={backgroundStyle}>
                <div className="modal" style={modalStyle}>
                    <h3 className="modal">{this.props.modalMessage}<span><button onClick={this.handleClose}>X</button></span></h3>
                </div>
            </div>
        )
    }
}

export default Error
