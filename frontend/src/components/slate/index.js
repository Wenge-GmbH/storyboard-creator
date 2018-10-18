import React, { Component } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';

import { plugins, MentionPortal } from './prepare-plugins';

import axios from 'axios';
const io = require('socket.io-client');
const socket = io('/');


// progress link
// https://docs.slatejs.org/walkthroughs/applying-custom-formatting

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'Type here:>',
              },
            ],
          },
        ],
      },
    ],
  },
});

function writeOutAnd(e, change) {
  // if(e.key !== '&') return;
  // e.preventDefault();
  // change.insertText('and');
  // return true;
}

export default class SlateEditor extends Component {
  state = {
    value: initialValue,
  }
  editor = React.createRef();

  onChange = ({ value, operations }, options = {}) => {
    //https://github.com/ianstormtaylor/slate/blob/master/examples/syncing-operations/index.js
    this.setState({ value });

    if(!this.remote) {
      socket.emit('sync-editor', {
        operations,
        state: JSON.stringify(value.toJSON())
      });
    }
  }
  componentDidMount() {
    axios.get('/editor-state').then(({data}) => {
      const actualState = Value.fromJSON(data);
      this.setState({value: actualState})
    })
    socket.on('sync-editor', (ops) => {
      this.applyOperations(ops);
    })
  }
  applyOperations = operations => {
    const ops = operations
      .filter(o => o.type !== 'set_selection' && o.type !== 'set_value')
    ;
    console.log(operations);
    // const { value } = this.state;
    // const change = value.change().applyOperations(ops);
    // this.onChange(change, { remote: true })
    // this.setState({value: change.value})

    this.remote = true;
    this.editor.change(change => change.applyOperations(ops));
    this.remote = false;
  }

  onKeyDown = (e, change, next, asd) => {
    writeOutAnd(e, change);
    if (!e.ctrlKey) return;
    switch (e.key) {
      // When "`" is pressed, keep our existing code block logic.
      case '+': {
        e.preventDefault();
        // Determine whether any of the currently selected blocks are code blocks.
        const isCode = change.value.blocks.some(block => block.type === 'code')
        change.setBlocks(isCode ? 'paragraph' : 'code');
        return true;
      }
      default:
        return;
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
    return (
      <div className="editor">
        <Editor
          ref={this.editor}
          plugins={plugins}
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderNode={this.renderNode}
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
