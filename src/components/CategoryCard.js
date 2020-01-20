import React, { Component } from 'react';
import {Button} from "semantic-ui-react"
import {connect} from "react-redux"
import { deleteCategory, selectCategory } from '../actions/actions';

class CategoryList extends Component {
  render () {
    let styles = {
      backgroundColor: this.props.category.color
    }
    return (
      <div className="categoryCard">
        
        <p style={styles}>{this.props.category.category}</p>
        <Button basic
        onMouseUp={() => this.props.selectCategory(this.props.category.category)}>select</Button>
        <Button
        basic color='red' content='Red' 
        onMouseUp={ () => this.props.deleteCategory(this.props.category.id, this.props.categories, this.props.userSession)}>delete</Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      categories: state.categories
  }
}

export default connect(mapStateToProps, {deleteCategory, selectCategory})(CategoryList)