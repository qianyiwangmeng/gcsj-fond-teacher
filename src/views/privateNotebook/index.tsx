import { WriteNoteApi } from '@/request/api';
import { Button, Input, message } from 'antd';
import React, { useState } from 'react';

const { TextArea } = Input;

const view = () => {

    const [textAreaVal, setTextAreaVal] = useState("")
    const [headerVal, setHeaderVal] = useState("")

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextAreaVal(e.target.value)
        // console.log('Change:', e.target.value);
    };

    const onChangeHeaderVal = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHeaderVal(e.target.value)
    }

    const sumbit = async () => {
        if (!headerVal.trim || !textAreaVal.trim) {
            message.warning("请填写完整！")
            return
        }

        const res = await WriteNoteApi({
            header: headerVal,
            content: textAreaVal
        })

        if (res.code === 200) {
            setHeaderVal("")
            setTextAreaVal("")
            message.success(res.msg)
        } else {
            message.error("提交失败")
        }

    }

    return (
        <div>
            <span>主题：</span>
            <Input placeholder="Basic usage"
                onChange={onChangeHeaderVal}
                value={headerVal}
            />
            <span>内容：</span>
            <TextArea
                showCount
                maxLength={500}
                style={{ height: 200 }}
                onChange={onChange}
                value={textAreaVal}
                placeholder="can resize"
            />
            <Button type="primary" onClick={sumbit} style={{ float: "right", marginTop: "30px", marginRight: "5px" }}>提交</Button>
        </div>

    )
}

export default view;