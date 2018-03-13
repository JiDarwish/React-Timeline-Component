import React, { Component } from 'react';

import Modal from '../../../../Helpers/Modal/Modal';
import { timelineStore } from '../../../../Store/';

export default class AssignTeacherModal extends Component {
  state = {
    teacher1: '',
    teacher2: ''
  };

  handleAssignTeahcers = () => {
    const { teacher1, teacher2 } = this.state;
    const { selectedModule } = this.props;
    timelineStore
      .handleAssignTeachers(selectedModule, teacher1, teacher2)
      .then(() => this.props.closeModal())
      .catch(err => console.log(err));
  };

  handleChangeTeacher = (e, num) => {
    if (num === 1) {
      this.setState({
        teacher1: e.target.value
      });
    } else {
      this.setState({
        teacher2: e.target.value
      });
    }
  };

  renderSelectTeacher = num => {
    const { teachers } = this.props;
    return (
      <select
        name={`teacherSelect${num}`}
        value={this.state[`teacher${num}`]}
        onChange={e => this.handleChangeTeacher(e, num)}
      >
        {teachers.map(teacher => (
          <option key={teacher.id} value={teacher.id}>
            {teacher.username}
          </option>
        ))}
      </select>
    );
  };

  render() {
    const { selectedModule, teachers } = this.props;
    let title;
    if (selectedModule) {
      const { module_name, group_name } = this.props.selectedModule;
      title = `Assign teachers to teach ${group_name} ${module_name} module`;
    }

    let selectTeacher1 = null;
    let selectTeacher2 = null;
    if (teachers) {
      selectTeacher1 = this.renderSelectTeacher(1);
      selectTeacher2 = this.renderSelectTeacher(2);
    }
    return (
      <div>
        <Modal
          visible={this.props.visible}
          closeModal={this.props.closeModal}
          title={title}
        >
          <label htmlFor="teacher1">Teacher 1:</label>
          {selectTeacher1}
          <label htmlFor="teacher2">Teacher 2:</label>
          {selectTeacher2}
          <button onClick={this.props.closeModal}>Cancel</button>
          <button onClick={this.handleAssignTeahcers}>Ok</button>
        </Modal>
      </div>
    );
  }
}
