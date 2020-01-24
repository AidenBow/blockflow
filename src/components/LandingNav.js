import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'

export default class LandingNav extends Component {
  state = { activeItem: '' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    switch(name) {
      case "flow" :
        window.location.href=`#1`
        break;
      case "our goal" :
        window.location.href=`#2`
        break;
      case "friends" :
        window.location.href=`#3`
        break;
    }
  }

  render() {
    const { activeItem } = this.state

    return (
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item
            name='flow'
            active={activeItem === 'flow'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='our goal'
            active={activeItem === 'our goal'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='friends'
            active={activeItem === 'friends'}
            onClick={this.handleItemClick}
          />
        </Menu>
      </Segment>
    )
  }
}