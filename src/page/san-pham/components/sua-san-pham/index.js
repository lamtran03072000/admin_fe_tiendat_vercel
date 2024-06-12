import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Space,
  Tabs,
  Upload,
  message,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { imgUploadService } from '../../../../service/imgUpload';
import { SanPhamService } from '../../../../service/san-pham/SanPhamService';

import { useDispatch } from 'react-redux';
import { getContentPageThunk } from '../../../../store/contentPage/contentPageThunk';
import TextEditer from '../../../../components/text-editor';
import { languageUpdate } from '../../../../utils/constants';
import ImgFetch from '../../../../components/imgFetch';

import _ from 'lodash';
import ListDesImg from './ListDesImg';
const getBase64Main = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const initValueForm = {
  tenSpVn: '',
  tenSpEn: '',
};

const SuaSanPham = ({ idSp }) => {
  const refDesVn = useRef('');
  const refDesEn = useRef('');
  const refInfoVn = useRef('');
  const refInfoEn = useRef('');
  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [base64Extra1, setBase64Extra1] = useState();
  const [base64Extra2, setBase64Extra2] = useState();
  const [base64Extra3, setBase64Extra3] = useState();
  const [imgPreviewExtra1, setImgPreviewExtra1] = useState();
  const [imgPreviewExtra2, setImgPreviewExtra2] = useState();
  const [imgPreviewExtra3, setImgPreviewExtra3] = useState();

  const [dataSp, setDataSp] = useState({});

  const fetchSpApi = async () => {
    try {
      const data = await SanPhamService.getSp(idSp);
      console.log('data: ', data.data);
      form.setFieldValue('tenSpVn', data.data.nameVn);
      form.setFieldValue('tenSpEn', data.data.nameEn);
      setDataSp(data.data);
    } catch (error) {
      console.log('error: ', error);
    }
  };
  const dispatch = useDispatch();

  const showModal = (event) => {
    fetchSpApi();
    setIsModalOpen(true);
  };

  const handleCancel = (event) => {
    setIsModalOpen(false);
  };

  const uploadButton = (
    <Button type="primary" icon={<PlusOutlined />}>
      Upload
    </Button>
  );

  const handleUpdateProduct = async (lg) => {
    if (
      !refInfoVn.current.getData() ||
      !refInfoEn.current.getData() ||
      !form.getFieldValue('tenSpVn') ||
      !form.getFieldValue('tenSpEn') ||
      !refDesVn.current.getData() ||
      !refDesEn.current.getData()
    ) {
      message.error('Vui lòng thêm đủ hình ảnh và thông tin');
      return;
    }

    let formDataExtra1 = new FormData();
    let formDataExtra2 = new FormData();
    let formDataExtra3 = new FormData();

    formDataExtra1.append('file', base64Extra1);
    formDataExtra2.append('file', base64Extra2);
    formDataExtra3.append('file', base64Extra3);

    let dataUpdateSp = {
      nameVn: form.getFieldValue('tenSpVn'),
      nameEn: form.getFieldValue('tenSpEn'),
      infoVn: refInfoVn.current.getData(),
      infoEn: refInfoEn.current.getData(),
      desVn: refDesVn.current.getData(),
      desEn: refDesEn.current.getData(),
      imgExtra: [...dataSp.imgExtra],
    };
    try {
      if (base64Extra1) {
        const dataImgExtra1 = await imgUploadService.postImg(formDataExtra1, 0);
        let newImgExtra = [...dataUpdateSp.imgExtra];
        newImgExtra[0] = dataImgExtra1.data.idImg;
        dataUpdateSp = { ...dataUpdateSp, imgExtra: newImgExtra };
      }
      if (base64Extra2) {
        const dataImgExtra2 = await imgUploadService.postImg(formDataExtra2, 0);
        let newImgExtra = [...dataUpdateSp.imgExtra];
        newImgExtra[1] = dataImgExtra2.data.idImg;
        dataUpdateSp = { ...dataUpdateSp, imgExtra: newImgExtra };
      }
      if (base64Extra3) {
        const dataImgExtra3 = await imgUploadService.postImg(formDataExtra3, 0);
        let newImgExtra = [...dataUpdateSp.imgExtra];
        newImgExtra[2] = dataImgExtra3.data.idImg;
        dataUpdateSp = { ...dataUpdateSp, imgExtra: newImgExtra };
      }

      const data = await SanPhamService.updateSp(idSp, lg, dataUpdateSp);

      setBase64Extra1('');
      setBase64Extra2('');
      setBase64Extra3('');
      setImgPreviewExtra1('');
      setImgPreviewExtra2('');
      setImgPreviewExtra3('');

      message.success(data.data);
      dispatch(getContentPageThunk());
      handleCancel();
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const handleChangeImgExtra1 = async ({ fileList: newFileList }) => {
    setBase64Extra1(newFileList[0].originFileObj);
    setImgPreviewExtra1(await getBase64Main(newFileList[0].originFileObj));
  };
  const handleChangeImgExtra2 = async ({ fileList: newFileList }) => {
    setBase64Extra2(newFileList[0].originFileObj);
    setImgPreviewExtra2(await getBase64Main(newFileList[0].originFileObj));
  };
  const handleChangeImgExtra3 = async ({ fileList: newFileList }) => {
    setBase64Extra3(newFileList[0].originFileObj);
    setImgPreviewExtra3(await getBase64Main(newFileList[0].originFileObj));
  };

  const viewImg = () => {
    if (_.isEqual({}, dataSp)) return;
    return (
      <>
        <Form.Item
          label="Hình"
          rules={[
            {
              required: true,
              message: 'Không được để trống',
            },
          ]}
        >
          <Row gutter={[16, 16]}>
            <Col span={8}>
              {imgPreviewExtra1 ? (
                <>
                  <Image
                    width={'100%'}
                    height={'300px'}
                    src={imgPreviewExtra1}
                  />
                </>
              ) : (
                <ImgFetch w={'100%'} h={'300px'} imgId={dataSp.imgExtra[0]} />
              )}

              <Upload
                customRequest={() => {}}
                listType="picture"
                showUploadList={false}
                onChange={handleChangeImgExtra1}
                maxCount={1}
              >
                {uploadButton}
              </Upload>
            </Col>
            <Col span={8}>
              {imgPreviewExtra2 ? (
                <>
                  <Image
                    width={'100%'}
                    height={'300px'}
                    src={imgPreviewExtra2}
                  />
                </>
              ) : (
                <ImgFetch w={'100%'} h={'300px'} imgId={dataSp.imgExtra[1]} />
              )}

              <Upload
                customRequest={() => {}}
                listType="picture"
                showUploadList={false}
                onChange={handleChangeImgExtra2}
                maxCount={1}
              >
                {uploadButton}
              </Upload>
            </Col>
            <Col span={8}>
              {imgPreviewExtra3 ? (
                <>
                  <Image
                    width={'100%'}
                    height={'300px'}
                    src={imgPreviewExtra3}
                  />
                </>
              ) : (
                <ImgFetch w={'100%'} h={'300px'} imgId={dataSp.imgExtra[2]} />
              )}
              <Upload
                customRequest={() => {}}
                listType="picture"
                showUploadList={false}
                onChange={handleChangeImgExtra3}
                maxCount={1}
              >
                {uploadButton}
              </Upload>
            </Col>
          </Row>
        </Form.Item>
      </>
    );
  };

  const viewVN = () => {
    return (
      <>
        <Form.Item
          name="tenSpVn"
          label="Tên sản phẩm"
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
          label="Thông tin sản phẩm"
          rules={[
            {
              required: true,
              message: 'Không được để trống',
            },
          ]}
        >
          <TextEditer
            data={dataSp.infoVn}
            refTextEditor={refInfoVn}
            keySection={'infoSPvn'}
          />
        </Form.Item>
        <Form.Item
          label="Mô tả sản phẩm"
          rules={[
            {
              required: true,
              message: 'Không được để trống',
            },
          ]}
        >
          <TextEditer
            refTextEditor={refDesVn}
            data={dataSp.desVn}
            keySection={'desSPvn'}
          />
        </Form.Item>
        {viewImg()}

        <Form.Item
          label="Mô tả hình thêm cho sản phẩm"
          rules={[
            {
              required: true,
              message: 'Không được để trống',
            },
          ]}
        >
          <ListDesImg
            listIdImg={dataSp.imgDesArray}
            idSp={idSp}
            fetchSpApi={fetchSpApi}
          />
        </Form.Item>
        <Space>
          <Button
            onClick={() => {
              handleUpdateProduct(languageUpdate.vn);
            }}
            type="primary"
          >
            Lưu tiếng việt
          </Button>
          <Button
            onClick={() => {
              handleUpdateProduct(languageUpdate.full);
            }}
            type="primary"
          >
            Lưu tiếng việt & tiếng anh
          </Button>
        </Space>
      </>
    );
  };
  const viewEN = () => {
    return (
      <>
        <Form.Item
          name="tenSpEn"
          label="Tên sản phẩm"
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
          label="Thông tin sản phẩm"
          rules={[
            {
              required: true,
              message: 'Không được để trống',
            },
          ]}
        >
          <TextEditer
            data={dataSp.infoEn}
            refTextEditor={refInfoEn}
            keySection={'infoSPen'}
          />
        </Form.Item>
        <Form.Item
          label="Mô tả sản phẩm"
          rules={[
            {
              required: true,
              message: 'Không được để trống',
            },
          ]}
        >
          <TextEditer
            data={dataSp.desEn}
            refTextEditor={refDesEn}
            keySection={'desSPen'}
          />
        </Form.Item>
        {viewImg()}
        <Form.Item
          label="Mô tả hình thêm cho sản phẩm"
          rules={[
            {
              required: true,
              message: 'Không được để trống',
            },
          ]}
        >
          <ListDesImg
            listIdImg={dataSp.imgDesArray}
            idSp={idSp}
            fetchSpApi={fetchSpApi}
          />
        </Form.Item>
        <Button
          onClick={() => {
            handleUpdateProduct(languageUpdate.en);
          }}
          type="primary"
        >
          Lưu tiếng anh
        </Button>
      </>
    );
  };

  const items = [
    {
      key: '1',
      label: 'Tiếng việt',
      children: viewVN(),
      forceRender: true,
    },
    {
      key: '2',
      label: 'Tiếng anh',
      children: viewEN(),
      forceRender: true,
    },
  ];
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Sửa
      </Button>
      <Modal
        width={'70%'}
        title="Sửa sản phẩm"
        open={isModalOpen}
        footer=""
        onCancel={handleCancel}
      >
        <Form initialValues={initValueForm} form={form}>
          <Tabs defaultActiveKey="1" items={items} />
        </Form>
      </Modal>
    </div>
  );
};

export default SuaSanPham;
