import React, { Component } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';

import { plugins, MentionPortal } from './prepare-plugins';
import HoverMenu from './plugins/menü';

import axios from 'axios';
const io = require('socket.io-client');
const socket = io('/');


// progress link
// https://docs.slatejs.org/walkthroughs/applying-custom-formatting

const initialValue = Value.fromJSON({
  "document": {
    "nodes": [
      {
        "object": "block",
        "type": "paragraph",
        "nodes": [
          {
            "object": "text",
            "leaves": [
              {
                "text":
                  "This example shows how you can make a hovering menu appear above your content, which you can use to make text "
              },
              {
                "text": "bold",
                "marks": [
                  {
                    "type": "bold"
                  }
                ]
              },
              {
                "text": ", "
              },
              {
                "text": "italic",
                "marks": [
                  {
                    "type": "italic"
                  }
                ]
              },
              {
                "text": ", or anything else you might want to do!"
              }
            ]
          }
        ]
      },
      {
        "object": "block",
        "type": "paragraph",
        "nodes": [
          {
            "object": "text",
            "leaves": [
              {
                "text": "Try it out yourself! Just "
              },
              {
                "text": "select any piece of text and the menu will appear",
                "marks": [
                  {
                    "type": "bold"
                  },
                  {
                    "type": "italic"
                  }
                ]
              },
              {
                "text": "."
              }
            ]
          }
        ]
      }
    ]
  }
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
    this.updateMenu()
  }

  componentDidUpdate = () => {
    this.updateMenu()
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

  updateMenu = () => {
    const menu = this.menu
    if (!menu) return

    const { value } = this.state
    const { fragment, selection } = value

    if (selection.isBlurred || selection.isCollapsed || fragment.text === '') {
      menu.removeAttribute('style')
      return
    }

    const native = window.getSelection()
    const range = native.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    menu.style.opacity = 1
    menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`

    menu.style.left = `${rect.left +
      window.pageXOffset -
      menu.offsetWidth / 2 +
      rect.width / 2}px`
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
    console.log(this.state.value);
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
        <HoverMenu innerRef={menu => (this.menu = menu)} editor={this.editor} />
      </div>
    )
  }


  renderMark = (props, next) => {
    const { children, mark, attributes } = props

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>
      case 'code':
        return <code {...attributes}>{children}</code>
      case 'italic':
        return <em {...attributes}>{children}</em>
      case 'underlined':
        return <u {...attributes}>{children}</u>
      default:
        return next()
    }
  }
}

const CodeNode = ({ attributes, children }) => (
  <pre {...attributes}>
    <code>{children}</code>
  </pre>
)
