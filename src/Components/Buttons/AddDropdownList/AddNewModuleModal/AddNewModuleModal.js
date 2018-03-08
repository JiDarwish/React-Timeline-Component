import React, { Component } from 'react';
import Modal from '../../../../Helpers/Modal/Modal';

export default class AddNewModuleModal extends Component {
  render() {
    console.log('I got the groups make a dropdownList', this.props.groups);
    return (
      <div>
        <Modal
          title="Add a new module"
          visible={this.props.isToggled}
          closeModal={this.props.closeModal}
        >
          <h1>Hi</h1>
        </Modal>
      </div>
    );
  }
}
