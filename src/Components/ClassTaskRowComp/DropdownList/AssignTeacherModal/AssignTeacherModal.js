import React, { Component } from 'react';

import Modal from '../../../../Helpers/Modal/Modal';

export default class AssignTeacherModal extends Component {
  render() {
    // console.log(this.props);
    //TODO: Subscribe to the class responsible to get users and filter to get onlt the
    // teachers then put them in a select tag to choose one of them
    const { selectedModule } = this.props;
    // assign teacher function is pulled from the store to here USE IT
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
          <label htmlFor="teacher1">Teacher 1:</label>
          <select name="teacher1">
            <option value="TODO: teacher user object">Mkruit</option>
            <option value="TODO: teacher user object">Jim</option>
          </select>
          <label htmlFor="teacher2">Teacher 2:</label>
          <select name="teacher2">
            <option value="TODO: teacher user object">Mkruit</option>
            <option value="TODO: teacher user object">Jim</option>
          </select>
          <button onClick={this.props.closeModal}>Cancel</button>
          <button>Ok</button>
        </Modal>
      </div>
    );
  }
}
