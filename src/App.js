/** @format */

import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Web3 from "web3";
import uauth from "./truffle_abis/userauth.json";
import { create } from "ipfs-http-client";
import Navbar from "./Navbar";
import SystemSelection from "./SystmSelection";

const ipfs = create({ host: "ipfs.infura.io", port: 5001, protocol: "https" });

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      userauth: null,
      system: null, // Store the selected system
      email: "",
      password: "",
      message: "",
    };
  }

  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("No Ethereum browser detected");
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ user: accounts[0] }); // Store the user's Ethereum address
    const NetworkId = await web3.eth.net.getId();

    const udata = uauth.networks[NetworkId];
    if (udata) {
      const userauth = new web3.eth.Contract(uauth.abi, udata.address);
      this.setState({ userauth });
    } else {
      window.alert("userauth not deployed");
    }
  }

  handleSystemSelection = (selectedSystem) => {
    this.setState({ system: selectedSystem });
  };

  handleRegister = async (email, password) => {
    try {
      if (!this.state.userauth || !this.state.system) {
        return;
      }

      const userDetails = {
        system: this.state.system, // Store the selected system
        email: email,
        password: password,
      };

      // Step 1: Upload user details to IPFS
      const ipfsResponse = await ipfs.add(JSON.stringify(userDetails));
      const ipfsHash = ipfsResponse.path;

      // Step 2: Register the user using the contract
      const accounts = await window.web3.eth.getAccounts();
      await this.state.userauth.methods
        .registerUser(userDetails, ipfsHash)
        .send({
          from: accounts[0],
        });

      this.setState({ message: "User registered successfully!" });
    } catch (error) {
      this.setState({ message: "Error: " + error.message });
    }
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <Navbar user={this.state.user} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h2>User Registration</h2>
            <SystemSelection
              user={this.state.user}
              onSelect={this.handleSystemSelection}
            />
            {this.state.system && (
              <div>
                <p>Selected System: {this.state.system}</p>
                <input
                  type="text"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
                <button
                  onClick={() =>
                    this.handleRegister(this.state.email, this.state.password)
                  }
                >
                  Register
                </button>
                <p>{this.state.message}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
