import { Button, Form, Input, Space, message } from 'antd';
import React, { useEffect } from 'react';
import { languageUpdate } from '../../../../utils/constants';
import { lienHeService } from '../../../../service/lien-he/lienHeSer';
import { useDispatch, useSelector } from 'react-redux';
import { getContentPageThunk } from '../../../../store/contentPage/contentPageThunk';

const initValueForm = {
  adress: '',
  email: '',
  hotline: '',
};
const LienHeSection = () => {
  const [form] = Form.useForm();
  const { contentPage } = useSelector((state) => state.contentPageSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (contentPage) {
      form.setFieldValue('adress', contentPage.dataLienHeVn.lienHe.adress);
      form.setFieldValue('email', contentPage.dataLienHeVn.lienHe.email);
      form.setFieldValue('hotline', contentPage.dataLienHeVn.lienHe.hotline);
    }
  }, [contentPage]);

  const handleUpdateContent = async (lg) => {
    try {
      let { adress, email, hotline } = form.getFieldsValue();
      const data = {
        adress,
        email,
        hotline,
      };
      await lienHeService.updateLienHe(data);
      dispatch(getContentPageThunk());
      message.success('Thành công');
    } catch (error) {}
  };
  return (
    <Form form={form} initialValues={initValueForm}>
      <br />
      <Form.Item
        label="Địa chỉ"
        name="adress"
        rules={[
          {
            required: true,
            message: 'Không được trống',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Không được trống',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Hotline"
        name="hotline"
        rules={[
          {
            required: true,
            message: 'Không được trống',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Space>
        <Button
          onClick={() => {
            handleUpdateContent(languageUpdate.vn);
          }}
          type="primary"
        >
          Lưu
        </Button>
      </Space>
    </Form>
  );
};

export default LienHeSection;
