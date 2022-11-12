import { Layout, Button, Popconfirm, message } from 'antd';
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import MainMenu from '@/components/MainMenu'

const { Header, Content, Footer, Sider } = Layout;


const View: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigateTo = useNavigate()

    const confirm = () => {
        // console.log(e);
        localStorage.removeItem("token")
        navigateTo("/login")
        message.success('登出成功');
    };

    const cancel = () => {
        // console.log(e);
        message.error('取消登出');
    };


    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* 左边的侧边栏 */}
            <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                <div className="logo" />
                <MainMenu />
            </Sider>
            {/* 右边的内容 */}
            <Layout className="site-layout">
                {/* 右边头部 */}
                <Header className="site-layout-background" style={{ paddingLeft: '16px' }} >
                    {/* 面包屑放头部里 */}
                    {/* <Breadcrumb style={{ lineHeight: '64px' }}> */}
                    <Popconfirm
                        title="Are you sure to logout?"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="是"
                        cancelText="否"
                    >
                        <Button type="primary" style={{ float: "right", margin: 15 }}>登出</Button>

                    </Popconfirm>
                    {/* </Breadcrumb> */}
                </Header>
                {/* 右边内容 */}
                <Content style={{ margin: '16px 16px 0' }} className="site-layout-background">

                    {/* 把内容的site-layout-background 放到content里面 */}
                    {/* <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        Bill is a cat.
                    </div> */}
                    <Outlet />
                    {/* 这里放窗口 */}
                </Content>
                <Footer style={{ textAlign: 'center', padding: 0, lineHeight: '48px' }}>smyx ©2022 Created by Dream Chian</Footer>
            </Layout>
        </Layout>
    );
};

export default View;