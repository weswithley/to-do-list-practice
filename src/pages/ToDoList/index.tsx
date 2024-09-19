// Packages
import React, { Fragment, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

// SCSS
import pageStyle from './pageStyle.module.scss';

// Global Utils
import {
  cloneDeep
} from '../../utils';

// Type
import {
  PageInterface,
  ToDoInterface,
  SearchPayloadInterface,
  IsSortType
} from './pageTypes';

// Components
import {
  Input,
  ToDoItem,
  Button,
  FilterSearchDropdown
} from '../../components';

// Components type
import {
  ListType
} from '../../components/FilterSearchDropdown/componentTypes';

// Hook
import {
  useAddToDoList,
  useUpdateToDoList,
  useDeletedToDoList,
  useSearchedToDoList,
  useGetSortedToDoList
} from './hook';

// Const
import {
  defaultSearchPayload,
  defaultFilterSearchList,
  defaultUpdatedPayload,
  defaultDeletedPayload
} from './const';

const ToDoList: React.FC<PageInterface> = () => {
  // Main constant
  const savedToDoList = JSON.parse(localStorage.getItem("toDoList") as string);
  const [toDoList, setToDoList] = useState<Array<ToDoInterface>>(savedToDoList || []);

  // Add
  const {
    setIsAdd,
    addedToDoList
  } = useAddToDoList({
    toDoList
  });

  // Update
  const [updatedPayload, setUpdatedPayload] = useState(cloneDeep(defaultUpdatedPayload));
  const {
    updatedToDoList
  } = useUpdateToDoList(updatedPayload);

  // Delete
  const [deletedPayload, setDeletedPayload] = useState(cloneDeep(defaultDeletedPayload));
  const {
    deletedToDoList
  } = useDeletedToDoList(deletedPayload);

  // Search
  const [searchPayload, setSearchPayload] = useState<SearchPayloadInterface>(cloneDeep(defaultSearchPayload));
  const [filterSearchList, setFilterSearchList] = useState<ListType>(cloneDeep(defaultFilterSearchList));
  const {
    searchedToDoList
  } = useSearchedToDoList({
    toDoList,
    searchPayload
  });

  // Sort
  const {
    isSort,
    setIsSort,
    sortIconClassName,
    sortedToDoList
  } = useGetSortedToDoList({
    toDoList
  });

  useEffect(() => {
    setToDoList(addedToDoList);
  }, [addedToDoList])

  useEffect(() => {
    setToDoList(updatedToDoList);
  }, [updatedToDoList])

  useEffect(() => {
    setToDoList(deletedToDoList);
  }, [deletedToDoList])

  useEffect(() => {
    setToDoList(searchedToDoList);
  }, [searchedToDoList])

  useEffect(() => {
    setToDoList(sortedToDoList);
  }, [sortedToDoList])

  return (
    <div className={pageStyle.toDoListContainer}>
      <div className={pageStyle.toolBox}>
        <div className={pageStyle.leftToolBox}>
          {/* Add */}
          <Button
            label={<FontAwesomeIcon icon={faPlus} />}
            title='Add'
            onClick={() => setIsAdd(true)}
          />

          {/* Sort */}
          <Button
            label={<FontAwesomeIcon icon={sortIconClassName} />}
            title='Sort'
            onClick={() => setIsSort(!isSort)}
          />
        </div>

        <div className={pageStyle.rightToolBox}>

          {/* Search */}
          <Input
            placeholder='Search'
            value={searchPayload.keyword}
            onChange={e => {
              setSearchPayload({
                ...cloneDeep(searchPayload),
                keyword: e.target.value
              })
            }}
          />

          {/* Filter search */}
          <FilterSearchDropdown
            list={filterSearchList}
            onClickCallBack={target => {
              setSearchPayload({
                ...cloneDeep(searchPayload),
                filter: target.value
              })
            }}
          />
        </div>
      </div>

      <div className={pageStyle.toDoListContent}>
        {
          toDoList.map(todoItem => (
            <Fragment key={'toDoItem-' + todoItem.id}>
              {
                todoItem.isSearchMatch && todoItem.isFilterMatch &&
                <ToDoItem
                  className={pageStyle.toDoItem}
                  value={todoItem.value}
                  createTimeLocaleString={todoItem.createTimeLocaleString}
                  checked={todoItem.checked}
                  disabled={todoItem.checked}
                  onInputChange={e => {
                    setUpdatedPayload({
                      toDoList,
                      selectedToDoItem: todoItem,
                      updateKey: 'value',
                      updateValue: e.target.value
                    });
                  }}
                  onCheckboxChange={() => {
                    setUpdatedPayload({
                      toDoList,
                      selectedToDoItem: todoItem,
                      updateKey: 'checked',
                      updateValue: !toDoList[todoItem.id].checked
                    });
                  }}
                  onDeleteClick={() => {
                    setDeletedPayload({
                      toDoList,
                      selectedToDoItem: todoItem
                    })
                  }}
                />
              }
            </Fragment>
          ))
        }
      </div>

      <div className={pageStyle.bottomToolBox}>
        {/* Reset all */}
        <Button
          label={<FontAwesomeIcon icon={faTrash} />}
          title='Reset'
          onClick={() => {
            localStorage.removeItem("toDoList");
            setToDoList([]);
            setFilterSearchList(cloneDeep(defaultFilterSearchList));
            setSearchPayload(cloneDeep(defaultSearchPayload));
            setIsSort(null);
          }}
        />

        {/* Save */}
        <Button
          label={<FontAwesomeIcon icon={faFloppyDisk} />}
          title='Save'
          onClick={() => localStorage.setItem("toDoList", JSON.stringify(toDoList))}
        />
      </div>
    </div>
  )
}

export default ToDoList;
