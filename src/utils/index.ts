export const cloneDeep = (target: any) => {
  return JSON.parse(JSON.stringify(target));
}