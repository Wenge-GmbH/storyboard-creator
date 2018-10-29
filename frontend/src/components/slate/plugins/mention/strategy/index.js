import escapeRegExp from 'lodash/escapeRegExp';

import REG_EXP from './defaultRegEx';

// should add const selection = window.getSelection(); support
export default (trigger, value, supportWhiteSpace, key) => {
  if (!value.startText) {
    return null;
  }
  const startOffset = value.selection.start.offset;

  // add current pressed key (cuz fk that keyDown event :|)
  // PS THIS IS NOT AN OPTIMAL SOLUTION 
  const addKey = key.length === 1 ? key : '';
  let textBefore = value.startText.text.slice(0, startOffset) + addKey;

  // remove key if backspace was pressed
  // -> needed to get the portal to render again after delete
  if(key === 'Backspace') {
    textBefore = textBefore.substring(0, textBefore.length - 1);
  }

  // decide wich regex to use (based on whitespace support)
  const MENTION_REGEX = supportWhiteSpace ?
    new RegExp(`${escapeRegExp(trigger)}(${REG_EXP}|\\s){0,}`, 'g') :
    new RegExp(`${escapeRegExp(trigger)}${REG_EXP}`, 'g')
  ;

  // get the result of matching with the RegExp
  const result = textBefore.match(MENTION_REGEX);

  // prevent searching after whitespace if whitespaces arent supported
  if(!supportWhiteSpace && !textBefore.endsWith(result)) {
    return null;
  }

  return result;
}
