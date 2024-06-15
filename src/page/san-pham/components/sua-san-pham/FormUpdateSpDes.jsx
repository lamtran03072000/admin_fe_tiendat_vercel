import { Button, Card, Form, Image, Input, Space, Upload } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  handdleAddSpMoTa,
  handleUpdateForm,
} from '../../../../store/SanPham/sanPhamSlice';

import { imgUploadService } from '../../../../service/imgUpload';
import { SanPhamService } from '../../../../service/san-pham/SanPhamService';
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
const FormUpdateSpDes = ({ idSp, fetchSpApi }) => {
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

  const handleAdd = async () => {
    const formData = new FormData();
    formData.append('file', base64);
    if (!base64) return;
    try {
      const data = await imgUploadService.postImg(formData);

      const payload = {
        des: form.getFieldValue('des'),
        img: data.data.idImg,
      };
      await SanPhamService.postImgDesSp(payload, idSp);
      fetchSpApi();
    } catch (error) {}

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
          <Image preview={true} height={200} src={previewImage} />
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
      </Space>
    </Card>
  );
};

export default FormUpdateSpDes;
