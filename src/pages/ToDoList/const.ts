// Types
import {
  ToDoInterface,
  SearchInterface,
  FilterConditionsInterfaceEnum
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

export const defaultSearch: SearchInterface = {
  keyword: '',
  filter: ''
}

export const defaultFilterSearchList: Array<FilterConditionsInterfaceEnum> = [
  { label: 'All', value: 'All', isActive: true },
  { label: 'Completed', value: 'Completed', isActive: false },
  { label: 'UnCompleted', value: 'UnCompleted', isActive: false }
]