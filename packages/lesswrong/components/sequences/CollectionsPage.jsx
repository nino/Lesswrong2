import React, { PropTypes, Component } from 'react';
import { Components, withDocument, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import Collections from '../../lib/collections/collections/collection.js';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';

class CollectionsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
    }
  }

  showEdit = () => {
    this.setState({edit: true})
  }

  showCollection = () => {
    this.setState({edit: false})
  }

  render() {
    const {document, currentUser, loading} = this.props;
    if (loading || !document) {
      return <Components.Loading />;
    } else if (this.state.edit) {
      return <Components.CollectionsEditForm
                documentId={document._id}
                successCallback={this.showCollection}
                cancelCallback={this.showCollection} />
    } else {
      const startedReading = false; //TODO: Check whether user has started reading sequences
      const collection = document;
      const canEdit = Users.canDo(currentUser, 'collections.edit.all') || (Users.canDo(currentUser, 'collections.edit.own') && Users.owns(currentUser, collection))
      return (<div className="collections-page">
        <Components.Section titleComponent={canEdit ? <a onTouchTap={this.showEdit}>edit</a> : null}>
          <div className="collections-header">
            <h1 className="collections-title">{collection.title}</h1>
            <div className="collections-description">
              {collection.description ? <Components.ContentRenderer state={collection.description} /> : null}
            </div>
            <FlatButton backgroundColor="rgba(0,0,0,0.05)" label={startedReading ? "Continue Reading" : "Start Reading"} containerElement={<Link to={document.firstPageLink} />}/>
          </div>
        </Components.Section>
        <div className="collections-page-content">
          {/* For each book, print a section with a grid of sequences */}
          {collection.books.map(book => <Components.BooksItem collection={collection} book={book} canEdit={canEdit} />)}
        </div>
        {canEdit ? <Components.BooksNewForm prefilledProps={{collectionId: collection._id}} /> : null}
      </div>);
    }
  }
}

const options = {
  collection: Collections,
  queryName: "CollectionsPageQuery",
  fragmentName: 'CollectionsPageFragment',
  totalResolver: false,
};

registerComponent('CollectionsPage', CollectionsPage, [withDocument, options], withCurrentUser);
