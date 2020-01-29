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
            <img className="marketingImg" src={require("../images/piano.jpg")} alt="woman playing piano"/>
            <p className="marketingText" style={{marginLeft: "8%"}}>Flow is a state of mind where you're completely immersed in your task. Once flow state is activated, your creativity, productivity, and problem solving reach peak performance. You can find more info <a href="https://positivepsychology.com/what-is-flow/">here</a></p>
          </div>

          <div id="2" className="marketingContainer1">
            <p className="marketingText" style={{marginRight: "8%"}}>Our goal is to promote flow in our users daily tasks. Timers, trackers, and a reward system are all included to encourage productivity</p>
            <img className="marketingImg" src={require("../images/quote1.jpg")} alt="motivational quote"/>
          </div>

          <div id="3" className="marketingContainer1">
            <img className="marketingImg" src={require("../images/key.jpg")} alt="hand holding key"/>
            <p className="marketingText" style={{marginLeft: "8%"}}>Decentralized text Blockstack Decentralized text Blockstack Decentralized text Blockstack Decentralized text Blockstack Decentralized text Blockstack Decentralized text Blockstack </p>
          </div>

          <div className="marketingContainer1" style={{height: 100}}>
          <Button
            size='massive'
            color='grey'
            onClick={ handleSignIn.bind(this) }
          >
            Join today
          </Button>
          </div>
        </div>
      </div>
    );
  }
}
