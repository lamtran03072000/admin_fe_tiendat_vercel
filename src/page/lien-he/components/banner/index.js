import { Button, Form, Input, Space, Tabs, message } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { languageUpdate } from '../../../../utils/constants';
import { bannerService } from '../../../../service/lien-he/bannerSer';
import { getContentPageThunk } from '../../../../store/contentPage/contentPageThunk';

const initValueForm = {
  titleVn: '',
  titleSubVn: '',
  titleSubEn: '',
  titleEn: '',
};

const Banner = () => {
  const { contentPage } = useSelector((state) => state.contentPageSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (contentPage) {
      console.log('contentPage: ', contentPage);
      form.setFieldValue('titleVn', contentPage.dataLienHeVn.banner.title);
      form.setFieldValue('titleEn', contentPage.dataLienHeEn.banner.title);
      form.setFieldValue(
        'titleSubVn',
        contentPage.dataLienHeVn.banner.subTitle,
      );
      form.setFieldValue(
        'titleSubEn',
        contentPage.dataLienHeEn.banner.subTitle,
      );
    }
  }, [contentPage]);

  const viewVn = () => {
    return (
      <>
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
        <Form.Item
          label="Sub Title"
          name="titleSubVn"
          rules={[
            {
              required: true,
              message: 'Không được trống',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </>
    );
  };
  const viewEn = () => {
    return (
      <>
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
        <Form.Item
          label="Sub Title"
          name="titleSubEn"
          rules={[
            {
              required: true,
              message: 'Không được trống',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </>
    );
  };

  const handleUpdateContent = async (lg) => {
    try {
      let { titleVn, titleSubVn, titleEn, titleSubEn } = form.getFieldsValue();
      const data = {
        dataVn: {
          title: titleVn,
          subTitle: titleSubVn,
        },
        dataEn: {
          title: titleEn,
          subTitle: titleSubEn,
        },
      };
      const dataGet = await bannerService.updateBanner(data, lg);
      dispatch(getContentPageThunk());
      message.success(dataGet.data);
    } catch (error) {}
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

  const [form] = Form.useForm();
  return (
    <div>
      <Form form={form} initialValues={initValueForm}>
        <Tabs defaultActiveKey="1" items={items} />
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
    </div>
  );
};

export default Banner;
