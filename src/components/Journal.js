import React, {Component} from "react"
import {connect} from "react-redux"

class Journal extends Component {
  render () {
    return(
      <div>
        <p>dawdaw</p>
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