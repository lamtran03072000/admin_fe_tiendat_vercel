import { Button, Form, Input, Space, message } from 'antd';
import React, { useEffect } from 'react';
import { lienHeService } from '../../../../service/lien-he/lienHeSer';
import { getContentPageThunk } from '../../../../store/contentPage/contentPageThunk';
import { useDispatch, useSelector } from 'react-redux';

const Zalo = () => {
  const [form] = Form.useForm();

  const { contentPage } = useSelector((state) => state.contentPageSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (contentPage) {
      form.setFieldValue('sdt', contentPage.dataThongTinThem.sdt);
    }
  }, [contentPage]);
  const handleUpdateContent = async (lg) => {
    try {
      let { sdt } = form.getFieldsValue();

      await lienHeService.updateZalo(sdt);
      dispatch(getContentPageThunk());
      message.success('Thành công');
    } catch (error) {}
  };
  return (
    <Form form={form}>
      <br />
      <br />
      <br />
      <Form.Item
        label="Số điện thoại"
        name="sdt"
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
            handleUpdateContent();
          }}
          type="primary"
        >
          Lưu
        </Button>
      </Space>
    </Form>
  );
};

export default Zalo;
