import React, { useState } from 'react';
import { Button, Modal, Space } from 'antd';
import { mailService } from '../../../service/mailService';

const ShowDesMail = ({ formMail, fetchMails }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    (async () => {
      try {
        await mailService.putCheckMail(formMail.id);
        setIsModalOpen(true);
        fetchMails();
      } catch (error) {
        console.log('error: ', error);
      }
    })();
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Xem chi tiết{' '}
      </Button>
      <Modal
        title={
          <p>
            <b style={{ fontSize: 18 }}>Tiêu đề</b> :{' '}
            <span>{formMail.tieuDe}</span>
          </p>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <Space direction="vertical">
          <p>
            <b style={{ fontSize: 18 }}>Họ tên</b> :{' '}
            <span>{formMail.hoTen}</span>
          </p>
          <p>
            <b style={{ fontSize: 18 }}>Email</b> :{' '}
            <span>{formMail.email}</span>
          </p>
          <p>
            <b style={{ fontSize: 18 }}>Số điện thoại</b> :{' '}
            <span>{formMail.sdt}</span>
          </p>
          <p>
            <b style={{ fontSize: 18 }}>Nội dung mail</b> : <br />{' '}
            <span>{formMail.noiDung}</span>
          </p>
        </Space>
      </Modal>
    </>
  );
};

export default ShowDesMail;
