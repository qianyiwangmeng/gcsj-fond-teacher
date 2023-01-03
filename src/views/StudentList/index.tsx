import { AddStudentApi, DelStudentApi, GetLbStudentsApi } from '@/request/api';
import {
  Space,
  Table,
  Button,
  message,
  Pagination,
  Modal,
  Input,
  Form,
  Popconfirm,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

interface DataType {
  studentNumber: string;
  studentName: string;
  createTime: string;
  labName: string;
}

const index = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: '学号',
      dataIndex: 'studentNumber',
      key: 'studentNumber',
      width: '250px',
    },
    {
      title: '姓名',
      dataIndex: 'studentName',
      key: 'studentName',
      width: '200px',
    },
    {
      title: '所在实验室',
      dataIndex: 'labName',
      key: 'labName',
      width: '300px',
    },
    {
      title: '加入时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: '350px',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Popconfirm
            title="是否删除?"
            onConfirm={confirm.bind(this, record)}
            onCancel={cancel}
            okText="是"
            cancelText="否"
          >
            <Button type="primary">移除实验室</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const confirm = async (e: any) => {
    let res = await DelStudentApi({
      id: e.id,
    });
    if (res.code === 200) {
      message.success('删除成功');
      showTable(page, size);
    } else {
      message.error(res.message);
    }
  };

  const cancel = (e: any) => {};

  let location = useLocation();
  let labId = location.state.id;
  let name = location.state.name;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values: any) => {
    let res = await AddStudentApi({
      laboratoryId: labId,
      studentNumber: values.studentNumber,
      studentName: values.studentName,
    });
    if (res.code === 200) {
      message.success('添加成功');
      handleOk();
      showTable(page, size);
      form.resetFields();
    } else {
      message.error(res.message);
    }
  };

  const onFinishFailed = (errorInfo: any) => {};

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(10);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(7);
  const navigateTo = useNavigate();

  const addFiled = (arr: any) => {
    arr.forEach((v: { key: any; id: any; labName: any }, i: any) => {
      v.key = v.id;
      v.labName = name;
    });
  };

  const showTable = async (No: number, Size: number) => {
    let res = await GetLbStudentsApi({
      id: labId,
      pageNo: No,
      pageSize: Size,
    });
    if (res.code === 200) {
      let list = res.result.records;
      addFiled(list);
      setData(list);
      setTotal(res.result.total);
      return;
    } else {
      message.error('获取学生失败');
    }
  };

  useEffect(() => {
    const fn = async () => {
      let res = await GetLbStudentsApi({
        id: labId,
        pageNo: 1,
        pageSize: 7,
      });
      if (res.code === 200) {
        let list = res.result.records;
        setTotal(res.result.total);
        addFiled(list);
        setData(list);
        return;
      }
    };
    fn();
  }, []);

  const del = async (record: any) => {
    let res = await DelStudentApi({
      id: record.id,
    });
    if (res.code === 200) {
      message.success('删除成功');
      showTable(page, size);
    } else {
      message.error(res.message);
    }
  };

  const noChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(size);
    showTable(page, pageSize);
  };

  const showWeekly = () => {
    navigateTo('/weekList', {
      state: { labId: labId, labName: name },
    });
  };

  return (
    <div>
      <div style={{ marginBottom: '2px', marginTop: '10px' }}>
        <Button type="primary" onClick={showModal}>
          新增学生
        </Button>
        <Button
          type="primary"
          onClick={showWeekly}
          style={{ marginLeft: '48px' }}
        >
          查看本周报报
        </Button>
      </div>
      <Table columns={columns} dataSource={data} pagination={false} />
      <Pagination
        defaultCurrent={1}
        total={total}
        showTotal={(total) => `总共${total}个成员`}
        defaultPageSize={7}
        pageSize={7}
        style={{ float: 'right', marginTop: '10px' }}
        onChange={noChange}
      />

      <Modal
        title="向实验室添加成员"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="学号"
            name="studentNumber"
            rules={[{ required: true, message: '请输入学号!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="姓名"
            name="studentName"
            rules={[{ required: true, message: '请输入姓名!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 19, span: 16 }}>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default index;
