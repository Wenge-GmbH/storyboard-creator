import React, { Component } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import axios from 'axios';


import { plugins, MentionPortal } from './prepare-plugins';
import initialValue  from './initial-value';

const io = require('socket.io-client');
const socket = io('/');


// progress link
// https://docs.slatejs.org/walkthroughs/applying-custom-formatting


function writeOutAnd(e, change) {
  // if(e.key !== '&') return;
  // e.preventDefault();
  // change.insertText('and');
  // return true;
}

export default class SlateEditor extends Component {
  state = {
    value: null,
  }
  // editor = React.createRef();

  onChange = ({ value, operations }) => {
    //https://github.com/ianstormtaylor/slate/blob/master/examples/syncing-operations/index.js
    this.setState({ value });

    if(!this.remote) {
      const ops = this.getOperations();

      socket.emit('sync-editor', {
        operations,
        state: JSON.stringify(value.toJSON())
      });
    }
  }

  // gotta syncronicing
  getOperations = () => {

  }

  componentDidMount() {
    axios.get('/editor-state').then(({data}) => {
      console.log(data);
      if(!data || data.document.nodes.length === 0) {
        this.setState({ value: initialValue });
        return;
      };
      const actualState = Value.fromJSON(data);
      this.setState({ value: actualState })
    })
    socket.on('sync-editor', (ops) => {
      this.applyOperations(ops);
    })
  }

  applyOperations = operations => {
    const ops = operations
      .filter(
        o =>
        o.type !== 'set_selection' &&
        o.type !== 'set_value' &&
        (!o.data || !o.data.has('source'))
      )
      .toJS()
      .map(o => ({...o, data: {source: socket.id}}))

    ;
    console.log('apply Operations');
    // const { value } = this.state;
    // const change = value.change().applyOperations(ops);
    // this.onChange(change, { remote: true })
    // this.setState({value: change.value})

    this.remote = true;
    this.editor.change(change => change.applyOperations(ops));
    this.remote = false;
  }

  onKeyDown = (e, change, next) => {
    // writeOutAnd(e, change);
    if (!e.ctrlKey) return next();
    switch (e.key) {
      // When "`" is pressed, keep our existing code block logic.
      case '+': {
        e.preventDefault();
        // Determine whether any of the currently selected blocks are code blocks.
        const isCode = change.value.blocks.some(block => block.type === 'code')
        change.setBlocks(isCode ? 'paragraph' : 'code');
        return next();
      }
      default:
        return next();
    }
  }

  renderNode = (props) => {
    switch (props.node.type) {
      case 'code':
        return <CodeNode {...props} />;
      default:
        return null;
    }
  }

  render() {
    if(!this.state.value) return <div>loading...</div>;

    return (
      <div className="editor">
        <Editor
          // ref={this.editor}
          plugins={plugins}
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          // renderNode={this.renderNode}
        />
        <MentionPortal
          editor={this.editor}
         />
      </div>
    )
  }
}

const CodeNode = ({ attributes, children }) => (
  <pre {...attributes}>
    <code>{children}</code>
  </pre>
)
