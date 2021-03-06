import React, { PropTypes, Component } from 'react';
import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import { Editable, createEmptyState } from 'ory-editor-core';
import { Toolbar } from 'ory-editor-ui'
import withEditor from './withEditor.jsx'



class CommentEditor extends Component {
  constructor(props, context) {
    super(props,context);
    let editor = this.props.editor;
    const document = this.props.document;
    let state = document && document.content ? document.content : createEmptyState();
    this.state = {
      contentState: state,
    };
    editor.trigger.editable.add(state);
  }

  componentWillMount() {
    //Add function for resetting form to form submit callbacks
    const resetEditor = (result) => {
      // On Form submit, create a new empty editable
      let editor = this.props.editor;
      let state = createEmptyState();
      editor.trigger.editable.add(state);
      this.setState({
        contentState: state,
      });
      return result;
    }
    this.context.addToSuccessForm(resetEditor);
  }

  render() {
    const addValues = this.context.addToAutofilledValues;
    let editor = this.props.editor;
    const onChange = (state) => {
      addValues({content: state});
      return state;
    }
    return (
      <div className="commentEditor">
        <Editable editor={editor} id={this.state.contentState.id} onChange={onChange} />
        <Toolbar editor={editor} />
      </div>
    )
  }
}

CommentEditor.contextTypes = {
  addToAutofilledValues: React.PropTypes.func,
  addToSuccessForm: React.PropTypes.func,
};

registerComponent('CommentEditor', CommentEditor, withEditor, withCurrentUser);

export default withEditor(CommentEditor);
