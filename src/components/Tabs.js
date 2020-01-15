import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react'

class Tabs extends Component {
  state = { activeItem: 'Journal' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return(
      <div className="tabs">
        <Menu attached='top' tabular>
          <Menu.Item
            name='Journal'
            active={activeItem === 'Journal'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='Logs'
            active={activeItem === 'Logs'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='Settings'
            active={activeItem === 'Settings'}
            onClick={this.handleItemClick}
          />

        </Menu>

        <Segment attached='bottom'>
          {activeItem === "Journal" ?
            <p>bla bla</p> : activeItem === "Logs" ?
            <p>entrys</p> :
            <p>settings</p>
          }
        </Segment>
      </div>
    )
  }
}

export default Tabs