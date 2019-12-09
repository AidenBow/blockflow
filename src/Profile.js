import React, { Component } from 'react';
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
    console.log(this.state.newHour)
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log(this.state.newHour)
    this.setState({newHour: ""})
  }

  render() {
    const { handleSignOut, userSession } = this.props;
    const { person } = this.state;
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

        <div>
          <h2>clock hours</h2>
          <div>
            <input 
            value= {this.state.newHour}
            onChange= {e => this.handleChanges(e)}
            
            />
            <button onClick={e => this.handleSubmit(e)}>
              enter
            </button>
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
