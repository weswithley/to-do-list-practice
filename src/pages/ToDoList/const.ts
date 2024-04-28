export const defaultToDoItemPayload = {
  id: null,
  value: '',
  checked: false,
  isSearchMatch: true,
  isFilterMatch: true,
  createTime: null,
  createTimeStamp: null
}

export const defaultSearch = {
  keyword: '',
  filter: ''
}

export const defaultFilterSearchList = [
  { label: 'All', value: 'All', isActive: true },
  { label: 'Completed', value: 'Completed', isActive: false },
  { label: 'UnCompleted', value: 'UnCompleted', isActive: false }
]