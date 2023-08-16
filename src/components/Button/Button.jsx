import React from 'react';
  import cl from './Button.module.css'

const Button = ({ onSubmit }) => {
  return (
    <button type="button" className={cl.button} onClick={onSubmit}>
      Load more
    </button>
  );
};

export default Button;