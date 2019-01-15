import React, { Component } from 'react'

class buy extends Component {
    constructor(props){
        super(props)
        this.state = {
            volme: 0
        }

    }
  render() {
      const backgroundStyle = {
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0,0,0,0.5)'
      }
      const modalStyle = {
          backgroundColor: '#fff',
          maxWitdh: 250,
          height: 150,
          margin: 'auto',
          position: 'relative'
      }
      const fromStyle = {

      }


    return (
      <div style={backgroundStyle}>
        <div style={modalStyle}>
        <h3>{this.props.modalMessage}</h3>
            <form style={formStyle}>
                <input onChange={this.handleChange} type="number" placeholder="Volume"></input>
                <button onClick={this.handleBuy}>Buy</button>
            </form>
        </div>
      </div>
    )
  }
}

export default buy
