// Packages
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

// SCSS
import componentStyle from './componentStyle.module.scss';

// Component
import Input from '../Input';
import Checkbox from '../Checkbox';

// Type
import {
  ComponentInterface
} from './componentTypes';

// Hook
import {
  useGetClassNames
} from './hook';

const ToDoItem: React.FC<ComponentInterface> = ({
  className,
  styles,
  value,
  createTimeLocaleString,
  checked,
  disabled,
  onInputChange,
  onCheckboxChange,
  onDeleteClick
}) => {

  const getClassNames = useGetClassNames();

  return (
    <div className={componentStyle.componentToDoItemContainer}>
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
            className: getClassNames([
              componentStyle.componentToDoItem,
              className
            ]),
            style: styles || {},
            value,
            disabled,
            onChange: onInputChange
          }}
        />
        <FontAwesomeIcon
          icon={faXmark}
          onClick={onDeleteClick}
        />
      </div>
      <div className={componentStyle.componentToDoItemCreateTime}>{createTimeLocaleString}</div>
    </div>
  )
}

export default ToDoItem;
