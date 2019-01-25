import React, { Component } from 'react'

class SellConfirmation extends Component {

    handleClose = (e) => {
        e.preventDefault()
        console.log(e.target)
        if (e.target.className !== 'modal') { this.props.sellReject() }
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
                    <h3 className="modal"><span>Are you sure you want to sell {this.props.stock.volume} {this.props.stock.ticker} stocks for <span className="green">{(this.props.stock.price * this.props.stock.volume).toLocaleString("en")}</span>?<br></br><button className="Btn" onClick={this.props.sellApproved}>Yes</button><button className="Btn" onClick={this.props.sellReject}>No</button></span></h3>
                </div>
            </div>  
        )
    }
}

export default SellConfirmation
