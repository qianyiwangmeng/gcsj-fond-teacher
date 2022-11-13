import { Button, Input, message, Space } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import initLoginBg from "./init";
import styles from "./login.module.scss"
import "antd/dist/antd.css"
import "./login.less"   // 浏览器检查 元素后，可用 less来覆盖样式
import { LoginAPI, RegisterAPI } from "@/request/api";



const View = () => {

    let navigateTo = useNavigate()

    useEffect(() => {
        initLoginBg();
        window.onresize = function () {
            initLoginBg();
        }
    }, [])

    const [usernameVal, setUsernameVal] = useState("")
    const [passwordVal, setPasswordVal] = useState("")

    const usernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsernameVal(e.target.value)
    }

    const passwordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordVal(e.target.value)
    }

    const gotoRegister = async () => {
        if (!usernameVal.trim() || !passwordVal.trim()) {
            message.warning("请填写完整信息")
            return
        }
        let RegisterAPIRes = await RegisterAPI({
            username: usernameVal,
            password: passwordVal
        })

        if (RegisterAPIRes.code === 201) {
            message.warning(RegisterAPIRes.msg)
            return
        }

        if (RegisterAPIRes.code === 200) {
            message.success(RegisterAPIRes.msg)
        } else {
            message.error(RegisterAPIRes.msg)
        }
    }



    const gotoLogin = async () => {
        if (!usernameVal.trim() || !passwordVal.trim()) {
            message.warning("请填写完整信息")
            return
        }

        // if (usernameVal === "admin" && passwordVal === "123456") {
        //     message.success("登录成功！")
        //     localStorage.setItem("token", usernameVal)
        //     navigateTo("/page1")
        //     return
        // }  // 本地前端测试

        let LoginAPIRes = await LoginAPI({
            username: usernameVal,
            password: passwordVal
        })


        if (LoginAPIRes.code === 2002) {
            message.error("密码错误!")
        }

        if (LoginAPIRes.code === 200) {
            message.success("登录成功！")
            localStorage.setItem("token", LoginAPIRes.token)
            navigateTo("/page1")
        }

    }


    return (
        <div className={styles.loginPage}>
            {/* 存放背景 */}
            <canvas id="canvas" style={{ display: "block" }}></canvas>
            {/* 登录盒子 */}
            <div className={styles.loginBox + " loginbox"}>
                {/* 标题部分 */}
                <div className={styles.title}>
                    <h1>隐私笔记本</h1>
                </div>

                <div className="form">
                    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                        <Input placeholder="用户名" onChange={usernameChange} />
                        <Input.Password placeholder="密码" onChange={passwordChange} />


                        <div className="flexBox" style={{ display: "flex", justifyContent: "space-between" }}>
                            <Button
                                type="primary"
                                className="loginBtn"
                                style={{ width: "48%" }}
                                onClick={gotoLogin}>登录</Button>


                            <Button
                                type="primary"
                                className="loginBtn"
                                style={{ width: "48%" }}
                                onClick={gotoRegister}>注册</Button>

                        </div>




                    </Space>
                    <p>由区块链技术提供安全和隐私保护</p>
                </div>


            </div>
        </div>
    )

}


export default View
