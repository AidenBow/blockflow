import React, { Component } from 'react';
import {connect} from "react-redux"
import {addCategory, fetchCategories} from "../actions/actions"
import CategoryCard from "./CategoryCard"

class CategoryList extends Component {
  render () {
    return (
      <div className="categoryList">
        {this.props.categories.map(category => {
          return <CategoryCard category={category} />
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