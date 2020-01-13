import React, { Component } from 'react';
import {XYPlot, VerticalBarSeries, DiscreteColorLegend, VerticalGridLines, HorizontalGridLines, YAxis, XAxis} from "react-vis"
import {Button} from "semantic-ui-react"
import {Person} from 'blockstack';
import {connect} from "react-redux"
import {fetchHours, fetchCategories, reset, addHour, addCategory} from "../actions/actions"
import Tabs from "./Tabs"

const moment = require("moment")

const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';

class Profile extends Component {
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
      newCategory: "",
      categories: [],
      isLoading: false
    };
  }

  handleChanges(event) {
    this.setState({[event.target.name] : event.target.value})
    console.log(this.props.hours)
  }

  render() {
    const { handleSignOut, userSession } = this.props;
    const { person, categories } = this.state;
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
          <XYPlot height={300} width= {800} stackBy="y" className="graph" xType="ordinal">
          
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <VerticalBarSeries cluster="2015" data={data} />
            <VerticalBarSeries
            cluster="2015"
            color="red"
            data={[
              {x: xAxisLables[2], y: 3},
              {x: xAxisLables[3], y: 7},
              {x: xAxisLables[5], y: 2},
              {x: xAxisLables[0], y: 0}
            ]}
          />
          </XYPlot>
        </div>
            <Tabs />
        <div>
          <h2>clock hours</h2>
          <div>
            <form>
            <input 
            name="newHour"
            value= {this.state.newHour}
            onChange= {e => this.handleChanges(e)}
            
            />
            <button onClick={e => this.props.addHour(e, userSession, this.props.hours, this.state.newHour)}>
              enter
            </button>
            </form>
          </div>
        </div>
        <p> </p>
        <Button onClick={e => this.props.reset(userSession)}> reset hours </Button>

        <div>
          <h2>add new category</h2>
          <div>
            <form>
            <input 
            name="newCategory"
            value= {this.state.newCategory}
            onChange= {e => this.handleChanges(e)}
            
            />
            <Button onClick={e => this.props.addCategory(e, userSession, this.props.categories, this.state.newCategory)}>
              enter
            </Button>
            </form>
          </div>
        </div>
      </div> : null
    );
  }


  componentDidMount(props) {
    const { userSession } = this.props;
    this.props.fetchHours(userSession);
    this.props.fetchCategories(userSession);
    this.setState({
      person: new Person(userSession.loadUserData().profile),
    });
    
  }
}

const mapStateToProps = (state) => {
  return {
      person: state.person,
      categories: state.categories,
      hours: state.hours,
      isLoading: state.isLoading
  }
}

export default connect(mapStateToProps, {fetchHours, fetchCategories, reset, addHour, addCategory})(Profile)