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
  if (this.state.ticker !== '')
  {this.props.addStock(this.state)}
}

updateHandler = (e) => {
  e.preventDefault()
  this.props.updateStocks()
}

addFive = (e) => {
  e.preventDefault()
  this.setState({
    stocks: [{ ticker: 'TSLA' }, { ticker: 'AAPL' }, { ticker: 'GOOGL' }, { ticker: 'AMZN' }, { ticker: 'M&M' }]
  })
  this.props.addFive()
}
  render() {
    return (
      <div className="stockadder">
      <h2>Watchlist</h2>
        <form>
            <input type="text" onChange={this.handleChangeTick} placeholder="Add up to 5 assets..." id="stockticker">                                   
            </input>
            {/*<input type="number" onChange={this.handleChangeVolume}placeholder="Volume..." id="volume">
            </input>*/}
            <button className="fromBtn Btn" type="submit" onClick={this.submitHandler}>Add</button>
          <button className="fromBtn Btn" onClick={this.addFive}>Im feeling lucky</button>
            <br></br>
          {!(this.props.stocks.length > 0) ? <button className="startsimBtnNo" >Start simulator</button> : <button className="startsimBtnReady Btn" onClick={this.updateHandler}>Start simulator</button>}
        </form> 
      </div>
    )
  }
}

export default Stockadder
