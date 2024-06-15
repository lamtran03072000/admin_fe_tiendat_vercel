import { Button, Card, Form, Image, Input, Space, Upload } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  handdleAddSpMoTa,
  handleUpdateForm,
} from '../../../../store/SanPham/sanPhamSlice';
const initialValue = {
  des: '',
};

const getBase64Main = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const FormAddSpMoTa = () => {
  const [form] = useForm();

  const [previewImage, setPreviewImage] = useState('');
  const [base64, setBase64] = useState('');
  const dispatch = useDispatch();

  const { formAdd, isUpdate, isPressButton } = useSelector(
    (state) => state.sanPhamSlice,
  );
  const handleChange = async ({ fileList: newFileList }) => {
    setPreviewImage(await getBase64Main(newFileList[0].originFileObj));
    setBase64(newFileList[0].originFileObj);
  };

  const uploadButton = (
    <Button icon={<PlusOutlined />} type="dashed">
      hình
    </Button>
  );

  useEffect(() => {
    form.setFieldValue('des', formAdd.des);
    setPreviewImage(formAdd.preview);
    setBase64(formAdd.base64);
  }, [isPressButton]);
  const handleAdd = () => {
    let id = Date.now();
    const payload = {
      id,
      base64,
      preview: previewImage,
      des: form.getFieldValue('des'),
    };
    dispatch(handdleAddSpMoTa(payload));
    setPreviewImage('');
    setBase64('');
    form.setFieldValue('des', '');
  };
  const handleUpdate = () => {
    let payLoad = {
      id: formAdd.id,
      base64: base64,
      des: form.getFieldValue('des'),
      preview: previewImage,
    };
    dispatch(handleUpdateForm(payLoad));
    setPreviewImage('');
    setBase64('');
    form.setFieldValue('des', '');
  };
  return (
    <Card
      style={{
        width: 200,
      }}
      cover={
        <>
          <Image preview={true} height={120} src={previewImage} />
          <Upload maxCount={1} showUploadList={false} onChange={handleChange}>
            {uploadButton}
          </Upload>
        </>
      }
    >
      <Form form={form} initialValues={initialValue}>
        <Form.Item name="des">
          <Input />
        </Form.Item>
      </Form>
      <Space>
        <Button onClick={handleAdd} type="primary">
          Thêm
        </Button>
        {isUpdate && (
          <Button onClick={handleUpdate} type="primary">
            Cập nhật
          </Button>
        )}
      </Space>
    </Card>
  );
};

export default FormAddSpMoTa;
