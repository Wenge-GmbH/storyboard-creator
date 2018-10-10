// import React from 'react';
// import escapeRegExp from 'lodash/escapeRegExp';
// import regExp from './regExp/default';

export const mentionPlugin = ({trigger, list}) => ({
    onKeyDown(e, change) {
      const { value } = change;
      const { text } = value.blocks.first();
      // console.log(text);
      // const reg = new RegExp(`${escapeRegExp('@.')}(${regExp}|\\s){0,}`, 'g')
      // console.log(reg);
      // console.log(change.value.isFocused);
    }
  }
)

// https://www.npmjs.com/package/slate-suggestions
// https://github.com/draft-js-plugins/draft-js-plugins/blob/master/draft-js-mention-plugin/src/mentionSuggestionsStrategy.js
//https://www.draft-js-plugins.com/plugin/mention
//
//
