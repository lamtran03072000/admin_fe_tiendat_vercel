import { Button, Col, Form, Input, Row, Space, Tabs, message } from 'antd';
import React, { useEffect } from 'react';
import { languageUpdate } from '../../../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { numberService } from '../../../../service/homepage/numberSer';
import { getContentPageThunk } from '../../../../store/contentPage/contentPageThunk';

const getTypeNumber = (number, content) => {
  return {
    number: number * 1,
    content: content,
  };
};
const initialValue = {
  numberVn1: 'jejeje',
  numberVn2: 'jejeje',
  numberVn3: 'jejeje',
  numberVn4: 'jejeje',
  numberVn5: 'jejeje',
  numberEn1: 'jejeje',
  numberEn2: 'jejeje',
  numberEn3: 'jejeje',
  numberEn4: 'jejeje',
  numberEn5: 'jejeje',
  contentVn1: 'jejeje',
  contentVn2: 'jejeje',
  contentVn3: 'jejejádase',
  contentVn4: 'jejeje',
  contentVn5: 'jejeje',
  contentEn1: 'jejeje',
  contentEn2: 'jejeje',
  contentEn3: 'jejeje',
  contentEn4: 'jejeje',
  contentEn5: 'jejeje',
};

const Number = () => {
  const [form] = Form.useForm();
  const { contentPage } = useSelector((state) => state.contentPageSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    if (contentPage) {
      const dataEn = contentPage.dataPageEn.number;
      const dataVn = contentPage.dataPageVn.number;

      let [dataVn1, dataVn2, dataVn3, dataVn4, dataVn5] = dataVn;
      let [dataEn1, dataEn2, dataEn3, dataEn4, dataEn5] = dataEn;

      form.setFieldValue('numberVn1', dataVn1.number);
      form.setFieldValue('numberVn2', dataVn2.number);
      form.setFieldValue('numberVn3', dataVn3.number);
      form.setFieldValue('numberVn4', dataVn4.number);
      form.setFieldValue('numberVn5', dataVn5.number);
      form.setFieldValue('contentVn1', dataVn1.content);
      form.setFieldValue('contentVn2', dataVn2.content);
      form.setFieldValue('contentVn3', dataVn3.content);
      form.setFieldValue('contentVn4', dataVn4.content);
      form.setFieldValue('contentVn5', dataVn5.content);

      form.setFieldValue('numberEn1', dataEn1.number);
      form.setFieldValue('numberEn2', dataEn2.number);
      form.setFieldValue('numberEn3', dataEn3.number);
      form.setFieldValue('numberEn4', dataEn4.number);
      form.setFieldValue('numberEn5', dataEn5.number);

      form.setFieldValue('contentEn1', dataEn1.content);
      form.setFieldValue('contentEn2', dataEn2.content);
      form.setFieldValue('contentEn3', dataEn3.content);
      form.setFieldValue('contentEn4', dataEn4.content);
      form.setFieldValue('contentEn5', dataEn5.content);
    }
  }, [contentPage]);

  const handleUpdateContent = async (lg) => {
    let listDataForm = form.getFieldsValue();
    let {
      numberVn1,
      numberVn2,
      numberVn3,
      numberVn4,
      numberVn5,
      numberEn1,
      numberEn2,
      numberEn3,
      numberEn4,
      numberEn5,
      contentVn1,
      contentVn2,
      contentVn3,
      contentVn4,
      contentVn5,
      contentEn1,
      contentEn2,
      contentEn3,
      contentEn4,
      contentEn5,
    } = listDataForm;
    try {
      let dataUpdateNumber = {
        numberVn: [
          getTypeNumber(numberVn1, contentVn1),
          getTypeNumber(numberVn2, contentVn2),
          getTypeNumber(numberVn3, contentVn3),
          getTypeNumber(numberVn4, contentVn4),
          getTypeNumber(numberVn5, contentVn5),
        ],
        numberEn: [
          getTypeNumber(numberEn1, contentEn1),
          getTypeNumber(numberEn2, contentEn2),
          getTypeNumber(numberEn3, contentEn3),
          getTypeNumber(numberEn4, contentEn4),
          getTypeNumber(numberEn5, contentEn5),
        ],
      };
      let data = await numberService.updateContent(lg, dataUpdateNumber);
      dispatch(getContentPageThunk());
      message.success(data.data);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const viewVn = () => {
    return (
      <>
        <Row gutter={[50, 20]}>
          <Col span={8}>
            <Form.Item
              label="Number"
              name="numberVn1"
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
              label="Content"
              name="contentVn1"
              rules={[
                {
                  required: true,
                  message: 'Không được trống',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Space
              size={'large'}
              style={{
                border: '1px solid black',
                marginBottom: '10px',
                padding: '10px',
              }}
              align="center"
            >
              <Form.Item
                label="Number"
                name="numberVn2"
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
                label="Content"
                name="contentVn2"
                rules={[
                  {
                    required: true,
                    message: 'Không được trống',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Space>
            <Space
              size={'large'}
              style={{
                border: '1px solid black',
                marginBottom: '10px',
                padding: '10px',
              }}
              align="center"
            >
              <Form.Item
                label="Number"
                name="numberVn3"
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
                label="Content"
                name="contentVn3"
                rules={[
                  {
                    required: true,
                    message: 'Không được trống',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Space>
            <Space
              size={'large'}
              style={{
                border: '1px solid black',
                marginBottom: '10px',
                padding: '10px',
              }}
              align="center"
            >
              <Form.Item
                label="Number"
                name="numberVn4"
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
                label="Content"
                name="contentVn4"
                rules={[
                  {
                    required: true,
                    message: 'Không được trống',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Space>
            <Space
              size={'large'}
              style={{
                border: '1px solid black',
                marginBottom: '10px',
                padding: '10px',
              }}
              align="center"
            >
              <Form.Item
                label="Number"
                name="numberVn5"
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
                label="Content"
                name="contentVn5"
                rules={[
                  {
                    required: true,
                    message: 'Không được trống',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Space>
          </Col>
        </Row>
        <Space>
          <Button
            onClick={() => {
              handleUpdateContent(languageUpdate.vn);
            }}
            type="primary"
          >
            Lưu tiếng việt
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
      </>
    );
  };
  const viewEn = () => {
    return (
      <>
        <Row gutter={[50, 20]}>
          <Col span={8}>
            <Form.Item
              label="Number"
              name="numberEn1"
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
              label="Content"
              name="contentEn1"
              rules={[
                {
                  required: true,
                  message: 'Không được trống',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Space
              size={'large'}
              style={{
                border: '1px solid black',
                marginBottom: '10px',
                padding: '10px',
              }}
              align="center"
            >
              <Form.Item
                label="Number"
                name="numberEn2"
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
                label="Content"
                name="contentEn2"
                rules={[
                  {
                    required: true,
                    message: 'Không được trống',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Space>
            <Space
              size={'large'}
              style={{
                border: '1px solid black',
                marginBottom: '10px',
                padding: '10px',
              }}
              align="center"
            >
              <Form.Item
                label="Number"
                name="numberEn3"
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
                label="Content"
                name="contentEn3"
                rules={[
                  {
                    required: true,
                    message: 'Không được trống',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Space>
            <Space
              size={'large'}
              style={{
                border: '1px solid black',
                marginBottom: '10px',
                padding: '10px',
              }}
              align="center"
            >
              <Form.Item
                label="Number"
                name="numberEn4"
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
                label="Content"
                name="contentEn4"
                rules={[
                  {
                    required: true,
                    message: 'Không được trống',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Space>
            <Space
              size={'large'}
              style={{
                border: '1px solid black',
                marginBottom: '10px',
                padding: '10px',
              }}
              align="center"
            >
              <Form.Item
                label="Number"
                name="numberEn5"
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
                label="Content"
                name="contentEn5"
                rules={[
                  {
                    required: true,
                    message: 'Không được trống',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Space>
          </Col>
        </Row>
        <Space>
          <Button
            onClick={() => {
              handleUpdateContent(languageUpdate.en);
            }}
            type="primary"
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
    },
    {
      key: '2',
      label: 'Nội dung tiếng anh',
      children: viewEn(),
      forceRender: true,
    },
  ];
  return (
    <Form form={form} initialValues={initialValue}>
      <Tabs defaultActiveKey="1" items={items} />
    </Form>
  );
};

export default Number;
