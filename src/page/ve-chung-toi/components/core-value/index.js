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
import { linhVucUngDungService } from '../../../../service/homepage/linhVucUngDungSer';
import { getContentPageThunk } from '../../../../store/contentPage/contentPageThunk';

import { veChungToiService } from '../../../../service/ve-chung-toi/veChungToiSer';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const initValueForm = {
  titleMainVn: '',
  titleMainEn: '',
  titleVn1: '',
  titleVn2: '',
  titleVn3: '',
  titleVn4: '',
  titleEn1: '',
  titleEn2: '',
  titleEn3: '',
  titleEn4: '',
  desVn1: '',
  desVn2: '',
  desVn3: '',
  desVn4: '',
  desEn1: '',
  desEn2: '',
  desEn3: '',
  desEn4: '',
};

const GiaTriCotLoi = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { contentPage } = useSelector((state) => state.contentPageSlice);

  const [dataVnCoreValue, setDataVnCoreValue] = useState();
  const [dataEnCoreValue, setDataEnCoreValue] = useState();
  const [base64Extra1, setBase64Extra1] = useState();
  const [base64Extra2, setBase64Extra2] = useState();
  const [base64Extra3, setBase64Extra3] = useState();
  const [base64Extra4, setBase64Extra4] = useState();

  const [imgPreviewExtra1, setImgPreviewExtra1] = useState();
  const [imgPreviewExtra2, setImgPreviewExtra2] = useState();
  const [imgPreviewExtra3, setImgPreviewExtra3] = useState();
  const [imgPreviewExtra4, setImgPreviewExtra4] = useState();

  useEffect(() => {
    if (contentPage) {
      //   setDataVnLVUD(contentPage.dataPageVn.linhVucUngDung);
      //   setDataEnLVUD(contentPage.dataPageEn.linhVucUngDung);

      let dataEn = contentPage.dataAboutEn.coreValues;
      let dataVn = contentPage.dataAboutVn.coreValues;

      setDataEnCoreValue(dataEn);
      setDataVnCoreValue(dataVn);
      form.setFieldValue('titleMainVn', dataVn.title);
      form.setFieldValue('titleMainEn', dataEn.title);

      form.setFieldValue('titleVn1', dataVn.listData[0].title);
      form.setFieldValue('titleVn2', dataVn.listData[1].title);
      form.setFieldValue('titleVn3', dataVn.listData[2].title);
      form.setFieldValue('titleVn4', dataVn.listData[3].title);
      form.setFieldValue('desVn1', dataVn.listData[0].des);
      form.setFieldValue('desVn2', dataVn.listData[1].des);
      form.setFieldValue('desVn3', dataVn.listData[2].des);
      form.setFieldValue('desVn4', dataVn.listData[3].des);
      form.setFieldValue('titleEn1', dataEn.listData[0].title);
      form.setFieldValue('titleEn2', dataEn.listData[1].title);
      form.setFieldValue('titleEn3', dataEn.listData[2].title);
      form.setFieldValue('titleEn4', dataEn.listData[3].title);
      form.setFieldValue('desEn1', dataEn.listData[0].des);
      form.setFieldValue('desEn2', dataEn.listData[1].des);
      form.setFieldValue('desEn3', dataEn.listData[2].des);
      form.setFieldValue('desEn4', dataEn.listData[3].des);
    }
  }, [contentPage]);

  const uploadButton = (
    <Button type="primary" icon={<PlusOutlined />}>
      Upload
    </Button>
  );

  const getTypeContent = (title, des, img) => {
    return {
      title: title,
      des: des,
      img: img,
    };
  };

  const handleUpdateContent = async (lg) => {
    let formDataExtra1 = new FormData();
    let formDataExtra2 = new FormData();
    let formDataExtra3 = new FormData();
    let formDataExtra4 = new FormData();

    formDataExtra1.append('file', base64Extra1);
    formDataExtra2.append('file', base64Extra2);
    formDataExtra3.append('file', base64Extra3);
    formDataExtra4.append('file', base64Extra4);

    let {
      titleMainVn,
      titleMainEn,
      titleVn1,
      titleVn2,
      titleVn3,
      titleVn4,
      titleEn1,
      titleEn2,
      titleEn3,
      titleEn4,
      desVn1,
      desVn2,
      desVn3,
      desVn4,
      desEn1,
      desEn2,
      desEn3,
      desEn4,
    } = form.getFieldsValue();

    let dataUpdateCoreValues = {
      titleVn: titleMainVn,
      titleEn: titleMainEn,
      dataListVn: [
        getTypeContent(titleVn1, desVn1, dataVnCoreValue?.listData[0].img),
        getTypeContent(titleVn2, desVn2, dataVnCoreValue?.listData[1].img),
        getTypeContent(titleVn3, desVn3, dataVnCoreValue?.listData[2].img),
        getTypeContent(titleVn4, desVn4, dataVnCoreValue?.listData[3].img),
      ],
      dataListEn: [
        getTypeContent(titleEn1, desEn1, dataEnCoreValue?.listData[0].img),
        getTypeContent(titleEn2, desEn2, dataEnCoreValue?.listData[1].img),
        getTypeContent(titleEn3, desEn3, dataEnCoreValue?.listData[2].img),
        getTypeContent(titleEn4, desEn4, dataEnCoreValue?.listData[3].img),
      ],
    };
    try {
      if (base64Extra1) {
        const dataImg1 = await imgUploadService.postImg(
          formDataExtra1,
          dataVnCoreValue?.listData[0].img,
        );
        let newDatalistVn = [...dataUpdateCoreValues.dataListVn];
        let newDatalistEn = [...dataUpdateCoreValues.dataListEn];
        newDatalistVn[0].img = dataImg1.data.idImg;
        newDatalistEn[0].img = dataImg1.data.idImg;
        dataUpdateCoreValues = {
          ...dataUpdateCoreValues,
          dataListVn: newDatalistVn,
          dataListEn: newDatalistEn,
        };
      }
      if (base64Extra2) {
        const dataImg2 = await imgUploadService.postImg(
          formDataExtra2,
          dataVnCoreValue?.listData[1].img,
        );
        let newDatalistVn = [...dataUpdateCoreValues.dataListVn];
        let newDatalistEn = [...dataUpdateCoreValues.dataListEn];

        newDatalistVn[1].img = dataImg2.data.idImg;
        newDatalistEn[1].img = dataImg2.data.idImg;
        dataUpdateCoreValues = {
          ...dataUpdateCoreValues,
          dataListVn: newDatalistVn,
          dataListEn: newDatalistEn,
        };
      }
      if (base64Extra3) {
        const dataImg3 = await imgUploadService.postImg(
          formDataExtra3,
          dataVnCoreValue?.listData[2].img,
        );
        let newDatalistVn = [...dataUpdateCoreValues.dataListVn];
        let newDatalistEn = [...dataUpdateCoreValues.dataListEn];

        newDatalistVn[2].img = dataImg3.data.idImg;
        newDatalistEn[2].img = dataImg3.data.idImg;
        dataUpdateCoreValues = {
          ...dataUpdateCoreValues,
          dataListVn: newDatalistVn,
          dataListEn: newDatalistEn,
        };
      }
      if (base64Extra4) {
        const dataImg4 = await imgUploadService.postImg(
          formDataExtra4,
          dataVnCoreValue?.listData[3].img,
        );
        let newDatalistVn = [...dataUpdateCoreValues.dataListVn];
        let newDatalistEn = [...dataUpdateCoreValues.dataListEn];
        newDatalistVn[3].img = dataImg4.data.idImg;
        newDatalistEn[3].img = dataImg4.data.idImg;
        dataUpdateCoreValues = {
          ...dataUpdateCoreValues,
          dataListVn: newDatalistVn,
          dataListEn: newDatalistEn,
        };
      }

      const data = await veChungToiService.updateCoreValue(
        dataUpdateCoreValues,
        lg,
      );

      dispatch(getContentPageThunk());
      message.success(data.data);
      setBase64Extra1('');
      setBase64Extra2('');
      setBase64Extra3('');
      setBase64Extra4('');

      setImgPreviewExtra1('');
      setImgPreviewExtra2('');
      setImgPreviewExtra3('');
      setImgPreviewExtra4('');
    } catch (error) {}
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
  const handleChangeImg4 = async ({ fileList: newFileList }) => {
    setBase64Extra4(newFileList[0].originFileObj);
    setImgPreviewExtra4(await getBase64(newFileList[0].originFileObj));
  };

  const getImg = (imgPreview, imgId) => {
    return imgPreview ? (
      <Image width={'100%'} height={'200px'} src={imgPreview} />
    ) : (
      <ImgFetch w={'100%'} h={'200px'} imgId={imgId} />
    );
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
          <Col span={6}>
            <Card
              size="small"
              cover={
                <>
                  {getImg(imgPreviewExtra1, dataVnCoreValue?.listData[0].img)}
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
              <Form.Item
                name="desVn1"
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
          <Col span={6}>
            <Card
              size="small"
              cover={
                <>
                  {getImg(imgPreviewExtra2, dataVnCoreValue?.listData[1].img)}
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
              <Form.Item
                name="desVn2"
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
          <Col span={6}>
            <Card
              size="small"
              cover={
                <>
                  {getImg(imgPreviewExtra3, dataVnCoreValue?.listData[2].img)}
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
              <Form.Item
                name="desVn3"
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
          <Col span={6}>
            <Card
              size="small"
              cover={
                <>
                  {getImg(imgPreviewExtra4, dataVnCoreValue?.listData[3].img)}
                  <Upload
                    customRequest={() => {}}
                    listType="picture"
                    showUploadList={false}
                    onChange={handleChangeImg4}
                    maxCount={1}
                  >
                    {uploadButton}
                  </Upload>
                </>
              }
            >
              <Form.Item
                name="titleVn4"
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
                name="desVn4"
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
          <Col span={6}>
            <Card
              size="small"
              cover={
                <>
                  {getImg(imgPreviewExtra1, dataVnCoreValue?.listData[0].img)}
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
              <Form.Item
                name="desEn1"
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
          <Col span={6}>
            <Card
              size="small"
              cover={
                <>
                  {getImg(imgPreviewExtra2, dataVnCoreValue?.listData[1].img)}
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
              <Form.Item
                name="desEn2"
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
          <Col span={6}>
            <Card
              size="small"
              cover={
                <>
                  {getImg(imgPreviewExtra3, dataVnCoreValue?.listData[2].img)}
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
              <Form.Item
                name="desEn3"
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
          <Col span={6}>
            <Card
              size="small"
              cover={
                <>
                  {getImg(imgPreviewExtra4, dataVnCoreValue?.listData[3].img)}
                  <Upload
                    customRequest={() => {}}
                    listType="picture"
                    showUploadList={false}
                    onChange={handleChangeImg4}
                    maxCount={1}
                  >
                    {uploadButton}
                  </Upload>
                </>
              }
            >
              <Form.Item
                name="titleEn4"
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
                name="desEn4"
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
    <div>
      <Form form={form} initialValues={initValueForm}>
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
    </div>
  );
};

export default GiaTriCotLoi;
