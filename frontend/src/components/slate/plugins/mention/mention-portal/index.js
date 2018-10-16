import React, { Component } from 'react';

import Portal from './portal';
import {
  UP_ARROW_KEY,
  DOWN_ARROW_KEY,
  ENTER_KEY,
  RESULT_SIZE,
} from '../consts';

export default class MentionPortal extends Component {
  constructor({ callback }) {
    super();
    callback.onKeyDown = this.onKeyDown;
  }

  state = {
    filteredSuggestions: [],
    selectedIndex: 0,
  }

  componentDidMount() {
    // this.adjustPosition()
  }

  componentDidUpdate() {
    // this.adjustPosition()
  }

  onKeyDown = (keyCode, match) => {
    const { filteredSuggestions } = this.state;
    console.log(match);

    if(keyCode === DOWN_ARROW_KEY) {
      // check if index exceeds suggestion length
      // update selected index
      // set current suggestion
      // update state with both

    } else if (keyCode === UP_ARROW_KEY) {
      // check if index === 0
      // update selected index
      // set current suggestion
      // update state with both
    } else {
      if(match === this.state.match) return;
      this.setState({
        match
      })
    }
  }

  render() {
    return (
      <Portal>

      </Portal>
    );
  }
}
