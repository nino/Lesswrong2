/*

Button used to add a new feed to a user profile

*/

import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Components, registerComponent, ModalTrigger, withList, withCurrentUser, getFragment } from 'meteor/vulcan:core';
import { Redirect, withRouter } from 'react-router';
import RSSFeeds from '../collections/rssfeeds/collection.js';
import { Posts } from 'meteor/example-forum'

class editFeedButton extends Component {
  render() {
    return (
        <Components.SmartForm
          collection={RSSFeeds}
          documentId={this.props.feed._id}
          prefilledProps={ {userId: this.props.feed.userId} }
          mutationFragment={getFragment('RSSFeedMutationFragment')}
          successCallback={feed => {
            this.props.closeModal();
            this.props.flash("Successfully edited feed", 'success');
          }}
          removeSuccessCallback={({documentId, documentTitle}) => {
            this.props.flash("Successfully deleted feed", "success");
            // todo: handle events in collection callbacks
            // this.context.events.track("post deleted", {_id: documentId});
          }}
          showRemove={true}
        />
      )
    }
}

registerComponent('editFeedButton', editFeedButton, withCurrentUser, withRouter);
