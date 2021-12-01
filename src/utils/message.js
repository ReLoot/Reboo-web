import {Message} from 'element-ui'

export const showTipsMsg = (err, type='error') => {
  Message({
      showClose: true,
      message: typeof(err)=='object'?JSON.stringify(err['message']||err):err,
      type: type
  })
  // console.error(err)
}