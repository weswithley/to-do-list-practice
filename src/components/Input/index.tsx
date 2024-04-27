import React from 'react';
import componentStyle from './componentStyle.module.scss';

// Type
import {
  ComponentInterface
} from './componentTypes';

// Controller
import {
  getClassNames
} from './controller';

const Input: React.FC<ComponentInterface> = ({
  className,
  styles,
  inputType,
  value,
  placeholder,
  disabled,
  onChange
}) => {

  const componentClassName: string = getClassNames([
    componentStyle.componentInput,
    className
  ]);

  return (
    <input
      {...{
        className: componentClassName,
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
