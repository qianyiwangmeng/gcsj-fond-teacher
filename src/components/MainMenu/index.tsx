import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


// type MenuItem = Required<MenuProps>['items'][number];   原版类型

type MenuItem = {
    label: string;
    key: string;
    icon?: React.ReactNode;
    children?: MenuItem[]
}


// 函数返回一个对象
// function getItem(
//     label: React.ReactNode,
//     key: React.Key,
//     icon?: React.ReactNode,
//     children?: MenuItem[],
// ): MenuItem {
//     return {
//         key,
//         icon,
//         children,
//         label,
//     } as MenuItem;
// }

// const items: MenuItem[] = [
//     getItem('Option 1', '/page1', <PieChartOutlined />),
//     getItem('Option 2', '/page2', <DesktopOutlined />),
//     getItem('User', 'sub1', <UserOutlined />, [
//         getItem('Tom', '3'),
//         getItem('Bill', '4'),
//         getItem('Alex', '5'),
//     ]),
//     getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
//     getItem('Files', '9', <FileOutlined />),
// ];

const items: MenuItem[] = [
    {
        label: "密码管理",
        key: "/page1",
        icon: <PieChartOutlined />,
    },
    {
        label: "隐私笔记",
        key: "/page2",
        icon: <PieChartOutlined />,
        children: [
            {
                label: "写隐私笔记",
                key: "/page2/page201"
            },
            {
                label: "获取隐私笔记",
                key: "/page2/page202"
            },
        ]
    },
    // {
    //     label: "栏目3",
    //     key: "/page3",
    //     icon: <UserOutlined />,
    //     children: [
    //         {
    //             label: "栏目301",
    //             key: "/page3/page301"
    //         },
    //         {
    //             label: "栏目302",
    //             key: "/page3/page302"
    //         },
    //         {
    //             label: "栏目303",
    //             key: "/page3/page303"
    //         }
    //     ]
    // },
    // {
    //     label: "栏目4",
    //     key: "/page4",
    //     icon: <TeamOutlined />,
    //     children: [
    //         {
    //             label: "栏目401",
    //             key: "/page4/page401"
    //         },
    //         {
    //             label: "栏目402",
    //             key: "/page4/page402"
    //         },
    //         {
    //             label: "栏目403",
    //             key: "/page4/page403"
    //         }
    //     ]
    // },
]

const Copm: React.FC = () => {

    const currentRoute = useLocation()

    let firstOpenKey: string = "";

    function findKey(obj: { key: string }) {
        return obj.key === currentRoute.pathname
    }

    for (let i = 0; i < items.length; i++) {
        if (items[i]['children'] && items[i]['children']?.find(findKey)) {
            firstOpenKey = items[i].key as string;
            break;
        }
    }


    const [openKeys, setOpenKeys] = useState([firstOpenKey])

    const navigateTo = useNavigate()

    // console.log("加载了菜单...", currentRoute); // 加载了两次是开发模式 生产模式不会。 如果开发模式不想加载两次的话就 取消严格模式


    const menuClick = (e: { key: string }) => {
        console.log("点击了菜单", e.key);
        navigateTo(e.key)
    }

    const onOpenChange = (keys: string[]) => {
        setOpenKeys([keys[keys.length - 1]])
    }

    return (
        <Menu
            theme="dark"
            defaultSelectedKeys={[currentRoute.pathname]}
            mode="inline"
            items={items}
            onClick={menuClick}
            onOpenChange={onOpenChange}
            openKeys={openKeys}
        />
    )
}

export default Copm;