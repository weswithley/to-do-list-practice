import React, { Fragment, useEffect, useState } from 'react';
import pageStyle from './pageStyle.module.scss';

// global Utils
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

// Controller
import {
  getDeletedToDoList,
  getSearchToDoList,
  getFilterToDoList,
  getSortToDoList
} from './controller';

// Const
import {
  defaultToDoItemPayload,
  defaultSearch,
  defaultFilterSearchList
} from './const';

const ToDoList: React.FC<PageInterface> = () => {
  const savedToDoList = JSON.parse(localStorage.getItem("toDoList") as string);
  const [toDoList, setToDoList] = useState<Array<ToDoInterface>>(savedToDoList || []);
  const [isSort, setIsSort] = useState<IsSortType>(false);
  const [search, setSearch] = useState<SearchInterface>(cloneDeep(defaultSearch));

  return (
    <div className={pageStyle.toDoListContainer}>
      <div className={pageStyle.toolBox}>

        {/* Add */}
        <Button
          label='+'
          onClick={() => {
            const clonedToDoList = cloneDeep(toDoList);
            const clonedToDoItemPayload = cloneDeep(defaultToDoItemPayload);
            clonedToDoItemPayload.id = clonedToDoList.length;
            clonedToDoItemPayload.createTime = new Date().toLocaleString();
            clonedToDoItemPayload.createTimeStamp = new Date().getTime();
            clonedToDoList.push(clonedToDoItemPayload);
            setToDoList(clonedToDoList);
          }}
        />
        <div className={pageStyle.rightToolBox}>

          {/* Search */}
          <Input
            styles={{border: '1px solid #333'}}
            placeholder='Search'
            value={ search.keyword }
            onChange={e => {
              const clonedSearch = cloneDeep(search);
              clonedSearch.keyword = e.target.value;
              setSearch(clonedSearch);

              const searchedToDoList = getSearchToDoList({
                toDoList,
                keyword: clonedSearch.keyword
              });

              setToDoList(searchedToDoList);
            }}
          />

          {/* Filter search */}
          <FilterSearchDropdown
            list={defaultFilterSearchList}
            onClickCallBack={target => {
              const clonedSearch = cloneDeep(search);
              clonedSearch.filter = target.value;
              setSearch(clonedSearch);

              const searchedToDoList = getFilterToDoList({
                toDoList,
                filterKeyword: clonedSearch.filter
              });

              setToDoList(searchedToDoList);
            }}
          />
        </div>
      </div>
      <div className={pageStyle.toDoListContent}>

        {/* Sort */}
        <Button
          label='Sort'
          onClick={() => {
            const clonedToDoList = getSortToDoList({
              toDoList,
              isSort: !isSort
            });

            setToDoList(clonedToDoList);
            setIsSort(!isSort);
          }}
        />

        {
          toDoList.map(todoItem => (
            <Fragment key={'toDoItem-' + todoItem.id}>
              {
                todoItem.isSearchMatch && todoItem.isFilterMatch &&
                <ToDoItem
                  className={pageStyle.toDoItem}
                  value={todoItem.value}
                  createTime={todoItem.createTime}
                  checked={todoItem.checked}
                  disabled={todoItem.checked}
                  onInputChange={e => {
                    const clonedToDoList = cloneDeep(toDoList);
                    clonedToDoList[todoItem.id].value = e.target.value;
                    setToDoList(clonedToDoList);
                  }}
                  onCheckboxChange={() => {
                    const clonedToDoList = cloneDeep(toDoList);
                    clonedToDoList[todoItem.id].checked = !clonedToDoList[todoItem.id].checked;
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

        <div className={pageStyle.bottomToolBox}>

          {/* Reset all */}
          <Button
            label='Reset all'
            onClick={() => {
              localStorage.removeItem("toDoList");
              setToDoList([]);
            }}
          />

          {/* Save */}
          <Button
            label='Save'
            onClick={() => localStorage.setItem("toDoList", JSON.stringify(toDoList))}
          />
        </div>

      </div>
    </div>
  )
}

export default ToDoList;
