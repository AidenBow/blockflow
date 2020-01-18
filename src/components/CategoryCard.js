import React, { Component } from 'react';
import {Button} from "semantic-ui-react"

class CategoryList extends Component {
  render () {
    return (
      <div>
        <p>{this.props.category.category}</p>
        <Button />
      </div>
    )
  }
}


export default CategoryList