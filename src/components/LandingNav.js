import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'

export default class LandingNav extends Component {
  state = { activeItem: '' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    switch(name) {
      case "home" :
        window.location.href=`#1`
      case "messages" :
        window.location.href=`#2`
      case "friends" :
        window.location.href=`#3`
    }
    
  }

  render() {
    const { activeItem } = this.state

    return (
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='messages'
            active={activeItem === 'messages'}
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