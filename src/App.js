import React from 'react';
import { connect } from "react-redux";
import { getColumnsRequest } from "./store/actions/columns";
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  componentDidMount() {
    this.props.getColumnsRequest();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  loader: state.loader
});
const mapDispatchToProps = {
  getColumnsRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
