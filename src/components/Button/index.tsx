import React from 'react';
import componentStyle from './componentStyle.module.scss';

// Type
import {
  ComponentInterface
} from './componentTypes';

// Controller
import {
  useGetClassNames
} from './controller';

const Input: React.FC<ComponentInterface> = ({
  className,
  styles,
  label,
  disabled,
  onClick
}) => {

  const componentClassName: string = useGetClassNames([
    componentStyle.componentButton,
    className
  ]);

  return (
    <button
      {...{
        className: componentClassName,
        style: styles || {},
        label,
        disabled,
        onClick
      }}
    >{label}</button>
  )
}

export default Input;
