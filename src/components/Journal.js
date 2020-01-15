import React, {Component} from "react"
import {connect} from "react-redux"

class Journal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newJournal: "",
      isLoading: false
    };
  }

  handleChanges(event) {
    this.setState({[event.target.name] : event.target.value})
    console.log(this.state.newJournal)
  }

  render () {
    return(
      <div>
        <textarea
          name="newJournal"
          value= {this.state.newJournal}
          onChange= {e => this.handleChanges(e)}>
        </textarea>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      isLoading: state.isLoading
  }
}

export default connect(mapStateToProps, {})(Journal)