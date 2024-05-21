import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  Row,
  Space,
  Tabs,
  Upload,
  message,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import ImgFetch from '../../../../components/imgFetch';
import { languageUpdate } from '../../../../utils/constants';
import { imgUploadService } from '../../../../service/imgUpload';

import { getContentPageThunk } from '../../../../store/contentPage/contentPageThunk';
import { giaTriService } from '../../../../service/tuyenDung/giaTriSer';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const initValueForm = {
  titleVn1: '',
  titleVn2: '',
  titleVn3: '',

  titleEn1: '',
  titleEn2: '',
  titleEn3: '',

  titleMainVn: '',
  titleMainEn: '',
  idYoutube: '',
};
const GiaTri = () => {
  const { contentPage } = useSelector((state) => state.contentPageSlice);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [dataVnLVUD, setDataVnLVUD] = useState();
  const [dataEnLVUD, setDataEnLVUD] = useState();
  const [base64Extra1, setBase64Extra1] = useState();
  const [base64Extra2, setBase64Extra2] = useState();
  const [base64Extra3, setBase64Extra3] = useState();

  const [imgPreviewExtra1, setImgPreviewExtra1] = useState();
  const [imgPreviewExtra2, setImgPreviewExtra2] = useState();
  const [imgPreviewExtra3, setImgPreviewExtra3] = useState();

  useEffect(() => {
    if (contentPage) {
      setDataVnLVUD(contentPage.dataTuyenDungVn.giaTri);
      setDataEnLVUD(contentPage.dataTuyenDungEn.giaTri);

      let dataEn = contentPage.dataTuyenDungEn.giaTri;
      let dataVn = contentPage.dataTuyenDungVn.giaTri;

      form.setFieldValue('titleMainVn', dataVn.title);
      form.setFieldValue('titleMainEn', dataEn.title);
      form.setFieldValue('idYoutube', dataVn.idYoutube);
      form.setFieldValue('titleVn1', dataVn.listData[0].title);
      form.setFieldValue('titleVn2', dataVn.listData[1].title);
      form.setFieldValue('titleVn3', dataVn.listData[2].title);

      form.setFieldValue('titleEn1', dataEn.listData[0].title);
      form.setFieldValue('titleEn2', dataEn.listData[1].title);
      form.setFieldValue('titleEn3', dataEn.listData[2].title);
    }
  }, [contentPage]);

  const uploadButton = (
    <Button type="primary" icon={<PlusOutlined />}>
      Upload
    </Button>
  );

  const getTypeContent = (title, img) => {
    return {
      title: title,
      img: img,
    };
  };

  const handleUpdateContent = async (lg) => {
    let formDataExtra1 = new FormData();
    let formDataExtra2 = new FormData();
    let formDataExtra3 = new FormData();

    formDataExtra1.append('file', base64Extra1);
    formDataExtra2.append('file', base64Extra2);
    formDataExtra3.append('file', base64Extra3);

    let listDataForm = form.getFieldsValue();
    let {
      titleVn1,
      titleVn2,
      titleVn3,

      titleEn1,
      titleEn2,
      titleEn3,
      idYoutube,
      titleMainVn,
      titleMainEn,
    } = listDataForm;

    let dataUpdateLvud = {
      idYoutube,
      titleVn: titleMainVn,
      titleEn: titleMainEn,
      dataListVn: [
        getTypeContent(titleVn1, dataVnLVUD?.listData[0].img),
        getTypeContent(titleVn2, dataVnLVUD?.listData[1].img),
        getTypeContent(titleVn3, dataVnLVUD?.listData[2].img),
      ],
      dataListEn: [
        getTypeContent(titleEn1, dataVnLVUD?.listData[0].img),
        getTypeContent(titleEn2, dataVnLVUD?.listData[1].img),
        getTypeContent(titleEn3, dataVnLVUD?.listData[2].img),
      ],
    };

    try {
      if (base64Extra1) {
        const dataImg1 = await imgUploadService.postImg(
          formDataExtra1,
          dataVnLVUD?.listData[0].img,
        );
        let newDatalistVn = [...dataUpdateLvud.dataListVn];
        let newDatalistEn = [...dataUpdateLvud.dataListEn];
        newDatalistVn[0].img = dataImg1.data.idImg;
        newDatalistEn[0].img = dataImg1.data.idImg;
        dataUpdateLvud = {
          ...dataUpdateLvud,
          dataListVn: newDatalistVn,
          dataListEn: newDatalistEn,
        };
      }
      if (base64Extra2) {
        const dataImg2 = await imgUploadService.postImg(
          formDataExtra2,
          dataVnLVUD?.listData[1].img,
        );
        let newDatalistVn = [...dataUpdateLvud.dataListVn];
        let newDatalistEn = [...dataUpdateLvud.dataListEn];

        newDatalistVn[1].img = dataImg2.data.idImg;
        newDatalistEn[1].img = dataImg2.data.idImg;
        dataUpdateLvud = {
          ...dataUpdateLvud,
          dataListVn: newDatalistVn,
          dataListEn: newDatalistEn,
        };
      }
      if (base64Extra3) {
        const dataImg3 = await imgUploadService.postImg(
          formDataExtra3,
          dataVnLVUD?.listData[2].img,
        );
        let newDatalistVn = [...dataUpdateLvud.dataListVn];
        let newDatalistEn = [...dataUpdateLvud.dataListEn];

        newDatalistVn[2].img = dataImg3.data.idImg;
        newDatalistEn[2].img = dataImg3.data.idImg;
        dataUpdateLvud = {
          ...dataUpdateLvud,
          dataListVn: newDatalistVn,
          dataListEn: newDatalistEn,
        };
      }

      const data = await giaTriService.updateContent(lg, dataUpdateLvud);

      dispatch(getContentPageThunk());
      message.success(data.data);
      setBase64Extra1('');
      setBase64Extra2('');
      setBase64Extra3('');

      setImgPreviewExtra1('');
      setImgPreviewExtra2('');
      setImgPreviewExtra3('');
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const getImg = (imgPreview, imgId) => {
    return imgPreview ? (
      <Image width={'100%'} height={'300px'} src={imgPreview} />
    ) : (
      <ImgFetch w={'100%'} h={'300px'} imgId={imgId} />
    );
  };
  const handleChangeImg1 = async ({ fileList: newFileList }) => {
    setBase64Extra1(newFileList[0].originFileObj);
    setImgPreviewExtra1(await getBase64(newFileList[0].originFileObj));
  };
  const handleChangeImg2 = async ({ fileList: newFileList }) => {
    setBase64Extra2(newFileList[0].originFileObj);
    setImgPreviewExtra2(await getBase64(newFileList[0].originFileObj));
  };
  const handleChangeImg3 = async ({ fileList: newFileList }) => {
    setBase64Extra3(newFileList[0].originFileObj);
    setImgPreviewExtra3(await getBase64(newFileList[0].originFileObj));
  };

  const viewVn = () => {
    return (
      <>
        <Form.Item
          label="Title"
          name="titleMainVn"
          rules={[
            {
              required: true,
              message: 'Không được trống',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Row gutter={[40, 40]}>
          <Col span={8}>
            <Card
              size="small"
              cover={
                <>
                  {getImg(imgPreviewExtra1, dataVnLVUD?.listData[0].img)}
                  <Upload
                    customRequest={() => {}}
                    listType="picture"
                    showUploadList={false}
                    onChange={handleChangeImg1}
                    maxCount={1}
                  >
                    {uploadButton}
                  </Upload>
                </>
              }
            >
              <Form.Item
                name="titleVn1"
                rules={[
                  {
                    required: true,
                    message: 'Không được trống',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              size="small"
              cover={
                <>
                  {getImg(imgPreviewExtra2, dataVnLVUD?.listData[1].img)}
                  <Upload
                    customRequest={() => {}}
                    listType="picture"
                    showUploadList={false}
                    onChange={handleChangeImg2}
                    maxCount={1}
                  >
                    {uploadButton}
                  </Upload>
                </>
              }
            >
              <Form.Item
                name="titleVn2"
                rules={[
                  {
                    required: true,
                    message: 'Không được trống',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              size="small"
              cover={
                <>
                  {getImg(imgPreviewExtra3, dataEnLVUD?.listData[2].img)}
                  <Upload
                    customRequest={() => {}}
                    listType="picture"
                    showUploadList={false}
                    onChange={handleChangeImg3}
                    maxCount={1}
                  >
                    {uploadButton}
                  </Upload>
                </>
              }
            >
              <Form.Item
                name="titleVn3"
                rules={[
                  {
                    required: true,
                    message: 'Không được trống',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </>
    );
  };

  const viewEn = () => {
    return (
      <>
        <Form.Item
          label="Title"
          name="titleMainEn"
          rules={[
            {
              required: true,
              message: 'Không được trống',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Row gutter={[40, 40]}>
          <Col span={8}>
            <Card
              size="small"
              cover={
                <>
                  {getImg(imgPreviewExtra1, dataVnLVUD?.listData[0].img)}
                  <Upload
                    customRequest={() => {}}
                    listType="picture"
                    showUploadList={false}
                    onChange={handleChangeImg1}
                    maxCount={1}
                  >
                    {uploadButton}
                  </Upload>
                </>
              }
            >
              <Form.Item
                name="titleEn1"
                rules={[
                  {
                    required: true,
                    message: 'Không được trống',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              size="small"
              cover={
                <>
                  {getImg(imgPreviewExtra2, dataVnLVUD?.listData[1].img)}
                  <Upload
                    customRequest={() => {}}
                    listType="picture"
                    showUploadList={false}
                    onChange={handleChangeImg2}
                    maxCount={1}
                  >
                    {uploadButton}
                  </Upload>
                </>
              }
            >
              <Form.Item
                name="titleEn2"
                rules={[
                  {
                    required: true,
                    message: 'Không được trống',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              size="small"
              cover={
                <>
                  {getImg(imgPreviewExtra3, dataVnLVUD?.listData[2].img)}
                  <Upload
                    customRequest={() => {}}
                    listType="picture"
                    showUploadList={false}
                    onChange={handleChangeImg3}
                    maxCount={1}
                  >
                    {uploadButton}
                  </Upload>
                </>
              }
            >
              <Form.Item
                name="titleEn3"
                rules={[
                  {
                    required: true,
                    message: 'Không được trống',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </>
    );
  };

  const items = [
    {
      key: '1',
      label: 'Nội dung tiếng việt',
      children: viewVn(),
    },
    {
      key: '2',
      label: 'Nội dung tiếng anh',
      children: viewEn(),
      forceRender: true,
    },
  ];

  return (
    <Form form={form} initialValues={initValueForm}>
      <br />
      <Form.Item
        label="Id youtube"
        name="idYoutube"
        rules={[
          {
            required: true,
            message: 'Không được trống',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Tabs defaultActiveKey="1" items={items} />
      <Space
        style={{
          marginTop: '20px',
        }}
      >
        <Button
          onClick={() => {
            handleUpdateContent(languageUpdate.vn);
          }}
          type="primary"
        >
          Lưu nội dung
        </Button>
        <Button
          onClick={() => {
            handleUpdateContent(languageUpdate.full);
          }}
          type="primary"
        >
          Lưu nội dung tiếng anh & tiếng việt
        </Button>
      </Space>
    </Form>
  );
};

export default GiaTri;
