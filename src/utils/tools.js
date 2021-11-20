export const mergeArray = (arr1, arr2, repeat=false) => {
  let arr = arr1.concat(arr2)
  return Array.from(new Set(arr))
}

export const removeArrTarget = (tagArr, str) => {
  // tagArr = tagArr.filter(item => (tagArr.indexOf(str) > -1))
  tagArr = tagArr.filter(item => (item == str))
  return tagArr
}

export const timeStrFormart = (timeStr) => {
  return timeStr.slice(0, 19).replace(/[A-Z]/g, ' ')
}
