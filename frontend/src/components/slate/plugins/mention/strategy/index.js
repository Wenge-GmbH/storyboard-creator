import escapeRegExp from 'lodash/escapeRegExp';

import REG_EXP from './defaultRegEx';

export default (trigger, value, supportWhiteSpace, key) => {
  if (!value.startText) {
    return null;
  }

  const startOffset = value.selection.start.offset;
  // used to add the actual key from the event to the text
  const addKey = key.length === 1 ? key : '';
  const textBefore = value.startText.text.slice(0, startOffset)+ addKey;

  const MENTION_REGEX = supportWhiteSpace ?
    new RegExp(`${escapeRegExp(trigger)}(${REG_EXP}|\\s){0,}`, 'g') :
    new RegExp(`${escapeRegExp(trigger)}${REG_EXP}`, 'g')
  ;
  return textBefore.match(MENTION_REGEX);
}
