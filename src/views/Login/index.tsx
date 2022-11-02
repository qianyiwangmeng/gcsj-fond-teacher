import { Button, Input, Space } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import initLoginBg from "./init";
import styles from "./login.module.scss"
import "antd/dist/antd.css"
import "./login.less"   // 浏览器检查 元素后，可用 less来覆盖样式



const View = () => {

    useEffect(() => {
        initLoginBg();
        window.onresize = function () {
            initLoginBg();
        }
    }, [])

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const usernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const passwordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const gotoLogin = () => {

    }


    return (
        <div className={styles.loginPage}>
            {/* 存放背景 */}
            <canvas id="canvas" style={{ display: "block" }}></canvas>
            {/* 登录盒子 */}
            <div className={styles.loginBox + " loginbox"}>
                {/* 标题部分 */}
                <div className={styles.title}>
                    <h1>私密印象</h1>
                    <p>由区块链技术提供安全</p>
                </div>

                <div className="form">
                    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                        <Input placeholder="用户名" onChange={usernameChange} />
                        <Input.Password placeholder="密码" onChange={passwordChange} />
                        <Button type="primary" className="loginBtn" block onClick={gotoLogin}>登录</Button>
                    </Space>
                </div>


            </div>
        </div>
    )

}


export default View
