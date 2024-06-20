import React from 'react';
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Space,
  Tabs,
  Upload,
  Image,
  message,
} from 'antd';

import { languageUpdate } from '../../../../utils/constants';
import { SanPhamService } from '../../../../service/san-pham/SanPhamService';
import { useDispatch, useSelector } from 'react-redux';
import ImgFetch from '../../../../components/imgFetch';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useEffect } from 'react';
import { imgUploadService } from '../../../../service/imgUpload';
import { getContentPageThunk } from '../../../../store/contentPage/contentPageThunk';
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const initialValue = {
  titleVn: '',
  titleEn: '',
  link1: '',
  link2: '',
  link3: '',
  link4: '',
};
const QuyTrinh = () => {
  const [form] = Form.useForm();
  const { contentPage } = useSelector((state) => state.contentPageSlice);
  const [base64img1, setBase64img1] = useState();
  const [base64img2, setBase64img2] = useState();
  const [base64img3, setBase64img3] = useState();
  const [base64img4, setBase64img4] = useState();
  const [imgPreview1, setImgPreview1] = useState();
  const [imgPreview2, setImgPreview2] = useState();
  const [imgPreview3, setImgPreview3] = useState();
  const [imgPreview4, setImgPreview4] = useState();
  const [dataVn, setDataVn] = useState();
  const [dataEn, setDataEn] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    if (contentPage) {
      console.log('contentPage: ', contentPage);
      setDataVn(contentPage.dataPageSanPhamVn.quytrinh);
      setDataEn(contentPage.dataPageSanPhamEn.quytrinh);

      form.setFieldValue('link1', contentPage.dataPageSanPhamVn.quytrinh.link1);
      form.setFieldValue('link2', contentPage.dataPageSanPhamVn.quytrinh.link2);
      form.setFieldValue('link3', contentPage.dataPageSanPhamVn.quytrinh.link3);
      form.setFieldValue('link4', contentPage.dataPageSanPhamVn.quytrinh.link4);
      form.setFieldValue(
        'titleVn',
        contentPage.dataPageSanPhamVn.quytrinh.title,
      );
      form.setFieldValue(
        'titleEn',
        contentPage.dataPageSanPhamEn.quytrinh.title,
      );
      // formValue.setFieldValue('titleVn', contentPage.dataAboutVn.des.title);
      // formValue.setFieldValue('titleEn', contentPage.dataAboutEn.des.title);
    }
  }, [contentPage]);
  const getImg = (imgPreview, imgId) => {
    return imgPreview ? (
      <Image width={'100%'} height={'200px'} src={imgPreview} />
    ) : (
      <ImgFetch w={'100%'} h={'200px'} imgId={imgId} />
    );
  };
  const handleChangeImg1 = async ({ fileList: newFileList }) => {
    setBase64img1(newFileList[0].originFileObj);
    setImgPreview1(await getBase64(newFileList[0].originFileObj));
  };
  const handleChangeImg2 = async ({ fileList: newFileList }) => {
    setBase64img2(newFileList[0].originFileObj);
    setImgPreview2(await getBase64(newFileList[0].originFileObj));
  };
  const handleChangeImg3 = async ({ fileList: newFileList }) => {
    setBase64img3(newFileList[0].originFileObj);
    setImgPreview3(await getBase64(newFileList[0].originFileObj));
  };
  const handleChangeImg4 = async ({ fileList: newFileList }) => {
    setBase64img4(newFileList[0].originFileObj);
    setImgPreview4(await getBase64(newFileList[0].originFileObj));
  };
  // const viewVn =
  const items = [
    {
      key: '1',
      label: 'Tiếng việt    ',
      children: (
        <Form.Item
          label="Tiêu đề"
          name="titleVn"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>
      ),
    },
    {
      key: '2',
      label: 'Tiếng anh',
      children: (
        <Form.Item
          label="Tiêu đề"
          name="titleEn"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>
      ),
    },
  ];
  const uploadButton = (
    <Button type="primary" icon={<PlusOutlined />}>
      Upload
    </Button>
  );
  const handleUpdateContent = async (lg) => {
    const formData1 = new FormData();
    const formData2 = new FormData();
    const formData3 = new FormData();
    const formData4 = new FormData();

    formData1.append('file', base64img1);
    formData2.append('file', base64img2);
    formData3.append('file', base64img3);
    formData4.append('file', base64img4);

    let { titleVn, titleEn, link1, link2, link3, link4 } =
      form.getFieldsValue();

    const payload = {
      titleVn,
      titleEn,
      link1,
      link2,
      link3,
      link4,
      img1: dataVn.img1,
      img2: dataVn.img2,
      img3: dataVn.img3,
      img4: dataVn.img4,
    };
    try {
      if (base64img1) {
        const dataImg = await imgUploadService.postImg(formData1);
        payload.img1 = dataImg.data.idImg;
      }
      if (base64img2) {
        const dataImg = await imgUploadService.postImg(formData2);
        payload.img2 = dataImg.data.idImg;
      }
      if (base64img3) {
        const dataImg = await imgUploadService.postImg(formData3);
        payload.img3 = dataImg.data.idImg;
      }
      if (base64img4) {
        const dataImg = await imgUploadService.postImg(formData4);
        payload.img4 = dataImg.data.idImg;
      }

      const data = await SanPhamService.updateQuyTrinh(payload, lg);
      dispatch(getContentPageThunk());
      message.success(data.data);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <Form form={form} initialValues={initialValue}>
      <Tabs defaultActiveKey="1" items={items} />
      <Row gutter={[20, 20]}>
        <Col span={12}>
          <Form.Item
            label="link1"
            name="link1"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          {getImg(imgPreview1, dataVn?.img1)}
          <Upload
            customRequest={() => {}}
            listType="picture"
            showUploadList={false}
            onChange={handleChangeImg1}
            maxCount={1}
          >
            {uploadButton}
          </Upload>
        </Col>
        <Col span={12}>
          <Form.Item
            label="link2"
            name="link2"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          {getImg(imgPreview2, dataVn?.img2)}
          <Upload
            customRequest={() => {}}
            listType="picture"
            showUploadList={false}
            onChange={handleChangeImg2}
            maxCount={1}
          >
            {uploadButton}
          </Upload>
        </Col>
        <Col span={12}>
          <Form.Item
            label="link3"
            name="link3"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          {getImg(imgPreview3, dataVn?.img3)}
          <Upload
            customRequest={() => {}}
            listType="picture"
            showUploadList={false}
            onChange={handleChangeImg3}
            maxCount={1}
          >
            {uploadButton}
          </Upload>
        </Col>
        <Col span={12}>
          <Form.Item
            label="link4"
            name="link4"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          {getImg(imgPreview4, dataVn?.img4)}
          <Upload
            customRequest={() => {}}
            listType="picture"
            showUploadList={false}
            onChange={handleChangeImg4}
            maxCount={1}
          >
            {uploadButton}
          </Upload>
        </Col>
      </Row>
      <br />
      <br />
      <br />
      <Space>
        <Button
          onClick={() => {
            handleUpdateContent(languageUpdate.vn);
          }}
          type="primary"
        >
          Lưu
        </Button>
        <Button
          onClick={() => {
            handleUpdateContent(languageUpdate.full);
          }}
          type="primary"
        >
          Lưu tiếng anh & tiếng việt
        </Button>
      </Space>
    </Form>
  );
};

export default QuyTrinh;
