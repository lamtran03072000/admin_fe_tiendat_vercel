import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContentPageThunk } from '../../../../store/contentPage/contentPageThunk';
import { Button, Col, Row, Space, Tabs, Typography, message } from 'antd';
import TextEditer from '../../../../components/text-editor';
import { languageUpdate } from '../../../../utils/constants';
import { TSLVService } from '../../../../service/tuyenDung/taiSaoLamViecSer';

const { Title } = Typography;

const TaiSaoLamViec = () => {
  const refTitleVn = useRef('');
  const refTitleEn = useRef('');
  const refContentEn = useRef('');
  const refContentVn = useRef('');
  const dispatch = useDispatch();

  const { contentPage } = useSelector((state) => state.contentPageSlice);
  const [dataTSLVTuyenDungEn, setDataTSLVTuyenDungEn] = useState({});
  const [dataTSLVTuyenDungVn, setDataTSLVTuyenDungVn] = useState({});

  useEffect(() => {
    if (contentPage) {
      setDataTSLVTuyenDungEn(contentPage.dataTuyenDungEn.taiSaoLamViec);
      setDataTSLVTuyenDungVn(contentPage.dataTuyenDungVn.taiSaoLamViec);
    }
  }, [contentPage]);

  const updateContent = async (lg) => {
    let titleVn = refTitleVn.current.getData();
    let titleEn = refTitleEn.current.getData();
    let contentEn = refContentEn.current.getData();
    let contentVn = refContentVn.current.getData();

    let newDataTSLVTdVn = {
      ...dataTSLVTuyenDungVn,
      content: contentVn,
      title: titleVn,
    };
    let newDataTSLVTdEn = {
      ...dataTSLVTuyenDungEn,
      content: contentEn,
      title: titleEn,
    };
    let content = {
      dataTSLVTdVn: newDataTSLVTdVn,
      dataTSLVTdEn: newDataTSLVTdEn,
    };
    try {
      let data = await TSLVService.updateContent(lg, { content });
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
          data={dataTSLVTuyenDungVn.title}
          keySection={'TitleTSLVTdVn'}
        />
        <Title level={5}>Content</Title>
        <TextEditer
          refTextEditor={refContentVn}
          data={dataTSLVTuyenDungVn.content}
          keySection={'ContentTSLVTdVn'}
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
          data={dataTSLVTuyenDungEn.title}
          keySection={'TitleTSLVTdEn'}
        />
        <Title level={5}>Content</Title>
        <TextEditer
          refTextEditor={refContentEn}
          data={dataTSLVTuyenDungEn.content}
          keySection={'ContentTSLVTdEn'}
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
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} />
      <Row>
        <Col span={12}></Col>
        <Col span={12}></Col>
      </Row>
    </div>
  );
};

export default TaiSaoLamViec;
