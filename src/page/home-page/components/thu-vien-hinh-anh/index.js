import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Image, Input, Space, Tabs, Upload, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import ImgFetch from '../../../../components/imgFetch';
import { imgUploadService } from '../../../../service/imgUpload';
import { thuVienHinhAnhService } from '../../../../service/homepage/thuVienHinhAnh';
import { getContentPageThunk } from '../../../../store/contentPage/contentPageThunk';

const initValueForm = {
  titleVn: '',
  titleEn: '',
};

const ThuVienHinhAnh = () => {
  const { contentPage } = useSelector((state) => state.contentPageSlice);

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const [listIdImg, setListIdImg] = useState();

  useEffect(() => {
    if (contentPage) {
      console.log('contentPage: ', contentPage);

      let dataEn = contentPage.dataPageEn.tuLieuHinhAnh;
      let dataVn = contentPage.dataPageVn.tuLieuHinhAnh;
      form.setFieldValue('titleVn', dataVn.title);
      form.setFieldValue('titleEn', dataEn.title);
      setListIdImg(dataVn.listData);
    }
  }, [contentPage]);

  const handleChange = async ({ fileList: newFileList }) => {
    let formImg = new FormData();
    formImg.append('file', newFileList[0].originFileObj);

    try {
      const dataImg = await imgUploadService.postImg(formImg, 0);
      await thuVienHinhAnhService.createImg(dataImg.data.idImg);
      dispatch(getContentPageThunk());
      message.success('thành công upload hình');
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const handleDelete = async (idImg) => {
    try {
      await thuVienHinhAnhService.deleteImg(idImg);
      dispatch(getContentPageThunk());
      message.success('xoá thành công');
    } catch (error) {
      console.log('error: ', error);
    }
  };
  const renderImg = () => {
    return listIdImg?.map((idImg, index) => {
      return (
        <Space
          key={index}
          direction="vertical"
          style={{
            border: '1px solid black',
            padding: 10,
            borderRadius: 10,
          }}
        >
          <ImgFetch w={140} h={100} imgId={idImg} />
          <Button
            onClick={() => {
              handleDelete(idImg);
            }}
            type="primary"
            danger
          >
            Xoá
          </Button>
        </Space>
      );
    });
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const items = [
    {
      key: '1',
      label: 'Nội dung tiếng việt',
      children: (
        <Form.Item
          label="Title"
          name="titleVn"
          rules={[
            {
              required: true,
              message: 'Không được trống',
            },
          ]}
        >
          <Input />
        </Form.Item>
      ),
    },
    {
      key: '2',
      label: 'Nội dung tiếng anh',
      children: (
        <Form.Item
          label="Title"
          name="titleEn"
          rules={[
            {
              required: true,
              message: 'Không được trống',
            },
          ]}
        >
          <Input />
        </Form.Item>
      ),
      forceRender: true,
    },
  ];

  return (
    <>
      <Form form={form} initialValues={initValueForm}>
        <Tabs defaultActiveKey="1" items={items} />
      </Form>
      <Space size={'large'} wrap>
        {renderImg()}
      </Space>
      <Upload
        listType="picture-card"
        customRequest={() => {}}
        showUploadList={false}
        onChange={handleChange}
      >
        {uploadButton}
      </Upload>
    </>
  );
};

export default ThuVienHinhAnh;
