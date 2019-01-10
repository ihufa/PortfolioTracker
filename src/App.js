import React from 'react'
import Stockadder from './components/Stockadder'
import Watchlist from './components/Watchlist'
import Graph from './components/Graph'
import axios from 'axios'
import './css/main.css'
import Portfolio from './components/Portfolio'

class App extends React.Component {
    constructor(props){
        super(props)
        this.apiSummary = []
        this.state = {
            apiData: [],
            stocks: [],
            graphData: [{}],
            stockDisplay: 0
            
        }
    }
    
    deleteStock = (stock) => {
        this.setState({
            stocks: this.state.stocks.filter(item => item.ticker !== stock),
            graphData: this.state.graphData.filter(item => item.ticker !== stock)
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

    showGraph = (stock) => {
        this.setState({
        stockDisplay: this.state.graphData.findIndex(item => item.ticker === stock)
        })
    }

    updatePortfolio = async() => {
        this.setState({
            apiData: [],
            graphData: [{}]
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
            }
            this.setState({                                     // set state after the api calls are all concluded to not set state once for every call
                graphData: this.apiSummary
            })
        }

        render() { 
            return (
                <div className="page-container">
                    <h1>Investment simulator</h1>
                        <div className="list-and-graph-wrap">
                            <div className="watchlist-wrap">
                                <Stockadder addStock={this.addStock} updatePortfolio={this.updatePortfolio} />
                                < Watchlist stocks={this.state.stocks} watchlist={this.state.graphData} deleteStock={this.deleteStock} showGraph={this.showGraph} />
                            </div>
                            <div className="chart">
                                < Graph graphData={this.state.graphData[this.state.stockDisplay]} /> 
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