import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Upload,
  message,
} from 'antd';
import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { imgUploadService } from '../../../../service/imgUpload';
import { SanPhamService } from '../../../../service/san-pham/SanPhamService';

import { useDispatch } from 'react-redux';
import { getContentPageThunk } from '../../../../store/contentPage/contentPageThunk';
import TextEditer from '../../../../components/text-editor';
import ListDesImg from './ListDesImg';

const getBase64Main = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const initValueForm = {
  tenSp: '',
};

const ThemSanPham = ({ idDssp }) => {
  const refDesVn = useRef('');
  const refInfoVn = useRef('');
  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listBase64Des, setListBase64Des] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [base64Extra1, setBase64Extra1] = useState();
  const [base64Extra2, setBase64Extra2] = useState();
  const [base64Extra3, setBase64Extra3] = useState();
  const [imgPreviewExtra1, setImgPreviewExtra1] = useState();
  const [imgPreviewExtra2, setImgPreviewExtra2] = useState();
  const [imgPreviewExtra3, setImgPreviewExtra3] = useState();

  const dispatch = useDispatch();

  const showModal = (event) => {
    event.stopPropagation();
    setIsModalOpen(true);
  };

  const handleCancel = (event) => {
    setIsModalOpen(false);
    setFileList([]);
  };

  const uploadButton = (
    <Button type="primary" icon={<PlusOutlined />}>
      Upload
    </Button>
  );
  const handleAddProduct = async () => {
    if (
      !base64Extra1 ||
      !base64Extra2 ||
      !base64Extra3 ||
      !refInfoVn.current.getData() ||
      !form.getFieldValue('tenSp') ||
      !refDesVn.current.getData()
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

    const dataPostSp = {
      imgMain: '',
      name: form.getFieldValue('tenSp'),
      info: refInfoVn.current.getData(),
      des: refDesVn.current.getData(),
      imgExtra: [],
    };
    try {
      let imgDesArray = [];
      for (let base64 of listBase64Des) {
        let formData = new FormData();
        formData.append('file', base64);
        const dataImg = await imgUploadService.postImg(formData, 0);
        imgDesArray.push(dataImg.data.idImg);
      }

      const dataImgExtra1 = await imgUploadService.postImg(formDataExtra1, 0);
      const dataImgExtra2 = await imgUploadService.postImg(formDataExtra2, 0);
      const dataImgExtra3 = await imgUploadService.postImg(formDataExtra3, 0);
      let newDataPostSp = {
        ...dataPostSp,
        imgExtra: [
          dataImgExtra1.data.idImg,
          dataImgExtra2.data.idImg,
          dataImgExtra3.data.idImg,
        ],
        imgDesArray: imgDesArray,
      };
      await SanPhamService.postSp(idDssp, newDataPostSp);
      dispatch(getContentPageThunk());
      message.success('Thêm thành công sản phẩm');
      form.resetFields('');
      refDesVn.current.setData('');
      refInfoVn.current.setData('');
      setImgPreviewExtra1('');
      setImgPreviewExtra2('');
      setImgPreviewExtra3('');
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

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Thêm Sản Phẩm
      </Button>
      <Modal
        width={'70%'}
        title="Thêm sản phẩm"
        open={isModalOpen}
        footer=""
        onCancel={handleCancel}
      >
        <Form initialValues={initValueForm} form={form}>
          <Form.Item
            name="tenSp"
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
            <TextEditer refTextEditor={refDesVn} keySection={'desVNSP'} />
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
            <TextEditer refTextEditor={refInfoVn} keySection={'infoVNSP'} />
          </Form.Item>

          <Form.Item
            label="Hình phụ"
            rules={[
              {
                required: true,
                message: 'Không được để trống',
              },
            ]}
          >
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Image width={'100%'} height={'150px'} src={imgPreviewExtra1} />
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
                <Image width={'100%'} height={'150px'} src={imgPreviewExtra2} />
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
                <Image width={'100%'} height={'150px'} src={imgPreviewExtra3} />
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
              setListBase64Des={setListBase64Des}
              fileList={fileList}
              setFileList={setFileList}
            />
          </Form.Item>
        </Form>
        <Button onClick={handleAddProduct} type="primary">
          Thêm
        </Button>
      </Modal>
    </div>
  );
};

export default ThemSanPham;
