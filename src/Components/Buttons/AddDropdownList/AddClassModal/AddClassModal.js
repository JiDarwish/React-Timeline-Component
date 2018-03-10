import React, { Component } from 'react';
import Modal from '../../../../Helpers/Modal/Modal';
import classes from './addClassModal.css';
import { timelineStore } from '../../../../Store/';

// TODO: Style the form like the one on Hyfer
export default class AddClassModal extends Component {
  state = {
    className: '',
    starting_date: '',
    focusId: null,
    errorIds: []
  };

  onFocus = e => {
    this.setState({ focusId: e.target.id });
  };
  onBlur = e => {
    this.setState({ focusId: '' });
  };

  handleChangeClassNameInput = e => {
    const { id, value } = e.target;
    this.setState({ className: value });
    // validate the input
    if (this.state.className === '') {
      this.setState({ errorIds: [...this.state.errorIds, id] });
    }
  };

  handleChangeStartingDateInput = e => {
    this.setState({ starting_date: e.target.value });
  };

  addNewClass = () => {
    const { className, starting_date } = this.state;
    console.log('className', className);
    console.log('starting_date', starting_date);
    const { errorArea } = this.refs;
    if (!className || !starting_date) {
      errorArea.innerHTML = 'Please make sure to fill all the inputs';
      return;
    }

    timelineStore
      .addTheClass(className, starting_date)
      .then(res => {
        //Awesome got the response close the modal
        this.props.closeModal();
      })
      .catch(err => {
        errorArea.innerHTML =
          'There was a network error! Please make sure you have internet connection';
      });
  };
  render() {
    return (
      <div>
        <Modal
          title="Add a new class"
          visible={this.props.isToggled}
          closeModal={this.props.closeModal}
        >
          <label htmlFor="className">Class name</label>
          <input
            required
            id="className"
            type="text"
            value={this.state.className}
            onChange={this.handleChangeClassNameInput}
          />
          <label htmlFor="starting_date">Starting date</label>
          <input
            required
            id="starting_date"
            type="date"
            value={this.state.starting_date}
            onChange={this.handleChangeStartingDateInput}
          />
          <button onClick={this.addNewClass}>Add class</button>
          <button onClick={this.props.closeModal}>Cancel</button>
          <span ref="errorArea" style={{ color: 'red' }} />
        </Modal>
      </div>
    );
  }
}
