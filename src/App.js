import React from 'react'
import Stockadder from './components/Stockadder'
import Watchlist from './components/Watchlist'
import Graph from './components/Graph'
import axios from 'axios'
import './css/main.css'
import Portfolio from './components/Portfolio'
import Error from './components/modals/error'

class App extends React.Component {
    constructor(props){
        super(props)
        this.apiSummary = []
        this.state = {
            apiData: [],
            stocks: [],
            graphData: [{}],
            stockDisplay: 0,
            portfolio: [],
            portfolioData: [],
            showStockadder: true,
            showError: false
            
        }
    }
    errorClose = () => {
        this.setState({
            showError: false
        })
    }

    deleteStock = (stock) => {
        this.setState({
            stocks: this.state.stocks.filter(item => item.ticker !== stock)
        })
        }
    addStock = (stock) => {    
        if(this.state.stocks.length<5) {
        this.setState({
            stocks: this.state.stocks.concat(stock)
        })
    }
    else {
        alert('Maximum portfoliosize is 5')
    }
    
}
        addFive = () => {
            this.setState({
                stocks: [{ticker: 'TSLA'}, {ticker: 'AAPL'}, {ticker: 'GOOGL'}, {ticker: 'AMZN'}, {ticker: 'M&M'}]
            })
        
        }

    showGraph = (stock) => {
        if(stock !== undefined){
        this.setState({
        stockDisplay: this.state.graphData.findIndex(item => item.ticker === stock)
        })}
    }

    compare = (a, b) => {
        if (a.ticker < b.ticker) { return -1 }
        if (a.ticker > b.ticker) { return 1 }
        return 0
    }

    handleBuy = (stock) => {

        
        let newPort = this.state.portfolio.concat(stock)
        newPort.sort(this.compare)
        let newStocks = this.state.stocks
        newStocks.sort(this.compare)
        this.setState({
            portfolio: newPort,
            stocks: newStocks,
        })
        setTimeout(this.updatePortfolioData, 1000)
    }
    sellStock = (stock) => {
        console.log(stock)
    }

    
    updatePortfolioData = () => {
        if (this.state.portfolio.length > 0) {
            let portfolioData = []
            let pricesSumArray = []
            let portfolioIndexes = []
            for (let i = 0; i < this.state.portfolio.length; i++) {         // find indexes in graphData corresponding to ascending indexes of portfolio 
                for (let u = 0; u < this.state.graphData.length; u++) {
                    if (this.state.portfolio[i].ticker === this.state.graphData[u].ticker) {
                        portfolioIndexes.push(u)
                    }
                }
            }
            for (let i = 0; i < this.state.portfolio.length; i++) {     // multiply each stocks price with its volume
                    portfolioData[i] = {
                    pricesProd: this.state.graphData[portfolioIndexes[i]].prices.map(price => price * this.state.portfolio[i].volume),
                    times: this.state.graphData[portfolioIndexes[i]].times
                }
            }
            for (let i = 0; i < portfolioData.length; i++) {            // slice each stockprice array at the time of purchase
                let buyTime = portfolioData[i].times.findIndex(item => item === this.state.portfolio[i].timeOfPurchase)
                portfolioData[i].pricesProd = portfolioData[i].pricesProd.slice(buyTime)
                portfolioData[i].times = portfolioData[i].times.slice(buyTime)
            }
            for (let i = portfolioData[0].pricesProd.length-1; i > -1; i--) {   // sum all stock products at each timepoint
                let priceSum = 0
                for (let u = 0; u < this.state.portfolio.length; u++) {
                    priceSum = priceSum + portfolioData[u].pricesProd[i]
                }
                pricesSumArray.unshift(priceSum)
            }

            let portfolioCopy = [...this.state.portfolio]                               //update current price of portfolio stocks
            for (let i = 0; i < this.state.portfolio.length; i++) {
                portfolioCopy[i].currentPrice = this.state.graphData[portfolioIndexes[i]].prices[99]
            }
            this.setState({
                portfolioData: {
                    prices: pricesSumArray,
                    times: portfolioData[0].times,
                    ticker: 'Portfolio'
                }
            })
        }
    }

    updateStocks = async() => {
        this.apiSummary = []
        this.setState({
            showStockadder: false,
            apiData: [],
        })
        const API_KEY = 'RNMW9AOG5O5M2LRV' //alphavantage.co
        for( let i = 0; i < this.state.stocks.length; i++ ) {
            await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this.state.stocks[i].ticker}&interval=1min&apikey=${API_KEY}`).then(res => {
                let prices = []
                let times = Object.keys(res.data['Time Series (1min)']).reverse()
                for (let u = 0; u < times.length; u++) {
                    prices = prices.concat(Math.round(parseFloat(res.data['Time Series (1min)'][times[u]]['4. close']) * 1000)/1000)
                }
                this.apiSummary.push({                          // add stock data together
                        times: times,
                        prices: prices,
                        volume: this.state.stocks[i].volume,
                        ticker: this.state.stocks[i].ticker
                    })
                })
                .catch((error) => {
                this.setState({
                        showError: 'too many api requests! this api-key supports up to 5 per minute',
                        stocks: [],
                        showStockadder: true
                    })
                })
            }
                this.setState({
                    graphData: this.apiSummary
                })
            setTimeout(this.updateStocks, 64000)
            setTimeout(this.updatePortfolioData, 65000)
        }

        render() { 
            return (
                <div className="page-container">
                {(this.state.showError && <Error modalMessage={this.state.showError} handleClose={this.errorClose} />)}
                    <h1><span>PORTFOLIO</span> TRACKER</h1>
                        <div className="list-and-graph-wrap">
                            <div className="watchlist-wrap">
                                {this.state.showStockadder && <Stockadder stocks={this.state.stocks} addFive={this.addFive} addStock={this.addStock} updateStocks={this.updateStocks} />}
                                < Watchlist stocks={this.state.stocks} watchlist={this.state.graphData} deleteStock={this.deleteStock} showGraph={this.showGraph} handleBuy={this.handleBuy} updatePortfolioData={this.updatePortfolioData} />
                            </div>
                            <div className="chart">
                                < Graph graphData={this.state.graphData[this.state.stockDisplay]} /> 
                            </div>
                        </div>
                    <div className="list-and-graph-wrap">
                        <div className="watchlist-wrap"> 
                             {this.state.portfolio.length > 0 ? <Portfolio portfolio={this.state.portfolio} graphData={this.state.graphData} sellStock={this.sellStock} /> : <h2>Portfolio is empty</h2>} 
                        </div>
                        <div className="chart">
                            <Graph graphData={this.state.portfolioData} />
                        </div>
                    </div>
                </div>
                    )
        } }
export default App
   // 







    //    this.setPortfolioData()

    // setPortfolioData = () => {
    //     this.setState({
    //         portfolioData:{
    //             labels: this.state.portfolioData.labels.concat(this.state.apiData.labels[this.state.apiData.labels.length]),
    //             datasets: [
    //                 {
    //                     label: 'Portfolio',
    //                     data: this.state.portfolioData.datasets.data.concat(this.state.apiData.datasets.data[this.state.apiData.datasets.data.length]),
    //                 }
    //             ]
    //         }
    //     })
    //     console.log(this.state.portfolioData)
    // }