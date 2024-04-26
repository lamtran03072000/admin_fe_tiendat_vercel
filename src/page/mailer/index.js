import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Tag, Badge, message } from 'antd';
import { mailService } from '../../service/mailService';
import ShowDesMail from './component/ShowDesMail';

const Mailer = () => {
  const [dataMail, setDataMail] = useState();

  const fetchMails = async () => {
    try {
      const data = await mailService.getMails();
      console.log('data: ', data);
      let newData = data.data.map((d, i) => {
        return {
          ...d,
          key: i,
        };
      });
      setDataMail(newData);
    } catch (error) {}
  };
  const deleteMail = async (idMail) => {
    try {
      await mailService.deleteMail(idMail);
      fetchMails();
      message.success('xoá mail thành công');
    } catch (error) {}
  };
  const columns = [
    {
      title: 'stt',
      dataIndex: 'id',
      key: 'id',
      render: (_, record) => {
        return (
          <Badge status="processing" dot={!record.isCheck} size="default">
            <Button type="">{record.key + 1}</Button>
          </Badge>
        );
      },
    },
    {
      title: 'sdt',
      dataIndex: 'sdt',
      key: 'sdt',
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Họ tên',
      dataIndex: 'hoTen',
      key: 'hoTen',
    },
    {
      title: 'Tiêu Đề',
      dataIndex: 'tieuDe',
      key: 'tieuDe',
    },
    {
      title: 'Nội dung',
      dataIndex: 'noiDung',
      key: 'noiDung',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              deleteMail(record.id);
            }}
            type="dashed"
          >
            Xoá
          </Button>
          <ShowDesMail fetchMails={fetchMails} formMail={record} />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchMails();
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={dataMail} />
    </div>
  );
};

export default Mailer;
