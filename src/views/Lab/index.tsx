import { GetLbsApi } from '@/request/api';
import { Space, Table, Button, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface DataType {
  name: string;
  des: string;
  teacher: string;
  createTime: string;
}

interface Iuser {
  id: string;
  name: string;
  avatar: string;
}

const App: React.FC = () => {
  let [labs, setLabs] = useState([]);

  const navigateTo = useNavigate();

  let data = localStorage.getItem('user');
  let user = JSON.parse(data as string);

  const columns: ColumnsType<DataType> = [
    {
      title: '实验室名称',
      dataIndex: 'name',
      key: 'name',
      width: '250px',
    },
    {
      title: '简介',
      dataIndex: 'des',
      key: 'des',
      width: '300px',
    },
    {
      title: '负责老师',
      dataIndex: 'teacher',
      key: 'teacher',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: '250px',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button type="primary" onClick={butClick.bind(this, record)}>
            进入实验室
          </Button>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    const fn = async () => {
      let res = await GetLbsApi();
      if (res.code !== 200) {
        message.error('获取实验室失败');
      }
      let data = res.result;
      data.forEach((v: { id: any; teacher: any; key: any }) => {
        v.key = v.id;
        v.teacher = user.name;
      });
      setLabs(data);
    };
    fn();
  }, []);

  const butClick = (record: any) => {
    navigateTo('/studentList', {
      state: { id: record.key, name: record.name },
    });
  };

  return (
    <div>
      <div style={{ marginBottom: '20px', marginTop: '10px' }}></div>
      <Table columns={columns} dataSource={labs} />
    </div>
  );
};
export default App;
