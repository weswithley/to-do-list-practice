import React from 'react';
import componentStyle from './componentStyle.module.scss';

// Component
import Input from '../Input';
import Checkbox from '../Checkbox';

// Type
import {
  ComponentInterface
} from './componentTypes';

// Controller
import {
  getClassNames
} from './controller';

const ToDoItem: React.FC<ComponentInterface> = ({
  className,
  styles,
  value,
  checked,
  disabled,
  onInputChange,
  onCheckboxChange
}) => {

  const componentClassName: string = getClassNames([
    componentStyle.componentToDoItem,
    className,
    (checked ? componentStyle.checked : componentStyle.unChecked)
  ]);

  return (
    <div className={componentStyle.componentToDoItem}>
      <Checkbox
        {...{
          checked,
          disabled,
          onClick: onCheckboxChange
        }}
      />
      <Input
        {...{
          className: componentClassName,
          style: styles || {},
          value,
          disabled,
          onChange: onInputChange
        }}
      />
    </div>
  )
}

export default ToDoItem;
