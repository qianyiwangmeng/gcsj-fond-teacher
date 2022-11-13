import { GetNotesApi } from '@/request/api';
import { Collapse } from 'antd';
import { useEffect, useState } from 'react';

const { Panel } = Collapse;


const view = () => {


  const initialArray: Array<Notes> = []
  const [notes, setNotes] = useState(initialArray)

  // const onChange = (key: string | string[]) => {
  //   console.log(key);
  // };


  useEffect(() => {
    const fn = async () => {
      const res = await GetNotesApi()
      if (res.code !== 200) {
        console.log("获取笔记失败");
      }

      setNotes(res.data)
    };
    fn();

  }, []);



  return (

    <Collapse defaultActiveKey={['1']}>
      {
        notes.map(note => (
          <Panel header={note.header} key={note.id} >
            <p>{note.content}</p>
          </Panel>
        ))
      }
    </Collapse>
  );
};

export default view;