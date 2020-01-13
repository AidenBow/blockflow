import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react'

class Tabs extends Component {
  state = { activeItem: 'bio' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return(
      <div className="tabs">
        <Menu attached='top' tabular>
          <Menu.Item
            name='bio'
            active={activeItem === 'bio'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='photos'
            active={activeItem === 'photos'}
            onClick={this.handleItemClick}
          />

        </Menu>

        <Segment attached='bottom'>
          {activeItem === "bio" ?
            <p>bio</p> :
            <p>photo</p>}
        </Segment>
      </div>
    )
  }
}

export default Tabs