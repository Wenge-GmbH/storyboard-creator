import React from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button style={{width: '20px', height: '20px', backgroundColor: 'black'}}></button>
);
const Icon = (props) => (
  <div style={{width: '20px', height: '20px', 'backgroundColor': 'black'}}></div>
);
const StyledMenu = (props) => (
  <div style={{width: '200px', height: '40px', backgroundcolor: 'black'}}>{this.props}</div>
);

class HoverMenu extends React.Component {

  render() {
    const { className, innerRef } = this.props
    const root = window.document.getElementById('root')

    return ReactDOM.createPortal(
      <StyledMenu className={className} innerRef={innerRef}>
        {this.renderMarkButton('bold', 'format_bold')}
        {this.renderMarkButton('italic', 'format_italic')}
        {this.renderMarkButton('underlined', 'format_underlined')}
        {this.renderMarkButton('code', 'code')}
      </StyledMenu>,
      root
    )
  }

  renderMarkButton(type) {
    return (
      <Button
      >
        <Icon>hi</Icon>
      </Button>
    )
  }

  onClickMark(event, type) {
    const { editor } = this.props
    event.preventDefault()
    editor.change(change => change.toggleMark(type))
  }
}

export default HoverMenu;
