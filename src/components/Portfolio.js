import React, { Component } from 'react'

class Portfolio extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ticker: '',
            volume: 0
        }
    }

    deleteHandler = (e) => {
        e.preventDefault()
        this.props.deleteStock(e.target.id)
    }

    render() {
        if (this.props.portfolio.length > 0) {
            return (
                <table className="portfolio">
                    <thead>
                        <tr><th>Stock ticker</th>   <th>Volume</th>   <th>$</th>    <th>yield</th>    <th>yield %</th>    </tr>
                    </thead>
                    <tbody>{this.props.portfolio.map(asset =>
                        (<tr key={asset.ticker}>
                            <td className="ticker">{asset.ticker}</td>   <td className="volume">{asset.volume}</td>   <td className="$">{asset.volume}</td>
                            <td><button className="btn" id={asset.ticker} onClick={this.deleteHandler}>See Graph</button></td>
                            <td><button className="btn" id={asset.ticker} onClick={this.buyHandler}>Buy</button></td>
                            <td><button className="btn" id={asset.ticker} onClick={this.deleteHandler}>Sell</button></td>
                        </tr>)
                    )}
                    </tbody>
                </table>
            )
        }
        else {
            return (
                <table className="portfolio">
                    <thead>
                        <tr><th>Stock ticker</th>   <th>Volume</th>   <th>$</th>    <th>yield</th>    <th>yield %</th>    </tr>
                    </thead>
                    <tbody>{this.props.stocks.map(asset =>
                        (<tr key={asset.ticker}>
                            <td className="ticker">{asset.ticker}</td>   <td className="volume">{asset.volume}</td>   <td className="$">{asset.volume}</td>
                            <td></td><td></td><td><button className="btn" id={asset.ticker} onClick={this.deleteHandler}>Remove</button></td>
                        </tr>)
                    )}
                    </tbody>
                </table>)
        }
    }
}

export default Portfolio
