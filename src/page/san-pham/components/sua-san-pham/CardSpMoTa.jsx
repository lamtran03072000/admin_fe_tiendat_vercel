import { Button, Card, Form, Image, Input, Space, Upload, message } from 'antd';
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
import ImgFetch from '../../../../components/imgFetch';
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
const CardSpMoTa = ({ sp, idSp, fetchSpApi }) => {
  const [form] = useForm();

  const [previewImage, setPreviewImage] = useState('');
  const [base64, setBase64] = useState('');
  const dispatch = useDispatch();

  const handleChange = async ({ fileList: newFileList }) => {
    setPreviewImage(await getBase64Main(newFileList[0].originFileObj));
    setBase64(newFileList[0].originFileObj);
  };
  const uploadButton = (
    <Button icon={<PlusOutlined />} type="dashed">
      hình
    </Button>
  );
  const handleDelete = async (idImg) => {
    try {
      await SanPhamService.deleteImgDesSp(idImg, idSp);
      fetchSpApi();
      message.success('xoa thanh cong');
    } catch (error) {}
  };
  useEffect(() => {
    form.setFieldValue('des', sp.des);
  }, [sp.des]);
  const handleUpdate = async (idImgPre) => {
    const formData = new FormData();
    formData.append('file', base64);

    let payload = {
      des: form.getFieldValue('des'),
      img: sp.img,
    };
    try {
      if (base64) {
        const data = await imgUploadService.postImg(formData, idImgPre);
        payload.img = data.data.idImg;
      }
      await SanPhamService.updateImgDesSp(payload, idSp, idImgPre);
      fetchSpApi();
      message.success('Lưu thành công');
      setBase64('');
      setPreviewImage('');
    } catch (error) {}
  };
  return (
    <Card
      style={{
        width: 200,
      }}
      cover={
        <>
          {previewImage ? (
            <Image preview={true} height={200} src={previewImage} />
          ) : (
            <ImgFetch imgId={sp?.img} h={200} />
          )}
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
        <Button
          onClick={() => {
            handleDelete(sp?.img);
          }}
          type="primary"
        >
          Xoá
        </Button>
        <Button
          onClick={() => {
            handleUpdate(sp?.img);
          }}
          type="primary"
        >
          Lưu
        </Button>
      </Space>
    </Card>
  );
};

export default CardSpMoTa;
