import { Button, Form, Image, Input, Modal, Upload, message } from 'antd';
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { imgUploadService } from '../../../../service/imgUpload';
import { SanPhamService } from '../../../../service/san-pham/SanPhamService';

import { useDispatch } from 'react-redux';
import { getContentPageThunk } from '../../../../store/contentPage/contentPageThunk';

const initValueForm = {
  tenDs: '',
};

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ThemDanhSachSP = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [base64, setBase64] = useState();
  const [imgPreview, setImgPreview] = useState();
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [form] = Form.useForm();

  const uploadButton = (
    <Button type="primary" icon={<PlusOutlined />}>
      Upload
    </Button>
  );
  const handleAddListProduct = async () => {
    let formData = new FormData();

    formData.append('file', base64);
    const dataPostDs = {
      img: '',
      name: form.getFieldValue('tenDs'),
    };
    try {
      const dataImgUpdate = await imgUploadService.postImg(formData, 0);
      await SanPhamService.createDssp({
        ...dataPostDs,
        img: dataImgUpdate.data.idImg,
      });
      dispatch(getContentPageThunk());
      form.resetFields();
      setImgPreview('');
      setIsModalOpen(false);
      message.success('Thêm thành công');
      setBase64('');
    } catch (error) {
      console.log('error: ', error);
    }
  };
  const handleChange = async ({ fileList: newFileList }) => {
    setBase64(newFileList[0].originFileObj);
    setImgPreview(await getBase64(newFileList[0].originFileObj));
  };
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Thêm danh sách
      </Button>
      <Modal
        title="Thêm danh sách sản phẩm"
        open={isModalOpen}
        footer=""
        onCancel={handleCancel}
      >
        <Form initialValues={initValueForm} form={form}>
          <Form.Item
            name="tenDs"
            label="Tên danh sách"
            rules={[
              {
                required: true,
                message: 'Không được để trống',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Hình"
            rules={[
              {
                required: true,
                message: 'Không được để trống',
              },
            ]}
          >
            <Image width={'100%'} height={'300px'} src={imgPreview} />
            <Upload
              customRequest={() => {}}
              listType="picture"
              showUploadList={false}
              onChange={handleChange}
              maxCount={1}
            >
              {uploadButton}
            </Upload>
          </Form.Item>
        </Form>
        <Button onClick={handleAddListProduct} type="primary">
          Thêm
        </Button>
      </Modal>
    </div>
  );
};

export default ThemDanhSachSP;
