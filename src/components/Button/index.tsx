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
  label,
  title,
  disabled,
  onClick
}) => {

  const getClassNames = useGetClassNames();

  return (
    <button
      {...{
        className: getClassNames([
          componentStyle.componentButton,
          className
        ]),
        style: styles || {},
        title,
        disabled,
        onClick
      }}
    >
      {label}
    </button>
  )
}

export default Input;
