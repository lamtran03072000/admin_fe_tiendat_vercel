import { Button, Card, Col, Row, Space, message } from 'antd';
import React from 'react';
import ImgFetch from '../../../../components/imgFetch';
import Meta from 'antd/es/card/Meta';
import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { SanPhamService } from '../../../../service/san-pham/SanPhamService';
import { useDispatch } from 'react-redux';
import { getContentPageThunk } from '../../../../store/contentPage/contentPageThunk';
import { blue } from '@ant-design/colors';
import SuaSanPham from '../sua-san-pham';

const DanhSachSanPham = ({ dataDssp }) => {
  const dispatch = useDispatch();

  const handleDeleteSp = async (id) => {
    try {
      await SanPhamService.deleteSp(id);
      dispatch(getContentPageThunk());
      message.success('Xoá sản phẩm thành công');
    } catch (error) {}
  };
  const renderSanPham = (sanPham) => {
    return (
      <Col key={sanPham.id} span={6}>
        <Card
          key={sanPham.id}
          hoverable
          style={{
            border: '0.5px solid gray',
          }}
          cover={<ImgFetch w={'100%'} h={'200px'} imgId={sanPham.imgMain} />}
        >
          <Meta title={sanPham.nameVn} />
          <Space
            style={{
              marginTop: '20px',
            }}
          >
            <SuaSanPham idSp={sanPham.id} />
            <Button
              onClick={() => {
                handleDeleteSp(sanPham.id);
              }}
              type="primary"
              icon={<DeleteOutlined />}
              danger
            >
              Xoá
            </Button>
          </Space>
        </Card>
      </Col>
    );
  };

  const renderDssp = () => {
    return dataDssp.map((sp, index) => {
      return renderSanPham(sp);
    });
  };
  return (
    <Row
      style={{
        border: '1px solid black',
        padding: '30px',
        background: '#f0f5ff',
      }}
      gutter={[20, 20]}
    >
      {renderDssp()}
    </Row>
  );
};

export default DanhSachSanPham;
