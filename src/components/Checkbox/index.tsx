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

const Checkbox: React.FC<ComponentInterface> = ({
  className,
  styles,
  checked,
  disabled,
  onClick
}) => {

  const componentClassName: string = getClassNames([
    componentStyle.componentCheckbox,
    className,
    (checked ? componentStyle.checked : componentStyle.unChecked)
  ]);

  console.log('componentClassName-', componentClassName);

  return (
    <div
      {...{
        className: componentClassName,
        style: styles || {},
        disabled,
        onClick
      }}
    />
  )
}

export default Checkbox;
