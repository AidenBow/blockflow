import React, { Component } from 'react';
import {Button} from "semantic-ui-react"
import {Person} from 'blockstack';
import {connect} from "react-redux"
import {fetchHours, fetchCategories, reset, addHour, addCategory} from "../actions/actions"
import Tabs from "./Tabs"
import CategoryList from "./CategoryList"
import windowSize from 'react-window-size';
import Graph from "./Graph"
import {CirclePicker} from "react-color"
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

  handleChangeComplete = (color) => {
    this.setState({ color: color.hex });
    console.log(this.state.color)
  };

  render() {
    const { handleSignOut, userSession } = this.props;
    const { person } = this.state;
    

    console.log(this.props.windowWidth)
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
        <h1>Today is {moment().format("MMMM Do")}!</h1>
        <div className="center">
          <Graph />
          <Tabs />
        </div>
          
        <div>
          <h2>clock hours</h2>
          <div>
            <form>
            <input 
            name="newHour"
            value= {this.state.newHour}
            onChange= {e => this.handleChanges(e)}
            
            />
            <button onClick={e => this.props.addHour(e, userSession, this.props.hours, this.state.newHour, this.props.selectedCategory)}>
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
            <div style={{marginLeft: 450}}>
            <CirclePicker
              onChangeComplete={ this.handleChangeComplete }
            />
            </div>
            <Button onClick={e => this.props.addCategory(e, userSession, this.props.categories, this.state.newCategory, this.state.color)}>
              enter
            </Button>
            </form>
          </div>
      
          <CategoryList userSession={this.props.userSession}/>
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
      selectedCategory: state.selectedCategory,
      isLoading: state.isLoading
  }
}

export default windowSize(connect(mapStateToProps, {fetchHours, fetchCategories, reset, addHour, addCategory})(Profile))