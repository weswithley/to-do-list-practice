export type ClassNamesType = Array<string | null | undefined>;
export type ClassNameType = string;
export type StylesType = React.CSSProperties;

export type ValuesType = string | number;
export type CreateTimeType = string;
export type CheckedType = boolean;
export type DisabledType = boolean;

export type OnInputChangeType = (event: React.ChangeEvent<HTMLInputElement>) => void;
export type OnCheckboxChangeType = () => void;
export type OnDeleteClickType = () => void;

export interface ComponentInterface {
  className?: ClassNameType;
  styles?: StylesType;
  value: ValuesType;
  createTime: CreateTimeType;
  checked: CheckedType;
  disabled: DisabledType;
  onInputChange: OnInputChangeType;
  onCheckboxChange: OnCheckboxChangeType;
  onDeleteClick: OnDeleteClickType;
}
