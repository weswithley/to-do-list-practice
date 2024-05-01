// Packages
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

// Types
import {
  ToDoInterface,
  UpdateKeyType,
  UpdateValueType,
  KeywordType,
  FilterType,
  SearchKeyType,
  SearchValueType,
  SearchInterface,
  FilterConditionsInterface,
  IsSortType
} from './pageTypes';

// Utils
import {
  cloneDeep
} from '../../utils';

// Const
import {
  defaultDateFormatParams,
  defaultToDoItemPayload
} from './const';

const getAddedToDoList = ({
  toDoList
}: {
  toDoList: Array<ToDoInterface>;
}) => {
  const clonedToDoList = cloneDeep(toDoList);
  const clonedToDoItemPayload = cloneDeep(defaultToDoItemPayload);
  clonedToDoItemPayload.id = clonedToDoList.length;

  const date = new Date();
  clonedToDoItemPayload.createTime = date;
  clonedToDoItemPayload.createTimeLocaleString = new Intl.DateTimeFormat('en-US', defaultDateFormatParams).format(date);
  clonedToDoItemPayload.createTimeStamp = date.getTime();

  clonedToDoList.push(clonedToDoItemPayload);

  return clonedToDoList;
}

const getUpdatedToDoList = ({
  toDoList,
  selectedToDoItem,
  updateKey,
  updateValue
}: {
  toDoList: Array<ToDoInterface>;
  selectedToDoItem: ToDoInterface;
  updateKey: UpdateKeyType;
  updateValue: UpdateValueType;
}) => {
  const clonedToDoList = cloneDeep(toDoList);
  clonedToDoList[selectedToDoItem.id][updateKey] = updateValue;
  return clonedToDoList;
}

const getDeletedToDoList = ({
  toDoList,
  selectedToDoItem
}: {
  toDoList: Array<ToDoInterface>;
  selectedToDoItem: ToDoInterface;
}) => {
  const clonedToDoList = cloneDeep(toDoList)
  .filter((loopItem: ToDoInterface) => loopItem.id !== selectedToDoItem.id)
  .map((loopItem: ToDoInterface, index: number) => {
    loopItem.id = index;
    return loopItem;
  });

  return clonedToDoList;
}

const getSearch = ({
  search,
  searchKey,
  searchValue,
}: {
  search: SearchInterface;
  searchKey: SearchKeyType;
  searchValue: SearchValueType;
}) => {
  const clonedSearch = cloneDeep(search);
  clonedSearch[searchKey] = searchValue;
  return clonedSearch;
}

const getSearchToDoList = ({
  toDoList,
  keyword
}: {
  toDoList: Array<ToDoInterface>;
  keyword: KeywordType;
}) => {
  return cloneDeep(toDoList).map((toDoItem: ToDoInterface) => {
    toDoItem.isSearchMatch = keyword ? new RegExp(keyword.toLowerCase()).test((toDoItem.value + '').toLowerCase()) : true;
    return toDoItem;
  });
}

const getFilterToDoList = ({
  toDoList,
  filterKeyword
}: {
  toDoList: Array<ToDoInterface>;
  filterKeyword: FilterType;
}) => {
  return cloneDeep(toDoList).map((toDoItem: ToDoInterface) => {
    const filterConditions: FilterConditionsInterface = {
      'All': (target: ToDoInterface) => true,
      'Completed': (target: ToDoInterface) => !!toDoItem.checked,
      'UnCompleted': (target: ToDoInterface) => !toDoItem.checked
    }

    toDoItem.isFilterMatch = filterConditions[filterKeyword as keyof FilterConditionsInterface](toDoItem);
    return toDoItem;
  });
}

const getSortClassName = (isSort: IsSortType) => {
  if (isSort === null) return faSort;
  else if (!!isSort) return faSortUp;
  else return faSortDown;
}

const getSortToDoList = ({
  toDoList,
  isSort
}: {
  toDoList: Array<ToDoInterface>;
  isSort: IsSortType;
}) => {
  const clonedToDoList = cloneDeep(toDoList)
  .sort((prevToDoItem: ToDoInterface, nextToDoItem: ToDoInterface) => {
    const reverseNum = isSort ? -1 : 1;
    return (prevToDoItem.createTimeStamp - nextToDoItem.createTimeStamp) * reverseNum;
  })
  .map((loopItem: ToDoInterface, index: number) => {
    loopItem.id = index;
    return loopItem;
  })

  return clonedToDoList;
}

export const useToDoList = () => {
  return {
    getAddedToDoList,
    getUpdatedToDoList,
    getDeletedToDoList,
    getSearch,
    getSearchToDoList,
    getFilterToDoList,
    getSortClassName,
    getSortToDoList
  }
}