// Packages
import React from 'react';

// SCSS
import componentStyle from './componentStyle.module.scss';

// Type
import {
  ComponentInterface
} from './componentTypes';

// Hook
import {
  useGetClassNames
} from './hook';

const Input: React.FC<ComponentInterface> = ({
  className,
  styles,
  inputType,
  value,
  placeholder,
  disabled,
  onChange
}) => {

  const getClassNames = useGetClassNames();

  return (
    <input
      {...{
        className: getClassNames([
          componentStyle.componentInput,
          className
        ]),
        style: styles || {},
        type: inputType || 'text',
        value,
        placeholder,
        disabled,
        onChange
      }}
    />
  )
}

export default Input;
