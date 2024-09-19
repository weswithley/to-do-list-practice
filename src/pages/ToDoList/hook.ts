// Packages
import { useEffect, useState, useMemo } from 'react';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

// Types
import {
  ToDoInterface,
  KeywordType,
  FilterType,
  SearchPayloadInterface,
  FilterConditionsInterface,
  IsSortType,
  IsAddType,
  UpdatedPayloadInterface,
  DeletedPayloadInterface
} from './pageTypes';

// Utils
import {
  cloneDeep
} from '../../utils';

// Const
import {
  defaultDateFormatParams,
  defaultToDoItemPayload,
  defaultFilterConditions
} from './const';

const useAddToDoList = ({
  toDoList
}: {
  toDoList: Array<ToDoInterface>;
}) => {
  const [isAdd, setIsAdd] = useState<IsAddType>(false);
  const [addedToDoList, setAddedToDoList] = useState<Array<ToDoInterface>>([]);

  useEffect(() => {
    if(!isAdd) return;

    const date = new Date();
    const clonedToDoItemPayload = cloneDeep(defaultToDoItemPayload);
    const clonedToDoList = cloneDeep(toDoList);
    clonedToDoItemPayload.id = clonedToDoList.length;
    clonedToDoItemPayload.createTime = date;
    clonedToDoItemPayload.createTimeLocaleString = new Intl.DateTimeFormat('en-US', defaultDateFormatParams).format(date);
    clonedToDoItemPayload.createTimeStamp = date.getTime();

    clonedToDoList.push(clonedToDoItemPayload);

    setAddedToDoList(clonedToDoList);
    setIsAdd(false);
  }, [isAdd]);

  return {
    isAdd,
    setIsAdd,
    addedToDoList
  }
}

const useUpdateToDoList = ({
  toDoList,
  selectedToDoItem,
  updateKey,
  updateValue
}:
  UpdatedPayloadInterface
) => {
  const [updatedToDoList, setUpdatedToDoList] = useState<Array<ToDoInterface>>([]);

  useEffect(() => {
    if(!selectedToDoItem || !updateKey) return;

    const clonedToDoList = cloneDeep(toDoList);
    clonedToDoList[selectedToDoItem.id][updateKey] = updateValue;

    setUpdatedToDoList(clonedToDoList);
  }, [toDoList, selectedToDoItem, updateKey, updateValue])

  return {
    updatedToDoList
  };
}

const useDeletedToDoList = ({
  toDoList,
  selectedToDoItem
}:
  DeletedPayloadInterface
) => {
  const [deletedToDoList, setDeletedToDoList] = useState<Array<ToDoInterface>>([]);

  useEffect(() => {
    if(!selectedToDoItem) return;

    const clonedToDoList = cloneDeep(toDoList)
    .filter((loopItem: ToDoInterface) => loopItem.id !== selectedToDoItem?.id)
    .map((loopItem: ToDoInterface, index: number) => {
      return {
        ...cloneDeep(loopItem),
        id: index,
      };
    });

    setDeletedToDoList(clonedToDoList);
  }, [selectedToDoItem])

  return {
    deletedToDoList
  };
}

const useSearchedToDoList = ({
  toDoList,
  searchPayload
}: {
  toDoList: Array<ToDoInterface>;
  searchPayload: SearchPayloadInterface;
}) => {
  const {keyword, filter} = searchPayload;
  const [searchedToDoList, setSearchedToDoList] = useState<Array<ToDoInterface>>([]);

  useEffect(() => {
    const clonedToDoList = cloneDeep(toDoList).map((toDoItem: ToDoInterface) => {
      // Keyword
      toDoItem.isSearchMatch = keyword ? new RegExp(keyword.toLowerCase()).test((toDoItem.value + '').toLowerCase()) : true;

      // Filter
      const tmpFilter = filter || 'All';
      toDoItem.isFilterMatch = defaultFilterConditions[tmpFilter](toDoItem);
      return toDoItem;
    });

    setSearchedToDoList(clonedToDoList);

  }, [searchPayload]);

  return {
    searchedToDoList
  };
}

const useGetSortedToDoList = ({
  toDoList
}: {
  toDoList: Array<ToDoInterface>;
}) => {
  const [isSort, setIsSort] = useState<IsSortType>(null);
  const [sortIconClassName, setSortIconClassName] = useState(faSort);
  const [sortedToDoList, setSortedToDoList] = useState<Array<ToDoInterface>>([]);

  useEffect(() => {
    if(isSort === null) return;

    // SortClassName
    if (!!isSort) setSortIconClassName(faSortUp);
    else setSortIconClassName(faSortDown);

    // ToDoList
    const clonedToDoList = cloneDeep(toDoList)
    .sort((prevToDoItem: ToDoInterface, nextToDoItem: ToDoInterface) => {
      const reverseNum = isSort ? -1 : 1;
      return (prevToDoItem.createTimeStamp - nextToDoItem.createTimeStamp) * reverseNum;
    })
    .map((loopItem: ToDoInterface, index: number) => {
      loopItem.id = index;
      return loopItem;
    })

    setSortedToDoList(clonedToDoList);

  }, [isSort])

  return {
    isSort,
    setIsSort,
    sortIconClassName,
    sortedToDoList
  }
}

export {
  useAddToDoList,
  useUpdateToDoList,
  useDeletedToDoList,
  useSearchedToDoList,
  useGetSortedToDoList
}