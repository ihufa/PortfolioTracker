import React, { Component } from 'react'

class Portfolio extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ticker: '',
            volume: 0
        }
    }

    sellHandler = (e) => {
        e.preventDefault()
        this.props.sellStock(e.target.id)
    }

results
    render() {
        const redStyle = {
            color: '#f44242'
        }
        const greenStyle = {
            color: '#28af16'
        }

        if (this.props.portfolio.length > 0) {
            return (
                <div className="watchlist-wrap">
                <h2>Portfolio</h2>
                <table >
                    <thead>
                        <tr><th>Purchased(EST)</th><th>Stock</th><th>Volume</th><th>Purchase Price</th><th>Current Price</th>
                        <th>Value</th> <th>yield %</th> <th>yield $</th></tr>
                    </thead>
                    <tbody>{this.props.portfolio.map(asset =>
                        (<tr key={asset.ticker}>
                            <td>{asset.timeOfPurchase}</td><td>{asset.ticker}</td><td>{asset.volume}</td><td>${asset.price}</td><td>${asset.currentPrice}</td>
                            <td>${(Math.round(100 * asset.currentPrice * asset.volume)) / 100}</td>
                            <td id="results1" >%{(Math.round(100 * 100 * (asset.currentPrice / asset.price - 1))) /100}</td>
                            <td style={greenStyle} id="results2">${(Math.round(100 * (asset.currentPrice * asset.volume - asset.price * asset.volume))) / 100}</td>
                            <td><button className="Btn" id={asset.ticker} onClick={this.sellHandler}>Sell</button></td>
                        </tr>)
                    )}
                        </tbody>
                    </table>
                    <table>
                        <tbody>
                            <h2>Portfolio Summary</h2>
                            <tr><th>$ Invested</th><th>Current Value</th><th>yield %</th><th>yield $</th></tr>
                    </tbody>
                </table>
                </div>
            )
        }
        else return (<div className="watchlist-wrap"><h2>Portfolio is empty</h2></div>)
    }
}

export default Portfolio
//style = if((asset.currentPrice / asset.price - 1) > 0) { redStyle }