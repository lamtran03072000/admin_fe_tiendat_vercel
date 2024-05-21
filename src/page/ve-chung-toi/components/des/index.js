import { Button, Form, Space, Tabs, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import TextEditer from '../../../../components/text-editor';
import { languageUpdate } from '../../../../utils/constants';
import { chinhSachService } from '../../../../service/lien-he/chinhSachSer';
import { useDispatch, useSelector } from 'react-redux';
import { getContentPageThunk } from '../../../../store/contentPage/contentPageThunk';
import { veChungToiService } from '../../../../service/ve-chung-toi/veChungToiSer';
const Des = () => {
  const refDesVn = useRef('');
  const refDesEn = useRef('');
  const dispatch = useDispatch();
  const { contentPage } = useSelector((state) => state.contentPageSlice);

  const [dataVn, setDataVn] = useState();
  const [dataEn, setDataEn] = useState();

  useEffect(() => {
    if (contentPage) {
      setDataVn(contentPage.dataAboutVn.des);
      setDataEn(contentPage.dataAboutEn.des);
    }
  }, [contentPage]);
  const handleUpdateContent = async (lg) => {
    try {
      let data = {
        vn: refDesVn.current.getData(),
        en: refDesEn.current.getData(),
      };

      const dataGet = await veChungToiService.updateDes(data, lg);
      dispatch(getContentPageThunk());
      message.success(dataGet.data);
    } catch (error) {}
  };

  const viewVn = (
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
        data={dataVn}
        refTextEditor={refDesVn}
        keySection={'refDesVn'}
      />
    </Form.Item>
  );
  const viewEn = (
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
        data={dataEn}
        refTextEditor={refDesEn}
        keySection={'refDesEn'}
      />
    </Form.Item>
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

  return (
    <div>
      <Form>
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
      </Form>
    </div>
  );
};

export default Des;
