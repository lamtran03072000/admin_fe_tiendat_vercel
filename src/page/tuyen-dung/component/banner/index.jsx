import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Row, Space, Tabs, Typography, message } from 'antd';
import TextEditer from '../../../../components/text-editor';
import { languageUpdate } from '../../../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { getContentPageThunk } from '../../../../store/contentPage/contentPageThunk';

import { bannerService } from '../../../../service/tuyenDung/bannSer';

const { Title } = Typography;

const Banner = () => {
  const refTitleVn = useRef('');
  const refTitleEn = useRef('');
  const refContentEn = useRef('');
  const refContentVn = useRef('');
  const dispatch = useDispatch();

  const { contentPage } = useSelector((state) => state.contentPageSlice);
  const [dataBannerTuyenDungEn, setDataBannerTuyenDungEn] = useState({});
  const [dataBannerTuyenDungVn, setDataBannerTuyenDungVn] = useState({});

  useEffect(() => {
    if (contentPage) {
      setDataBannerTuyenDungEn(contentPage.dataTuyenDungEn.banner);
      setDataBannerTuyenDungVn(contentPage.dataTuyenDungVn.banner);
    }
  }, [contentPage]);

  const updateContent = async (lg) => {
    let titleVn = refTitleVn.current.getData();
    let titleEn = refTitleEn.current.getData();
    let contentEn = refContentEn.current.getData();
    let contentVn = refContentVn.current.getData();

    let newDataBannerTdVn = {
      ...dataBannerTuyenDungVn,
      content: contentVn,
      title: titleVn,
    };
    let newDataBannerTdEn = {
      ...dataBannerTuyenDungEn,
      content: contentEn,
      title: titleEn,
    };
    let content = {
      dataBannerTdVn: newDataBannerTdVn,
      dataBannerTdEn: newDataBannerTdEn,
    };
    try {
      let data = await bannerService.updateContent(lg, { content });
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
          data={dataBannerTuyenDungVn.title}
          keySection={'TitleBannerTdVn'}
        />
        <Title level={5}>Content</Title>
        <TextEditer
          refTextEditor={refContentVn}
          data={dataBannerTuyenDungVn.content}
          keySection={'ContentBannerTdVn'}
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
          data={dataBannerTuyenDungEn.title}
          keySection={'TitleBannerTdEn'}
        />
        <Title level={5}>Content</Title>
        <TextEditer
          refTextEditor={refContentEn}
          data={dataBannerTuyenDungEn.content}
          keySection={'ContentBannerTdEn'}
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
    </div>
  );
};

export default Banner;
