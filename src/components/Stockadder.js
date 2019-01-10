import React, { Component } from 'react'

class Stockadder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ticker: '',
            volume: 0
        }
    }
  

  handleChangeTick= (e) => {
    this.setState({ticker: e.target.value})
  }
  handleChangeVolume = (e) => {
    this.setState({ volume: e.target.value })
  }

submitHandler = (e) => {
  e.preventDefault()
  this.props.addStock(this.state)
}

updateHandler = (e) => {
  e.preventDefault()
  this.props.updatePortfolio()
}
  render() {
    return (
      <div className="stockadder">
        <form>
            <input type="text" onChange={this.handleChangeTick} placeholder="Add Asset..." id="stockticker">                                   
            </input>
            {/*<input type="number" onChange={this.handleChangeVolume}placeholder="Volume..." id="volume">
            </input>*/}
            <button type="submit" onClick={this.submitHandler}>Add to watchlist</button>
            <button onClick={this.updateHandler}>Update watchlist</button>
        </form> 
      </div>
    )
  }
}

export default Stockadder
