import { ReportDetailApi } from '@/request/api';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MdEditor from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

const index = () => {
  let location = useLocation();
  let reportId = location.state.reportId;

  const [text, setText] = useState('');

  useEffect(() => {
    const fn = async () => {
      let res = await ReportDetailApi({
        id: reportId,
      });
      if (res.code === 200) {
        setText(res.result.weeklySummary);
      } else {
        message.error('查看周报失败');
      }
    };

    fn();
  }, []);

  return <MdEditor modelValue={text} previewOnly={true} />;
};

export default index;
