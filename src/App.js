import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.scss';

import { getSettings } from './redux/settings';
import FormDifficultyGame from './Components/Form';
import PlayBoard from './Components/PlayBoard';
import BoardWinners from './Components/BordWiners';


class App extends Component {

  componentDidMount = () => this.props.getSettings()

  render() {
    return (
      <div className="main-content">
        <div className="main-content__left-part">
          <FormDifficultyGame />
          <PlayBoard />
        </div>
        <div className="main-content__left-part">
          <BoardWinners />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  getSettings
}

export default connect(null, mapDispatchToProps)(App);
