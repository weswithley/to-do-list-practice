// Packages
import React from 'react';

// SCSS
import componentStyle from './componentStyle.module.scss';

// Type
import {
  ComponentInterface
} from './componentTypes';

// Controller
import {
  useGetClassNames
} from './hook';

const Checkbox: React.FC<ComponentInterface> = ({
  className,
  styles,
  checked,
  disabled,
  onClick
}) => {

  const getClassNames = useGetClassNames();

  return (
    <div
    {...{
        title: 'checkbox',
        className: getClassNames([
          componentStyle.componentCheckbox,
          className,
          (checked ? componentStyle.checked : componentStyle.unChecked)
        ]),
        style: styles || {},
        disabled,
        onClick
      }}
    />
  )
}

export default Checkbox;
