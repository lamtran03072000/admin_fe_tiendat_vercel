import React, { useEffect, useRef, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import TextEditer from '../../../../components/text-editor';
import {
  Button,
  Col,
  Row,
  Space,
  Tabs,
  Typography,
  message,
  Upload,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import { languageUpdate } from '../../../../utils/constants';
import { bannerService } from '../../../../service/homepage/bannerSer';
import { getContentPageThunk } from '../../../../store/contentPage/contentPageThunk';
import { imgUploadService } from '../../../../service/imgUpload';
import ImgFetch from '../../../../components/imgFetch';

const { Title } = Typography;

const Banner = () => {
  const refBannerTextVn = useRef('');
  const refBannerTextEn = useRef('');
  const dispatch = useDispatch();

  const { contentPage } = useSelector((state) => state.contentPageSlice);
  const [dataBannerEn, setDataBannerEn] = useState({});
  const [dataBannerVn, setDataBannerVn] = useState({});
  const [isFirtUploadVideo, setIsFirtUploadVideo] = useState(false);
  useEffect(() => {
    if (contentPage) {
      setDataBannerEn(contentPage.dataPageEn.banner);
      console.log(
        'contentPage.dataPageEn.banner: ',
        contentPage.dataPageEn.banner,
      );

      setDataBannerVn(contentPage.dataPageVn.banner);
    }
  }, [contentPage]);

  useEffect(() => {
    if (
      !dataBannerVn.video == '' &&
      !dataBannerEn.video == '' &&
      isFirtUploadVideo
    ) {
      handleUpDateVideo();
    }
  }, [dataBannerVn.video, dataBannerEn.video]);

  const props = {
    name: 'file',
    accept: 'video/*',
    showUploadList: false,
    customRequest: async ({ file, onSuccess, onError }) => {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const data = await imgUploadService.postVideo(
          formData,
          contentPage?.dataPageEn.banner.video,
        );
        setDataBannerVn({ ...dataBannerVn, video: data.data.url });
        setDataBannerEn({ ...dataBannerEn, video: data.data.url });
        setIsFirtUploadVideo(true);
        onSuccess(data.data);
        message.success('Video uploaded successfully');
      } catch (error) {
        onError(error);
        message.error('Failed to upload video');
      }
    },
  };
  const viewVideo = (
    <div>
      <video
        src={contentPage?.dataPageEn.banner.video}
        controls
        width="640"
        height="360"
      >
        Your browser does not support the video tag.
      </video>

      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </div>
  );

  const handleUpDateVideo = async () => {
    let content = {
      dataBannerVn,
      dataBannerEn,
    };
    try {
      let data = await bannerService.updateContent2(languageUpdate.vn, {
        content,
      });
      message.success(data.data);
      dispatch(getContentPageThunk());
    } catch (error) {
      console.log('error: ', error);
    }
  };
  // text editor
  const save = async (lg) => {
    let contentBannerVn = refBannerTextVn.current.getData();
    let contentBannerEn = refBannerTextEn.current.getData();

    let newDataBannerVn = {
      ...dataBannerVn,
      content: contentBannerVn,
    };
    let newDataBannerEn = {
      ...dataBannerEn,
      content: contentBannerEn,
    };
    let content = {
      dataBannerVn: newDataBannerVn,
      dataBannerEn: newDataBannerEn,
    };
    try {
      let data = await bannerService.updateContent2(lg, { content });
      dispatch(getContentPageThunk());
      message.success(data.data);
    } catch (error) {}
  };

  const viewVn = () => {
    return (
      <>
        <TextEditer
          refTextEditor={refBannerTextVn}
          data={dataBannerVn.content}
          keySection={'content-banner-vn'}
        />
        <Space
          style={{
            marginTop: '15px',
          }}
        >
          <Button
            type="primary"
            onClick={() => {
              save(languageUpdate.vn);
            }}
          >
            Lưu tiếng việt
          </Button>
          <Button
            type="primary"
            onClick={() => {
              save(languageUpdate.full);
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
        <TextEditer
          refTextEditor={refBannerTextEn}
          data={dataBannerEn.content}
          keySection={'content-banner-en'}
        />
        <Space
          style={{
            marginTop: '15px',
          }}
        >
          <Button
            type="primary"
            onClick={() => {
              save(languageUpdate.en);
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
      <Row gutter={20}>
        <Col span={16}>
          <>
            <Title level={4}>Hình trên web</Title>

            {/* <ImgFetch w={'100%'} h={'300px'} imgId={dataBannerVn.img} />
            <br />
            <br />
            <Upload
              customRequest={() => {}}
              listType="picture"
              showUploadList={false}
              onChange={handleChange}
              maxCount={1}
            >
              {uploadButton}
            </Upload> */}

            {viewVideo}
          </>
        </Col>
        <Col span={8}>
          <Tabs defaultActiveKey="1" items={items} />
        </Col>
      </Row>
    </div>
  );
};

export default Banner;
