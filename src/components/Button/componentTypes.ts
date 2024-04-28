export type ClassNamesType = Array<string | null | undefined>;
export type ClassNameType = string;
export type StylesType = React.CSSProperties;
export type LabelType = string | number | null | undefined;
export type DisabledType = boolean;
export type OnClickType = () => void;

export interface ComponentInterface {
  className?: ClassNameType;
  styles?: StylesType;
  label?: LabelType;
  disabled?: DisabledType;
  onClick: OnClickType;
}

