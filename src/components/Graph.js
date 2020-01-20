import React, { Component } from 'react';
import {XYPlot, VerticalBarSeries, DiscreteColorLegend, VerticalGridLines, HorizontalGridLines, YAxis, XAxis} from "react-vis"
import {connect} from "react-redux"
import {fetchHours,fetchCategories, addHour} from "../actions/actions"
const moment = require("moment")

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: [],
      categories: [],
      isLoading: false
    };
  }
  render() {
    let startingArray = [0, 1, 2, 3, 4, 5, 6]
    let xAxisLables = startingArray.map(day => {
      return moment().subtract(day, "days").format('dddd Do')
    })
    let yyyymmdd = startingArray.map(day => {
      return moment().subtract(day, "days").format('YYYY-MM-DD')
    })    
    const xDisplay = [
      {x: xAxisLables[6], y: 0},
      {x: xAxisLables[5], y: 0},
      {x: xAxisLables[4], y: 0},
      {x: xAxisLables[3], y: 0},
      {x: xAxisLables[2], y: 0},
      {x: xAxisLables[1], y: 0},
      {x: xAxisLables[0], y: 0},
    ];

    let filteredByCategory = []
    this.props.categories.forEach( cat => {
      let hour = this.props.hours.filter(e => {
        return e.category === cat.category
      })
      
      filteredByCategory.push(hour)
    })
    console.log(filteredByCategory)

    let filteredByDate = []
    filteredByCategory.forEach(array => {
      let filteredHours = array.filter(hour => 
        hour.date === yyyymmdd[0] || hour.date === yyyymmdd[1] || hour.date === yyyymmdd[2] || hour.date === yyyymmdd[3] || hour.date === yyyymmdd[4] || hour.date === yyyymmdd[5] || hour.date === yyyymmdd[6]
      )
      filteredByDate.push(filteredHours)
    })

    let dataSets = []
    filteredByDate.forEach(category => {
      let formattedArray = 
      category.map(hour => {
        return {x: moment(hour.date).format('dddd Do'), y: hour.hours}
      })
      dataSets.push(formattedArray)
    })
    console.log(dataSets)
    
    return(
      <div>
        <XYPlot height={300} width= {600} stackBy="y" className="graph" xType="ordinal">
        {/* <DiscreteColorLegend
        style={{position: 'relative', left: '75%', top: '50px', width: '100px'}}
        orientation="horizontal"
        items={
        categories.map(item => {
        return {
        title: item.category,
        color: 'red'
        }
        })}
        /> */}
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <VerticalBarSeries cluster="2020" data={xDisplay} />
        <VerticalBarSeries cluster="2020" data={dataSets[0]} />
        <VerticalBarSeries
          cluster="2020"
          color="red"
          data={dataSets[1]}
        />
        </XYPlot>
      </div>
    )
  }
  componentDidMount(props) {
    const { userSession } = this.props;
    this.props.fetchHours(userSession);
    this.props.fetchCategories(userSession);
  }
}



const mapStateToProps = (state) => {
  return {
      categories: state.categories,
      hours: state.hours,
      isLoading: state.isLoading
  }
}

export default connect(mapStateToProps, {fetchHours, fetchCategories, addHour})(Graph)