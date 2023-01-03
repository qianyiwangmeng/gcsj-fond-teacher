import { FindLabReportApi } from '@/request/api';
import { Button, message, Pagination, Space, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface DataType {
  publisher: string;
  publisherName: string;
  createTime: string;
  labName: string;
}

const index = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: '学号',
      dataIndex: 'publisher',
      key: 'publisher',
      width: '250px',
    },
    {
      title: '姓名',
      dataIndex: 'publisherName',
      key: 'publisherName',
      width: '200px',
    },
    {
      title: '所在实验室',
      dataIndex: 'labName',
      key: 'labName',
      width: '300px',
    },
    {
      title: '周报提交时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: '350px',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button type="primary" onClick={showWeek.bind(this, record)}>
            查看周报
          </Button>
        </Space>
      ),
    },
  ];
  let location = useLocation();
  let labId = location.state.labId;
  let labName = location.state.labName;

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(10);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(7);
  const navigateTo = useNavigate();

  const addFiled = (arr: any) => {
    arr.forEach((v: { key: any; id: any; labName: any }) => {
      v.key = v.id;
      v.labName = labName;
    });
  };

  useEffect(() => {
    const fn = async () => {
      let res = await FindLabReportApi({
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

  const showTable = async (No: number, Size: number) => {
    let res = await FindLabReportApi({
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
      message.error('获取周报失败');
    }
  };

  const noChange = (p: number, s: number) => {
    setPage(p);
    setSize(s);
    showTable(p, s);
  };

  const showWeek = (record: any) => {
    navigateTo('/details', {
      state: {
        reportId: record.id,
      },
    });
  };

  return (
    <div>
      <Table columns={columns} dataSource={data} pagination={false} />
      <Pagination
        defaultCurrent={1}
        total={total}
        showTotal={(total) => `本周共${total}篇周报`}
        defaultPageSize={7}
        pageSize={7}
        style={{ float: 'right', marginTop: '10px' }}
        onChange={noChange}
      />
    </div>
  );
};

export default index;
