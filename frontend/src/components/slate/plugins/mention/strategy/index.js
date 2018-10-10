import escapeRegExp from 'lodash/escapeRegExp';

import regExp from './defaultRegEx';

export default (trigger, text, supportWhiteSpace) => {
  const MENTION_REGEX = supportWhiteSpace ?
    new RegExp(`${escapeRegExp(trigger)}(${regExp}|\\s){0,}`, 'g') :
    new RegExp(`${escapeRegExp(trigger)}${regExp}`, 'g')
  ;
  return text.match(MENTION_REGEX);
}
