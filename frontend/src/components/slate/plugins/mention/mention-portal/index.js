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
    callback.closePortal = this.closePortal;
  }

  state = {
    filteredSuggestions: [],
    selectedIndex: 0,
    open: false,
  }

  componentDidMount() {
    // this.adjustPosition()
  }

  componentDidUpdate() {
    this.adjustPosition()
  }

  onKeyDown = (keyCode, match) => {
    const { filteredSuggestions } = this.state;

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
      if(match === this.state.match) {
        this.openPortal();
        return;
      }
      this.setState({
        match
      }, this.openPortal)
    }
  }

  openPortal = () => {
    const { open } = this.state;
    if(open) return;

    this.setState({
      open: true
    })
  }

  closePortal = () => {
    const { open } = this.state;
    if(!open) return;

    this.setState({
      open: false
    })
  }

  adjustPosition = () => {
    const selection = window.getSelection();
    if(!selection) return;
      // console.log(selection.getRangeAt(0));
    // console.log(selection.anchorNode);
  }

  render() {
    return (
      <Portal open={this.state.open}>
        <div className="portal">I AM THE PORTAL</div>
      </Portal>
    );
  }
}
