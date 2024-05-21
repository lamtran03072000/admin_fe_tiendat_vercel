import { Button, Form, Input, Space, Tabs, message } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { languageUpdate } from '../../../../utils/constants';
import { getContentPageThunk } from '../../../../store/contentPage/contentPageThunk';
import { veChungToiService } from '../../../../service/ve-chung-toi/veChungToiSer';
import { SanPhamService } from '../../../../service/san-pham/SanPhamService';

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
      form.setFieldValue('titleVn', contentPage.dataPageSanPhamVn.banner.title);
      form.setFieldValue('titleEn', contentPage.dataPageSanPhamEn.banner.title);
      form.setFieldValue(
        'titleSubVn',
        contentPage.dataPageSanPhamVn.banner.subTitle,
      );
      form.setFieldValue(
        'titleSubEn',
        contentPage.dataPageSanPhamEn.banner.subTitle,
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
      const dataGet = await SanPhamService.updateBanner(data, lg);
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
