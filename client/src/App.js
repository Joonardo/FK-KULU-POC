import React, { Component } from 'react';
import 'whatwg-fetch';

class App extends Component {
  update = (ev) => {
    const newState = Object.assign({}, this.state);
    newState[ev.target.name] = ev.target.value;
    this.setState(newState);
  }

  onSubmit = (ev) => {
    ev.preventDefault();

    fetch('/submit', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state)
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input type="text" name="f1" onInput={this.update} />
        <input type="text" name="f2" onInput={this.update} />
        <input type="submit" />
      </form>
    );
  }
}

export default App;
