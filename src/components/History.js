import React, { Component } from 'react'

class History extends Component {
constructor(props) {
    super(props)
    this.state = {
        toggleOn: false
    }
    
}
toggleSwitch = () => {
    this.setState({
        toggleOn: !this.state.toggleOn
    })
}


    render() {
        let totalInvested = (this.props.history.map(item => item.price*item.volume)).reduce((a, b) => a + b, 0)
        let totalCurrentValue = (this.props.history.map(item => item.currentPrice * item.volume)).reduce((a, b) => a + b, 0)

        if (!this.state.toggleOn) { return (<div className="closed-history" >
            <h2><span className="toggler" onClick={this.toggleSwitch}> + </span><span>History</span></h2>
        </div>)
        }
        else if (this.state.toggleOn && this.props.history.length !== 0) {
            let history = this.props.history
            return (
            <div className="watchlist-wrap">
                <div className="watchlist-inside-wrap">
                    <h2><span className="toggler" onClick={this.toggleSwitch}> - </span>History</h2>
                    <table className="watchlist">

                        <thead>
                            <tr><th>Stock ticker:</th><th>Volume</th><th>Purchased</th><th>Price</th><th>Sold</th><th>Price</th><th>Result</th></tr>
                        </thead>
                        <tbody>{history.map(asset =>
                            (<tr key={asset.ticker}>
                                <td >{asset.ticker}</td>
                                <td> {asset.volume}</td>
                                <td >{asset.timeOfPurchase}</td>
                                <td onMouseOver={this.hoverHandler}>{(asset.price*asset.volume).toLocaleString("en")}</td>
                                <td >{asset.timeOfSell}</td>
                                <td onMouseOver={this.hoverHandler}>{(asset.currentPrice*asset.volume).toLocaleString("en")}</td>
                                <td className={(totalCurrentValue - totalInvested) >= 0 ? "green-result" : "red-result"}>{(asset.currentPrice*asset.volume - asset.price*asset.volume).toLocaleString("en")}</td>
                            </tr>)
                        )}
                        <tr>
                                <td className="portfolio-sum">Total</td><td></td><td></td><td className="portfolio-sum">{totalInvested.toLocaleString("en")}</td>
                                <td></td><td className="portfolio-sum">{totalCurrentValue.toLocaleString("en")}</td>
                                <td className={(totalCurrentValue - totalInvested) >= 0 ? "green-result" : "red-result"}>{(totalCurrentValue - totalInvested).toLocaleString("en")}</td>
                        </tr>
                        </tbody>
                    </table>

                </div>
            </div>
            )
        }
        else { return (
        <div className="watchlist-wrap">    
            <div className="watchlist-inside-wrap">
                <h2><span className="toggler" onClick={this.toggleSwitch}> - </span>History is empty</h2>
            </div>
        </div>
        ) }
    }

}

export default History
