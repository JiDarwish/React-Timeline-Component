import React, { Component } from 'react';

import Modal from '../../../../Helpers/Modal/Modal';

export default class AssignTeacherModal extends Component {
  render() {
    //TODO: Subscribe to the class responsible to get users and filter to get onlt the
    // teachers then put them in a select tag to choose one of them
    const { selectedModule } = this.props;
    console.log(this.props); // assign teacher function is pulled from the store to here USE IT
    let title;
    if (selectedModule) {
      const { module_name, group_name } = this.props.selectedModule;
      title = `Assign teachers to teach ${group_name} ${module_name} module`;
    }
    return (
      <div>
        <Modal
          visible={this.props.visible}
          closeModal={this.props.closeModal}
          title={title}
        >
          <h1>Hey some day I'll let you add teachers</h1>
        </Modal>
      </div>
    );
  }
}
