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
      return moment().subtract(day, "days").format('ddd Do')
    })
    const xDisplay = xAxisLables.map(lable => {
      return {x: lable, y: 0}
    }).reverse()
    let lastWeek = startingArray.map(day => {
      return moment().subtract(day, "days").format('YYYY-MM-DD')
    })    


    //divides hours into seperate arrays based on category
    let filteredByCategory = []
    this.props.categories.forEach( cat => {
      let hour = this.props.hours.filter(e => {
        return e.category === cat.category
      })
      
      filteredByCategory.push(hour)
    })
    console.log(filteredByCategory)


    //removes hours that weren't in the week
    //will improve this to select last 2 weeks or month or year
    let filteredByDate = []
    filteredByCategory.forEach(array => {
      let filteredHours = array.filter(hour => 
        hour.date === lastWeek[0] || hour.date === lastWeek[1] || hour.date === lastWeek[2] || hour.date === lastWeek[3] || hour.date === lastWeek[4] || hour.date === lastWeek[5] || hour.date === lastWeek[6]
      )
      filteredByDate.push(filteredHours)
    })

    
    // puts into format the react-vis graph accepts
    let dataSets = []
    filteredByDate.forEach(category => {
      
      let formattedArray = category.map(hour => {
        return {x: `${moment(hour.date).format('ddd Do')}`, y: hour.hours}
      })

      let info = {}
      this.props.categories.forEach(cat => {
        if (category[0]) {
          if (cat.category === category[0].category){
            info.category = cat.category
            info.color = cat.color
          }
        }
      })

      dataSets.push({
        hours: formattedArray, 
        info: info})
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
        <YAxis style={{stroke: 3}}/>
        <VerticalBarSeries cluster="1" data={xDisplay} />
        {dataSets.map(categoryData => {
          return <VerticalBarSeries cluster="1" data={categoryData.hours} color={categoryData.info.color}/>
        })}
        {/* <VerticalBarSeries cluster="2020" data={dataSets[0]} />
        <VerticalBarSeries
          cluster="2020"
          color="red"
          data={dataSets[1]}
        /> */}
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