// Packages
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

// SCSS
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
  createTime,
  checked,
  disabled,
  onInputChange,
  onCheckboxChange,
  onDeleteClick
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
      <FontAwesomeIcon
        icon={faTrash}
        onClick={onDeleteClick}
      />
      <div>{createTime}</div>
    </div>
  )
}

export default ToDoItem;
