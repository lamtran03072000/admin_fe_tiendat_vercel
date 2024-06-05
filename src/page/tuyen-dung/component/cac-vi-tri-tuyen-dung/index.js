import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextEditer from '../../../../components/text-editor';
import { languageUpdate } from '../../../../utils/constants';
import { getContentPageThunk } from '../../../../store/contentPage/contentPageThunk';
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Space,
  Tabs,
  Typography,
  message,
  Image,
  Upload,
} from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  FormOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useFormik } from 'formik';
import { CacViTriService } from '../../../../service/tuyenDung/cacViTri';
import ContainerSection from '../../../../HOC/container-section';
import { imgUploadService } from '../../../../service/imgUpload';
import ImgFetch from '../../../../components/imgFetch';

const { Title } = Typography;

const initValueFormAdd = {
  tenViTri: '',
  soLuong: '',
};
const initValueFormUpdate = {
  tenViTriVn: '',
  soLuongVn: '',
  tenViTriEn: '',
  soLuongEn: '',
  idUpdate: '',
};

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const CacViTriTuyenDung = () => {
  const [form] = Form.useForm();
  const [formAdd] = Form.useForm();

  const refTitleVn = useRef('');
  const refDetailVn = useRef('');
  const refDetailEn = useRef('');
  const refTitleEn = useRef('');
  const refDetailTd = useRef('');
  const dispatch = useDispatch();
  const { contentPage } = useSelector((state) => state.contentPageSlice);
  const [dataCacViTriTdEn, setDataCacViTriTdEn] = useState({});
  const [dataCacViTriTdVn, setDataCacViTriTdVn] = useState({});
  const [arrayDataCacViTriTdEn, setArrayDataCacViTriTdEn] = useState([]);
  const [arrayDataCacViTriTdVn, setArrayDataCacViTriTdVn] = useState([]);
  const [isOpenFormUpdate, setIsOpenFormUpdate] = useState(false);
  const [isOpenFormAddVitri, setIsOpenFormAddVitri] = useState(false);
  useEffect(() => {
    if (contentPage) {
      setDataCacViTriTdEn(contentPage.dataTuyenDungEn.cacViTriTuyenDung);
      setDataCacViTriTdVn(contentPage.dataTuyenDungVn.cacViTriTuyenDung);
      setArrayDataCacViTriTdVn(
        contentPage.dataTuyenDungVn.cacViTriTuyenDung.cacViTri,
      );
      setArrayDataCacViTriTdEn(
        contentPage.dataTuyenDungEn.cacViTriTuyenDung.cacViTri,
      );
    }
  }, [contentPage]);

  const showModalFormUpdate = () => {
    setIsOpenFormUpdate(true);
  };

  const showModalFormAddViTri = () => {
    setIsOpenFormAddVitri(true);
  };

  const handleCancelFormUpdate = () => {
    setIsOpenFormUpdate(false);
    setImgPreviewUpdate('');
  };

  const handleCancelFormAddViTri = () => {
    setIsOpenFormAddVitri(false);
  };

  const updateContent = async (lg) => {
    let titleVn = refTitleVn.current.getData();
    let titleEn = refTitleEn.current.getData();

    let newDataCacViTriTdVn = {
      ...dataCacViTriTdVn,
      title: titleVn,
    };
    let newDataCacViTriTdEn = {
      ...dataCacViTriTdEn,
      title: titleEn,
    };
    let content = {
      dataCacViTriTdVn: newDataCacViTriTdVn,
      dataCacViTriTdEn: newDataCacViTriTdEn,
    };
    try {
      //   let data = await TSLVService.updateContent(lg, { content });
      //   dispatch(getContentPageThunk());
      //   message.success(data.data);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;
    let newCVTVn = [...arrayDataCacViTriTdVn];
    let newCVTEn = [...arrayDataCacViTriTdEn];
    const [reorderedItemVn] = newCVTVn.splice(result.source.index, 1);
    const [reorderedItemEn] = newCVTEn.splice(result.source.index, 1);

    newCVTVn.splice(result.destination.index, 0, reorderedItemVn);
    newCVTEn.splice(result.destination.index, 0, reorderedItemEn);
    try {
      const data = await CacViTriService.changeViTri({ newCVTEn, newCVTVn });
      dispatch(getContentPageThunk());
      message.success(data.data);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const handdleAddViTri = async () => {
    let formData = new FormData();

    formData.append('file', base64add);

    const valueForm = {
      chiTiet: refDetailTd.current.getData(),
      soLuong: formAdd.getFieldsValue().soLuong,
      tenViTri: formAdd.getFieldsValue().tenViTri,
      hinhAnh: '',
    };
    try {
      const dataImgUpdate = await imgUploadService.postImg(formData, 0);

      const data = await CacViTriService.postViTri({
        ...valueForm,
        hinhAnh: dataImgUpdate.data.idImg,
      });
      dispatch(getContentPageThunk());
      message.success(data.data);
      handleCancelFormAddViTri();
      formAdd.resetFields();
      refDetailTd.current.setData('');
    } catch (error) {
      console.log('error: ');
    }
  };

  const handleDeleteViTri = async (id) => {
    try {
      const data = await CacViTriService.deleteViTri(id);
      dispatch(getContentPageThunk());
      message.success(data.data);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const renderCacViTri = () => {
    return arrayDataCacViTriTdVn.map((item, index) => {
      // console.log('arrayDataCacViTriTdVn: ', arrayDataCacViTriTdVn);
      return (
        <Draggable key={index} draggableId={`item-${index}`} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <div
                style={{
                  border: '1px solid black',
                  margin: '20px 0px',
                  borderRadius: '10px',
                  padding: '20px',
                  background: 'white',
                }}
              >
                <Row align="middle">
                  <Col span={6}>
                    <b>Tên vị trí</b> :{item?.tenViTri}
                  </Col>
                  <Col span={6}>
                    <b>Số lượng</b> :{item?.soLuong}
                  </Col>
                  <Col span={4} offset={8}>
                    <Space>
                      <Button
                        onClick={() => {
                          handleShowFormUpdate(item.id);
                        }}
                        type="primary"
                        icon={<FormOutlined />}
                      >
                        Sửa
                      </Button>
                      <Button
                        onClick={() => {
                          handleDeleteViTri(item.id);
                        }}
                        type="primary"
                        icon={<DeleteOutlined />}
                        danger
                      >
                        Xoá
                      </Button>
                    </Space>
                  </Col>
                </Row>
              </div>
            </div>
          )}
        </Draggable>
      );
    });
  };

  const handleShowFormUpdate = (idClick) => {
    showModalFormUpdate();

    setTimeout(() => {
      if (!refDetailVn.current.getData() && refDetailEn.current.getData()) {
        return;
      }

      let viTriClickVn = arrayDataCacViTriTdVn.find(
        (item) => item.id == idClick,
      );
      let viTriClickEn = arrayDataCacViTriTdEn.find(
        (item) => item.id == idClick,
      );
      // show form vn
      form.setFieldValue('tenViTriVn', viTriClickVn.tenViTri);
      form.setFieldValue('soLuongVn', viTriClickVn.soLuong);
      form.setFieldValue('tenViTriEn', viTriClickEn.tenViTri);
      form.setFieldValue('soLuongEn', viTriClickEn.soLuong);
      form.setFieldValue('idUpdate', idClick);
      setIdImgClickUpdate(viTriClickVn.hinhAnh);
      refDetailVn.current.setData(viTriClickVn.chiTiet);
      refDetailEn.current.setData(viTriClickEn.chiTiet);
    }, 500);
  };

  const handleUpdateContent = async (lg) => {
    let formData = new FormData();
    formData.append('file', base64update);
    let { idUpdate, tenViTriVn, tenViTriEn, soLuongVn, soLuongEn } =
      form.getFieldsValue();

    let content = {
      viTriVn: {
        id: idUpdate,
        tenViTri: tenViTriVn,
        soLuong: soLuongVn,
        chiTiet: refDetailVn.current.getData(),
        hinhAnh: '',
      },
      viTriEn: {
        id: idUpdate,
        tenViTri: tenViTriEn,
        soLuong: soLuongEn,
        chiTiet: refDetailEn.current.getData(),
        hinhAnh: '',
      },
    };
    try {
      const dataImgUpdate = await imgUploadService.postImg(formData, 0);
      content.viTriEn.hinhAnh = dataImgUpdate.data.idImg;
      content.viTriVn.hinhAnh = dataImgUpdate.data.idImg;
      const data = await CacViTriService.updateContent(lg, idUpdate, content);
      dispatch(getContentPageThunk());
      message.success(data.data);
      handleCancelFormUpdate();
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const viewVn = () => {
    return (
      <>
        <TextEditer
          refTextEditor={refTitleVn}
          data={dataCacViTriTdVn.title}
          keySection={'TitleCvtlvTdVn'}
        />

        <Space
          style={{
            marginTop: '15px',
          }}
        >
          <Button
            type="primary"
            onClick={() => {
              //   updateContent(languageUpdate.vn);
            }}
          >
            Lưu tiếng việt
          </Button>
          <Button
            type="primary"
            onClick={() => {
              //   updateContent(languageUpdate.full);
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
          refTextEditor={refTitleEn}
          data={dataCacViTriTdEn.title}
          keySection={'TitleCvtlvTdEn'}
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

  const uploadButton = (
    <Button type="primary" icon={<PlusOutlined />}>
      Upload
    </Button>
  );

  const [base64update, setBase64update] = useState();
  const [imgPreviewUpdate, setImgPreviewUpdate] = useState();
  const [idImgClickUpdate, setIdImgClickUpdate] = useState();
  const handleChangeImgUpdate = async ({ fileList: newFileList }) => {
    setBase64update(newFileList[0].originFileObj);
    setImgPreviewUpdate(await getBase64(newFileList[0].originFileObj));
  };

  const formImgUpdate = (
    <Form.Item
      label="Hình"
      rules={[
        {
          required: true,
          message: 'Không được để trống',
        },
      ]}
    >
      {imgPreviewUpdate ? (
        <>
          <Image width={'100%'} height={'300px'} src={imgPreviewUpdate} />
        </>
      ) : (
        <ImgFetch w={'100%'} h={'300px'} imgId={idImgClickUpdate} />
      )}

      <Upload
        customRequest={() => {}}
        listType="picture"
        showUploadList={false}
        onChange={handleChangeImgUpdate}
        maxCount={1}
      >
        {uploadButton}
      </Upload>
    </Form.Item>
  );

  const formUpdateVn = () => {
    return (
      <Space
        style={{
          display: 'flex',
        }}
        direction="vertical"
      >
        <Form.Item
          name="tenViTriVn"
          label="Tên vị trí"
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
          name="soLuongVn"
          label="Số lượng"
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
          label="Chi tiết công việc"
          rules={[
            {
              required: true,
              message: 'Không được để trống',
            },
          ]}
        >
          <TextEditer
            refTextEditor={refDetailVn}
            //   data={dataCacViTriTdVn.title}
            keySection={'detailVn'}
          />
        </Form.Item>
        {formImgUpdate}
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
      </Space>
    );
  };

  const formUpdateEn = () => {
    return (
      <Space
        style={{
          display: 'flex',
        }}
        direction="vertical"
      >
        <Form.Item
          name="tenViTriEn"
          label="Tên vị trí"
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
          name="soLuongEn"
          label="Số lượng"
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
          label="Chi tiết công việc"
          rules={[
            {
              required: true,
              message: 'Không được để trống',
            },
          ]}
        >
          <TextEditer
            refTextEditor={refDetailEn}
            //   data={dataCacViTriTdVn.title}
            keySection={'detailEn'}
          />
        </Form.Item>
        {formImgUpdate}
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
      </Space>
    );
  };

  const [base64add, setBase64add] = useState();
  const [imgPreviewAdd, setImgPreviewAdd] = useState();
  const handleChangeImgAdd = async ({ fileList: newFileList }) => {
    setBase64add(newFileList[0].originFileObj);
    setImgPreviewAdd(await getBase64(newFileList[0].originFileObj));
  };

  const formAddVitri = () => {
    return (
      <Space
        style={{
          display: 'flex',
        }}
        direction="vertical"
      >
        <Form.Item
          name="tenViTri"
          label="Tên vị trí"
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
          name="soLuong"
          label="Số lượng"
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
          label="Chi tiết công việc"
          rules={[
            {
              required: true,
              message: 'Không được để trống',
            },
          ]}
        >
          <TextEditer refTextEditor={refDetailTd} keySection={'detail'} />
        </Form.Item>
        <Form.Item
          label="Hình"
          rules={[
            {
              required: true,
              message: 'Không được để trống',
            },
          ]}
        >
          <Image width={'100%'} height={'300px'} src={imgPreviewAdd} />
          <Upload
            customRequest={() => {}}
            listType="picture"
            showUploadList={false}
            onChange={handleChangeImgAdd}
            maxCount={1}
          >
            {uploadButton}
          </Upload>
        </Form.Item>
        <Space>
          <Button onClick={handdleAddViTri} type="primary">
            Thêm vị trí tuyển dụng
          </Button>
        </Space>
      </Space>
    );
  };

  const itemForm = [
    {
      key: '1',
      label: 'Nội dung tiếng việt',
      children: formUpdateVn(),
      forceRender: true,
    },
    {
      key: '2',
      label: 'Nội dung tiếng anh',
      children: formUpdateEn(),
      forceRender: true,
    },
  ];

  return (
    <div>
      <ContainerSection>
        <Title level={5}>Title :</Title>

        <Tabs defaultActiveKey="1" items={items} />
      </ContainerSection>

      <ContainerSection>
        <Title level={5}>Các vị trí tuyển dụng: </Title>

        <Space
          direction="vertical"
          style={{
            display: 'flex',
            marginTop: '40px',
          }}
        >
          <Button
            type="primary"
            onClick={showModalFormAddViTri}
            icon={<PlusCircleOutlined />}
          >
            Thêm vị trí tuyển dụng
          </Button>
          {/* Các vị trí */}

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="positions">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {renderCacViTri()}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Space>
      </ContainerSection>

      {/* Form update*/}
      <Modal
        width={'800px'}
        title="Form"
        open={isOpenFormUpdate}
        onCancel={handleCancelFormUpdate}
        footer={false}
      >
        <Form form={form} initialValues={initValueFormUpdate}>
          <Form.Item
            hidden
            name="idUpdate"
            label=""
            rules={[
              {
                required: true,
                message: 'Không được để trống',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Tabs defaultActiveKey="1" items={itemForm} />
        </Form>
      </Modal>
      {/* Form Add tuyen dung*/}
      <Modal
        width={'800px'}
        title="Form"
        open={isOpenFormAddVitri}
        onCancel={handleCancelFormAddViTri}
        footer={false}
      >
        <Form initialValues={initValueFormAdd} form={formAdd}>
          {formAddVitri()}
        </Form>
      </Modal>
    </div>
  );
};

export default CacViTriTuyenDung;
