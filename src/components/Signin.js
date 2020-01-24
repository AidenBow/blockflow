import React, { Component } from 'react';
import {Button} from "semantic-ui-react"
import LandingNav from "./LandingNav"

export default class Signin extends Component {

  render() {
    const { handleSignIn } = this.props;

    return (
      <div className="landingContainer1">
        
        <h1 className="landingHead">BlockFlow</h1>
        <h2 className="landingSubHead">Enter flow and reach your potential</h2>
        <div className="landingButtonHead">
          <Button
            
            onClick={ handleSignIn.bind(this) }
          >
            Sign In with Blockstack
          </Button>
          </div>

        <div className="landingContainer2">
          <LandingNav />
          <div id="1" className="marketingContainer1">
            <img className="marketingImg" src={require("../images/quote1.jpg")}/>
            <p className="marketingText">hey you can enter flow and increase your productivity and graph filler text enter productiveity graph</p>
          </div>
          
        </div>
      </div>
    );
  }
}
