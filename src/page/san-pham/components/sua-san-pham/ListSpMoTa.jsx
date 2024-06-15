import { Button, Card, Col, Row, message } from 'antd';
import React from 'react';
import ImgFetch from '../../../../components/imgFetch';
import { SanPhamService } from '../../../../service/san-pham/SanPhamService';
import CardSpMoTa from './CardSpMoTa';

const ListSpMoTa = ({ listData, idSp, fetchSpApi }) => {
  const renderListCard = () => {
    return listData?.map((sp) => {
      return (
        <Col span={6}>
          <CardSpMoTa sp={sp} idSp={idSp} fetchSpApi={fetchSpApi} />
        </Col>
      );
    });
  };
  return <Row>{renderListCard()}</Row>;
};

export default ListSpMoTa;
