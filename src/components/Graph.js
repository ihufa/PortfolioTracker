import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'


class Graph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            finalGraphData: {
                labels: [],
                    datasets: [
                        {
                            label: 'Portfolio',
                            data: [],
                        }
                    ]
            },
        }
    }


    
    render() { 
        if(Object.keys(this.props.graphData !== undefined && this.props.graphData).length !== 0) {
    let portfolioData =  {
            labels: this.props.graphData.times,
                datasets: [
                    {
                        label: this.props.graphData.ticker,
                        data: this.props.graphData.prices,
                        backgroundColor: "transparent",
                        borderColor: "rgb(238, 150, 17)",
                        pointRadius: 0,
                        pointHitRadius: 2,
                        display: false,
                        cubicInterpolationMode: "monotone",
                        responsive: true,
                        maintainAspectRatio: false
                        

                    }
                ]
        }
        return (
        <div className="chartwrap">
            <Line
                data={portfolioData}
                options={{
                    title: {
                        display: this.props.graphData.ticker,
                        text: this.props.graphData.ticker,
                        fontSize: 16
                    },
                    elements: {
                        line: {
                            tension: 0, // disables bezier curves
                        }
                    },
                    scales: {
                        xAxes: [{
                            type: 'time',
                            time: {
                                displayFormats: {
                                    minute: 'h:mm a'
                                }
                            }
                        }]
                    },
                    legend: {
                        display: false,
                        position: 'position'
                            }
                        }}
                    />
            </div>
        )
    }
    else {
            return null
    }}
}

export default Graph