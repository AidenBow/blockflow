import React, {Component} from "react"
import {connect} from "react-redux"
import {handleJournalChanges} from "../actions/actions"

class Journal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentJournal: "",
      isLoading: false
    };
  }

  handleChanges(event) {
    this.setState({[event.target.name] : event.target.value})
    console.log(this.state.currentJournal)
  }

  render () {
    return(
      <div className="tabContainer">
        <textarea
          name="currentJournal"
          value= {this.props.currentJournal}
          onChange= {e => this.props.handleJournalChanges(e.target.value)}>
        </textarea>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      currentJournal: state.currentJournal
  }
}

export default connect(mapStateToProps, {handleJournalChanges})(Journal)