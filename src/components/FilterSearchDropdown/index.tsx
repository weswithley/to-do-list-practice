// Packages
import React, { useMemo, useState, useEffect } from 'react';

// SCSS
import componentStyle from './componentStyle.module.scss';

// Type
import {
  ComponentInterface,
  FilterSearchInterface
} from './componentTypes';

// Component
import {
  Button
} from '..';

import {
  cloneDeep
} from '../../utils';

const FilterSearchDropdown: React.FC<ComponentInterface> = ({
  list,
  disabled,
  onClickCallBack
}) => {

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [filterSearchList, setFilterSearchList] = useState<Array<FilterSearchInterface>>(cloneDeep(list));
  const selectedFilterSearch = useMemo(() => filterSearchList.find(item => item.isActive), [filterSearchList]);

  useEffect(() => {
    if (!!selectedFilterSearch) onClickCallBack(selectedFilterSearch);
  }, [selectedFilterSearch]);

  useEffect(() => {
    if (!!list) setFilterSearchList(cloneDeep(list));
  }, [list])

  return (
    <div className={componentStyle.componentDropdown}>
      <Button
        className={isOpenModal ? componentStyle.isOpen : ''}
        label={selectedFilterSearch?.value}
        disabled={!!disabled}
        onClick={() => setIsOpenModal(!isOpenModal)}
      />
      {
        isOpenModal &&
        <div className={componentStyle.componentDropdownModal}>
          <ul>
            {
              filterSearchList.map((filterSearchItem: FilterSearchInterface, index: number) => (
                <li
                  key={filterSearchItem.value + '-' + index}
                  className={filterSearchItem.isActive ? componentStyle.active : ''}
                  onClick={() => {
                    const clonedFilterSearchList = cloneDeep(filterSearchList);
                    clonedFilterSearchList.forEach((loopItem: FilterSearchInterface) => {
                      loopItem.isActive = loopItem.value === filterSearchItem.value;
                    })
                    setFilterSearchList(clonedFilterSearchList);
                    setIsOpenModal(false);
                  }}
                >
                  {filterSearchItem.value}
                </li>
              ))
            }
          </ul>
        </div>
      }
    </div>
  )
}

export default FilterSearchDropdown;
