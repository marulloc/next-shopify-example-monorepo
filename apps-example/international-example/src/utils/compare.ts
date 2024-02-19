const isObject = (item: any): item is Object => item && typeof item === 'object' && !Array.isArray(item);

export const deepCompare = (obj1: any, obj2: any): boolean => {
  if (obj1 === obj2) {
    return true;
  }

  if (!isObject(obj1) || !isObject(obj2)) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = obj1[key];
    const val2 = obj2[key];

    const areObjects = isObject(val1) && isObject(val2);
    if ((areObjects && !deepCompare(val1, val2)) || (!areObjects && val1 !== val2)) {
      return false;
    }
  }

  return true;
};
