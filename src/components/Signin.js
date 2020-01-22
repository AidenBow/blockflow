import React, { Component } from 'react';
import {Button} from "semantic-ui-react"

export default class Signin extends Component {

  render() {
    const { handleSignIn } = this.props;

    return (
      <div className="landingContainer">
        <img className="headImg" src={require("../images/hoodie.jpg")} alt="desk"/>
        <h1 className="landingHead">BlockFlow</h1>
        <h2 className="landingSubHead">Enter flow and reach your potential</h2>
          <Button
            className="landingButtonHead"
            onClick={ handleSignIn.bind(this) }
          >
            Sign In with Blockstack
          </Button>
      </div>
    );
  }
}
