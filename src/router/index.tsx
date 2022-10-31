import React, { lazy } from "react"
import { Navigate } from "react-router-dom"
import Home from "../views/Home"
import Page1 from "@/views/Page1"
import Page2 from "@/views/Page2"

const About = lazy(() => import("../views/About"))
// const Home = lazy(() => import("../views/Home")) // 主页不用懒加载
const User = lazy(() => import("../views/User"))


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
        path: "",
        element: <Home />,
        children: [
            {
                path: "/page1",
                element: withLoadingComponent(<Page1 />)
            },
            {
                path: "/page2",
                element: withLoadingComponent(<Page2 />)
            }
        ]
    },
]


export default routes