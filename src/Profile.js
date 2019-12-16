import React, { Component } from 'react';
import {XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, YAxis, XAxis} from "react-vis"
import {
  Person,
} from 'blockstack';

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
    const data = [
      {x: 0, y: 8},
      {x: 1, y: 5},
      {x: 2, y: 4},
      {x: 3, y: 9},
      {x: 4, y: 1},
      {x: 5, y: 7},
      {x: 6, y: 6},
      {x: 7, y: 3},
      {x: 8, y: 2},
      {x: 9, y: 0}
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
          <XYPlot height={300} width= {300}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <LineSeries data={data} />
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
