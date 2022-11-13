import React, { lazy } from "react"
import { Navigate } from "react-router-dom"
import Home from "../views/Home"
import Login from "../views/Login"

// const About = lazy(() => import("../views/About"))
// // const Home = lazy(() => import("../views/Home")) // 主页不用懒加载
// const User = lazy(() => import("../views/User"))


const Page1 = lazy(() => import("../views/PwdManage"))
const Page201 = lazy(() => import("../views/PrivateNotebook"))
const Page202 = lazy(() => import("../views/GetprivateNotebook"))
const Page301 = lazy(() => import("../views/Page301"))





const withLoadingComponent = (comp: JSX.Element) => (
    <React.Suspense fallback={<div>Loading...</div>}>
        {comp}
    </React.Suspense>
)

// add Loading component
const routes = [
    {
        path: "/",
        element: <Navigate to="/page1" />
    },
    {
        path: "/",
        element: <Home />,
        children: [
            {
                path: "/page1",
                element: withLoadingComponent(<Page1 />)
            },
            {
                path: "/page2/page201",
                element: withLoadingComponent(<Page201 />)
            },
            {
                path: "/page2/page202",
                element: withLoadingComponent(<Page202 />)
            },
            {
                path: "/page3/page301",
                element: withLoadingComponent(<Page301 />)
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    },

    // 访问其余路径的时候 直接跳到首页  
    {
        path: "*",
        element: <Navigate to="/page1" />
    }
]


export default routes