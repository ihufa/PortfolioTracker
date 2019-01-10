import React, { Component } from 'react'

class Watchlist extends Component {
    constructor(props) {
        super(props)
        this.state={
            ticker: '',
            volume: 0
        }
    }

deleteHandler = (e) => {
e.preventDefault()
this.props.deleteStock(e.target.id)
}
showGraphHandler = (e) => {
  e.preventDefault()
  this.props.showGraph(e.target.id)
}

  render() {
    if (Object.keys(this.props.watchlist[0]).length !== 0) {     // dont render if watchlist is empty object
      return (<div>
        <h2>Watchlist</h2>
        <table className="watchlist">
          <thead>
          <tr><th>Stock ticker:</th><th>Price:</th></tr>
          </thead>
          <tbody>{this.props.watchlist.map(asset => 
          (<tr key={asset.ticker}>
            <td className="ticker">{asset.ticker}</td> <td className="price">${asset.prices[asset.prices.length-1]}</td>
            <td><button className="btn" id={asset.ticker} onClick={this.showGraphHandler}>See Graph</button></td>
            <td><button className="btn" id={asset.ticker} onClick={this.buyHandler}>Buy</button></td>
            <td><button className="btn" id={asset.ticker} onClick={this.deleteHandler}>Remove from list</button></td>
            </tr>)
          )}
          </tbody>
        </table>
      </div>
    )}
    else if(this.props.stocks.length > 0) {return (
      <div>
        <h2>Watchlist</h2>
      <table className="watchlist">
        <thead>
          <tr><th>Stock ticker:</th><th>Price:</th></tr>
        </thead>
      <tbody>{this.props.stocks.map(asset =>
        (<tr key={asset.ticker}>
          <td className="ticker">{asset.ticker}</td>
          <td></td><td></td><td><button className="btn" id={asset.ticker} onClick={this.deleteHandler}>Remove from list</button></td>
        </tr>)
      )}
      </tbody>
      </table>
      </div >)
    }
    else { return null}
  }
}

export default Watchlist
