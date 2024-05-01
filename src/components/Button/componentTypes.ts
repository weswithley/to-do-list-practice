import { ReactNode } from 'react';

export type ClassNamesType = Array<string | null | undefined>;
export type ClassNameType = string;
export type StylesType = React.CSSProperties;
export type LabelType = ReactNode | string | number;
export type TitleType = string;
export type DisabledType = boolean;
export type OnClickType = () => void;

export interface ComponentInterface {
  className?: ClassNameType;
  styles?: StylesType;
  label?: LabelType;
  title?: TitleType
  disabled?: DisabledType;
  onClick?: OnClickType;
}

