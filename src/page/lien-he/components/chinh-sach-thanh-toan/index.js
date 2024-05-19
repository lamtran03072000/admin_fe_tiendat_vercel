import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Space,
  Tabs,
  message,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import TextEditer from '../../../../components/text-editor';
import { languageUpdate } from '../../../../utils/constants';
import { chinhSachService } from '../../../../service/lien-he/chinhSachSer';
import { useDispatch, useSelector } from 'react-redux';
import { getContentPageThunk } from '../../../../store/contentPage/contentPageThunk';

const initValueForm = {
  titleCsttVn: '',
  titleCsttEn: '',
  titleCsghEn: '',
  titleCsghVn: '',
  titleDvhmVn: '',
  titleDvhmEn: '',
};
const ChinhSachThanhToan = () => {
  const refCsttVn = useRef('');
  const refCsttEn = useRef('');
  const refCsghEn = useRef('');
  const refCsghVn = useRef('');
  const refGvhmVn = useRef('');
  const refGvhmEn = useRef('');

  const [form] = Form.useForm();
  const { contentPage } = useSelector((state) => state.contentPageSlice);

  const [dataVnCs, setDataVnCs] = useState([]);
  const [dataEnCs, setDataEnCs] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (contentPage) {
      console.log('contentPage: ', contentPage);
      const dataVn = contentPage.dataLienHeVn.chinhSachThanhToan;
      setDataVnCs(dataVn);
      const dataEn = contentPage.dataLienHeEn.chinhSachThanhToan;
      setDataEnCs(dataEn);

      form.setFieldValue('titleCsttVn', dataVn[0].title);
      form.setFieldValue('titleCsghVn', dataVn[1].title);
      form.setFieldValue('titleDvhmVn', dataVn[2].title);
      form.setFieldValue('titleCsttEn', dataEn[0].title);
      form.setFieldValue('titleCsghEn', dataEn[1].title);
      form.setFieldValue('titleDvhmEn', dataEn[2].title);
    }
  }, [contentPage]);
  const handleUpdateContent = async (lg) => {
    try {
      let {
        titleCsttVn,
        titleCsttEn,
        titleCsghEn,
        titleCsghVn,
        titleDvhmVn,
        titleDvhmEn,
      } = form.getFieldsValue();

      let data = {
        dataVn: [
          {
            title: titleCsttVn,
            detail: refCsttVn.current.getData(),
          },
          {
            title: titleCsghVn,
            detail: refCsghVn.current.getData(),
          },
          {
            title: titleDvhmVn,
            detail: refGvhmVn.current.getData(),
          },
        ],
        dataEn: [
          {
            title: titleCsttEn,
            detail: refCsttEn.current.getData(),
          },
          {
            title: titleCsghEn,
            detail: refCsghEn.current.getData(),
          },
          {
            title: titleDvhmEn,
            detail: refGvhmEn.current.getData(),
          },
        ],
      };

      const dataGet = await chinhSachService.updateChinhSach(data, lg);
      dispatch(getContentPageThunk());
      message.success(dataGet.data);
    } catch (error) {}
  };

  const renderCardChinhSach = (nameInput, refText, key, dataText) => {
    return (
      <Card>
        <Form.Item
          name={nameInput}
          label="Title"
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
          label="Chi tiết"
          rules={[
            {
              required: true,
              message: 'Không được để trống',
            },
          ]}
        >
          <TextEditer
            data={dataText}
            refTextEditor={refText}
            keySection={key}
          />
        </Form.Item>
      </Card>
    );
  };

  const viewVn = () => {
    return (
      <Row gutter={[20]}>
        <Col span={8}>
          {renderCardChinhSach(
            'titleCsttVn',
            refCsttVn,
            'titleCsttVn',
            dataVnCs[0]?.detail,
          )}
        </Col>
        <Col span={8}>
          {renderCardChinhSach(
            'titleCsghVn',
            refCsghVn,
            'titleCsghVn',
            dataVnCs[1]?.detail,
          )}
        </Col>
        <Col span={8}>
          {renderCardChinhSach(
            'titleDvhmVn',
            refGvhmVn,
            'titleDvhmVn',
            dataVnCs[2]?.detail,
          )}
        </Col>
      </Row>
    );
  };
  const viewEn = () => {
    return (
      <Row gutter={[20]}>
        <Col span={8}>
          {renderCardChinhSach(
            'titleCsttEn',
            refCsttEn,
            'titleCsttEn',
            dataEnCs[0]?.detail,
          )}
        </Col>
        <Col span={8}>
          {renderCardChinhSach(
            'titleCsghEn',
            refCsghEn,
            'titleCsghEn',
            dataEnCs[1]?.detail,
          )}
        </Col>
        <Col span={8}>
          {renderCardChinhSach(
            'titleDvhmEn',
            refGvhmEn,
            'titleDvhmEn',
            dataEnCs[2]?.detail,
          )}
        </Col>
      </Row>
    );
  };

  const items = [
    {
      key: '1',
      label: 'Tiếng việt',
      children: viewVn(),
    },
    {
      key: '2',
      label: 'Tiếng anh',
      children: viewEn(),
      forceRender: true,
    },
  ];
  return (
    <div>
      <Form initialValues={initValueForm} form={form}>
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

export default ChinhSachThanhToan;
