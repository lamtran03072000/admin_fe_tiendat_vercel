import { Button, Card, Col, Row, Space } from 'antd';
import React from 'react';
import ImgFetch from '../../../../components/imgFetch';
import Meta from 'antd/es/card/Meta';
import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
const DanhSachSanPham = ({ dataDssp }) => {
  console.log('dataDssp: ', dataDssp);
  const renderSanPham = (sanPham) => {
    return (
      <Col span={8}>
        <Card
          key={sanPham.id}
          hoverable
          style={{
            border: '0.5px solid gray',
          }}
          cover={<ImgFetch imgId={sanPham.imgMain} />}
        >
          <Meta title={sanPham.nameVn} />
          <Space
            style={{
              marginTop: '20px',
            }}
          >
            <Button onClick={() => {}} type="primary" icon={<FormOutlined />}>
              Sửa
            </Button>
            <Button
              onClick={() => {}}
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
  return <Row gutter={[20, 20]}>{renderDssp()}</Row>;
};

export default DanhSachSanPham;
