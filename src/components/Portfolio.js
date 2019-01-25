import React, { Component } from 'react'
import SellConfirmation from './modals/SellConfirmation'
class Portfolio extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ticker: '',
            volume: 0,
            showSellConfirmation: false,
            id: ""
        }
    }

    sellHandler = (e) => {
        e.preventDefault()
        console.log(this.props.portfolio.filter(item => item.id === e.target.id)[0].ticker)
        this.setState({
            showSellConfirmation: true,
            id: e.target.id,
            ticker: this.props.portfolio.filter(item => item.id === e.target.id)[0].ticker,
            volume: this.props.portfolio.filter(item => item.id === e.target.id)[0].volume,
            price: this.props.portfolio.filter(item => item.id === e.target.id)[0].price

        })
    }
    sellApproved = () => {
        this.props.sellStock(this.state.id)
        this.setState({
            showSellConfirmation: false
        })
    }
    sellReject = () => {
        this.setState({
            showSellConfirmation: false
        })
    }

results
    render() {
        let portfolioPurchasePrice = 0
        for(let i = 0; i < this.props.portfolio.length; i++) {
            portfolioPurchasePrice = portfolioPurchasePrice + this.props.portfolio[i].price*this.props.portfolio[i].volume
        }
        let portfolioValue = 0 
        for(let i = 0; i < this.props.portfolio.length; i++) {
            portfolioValue = portfolioValue + this.props.portfolio[i].currentPrice*this.props.portfolio[i].volume
        }
        if (this.props.portfolio.length > 0) {
            return (
                
                <div className="watchlist-inside-wrap">
                <h2>Portfolio</h2>
                    {(this.state.showSellConfirmation && <SellConfirmation sellApproved={this.sellApproved} sellReject={this.sellReject} stock={this.state}/>)}
                <table className="watchlist" >
                    <thead>
                        <tr><th>Purchased(EST)</th><th>Stock</th><th>Volume</th><th>Purchase Price</th><th>Current Price</th>
                        <th>Value</th> <th>Result %</th> <th> $</th><th></th></tr>
                    </thead>
                    <tbody>{this.props.portfolio.map(asset =>
                        (<tr key={asset.id}>
                            <td>{asset.timeOfPurchase}</td><td>{asset.ticker}</td><td>{asset.volume}</td><td>${asset.price.toLocaleString("en")}</td><td>${(asset.currentPrice).toLocaleString("en")}</td>
                            <td>${((Math.round(100 * asset.currentPrice * asset.volume)) / 100).toLocaleString("en")}</td>
                            <td className = {(asset.currentPrice / asset.price) >= 1 ? "green-result" : "red-result"} id="results1" >%{((Math.round(100 * 100 * (asset.currentPrice / asset.price - 1))) /100).toLocaleString("en")}</td>
                            <td className = {(asset.currentPrice / asset.price) >= 1 ? "green-result" : "red-result"} id="results2">${((Math.round(100 * (asset.currentPrice * asset.volume - asset.price * asset.volume))) / 100).toLocaleString("en")}</td>
                            <td><button className="Btn" id={asset.id} onClick={this.sellHandler}>Sell</button></td>
                        </tr>)
                    )}
                    <tr><td className="portfolio-sum">Portfolio Summary</td><td></td><td></td>
                    <td className="portfolio-sum">${(portfolioPurchasePrice).toLocaleString("en")}</td><td></td>
                    <td className="portfolio-sum">${(portfolioValue).toLocaleString("en")}</td>
                    <td className = {(portfolioValue / portfolioPurchasePrice) >= 1 ? "green-result" : "red-result"}>%{((portfolioValue/portfolioPurchasePrice-1)*100).toLocaleString("en")}</td>
                    <td className = {(portfolioValue / portfolioPurchasePrice) >= 1 ? "green-result" : "red-result"}>${((portfolioValue-portfolioPurchasePrice)).toLocaleString("en")}</td><td></td>
                    </tr>
                        </tbody>
                    </table>    
                </div>
            )
        }
        else return (<div className="watchlist-inside-wrap"><h2>Portfolio is empty</h2><table className="watchlist"></table></div>)
    }
}

export default Portfolio