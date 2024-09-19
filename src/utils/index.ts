export const cloneDeep = (target: any) => {
  if(!target) return target;
  else return JSON.parse(JSON.stringify(target));
}