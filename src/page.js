/** @format */

import React, { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";
class Page extends Component {
  render() {
    return (
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">
            <div class="card">
              <img src="..." class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">SYSTEM 1</h5>
                <p class="card-text">Access</p>
                <Link to="/register">Register</Link>
                <div>
                  <Link to="/login">Login</Link>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="card">
              <img src="..." class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">System 2</h5>
                <p class="card-text">Access</p>
                <Link to="/register">Register</Link>
                <div>
                  <Link to="/login">Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Page;
