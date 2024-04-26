import { ClassNamesType } from './componentTypes';

export const getClassNames = (classNames: ClassNamesType) => {
  return classNames.filter(item => item).join(' ');
}