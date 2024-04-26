export type ClassNamesType = Array<string | null | undefined>;
export type ClassNameType = string;
export type StylesType = React.CSSProperties;
export type ValuesType = string | number;
export type DisabledType = boolean;
export type OnChangeType = (event: React.ChangeEvent<HTMLInputElement>) => void;

export interface ComponentInterface {
  className?: ClassNameType;
  styles?: StylesType;
  value: ValuesType;
  disabled: DisabledType;
  onChange: OnChangeType;
}

