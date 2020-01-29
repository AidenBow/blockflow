import React, {Component} from "react"
import {connect} from "react-redux"
import {addHour} from "../actions/actions"
const moment = require("moment")

class HoursTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: moment().format("YYYY-MM-DD"),
      newHour: "",
      isLoading: false
    };
  }

  handleChanges(event) {
    this.setState({[event.target.name] : event.target.value})
    console.log(this.props.hours)
  }

  render () {
    return(
      <div className="tabContainer">
        <h2>clock hours</h2>
          <div>
            <form>
            <input 
            name="newHour"
            value= {this.state.newHour}
            onChange= {e => this.handleChanges(e)}
            
            />
            <input 
            name="selectedDate"
            type="date"
            id="myDate"
            value={this.state.selectedDate}
            onChange={e => this.handleChanges(e)}
            />
            <button onClick={e => 
              this.props.addHour(
                e, 
                this.props.userSession, 
                this.props.hours, 
                this.state.newHour, 
                this.props.selectedCategory,
                this.state.selectedDate
              )}>
              enter
            </button>
            </form>
          </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      hours: state.hours,
      selectedCategory: state.selectedCategory
  }
}

export default connect(mapStateToProps, {addHour})(HoursTab)