import { GetPwdApi, StorePwdApi } from "@/request/api"
import { message } from "antd"
import { ChangeEvent, useState } from "react"
import "./index.scss"



const view = () => {


    const [saveUrlVal, setSaveUrlVal] = useState("")
    const [savePwdVal, setSavePwdVal] = useState("")

    const [getUrlVal, setGetUrlVal] = useState("")
    const [getPwdVal, setGetPwdVal] = useState("")

    const onchangeSaveUrl = (e: ChangeEvent<HTMLInputElement>) => {
        setSaveUrlVal(e.target.value)

    }
    const onchangeSavePwd = (e: ChangeEvent<HTMLInputElement>) => {
        setSavePwdVal(e.target.value)

    }
    const onchangeGetUrl = (e: ChangeEvent<HTMLInputElement>) => {
        setGetUrlVal(e.target.value)
    }

    const storePassword = async () => {
        if (!saveUrlVal.trim() || !savePwdVal.trim()) {
            message.warning("请填写完整信息")
            return
        }

        const res = await StorePwdApi({
            url: saveUrlVal,
            password: savePwdVal
        })

        if (res.code === 200) {
            message.success(res.msg)
        } else {
            message.error(res.data)
        }

    }

    const callPassword = async () => {
        if (!getUrlVal.trim()) {
            message.warning("请输入完整的url地址")
            return
        }

        const res = await GetPwdApi({
            url: getUrlVal
        })

        if (res.code === 200) {
            message.success("密码获取成功")
            setGetPwdVal(res.data as string)
        } else {
            message.error(res.data)
        }
    }


    return (

        <div className="PwdManageBox">
            <div className="twoItem">
                <h1>将密码存到链上</h1>
                <div className="content">
                    <span>请输入url</span>
                    <input name="url"
                        onChange={onchangeSaveUrl}
                        value={saveUrlVal}>
                    </input>
                    <span>输入密码</span>
                    <input type="password"
                        style={{ marginTop: "10px" }}
                        onChange={onchangeSavePwd}
                        value={savePwdVal}>
                    </input>
                </div>
                <button className=".btn"
                    onClick={storePassword}
                >保存密码</button>

            </div>

            <div className="twoItem">
                <h1>从链上获取密码</h1>
                <div className="content">
                    <span>请输入url</span>
                    <input
                        onChange={onchangeGetUrl}
                        value={getUrlVal}>
                    </input>
                    <span style={{ float: "left", marginLeft: "7px", fontSize: "20px" }}>密码</span> <p className="showPwd">{getPwdVal}</p>
                </div>
                <button className=".btn"
                    onClick={callPassword}
                >获取密码</button>
            </div>
        </div>
    );
}

export default view