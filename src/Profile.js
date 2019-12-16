import React, { Component } from 'react';
import {XYPlot, VerticalBarSeries, DiscreteColorLegend, VerticalGridLines, HorizontalGridLines, YAxis, XAxis} from "react-vis"
import Moment from 'react-moment';
import {
  Person,
} from 'blockstack';

const moment = require("moment")

const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: {
        name() {
          return 'Anonymous';
        },
        avatarUrl() {
          return avatarFallbackImage;
        },
      },
      newHour: "",
      hours: []
    };
  }

  handleChanges(event) {
    this.setState({newHour: event.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    this.state.hours.push(this.state.newHour)
    console.log(this.state.hours)
    this.setState({newHour: ""})
    console.log()
  }

  render() {
    const { handleSignOut, userSession } = this.props;
    const { person } = this.state;
    let startingArray = [0, 1, 2, 3, 4, 5, 6]
    let xAxisLables = startingArray.map(day => {
      console.log(moment().subtract(day, "days").format('dddd Do'))
      return moment().subtract(day, "days").format('dddd Do')
    })
    console.log(xAxisLables)
            
    const data = [
      {x: xAxisLables[6], y: 8},
      {x: xAxisLables[5], y: 5},
      {x: xAxisLables[4], y: 4},
      {x: xAxisLables[3], y: 9},
      {x: xAxisLables[2], y: 1},
      {x: xAxisLables[1], y: 7},
      {x: xAxisLables[0], y: 6},
    ];
    return (
      !userSession.isSignInPending() ?
      <div className="panel-welcome" id="section-2">
        <div className="avatar-section">
          <img src={ person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage } className="img-rounded avatar" id="avatar-image" alt=""/>
        </div>
        <h1>Hello, <span id="heading-name">{ person.name() ? person.name() : 'Nameless Person' }</span>!</h1>
        <p className="lead">
          <button
            className="btn btn-primary btn-lg"
            id="signout-button"
            onClick={ handleSignOut.bind(this) }
          >
            Logout
          </button>
        </p>

        <div className="center">
        <Moment format="MMM Do">{Date()}</Moment>
        <p>{xAxisLables[1]}</p>
        <DiscreteColorLegend
            style={{position: 'relative', left: '70%', top: '50px', width: '100px'}}
            orientation="horizontal"
            items={[
              {
                title: 'Apples',
                color: '#12939A'
              },
              {
                title: 'Oranges',
                color: '#79C7E3'
              }
            ]}
          />
          <XYPlot height={300} width= {800} stackBy="y" className="graph" xType="ordinal">
          
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <VerticalBarSeries cluster="2015" data={data} />
            <VerticalBarSeries
            cluster="2015"
            color="#79C7E3"
            data={[
              {x: xAxisLables[2], y: 3},
              {x: xAxisLables[3], y: 7},
              {x: xAxisLables[5], y: 2},
              {x: xAxisLables[4], y: 1}
            ]}
          />
          </XYPlot>
        </div>

        <div>
          <h2>clock hours</h2>
          <div>
            <form>
            <input 
            value= {this.state.newHour}
            onChange= {e => this.handleChanges(e)}
            
            />
            <button onClick={e => this.handleSubmit(e)}>
              enter
            </button>
            </form>
          </div>
        </div>
      </div> : null
    );
  }

  componentWillMount() {
    const { userSession } = this.props;
    this.setState({
      person: new Person(userSession.loadUserData().profile),
    });
  }
}
