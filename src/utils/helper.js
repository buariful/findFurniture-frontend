export const selectedValues = (array) => {
  const result = array.map((d) => {
    return { label: d, value: d };
  });

  return result;
};

export const relCateModify = (array) => {
  return array.map((arr) => {
    return arr.label;
  });
};

export function findUpazilas(arrayWith_Fulldata, arrayOf_id) {
  const idMap = {};
  for (const item of arrayWith_Fulldata) {
    idMap[item.id] = item;
  }

  const resultArray = [];
  for (const value of arrayOf_id) {
    if (idMap[value]) {
      resultArray.push(idMap[value]);
    }
  }
  return resultArray;
}
