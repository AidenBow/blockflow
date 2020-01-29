import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react'
import Journal from "./Journal"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { faBook, faListUl } from '@fortawesome/free-solid-svg-icons'

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
          >
            <FontAwesomeIcon icon={faBook} size="2x"/>
          </Menu.Item>
          <Menu.Item
            name='Log Hours'
            active={activeItem === 'Log Hours'}
            onClick={this.handleItemClick}
          >
            <FontAwesomeIcon icon={faClock} size="2x"/>
          </Menu.Item>
          <Menu.Item
            name='Settings'
            active={activeItem === 'Settings'}
            onClick={this.handleItemClick}
          >
            <FontAwesomeIcon icon={faListUl} size="2x"/>
          </Menu.Item>

        </Menu>
        <Segment attached='bottom'>
          {activeItem === "Journal" ?
            <Journal /> : activeItem === "Log Hours" ?
            <p>entrys</p> :
            <p>settings</p>
          }
        </Segment>
      </div>
    )
  }
}

export default Tabs