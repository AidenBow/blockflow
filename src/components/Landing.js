import React, { Component } from 'react';
import {Button} from "semantic-ui-react"
import LandingNav from "./LandingNav"

export default class Landing extends Component {

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
            <img className="marketingImg" src={require("../images/piano.jpg")}/>
            <p className="marketingText">Flow is a state of mind where you're completely immersed in your task. Once flow state is activated, your creativity, productivity, and problem solving reach peak performance. You can find more info <a href="https://positivepsychology.com/what-is-flow/">here</a></p>
          </div>
          
          <div id="2" className="marketingContainer1">
            <p className="marketingText">Our goal is to promote flow in our users daily tasks. Timers, trackers, and a reward system are all included to encourage flow</p>
            <img className="marketingImg" src={require("../images/quote1.jpg")}/>
          </div>
        </div>
      </div>
    );
  }
}
