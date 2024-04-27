import { ClassNamesType } from './componentTypes';

export const useGetClassNames = (classNames: ClassNamesType) => {
  return classNames.filter(item => item).join(' ');
}