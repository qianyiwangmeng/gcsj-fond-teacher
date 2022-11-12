import { useEffect } from 'react'
import { message } from 'antd'
// import { UpCircleOutlined } from '@ant-design/icons'
import { useLocation, useNavigate, useRoutes } from 'react-router-dom'
import router from './router'

// import 'antd/dist/antd.css';    下载插件后 不用全局引用 只需按需引用

function ToLogin() {
  const navigateTo = useNavigate()

  useEffect(() => {
    navigateTo("/login")
    message.warning("您还没有登录，请登录后再访问!")
  }, [])

  return <div></div>
}

function ToPage1() {
  const navigateTo = useNavigate()
  // 加载完这个组件之后实现跳转
  useEffect(() => {
    // 加载完组件之后执行这里的代码
    navigateTo("/page1");
    message.warning("您已经登录过了！");
  }, [])
  return <div></div>
}


function BeforeRouterEnter() {

  const outlet = useRoutes(router);

  const location = useLocation();
  let token = localStorage.getItem("token");

  if (location.pathname === "/login" && token) {
    return <ToPage1 />
  }

  if (location.pathname !== "/login" && !token) {
    return <ToLogin />
  }

  return outlet

}



function App() {

  return (
    <div className="App">

      <BeforeRouterEnter />
    </div>
  )
}

export default App
