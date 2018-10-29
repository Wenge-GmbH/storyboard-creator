import React from 'react';

const SuggestionStyles = {
  backgroundColor: '#ebebeb',
  position: 'absolute',
}

const Suggestions = ({
  className = '',
  pos,
  children
}) => {
  if(!pos) return null;
  return (
    <div
      className={`portal ${className}`}
      style={{
        top: pos.y || 0,
        left: pos.x || 0,
        ...SuggestionStyles
      }}
    >
      {children}
    </div>
  )
}


export default Suggestions;
