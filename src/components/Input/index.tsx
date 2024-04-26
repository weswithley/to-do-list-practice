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
  value,
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
          value,
          disabled,
          onChange
      }}
    />
  )
}

export default Input;
