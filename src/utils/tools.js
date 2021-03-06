export const mergeArray = (arr1, arr2, repeat=false) => {
  let arr = arr1.concat(arr2)
  return Array.from(new Set(arr))
}

export const removeArrTarget = (tagArr, arr) => {
  tagArr = tagArr.filter(item => (item !== arr[0]))
  return tagArr
}

export const timeStrFormart = (timeStr) => {
  return timeStr.slice(0, 19).replace(/[A-Z]/g, ' ')
}

export const emailFormat = (str) => {
  return /^([a-zA-Z\d])(\w|-)+@[a-zA-Z\d]+\.[a-zA-Z]{1,63}$/.test(str)
}

export const addressFormat = (address) => {
  if(address && address.substr(0, 2) == '0x') {
    const c = address.match(/(^.{4})|(.{4}$)/g)
    return `${c[0]}...${c[1]}`
  } else {
    return address
  }
}