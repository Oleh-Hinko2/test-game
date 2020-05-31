import React, { Component } from 'react';

class SelectFields extends Component {

  options = [
    {
      id: 1,
      value: '',
      name: 'Pick game mood ..'
    },
    {
      id: 2,
      value: 'easyMode',
      name: 'Easy Mode'
    },
    {
      id: 3,
      value: 'normalMode',
      name: 'Normal Mode'
    }, 
    {
      id: 4,
      value: 'hardMode',
      name: 'Hard Mode'
    }
  ]

  renderOptions = () => this.options.map(option => <option key={option.id} value={option.value}>{option.name}</option>)

  render() {
    const {value, onChange, name, id} = this.props;
    return (
      <span>
        <select
          name={name}
          value={value}
          onChange={onChange}
          id={id}
        >
          {this.renderOptions()}
        </select>
      </span>
    )
  }
}

export default SelectFields;
