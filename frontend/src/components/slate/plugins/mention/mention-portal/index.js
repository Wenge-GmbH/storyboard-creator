import React, { Component } from 'react';

import Portal from './portal';
import Suggestions from './suggestions';
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
    callback.openPortal = this.openPortal;
  }

  state = {
    filteredSuggestions: [],
    selectedIndex: 0,
    open: false,
    pos: {
      x: 0,
      y: 0,
    }
  }

  componentDidMount() {
    this.positionPortal()
  }

  componentDidUpdate() {

  }

  onKeyDown = (keyCode, input) => {
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
    } else if(input === this.state.input) {
      this.openPortal();
      return;
    }

    this.setState({
      input
    }, this.openPortal)
  }

  openPortal = () => {
    const { open } = this.state;
    if(open) return;

    this.setState({
      open: true
    }, () => {
      this.positionPortal();
    })
  }

  closePortal = () => {
    const { open } = this.state;
    if(!open) return;

    this.setState({
      open: false
    })
  }

  positionPortal = () => {
    const selection = window.getSelection();
    if(!selection || selection.rangeCount === 0) return;
    // console.log(this.state.input);
    const range = selection.getRangeAt(0).cloneRange();
    let test = range.startContainer.data.lastIndexOf(this.props.trigger);
    if(test === -1) {
      test = range.startOffset;
    }
    console.log(range.commonAncestorContainer.data);
    range.setStart(range.startContainer, test)
    const rect = range.getBoundingClientRect();
    const pos = {};
    this.setState({
      pos: {
        y: rect.y + rect.height + 3,
        x: rect.x
      }
    })
  }

  render() {
    return (
      <Portal open={this.state.open}>
        <Suggestions pos={this.state.pos} open={this.state.open}>
          I AM THE PORTAL
        </Suggestions>
      </Portal>
    );
  }
}
