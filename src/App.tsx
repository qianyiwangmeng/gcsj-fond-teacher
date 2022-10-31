import { useState } from 'react'
import { Button } from 'antd'
// import { UpCircleOutlined } from '@ant-design/icons'
import { Link, useRoutes } from 'react-router-dom'
import router from './router'

// import 'antd/dist/antd.css';    下载插件后 不用全局引用 只需按需引用


function App() {
  const [count, setCount] = useState(0)

  const outlet = useRoutes(router)

  return (
    <div className="App">

      {outlet}
    </div>
  )
}

export default App
