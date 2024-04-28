// Types
import {
  ToDoInterface,
  KeywordType,
  FilterType,
  FilterConditionsInterface,
  IsSortType
} from './pageTypes';

// Utils
import {
  cloneDeep
} from '../../utils';

export const getDeletedToDoList = ({
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

export const getSearchToDoList = ({
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

export const getFilterToDoList = ({
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

export const getSortToDoList = ({
  toDoList,
  isSort
}: {
  toDoList: Array<ToDoInterface>;
  isSort: IsSortType;
}) => {
  const clonedToDoList = cloneDeep(toDoList).sort((prevToDoItem: ToDoInterface, nextToDoItem: ToDoInterface) => {
    const reverseNum = isSort ? 1 : -1;
    return (prevToDoItem.createTimeStamp - nextToDoItem.createTimeStamp) * reverseNum;
  })

  return clonedToDoList;
}