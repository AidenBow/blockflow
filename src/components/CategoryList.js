import React, { Component } from 'react';
import {Button} from "semantic-ui-react"
import {connect} from "react-redux"
import {addCategory, fetchCategories} from "../actions/actions"

class CategoryList extends Component {
  render () {
    return (
      <div>
        {this.props.categories.map(category => {
          return (<p>{category.category}</p>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      categories: state.categories,
      isLoading: state.isLoading
  }
}

export default connect(mapStateToProps, {fetchCategories, addCategory})(CategoryList)