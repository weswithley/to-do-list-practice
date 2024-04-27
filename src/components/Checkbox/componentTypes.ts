export type ClassNamesType = Array<string | null | undefined>;
export type ClassNameType = string;
export type StylesType = React.CSSProperties;
export type CheckedType = boolean;
export type DisabledType = boolean;
export type OnChangeType = () => void;

export interface ComponentInterface {
  className?: ClassNameType;
  styles?: StylesType;
  checked: CheckedType;
  disabled?: DisabledType;
  onClick: OnChangeType;
}
