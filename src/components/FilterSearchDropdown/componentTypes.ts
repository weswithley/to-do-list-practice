// Filter search
export type labelType = string;
export type valueType = string;
export type IsActiveType = boolean;

export interface FilterSearchInterface {
  label: labelType;
  value: valueType;
  isActive: IsActiveType;
}

export type ListType = Array<FilterSearchInterface>;
export type DisabledType = Boolean;
export type OnClickType = (target: FilterSearchInterface) => void;

export interface ComponentInterface {
  list: ListType;
  disabled?: DisabledType;
  onClickCallBack: OnClickType;
}

