import React, {Component} from 'react';
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';
import { registerComponent, Components, withCurrentUser } from 'meteor/vulcan:core';
import IconButton from 'material-ui/IconButton';
import RemoveIcon from 'material-ui/svg-icons/content/remove-circle-outline';
import DragIcon from 'material-ui/svg-icons/editor/drag-handle';
import {List, ListItem} from 'material-ui/List';


const SortableItem = SortableElement(({sequenceId, currentUser, removeItem}) =>
  <li className="sequences-list-editor-item">
    <Components.SequencesListEditorItem documentId={sequenceId} currentUser={currentUser} removeItem={removeItem} />
  </li>
);

const SortableList = SortableContainer(({items, currentUser, removeItem}) => {
  if (items) {
    return (
      <div>
        {items.map((sequenceId, index) => (
          <SortableItem key={`item-${index}`} removeItem={removeItem} index={index} sequenceId={sequenceId} currentUser={currentUser}/>
        ))}
      </div>
    );
  } else {
    return <div>No Sequences added yet</div>
  }

});

class SequencesListEditor extends Component {
  constructor(props, context) {
    super(props, context);
    const fieldName = props.name;
    let sequenceIds = [];
    if (props.document[fieldName]) {
      console.log("Initiating sequencesList: ", props.document[fieldName]);
      sequenceIds = _.compact(JSON.parse(JSON.stringify(props.document[fieldName])));
    }
    this.state = {
      sequenceIds: sequenceIds,
    }
    const addValues = this.context.addToAutofilledValues;
    addValues({[fieldName]: sequenceIds});

    const addToSuccessForm = this.context.addToSuccessForm;
    addToSuccessForm((results) => this.resetSequenceIds(results));
  }
  onSortEnd = ({oldIndex, newIndex}) => {
    console.log("onSortEnd", oldIndex, newIndex, this.state.sequenceIds);
    const fieldName = this.props.name;
    const addValues = this.context.addToAutofilledValues;
    const newIds = arrayMove(this.state.sequenceIds, oldIndex, newIndex);
    this.setState({
      sequenceIds: newIds,
    });
    addValues({[fieldName]: newIds});
  };
  addSequenceId = (sequenceId) => {
    const newIds = _.compact([...this.state.sequenceIds, sequenceId]);
    this.setState({
      sequenceIds: newIds,
    })
    const fieldName = this.props.name;
    const addValues = this.context.addToAutofilledValues;
    addValues({[fieldName]: newIds});
  }
  removeSequenceId = (sequenceId) => {
    const newIds = _.without(this.state.sequenceIds, sequenceId);
    console.log("removeSequenceId", newIds);
    this.setState({
      sequenceIds: newIds || [],
    })
    const fieldName = this.props.name;
    const addValues = this.context.addToAutofilledValues;
    addValues({[fieldName]: newIds});
  }
  resetSequenceIds = (args) => {
    this.setState({
      sequenceIds: [],
    })
    return args;
  }

  shouldCancelStart = (e) => {
    // Cancel sorting if the event target is an `input`, `textarea`, `select`, 'option' or 'svg'
    const disabledElements = ['input', 'textarea', 'select', 'option', 'button', 'svg'];
    if (disabledElements.indexOf(e.target.tagName.toLowerCase()) !== -1) {
      return true; // Return true to cancel sorting
    }
  }

  render() {
    return <div className="sequences-list-editor">
      <SortableList items={this.state.sequenceIds} onSortEnd={this.onSortEnd} currentUser={this.props.currentUser} removeItem={this.removeSequenceId} shouldCancelStart={this.shouldCancelStart}/>
      <Components.SequencesSearchAutoComplete clickAction={this.addSequenceId}/>
    </div>
  }
}

//

SequencesListEditor.contextTypes = {
  addToAutofilledValues: React.PropTypes.func,
  addToSuccessForm: React.PropTypes.func,
};

registerComponent("SequencesListEditor", SequencesListEditor, withCurrentUser);
