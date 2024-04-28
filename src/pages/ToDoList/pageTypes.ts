// To do List
export type IdType = number;
export type ValuesType = string | number;
export type CheckedType = boolean;
export type IsSearchMatchType = boolean;
export type IsFilterMatchType = boolean;
export type CreateTimeType = string;
export type CreateTimeStampType = number;

export interface ToDoInterface {
  id: IdType;
  value: ValuesType;
  checked: CheckedType;
  isSearchMatch: IsSearchMatchType;
  isFilterMatch: IsFilterMatchType;
  createTime: CreateTimeType;
  createTimeStamp: CreateTimeStampType;
}

// Search
export type KeywordType = string;
export type FilterType = string;
export interface SearchInterface {
  keyword: KeywordType;
  filter: FilterType;
}

// Sort
export type IsSortType = boolean;

// Page
export interface PageInterface {}
export interface FilterConditionsInterface {
  All: (target: ToDoInterface) => boolean;
  Completed: (target: ToDoInterface) => boolean;
  UnCompleted: (target: ToDoInterface) => boolean;
}
