import React, { Component } from 'react';
import {XYPlot, VerticalBarSeries, DiscreteColorLegend, VerticalGridLines, HorizontalGridLines, YAxis, XAxis} from "react-vis"
//import Moment from 'react-moment';
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
      hours: [],
      categories: [],
      isLoading: false
    };
  }

  handleChanges(event) {
    this.setState({newHour: event.target.value})
    console.log(this.state.hours)
  }

  fetchData() {
    this.setState({ isLoading: true })
    const {userSession} = this.props
    const options = { decrypt: false }
    userSession.getFile('hours.json', options)
      .then((file) => {
        var hours = JSON.parse(file || '[]')
        this.setState({
          person: new Person(userSession.loadUserData().profile),
          hours: hours,
        })
        console.log(hours)
      })
      .catch(err => {
        console.log(err)
      })
      userSession.getFile('cetegories.json', options)
      .then((file) => {
        var categories = JSON.parse(file || '[]')
        this.setState({
          person: new Person(userSession.loadUserData().profile),
          categories: categories,
        })
        console.log(categories)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        this.setState({ isLoading: false })
      })
  }

  submitNewHour(e) {
    e.preventDefault()
    const {userSession} = this.props
    let hours = this.state.hours
    console.log(hours)
    console.log(this.state.newHour)
    let hourToBeAdded = {
      id: Date.now(),
      hours: this.state.newHour,
      date: moment().format('MMM Do YY')
    }

    if (hours) {
      hours.unshift(hourToBeAdded)
    } else {
      hours = [hourToBeAdded]
    }
    const options = { encrypt: false }
    userSession.putFile('hours.json', JSON.stringify(hours), options)
      .then(() => {
        this.setState({
          hours: hours
        })
      })
      console.log(hours)
  }

  reset(e) {
    const {userSession} = this.props
    let hours = this.state.hours
    this.setState({ isLoading: false })
    userSession.putFile('hours.json', JSON.stringify([]), { encrypt: false })
    .then(() => {
      this.setState({
        hours: hours
      })
    })
    
    .finally(() => {
      this.setState({ isLoading: false })
    })
    console.log(hours)
  }

  render() {
    const { handleSignOut, userSession } = this.props;
    const { person } = this.state;
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
    return (
      !userSession.isSignInPending() && !this.state.isLoading  ?
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
        <h1>Today is {moment().format("MMMM Do")}!</h1>
        <DiscreteColorLegend
            style={{position: 'relative', left: '75%', top: '50px', width: '100px'}}
            orientation="horizontal"
            items={[
              {
                title: 'Freelance',
                color: '#12939A'
              },
              {
                title: 'Portfolio',
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
              {x: xAxisLables[0], y: 0}
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
            <button onClick={e => this.submitNewHour(e)}>
              enter
            </button>
            </form>
          </div>
        </div>
        <p> </p>
        <button onClick={e => this.reset(e)}> reset hours </button>
      </div> : null
    );
  }


  componentDidMount() {
    const { userSession } = this.props;
    this.setState({
      person: new Person(userSession.loadUserData().profile),
      hours: userSession.loadUserData().hours
    });
    this.reset();
  }
}
