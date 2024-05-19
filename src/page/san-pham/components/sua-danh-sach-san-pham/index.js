import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Form,
  Image,
  Input,
  Modal,
  Space,
  Tabs,
  Upload,
  message,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { imgUploadService } from '../../../../service/imgUpload';
import { SanPhamService } from '../../../../service/san-pham/SanPhamService';
import { getContentPageThunk } from '../../../../store/contentPage/contentPageThunk';
import ImgFetch from '../../../../components/imgFetch';
import { languageUpdate } from '../../../../utils/constants';

const initValueForm = {
  tenDsVn: '',
  tenDsEn: '',
};

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const SuaDanhSachSanPham = ({ idDssp }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [base64, setBase64] = useState();
  const [imgPreview, setImgPreview] = useState();
  const [dataDssp, setDataDssp] = useState([]);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const fetchDataDssp = async (id) => {
    try {
      const data = await SanPhamService.getDssp(idDssp);

      form.setFieldValue('tenDsEn', data.data.nameEn);
      form.setFieldValue('tenDsVn', data.data.nameVn);

      setDataDssp(data.data);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const showModal = () => {
    fetchDataDssp(idDssp);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const uploadButton = (
    <Button type="primary" icon={<PlusOutlined />}>
      Upload
    </Button>
  );

  const handleUpdateDssp = async (lg) => {
    let formData = new FormData();
    formData.append('file', base64);

    const dataUpdateDs = {
      img: dataDssp.img,
      nameVn: form.getFieldValue('tenDsVn'),
      nameEn: form.getFieldValue('tenDsEn'),
    };
    try {
      if (base64) {
        const dataImgUpdate = await imgUploadService.postImg(formData, 0);
        await SanPhamService.updateDssp(lg, idDssp, {
          ...dataUpdateDs,
          img: dataImgUpdate.data.idImg,
        });
      } else {
        await SanPhamService.updateDssp(lg, idDssp, dataUpdateDs);
      }

      dispatch(getContentPageThunk());
      form.resetFields();
      setImgPreview('');
      setIsModalOpen(false);
      message.success('Thêm thành công');
      setBase64('');
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const handleChange = async ({ fileList: newFileList }) => {
    setBase64(newFileList[0].originFileObj);
    setImgPreview(await getBase64(newFileList[0].originFileObj));
  };

  const viewImg = () => {
    return (
      <Form.Item
        label="Hình"
        rules={[
          {
            required: true,
            message: 'Không được để trống',
          },
        ]}
      >
        {imgPreview ? (
          <>
            <Image width={'100%'} height={'300px'} src={imgPreview} />
          </>
        ) : (
          <ImgFetch w={'100%'} h={'300px'} imgId={dataDssp.img} />
        )}

        <Upload
          customRequest={() => {}}
          listType="picture"
          showUploadList={false}
          onChange={handleChange}
          maxCount={1}
        >
          {uploadButton}
        </Upload>
      </Form.Item>
    );
  };

  const viewEn = () => {
    return (
      <>
        <Form.Item
          name="tenDsEn"
          label="Tên danh sách"
          rules={[
            {
              required: true,
              message: 'Không được để trống',
            },
          ]}
        >
          <Input />
        </Form.Item>
        {viewImg()}
        <Button
          onClick={() => {
            handleUpdateDssp(languageUpdate.en);
          }}
          type="primary"
        >
          Lưu tiếng anh
        </Button>
      </>
    );
  };

  const viewVn = () => {
    return (
      <>
        <Form.Item
          name="tenDsVn"
          label="Tên danh sách"
          rules={[
            {
              required: true,
              message: 'Không được để trống',
            },
          ]}
        >
          <Input />
        </Form.Item>
        {viewImg()}
        <Space>
          <Button
            onClick={() => {
              handleUpdateDssp(languageUpdate.vn);
            }}
            type="primary"
          >
            Lưu tiếng việt
          </Button>

          <Button
            onClick={() => {
              handleUpdateDssp(languageUpdate.full);
            }}
            type="primary"
          >
            Lưu tiếng việt & tiếng anh
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
    },
  ];
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Sửa
      </Button>
      <Modal
        title="Sửa danh sách sản phẩm"
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

export default SuaDanhSachSanPham;
