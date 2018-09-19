import React from 'react';

const Button = ({ onClick, children, className = '' }) => (
  <button onClick={onClick} className={className} type="button">
    {children}
  </button>
);

export default Button;
