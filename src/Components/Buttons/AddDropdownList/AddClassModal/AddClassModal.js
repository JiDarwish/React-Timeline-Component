import React, { Component } from 'react';
import Modal from '../../../../Helpers/Modal/Modal';

export default class AddClassModal extends Component {
  render() {
    return (
      <div>
        <Modal
          title="Add a new class"
          visible={this.props.isToggled}
          closeModal={this.props.closeModal}
        >
          <h1>Hi</h1>
        </Modal>
      </div>
    );
  }
}
