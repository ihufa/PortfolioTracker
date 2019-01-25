import React, { Component } from 'react'

class Buy extends Component {
    constructor(props){
        super(props)
        this.state = {
            volume: 0,
            timeOfPurchase: 0,
            price: 0,
            currentPrice: 0,
            timeOfSell: "still held"
        }
    }
handleChange = (e) => {
    this.setState({
        volume: e.target.value,
        ticker: this.props.ticker,
        timeOfPurchase: this.props.time,
        price: this.props.price,
        currentPrice: this.props.price,
        id: `${this.props.ticker}+${Date.now()}`

    })
}

handleBuy = (e) => {
    e.preventDefault()
    if(this.state.volume > 0) {this.props.handleBuy(this.state)}
    this.props.modalOK()
}
handleClose = (e) => {
    e.preventDefault()
    console.log(e.target)
    if(e.target.className !== 'modal')
   { this.props.handleClose()}
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
        <div className="modal-form modal" style={modalStyle}>
        <h3 className="modal">{this.props.modalMessage}</h3>
            <div >
                <form ><span className="modal">{this.props.ticker}</span><span className="modal">${this.props.price}</span>
                        <input className="modal" onChange={this.handleChange} type="number" placeholder="Volume"></input> <span className="modal">{Math.round(this.props.price*this.state.volume).toLocaleString()}$</span>
                    <button className="BuyBtn modal-BuyBtn" onClick={this.handleBuy}>Buy</button>
                </form>
            </div>
        </div>
      </div>
    )
  }
}

export default Buy
