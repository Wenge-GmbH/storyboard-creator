import React from 'react';
import { addMark, MentionPlugin } from './plugins';

const mentionPlugin = MentionPlugin({
  trigger: '@',
  list: [],
  supportWhiteSpace: false
});
export const { MentionPortal } = mentionPlugin;

export const plugins = [
  mentionPlugin,
  addMark({ key: 'b', type: 'bold', Component: props => <strong>{props.children}</strong> }),
  addMark({ key: 'ü', type: 'code' , Component: props => <code>{props.children}</code> }),
  addMark({ key: 'i', type: 'italic', Component: props => <em>{props.children}</em> }),
  addMark({ key: '~', type: 'strikethrough', Component: props => <del>{props.children}</del> }),
  addMark({ key: 'u', type: 'underline', Component: props => <u>{props.children}</u> }),
];
