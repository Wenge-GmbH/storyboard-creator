import React from 'react';
import returnMatch from './strategy';
import Portal from './mention-portal';

const UP_ARROW_KEY = 38;
const DOWN_ARROW_KEY = 40;
const ENTER_KEY = 13;
const RESULT_SIZE = 5;

export const mentionPlugin = ({
  trigger = '@',
  list = [],
  supportWhiteSpace = false
}) => {
  const callback = {};

  return {
    onKeyDown(e, change) {
      const { text } = change.value.blocks.first();
      const match = returnMatch(trigger, text, supportWhiteSpace);
      // console.log(match, text);
      if(!match) return;

      const { keyCode } = e;

      if(keyCode === UP_ARROW_KEY || keyCode === DOWN_ARROW_KEY) {
        e.preventDefault();
      }

      if(keyCode === ENTER_KEY) {
        e.preventDefault()


      };
    },
    MentionPortal: (props) => <Portal
      {...props}
      {...{
        trigger,
        list,
        supportWhiteSpace,
        callback
      }}

    />
  };
}

// https://www.npmjs.com/package/slate-suggestions
// https://github.com/draft-js-plugins/draft-js-plugins/blob/master/draft-js-mention-plugin/src/mentionSuggestionsStrategy.js
// https://www.draft-js-plugins.com/plugin/mention
//
//
