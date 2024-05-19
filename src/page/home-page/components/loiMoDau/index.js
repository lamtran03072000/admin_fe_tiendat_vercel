import {
  Button,
  Col,
  Row,
  Space,
  Tabs,
  Upload,
  Typography,
  message,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextEditer from '../../../../components/text-editor';
import ImgFetch from '../../../../components/imgFetch';
import { PlusOutlined } from '@ant-design/icons';
import { languageUpdate } from '../../../../utils/constants';
import { imgUploadService } from '../../../../service/imgUpload';
import { loiMoDauService } from '../../../../service/homepage/loiMoDauSer';
import { getContentPageThunk } from '../../../../store/contentPage/contentPageThunk';
const { Title } = Typography;

const LoiMoDau = () => {
  const refTitleVn = useRef('');
  const refTitleEn = useRef('');
  const refContentVn = useRef('');
  const refContentEn = useRef('');
  const refButtonEn = useRef('');
  const refButtonVn = useRef('');
  const dispatch = useDispatch();

  const { contentPage } = useSelector((state) => state.contentPageSlice);
  const [dataLoiMoDauEn, setDataLoiMoDauEn] = useState({});
  const [dataLoiMoDauVn, setDataLoiMoDauVn] = useState({});
  const [isFirtUploadImg, setIsFirtUploadImg] = useState(false);
  useEffect(() => {
    if (contentPage) {
      setDataLoiMoDauEn(contentPage.dataPageEn.loiMoDau);
      setDataLoiMoDauVn(contentPage.dataPageVn.loiMoDau);
    }
  }, [contentPage]);
  useEffect(() => {
    if (
      !dataLoiMoDauVn.img == '' &&
      !dataLoiMoDauEn.img == '' &&
      isFirtUploadImg
    ) {
      handleUpDateImg();
    }
  }, [dataLoiMoDauEn.img, dataLoiMoDauVn.img]);

  const handleUpDateImg = async () => {
    let content = {
      dataLoiMoDauVn,
      dataLoiMoDauEn,
    };
    try {
      let data = await loiMoDauService.updateContent(languageUpdate.vn, {
        content,
      });
      message.success(data.data);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const updateContent = async (lg) => {
    let titleVn = refTitleVn.current.getData();
    let titleEn = refTitleEn.current.getData();
    let contentEn = refContentEn.current.getData();
    let contentVn = refContentVn.current.getData();
    let buttonVn = refButtonVn.current.getData();
    let buttonEn = refButtonEn.current.getData();
    let newDataLMDVn = {
      ...dataLoiMoDauVn,
      content: contentVn,
      title: titleVn,
      button: buttonVn,
    };
    let newDataLMDEn = {
      ...dataLoiMoDauEn,
      content: contentEn,
      title: titleEn,
      button: buttonEn,
    };
    let content = {
      dataLoiMoDauVn: newDataLMDVn,
      dataLoiMoDauEn: newDataLMDEn,
    };
    try {
      let data = await loiMoDauService.updateContent(lg, { content });
      dispatch(getContentPageThunk());
      message.success(data.data);
    } catch (error) {
      console.log('error: ', error);
    }
  };
  const viewVn = () => {
    return (
      <>
        <Title level={5}>Title</Title>
        <TextEditer
          refTextEditor={refTitleVn}
          data={dataLoiMoDauVn.title}
          keySection={'TitleLmdVn'}
        />
        <Title level={5}>Content</Title>
        <TextEditer
          refTextEditor={refContentVn}
          data={dataLoiMoDauVn.content}
          keySection={'ContentLmdVn'}
        />
        <Title level={5}>button</Title>
        <TextEditer
          refTextEditor={refButtonVn}
          data={dataLoiMoDauVn.button}
          keySection={'ButtonLmdVn'}
        />
        <Space
          style={{
            marginTop: '15px',
          }}
        >
          <Button
            type="primary"
            onClick={() => {
              updateContent(languageUpdate.vn);
            }}
          >
            Lưu tiếng việt
          </Button>
          <Button
            type="primary"
            onClick={() => {
              updateContent(languageUpdate.full);
            }}
          >
            Lưu tiếng việt & tiếng anh
          </Button>
        </Space>
      </>
    );
  };

  const viewEn = () => {
    return (
      <>
        <Title level={5}>Title</Title>
        <TextEditer
          refTextEditor={refTitleEn}
          data={dataLoiMoDauEn.title}
          keySection={'TitleLmdEn'}
        />
        <Title level={5}>Content</Title>
        <TextEditer
          refTextEditor={refContentEn}
          data={dataLoiMoDauEn.content}
          keySection={'ContentLmdEn'}
        />
        <Title level={5}>button</Title>

        <TextEditer
          refTextEditor={refButtonEn}
          data={dataLoiMoDauEn.button}
          keySection={'ButtonLmdVn'}
        />
        <Space
          style={{
            marginTop: '15px',
          }}
        >
          <Button
            type="primary"
            onClick={() => {
              updateContent(languageUpdate.en);
            }}
          >
            Lưu tiếng anh
          </Button>
        </Space>
      </>
    );
  };
  const items = [
    {
      key: '1',
      label: 'Nội dung tiếng việt',
      children: viewVn(),
      forceRender: true,
    },
    {
      key: '2',
      label: 'Nội dung tiếng anh',
      children: viewEn(),
      forceRender: true,
    },
  ];

  const handleChange = async ({ fileList: newFileList }) => {
    let formData = new FormData();

    formData.append('file', newFileList[0].originFileObj);
    try {
      const dataImgUpdate = await imgUploadService.postImg(
        formData,
        dataLoiMoDauVn.img,
      );
      setDataLoiMoDauVn({ ...dataLoiMoDauVn, img: dataImgUpdate.data.idImg });
      setDataLoiMoDauEn({ ...dataLoiMoDauEn, img: dataImgUpdate.data.idImg });
      setIsFirtUploadImg(true);
    } catch (error) {
      console.log('error: ', error);
    }
  };
  const uploadButton = (
    <Button type="primary" icon={<PlusOutlined />}>
      Upload
    </Button>
  );

  return (
    <div>
      <Row gutter={20} align={'middle'}>
        <Col span={12}>
          <Tabs defaultActiveKey="1" items={items} />
        </Col>
        <Col span={12}>
          <ImgFetch w={'100%'} h={'300px'} imgId={dataLoiMoDauVn.img} />
          <Upload
            customRequest={() => {}}
            listType="picture"
            showUploadList={false}
            onChange={handleChange}
            maxCount={1}
          >
            {uploadButton}
          </Upload>
        </Col>
      </Row>
    </div>
  );
};

export default LoiMoDau;
