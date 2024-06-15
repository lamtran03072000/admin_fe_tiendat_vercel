import {
  Button,
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
import React, { useEffect, useRef, useState } from 'react';
import TextEditer from '../../../../components/text-editor';
import { languageUpdate } from '../../../../utils/constants';
import { chinhSachService } from '../../../../service/lien-he/chinhSachSer';
import { useDispatch, useSelector } from 'react-redux';
import { getContentPageThunk } from '../../../../store/contentPage/contentPageThunk';
import { veChungToiService } from '../../../../service/ve-chung-toi/veChungToiSer';
import { PlusOutlined } from '@ant-design/icons';
import ImgFetch from '../../../../components/imgFetch';
import { useForm } from 'antd/es/form/Form';
import { imgUploadService } from '../../../../service/imgUpload';
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const initialValue = {
  linkYoutube: '',
  titleVn: '',
  titleEn: '',
};
const Des = () => {
  const [formValue] = useForm();
  const refDesVn = useRef('');
  const refDesEn = useRef('');
  const dispatch = useDispatch();
  const { contentPage } = useSelector((state) => state.contentPageSlice);
  const [base64, setBase64] = useState();
  const [imgPreview, setImgPreview] = useState();
  const [dataVn, setDataVn] = useState();
  const [dataEn, setDataEn] = useState();

  useEffect(() => {
    if (contentPage) {
      setDataVn(contentPage.dataAboutVn.des);
      setDataEn(contentPage.dataAboutEn.des);

      formValue.setFieldValue(
        'linkYoutube',
        contentPage.dataAboutVn.des.linkYoutube,
      );
      formValue.setFieldValue('titleVn', contentPage.dataAboutVn.des.title);
      formValue.setFieldValue('titleEn', contentPage.dataAboutEn.des.title);
    }
  }, [contentPage]);
  const handleUpdateContent = async (lg) => {
    try {
      // let data = {
      //   vn: refDesVn.current.getData(),
      //   en: refDesEn.current.getData(),
      // };

      const formData = new FormData();

      formData.append('file', base64);
      let { linkYoutube, titleEn, titleVn } = formValue.getFieldsValue();

      let data = {
        vn: {
          title: titleVn,
          des: refDesVn.current.getData(),
          img: '',
          linkYoutube: linkYoutube,
        },
        en: {
          title: titleEn,
          des: refDesEn.current.getData(),
          img: '',
          linkYoutube: linkYoutube,
        },
      };
      const dataImg = await imgUploadService.postImg(formData);
      console.log('dataImg: ', dataImg);

      data.vn.img = dataImg.data.idImg;
      data.en.img = dataImg.data.idImg;

      console.log(data);
      const dataGet = await veChungToiService.updateDes(data, lg);
      dispatch(getContentPageThunk());
      message.success(dataGet.data);
    } catch (error) {}
  };

  const viewVn = (
    <>
      <Form.Item
        name="titleVn"
        label="Tiêu đề"
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
        label="Mô tả"
        rules={[
          {
            required: true,
            message: 'Không được để trống',
          },
        ]}
      >
        <TextEditer
          data={dataVn?.des}
          refTextEditor={refDesVn}
          keySection={'refDesVn'}
        />
      </Form.Item>
    </>
  );
  const viewEn = (
    <>
      <Form.Item
        name="titleEn"
        label="Tiêu đề"
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
        label="Mô tả"
        rules={[
          {
            required: true,
            message: 'Không được để trống',
          },
        ]}
      >
        <TextEditer
          data={dataEn?.des}
          refTextEditor={refDesEn}
          keySection={'refDesEn'}
        />
      </Form.Item>
    </>
  );

  const items = [
    {
      key: '1',
      label: 'Tiếng việt',
      children: viewVn,
    },
    {
      key: '2',
      label: 'Tiếng anh',
      children: viewEn,
      forceRender: true,
    },
  ];
  const uploadButton = (
    <Button type="primary" icon={<PlusOutlined />}>
      Upload
    </Button>
  );
  const getImg = (imgPreview, imgId) => {
    return imgPreview ? (
      <Image width={'100%'} height={'200px'} src={imgPreview} />
    ) : (
      <ImgFetch w={'100%'} h={'200px'} imgId={imgId} />
    );
  };
  const handleChangeImg = async ({ fileList: newFileList }) => {
    setBase64(newFileList[0].originFileObj);
    setImgPreview(await getBase64(newFileList[0].originFileObj));
  };
  return (
    <div>
      <Form form={formValue} initialValues={initialValue}>
        <Row gutter={[20, 20]}>
          <Col span={12}>
            <Tabs defaultActiveKey="1" items={items} />;
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
                Lưu tiếng việt & tiếng anh
              </Button>
            </Space>
          </Col>
          <Col span={12}>
            <Form.Item
              name="linkYoutube"
              label="Link video youtube"
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
              label="Hình video"
              rules={[
                {
                  required: true,
                  message: 'Không được để trống',
                },
              ]}
            >
              {getImg(imgPreview, dataVn?.img)}
              <Upload
                customRequest={() => {}}
                listType="picture"
                showUploadList={false}
                onChange={handleChangeImg}
                maxCount={1}
              >
                {uploadButton}
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Des;
