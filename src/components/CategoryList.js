import React, { Component } from 'react';
import {connect} from "react-redux"
import {addCategory, fetchCategories} from "../actions/actions"
import CategoryCard from "./CategoryCard"

class CategoryList extends Component {
  render () {
    return (
      !this.props.isLoading && true ? 
      <div className="categoryList">
        {this.props.categories.map(category => {
          return <CategoryCard category={category} userSession={this.props.userSession}/>
        })}
      </div> :
      <h1>Loading...</h1>
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