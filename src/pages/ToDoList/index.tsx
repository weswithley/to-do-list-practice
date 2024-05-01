// Packages
import React, { Fragment, useState } from 'react';
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
  SearchInterface,
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
  useToDoList
} from './hook';

// Const
import {
  defaultSearch,
  defaultFilterSearchList
} from './const';

const ToDoList: React.FC<PageInterface> = () => {
  // Hook functions
  const {
    getAddedToDoList,
    getUpdatedToDoList,
    getDeletedToDoList,
    getSearch,
    getSearchToDoList,
    getFilterToDoList,
    getSortToDoList,
    getSortClassName
  } = useToDoList();

  const savedToDoList = JSON.parse(localStorage.getItem("toDoList") as string);
  const [toDoList, setToDoList] = useState<Array<ToDoInterface>>(savedToDoList || []);
  const [search, setSearch] = useState<SearchInterface>(cloneDeep(defaultSearch));
  const [filterSearchList, setFilterSearchList] = useState<ListType>(cloneDeep(defaultFilterSearchList));
  const [isSort, setIsSort] = useState<IsSortType>(null);
  const sortIconName = getSortClassName(isSort);

  return (
    <div className={pageStyle.toDoListContainer}>
      <div className={pageStyle.toolBox}>
        <div className={pageStyle.leftToolBox}>
          {/* Add */}
          <Button
            label={<FontAwesomeIcon icon={faPlus} />}
            title='Add'
            onClick={() => {
              const clonedToDoList = getAddedToDoList({ toDoList });
              setToDoList(clonedToDoList);
            }}
          />

          {/* Sort */}
          <Button
            label={<FontAwesomeIcon icon={sortIconName} />}
            title='Sort'
            onClick={() => {
              const clonedToDoList = getSortToDoList({
                toDoList,
                isSort: !isSort
              });

              setToDoList(clonedToDoList);
              setIsSort(!isSort);
            }}
          />
        </div>

        <div className={pageStyle.rightToolBox}>

          {/* Search */}
          <Input
            placeholder='Search'
            value={ search.keyword }
            onChange={e => {
              const clonedSearch = getSearch({
                search,
                searchKey: 'keyword',
                searchValue: e.target.value,
              });

              const searchedToDoList = getSearchToDoList({
                toDoList,
                keyword: clonedSearch.keyword
              });

              setSearch(clonedSearch);
              setToDoList(searchedToDoList);
            }}
          />

          {/* Filter search */}
          <FilterSearchDropdown
            list={filterSearchList}
            onClickCallBack={target => {
              const clonedSearch = getSearch({
                search,
                searchKey: 'filter',
                searchValue: target.value,
              });

              const searchedToDoList = getFilterToDoList({
                toDoList,
                filterKeyword: clonedSearch.filter
              });

              setSearch(clonedSearch);
              setToDoList(searchedToDoList);
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
                    const clonedToDoList = getUpdatedToDoList({
                      toDoList,
                      selectedToDoItem: todoItem,
                      updateKey: 'value',
                      updateValue: e.target.value
                    });

                    setToDoList(clonedToDoList);
                  }}
                  onCheckboxChange={() => {
                    const clonedToDoList = getUpdatedToDoList({
                      toDoList,
                      selectedToDoItem: todoItem,
                      updateKey: 'checked',
                      updateValue: !toDoList[todoItem.id].checked
                    });

                    setToDoList(clonedToDoList);
                  }}
                  onDeleteClick={() => {
                    const clonedToDoList = getDeletedToDoList({
                      toDoList,
                      selectedToDoItem: todoItem
                    });

                    setToDoList(clonedToDoList);
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
          title='Reset all'
          onClick={() => {
            localStorage.removeItem("toDoList");
            setToDoList([]);
            setFilterSearchList(cloneDeep(defaultFilterSearchList));
            setSearch(cloneDeep(defaultSearch));
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
