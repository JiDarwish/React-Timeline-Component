import React, { Component } from 'react';
import Modal from '../../../../Helpers/Modal/Modal';
import { timelineStore } from '../../../../Store';
import moment from 'moment';

export default class AddNewModuleModal extends Component {
  state = {
    selectedDate: '',
    selectedGroup: '',
    selectedModule: '',
    duration: '',
    validDate: null,
    errorMessage: ''
  };

  handleChangeDuration = e => {
    this.setState({ duration: e.target.value });
  };

  handleChangeGroup = e => {
    this.setState({ selectedGroup: e.target.value });
  };

  handleChangeSelectedModule = e => {
    this.setState({ selectedModule: e.target.value });
  };

  handleChangeDate = e => {
    // check there's no value selected in the date picker
    if (!e.target.value) {
      this.setState({
        validDate: false,
        errorMessage: 'Please provide a starting date for the module'
      });
      return;
    }
    const allSundays = timelineStore.getState().allSundays;

    let date = moment(e.target.value);
    const wantedDay = 0; // sunday
    const daysDif = date.day() - wantedDay;
    for (let x = 0; x < daysDif; x++) {
      date.subtract(1, 'days'); // keep going back in the week until it's a sunday
    }

    let settingValidDateWith = false;
    let thatSunday = null;
    // loop through all sundays and if it's not betweens them tell the user it cannot be done
    allSundays.forEach(sunday => {
      if (sunday.diff(date) === 0) {
        thatSunday = date.format('YYYY-MM-DD');
        settingValidDateWith = true;
      }
    });
    this.setState({
      validDate: settingValidDateWith
    });
    if (settingValidDateWith) {
      this.setState({ selectedDate: thatSunday, errorMessage: '' });
    } else {
      this.setState({
        errorMessage:
          'Please provide a date that is not out of the range of current classes'
      });
    }
  };

  renderSelectModule = modules => {
    return (
      <select
        name="modulesSelect"
        defaultValue={this.state.selectedModule}
        onChange={this.handleChangeSelectedModule}
      >
        {modules.map(module => (
          <option key={module.module_name} value={module}>
            {module.module_name}
          </option>
        ))}
      </select>
    );
  };

  renderSelectGroup = groups => {
    return (
      <select
        name="groupSelect"
        defaultValue={this.state.selectedGroup}
        onChange={this.handleChangeGroup}
      >
        {groups.map(group => (
          <option key={group} value={group}>
            {group}
          </option>
        ))}
      </select>
    );
  };

  renderDurationOfModule = () => {
    return (
      <select
        name="durationOfModule"
        defaultValue={this.state.duration}
        onChange={this.handleChangeDuration}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
    );
  };

  handleAddModule = e => {
    if (!this.state.validDate) {
      this.setState({
        errorMessage:
          'Please provide a valid starting date for the module to be added'
      });
      return;
    }
    const { items } = this.props;
    let className = Object.keys(items).filter(
      group => group === this.state.selectedGroup
    );
    className = className.length === 0 ? 'All classes' : className[0];

    const modulesOfGroup = items[className] || null;

    const {
      selectedGroup,
      duration,
      selectedDate,
      selectedModule
    } = this.state;
    let groupWithId = 'All classes';
    if (className.length !== 0) {
      groupWithId = this.props.groupsWithIds.filter(
        group => group.group_name === selectedGroup
      )[0];
    }
    timelineStore.handleAddModule(
      selectedModule,
      groupWithId,
      duration,
      selectedDate,
      modulesOfGroup
    );
  };

  // set up the default state
  componentWillReceiveProps = props => {
    const { modules, groups, items } = props;
    if (!modules || !groups || !items) return;
    this.setState({
      selectedGroup: 'All classes',
      selectedModule: modules[0],
      duration: 1
    });
  };

  render() {
    const { groups } = this.props;
    const { modules, allSundays } = timelineStore.getState();
    if (!groups || !modules || !allSundays) return null;
    const groupsPlus = ['All classes', ...groups];

    return (
      <div>
        <Modal
          title="Add a new module"
          visible={this.props.isToggled}
          closeModal={this.props.closeModal}
        >
          <label htmlFor="groupSelect">Group</label>
          {this.renderSelectGroup(groupsPlus)}
          <label htmlFor="moduleSelect">Module</label>
          {this.renderSelectModule(modules)}
          <label htmlFor="durationOfModule">Duration (weeks)</label>
          {this.renderDurationOfModule()}
          <label htmlFor="sundaySelect">Starting date of module</label>
          <input
            type="date"
            name="sundaySelect"
            value={this.state.selectedDate}
            onChange={this.handleChangeDate}
          />
          {/* FIXME: set a min and a max attr */}
          <span>{this.state.errorMessage}</span>
          <button onClick={this.props.closeModal}>Cancel</button>
          <button onClick={this.handleAddModule}>Ok</button>
        </Modal>
      </div>
    );
  }
}
