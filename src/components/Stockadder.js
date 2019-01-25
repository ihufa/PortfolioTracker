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
  let stocksArr = this.props.stocks.map(item => item.ticker)
  if (this.state.ticker !== '' && stocksArr.indexOf(this.state.ticker) === -1)
  {this.props.addStock(this.state)}
}

updateHandler = (e) => {
  e.preventDefault()
  this.props.updateStocks()
}

addFive = (e) => {
  e.preventDefault()
  this.setState({
    stocks: [{ ticker: 'TSLA' }, { ticker: 'AAPL' }, { ticker: 'GOOGL' }, { ticker: 'AMZN' }, { ticker: 'NVO' }]
  })
  this.props.addFive()
}
disabledBtnHandler= (e) => {
  e.preventDefault()
}
  render() {
    return (
      <div className="stockadder watchlist-inside-wrap">
      <h2>Watchlist</h2>
        <form>
            <input type="text" onChange={this.handleChangeTick} placeholder="Add up to 5 assets..." id="stockticker">                                   
            </input>
            <button className="fromBtn Btn" type="submit" onClick={this.submitHandler}>Add</button>
          <button className="fromBtn Btn" onClick={this.addFive}>Im feeling lucky</button>
            <br></br>
          {!(this.props.stocks.length > 0) ? <button className="startsimBtnNo" onClick={this.disabledBtnHandler} >Start simulator</button> : <button className="startsimBtnReady Btn" onClick={this.updateHandler}>Start simulator</button>}
        </form> 
      </div>
    )
  }
}

export default Stockadder
