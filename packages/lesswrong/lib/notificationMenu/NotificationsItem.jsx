import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import { Dropdown, DropdownButton, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Posts, Comments } from "meteor/example-forum";
import Users from "meteor/vulcan:users";



class NotificationsItem extends Component {


  render() {

    currentUser = this.props.currentUser;
    notification = this.props.notification;
    className = "notification-item " + (notification.viewed ? "viewed" : "unviewed");
    return (
      <LinkContainer to={notification.link ? notification.link : "/"}>
        <MenuItem key={notification._id} className={className}>
            {notification.message}
        </MenuItem>
      </LinkContainer>
    )
  }

}

registerComponent('NotificationsItem', NotificationsItem)
