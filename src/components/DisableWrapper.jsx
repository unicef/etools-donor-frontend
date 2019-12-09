import React from 'react';
import PropTypes from 'prop-types';

export default function DisableWrapper({ disabled, children }) {
  return (
    <div style={disabled ? { pointerEvents: 'none', opacity: '0.2', cursor: 'normal' } : {}}>
      {children}
    </div>
  );
}

DisableWrapper.propTypes = {
  disabled: PropTypes.bool.isRequired,
  children: PropTypes.node
};
