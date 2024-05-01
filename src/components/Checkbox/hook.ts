import { ClassNamesType } from './componentTypes';

export const useGetClassNames = () => (classNames: ClassNamesType) => classNames.filter(item => item).join(' ');