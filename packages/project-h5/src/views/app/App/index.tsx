import { memo } from 'react'
import { RouterProvider } from 'react-router-dom'
import store from '~/store'
import { ConfigProvider } from 'antd'
import { Provider } from 'react-redux'
import zhCN from 'antd/es/locale/zh_CN'
import router from '@/router'
import styles from './style.less'

const App = memo(() => {
  return (
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ConfigProvider>
  )
})

export default App
