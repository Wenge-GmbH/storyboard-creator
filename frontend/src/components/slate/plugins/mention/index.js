import React from 'react';
import getInput from './strategy';
import Portal from './mention-portal';

import {
  UP_ARROW_KEY,
  DOWN_ARROW_KEY,
  ENTER_KEY,
  RESULT_SIZE,
} from './consts';

export const MentionPlugin = ({
  trigger = '@',
  list = [],
  supportWhiteSpace = false
}) => {
  const callback = {};

  return {
    onKeyDown(e, change) {
      // const { text } = change.value.blocks.first();
      const { value } = change;
      const input = getInput(trigger, value, supportWhiteSpace, e.key);

      if(!input) {
        closePortal(callback);
        return;
      };

      const { keyCode } = e;

      if(keyCode === UP_ARROW_KEY || keyCode === DOWN_ARROW_KEY) {
        e.preventDefault();
      }

      if(keyCode === ENTER_KEY) {
        e.preventDefault()

        closePortal(callback);
        // handle enter key
        if (callback.onEnter && callback.suggestion !== undefined) {
          return callback.onEnter(callback.suggestion)
        }
      } else {
        if (callback.onKeyDown) {
          console.log('onKeyDown');
          callback.onKeyDown(keyCode, input[0].replace('@', ''));
        }
      }
    },
    MentionPortal: (props) => <Portal
      {...props}
      {...{
        trigger,
        list,
        supportWhiteSpace,
        callback,
      }}
    />
  };
}

function closePortal(callback) {
  if (callback.closePortal) {
    callback.closePortal()
  }
}

// https://www.npmjs.com/package/slate-suggestions
// https://github.com/draft-js-plugins/draft-js-plugins/blob/master/draft-js-mention-plugin/src/mentionSuggestionsStrategy.js
// https://www.draft-js-plugins.com/plugin/mention
//
//
