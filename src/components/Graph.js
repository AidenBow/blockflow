import React, { Component } from 'react';
import {XYPlot, VerticalBarSeries, DiscreteColorLegend, VerticalGridLines, HorizontalGridLines, YAxis, XAxis} from "react-vis"
const moment = require("moment")

class Graph extends Component {
  render() {
    let startingArray = [0, 1, 2, 3, 4, 5, 6]
    let xAxisLables = startingArray.map(day => {
      return moment().subtract(day, "days").format('dddd Do')
    })    
    const data = [
      {x: xAxisLables[6], y: 0},
      {x: xAxisLables[5], y: 0},
      {x: xAxisLables[4], y: 0},
      {x: xAxisLables[3], y: 0},
      {x: xAxisLables[2], y: 0},
      {x: xAxisLables[1], y: 0},
      {x: xAxisLables[0], y: 0},
    ];

    return(
      <div>
      <XYPlot height={300} width= {600} stackBy="y" className="graph" xType="ordinal">
            
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis />
              <YAxis />
              <VerticalBarSeries cluster="2015" data={data} />
              <VerticalBarSeries
              cluster="2015"
              color="red"
              data={[
                {x: xAxisLables[2], y: 3},
                {x: xAxisLables[3], y: 7},
                {x: xAxisLables[5], y: 2},
                {x: xAxisLables[0], y: 0}
              ]}
            />
            </XYPlot>
            </div>
    )
  }
}

export default Graph