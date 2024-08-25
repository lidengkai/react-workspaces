import { message } from 'antd'
import { Toast } from 'antd-mobile'

const info = (content: ReactNode) => {
  if ($APP_IS_H5) {
    Toast.show({
      content,
    })
  } else {
    message.info(content)
  }
}

const warning = (content: ReactNode) => {
  if ($APP_IS_H5) {
    Toast.show({
      content,
    })
  } else {
    message.warning(content)
  }
}

const success = (content: ReactNode) => {
  if ($APP_IS_H5) {
    Toast.show({
      icon: 'success',
      content,
    })
  } else {
    message.success(content)
  }
}

const error = (content: ReactNode) => {
  if ($APP_IS_H5) {
    Toast.show({
      icon: 'fail',
      content,
    })
  } else {
    message.error(content)
  }
}

export default {
  info,
  warning,
  success,
  error,
}
