// Types
import {
  ToDoInterface,
  SearchPayloadInterface,
  FilterConditionsInterface,
  FilterConditionsInterfaceEnum,
  UpdatedPayloadInterface,
  DeletedPayloadInterface
 } from './pageTypes'

export const defaultDateFormatParams: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
}

export const defaultToDoItemPayload: ToDoInterface = {
  id: 0,
  value: '',
  checked: false,
  isSearchMatch: true,
  isFilterMatch: true,
  createTime: null,
  createTimeLocaleString: '',
  createTimeStamp: 0
}

export const defaultUpdatedPayload: UpdatedPayloadInterface = {
  toDoList: [],
  selectedToDoItem: null,
  updateKey: null,
  updateValue: null
}

export const defaultDeletedPayload: DeletedPayloadInterface = {
  toDoList: [],
  selectedToDoItem: null
}

export const defaultSearchPayload: SearchPayloadInterface = {
  keyword: '',
  filter: ''
}

export const defaultFilterSearchList: Array<FilterConditionsInterfaceEnum> = [
  { label: 'All', value: 'All', isActive: true },
  { label: 'Completed', value: 'Completed', isActive: false },
  { label: 'UnCompleted', value: 'UnCompleted', isActive: false }
]

export const defaultFilterConditions: FilterConditionsInterface = {
  [defaultFilterSearchList[0].value]: (target: ToDoInterface) => true,
  [defaultFilterSearchList[1].value]: (target: ToDoInterface) => !!target.checked,
  [defaultFilterSearchList[2].value]: (target: ToDoInterface) => !target.checked
}