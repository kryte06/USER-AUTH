/** @format */

import React, { Component } from "react";

class SystemSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSystem: null,
    };
  }

  handleSystemSelect = (system) => {
    this.setState({ selectedSystem: system });
    this.props.onSelect(system); // Notify the parent component of the selected system
  };

  render() {
    const systems = ["System A", "System B", "System C"]; // Replace with your system names

    return (
      <div>
        <h3>Select a System:</h3>
        <p>user: {this.props.user}</p>
        <ul>
          {systems.map((system, index) => (
            <li key={index}>
              <button onClick={() => this.handleSystemSelect(system)}>
                {system}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default SystemSelection;
