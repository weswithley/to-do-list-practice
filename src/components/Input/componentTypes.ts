export type ClassNamesType = Array<string | null | undefined>;
export type ClassNameType = string;
export type StylesType = React.CSSProperties;
export type InputTypeType = string;
export type ValuesType = string | number;
export type PlaceholderType = string;
export type DisabledType = boolean;
export type OnChangeType = (event: React.ChangeEvent<HTMLInputElement>) => void;

export interface ComponentInterface {
  className?: ClassNameType;
  styles?: StylesType;
  inputType?: InputTypeType;
  value: ValuesType;
  placeholder?: PlaceholderType;
  disabled?: DisabledType;
  onChange: OnChangeType;
}

