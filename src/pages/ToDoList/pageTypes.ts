// Components types
import {
  FilterSearchInterface
} from '../../components/FilterSearchDropdown/componentTypes';

// To do List
export type IdType = number;
export type ValuesType = string | number;
export type CheckedType = boolean;
export type IsSearchMatchType = boolean;
export type IsFilterMatchType = boolean;
export type CreateTimeType = Date | null;
export type createTimeLocaleStringType = string;
export type CreateTimeStampType = number;
export type UpdateKeyType = string;
export type UpdateValueType = string | number | boolean | null | undefined;

export interface ToDoInterface {
  id: IdType;
  value: ValuesType;
  checked: CheckedType;
  isSearchMatch: IsSearchMatchType;
  isFilterMatch: IsFilterMatchType;
  createTime: CreateTimeType;
  createTimeLocaleString: createTimeLocaleStringType,
  createTimeStamp: CreateTimeStampType;
}

export interface PageInterface {}

// Search
export type KeywordType = string;
export type FilterType = string;
export type SearchKeyType = string;
export type SearchValueType = string;
export interface SearchInterface {
  keyword: KeywordType;
  filter: FilterType;
}

// Filter search
export interface FilterConditionsInterface {
  All: (target: ToDoInterface) => boolean;
  Completed: (target: ToDoInterface) => boolean;
  UnCompleted: (target: ToDoInterface) => boolean;
}

export interface FilterConditionsInterfaceEnum extends FilterSearchInterface {}

// Sort
export type IsSortType = boolean | null;
