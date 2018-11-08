import React from 'react';

export const addMark = ({type, key, Component}) => ({
    onKeyDown(e, change, next) {
      if (!e.ctrlKey || e.key !== key) return next();
      e.preventDefault()
      change.toggleMark(type)
      return true
    },
    renderMark(props) {
      if(props.mark.type === type)
        return <Component {...props} />;
    }
  }
)
