import React from 'react';
import { addMark, mention } from './plugins';

const plugins = [
  mention({ key: '@', list: [] }),
  addMark({ key: 'b', type: 'bold', Component: props => <strong>{props.children}</strong> }),
  addMark({ key: 'ü', type: 'code' , Component: props => <code>{props.children}</code> }),
  addMark({ key: 'i', type: 'italic', Component: props => <em>{props.children}</em> }),
  addMark({ key: '~', type: 'strikethrough', Component: props => <del>{props.children}</del> }),
  addMark({ key: 'u', type: 'underline', Component: props => <u>{props.children}</u> }),
];

export default plugins;
