import React, { Component } from 'react';
import {Button} from "semantic-ui-react"

export default class Signin extends Component {

  render() {
    const { handleSignIn } = this.props;

    return (
      <div className="landingContainer">
        <img className="headImg" src={require("../images/hoodie.jpg")} alt="man wearing hoodie looking at mountains"/>
        <h1 className="landingHead">BlockFlow</h1>
        <h2 className="landingSubHead">Enter flow and reach your potential</h2>
        <div className="landingButtonHead">
          <Button
            
            onClick={ handleSignIn.bind(this) }
          >
            Sign In with Blockstack
          </Button>
          </div>
      </div>
    );
  }
}
